import { usePage, Link } from '@inertiajs/inertia-react';
import { useState } from 'react';

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
            ? <span className="badge badge-success">Lulus</span>
            : <span className="badge badge-neutral">Belum/Tidak</span>;
    };

    const getJalurBadge = (jalur: string) => {
        const classes: Record<string, string> = {
            reguler: 'badge badge-primary',
            afirmasi: 'badge badge-secondary',
            prestasi: 'badge badge-accent',
        };
        return <span className={classes[jalur] + ' badge-xs badge'}>{jalur}</span>;
    };

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Scoring & Ranking SPMB</h1>
                {flash?.success && (
                    <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg">{flash.success}</div>
                )}
            </div>

            {/* Statistik Cards */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
                {[
                    { label: 'Total', value: statistik.total, color: 'bg-blue-500' },
                    { label: 'Submitted', value: statistik.submitted, color: 'bg-info' },
                    { label: 'Verifikasi', value: statistik.verifikasi_berkas, color: 'bg-warning' },
                    { label: 'Lulus', value: statistik.lulus_seleksi, color: 'bg-success' },
                    { label: 'Diterima', value: statistik.diterima, color: 'bg-emerald-600' },
                    { label: 'Ditolak', value: statistik.ditolak, color: 'bg-error' },
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
                        <label className="label"><span className="label-text">Periode SPMB</span></label>
                        <select
                            value={selectedConfig}
                            onChange={(e) => setSelectedConfig(e.target.value)}
                            className="select select-bordered w-full min-w-[200px]"
                        >
                            <option value="">Pilih Periode</option>
                            {configs.map((c: any) => (
                                <option key={c.id} value={c.id}>
                                    {c.tahun_ajaran} ({new Date(c.tanggal_buka).toLocaleDateString('id-ID')} - {new Date(c.tanggal_tutup).toLocaleDateString('id-ID')})
                                </option>
                            ))}
                        </select>
                    </div>
                    <button onClick={handleProsesScoring} className="btn btn-success">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        <label className="label"><span className="label-text">Filter Jalur</span></label>
                        <select value={jalurFilter} onChange={(e) => setJalurFilter(e.target.value)} className="select select-bordered w-full">
                            <option value="">Semua Jalur</option>
                            <option value="reguler">Reguler</option>
                            <option value="afirmasi">Afirmasi</option>
                            <option value="prestasi">Prestasi</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Filter</button>
                    <a href="/dashboard/spmb/ranking" className="btn btn-outline">Reset</a>
                </div>
            </form>

            {/* Ranking Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Peringkat</th>
                            <th>No. Registrasi</th>
                            <th>Nama</th>
                            <th>Jalur</th>
                            <th>Skor Rapor</th>
                            <th>Skor TKA</th>
                            <th>Skor Prestasi</th>
                            <th>Bonus Afirmasi</th>
                            <th>Skor Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankings.length > 0 ? (
                            rankings.map((r: any) => (
                                <tr key={r.id} className={r.lulus_seleksi ? 'bg-success/5' : ''}>
                                    <td className="font-bold text-lg">#{r.peringkat}</td>
                                    <td className="font-mono text-sm">{r.applicant?.nomor_registrasi}</td>
                                    <td>
                                        <div className="font-semibold">{r.applicant?.nama_lengkap}</div>
                                        <div className="text-xs text-gray-500">{r.applicant?.nisn}</div>
                                    </td>
                                    <td>{getJalurBadge(r.jalur)}</td>
                                    <td>{Number(r.skor_rapor).toFixed(2)}</td>
                                    <td>{Number(r.skor_tka).toFixed(2)}</td>
                                    <td>{Number(r.skor_prestasi).toFixed(2)}</td>
                                    <td>{Number(r.bonus_afirmasi).toFixed(2)}</td>
                                    <td className="font-bold text-primary">{Number(r.skor_total).toFixed(2)}</td>
                                    <td>{getStatusBadge(r.lulus_seleksi)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={10} className="text-center py-8 text-gray-500">
                                    Belum ada data ranking. Jalankan proses scoring & ranking terlebih dahulu.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
