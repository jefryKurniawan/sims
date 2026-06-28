import { usePage, Link } from '@inertiajs/inertia-react';
import { useState } from 'react';

export default function Index() {
    const { data } = usePage().props;
    const { applicants, filters, flash } = data;
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status_pendaftaran || '');
    const [jalurFilter, setJalurFilter] = useState(filters.jalur || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (statusFilter) params.set('status_pendaftaran', statusFilter);
        if (jalurFilter) params.set('jalur', jalurFilter);
        window.location.href = `/dashboard/spmb/applicant?${params.toString()}`;
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Yakin ingin menghapus data pendaftar ini?')) {
            fetch(`/dashboard/spmb/applicant/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                    'Accept': 'application/json',
                },
            }).then(() => window.location.reload());
        }
    };

    const getStatusBadge = (status: string) => {
        const classes: Record<string, string> = {
            draft: 'badge badge-neutral',
            submitted: 'badge badge-info',
            verifikasi_berkas: 'badge badge-warning',
            lulus_seleksi: 'badge badge-success',
            diterima: 'badge badge-success',
            ditolak: 'badge badge-error',
        };
        return classes[status] || 'badge badge-neutral';
    };

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Pendaftar SPMB</h1>
                {flash?.success && (
                    <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {flash.success}
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="label"><span className="label-text">Pencarian</span></label>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Nama, NISN, No. Registrasi..."
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="label"><span className="label-text">Status</span></label>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="select select-bordered w-full">
                            <option value="">Semua Status</option>
                            <option value="draft">Draft</option>
                            <option value="submitted">Submitted</option>
                            <option value="verifikasi_berkas">Verifikasi Berkas</option>
                            <option value="lulus_seleksi">Lulus Seleksi</option>
                            <option value="diterima">Diterima</option>
                            <option value="ditolak">Ditolak</option>
                        </select>
                    </div>
                    <div>
                        <label className="label"><span className="label-text">Jalur</span></label>
                        <select value={jalurFilter} onChange={(e) => setJalurFilter(e.target.value)} className="select select-bordered w-full">
                            <option value="">Semua Jalur</option>
                            <option value="reguler">Reguler</option>
                            <option value="afirmasi">Afirmasi</option>
                            <option value="prestasi">Prestasi</option>
                        </select>
                    </div>
                    <div className="flex items-end space-x-2">
                        <button type="submit" className="btn btn-primary flex-1">Filter</button>
                        <a href="/dashboard/spmb/applicant" className="btn btn-outline">Reset</a>
                    </div>
                </div>
            </form>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>No. Registrasi</th>
                            <th>Nama Lengkap</th>
                            <th>Jalur</th>
                            <th>Status</th>
                            <th>Skor</th>
                            <th>Tanggal Daftar</th>
                            <th className="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicants.data.length > 0 ? (
                            applicants.data.map((a: any, index: number) => (
                                <tr key={a.id} className="hover">
                                    <td>{(applicants.current_page - 1) * applicants.per_page + index + 1}</td>
                                    <td className="font-mono text-sm">{a.nomor_registrasi}</td>
                                    <td>
                                        <div className="font-semibold">{a.nama_lengkap}</div>
                                        <div className="text-sm text-gray-500">{a.nisn}</div>
                                    </td>
                                    <td>{a.jalur_pendaftaran}</td>
                                    <td>
                                        <span className={`${getStatusBadge(a.status_pendaftaran)} badge-xs badge`}>
                                            {a.status_pendaftaran?.replace(/_/g, ' ')}
                                        </span>
                                    </td>
                                    <td>{a.ranking?.skor_total ? Number(a.ranking.skor_total).toFixed(2) : '-'}</td>
                                    <td>{new Date(a.created_at).toLocaleDateString('id-ID')}</td>
                                    <td className="text-center whitespace-nowrap">
                                        <Link
                                            href={route('spmb.applicant.show', a.id)}
                                            className="btn btn-xs btn-outline mr-1"
                                        >
                                            Detail
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(a.id)}
                                            className="btn btn-xs btn-error"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center py-8 text-gray-500">
                                    Tidak ada data pendaftar
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {applicants.data.length > 0 && (
                    <div className="p-4 flex justify-between items-center border-t dark:border-gray-700">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Menampilkan {applicants.from} - {applicants.to} dari {applicants.total} data
                        </div>
                        <div className="join">
                            {applicants.prev_page_url && (
                                <Link href={applicants.prev_page_url} className="join-item btn btn-sm">Prev</Link>
                            )}
                            <Link href={route('spmb.applicant.index', { ...filters, page: 1 })} className="join-item btn btn-sm">1</Link>
                            {applicants.next_page_url && (
                                <Link href={applicants.next_page_url} className="join-item btn btn-sm">Next</Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
