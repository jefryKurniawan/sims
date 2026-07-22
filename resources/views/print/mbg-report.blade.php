<style>
    body { font-family: dejavusans, sans-serif; font-size: 9pt; line-height: 1.3; color: #000; }
    .kop { text-align: center; border-bottom: 2px solid #000; padding-bottom: 6pt; margin-bottom: 10pt; }
    .kop .nama-sekolah { font-size: 14pt; font-weight: bold; text-transform: uppercase; }
    .kop .alamat-sekolah { font-size: 9pt; margin-top: 2pt; }
    .kop .telp { font-size: 8pt; color: #555; }
    h1 { font-size: 12pt; font-weight: bold; text-align: center; text-transform: uppercase; margin: 10pt 0 6pt; }
    h2 { font-size: 10pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #666; padding: 3pt 0; margin: 10pt 0 4pt; }
    table.data { width: 100%; border-collapse: collapse; font-size: 8pt; margin-top: 4pt; }
    table.data th { background-color: #eee; border: 1px solid #666; padding: 3pt 4pt; text-align: center; font-weight: bold; }
    table.data td { border: 1px solid #666; padding: 3pt 4pt; }
    table.data td.center { text-align: center; }
    table.data td.right { text-align: right; }
    .summary-box { border: 1px solid #000; padding: 6pt; margin: 6pt 0; background: #f9f9f9; }
    .summary-box table { width: 100%; font-size: 9pt; }
    .summary-box td { padding: 2pt 6pt; }
    .footer { margin-top: 30pt; font-size: 8pt; text-align: center; color: #666; border-top: 1px solid #ccc; padding-top: 6pt; }
</style>

<div class="kop">
    <div class="nama-sekolah">{{ $sekolah ?? 'SEKOLAHKU' }}</div>
    <div class="alamat-sekolah">{{ $alamat ?? 'Jalan Pendidikan No. 1' }}</div>
    <div class="telp">Program Makan Bergizi Gratis (MBG) — Badan Gizi Nasional</div>
</div>

<h1>LAPORAN BULANAN MBG<br><span style="font-size: 9pt; font-weight: normal;">Periode: {{ \Carbon\Carbon::create()->month($bulan)->locale('id')->isoFormat('MMMM') }} {{ $tahun }}</span></h1>

<div class="summary-box">
    <table>
        <tr><td style="width: 50%;"><strong>Total Hari Pelaksanaan:</strong> {{ $basts->count() }} hari</td>
            <td style="width: 50%;"><strong>Total Porsi Dipesan:</strong> {{ $basts->sum('porsi_dipesan') }}</td></tr>
        <tr><td><strong>Total Porsi Diterima:</strong> {{ $basts->sum('porsi_diterima') }}</td>
            <td><strong>Rata-rata Harian:</strong> {{ $basts->count() > 0 ? round($basts->sum('porsi_diterima') / $basts->count(), 0) : 0 }} porsi</td></tr>
        <tr><td><strong>Total BAST Diterima:</strong> {{ $basts->where('status', 'diterima')->count() }}</td>
            <td><strong>Total BAST Ditolak:</strong> {{ $basts->where('status', 'ditolak')->count() }}</td></tr>
    </table>
</div>

<h2>Rekapitulasi Harian</h2>
<table class="data">
    <thead>
        <tr>
            <th style="width: 5%;">No</th>
            <th style="width: 15%;">Tanggal</th>
            <th style="width: 10%;">Jam Datang</th>
            <th style="width: 12%;">Porsi Pesan</th>
            <th style="width: 12%;">Porsi Terima</th>
            <th style="width: 18%;">Kurir</th>
            <th style="width: 12%;">Status</th>
            <th style="width: 16%;">Catatan</th>
        </tr>
    </thead>
    <tbody>
        @forelse ($basts as $idx => $bast)
        <tr>
            <td class="center">{{ $idx + 1 }}</td>
            <td class="center">{{ \Carbon\Carbon::parse($bast->tanggal)->isoFormat('DD-MM-YYYY') }}</td>
            <td class="center">{{ $bast->waktu_datang ?? '-' }}</td>
            <td class="center">{{ $bast->porsi_dipesan }}</td>
            <td class="center">{{ $bast->porsi_diterima }}</td>
            <td>{{ $bast->nama_kurir ?? '-' }}</td>
            <td class="center">{{ strtoupper($bast->status) }}</td>
            <td>{{ $bast->catatan ?? '-' }}</td>
        </tr>
        @empty
        <tr><td colspan="8" class="center" style="font-style: italic;">Belum ada data BAST pada periode ini.</td></tr>
        @endforelse
    </tbody>
</table>

<div style="margin-top: 14pt;">
    <table style="width: 100%; font-size: 8pt;">
        <tr>
            <td style="width: 33%; text-align: center;">
                <div>Mengetahui,<br>Kepala Sekolah</div>
                <div style="height: 40pt;"></div>
                <div style="border-top: 1px solid #000; width: 70%; margin: 0 auto; padding-top: 2pt;">_________________________</div>
            </td>
            <td style="width: 33%; text-align: center;">
                <div>PPH / PIC MBG</div>
                <div style="height: 40pt;"></div>
                <div style="border-top: 1px solid #000; width: 70%; margin: 0 auto; padding-top: 2pt;">_________________________</div>
            </td>
            <td style="width: 33%; text-align: center;">
                <div>Mengetahui,<br>Komite Sekolah</div>
                <div style="height: 40pt;"></div>
                <div style="border-top: 1px solid #000; width: 70%; margin: 0 auto; padding-top: 2pt;">_________________________</div>
            </td>
        </tr>
    </table>
</div>

<div class="footer">
    Dokumen ini dicetak dari sistem {{ $sekolah }} — SIMS (Sistem Informasi Manajemen Sekolah) — {{ now()->isoFormat('DD MMMM YYYY') }}
</div>
