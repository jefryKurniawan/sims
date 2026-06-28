<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Halaman Tidak Ditemukan</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8fafc;
            color: #1e293b;
        }
        .card {
            text-align: center;
            padding: 3rem;
            max-width: 480px;
        }
        .code {
            font-size: 6rem;
            font-weight: 800;
            color: #003366;
            line-height: 1;
        }
        .title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-top: 1rem;
            color: #334155;
        }
        .desc {
            margin-top: 0.5rem;
            color: #64748b;
            line-height: 1.6;
        }
        .btn {
            display: inline-block;
            margin-top: 1.5rem;
            padding: 0.75rem 1.5rem;
            background: #003366;
            color: #fff;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 500;
            transition: background 0.2s;
        }
        .btn:hover { background: #004080; }
    </style>
</head>
<body>
    <div class="card">
        <div class="code">404</div>
        <div class="title">Halaman Tidak Ditemukan</div>
        <div class="desc">Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.</div>
        <a href="{{ url('/') }}" class="btn">Kembali ke Beranda</a>
    </div>
</body>
</html>
