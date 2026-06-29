import { useForm, usePage, Link } from '@inertiajs/inertia-react';
import { useState } from 'react';

export default function Index({ calonSiswa, filters }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = `/admin/calon-siswa?search=${search}&status=${statusFilter}`;
    };

    const handleDelete = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data calon siswa ini?')) {
            fetch(`/admin/calon-siswa/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                    'Accept': 'application/json',
                },
            }).then(() => {
                window.location.reload();
            });
        }
    };

    const handleAccept = (id) => {
        if (window.confirm('Terima calon siswa ini dan konversi menjadi siswa?')) {
            fetch(`/dashboard/ppdb/${id}/accept`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                    'Accept': 'application/json',
                },
            }).then(() => {
                window.location.reload();
            });
        }
    };

    const handleReject = (id) => {
        if (window.confirm('Tolak calon siswa ini?')) {
            fetch(`/dashboard/ppdb/${id}/reject`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                    'Accept': 'application/json',
                },
            }).then(() => {
                window.location.reload();
            });
        }
    };

    const getStatusBadgeClass = (status) => {
        const classes = {
            pendaftaran: 'px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700',
            seleksi: 'px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700',
            lulus: 'px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700',
            tidak_lulus: 'px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700',
        };
        return classes[status] || 'px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700';
    };

    const getKeputusanBadgeClass = (keputusan) => {
        const classes = {
            belum: 'px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700',
            diterima: 'px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700',
            ditolak: 'px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700',
        };
        return classes[keputusan] || 'px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700';
    };

    return (
        <>
            <Head title="PPDB - Calon Siswa" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">PPDB - Calon Siswa</h1>
                    <Link href={route('ppdb.create')} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        Tambah Calon Siswa Baru
                    </Link>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mb-6 bg-white rounded-lg border p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pencarian</label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Nama, NISN, atau No HP..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Semua Status</option>
                                <option value="pendaftaran">Pendaftaran</option>
                                <option value="seleksi">Seleksi</option>
                                <option value="lulus">Lulus</option>
                                <option value="tidak_lulus">Tidak Lulus</option>
                            </select>
                        </div>
                        <div className="flex items-end space-x-2">
                            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex-1">Filter</button>
                            <Link href={route('ppdb.index')} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Reset</Link>
                        </div>
                    </div>
                </form>

                <div className="bg-white rounded-lg border overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">No</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">NISN</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama Lengkap</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Asal Sekolah</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Keputusan</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal Daftar</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {calonSiswa.data.length > 0 ? (
                                calonSiswa.data.map((cs, index) => (
                                    <tr key={cs.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-700">{(calonSiswa.current_page - 1) * calonSiswa.per_page + index + 1}</td>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-700">{cs.nisn}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            <div className="font-semibold">{cs.nama_lengkap}</div>
                                            <div className="text-xs text-gray-500">{cs.no_hp}</div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{cs.asal_sekolah}</td>
                                        <td className="px-4 py-3">
                                            <span className={getStatusBadgeClass(cs.status)}>
                                                {cs.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={getKeputusanBadgeClass(cs.keputusan)}>
                                                {cs.keputusan}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{cs.tanggal_daftar?.format('d M Y')}</td>
                                        <td className="px-4 py-3 text-center whitespace-nowrap">
                                            {cs.keputusan === 'belum' && (
                                                <>
                                                    <button
                                                        onClick={() => handleAccept(cs.id)}
                                                        className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 mr-1"
                                                        title="Terima & Konversi ke Siswa"
                                                    >
                                                        ✓ Terima
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(cs.id)}
                                                        className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 mr-1"
                                                        title="Tolak"
                                                    >
                                                        ✕ Tolak
                                                    </button>
                                                </>
                                            )}
                                            <Link
                                                href={route('ppdb.edit', cs.id)}
                                                className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(cs.id)}
                                                className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 ml-1"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-4 py-8 text-center text-sm text-gray-500">
                                        Tidak ada data calon siswa
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {calonSiswa.data.length > 0 && (
                        <div className="px-4 py-3 flex justify-between items-center border-t">
                            <div className="text-sm text-gray-600">
                                Menampilkan {calonSiswa.from} - {calonSiswa.to} dari {calonSiswa.total} data
                            </div>
                            <div className="flex gap-1">
                                {calonSiswa.prev_page_url && (
                                    <Link
                                        href={calonSiswa.prev_page_url}
                                        className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                                    >
                                        Prev
                                    </Link>
                                )}
                                <Link
                                    href={route('ppdb.index', { ...filters, page: 1 })}
                                    className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                                >
                                    1
                                </Link>
                                {calonSiswa.next_page_url && (
                                    <Link
                                        href={calonSiswa.next_page_url}
                                        className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
