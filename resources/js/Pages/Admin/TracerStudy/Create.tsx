import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { ArrowLeft, Save } from 'lucide-react';

interface Alumni {
    id: number;
    user: { name: string };
    tahun_lulus: number;
}

interface Props {
    alumis: Alumni[];
}

export default function Create({ alumis }: Props) {
    const { data, setData, post, errors, processing, reset } = useForm({
        alumni_id: '',
        nama_lengkap: '',
        jenjang_pendidikan: '',
        nama_instansi: '',
        bidang_studi: '',
        tahun_lulus: '',
        status: 'tidak_bekerja',
        alamat: '',
        no_telp: '',
        linkedin: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.tracer-study.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Tambah Tracer Study Baru" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b">
                    <div className="max-w-4xl mx-auto px-6 py-6">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('admin.tracer-study.index')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Tambah Tracer Study</h1>
                                <p className="text-gray-600 text-sm mt-1">Input data tracer study alumni</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Alumni */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Alumni <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.alumni_id}
                                    onChange={(e) => setData('alumni_id', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="">-- Pilih Alumni --</option>
                                    {alumis.map((al) => (
                                        <option key={al.id} value={al.id}>
                                            {al.user.name} (Angkatan {al.tahun_lulus})
                                        </option>
                                    ))}
                                </select>
                                {errors.alumni_id && (
                                    <p className="text-red-500 text-sm mt-1">{errors.alumni_id}</p>
                                )}
                            </div>

                            {/* Nama Lengkap */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nama Lengkap <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nama_lengkap}
                                    onChange={(e) => setData('nama_lengkap', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Nama lengkap"
                                />
                                {errors.nama_lengkap && (
                                    <p className="text-red-500 text-sm mt-1">{errors.nama_lengkap}</p>
                                )}
                            </div>

                            {/* Tahun Lulus */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tahun Lulus
                                </label>
                                <input
                                    type="number"
                                    value={data.tahun_lulus}
                                    onChange={(e) => setData('tahun_lulus', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="2023"
                                    min="1900"
                                    max={new Date().getFullYear() + 1}
                                />
                                {errors.tahun_lulus && (
                                    <p className="text-red-500 text-sm mt-1">{errors.tahun_lulus}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="bekerja">Bekerja</option>
                                    <option value="kuliah">Kuliah</option>
                                    <option value="wirausaha">Wirausaha</option>
                                    <option value="tidak_bekerja">Tidak Bekerja</option>
                                </select>
                                {errors.status && (
                                    <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                                )}
                            </div>

                            {/* No Telepon */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    No. Telepon
                                </label>
                                <input
                                    type="text"
                                    value={data.no_telp}
                                    onChange={(e) => setData('no_telp', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="08123456789"
                                />
                                {errors.no_telp && (
                                    <p className="text-red-500 text-sm mt-1">{errors.no_telp}</p>
                                )}
                            </div>

                            {/* Jenjang Pendidikan */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Jenjang Pendidikan
                                </label>
                                <input
                                    type="text"
                                    value={data.jenjang_pendidikan}
                                    onChange={(e) => setData('jenjang_pendidikan', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="S1, D3, S2, dll"
                                />
                                {errors.jenjang_pendidikan && (
                                    <p className="text-red-500 text-sm mt-1">{errors.jenjang_pendidikan}</p>
                                )}
                            </div>

                            {/* Nama Instansi */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nama Instansi / Kampus
                                </label>
                                <input
                                    type="text"
                                    value={data.nama_instansi}
                                    onChange={(e) => setData('nama_instansi', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Nama perusahaan/kampus"
                                />
                                {errors.nama_instansi && (
                                    <p className="text-red-500 text-sm mt-1">{errors.nama_instansi}</p>
                                )}
                            </div>

                            {/* Bidang Studi */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Bidang Studi / Jurusan
                                </label>
                                <input
                                    type="text"
                                    value={data.bidang_studi}
                                    onChange={(e) => setData('bidang_studi', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Teknik Informatika, dll"
                                />
                                {errors.bidang_studi && (
                                    <p className="text-red-500 text-sm mt-1">{errors.bidang_studi}</p>
                                )}
                            </div>

                            {/* LinkedIn */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    LinkedIn Profile
                                </label>
                                <input
                                    type="url"
                                    value={data.linkedin}
                                    onChange={(e) => setData('linkedin', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="https://linkedin.com/in/username"
                                />
                                {errors.linkedin && (
                                    <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>
                                )}
                            </div>

                            {/* Alamat */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Alamat
                                </label>
                                <textarea
                                    value={data.alamat}
                                    onChange={(e) => setData('alamat', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Alamat lengkap"
                                />
                                {errors.alamat && (
                                    <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t">
                            <Link
                                href={route('admin.tracer-study.index')}
                                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-semibold"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition font-semibold disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {processing ? 'Menyimpan...' : 'Simpan Tracer Study'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}