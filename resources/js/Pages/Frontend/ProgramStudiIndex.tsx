import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';

interface Jurusan {
  id: number;
  slug: string;
  nama: string;
  deskripsi?: string | null;
  gambar?: string | null;
}

interface Props {
  jurusanM: Jurusan[];
}

export default function ProgramStudiIndex({ jurusanM }: Props) {
  return (
    <>
      <Head title="Mata Pelajaran - SMAS St. Bonaventura" />
      <Header />
      <section className="pt-28 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mata Pelajaran</h1>
        <p className="text-gray-600 mb-8">Daftar program studi yang tersedia di sekolah kami.</p>

        {jurusanM.length === 0 ? (
          <p className="text-gray-500">Belum ada data program studi.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jurusanM.map((j) => (
              <Link
                key={j.id}
                href={route('program.studi', j.slug)}
                className="group block rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {j.gambar && (
                  <img
                    src={`/storage/images/jurusan/${j.gambar}`}
                    alt={j.nama}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="font-semibold text-lg text-gray-900 group-hover:text-[#003366]">
                    {j.nama}
                  </h2>
                  {j.deskripsi && (
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{j.deskripsi}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
