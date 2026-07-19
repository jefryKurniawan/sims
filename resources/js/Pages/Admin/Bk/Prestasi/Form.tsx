import { useForm, Link } from "@inertiajs/inertia-react";

interface SiswaItem { id: number; nama_lengkap: string; nisn: string; }

interface Props {
    prestasi?: any;
    siswa: SiswaItem[];
}

export default function Form({ prestasi, siswa }: Props) {
    const isEdit = !!prestasi;
    const { data, setData, post, put, processing, errors } = useForm({
        siswa_id: prestasi?.siswa_id ?? "",
        kategori: prestasi?.kategori ?? "akademik",
        tingkat: prestasi?.tingkat ?? "sekolah",
        nama: prestasi?.prestasi ?? "",
        penyelenggara: prestasi?.penyelenggara ?? "",
        tanggal: prestasi?.tanggal ?? new Date().toISOString().split("T")[0],
        deskripsi: prestasi?.keterangan ?? "",
        poin_prestasi: prestasi?.poin_prestasi ?? 0,
        verified_by_bk: prestasi?.verified_by_bk ?? false,
        bukti_file: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("siswa_id", String(data.siswa_id));
        formData.append("kategori", data.kategori);
        formData.append("tingkat", data.tingkat);
        formData.append("nama", data.nama);
        formData.append("penyelenggara", data.penyelenggara);
        formData.append("tanggal", data.tanggal);
        formData.append("deskripsi", data.deskripsi);
        formData.append("poin_prestasi", String(data.poin_prestasi));
        formData.append("verified_by_bk", String(data.verified_by_bk));
        if (data.bukti_file) formData.append("bukti_file", data.bukti_file);

        if (isEdit) {
            put(route("bk.prestasi.update", prestasi.id), {
                ...(data.bukti_file ? {
                    forceFormData: true,
                    onSuccess: () => {},
                } : {}),
            });
        } else {
            post(route("bk.prestasi.store"), {
                forceFormData: true,
                onSuccess: () => {},
            });
        }
    };

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {isEdit ? "Edit Prestasi" : "Catat Prestasi Baru"}
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
                                <option value="akademik">Akademik</option>
                                <option value="non_akademik">Non Akademik</option>
                                <option value="olahraga">Olahraga</option>
                                <option value="seni">Seni</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat *</label>
                            <select
                                value={data.tingkat}
                                onChange={(e) => setData("tingkat", e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                            >
                                <option value="sekolah">Sekolah</option>
                                <option value="kecamatan">Kecamatan</option>
                                <option value="kabupaten_kota">Kabupaten/Kota</option>
                                <option value="provinsi">Provinsi</option>
                                <option value="nasional">Nasional</option>
                                <option value="internasional">Internasional</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Prestasi *</label>
                        <input
                            type="text"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                            required
                        />
                        {errors.nama && <p className="text-xs text-red-500 mt-1">{errors.nama}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Penyelenggara</label>
                        <input
                            type="text"
                            value={data.penyelenggara}
                            onChange={(e) => setData("penyelenggara", e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                        />
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Poin Prestasi</label>
                            <input
                                type="number"
                                value={data.poin_prestasi}
                                onChange={(e) => setData("poin_prestasi", Number(e.target.value))}
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                                min={0}
                                max={500}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                        <textarea
                            value={data.deskripsi}
                            onChange={(e) => setData("deskripsi", e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                            rows={4}
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.verified_by_bk}
                                onChange={(e) => setData("verified_by_bk", e.target.checked)}
                                className="w-4 h-4 text-primary border-border rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">Verified by BK</span>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">File Bukti (opsional)</label>
                        <input
                            type="file"
                            accept=".jpg,.png,.pdf"
                            onChange={(e) => setData("bukti_file", e.target.files?.[0] || null)}
                            className="w-full text-sm"
                        />
                        {prestasi?.bukti_file && (
                            <p className="text-xs text-gray-500 mt-1">File existing: {prestasi.bukti_file}</p>
                        )}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button type="submit" disabled={processing} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 disabled:opacity-50">
                        {processing ? "Menyimpan..." : isEdit ? "Update" : "Simpan"}
                    </button>
                    <Link href={route("bk.prestasi.index")} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Batal</Link>
                </div>
            </form>
        </>
    );
}
