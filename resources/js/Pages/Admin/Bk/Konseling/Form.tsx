import { useForm, Link } from "@inertiajs/inertia-react";

interface SiswaItem { id: number; nama_lengkap: string; nisn: string; }
interface GuruItem { id: number; nama_lengkap: string; nuptk: string; }

interface Props {
    konseling?: any;
    siswa: SiswaItem[];
    guruBk: GuruItem[];
}

export default function Form({ konseling, siswa, guruBk }: Props) {
    const isEdit = !!konseling;
    const { data, setData, post, put, processing, errors } = useForm({
        siswa_id: konseling?.siswa_id ?? "",
        guru_bk_id: konseling?.guru_bk_id ?? "",
        tanggal: konseling?.tanggal ?? new Date().toISOString().split("T")[0],
        topik: konseling?.topik ?? "",
        catatan: konseling?.catatan ?? "",
        tindak_lanjut: konseling?.tindak_lanjut ?? "",
        status: konseling?.status ?? "terbuka",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(route("bk.konseling.update", konseling.id));
        } else {
            post(route("bk.konseling.store"));
        }
    };

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {isEdit ? "Edit Konseling" : "Tambah Konseling Baru"}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
                <div className="bg-white border border-border rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Guru BK</label>
                            <select
                                value={data.guru_bk_id}
                                onChange={(e) => setData("guru_bk_id", e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                            >
                                <option value="">Pilih Guru BK</option>
                                {guruBk.map((g) => (
                                    <option key={g.id} value={g.id}>{g.nama_lengkap}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal *</label>
                            <input
                                type="date"
                                value={data.tanggal}
                                onChange={(e) => setData("tanggal", e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData("status", e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                            >
                                <option value="terbuka">Terbuka</option>
                                <option value="selesai">Selesai</option>
                                <option value="rujukan">Rujukan</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Topik *</label>
                        <input
                            type="text"
                            value={data.topik}
                            onChange={(e) => setData("topik", e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                            placeholder="Contoh: Masalah kedisiplinan"
                            required
                        />
                        {errors.topik && <p className="text-xs text-red-500 mt-1">{errors.topik}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                        <textarea
                            value={data.catatan}
                            onChange={(e) => setData("catatan", e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                            rows={4}
                            placeholder="Hasil konseling..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tindak Lanjut</label>
                        <textarea
                            value={data.tindak_lanjut}
                            onChange={(e) => setData("tindak_lanjut", e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                            rows={3}
                            placeholder="Rekomendasi tindak lanjut..."
                        />
                    </div>
                </div>

                <div className="flex gap-3">
                    <button type="submit" disabled={processing} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 disabled:opacity-50">
                        {processing ? "Menyimpan..." : isEdit ? "Update" : "Simpan"}
                    </button>
                    <Link href={route("bk.konseling.index")} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Batal</Link>
                </div>
            </form>
        </>
    );
}
