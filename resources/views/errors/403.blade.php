<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>403 - Akses Ditolak</title>
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
            color: #dc2626;
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
        <div class="code">403</div>
        <div class="title">Akses Ditolak</div>
        <div class="desc">Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.</div>
        <a href="{{ url('/') }}" class="btn">Kembali ke Beranda</a>
    </div>
</body>
</html>
