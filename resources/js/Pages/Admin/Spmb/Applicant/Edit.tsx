import { usePage, Link, useForm } from '@inertiajs/inertia-react';

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
        <>
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <Link href={route('spmb.applicant.show', applicant.id)} className="text-sm text-primary hover:underline mb-2 inline-block">&larr; Kembali ke Detail</Link>
                    <h1 className="text-2xl font-bold">Edit Pendaftar: {applicant.nama_lengkap}</h1>
                    <p className="text-gray-500">{applicant.nomor_registrasi}</p>
                </div>
            </div>

            {flash?.success && (
                <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg">{flash.success}</div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Data Pribadi */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 className="text-lg font-bold mb-4">Data Pribadi</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label"><span className="label-text font-medium">Nama Lengkap <span className="text-red-500">*</span></span></label>
                                    <input type="text" value={data.nama_lengkap} onChange={(e) => setData('nama_lengkap', e.target.value)} className="input input-bordered w-full" />
                                    {errors.nama_lengkap && <span className="text-error text-sm mt-1">{errors.nama_lengkap}</span>}
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">NISN <span className="text-red-500">*</span></span></label>
                                    <input type="text" value={data.nisn} onChange={(e) => setData('nisn', e.target.value)} className="input input-bordered w-full" />
                                    {errors.nisn && <span className="text-error text-sm mt-1">{errors.nisn}</span>}
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">NIK</span></label>
                                    <input type="text" value={data.nik} onChange={(e) => setData('nik', e.target.value)} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">No. KK</span></label>
                                    <input type="text" value={data.no_kk} onChange={(e) => setData('no_kk', e.target.value)} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">Tempat Lahir <span className="text-red-500">*</span></span></label>
                                    <input type="text" value={data.tempat_lahir} onChange={(e) => setData('tempat_lahir', e.target.value)} className="input input-bordered w-full" />
                                    {errors.tempat_lahir && <span className="text-error text-sm mt-1">{errors.tempat_lahir}</span>}
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">Tanggal Lahir <span className="text-red-500">*</span></span></label>
                                    <input type="date" value={data.tanggal_lahir} onChange={(e) => setData('tanggal_lahir', e.target.value)} className="input input-bordered w-full" />
                                    {errors.tanggal_lahir && <span className="text-error text-sm mt-1">{errors.tanggal_lahir}</span>}
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">Jenis Kelamin <span className="text-red-500">*</span></span></label>
                                    <select value={data.jenis_kelamin} onChange={(e) => setData('jenis_kelamin', e.target.value)} className="select select-bordered w-full">
                                        <option value="">Pilih</option>
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                    {errors.jenis_kelamin && <span className="text-error text-sm mt-1">{errors.jenis_kelamin}</span>}
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">Agama</span></label>
                                    <select value={data.agama} onChange={(e) => setData('agama', e.target.value)} className="select select-bordered w-full">
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
                                    <label className="label"><span className="label-text font-medium">Alamat <span className="text-red-500">*</span></span></label>
                                    <textarea value={data.alamat} onChange={(e) => setData('alamat', e.target.value)} className="textarea textarea-bordered w-full" rows={3}></textarea>
                                    {errors.alamat && <span className="text-error text-sm mt-1">{errors.alamat}</span>}
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">No. HP <span className="text-red-500">*</span></span></label>
                                    <input type="text" value={data.no_hp} onChange={(e) => setData('no_hp', e.target.value)} className="input input-bordered w-full" />
                                    {errors.no_hp && <span className="text-error text-sm mt-1">{errors.no_hp}</span>}
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">Email</span></label>
                                    <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="input input-bordered w-full" />
                                    {errors.email && <span className="text-error text-sm mt-1">{errors.email}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Data Pendidikan */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 className="text-lg font-bold mb-4">Data Pendidikan</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label"><span className="label-text font-medium">Asal Sekolah <span className="text-red-500">*</span></span></label>
                                    <input type="text" value={data.asal_sekolah} onChange={(e) => setData('asal_sekolah', e.target.value)} className="input input-bordered w-full" />
                                    {errors.asal_sekolah && <span className="text-error text-sm mt-1">{errors.asal_sekolah}</span>}
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">NPSN Sekolah</span></label>
                                    <input type="text" value={data.npsn_sekolah} onChange={(e) => setData('npsn_sekolah', e.target.value)} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">Jurusan</span></label>
                                    <input type="text" value={data.jurusan_sekolah} onChange={(e) => setData('jurusan_sekolah', e.target.value)} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">Tahun Lulus</span></label>
                                    <input type="number" value={data.tahun_lulus} onChange={(e) => setData('tahun_lulus', e.target.value)} className="input input-bordered w-full" />
                                </div>
                            </div>
                        </div>

                        {/* Data Orang Tua */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 className="text-lg font-bold mb-4">Data Orang Tua</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Ayah</h3>
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">Nama Ayah</span></label>
                                    <input type="text" value={data.nama_ayah} onChange={(e) => setData('nama_ayah', e.target.value)} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">NIK Ayah</span></label>
                                    <input type="text" value={data.nik_ayah} onChange={(e) => setData('nik_ayah', e.target.value)} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">Pekerjaan Ayah</span></label>
                                    <input type="text" value={data.pekerjaan_ayah} onChange={(e) => setData('pekerjaan_ayah', e.target.value)} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">No. HP Ayah</span></label>
                                    <input type="text" value={data.no_hp_ayah} onChange={(e) => setData('no_hp_ayah', e.target.value)} className="input input-bordered w-full" />
                                </div>
                                <div className="md:col-span-2">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Ibu</h3>
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">Nama Ibu</span></label>
                                    <input type="text" value={data.nama_ibu} onChange={(e) => setData('nama_ibu', e.target.value)} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">NIK Ibu</span></label>
                                    <input type="text" value={data.nik_ibu} onChange={(e) => setData('nik_ibu', e.target.value)} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">Pekerjaan Ibu</span></label>
                                    <input type="text" value={data.pekerjaan_ibu} onChange={(e) => setData('pekerjaan_ibu', e.target.value)} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">No. HP Ibu</span></label>
                                    <input type="text" value={data.no_hp_ibu} onChange={(e) => setData('no_hp_ibu', e.target.value)} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">Penghasilan Orang Tua</span></label>
                                    <select value={data.penghasilan_ortu} onChange={(e) => setData('penghasilan_ortu', e.target.value)} className="select select-bordered w-full">
                                        <option value="">Pilih</option>
                                        <option value="< 1.000.000">&lt; Rp 1.000.000</option>
                                        <option value="1.000.000 - 3.000.000">Rp 1.000.000 - Rp 3.000.000</option>
                                        <option value="3.000.000 - 5.000.000">Rp 3.000.000 - Rp 5.000.000</option>
                                        <option value="> 5.000.000">&gt; Rp 5.000.000</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">No. HP Orang Tua</span></label>
                                    <input type="text" value={data.no_hp_ortu} onChange={(e) => setData('no_hp_ortu', e.target.value)} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">Nama Wali</span></label>
                                    <input type="text" value={data.nama_wali} onChange={(e) => setData('nama_wali', e.target.value)} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">No. HP Wali</span></label>
                                    <input type="text" value={data.no_hp_wali} onChange={(e) => setData('no_hp_wali', e.target.value)} className="input input-bordered w-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status & Jalur */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 className="text-lg font-bold mb-4">Status Pendaftaran</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="label"><span className="label-text font-medium">Jalur Pendaftaran <span className="text-red-500">*</span></span></label>
                                    <select value={data.jalur_pendaftaran} onChange={(e) => setData('jalur_pendaftaran', e.target.value)} className="select select-bordered w-full">
                                        <option value="reguler">Reguler</option>
                                        <option value="afirmasi">Afirmasi</option>
                                        <option value="prestasi">Prestasi</option>
                                    </select>
                                    {errors.jalur_pendaftaran && <span className="text-error text-sm mt-1">{errors.jalur_pendaftaran}</span>}
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-medium">Status <span className="text-red-500">*</span></span></label>
                                    <select value={data.status_pendaftaran} onChange={(e) => setData('status_pendaftaran', e.target.value)} className="select select-bordered w-full">
                                        <option value="draft">Draft</option>
                                        <option value="submitted">Submitted</option>
                                        <option value="verifikasi_berkas">Verifikasi Berkas</option>
                                        <option value="lulus_seleksi">Lulus Seleksi</option>
                                        <option value="diterima">Diterima</option>
                                        <option value="ditolak">Ditolak</option>
                                    </select>
                                    {errors.status_pendaftaran && <span className="text-error text-sm mt-1">{errors.status_pendaftaran}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Info Registrasi */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 className="text-lg font-bold mb-4">Info Registrasi</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">No. Registrasi</p>
                                    <p className="font-mono text-sm">{applicant.nomor_registrasi}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Token</p>
                                    <p className="font-mono text-xs">{applicant.token_pendaftaran}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Tanggal Daftar</p>
                                    <p className="font-medium">{new Date(applicant.created_at).toLocaleDateString('id-ID')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-2">
                    <Link href={route('spmb.applicant.show', applicant.id)} className="btn btn-outline">
                        Batal
                    </Link>
                    <button type="submit" className="btn btn-primary" disabled={processing}>
                        {processing ? 'Menyimpan...' : 'Update Data'}
                    </button>
                </div>
            </form>
        </>
    );
}
