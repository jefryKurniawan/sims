<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Events;
use App\Models\Book;
use App\Models\Borrowing;
use App\Models\Member;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $role = strtolower($user->role ?? '');

        // Redirect Guest/PPDB to dashboard
        if ($role == 'guest' || $role == 'ppdb') {
            return redirect()->route('dashboard');
        }

        $data = [];

        if ($role == 'admin') {
            $data['guru'] = User::whereRaw('LOWER(role) = ?', ['guru'])->count();
            $data['murid'] = User::whereRaw('LOWER(role) = ?', ['murid'])->count();
            $data['alumni'] = User::whereRaw('LOWER(role) = ?', ['alumni'])->count();
            $data['event'] = Events::where('is_active', '0')->first();
            $data['acara'] = Events::where('is_active', '0')->count(); // total active events
            $data['book'] = Book::sum('stok');
            $data['borrow'] = Borrowing::whereNull('tanggal_kembali')->count();
            $data['member'] = Member::where('status', 'nonaktif')->count();
        } elseif ($role == 'murid') {
            $authId = Auth::id();
            $data['event'] = Events::where('is_active', '0')->first();
            $data['lateness'] = Borrowing::with('members')
                ->when($authId, function ($q) use ($authId) {
                    $q->whereHas('members', function ($a) use ($authId) {
                        $a->where('user_id', $authId);
                    });
                })
                ->whereNull('tanggal_kembali')
                ->count();
            $data['pinjam'] = Borrowing::with('members')
                ->when($authId, function ($q) use ($authId) {
                    $q->whereHas('members', function ($a) use ($authId) {
                        $a->where('user_id', $authId);
                    });
                })
                ->count();
        } elseif ($role == 'guru' || $role == 'staf') {
            $data['event'] = Events::where('is_active', '0')->first();
        } elseif ($role == 'perpustakaan') {
            $data['book'] = Book::sum('stok');
            $data['borrow'] = Borrowing::whereNull('tanggal_kembali')->count();
            $data['member'] = Member::where('status', 'nonaktif')->count();
            $data['members'] = Member::count();
        }
        // For other roles (including empty role), we pass empty data

        return Inertia::render('Admin/Home', [
            'auth' => [
                'user' => $user
            ],
            'data' => $data
        ]);
    }
}
