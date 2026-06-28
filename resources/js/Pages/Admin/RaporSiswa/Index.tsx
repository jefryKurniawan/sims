import { Link, usePage } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layout/AdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';

interface JurusanItem {
    id: number;
    singkatan: string;
}

interface RaporKelasItem {
    id: number;
    nama_kelas: string;
    tingkat: number;
    jurusan: JurusanItem | null;
}

interface SiswaItem {
    id: number;
    nama_lengkap: string;
    nisn: string;
}

interface RaporSiswaItem {
    id: number;
    semester: string;
    tahun_ajaran: string;
    siswa: SiswaItem | null;
    rapor_kelas: RaporKelasItem | null;
    rapor_kelas_id: number;
}

interface Props {
    raporSiswa: {
        data: RaporSiswaItem[];
        current_page: number;
        last_page: number;
        per_page: number;
        from: number;
        to: number;
        total: number;
        prev_page_url: string | null;
        next_page_url: string | null;
    };
    kelas: RaporKelasItem[];
    filters: Record<string, string>;
}

export default function Index({ raporSiswa, kelas, filters }: Props) {
    const { flash } = usePage().props;
    const [kelasFilter, setKelasFilter] = useState(filters.rapor_kelas_id || '');
    const [semester, setSemester] = useState(filters.semester || '');
    const [tahunAjaran, setTahunAjaran] = useState(filters.tahun_ajaran || '');

    const handleFilter = () => {
        const params = new URLSearchParams();
        if (kelasFilter) params.set('rapor_kelas_id', kelasFilter);
        if (semester) params.set('semester', semester);
        if (tahunAjaran) params.set('tahun_ajaran', tahunAjaran);
        window.location.href = `/dashboard/rapor-siswa?${params.toString()}`;
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah anda yakin ingin menghapus data rapor siswa ini?')) {
            Inertia.delete(route('rapor-siswa.destroy', id));
        }
    };

    return (
        <AdminLayout title="Rapor Siswa">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Rapor Siswa</h1>
                <Link
                    href={route('rapor-siswa.assign')}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                    Assign Siswa
                </Link>
            </div>

            {flash.success && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                    {flash.success}
                </div>
            )}

            <div className="mb-6 bg-white rounded-lg border p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                        <select
                            value={kelasFilter}
                            onChange={(e) => setKelasFilter(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                        >
                            <option value="">Semua Kelas</option>
                            {kelas.map((k) => (
                                <option key={k.id} value={k.id}>
                                    Kelas {k.tingkat} - {k.nama_kelas} ({k.jurusan?.singkatan || '-'})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                        <select
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                        >
                            <option value="">Semua</option>
                            <option value="Ganjil">Ganjil</option>
                            <option value="Genap">Genap</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Ajaran</label>
                        <input
                            type="text"
                            value={tahunAjaran}
                            onChange={(e) => setTahunAjaran(e.target.value)}
                            placeholder="2024/2025"
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                    </div>
                    <div className="flex items-end gap-2">
                        <button onClick={handleFilter} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            Filter
                        </button>
                        <Link href={route('rapor-siswa.index')} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                            Reset
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">No</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama Siswa</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">NISN</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Kelas</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Semester</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Thn Ajaran</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {raporSiswa.data.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-700">{raporSiswa.from + index}</td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.siswa?.nama_lengkap || '-'}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{item.siswa?.nisn || '-'}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    Kelas {item.rapor_kelas?.tingkat} - {item.rapor_kelas?.nama_kelas} ({item.rapor_kelas?.jurusan?.singkatan || '-'})
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">{item.semester}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{item.tahun_ajaran}</td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <Link
                                            href={route('rapor-siswa.input-nilai', item.id)}
                                            className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                                        >
                                            Nilai
                                        </Link>
                                        <Link
                                            href={route('rapor-siswa.show', item.id)}
                                            className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700"
                                        >
                                            Detail
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {raporSiswa.data.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">
                                    Tidak ada data rapor siswa
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {raporSiswa.total > raporSiswa.per_page && (
                    <div className="p-4 flex justify-between items-center border-t">
                        <div className="text-sm text-gray-600">
                            Menampilkan {raporSiswa.from} - {raporSiswa.to} dari {raporSiswa.total} data
                        </div>
                        <div className="flex gap-2">
                            {raporSiswa.prev_page_url && (
                                <Link href={raporSiswa.prev_page_url} className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                                    Prev
                                </Link>
                            )}
                            <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">{raporSiswa.current_page}</span>
                            {raporSiswa.next_page_url && (
                                <Link href={raporSiswa.next_page_url} className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
