<?php

namespace App\Services;

use App\Models\DapodikSyncLog;
use App\Models\DapodikIdMapping;
use App\Models\WebserviceConfig;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

/**
 * DapodikSyncService
 * 
 * Handle SOAP/REST API synchronization dengan Dapodik Kemendikdasmen
 * untuk e-Rapor: pull data (siswa, guru, rombel) dan push data (nilai, P5)
 */
class DapodikSyncService
{
    protected ?WebserviceConfig $config = null;
    protected string $baseUrl;
    protected int $timeout = 30;
    protected int $maxRetries = 3;

    public function __construct()
    {
        $this->config = WebserviceConfig::active()->first();
        $this->baseUrl = $this->config?->server_url ?? '';
    }

    /**
     * Pull data dari Dapodik (siswa, guru, rombel)
     */
    public function pullData(string $entityType): array
    {
        $this->ensureAuthenticated();

        $endpoint = match($entityType) {
            'siswa' => '/api/v1/siswa',
            'guru' => '/api/v1/guru',
            'rombongan_belajar' => '/api/v1/rombel',
            default => throw new \InvalidArgumentException("Entity type {$entityType} not supported")
        };

        return $this->makeRequest('GET', $endpoint);
    }

    /**
     * Push data nilai ke Dapodik
     */
    public function pushNilai(array $data): array
    {
        $this->ensureAuthenticated();

        return $this->makeRequest('POST', '/api/v1/nilai', $data);
    }

    /**
     * Push data P5 ke Dapodik
     */
    public function pushP5(array $data): array
    {
        $this->ensureAuthenticated();

        return $this->makeRequest('POST', '/api/v1/p5', $data);
    }

    /**
     * Sync siswa lokal ke Dapodik
     */
    public function syncSiswa(int $localId): bool
    {
        $mapping = DapodikIdMapping::findByLocalId('siswa', $localId);
        
        // Jika sudah ada mapping, update
        if ($mapping) {
            return $this->updateSiswaDiDapodik($mapping);
        }

        // Jika belum, create baru
        return $this->createSiswaDiDapodik($localId);
    }

    /**
     * Sync guru lokal ke Dapodik
     */
    public function syncGuru(int $localId): bool
    {
        $mapping = DapodikIdMapping::findByLocalId('guru', $localId);
        
        if ($mapping) {
            return $this->updateGuruDiDapodik($mapping);
        }

        return $this->createGuruDiDapodik($localId);
    }

    /**
     * Log sync request untuk diproses queue later
     */
    public function logSyncRequest(string $entityType, int $entityId, string $action, array $payload = null): DapodikSyncLog
    {
        return DapodikSyncLog::create([
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'action' => $action,
            'status' => 'pending',
            'request_payload' => $payload ? json_encode($payload) : null,
        ]);
    }

    /**
     * Process pending sync logs dari queue
     */
    public function processPendingSyncs(int $limit = 50): int
    {
        $pending = DapodikSyncLog::pending()
            ->limit($limit)
            ->get();

        $success = 0;
        foreach ($pending as $log) {
            try {
                $result = $this->executeSync($log);
                if ($result) {
                    $log->markAsSuccess(json_encode($result));
                    $success++;
                }
            } catch (\Exception $e) {
                $log->markAsFailed($e->getMessage());
                Log::error("Dapodik sync failed: {$e->getMessage()}", ['log_id' => $log->id]);
            }
        }

        return $success;
    }

    // ========== Private Methods ==========

    protected function ensureAuthenticated(): void
    {
        if (!$this->config || !$this->config->hasValidToken()) {
            $this->authenticate();
        }
    }

    protected function authenticate(): void
    {
        if (!$this->config) {
            throw new \RuntimeException('Webservice config not found');
        }

        $response = Http::timeout($this->timeout)
            ->asForm()
            ->post($this->baseUrl . '/oauth/token', [
                'grant_type' => 'client_credentials',
                'client_id' => $this->config->username,
                'client_secret' => $this->config->password,
            ]);

        if ($response->successful()) {
            $data = $response->json();
            $this->config->update([
                'token' => $data['access_token'],
                'token_expires_at' => now()->addSeconds($data['expires_in'] ?? 3600),
            ]);
            $this->config = $this->config->fresh();
        } else {
            throw new \RuntimeException('Authentication failed: ' . $response->status());
        }
    }

