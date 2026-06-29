import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function CTASection() {
  return (
    <section className="bg-emerald-600 text-white py-12 text-center">
      <h3 className="text-2xl font-bold mb-4">Bergabunglah Sekarang!</h3>
      <p className="mb-6">Daftar lewat SPMB 2026 atau kunjungi halaman alumni untuk terhubung.</p>
      <Link
        href="/spmb/daftar"
        className="inline-block bg-white text-emerald-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
      >
        Daftar SPMB 2026
      </Link>
    </section>
  );
}

