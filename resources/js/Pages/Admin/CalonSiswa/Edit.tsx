import { useForm, usePage, Link } from '@inertiajs/inertia-react';
import { useState } from 'react';

export default function Edit({ calonSiswa }) {
    const { flash } = usePage().props;
    const [previewBukti, setPreviewBukti] = useState(
        calonSiswa.bukti_bayar ? `/storage/${calonSiswa.bukti_bayar}` : ''
    );

    const { data, put, processing, errors, reset } = useForm({
        nisn: calonSiswa.nisn ?? '',
        nama_lengkap: calonSiswa.nama_lengkap ?? '',
        tempat_lahir: calonSiswa.tempat_lahir ?? '',
        tanggal_lahir: calonSiswa.tanggal_lahir ? calonSiswa.tanggal_lahir.split('T')[0] : '',
        jenis_kelamin: calonSiswa.jenis_kelamin ?? '',
        alamat: calonSiswa.alamat ?? '',
        no_hp: calonSiswa.no_hp ?? '',
        email: calonSiswa.email ?? '',
        nama_ortu: calonSiswa.nama_ortu ?? '',
        no_hp_ortu: calonSiswa.no_hp_ortu ?? '',
        asal_sekolah: calonSiswa.asal_sekolah ?? '',
        prestasi: calonSiswa.prestasi ?? '',
        status: calonSiswa.status ?? 'pendaftaran',
        biaya_pendaftaran: calonSiswa.biaya_pendaftaran ?? '',
        bukti_bayar: null,
        keputusan: calonSiswa.keputusan ?? 'belum',
        catatan: calonSiswa.catatan ?? '',
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            put('bukti_bayar', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewBukti(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('ppdb.update', calonSiswa.id), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Data Calon Siswa</h1>
                <Link href={route('ppdb.index')} className="btn btn-outline mt-2">
                    Kembali ke Daftar Calon Siswa
                </Link>
                {flash?.success && (
                    <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg">
                        {flash.success}
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
                {/* Data Pribadi */}
                <div className="border-b pb-4">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Data Pribadi Siswa</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label"><span className="label-text font-medium">NISN <span className="text-red-500">*</span></span></label>
                            <input
                                type="text"
                                value={data.nisn}
                                onChange={(e) => put('nisn', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Nomor Induk Siswa Nasional"
                            />
                            {errors.nisn && <span className="text-error text-sm mt-1">{errors.nisn}</span>}
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Nama Lengkap <span className="text-red-500">*</span></span></label>
                            <input
                                type="text"
                                value={data.nama_lengkap}
                                onChange={(e) => put('nama_lengkap', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Nama lengkap siswa"
                            />
                            {errors.nama_lengkap && <span className="text-error text-sm mt-1">{errors.nama_lengkap}</span>}
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Tempat Lahir <span className="text-red-500">*</span></span></label>
                            <input
                                type="text"
                                value={data.tempat_lahir}
                                onChange={(e) => put('tempat_lahir', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Tempat lahir"
                            />
                            {errors.tempat_lahir && <span className="text-error text-sm mt-1">{errors.tempat_lahir}</span>}
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Tanggal Lahir <span className="text-red-500">*</span></span></label>
                            <input
                                type="date"
                                value={data.tanggal_lahir}
                                onChange={(e) => put('tanggal_lahir', e.target.value)}
                                className="input input-bordered w-full"
                            />
                            {errors.tanggal_lahir && <span className="text-error text-sm mt-1">{errors.tanggal_lahir}</span>}
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Jenis Kelamin <span className="text-red-500">*</span></span></label>
                            <select
                                value={data.jenis_kelamin}
                                onChange={(e) => put('jenis_kelamin', e.target.value)}
                                className="select select-bordered w-full"
                            >
                                <option value="">Pilih</option>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                            {errors.jenis_kelamin && <span className="text-error text-sm mt-1">{errors.jenis_kelamin}</span>}
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Email (Opsional)</span></label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => put('email', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="email@example.com"
                            />
                            {errors.email && <span className="text-error text-sm mt-1">{errors.email}</span>}
                        </div>
                        <div className="md:col-span-2">
                            <label className="label"><span className="label-text font-medium">Alamat <span className="text-red-500">*</span></span></label>
                            <textarea
                                value={data.alamat}
                                onChange={(e) => put('alamat', e.target.value)}
                                className="textarea textarea-bordered w-full"
                                rows="3"
                                placeholder="Alamat lengkap"
                            ></textarea>
                            {errors.alamat && <span className="text-error text-sm mt-1">{errors.alamat}</span>}
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">No. HP Siswa <span className="text-red-500">*</span></span></label>
                            <input
                                type="text"
                                value={data.no_hp}
                                onChange={(e) => put('no_hp', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="08xxxxxxxxxx"
                            />
                            {errors.no_hp && <span className="text-error text-sm mt-1">{errors.no_hp}</span>}
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Prestasi (Opsional)</span></label>
                            <textarea
                                value={data.prestasi}
                                onChange={(e) => put('prestasi', e.target.value)}
                                className="textarea textarea-bordered w-full"
                                rows="2"
                                placeholder="Prestasi yang dicapai (jika ada)"
                            ></textarea>
                            {errors.prestasi && <span className="text-error text-sm mt-1">{errors.prestasi}</span>}
                        </div>
                    </div>
                </div>

                {/* Data Orang Tua */}
                <div className="border-b pb-4">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Data Orang Tua/Wali</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label"><span className="label-text font-medium">Nama Orang Tua <span className="text-red-500">*</span></span></label>
                            <input
                                type="text"
                                value={data.nama_ortu}
                                onChange={(e) => put('nama_ortu', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Nama lengkap orang tua/wali"
                            />
                            {errors.nama_ortu && <span className="text-error text-sm mt-1">{errors.nama_ortu}</span>}
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">No. HP Orang Tua <span className="text-red-500">*</span></span></label>
                            <input
                                type="text"
                                value={data.no_hp_ortu}
                                onChange={(e) => put('no_hp_ortu', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="08xxxxxxxxxx"
                            />
                            {errors.no_hp_ortu && <span className="text-error text-sm mt-1">{errors.no_hp_ortu}</span>}
                        </div>
                    </div>
                </div>

                {/* Data Sekolah Asal */}
                <div className="border-b pb-4">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Data Sekolah Asal</h2>
                    <div>
                        <label className="label"><span className="label-text font-medium">Nama Sekolah Asal <span className="text-red-500">*</span></span></label>
                        <input
                            type="text"
                            value={data.asal_sekolah}
                            onChange={(e) => put('asal_sekolah', e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Nama sekolah sebelumnya"
                        />
                        {errors.asal_sekolah && <span className="text-error text-sm mt-1">{errors.asal_sekolah}</span>}
                    </div>
                </div>

                {/* Pembayaran & Status */}
                <div className="border-b pb-4">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Pembayaran & Status PPDB</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label"><span className="label-text font-medium">Biaya Pendaftaran <span className="text-red-500">*</span></span></label>
                            <input
                                type="number"
                                value={data.biaya_pendaftaran}
                                onChange={(e) => put('biaya_pendaftaran', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="0"
                                min="0"
                            />
                            {errors.biaya_pendaftaran && <span className="text-error text-sm mt-1">{errors.biaya_pendaftaran}</span>}
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Status <span className="text-red-500">*</span></span></label>
                            <select
                                value={data.status}
                                onChange={(e) => put('status', e.target.value)}
                                className="select select-bordered w-full"
                            >
                                <option value="pendaftaran">Pendaftaran</option>
                                <option value="seleksi">Seleksi</option>
                                <option value="lulus">Lulus</option>
                                <option value="tidak_lulus">Tidak Lulus</option>
                            </select>
                            {errors.status && <span className="text-error text-sm mt-1">{errors.status}</span>}
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Keputusan <span className="text-red-500">*</span></span></label>
                            <select
                                value={data.keputusan}
                                onChange={(e) => put('keputusan', e.target.value)}
                                className="select select-bordered w-full"
                            >
                                <option value="belum">Belum</option>
                                <option value="diterima">Diterima</option>
                                <option value="ditolak">Ditolak</option>
                            </select>
                            {errors.keputusan && <span className="text-error text-sm mt-1">{errors.keputusan}</span>}
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Bukti Bayar (Opsional)</span></label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="file-input file-input-bordered w-full"
                            />
                            {previewBukti && (
                                <div className="mt-2">
                                    <img src={previewBukti} alt="Preview" className="w-32 h-32 object-cover rounded border" />
                                </div>
                            )}
                            {errors.bukti_bayar && <span className="text-error text-sm mt-1">{errors.bukti_bayar}</span>}
                        </div>
                        <div className="md:col-span-2">
                            <label className="label"><span className="label-text font-medium">Catatan (Opsional)</span></label>
                            <textarea
                                value={data.catatan}
                                onChange={(e) => put('catatan', e.target.value)}
                                className="textarea textarea-bordered w-full"
                                rows="2"
                                placeholder="Catatan tambahan..."
                            ></textarea>
                            {errors.catatan && <span className="text-error text-sm mt-1">{errors.catatan}</span>}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Link href={route('ppdb.index')} className="btn btn-outline">
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