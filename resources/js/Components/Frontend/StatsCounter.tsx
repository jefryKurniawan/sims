import React from 'react';

export default function StatsCounter() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50">
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">0</p>
        <p className="text-sm text-gray-600">Siswa Aktif</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">0</p>
        <p className="text-sm text-gray-600">PPDB Daftar</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">0</p>
        <p className="text-sm text-gray-600">Peminjaman Buku</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">0</p>
        <p className="text-sm text-gray-600">Pembayaran SPP</p>
      </div>
    </section>
  );
}

