import { useForm, usePage, Link } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layout/AdminLayout';
import { useEffect } from 'react';

interface JurusanItem {
    id: number;
    nama: string;
    singkatan: string;
}

interface RaporKelasItem {
    id: number;
    nama_kelas: string;
    tingkat: number;
    jurusan_id: number;
    tahun_ajaran: string;
}

interface Props {
    raporKelas?: RaporKelasItem;
    jurusan: JurusanItem[];
}

export default function Form({ raporKelas, jurusan }: Props) {
    const { flash } = usePage().props;
    const isEdit = !!raporKelas;

    const { data, setData, post, put, processing, errors } = useForm({
        nama_kelas: raporKelas?.nama_kelas || '',
        tingkat: raporKelas?.tingkat || 10,
        jurusan_id: raporKelas?.jurusan_id || '',
        tahun_ajaran: raporKelas?.tahun_ajaran || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(route('rapor-kelas.update', raporKelas.id));
        } else {
            post(route('rapor-kelas.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Kelas Rapor' : 'Tambah Kelas Rapor'}>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {isEdit ? 'Edit Kelas Rapor' : 'Tambah Kelas Rapor'}
                </h1>
            </div>

            {flash.success && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                    {flash.success}
                </div>
            )}

            <div className="bg-white rounded-lg border p-6 max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kelas</label>
                        <input
                            type="text"
                            value={data.nama_kelas}
                            onChange={(e) => setData('nama_kelas', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                            placeholder="Mis: A"
                        />
                        {errors.nama_kelas && <p className="text-red-500 text-xs mt-1">{errors.nama_kelas}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat</label>
                        <select
                            value={data.tingkat}
                            onChange={(e) => setData('tingkat', Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                        >
                            <option value={10}>Kelas 10</option>
                            <option value={11}>Kelas 11</option>
                            <option value={12}>Kelas 12</option>
                        </select>
                        {errors.tingkat && <p className="text-red-500 text-xs mt-1">{errors.tingkat}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jurusan</label>
                        <select
                            value={data.jurusan_id}
                            onChange={(e) => setData('jurusan_id', Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                        >
                            <option value="">Pilih Jurusan</option>
                            {jurusan.map((j) => (
                                <option key={j.id} value={j.id}>
                                    {j.nama} ({j.singkatan})
                                </option>
                            ))}
                        </select>
                        {errors.jurusan_id && <p className="text-red-500 text-xs mt-1">{errors.jurusan_id}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Ajaran</label>
                        <input
                            type="text"
                            value={data.tahun_ajaran}
                            onChange={(e) => setData('tahun_ajaran', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                            placeholder="Contoh: 2024/2025"
                        />
                        {errors.tahun_ajaran && <p className="text-red-500 text-xs mt-1">{errors.tahun_ajaran}</p>}
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : isEdit ? 'Perbarui' : 'Simpan'}
                        </button>
                        <Link
                            href={route('rapor-kelas.index')}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
