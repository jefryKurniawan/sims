@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Edit Dispensasi</h4>
                    <a href="{{ route('dispensasi.index') }}" class="btn btn-sm btn-secondary float-end">Kembali</a>
                </div>
                <div class="card-body">
                    <form action="{{ route('dispensasi.update', $dispensasi->id) }}" method="POST">
                        @csrf
                        @method('PUT')
                        <div class="row mb-3">
                            <label for="siswa_id" class="col-sm-3 col-form-label">Siswa</label>
                            <div class="col-sm-9">
                                <select class="form-select" name="siswa_id" id="siswa_id" required>
                                    <option value="">-- Pilih Siswa --</option>
                                    @foreach($siswa as $id => $nama)
                                        <option value="{{ $id }}" {{ $dispensasi->siswa_id == $id ? 'selected' : '' }}>{{ $nama }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="jenis" class="col-sm-3 col-form-label">Jenis Dispensasi</label>
                            <div class="col-sm-9">
                                <select class="form-select" name="jenis" id="jenis" required>
                                    <option value="potongan" {{ $dispensasi->jenis == 'potongan' ? 'selected' : '' }}>Potongan</option>
                                    <option value="penundaan" {{ $dispensasi->jenis == 'penundaan' ? 'selected' : '' }}>Penundaan</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="nominal" class="col-sm-3 col-form-label">Nominal (Rp)</label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control" name="nominal" id="nominal" placeholder=" placeholder="Contoh: 500000" step="0.01" min="0" value="{{ old('nominal', $dispensasi->nominal) }}" required>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="tanggal_mulai" class="col-sm-3 col-form-label">Tanggal Mulai</label>
                            <div class="col-sm-9">
                                <input type="date" class="form-control" name="tanggal_mulai" id="tanggal_mulai" value="{{ old('tanggal_mulai', $dispensasi->tanggal_mulai) }}">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="tanggal_selesai" class="col-sm-3 col-form-label">Tanggal Selesai</label>
                            <div class="col-sm-9">
                                <input type="date" class="form-control" name="tanggal_selesai" id="tanggal_selesai" value="{{ old('tanggal_selesai', $dispensasi->tanggal_selesai) }}">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="keterangan" class="col-sm-3 col-form-label">Keterangan</label>
                            <div class="col-sm-9">
                                <textarea class="form-control" name="keterangan" id="keterangan" rows="3">{{ old('keterangan', $dispensasi->keterangan) }}</textarea>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-9 offset-sm-3">
                                <button type="submit" class="btn btn-primary">Update</button>
                                <a href="{{ route('dispensasi.index') }}" class="btn btn-secondary">Batal</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection