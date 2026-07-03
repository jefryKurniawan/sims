import { Head, Link } from '@inertiajs/inertia-react';
import { ChevronLeft } from 'lucide-react';

export default function Show({ murid }: { murid: any }) {
  return (
    <>
      <Head title={`Detail Murid - ${murid.name}`} />
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Detail Murid</h1>
            <p className="text-sm text-gray-500 mt-0.5">{murid.name}</p>
          </div>
          <Link href={route('users.murid.index')} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
            <ChevronLeft className="w-4 h-4" />Kembali
          </Link>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm p-6 space-y-4 max-w-2xl">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label">Nama</p>
            <p className="text-lg font-semibold text-gray-900">{murid.name}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label">Username</p>
            <p className="text-lg font-semibold text-gray-900">{murid.username || '-'}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label">Email</p>
            <p className="text-lg font-semibold text-gray-900">{murid.email}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label">Role</p>
            <span className="inline-flex px-2 py-0.5 text-sm font-medium rounded-full bg-blue-100 text-blue-700">{murid.role}</span>
          </div>
          <div className="border-t pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label">Status</p>
            <span className={`inline-flex px-2 py-0.5 text-sm font-medium rounded-full ${murid.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{murid.status === 'active' ? 'Aktif' : 'Nonaktif'}</span>
          </div>
        </div>
      </div>
    </>
  );
}