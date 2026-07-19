import { useForm, usePage, Link } from "@inertiajs/inertia-react";

interface SiswaItem {
    id: number;
    nama_lengkap: string;
    nisn: string;
}

interface Props {
    pelanggaran?: any;
    siswa: SiswaItem[];
}

export default function Form({ pelanggaran, siswa }: Props) {
    const isEdit = !!pelanggaran;
    const { data, setData, post, put, processing, errors } = useForm({
        siswa_id: pelanggaran?.siswa_id ?? "",
        kategori: pelanggaran?.kategori ?? "ringan",
        poin: pelanggaran?.poin ?? 0,
        deskripsi: pelanggaran?.deskripsi ?? "",
        tanggal: pelanggaran?.tanggal ?? new Date().toISOString().split("T")[0],
        status: pelanggaran?.status ?? "aktif",
        semester: pelanggaran?.semester ?? "",
        bukti_file: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("siswa_id", String(data.siswa_id));
        formData.append("kategori", data.kategori);
        formData.append("poin", String(data.poin));
        formData.append("deskripsi", data.deskripsi);
        formData.append("tanggal", data.tanggal);
        if (isEdit) formData.append("status", data.status);
        if (data.semester) formData.append("semester", data.semester);
        if (data.bukti_file) formData.append("bukti_file", data.bukti_file);

        if (isEdit) {
            put(route("bk.pelanggaran.update", pelanggaran.id), {
                ...(data.bukti_file ? {
                    forceFormData: true,
                    onSuccess: () => {},
                } : {}),
            });
        } else {
            post(route("bk.pelanggaran.store"), {
                forceFormData: true,
                onSuccess: () => {},
            });
        }
    };

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {isEdit ? "Edit Pelanggaran" : "Catat Pelanggaran Baru"}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
                            <select
                                value={data.kategori}
                                onChange={(e) => setData("kategori", e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                            >
                                <option value="ringan">Ringan (5-10 poin)</option>
                                <option value="sedang">Sedang (15-25 poin)</option>
                                <option value="berat">Berat (30-100 poin)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Poin *</label>
                            <input
                                type="number"
                                value={data.poin}
                                onChange={(e) => setData("poin", Number(e.target.value))}
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                                min={0}
                                max={200}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {isEdit && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}
                                    className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                                >
                                    <option value="aktif">Aktif</option>
                                    <option value="ditindaklanjuti">Ditindaklanjuti</option>
                                    <option value="selesai">Selesai</option>
                                </select>
                            </div>
                        )}

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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Semester (Opsional)</label>
                            <input
                                type="text"
                                value={data.semester}
                                onChange={(e) => setData("semester", e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                                placeholder="Contoh: Ganjil 2025/2026"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Pelanggaran *</label>
                        <textarea
                            value={data.deskripsi}
                            onChange={(e) => setData("deskripsi", e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                            rows={4}
                            required
                        />
                        {errors.deskripsi && <p className="text-xs text-red-500 mt-1">{errors.deskripsi}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">File Bukti (opsional)</label>
                        <input
                            type="file"
                            accept=".jpg,.png,.pdf"
                            onChange={(e) => setData("bukti_file", e.target.files?.[0] || null)}
                            className="w-full text-sm"
                        />
                        {pelanggaran?.bukti_file && (
                            <p className="text-xs text-gray-500 mt-1">File existing: {pelanggaran.bukti_file}</p>
                        )}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button type="submit" disabled={processing} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 disabled:opacity-50">
                        {processing ? "Menyimpan..." : isEdit ? "Update" : "Simpan"}
                    </button>
                    <Link href={route("bk.pelanggaran.index")} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        Batal
                    </Link>
                </div>
            </form>
        </>
    );
}
