<style>
    body { font-family: dejavusans, sans-serif; font-size: 9.5pt; line-height: 1.3; color: #000; }
    .kop { text-align: center; border-bottom: 2px solid #000; padding-bottom: 6pt; margin-bottom: 10pt; }
    .kop .nama-sekolah { font-size: 13pt; font-weight: bold; text-transform: uppercase; }
    .kop .alamat-sekolah { font-size: 9pt; margin-top: 2pt; }
    h1 { font-size: 12pt; font-weight: bold; text-align: center; text-transform: uppercase; margin: 10pt 0 6pt; }
    h2 { font-size: 9.5pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #666; padding: 2pt 0; margin: 10pt 0 4pt; }
    h3 { font-size: 9.5pt; font-weight: bold; margin: 8pt 0 4pt; }
    table.layout { width: 100%; border-collapse: collapse; font-size: 9pt; }
    table.layout td.label { width: 30%; font-weight: bold; vertical-align: top; padding: 1.5pt 4pt 1.5pt 0; }
    table.layout td.value { width: 70%; vertical-align: top; padding: 1.5pt 0; }
    table.data { width: 100%; border-collapse: collapse; font-size: 8pt; margin-top: 4pt; }
    table.data th { background-color: #eee; border: 1px solid #666; padding: 2pt 3pt; text-align: center; font-weight: bold; }
    table.data td { border: 1px solid #666; padding: 2pt 3pt; }
    table.data td.center { text-align: center; }
    table.data td.right { text-align: right; }
    .footer { margin-top: 20pt; }
    .ttd { margin-top: 40pt; border-bottom: 1px solid #000; width: 45%; margin-left: auto; }
    .empty-data { font-style: italic; color: #666; }
    .semester-badge { display: inline-block; padding: 2pt 6pt; border: 1px solid #000; font-size: 8pt; font-weight: bold; }
</style>

<div class="kop">
    <div class="nama-sekolah">{{ $namaSekolah ?? 'NAMA SEKOLAH' }}</div>
    <div class="alamat-sekolah">{{ $alamatSekolah ?? 'ALAMAT SEKOLAH' }}</div>
</div>

<h1>RAPOR SISWA<br><span style="font-size: 10pt; font-weight: normal;">SEMPESTER {{ strtoupper($raporSiswa->semester) }} TAHUN AJARAN {{ $raporSiswa->tahun_ajaran }}</span></h1>

<div style="background: #f5f5f5; padding: 6pt; border: 1px solid #ccc; margin-bottom: 8pt;">
    <table class="layout">
        <tr><td class="label">Nama Lengkap</td><td class="value">: {{ $raporSiswa->siswa->nama_lengkap ?? '-' }}</td></tr>
        <tr><td class="label">NISN / NIS</td><td class="value">: {{ $raporSiswa->siswa->nisn ?? '-' }} / {{ $raporSiswa->siswa->nis ?? '-' }}</td></tr>
        <tr><td class="label">Kelas / Jurusan</td><td class="value">: {{ $raporSiswa->raporKelas->tingkat ?? '-' }} {{ $raporSiswa->raporKelas->nama_kelas ?? '-' }} ({{ $raporSiswa->raporKelas->jurusan->nama ?? '-' }})</td></tr>
        <tr><td class="label">Semester / Tahun Ajaran</td><td class="value">: {{ $raporSiswa->semester }} / {{ $raporSiswa->tahun_ajaran }}</td></tr>
    </table>
</div>

<h2>Nilai Akademik</h2>
@if (!$raporNilai || count($raporNilai) === 0)
    <p class="empty-data">Belum ada nilai yang diinput.</p>
@else
    <table class="data">
        <thead>
            <tr>
                <th style="width: 5%;">No</th>
                <th style="width: 35%;">Mata Pelajaran</th>
                <th style="width: 15%;">KKM</th>
                <th style="width: 12%;">Pengetahuan</th>
                <th style="width: 13%;">Predikat P</th>
                <th style="width: 12%;">Keterampilan</th>
                <th style="width: 13%;">Predikat K</th>
            </tr>
        </thead>
        <tbody>
        @foreach ($raporNilai as $idx => $nilai)
            <tr>
                <td class="center">{{ $idx + 1 }}</td>
                <td>{{ $nilai->raporMapel->nama_mapel ?? '-' }}</td>
                <td class="center">{{ $nilai->raporMapel->kkm ?? '-' }}</td>
                <td class="center">{{ $nilai->nilai_pengetahuan ?? '-' }}</td>
                <td class="center">{{ $nilai->predikat_pengetahuan ?? '-' }}</td>
                <td class="center">{{ $nilai->nilai_keterampilan ?? '-' }}</td>
                <td class="center">{{ $nilai->predikat_keterampilan ?? '-' }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endif

<h2>Deskripsi Mata Pelajaran</h2>
@if (!$raporDeskripsi || count($raporDeskripsi) === 0)
    <p class="empty-data">Belum ada deskripsi.</p>
@else
    <table class="data">
        <thead>
            <tr>
                <th style="width: 5%;">No</th>
                <th style="width: 35%;">Mata Pelajaran</th>
                <th style="width: 30%;">Pengetahuan</th>
                <th style="width: 30%;">Keterampilan</th>
            </tr>
        </thead>
        <tbody>
        @foreach ($raporDeskripsi as $idx => $desc)
            <tr>
                <td class="center">{{ $idx + 1 }}</td>
                <td>{{ $desc->raporMapel->nama_mapel ?? '-' }}</td>
                <td>{{ $desc->deskripsi_pengetahuan ?? '-' }}</td>
                <td>{{ $desc->deskripsi_keterampilan ?? '-' }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endif

<h2>Ekstrakurikuler</h2>
@if (!$raporEkstrakurikuler || count($raporEkstrakurikuler) === 0)
    <p class="empty-data">Belum ada data ekstrakurikuler.</p>
@else
    <table class="data">
        <thead>
            <tr>
                <th style="width: 5%;">No</th>
                <th style="width: 45%;">Nama Ekstrakurikuler</th>
                <th style="width: 15%;">Nilai</th>
                <th style="width: 35%;">Deskripsi</th>
            </tr>
        </thead>
        <tbody>
        @foreach ($raporEkstrakurikuler as $idx => $ekskul)
            <tr>
                <td class="center">{{ $idx + 1 }}</td>
                <td>{{ $ekskul->nama_ekskul }}</td>
                <td class="center">{{ $ekskul->nilai }}</td>
                <td>{{ $ekskul->deskripsi ?? '-' }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endif

<h2>Projek P5</h2>
@if (!$p5Nilai || count($p5Nilai) === 0)
    <p class="empty-data">Belum ada data Projek P5.</p>
@else
    <table class="data">
        <thead>
            <tr>
                <th style="width: 5%;">No</th>
                <th style="width: 35%;">Nama Projek</th>
                <th style="width: 30%;">Dimensi</th>
                <th style="width: 30%;">Nilai</th>
            </tr>
        </thead>
        <tbody>
        @foreach ($p5Nilai as $idx => $p5)
            <tr>
                <td class="center">{{ $idx + 1 }}</td>
                <td>{{ $p5->p5Projek->nama_projek ?? '-' }}</td>
                <td>{{ $p5->p5Projek->dimensi ?? '-' }}</td>
                <td class="center">{{ $p5->nilai ?? '-' }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endif

<h2>Catatan</h2>
<table class="layout">
    @if ($raporCatatan)
        <tr><td class="label">Catatan Wali Kelas</td><td class="value">: {{ $raporCatatan->catatan_wali_kelas ?? '-' }}</td></tr>
        <tr><td class="label">Catatan Orang Tua</td><td class="value">: {{ $raporCatatan->catatan_ortu ?? '-' }}</td></tr>
        <tr><td class="label">Tinggi Badan</td><td class="value">: {{ $raporCatatan->tinggi_badan ?? '-' }} cm</td></tr>
        <tr><td class="label">Berat Badan</td><td class="value">: {{ $raporCatatan->berat_badan ?? '-' }} kg</td></tr>
        <tr><td class="label">Sakit</td><td class="value">: {{ $raporCatatan->jumlah_sakit ?? 0 }} hari</td></tr>
        <tr><td class="label">Izin</td><td class="value">: {{ $raporCatatan->jumlah_izin ?? 0 }} hari</td></tr>
        <tr><td class="label">Alpha</td><td class="value">: {{ $raporCatatan->jumlah_alpha ?? 0 }} hari</td></tr>
    @else
        <tr><td colspan="2" class="empty-data">Belum ada catatan.</td></tr>
    @endif
</table>

<div class="footer">
    {{ $kota ?? 'Kota' }}, {{ date('d F Y') }}<br>
    <strong>Wali Kelas,</strong>
    <div class="ttd"></div>
    @if (!empty($namaWaliKelas))
        <p style="font-weight: bold; margin-top: 2pt;"><u>{{ $namaWaliKelas }}</u></p>
    @else
        <p style="font-size: 9pt; color: #999; margin-top: 2pt;">(....................................)</p>
    @endif
</div>
