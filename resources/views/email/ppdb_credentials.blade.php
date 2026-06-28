@component('mail::message')
# Selamat Datang di Portal Orang Tua Sekolahku

Hallo {{ $name }},

Selamat! Akun Anda telah berhasil dibuat untuk mengakses Portal Orang Tua Sekolahku.

Berikut adalah kredensial masuk Anda:

- Email: {{ $email }}
- Password: {{ $password }}

Silakan segera mengganti password setelah pertama kali login untuk keamanan akun Anda.

Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi administrasi sekolah.

Terima kasih,
Tim Sekolahku
@endcomponent