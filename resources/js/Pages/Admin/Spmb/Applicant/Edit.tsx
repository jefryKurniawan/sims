import { usePage, Link, useForm } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layout/AdminLayout';

export default function Edit() {
    const { data: pageData } = usePage().props;
    const { applicant, configs, flash } = pageData;

    const { data, setData, put, processing, errors } = useForm({
        nama_lengkap: applicant.nama_lengkap ?? '',
        nisn: applicant.nisn ?? '',
        nik: applicant.nik ?? '',
        no_kk: applicant.no_kk ?? '',
        tempat_lahir: applicant.tempat_lahir ?? '',
        tanggal_lahir: applicant.tanggal_lahir ? applicant.tanggal_lahir.split('T')[0] : '',
        jenis_kelamin: applicant.jenis_kelamin ?? '',
        agama: applicant.agama ?? '',
        alamat: applicant.alamat ?? '',
        no_hp: applicant.no_hp ?? '',
        email: applicant.email ?? '',
        asal_sekolah: applicant.asal_sekolah ?? '',
        npsn_sekolah: applicant.npsn_sekolah ?? '',
        jurusan_sekolah: applicant.jurusan_sekolah ?? '',
        tahun_lulus: applicant.tahun_lulus ?? '',
        nama_ayah: applicant.nama_ayah ?? '',
        nik_ayah: applicant.nik_ayah ?? '',
        no_hp_ayah: applicant.no_hp_ayah ?? '',
        pekerjaan_ayah: applicant.pekerjaan_ayah ?? '',
        nama_ibu: applicant.nama_ibu ?? '',
        nik_ibu: applicant.nik_ibu ?? '',
        no_hp_ibu: applicant.no_hp_ibu ?? '',
        pekerjaan_ibu: applicant.pekerjaan_ibu ?? '',
        penghasilan_ortu: applicant.penghasilan_ortu ?? '',
        no_hp_ortu: applicant.no_hp_ortu ?? '',
        nama_wali: applicant.nama_wali ?? '',
        no_hp_wali: applicant.no_hp_wali ?? '',
        jalur_pendaftaran: applicant.jalur_pendaftaran ?? 'reguler',
        status_pendaftaran: applicant.status_pendaftaran ?? 'draft',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('spmb.applicant.update', applicant.id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Edit Pendaftar SPMB">
            <div className="p-6">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <Link href={route('spmb.applicant.show', applicant.id)} className="text-sm text-blue-600 hover:underline mb-2 inline-block">&larr; Kembali ke Detail</Link>
                        <h1 className="text-2xl font-bold text-gray-800">Edit Pendaftar: {applicant.nama_lengkap}</h1>
                        <p className="text-sm text-gray-500">{applicant.nomor_registrasi}</p>
                    </div>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium">{flash.success}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Data Pribadi */}
                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Data Pribadi</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                                        <input type="text" value={data.nama_lengkap} onChange={(e) => setData('nama_lengkap', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                        {errors.nama_lengkap && <p className="text-red-500 text-sm mt-1">{errors.nama_lengkap}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">NISN <span className="text-red-500">*</span></label>
                                        <input type="text" value={data.nisn} onChange={(e) => setData('nisn', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                        {errors.nisn && <p className="text-red-500 text-sm mt-1">{errors.nisn}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
                                        <input type="text" value={data.nik} onChange={(e) => setData('nik', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">No. KK</label>
                                        <input type="text" value={data.no_kk} onChange={(e) => setData('no_kk', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir <span className="text-red-500">*</span></label>
                                        <input type="text" value={data.tempat_lahir} onChange={(e) => setData('tempat_lahir', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                        {errors.tempat_lahir && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir <span className="text-red-500">*</span></label>
                                        <input type="date" value={data.tanggal_lahir} onChange={(e) => setData('tanggal_lahir', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                        {errors.tanggal_lahir && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin <span className="text-red-500">*</span></label>
                                        <select value={data.jenis_kelamin} onChange={(e) => setData('jenis_kelamin', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option value="">Pilih</option>
                                            <option value="L">Laki-laki</option>
                                            <option value="P">Perempuan</option>
                                        </select>
                                        {errors.jenis_kelamin && <p className="text-red-500 text-sm mt-1">{errors.jenis_kelamin}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Agama</label>
                                        <select value={data.agama} onChange={(e) => setData('agama', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option value="">Pilih</option>
                                            <option value="Islam">Islam</option>
                                            <option value="Kristen">Kristen</option>
                                            <option value="Katolik">Katolik</option>
                                            <option value="Hindu">Hindu</option>
                                            <option value="Buddha">Buddha</option>
                                            <option value="Konghucu">Konghucu</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat <span className="text-red-500">*</span></label>
                                        <textarea value={data.alamat} onChange={(e) => setData('alamat', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3}></textarea>
                                        {errors.alamat && <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">No. HP <span className="text-red-500">*</span></label>
                                        <input type="text" value={data.no_hp} onChange={(e) => setData('no_hp', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                        {errors.no_hp && <p className="text-red-500 text-sm mt-1">{errors.no_hp}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Data Pendidikan */}
                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Data Pendidikan</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Asal Sekolah <span className="text-red-500">*</span></label>
                                        <input type="text" value={data.asal_sekolah} onChange={(e) => setData('asal_sekolah', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                        {errors.asal_sekolah && <p className="text-red-500 text-sm mt-1">{errors.asal_sekolah}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">NPSN Sekolah</label>
                                        <input type="text" value={data.npsn_sekolah} onChange={(e) => setData('npsn_sekolah', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Jurusan</label>
                                        <input type="text" value={data.jurusan_sekolah} onChange={(e) => setData('jurusan_sekolah', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Lulus</label>
                                        <input type="number" value={data.tahun_lulus} onChange={(e) => setData('tahun_lulus', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Data Orang Tua */}
                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Data Orang Tua</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Ayah</h3>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ayah</label>
                                        <input type="text" value={data.nama_ayah} onChange={(e) => setData('nama_ayah', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">NIK Ayah</label>
                                        <input type="text" value={data.nik_ayah} onChange={(e) => setData('nik_ayah', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan Ayah</label>
                                        <input type="text" value={data.pekerjaan_ayah} onChange={(e) => setData('pekerjaan_ayah', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">No. HP Ayah</label>
                                        <input type="text" value={data.no_hp_ayah} onChange={(e) => setData('no_hp_ayah', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Ibu</h3>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ibu</label>
                                        <input type="text" value={data.nama_ibu} onChange={(e) => setData('nama_ibu', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">NIK Ibu</label>
                                        <input type="text" value={data.nik_ibu} onChange={(e) => setData('nik_ibu', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan Ibu</label>
                                        <input type="text" value={data.pekerjaan_ibu} onChange={(e) => setData('pekerjaan_ibu', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">No. HP Ibu</label>
                                        <input type="text" value={data.no_hp_ibu} onChange={(e) => setData('no_hp_ibu', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Penghasilan Orang Tua</label>
                                        <select value={data.penghasilan_ortu} onChange={(e) => setData('penghasilan_ortu', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option value="">Pilih</option>
                                            <option value="< 1.000.000">&lt; Rp 1.000.000</option>
                                            <option value="1.000.000 - 3.000.000">Rp 1.000.000 - Rp 3.000.000</option>
                                            <option value="3.000.000 - 5.000.000">Rp 3.000.000 - Rp 5.000.000</option>
                                            <option value="> 5.000.000">&gt; Rp 5.000.000</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">No. HP Orang Tua</label>
                                        <input type="text" value={data.no_hp_ortu} onChange={(e) => setData('no_hp_ortu', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Wali</label>
                                        <input type="text" value={data.nama_wali} onChange={(e) => setData('nama_wali', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">No. HP Wali</label>
                                        <input type="text" value={data.no_hp_wali} onChange={(e) => setData('no_hp_wali', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Status & Jalur */}
                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Status Pendaftaran</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Jalur Pendaftaran <span className="text-red-500">*</span></label>
                                        <select value={data.jalur_pendaftaran} onChange={(e) => setData('jalur_pendaftaran', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option value="reguler">Reguler</option>
                                            <option value="afirmasi">Afirmasi</option>
                                            <option value="prestasi">Prestasi</option>
                                        </select>
                                        {errors.jalur_pendaftaran && <p className="text-red-500 text-sm mt-1">{errors.jalur_pendaftaran}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status <span className="text-red-500">*</span></label>
                                        <select value={data.status_pendaftaran} onChange={(e) => setData('status_pendaftaran', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option value="draft">Draft</option>
                                            <option value="submitted">Submitted</option>
                                            <option value="verifikasi_berkas">Verifikasi Berkas</option>
                                            <option value="lulus_seleksi">Lulus Seleksi</option>
                                            <option value="diterima">Diterima</option>
                                            <option value="ditolak">Ditolak</option>
                                        </select>
                                        {errors.status_pendaftaran && <p className="text-red-500 text-sm mt-1">{errors.status_pendaftaran}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Info Registrasi */}
                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Info Registrasi</h2>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">No. Registrasi</p>
                                        <p className="font-mono text-sm text-gray-800">{applicant.nomor_registrasi}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Token</p>
                                        <p className="font-mono text-xs text-gray-800">{applicant.token_pendaftaran}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Tanggal Daftar</p>
                                        <p className="font-medium text-gray-800">{new Date(applicant.created_at).toLocaleDateString('id-ID')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex justify-end gap-2">
                        <Link href={route('spmb.applicant.show', applicant.id)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                            Batal
                        </Link>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Update Data'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
