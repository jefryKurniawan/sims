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
        $role = $user->role ?? '';

        // Redirect Guest/PPDB to dashboard
        if ($role == 'Guest' || $role == 'PPDB') {
            return redirect()->route('dashboard');
        }

        $data = [];

        if ($role == 'admin') {
            $data['guru'] = User::where('role', 'guru')->count();
            $data['murid'] = User::where('role', 'murid')->count();
            $data['alumni'] = User::where('role', 'alumni')->count();
            $data['event'] = Events::where('is_active', '0')->first();
            $data['acara'] = Events::where('is_active', '0')->count(); // total active events
            $data['book'] = Book::sum('stock');
            $data['borrow'] = Borrowing::whereNull('lateness')->count();
            $data['member'] = Member::where('is_active', 0)->count();
        } elseif ($role == 'murid') {
            $authId = Auth::id();
            $data['event'] = Events::where('is_active', '0')->first();
            $data['lateness'] = Borrowing::with('members')
                ->when($authId, function ($q) use ($authId) {
                    $q->whereHas('members', function ($a) use ($authId) {
                        $a->where('user_id', $authId);
                    });
                })
                ->whereNull('lateness')
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
            $data['book'] = Book::sum('stock');
            $data['borrow'] = Borrowing::whereNull('lateness')->count();
            $data['member'] = Member::where('is_active', 0)->count();
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