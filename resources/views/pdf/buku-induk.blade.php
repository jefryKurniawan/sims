<style>
    body { font-family: dejavusans, sans-serif; font-size: 10pt; line-height: 1.4; color: #000; }
    .kop { text-align: center; border-bottom: 2px solid #000; padding-bottom: 6pt; margin-bottom: 12pt; }
    .kop .nama-sekolah { font-size: 14pt; font-weight: bold; text-transform: uppercase; }
    h1 { font-size: 12pt; font-weight: bold; text-align: center; text-transform: uppercase; margin: 12pt 0 8pt; }
    h2 { font-size: 10pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #999; padding: 3pt 0; margin: 14pt 0 6pt; }
    table.layout { width: 100%; border-collapse: collapse; font-size: 10pt; }
    table.layout td.label { width: 30%; font-weight: bold; vertical-align: top; padding: 1.5pt 4pt 1.5pt 0; }
    table.layout td.value { width: 70%; vertical-align: top; padding: 1.5pt 0; }
    table.data { width: 100%; border-collapse: collapse; font-size: 9.5pt; margin-top: 4pt; }
    table.data th { background-color: #eee; border: 1px solid #666; padding: 3pt 4pt; text-align: left; font-weight: bold; }
    table.data td { border: 1px solid #666; padding: 3pt 4pt; }
    .identitas-siswa { background: #f5f5f5; padding: 8pt; border: 1px solid #ccc; margin: 6pt 0 12pt; }
    .identitas-siswa .nama { font-size: 13pt; font-weight: bold; text-align: center; }
    .identitas-siswa .meta { text-align: center; font-size: 10pt; }
    .footer { margin-top: 24pt; text-align: right; }
    .footer p { margin: 2pt 0; font-size: 10pt; }
    .ttd { margin-top: 50pt; border-bottom: 1px solid #000; width: 60%; margin-left: auto; }
    .empty-data { font-style: italic; color: #666; }
</style>

<div class="kop">
    <div class="nama-sekolah">{{ $namaSekolah ?? 'NAMA SEKOLAH' }}</div>
</div>

<h1>BUKU INDUK SISWA</h1>

<div class="identitas-siswa">
    <div class="nama">{{ $siswa->nama_lengkap ?? '-' }}</div>
    <div class="meta">
        NISN: {{ $siswa->nisn ?? '-' }} | NIS: {{ $siswa->nis ?? '-' }}
        | {{ $siswa->jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}
        | Status: {{ ucfirst($siswa->status ?? '-') }}
    </div>
</div>

<h2>Identitas Siswa</h2>
<table class="layout">
    <tr><td class="label">Nama Lengkap</td><td class="value">: {{ $siswa->nama_lengkap ?? '-' }}</td></tr>
    <tr><td class="label">NISN</td><td class="value">: {{ $siswa->nisn ?? '-' }}</td></tr>
    <tr><td class="label">NIS</td><td class="value">: {{ $siswa->nis ?? '-' }}</td></tr>
    <tr><td class="label">Tempat / Tgl Lahir</td><td class="value">: {{ $siswa->tempat_lahir ?? '-' }}, {{ $siswa->tanggal_lahir ?? '-' }}</td></tr>
    <tr><td class="label">Jenis Kelamin</td><td class="value">: {{ $siswa->jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</td></tr>
    <tr><td class="label">Agama</td><td class="value">: {{ $bukuInduk->agama ?? '-' }}</td></tr>
    <tr><td class="label">Anak ke-</td><td class="value">: {{ $bukuInduk->anak_ke ?? '-' }}</td></tr>
    <tr><td class="label">Jumlah Saudara</td><td class="value">: {{ $bukuInduk->jumlah_saudara ?? '-' }}</td></tr>
    <tr><td class="label">Alamat</td><td class="value">: {{ $siswa->alamat ?? '-' }}</td></tr>
</table>

<h2>Data Orang Tua / Wali</h2>
@if (!$orangTua || count($orangTua) === 0)
    <p class="empty-data">Belum ada data</p>
@else
    <table class="data">
        <thead><tr><th>Hubungan</th><th>Nama</th><th>Pekerjaan</th><th>Pendidikan</th><th>No HP</th></tr></thead>
        <tbody>
        @foreach ($orangTua as $o)
            <tr><td>{{ $o->hubungan ?? '-' }}</td><td>{{ $o->nama_lengkap ?? '-' }}</td><td>{{ $o->pekerjaan ?? '-' }}</td><td>{{ $o->pendidikan_terakhir ?? '-' }}</td><td>{{ $o->no_hp ?? '-' }}</td></tr>
        @endforeach
        </tbody>
    </table>
@endif

<h2>Rekam Medis</h2>
<table class="layout">
    <tr><td class="label">Golongan Darah</td><td class="value">: {{ $rekamMedis->golongan_darah ?? '-' }}</td></tr>
    <tr><td class="label">Alergi</td><td class="value">: {{ $rekamMedis->alergi ?? '-' }}</td></tr>
    <tr><td class="label">Penyakit Terdahulu</td><td class="value">: {{ $rekamMedis->penyakit_terdahulu ?? '-' }}</td></tr>
    <tr><td class="label">Berat Badan (kg)</td><td class="value">: {{ $bukuInduk->berat_badan_kg ?? '-' }}</td></tr>
    <tr><td class="label">Tinggi Badan (cm)</td><td class="value">: {{ $bukuInduk->tinggi_badan_cm ?? '-' }}</td></tr>
</table>

<h2>Riwayat Mutasi</h2>
@if (!$mutasi || count($mutasi) === 0)
    <p class="empty-data">Tidak ada riwayat mutasi</p>
@else
    <table class="data">
        <thead><tr><th>Tanggal</th><th>Jenis</th><th>Sekolah</th><th>Alasan</th></tr></thead>
        <tbody>
        @foreach ($mutasi as $m)
            <tr><td>{{ $m->tanggal_mutasi ?? '-' }}</td><td>{{ ucfirst($m->jenis ?? '-') }}</td><td>{{ $m->jenis === 'masuk' ? ($m->asal_sekolah ?? '-') : ($m->sekolah_tujuan ?? '-') }}</td><td>{{ $m->alasan ?? '-' }}</td></tr>
        @endforeach
        </tbody>
    </table>
@endif

<div class="footer">
    <p>Jakarta, {{ date('d F Y') }}</p>
    <p style="font-weight: bold;">Kepala Sekolah,</p>
    <div class="ttd"></div>
    @if (!empty($namaKepalaSekolah))
        <p style="font-weight: bold; margin-top: 2pt;"><u>{{ $namaKepalaSekolah }}</u></p>
    @else
        <p style="font-size: 9pt; color: #999; margin-top: 2pt;">(....................................)</p>
    @endif
</div>