    protected function makeRequest(string $method, string $endpoint, array $data = null): array
    {
        $url = $this->baseUrl . $endpoint;
        
        $response = match($method) {
            'GET' => Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->config->token,
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ])->timeout($this->timeout)->get($url),
            
            'POST' => Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->config->token,
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ])->timeout($this->timeout)->post($url, $data),
            
            'PUT' => Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->config->token,
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ])->timeout($this->timeout)->put($url, $data),
            
            'DELETE' => Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->config->token,
                'Accept' => 'application/json',
            ])->timeout($this->timeout)->delete($url),
        };

        if ($response->successful()) {
            return $response->json();
        }

        throw new \RuntimeException('API request failed: ' . $response->status());
    }

    protected function executeSync(DapodikSyncLog $log): ?array
    {
        $payload = $log->request_payload ? json_decode($log->request_payload, true) : [];

        return match([$log->entity_type, $log->action]) {
            ['siswa', 'create'] => $this->createSiswaDiDapodik($log->entity_id, $payload),
            ['siswa', 'update'] => $this->updateSiswaDiDapodikByLog($log, $payload),
            ['siswa', 'delete'] => $this->deleteSiswaDiDapodik($log->entity_id),
            ['guru', 'create'] => $this->createGuruDiDapodik($log->entity_id, $payload),
            ['guru', 'update'] => $this->updateGuruDiDapodikByLog($log, $payload),
            ['nilai', 'create'] => $this->pushNilai($payload),
            ['p5', 'create'] => $this->pushP5($payload),
            default => null,
        };
    }

    protected function createSiswaDiDapodik(int $localId, array $payload = null): bool
    {
        // Implementasi: ambil data siswa lokal, kirim ke Dapodik
        // Simpan dapodik_id ke DapodikIdMapping
        return true;
    }

    protected function updateSiswaDiDapodik(DapodikIdMapping $mapping): bool
    {
        // Implementasi: update data siswa ke Dapodik menggunakan dapodik_id
        $mapping->updateSyncTime();
        return true;
    }

    protected function updateSiswaDiDapodikByLog(DapodikSyncLog $log, array $payload): bool
    {
        $mapping = DapodikIdMapping::findByLocalId($log->entity_type, $log->entity_id);
        if (!$mapping) {
            return false;
        }
        
        $this->makeRequest('PUT', "/api/v1/siswa/{$mapping->dapodik_id}", $payload);
        $mapping->updateSyncTime();
        return true;
    }

    protected function deleteSiswaDiDapodik(int $localId): bool
    {
        $mapping = DapodikIdMapping::findByLocalId('siswa', $localId);
        if (!$mapping) {
            return false;
        }

        $this->makeRequest('DELETE', "/api/v1/siswa/{$mapping->dapodik_id}");
        $mapping->delete();
        return true;
    }

    protected function createGuruDiDapodik(int $localId, array $payload = null): bool
    {
        // Implementasi: ambil data guru lokal, kirim ke Dapodik
        return true;
    }

    protected function updateGuruDiDapodik(DapodikIdMapping $mapping): bool
    {
        $this->makeRequest('PUT', "/api/v1/guru/{$mapping->dapodik_id}", []);
        $mapping->updateSyncTime();
        return true;
    }

    protected function updateGuruDiDapodikByLog(DapodikSyncLog $log, array $payload): bool
    {
        $mapping = DapodikIdMapping::findByLocalId($log->entity_type, $log->entity_id);
        if (!$mapping) {
            return false;
        }
        
        $this->makeRequest('PUT', "/api/v1/guru/{$mapping->dapodik_id}", $payload);
        $mapping->updateSyncTime();
        return true;
    }
}
