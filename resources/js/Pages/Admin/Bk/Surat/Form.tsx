import { useForm, Link } from "@inertiajs/inertia-react";

interface SiswaItem { id: number; nama_lengkap: string; nisn: string; }

interface Props {
    surat?: any;
    siswa: SiswaItem[];
}

const jenisOptions = [
    { value: 'panggilan_ortu', label: 'Surat Panggilan Orang Tua' },
    { value: 'pernyataan', label: 'Surat Pernyataan' },
    { value: 'rekomendasi_pkl', label: 'Surat Rekomendasi PKL/Praktik Kerja' },
    { value: 'rekomendasi_kuliah', label: 'Surat Rekomendasi Kuliah' },
    { value: 'lainnya', label: 'Lainnya' },
];

const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'diajukan', label: 'Diajukan' },
    { value: 'disetujui', label: 'Disetujui' },
    { value: 'ditolak', label: 'Ditolak' },
];

export default function Form({ surat, siswa }: Props) {
    const isEdit = !!surat;
    const { data, setData, post, put, processing, errors } = useForm({
        siswa_id: surat?.siswa_id ?? "",
        jenis: surat?.jenis ?? "panggilan_ortu",
        isi_surat: surat?.isi_surat ?? "",
        tanggal_surat: surat?.tanggal_surat ?? new Date().toISOString().split("T")[0],
        status: surat?.status ?? "draft",
        catatan: surat?.catatan ?? "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(route("bk.surat.update", surat.id));
        } else {
            post(route("bk.surat.store"));
        }
    };

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {isEdit ? "Edit Surat" : "Buat Surat Baru"}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl space-y-4">
                <div className="bg-white border border-border rounded-lg p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Siswa *</label>
                        <select
                            value={data.siswa_id}
                            onChange={(e) => setData("siswa_id", e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                            required
                            disabled={isEdit}
                        >
                            <option value="">Pilih Siswa</option>
                            {siswa.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.nama_lengkap} ({s.nisn})
                                </option>
                            ))}
                        </select>
                        {errors.siswa_id && <p className="text-xs text-red-500 mt-1">{errors.siswa_id}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Surat *</label>
                        <select
                            value={data.jenis}
                            onChange={(e) => setData("jenis", e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                        >
                            {jenisOptions.map((j) => (
                                <option key={j.value} value={j.value}>{j.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Surat</label>
                        <input
                            type="date"
                            value={data.tanggal_surat}
                            onChange={(e) => setData("tanggal_surat", e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                        />
                    </div>

                    {isEdit && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData("status", e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                            >
                                {statusOptions.map((s) => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Isi Surat / Catatan</label>
                        <textarea
                            value={data.isi_surat}
                            onChange={(e) => setData("isi_surat", e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                            rows={8}
                            placeholder="Tulis isi surat di sini..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Internal (opsional)</label>
                        <textarea
                            value={data.catatan}
                            onChange={(e) => setData("catatan", e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                            rows={3}
                            placeholder="Catatan untuk pihak lain (mis. wali kelas, kepala sekolah)..."
                        />
                    </div>
                </div>

                <div className="flex gap-3">
                    <button type="submit" disabled={processing} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 disabled:opacity-50">
                        {processing ? "Menyimpan..." : isEdit ? "Update" : "Simpan"}
                    </button>
                    <Link href={route("bk.surat.index")} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        Batal
                    </Link>
                </div>
            </form>
        </>
    );
}
