import { useForm, usePage } from '@inertiajs/inertia-react';
import { useState } from 'react';

export default function Create() {
    const { data } = usePage().props;
    const { siswa } = data;
    const [form] = useForm({
        siswa_id: '',
        jenis: 'potongan',
        nominal: '',
        tanggal_mulai: '',
        tanggal_selesai: '',
        keterangan: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('dispensasi.store'), form);
        form.reset();
    };

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Tambah Dispensasi Baru</h1>
                <Link
                    href={route('dispensasi.index')}
                    className="btn btn-outline mb-2"
                >
                    Kembali ke Daftar Dispensasi
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Siswa</label>
                    <select
                        value={form.siswa_id}
                        onChange={e => form.set('siswa_id', e.target.value)}
                        className="select select-bordered w-full"
                    >
                        <option value="">Pilih Siswa</option>
                        {siswa.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.nama} ({s.nisn})
                            </option>
                        ))}
                    </select>
                    {!!form.errors.siswa_id && <span className="text-error text-sm">{form.errors.siswa_id}</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Jenis Dispensasi</label>
                    <select
                        value={form.jenis}
                        onChange={e => form.set('jenis', e.target.value)}
                        className="select select-bordered w-full"
                    >
                        <option value="potongan">Potongan</option>
                        <option value="penundaan">Penundaan</option>
                    </select>
                    {!!form.errors.jenis && <span className="text-error text-sm">{form.errors.jenis}</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Nominal (Rp)</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={form.nominal}
                        onChange={e => form.set('nominal', e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Nominal dispensasi"
                    />
                    {!!form.errors.nominal && <span className="text-error text-sm">{form.errors.nominal}</span>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Tanggal Mulai</label>
                        <input
                            type="date"
                            value={form.tanggal_mulai}
                            onChange={e => form.set('tanggal_mulai', e.target.value)}
                            className="input input-bordered w-full"
                        />
                        {!!form.errors.tanggal_mulai && <span className="text-error text-sm">{form.errors.tanggal_mulai}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Tanggal Selesai</label>
                        <input
                            type="date"
                            value={form.tanggal_selesai}
                            onChange={e => form.set('tanggal_selesai', e.target.value)}
                            className="input input-bordered w-full"
                        />
                        {!!form.errors.tanggal_selesai && <span className="text-error text-sm">{form.errors.tanggal_selesai}</span>}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Keterangan</label>
                    <textarea
                        value={form.keterangan}
                        onChange={e => form.set('keterangan', e.target.value)}
                        className="textarea textarea-bordered w-full"
                        rows={3}
                        placeholder="Keterangan tambahan"
                    />
                    {!!form.errors.keterangan && <span className="text-error text-sm">{form.errors.keterangan}</span>}
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={() => {
                            form.reset();
                        }}
                        className="btn btn-outline"
                    >
                        Batal
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Simpan Dispensasi
                    </button>
                </div>
            </form>
        </>
    );
}