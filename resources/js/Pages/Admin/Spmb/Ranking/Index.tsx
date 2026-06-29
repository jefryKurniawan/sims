import { usePage, Link } from '@inertiajs/inertia-react';
import { useState } from 'react';
import AdminLayout from '@/Layout/AdminLayout';

export default function Index() {
    const { data } = usePage().props;
    const { rankings, configs, filters, statistik, flash } = data;
    const [jalurFilter, setJalurFilter] = useState(filters.jalur || '');
    const [selectedConfig, setSelectedConfig] = useState('');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (jalurFilter) params.set('jalur', jalurFilter);
        window.location.href = `/dashboard/spmb/ranking?${params.toString()}`;
    };

    const handleProsesScoring = () => {
        if (!selectedConfig) {
            alert('Pilih periode SPMB terlebih dahulu.');
            return;
        }
        if (!window.confirm('Proses scoring & ranking akan memproses semua pendaftar pada periode ini. Lanjutkan?')) return;

        fetch(`/dashboard/spmb/ranking/proses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ config_id: parseInt(selectedConfig) }),
        }).then(() => window.location.reload());
    };

    const getStatusBadge = (lulus: boolean) => {
        return lulus
            ? <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">Lulus</span>
            : <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">Belum/Tidak</span>;
    };

    const getJalurBadge = (jalur: string) => {
        const classes: Record<string, string> = {
            reguler: 'px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700',
            afirmasi: 'px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700',
            prestasi: 'px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-700',
        };
        return <span className={classes[jalur]}>{jalur}</span>;
    };

    return (
        <AdminLayout title="Scoring & Ranking SPMB">
            <div className="p-6">
                {flash?.success && (
                    <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg">{flash.success}</div>
                )}

                {/* Statistik Cards */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
                    {[
                        { label: 'Total', value: statistik.total, color: 'bg-blue-500' },
                        { label: 'Submitted', value: statistik.submitted, color: 'bg-blue-500' },
                        { label: 'Verifikasi', value: statistik.verifikasi_berkas, color: 'bg-yellow-500' },
                        { label: 'Lulus', value: statistik.lulus_seleksi, color: 'bg-green-500' },
                        { label: 'Diterima', value: statistik.diterima, color: 'bg-emerald-600' },
                        { label: 'Ditolak', value: statistik.ditolak, color: 'bg-red-500' },
                    ].map((card) => (
                        <div key={card.label} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                            <p className="text-sm text-gray-500">{card.label}</p>
                            <p className={`text-2xl font-bold text-white px-2 py-1 rounded ${card.color} inline-block mt-1`}>{card.value}</p>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
                    <div className="flex flex-wrap items-end gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Periode SPMB</label>
                            <select
                                value={selectedConfig}
                                onChange={(e) => setSelectedConfig(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 min-w-[200px]"
                            >
                                <option value="">Pilih Periode</option>
                                {configs.map((c: any) => (
                                    <option key={c.id} value={c.id}>
                                        {c.tahun_ajaran} ({new Date(c.tanggal_buka).toLocaleDateString('id-ID')} - {new Date(c.tanggal_tutup).toLocaleDateString('id-ID')})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={handleProsesScoring} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Proses Scoring & Ranking
                        </button>
                    </div>
                </div>

                {/* Filter */}
                <form onSubmit={handleFilter} className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                    <div className="flex items-end gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Filter Jalur</label>
                            <select value={jalurFilter} onChange={(e) => setJalurFilter(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600">
                                <option value="">Semua Jalur</option>
                                <option value="reguler">Reguler</option>
                                <option value="afirmasi">Afirmasi</option>
                                <option value="prestasi">Prestasi</option>
                            </select>
                        </div>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">Filter</button>
                        <a href="/dashboard/spmb/ranking" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium inline-block">Reset</a>
                    </div>
                </form>

                {/* Ranking Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700">
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peringkat</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Registrasi</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jalur</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor Rapor</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor TKA</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor Prestasi</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonus Afirmasi</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor Total</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {rankings.length > 0 ? (
                                rankings.map((r: any) => (
                                    <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-4 py-3 font-bold text-lg">#{r.peringkat}</td>
                                        <td className="px-4 py-3 font-mono text-sm">{r.applicant?.nomor_registrasi}</td>
                                        <td className="px-4 py-3">
                                            <div className="font-semibold">{r.applicant?.nama_lengkap}</div>
                                            <div className="text-xs text-gray-500">{r.applicant?.nisn}</div>
                                        </td>
                                        <td className="px-4 py-3">{getJalurBadge(r.jalur)}</td>
                                        <td className="px-4 py-3">{Number(r.skor_rapor).toFixed(2)}</td>
                                        <td className="px-4 py-3">{Number(r.skor_tka).toFixed(2)}</td>
                                        <td className="px-4 py-3">{Number(r.skor_prestasi).toFixed(2)}</td>
                                        <td className="px-4 py-3">{Number(r.bonus_afirmasi).toFixed(2)}</td>
                                        <td className="px-4 py-3 font-bold text-blue-600">{Number(r.skor_total).toFixed(2)}</td>
                                        <td className="px-4 py-3">{getStatusBadge(r.lulus_seleksi)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                                        Belum ada data ranking. Jalankan proses scoring & ranking terlebih dahulu.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
