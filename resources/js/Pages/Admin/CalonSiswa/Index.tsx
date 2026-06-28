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
            pendaftaran: 'badge badge-warning',
            seleksi: 'badge badge-info',
            lulus: 'badge badge-success',
            tidak_lulus: 'badge badge-error',
        };
        return classes[status] || 'badge badge-neutral';
    };

    const getKeputusanBadgeClass = (keputusan) => {
        const classes = {
            belum: 'badge badge-neutral',
            diterima: 'badge badge-success',
            ditolak: 'badge badge-error',
        };
        return classes[keputusan] || 'badge badge-neutral';
    };

    return (
        <>
            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">PPDB - Calon Siswa</h1>
                    <Link href={route('ppdb.create')} className="btn btn-primary">
                        Tambah Calon Siswa Baru
                    </Link>
                </div>

                {flash?.success && (
                    <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {flash.success}
                    </div>
                )}
            </div>

            {/* Filter Form */}
            <form onSubmit={handleSubmit} className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="label"><span className="label-text">Pencarian</span></label>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Nama, NISN, atau No HP..."
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="label"><span className="label-text">Status</span></label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option value="">Semua Status</option>
                            <option value="pendaftaran">Pendaftaran</option>
                            <option value="seleksi">Seleksi</option>
                            <option value="lulus">Lulus</option>
                            <option value="tidak_lulus">Tidak Lulus</option>
                        </select>
                    </div>
                    <div className="flex items-end space-x-2">
                        <button type="submit" className="btn btn-primary flex-1">Filter</button>
                        <Link href={route('ppdb.index')} className="btn btn-outline">Reset</Link>
                    </div>
                </div>
            </form>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>NISN</th>
                            <th>Nama Lengkap</th>
                            <th>Asal Sekolah</th>
                            <th>Status</th>
                            <th>Keputusan</th>
                            <th>Tanggal Daftar</th>
                            <th className="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calonSiswa.data.length > 0 ? (
                            calonSiswa.data.map((cs, index) => (
                                <tr key={cs.id} className="hover">
                                    <td>{(calonSiswa.current_page - 1) * calonSiswa.per_page + index + 1}</td>
                                    <td className="font-medium">{cs.nisn}</td>
                                    <td>
                                        <div>
                                            <div className="font-semibold">{cs.nama_lengkap}</div>
                                            <div className="text-sm text-gray-500">{cs.no_hp}</div>
                                        </div>
                                    </td>
                                    <td>{cs.asal_sekolah}</td>
                                    <td>
                                        <span className={`${getStatusBadgeClass(cs.status)} badge-xs badge`}>
                                            {cs.status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`${getKeputusanBadgeClass(cs.keputusan)} badge-xs badge`}>
                                            {cs.keputusan}
                                        </span>
                                    </td>
                                    <td>{cs.tanggal_daftar?.format('d M Y')}</td>
                                    <td className="text-center whitespace-nowrap">
                                        {cs.keputusan === 'belum' && (
                                            <>
                                                <button
                                                    onClick={() => handleAccept(cs.id)}
                                                    className="btn btn-xs btn-success mr-1"
                                                    title="Terima & Konversi ke Siswa"
                                                >
                                                    ✓ Terima
                                                </button>
                                                <button
                                                    onClick={() => handleReject(cs.id)}
                                                    className="btn btn-xs btn-error mr-1"
                                                    title="Tolak"
                                                >
                                                    ✕ Tolak
                                                </button>
                                            </>
                                        )}
                                        <Link
                                            href={route('ppdb.edit', cs.id)}
                                            className="btn btn-xs btn-outline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(cs.id)}
                                            className="btn btn-xs btn-error ml-1"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center py-8 text-gray-500">
                                    Tidak ada data calon siswa
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {calonSiswa.data.length > 0 && (
                    <div className="p-4 flex justify-between items-center border-t dark:border-gray-700">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Menampilkan {calonSiswa.from} - {calonSiswa.to} dari {calonSiswa.total} data
                        </div>
                        <div className="join">
                            {calonSiswa.prev_page_url && (
                                <Link
                                    href={calonSiswa.prev_page_url}
                                    className="join-item btn btn-sm"
                                >
                                    Prev
                                </Link>
                            )}
                            <Link
                                href={route('ppdb.index', { ...filters, page: 1 })}
                                className="join-item btn btn-sm"
                            >
                                1
                            </Link>
                            {calonSiswa.next_page_url && (
                                <Link
                                    href={calonSiswa.next_page_url}
                                    className="join-item btn btn-sm"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}