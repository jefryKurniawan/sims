<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Siswa;
use App\Models\SppTagihan;
use App\Models\PaymentSpp;
use App\Models\DetailPaymentSpp;
use Carbon\Carbon;

class OrangtuaSppController extends Controller
{
    /**
     * Get SPP invoices, payment history, and outstanding balance for the authenticated orang tua.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        if (!$user || $user->role !== 'ortu') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Get siswa record for this user
        $siswa = Siswa::where('user_id', $user->id)->first();

        // Invoices: SppTagihan (registration fee) + monthly SPP installments (from SPP module)
        $invoices = [];

        // Add registration fee invoices from SppTagihan
        $tagihan = SppTagihan::where('siswa_id', $siswa ? $siswa->id : null)
            ->get()
            ->map(function ($t) {
                return [
                    'id' => $t->id,
                    'description' => $t->keterangan ?? 'SPP Tagihan',
                    'amount' => $t->nominal,
                    'due_date' => $t->tanggal_jatuh_tempo,
                    'status' => $t->status,
                    'type' => 'registration_fee',
                ];
            });

        $invoices = $tagihan->toArray();

        // Add monthly SPP installments (based on SppSetting amount for each month of current school year)
        $sppSetting = \App\Models\SppSetting::first();
        $monthlyAmount = $sppSetting ? $sppSetting->amount : 0;
        $currentYear = now()->year;
        // Assuming school year starts July? We'll just generate for months Jan-Dec of current year as example
        for ($month = 1; $month <= 12; $month++) {
            $dueDate = sprintf('%d-%02d-15', $currentYear, $month); // due day 15
            // Check if already paid via SPP module
            $paid = false;
            if ($siswa) {
                // Look for payment record for this user and year
                $payment = PaymentSpp::where('user_id', $siswa->user_id)
                    ->where('year', $currentYear)
                    ->first();
                if ($payment) {
                    // Map month number to column name
                    $monthName = ucfirst(date('F', mktime(0, 0, 0, $month, 1, $year)));
                    $paid = $payment->{$monthName} === 'paid';
                }
            }
            $invoices[] = [
                'id' => null, // not a real record
                'description' => 'SPP Bulan ' . date('F', mktime(0, 0, 0, $month, 1, $currentYear)),
                'amount' => $monthlyAmount,
                'due_date' => $dueDate,
                'status' => $paid ? 'lunas' : 'belum_lunas',
                'type' => 'monthly_spp',
            ];
        }

        // Payment history: from detail_payment_spps
        $paymentHistory = [];
        if ($siswa) {
            $details = DetailPaymentSpp::where('user_id', $siswa->user_id)
                ->with('payment') // eager load payment to get year etc.
                ->get();
            foreach ($details as $d) {
                $paymentHistory[] = [
                    'id' => $d->id,
                    'amount' => $d->amount,
                    'month' => $d->month,
                    'year' => $d->payment->year ?? null,
                    'status' => $d->status,
                    'payment_date' => $d->updated_at,
                    'receipt' => $d->file ?? null,
                ];
            }
        }

        // Outstanding balance: sum of nominal where status != 'lunas' from invoices
        $outstanding = array_reduce($invoices, function ($carry, $item) {
            return $carry + (($item['status'] !== 'lunas' && isset($item['amount'])) ? $item['amount'] : 0);
        }, 0);

        return response()->json([
            'invoices' => $invoices,
            'paymentHistory' => $paymentHistory,
            'outstanding_balance' => $outstanding,
            'currency' => 'IDR',
        ]);
    }
}