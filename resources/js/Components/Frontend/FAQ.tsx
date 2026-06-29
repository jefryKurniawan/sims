import React from 'react';

export default function FAQ() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Pertanyaan Umum</h2>
        <details className="border-b py-4">
          <summary className="font-medium cursor-pointer">Apa itu Sekolahku?</summary>
          <p className="mt-2 text-gray-600">Sekolahku adalah platform manajemen sekolah terintegrasi untuk PPDB, SPP, perpustakaan, alumni, dll.</p>
        </details>
        <details className="border-b py-4">
          <summary className="font-medium cursor-pointer">Bagaimana cara mendaftar?</summary>
          <p className="mt-2 text-gray-600">Kunjungi menu PPDB dan isi formulir pendaftaran.</p>
        </details>
        <details className="border-b py-4">
          <summary className="font-medium cursor-pointer">Apakah ada biaya?</summary>
          <p className="mt-2 text-gray-600">Pendaftaran gratis, namun ada biaya administrasi sesuai kebijakan sekolah.</p>
        </details>
      </div>
    </section>
  );
}

