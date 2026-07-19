<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MasterBank;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Http\Controllers\Concerns\HandlesImport;

class MasterBankController extends Controller
{
    use HandlesImport;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Admin/MasterBank/Index', [
            'banks' => MasterBank::withTrashed()->get()->map(fn ($bank) => [
                'id' => $bank->id,
                'nama_bank' => $bank->nama_bank,
                'kode_bank' => $bank->kode_bank,
                'cabang' => $bank->cabang,
                'rekening_default' => $bank->rekening_default,
                'deleted_at' => $bank->deleted_at,
            ]),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/MasterBank/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_bank' => 'required|string|max:255',
            'kode_bank' => 'required|string|max:20',
            'cabang' => 'required|string|max:255',
            'rekening_default' => 'required|string|max:255',
        ]);

        MasterBank::create($validated);

        return Redirect::route('master-bank.index')
            ->with('success', 'Bank berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $bank = MasterBank::withTrashed()->findOrFail($id);

        return Inertia::render('Admin/MasterBank/Show', [
            'bank' => [
                'id' => $bank->id,
                'nama_bank' => $bank->nama_bank,
                'kode_bank' => $bank->kode_bank,
                'cabang' => $bank->cabang,
                'rekening_default' => $bank->rekening_default,
                'deleted_at' => $bank->deleted_at,
                'created_at' => $bank->created_at,
                'updated_at' => $bank->updated_at,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $bank = MasterBank::findOrFail($id);

        return Inertia::render('Admin/MasterBank/Edit', [
            'bank' => [
                'id' => $bank->id,
                'nama_bank' => $bank->nama_bank,
                'kode_bank' => $bank->kode_bank,
                'cabang' => $bank->cabang,
                'rekening_default' => $bank->rekening_default,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama_bank' => 'required|string|max:255',
            'kode_bank' => 'required|string|max:20',
            'cabang' => 'required|string|max:255',
            'rekening_default' => 'required|string|max:255',
        ]);

        $bank = MasterBank::findOrFail($id);
        $bank->update($validated);

        return Redirect::route('master-bank.index')
            ->with('success', 'Bank berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $bank = MasterBank::findOrFail($id);
        $bank->delete();

        return Redirect::route('master-bank.index')
            ->with('success', 'Bank berhasil dihapus.');
    }
    /**
     * Show import form.
     */
    public function importForm()
    {
        return Inertia::render('Admin/MasterBank/Import');
    }

    /**
     * Process import.
     */
    public function import(Request $request)
    {
        $this->validate($request, [
            'file' => 'required|file|mimes:xlsx,xls,csv|max:10240',
        ]);

        $result = $this->runImport($request, MasterBank::class, function ($row) {
            // map Excel columns to model attributes
            return [
                'nama_bank' => $row['nama_bank'] ?? null,
                'kode_bank' => $row['kode_bank'] ?? null,
                'cabang' => $row['cabang'] ?? null,
                'rekening_default' => $row['rekening_default'] ?? null,
            ];
        });

        $flash = $this->importFlash($result);
        return redirect()
            ->back()
            ->with($flash['success'] ? ['success' => $flash['success']] : ['error' => $flash['error']]);
    }
}