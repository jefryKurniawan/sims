<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Carbon;

class DiagnoseController extends Controller
{
    public function index()
    {
        $dbConnected = false;
        try {
            DB::connection()->getPdo();
            $dbConnected = true;
        } catch (\Exception $e) {
            $dbConnected = false;
        }

        return response()->json([
            'status' => 'ok',
            'environment' => App::environment(),
            'debug' => App::environment('local'),
            'database_connection' => $dbConnected ? 'connected' : 'failed',
            'timestamp' => Carbon::now()->toDateTimeString(),
        ]);
    }
}