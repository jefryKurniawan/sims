import { useForm, usePage, Link } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layout/AdminLayout';

interface RaporKelasItem {
    id: number;
    nama_kelas: string;
    tingkat: number;
}

interface RaporMapelItem {
    id: number;
    nama_mapel: string;
    kkm: number;
    kelompok: string;
    rapor_kelas_id: number;
}

interface Props {
    raporMapel?: RaporMapelItem;
    kelas: RaporKelasItem[];
}

export default function Form({ raporMapel, kelas }: Props) {
    const { flash } = usePage().props;
    const isEdit = !!raporMapel;

    const { data, setData, post, put, processing, errors } = useForm({
        rapor_kelas_id: raporMapel?.rapor_kelas_id || '',
        nama_mapel: raporMapel?.nama_mapel || '',
        kkm: raporMapel?.kkm || 75,
        kelompok: raporMapel?.kelompok || 'A (Wajib)',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(route('rapor-mapel.update', raporMapel.id));
        } else {
            post(route('rapor-mapel.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran'}>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {isEdit ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran'}
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                        <select
                            value={data.rapor_kelas_id}
                            onChange={(e) => setData('rapor_kelas_id', Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                        >
                            <option value="">Pilih Kelas</option>
                            {kelas.map((k) => (
                                <option key={k.id} value={k.id}>
                                    Kelas {k.tingkat} - {k.nama_kelas}
                                </option>
                            ))}
                        </select>
                        {errors.rapor_kelas_id && <p className="text-red-500 text-xs mt-1">{errors.rapor_kelas_id}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Mata Pelajaran</label>
                        <input
                            type="text"
                            value={data.nama_mapel}
                            onChange={(e) => setData('nama_mapel', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                            placeholder="Mis: Matematika Wajib"
                        />
                        {errors.nama_mapel && <p className="text-red-500 text-xs mt-1">{errors.nama_mapel}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">KKM</label>
                        <input
                            type="number"
                            value={data.kkm}
                            onChange={(e) => setData('kkm', Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                            min={0}
                            max={100}
                        />
                        {errors.kkm && <p className="text-red-500 text-xs mt-1">{errors.kkm}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kelompok</label>
                        <select
                            value={data.kelompok}
                            onChange={(e) => setData('kelompok', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                        >
                            <option value="A">A (Wajib)</option>
                            <option value="B">B (Wajib)</option>
                            <option value="C">C (Peminatan)</option>
                        </select>
                        {errors.kelompok && <p className="text-red-500 text-xs mt-1">{errors.kelompok}</p>}
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
                            href={route('rapor-mapel.index')}
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
