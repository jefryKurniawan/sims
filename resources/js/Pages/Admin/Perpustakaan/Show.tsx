import { Head, Link } from '@inertiajs/inertia-react';
import { ChevronLeft } from 'lucide-react';

export default function Show({ buku }: { buku: any }) {
  return (
    <>
      <Head title={`Detail Buku - ${buku.judul}`} />
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Detail Buku</h1>
            <p className="text-sm text-gray-500 mt-0.5">{buku.judul}</p>
          </div>
          <Link href={route('admin.perpustakaan.index')} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
            <ChevronLeft className="w-4 h-4" />Kembali
          </Link>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm p-6 space-y-4 max-w-2xl">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label">Judul</p>
            <p className="text-lg font-semibold text-gray-900">{buku.judul}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label">Penulis</p>
            <p className="text-lg font-semibold text-gray-900">{buku.penulis}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label">Penerbit</p>
            <p className="text-lg font-semibold text-gray-900">{buku.penerbit || '-'}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label">Tahun Terbit</p>
            <p className="text-lg font-semibold text-gray-900">{buku.tahun_terbit || '-'}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label">ISBN</p>
            <p className="text-lg font-semibold text-gray-900">{buku.isbn || '-'}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label">Kategori</p>
            <p className="text-lg font-semibold text-gray-900">{buku.kategori || '-'}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label">Jumlah Halaman</p>
            <p className="text-lg font-semibold text-gray-900">{buku.jumlah_halaman || '-'}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label">Deskripsi</p>
            <p className="text-base text-gray-700">{buku.deskripsi || '-'}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label">Stok</p>
            <p className="text-lg font-semibold text-gray-900">{buku.jumalah_stok}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label">Lokasi Rak</p>
            <p className="text-lg font-semibold text-gray-900">{buku.lokasi_rak || '-'}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label">Status</p>
            <span className={`inline-flex px-2 py-0.5 text-sm font-medium rounded-full ${buku.tersedia ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{buku.tersedia ? 'Tersedia' : 'Dipinjam'}</span>
          </div>
        </div>
      </div>
    </>
  );
}