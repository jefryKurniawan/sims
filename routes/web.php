<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| here is where you register web routes for the application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

require base_path('routes/frontend.php');
require base_path('routes/admin.php');

Route::get('/diagnose', [\App\Http\Controllers\DiagnoseController::class, 'index']);