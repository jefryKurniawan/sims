import { Head } from "@/Layout/Head";
import { Link } from "@inertiajs/inertia-react";
import { useState, useRef, useEffect } from "react";
import { useForm, usePage, router } from "@inertiajs/inertia-react";
import { 
    Calculator, 
    CheckCircle, 
    AlertCircle, 
    ArrowLeft, 
    ArrowUpDown, 
    Loader2, 
    Trophy 
} from "lucide-react";

interface Gelombang {
    id: number;
    nama: string;
    kuota: number;
    biaya_pendaftaran: number;
    tanggal_mulai: string;
    tanggal_selesai: string;
}

interface Jurusan {
    id: number;
    nama: string;
}

interface CalonSiswaSeleksi {
    id: number;
    nisn: string;
    nama_lengkap: string;
    jurusan_id: number | null;
    jurusan?: { nama: string };
    nilai_rapot: number | null;
    nilai_wawancara: number | null;
    nilai_akhir: number | null;
    status: string;
    keputusan: string;
}

interface Props {
    gelombang: Gelombang[];
    jurusan: Jurusan[];
    calonSiswa?: any;
    selectedGelombangId?: number;
    selectedJurusanId?: number | null;
    ranking?: CalonSiswaSeleksi[];
    statistik?: {
        processed: number;
        lulus: number;
        tidak_lulus: number;
    };
}

export default function Seleksi({
    gelombang,
    jurusan,
    calonSiswa = [],
    selectedGelombangId,
    selectedJurusanId,
    ranking = [],
    statistik,
}: Props) {
    const [showRanking, setShowRanking] = useState(false);
    const tableRef = useRef<HTMLTableElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        gelombang_id: selectedGelombangId || "",
        jurusan_id: selectedJurusanId || "",
    });

    const { data: nilaiData, setData: setNilaiData, put: putNilai, processing: processingNilai } = useForm({
        nilai: {} as Record<number, { rapot: number | null; wawancara: number | null }>,
    });

    function handleGelombangChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value ? parseInt(e.target.value) : "";
        setData("gelombang_id", value);
        setData("jurusan_id", "");
        router.get(route("ppdb.seleksi.form"), { gelombang_id: value }, { preserveScroll: true });
    }

    function handleJurusanChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value ? parseInt(e.target.value) : "";
        setData("jurusan_id", value);
        router.get(route("ppdb.seleksi.form"), { 
            gelombang_id: data.gelombang_id, 
            jurusan_id: value 
        }, { preserveScroll: true });
    }

    function handleNilaiChange(calonId: number, field: "rapot" | "wawancara", value: string) {
        const numValue = value === "" ? null : parseFloat(value);
        if (numValue !== null && (numValue < 0 || numValue > 100)) return;

        setNilaiData("nilai", {
            ...nilaiData.nilai,
            [calonId]: {
                ...(nilaiData.nilai[calonId] || { rapot: null, wawancara: null }),
                [field]: numValue,
            },
        });
    }

    function handleSaveNilai(calonId: number) {
        const nilai = nilaiData.nilai[calonId];
        if (!nilai || nilai.rapot === null || nilai.wawancara === null) {
            alert("Nilai rapot dan wawancara harus diisi keduanya");
            return;
        }

        putNilai(route("ppdb.input-nilai", calonId), {
            nilai_rapot: nilai.rapot,
            nilai_wawancara: nilai.wawancara,
        }, {
            onSuccess: () => {
                router.visit(route("ppdb.seleksi.form"), {
                    gelombang_id: data.gelombang_id,
                    jurusan_id: data.jurusan_id,
                });
            }
        });
    }

    function handleProsesSeleksi() {
        if (!data.gelombang_id) {
            alert("Pilih gelombang terlebih dahulu");
            return;
        }

        if (!confirm("Yakin ingin memproses seleksi? Ini akan menentukan kelulusan berdasarkan ranking nilai.")) {
            return;
        }

        post(route("ppdb.seleksi.proses"), {
            gelombang_id: data.gelombang_id,
            jurusan_id: data.jurusan_id || null,
        }, {
            onSuccess: () => {
                setShowRanking(true);
            }
        });
    }

    function calculateNilaiAkhir(rapot: number | null, wawancara: number | null): number | null {
        if (rapot === null || wawancara === null) return null;
        return Math.round((rapot * 0.4 + wawancara * 0.6) * 100) / 100;
    }

    function getStatusBadge(status: string, keputusan: string) {
        if (status === "lulus" || keputusan === "diterima") {
            return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full"><CheckCircle className="w-3 h-3" /> Lulus</span>;
        }
        if (status === "tidak_lulus" || keputusan === "ditolak") {
            return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full"><AlertCircle className="w-3 h-3" /> Tidak Lulus</span>;
        }
        if (status === "seleksi") {
            return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Seleksi</span>;
        }
        return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">Pending</span>;
    }

    const selectedGelombang = gelombang.find(g => g.id === selectedGelombangId);

    return (
        <>
            <Head title="Seleksi Calon Siswa" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Seleksi Calon Siswa
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Input nilai & proses seleksi PPDB
                        </p>
                    </div>
                    <Link
                        href={route("ppdb.index")}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-semibold shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </Link>
                </div>

                {/* Filter Form */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gelombang <span className="text-destructive">*</span>
                            </label>
                            <select
                                value={data.gelombang_id}
                                onChange={handleGelombangChange}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                            >
                                <option value="">-- Pilih Gelombang --</option>
                                {gelombang.map((g) => (
                                    <option key={g.id} value={g.id}>
                                        {g.nama} (Kuota: {g.kuota})
                                    </option>
                                ))}
                            </select>
                            {errors.gelombang_id && (
                                <p className="mt-1 text-sm text-destructive">{errors.gelombang_id}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Jurusan
                            </label>
                            <select
                                value={data.jurusan_id}
                                onChange={handleJurusanChange}
                                disabled={!data.gelombang_id}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring disabled:bg-gray-50"
                            >
                                <option value="">-- Semua Jurusan --</option>
                                {jurusan.map((j) => (
                                    <option key={j.id} value={j.id}>{j.nama}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={handleProsesSeleksi}
                                disabled={processing || !data.gelombang_id || calonSiswa.length === 0}
                                className="w-full px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        <Calculator className="w-4 h-4" />
                                        Proses Seleksi
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {selectedGelombang && (
                    <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div><span className="font-medium text-gray-600">Gelombang:</span> <span className="text-gray-900 ml-1">{selectedGelombang.nama}</span></div>
                            <div><span className="font-medium text-gray-600">Kuota:</span> <span className="text-gray-900 ml-1">{selectedGelombang.kuota}</span></div>
                            <div><span className="font-medium text-gray-600">Biaya:</span> <span className="text-gray-900 ml-1">Rp {Number(selectedGelombang.biaya_pendaftaran).toLocaleString("id-ID")}</span></div>
                            <div><span className="font-medium text-gray-600">Periode:</span> <span className="text-gray-900 ml-1">{new Date(selectedGelombang.tanggal_mulai).toLocaleDateString("id-ID")} - {new Date(selectedGelombang.tanggal_selesai).toLocaleDateString("id-ID")}</span></div>
                        </div>
                    </div>
                )}

                {/* Calon Siswa List */}
                {data.gelombang_id && calonSiswa.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
                        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Calon Siswa ({calonSiswa.length})
                            </h2>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>Bobot: Raport 40% + Wawancara 60%</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full" ref={tableRef}>
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NISN</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jurusan</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai Rapot (40%)</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai Wawancara (60%)</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai Akhir</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {calonSiswa.data?.map?.((calon: any, index: number) => {
                                        const inputNilai = nilaiData.nilai[calon.id] || { rapot: calon.nilai_rapot, wawancara: calon.nilai_wawancara };
                                        const displayNilaiAkhir = calculateNilaiAkhir(inputNilai.rapot, inputNilai.wawancara);
                                        const isEditing = inputNilai.rapot !== calon.nilai_rapot || inputNilai.wawancara !== calon.nilai_wawancara;

                                        return (
                                            <tr key={calon.id} className={isEditing ? "bg-yellow-50" : ""}>
                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                    {(calonSiswa.current_page - 1) * (calonSiswa.per_page || 1) + index + 1}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900 font-mono">{calon.nisn}</td>
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{calon.nama_lengkap}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">{calon.jurusan?.nama || "-"}</td>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        step="0.01"
                                                        value={inputNilai.rapot ?? ""}
                                                        onChange={(e) => handleNilaiChange(calon.id, "rapot", e.target.value)}
                                                        className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                                        placeholder="0-100"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        step="0.01"
                                                        value={inputNilai.wawancara ?? ""}
                                                        onChange={(e) => handleNilaiChange(calon.id, "wawancara", e.target.value)}
                                                        className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                                        placeholder="0-100"
                                                    />
                                                </td>
                                                <td className="px-4 py-3 text-sm font-bold text-gray-900">
                                                    {displayNilaiAkhir !== null ? displayNilaiAkhir.toFixed(2) : "-"}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {getStatusBadge(calon.status, calon.keputusan)}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {isEditing ? (
                                                        <button
                                                            onClick={() => handleSaveNilai(calon.id)}
                                                            disabled={processingNilai}
                                                            className="text-sm text-primary hover:text-primary/80 font-medium"
                                                        >
                                                            Simpan
                                                        </button>
                                                    ) : (
                                                        <span className="text-sm text-gray-400">-</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {data.gelombang_id && calonSiswa.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <Calculator className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>Tidak ada calon siswa untuk gelombang ini</p>
                    </div>
                )}

                {/* Ranking Results */}
                {showRanking && ranking.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-amber-500" />
                                Hasil Ranking Seleksi
                            </h2>
                            <button
                                onClick={() => setShowRanking(false)}
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                Tutup
                            </button>
                        </div>
                        {statistik && (
                            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 grid grid-cols-3 gap-4 text-sm">
                                <div className="text-center p-2 bg-blue-50 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600">{statistik.processed}</div>
                                    <div className="text-gray-600">Diproses</div>
                                </div>
                                <div className="text-center p-2 bg-green-50 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">{statistik.lulus}</div>
                                    <div className="text-gray-600">Lulus</div>
                                </div>
                                <div className="text-center p-2 bg-red-50 rounded-lg">
                                    <div className="text-2xl font-bold text-red-600">{statistik.tidak_lulus}</div>
                                    <div className="text-gray-600">Tidak Lulus</div>
                                </div>
                            </div>
                        )}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ranking</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NISN</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jurusan</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai Rapot</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai Wawancara</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai Akhir</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keputusan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {ranking.map((calon, index) => (
                                        <tr key={calon.id} className={index < (selectedGelombang?.kuota || 0) ? "bg-green-50" : ""}>
                                            <td className="px-4 py-3 text-sm font-bold text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900 font-mono">{calon.nisn}</td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{calon.nama_lengkap}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{calon.jurusan?.nama || "-"}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">{calon.nilai_rapot?.toFixed(2) || "-"}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">{calon.nilai_wawancara?.toFixed(2) || "-"}</td>
                                            <td className="px-4 py-3 text-sm font-bold text-gray-900">{calon.nilai_akhir?.toFixed(2) || "-"}</td>
                                            <td className="px-4 py-3">
                                                {calon.keputusan === "diterima" ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full"><CheckCircle className="w-3 h-3" /> Diterima</span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full"><AlertCircle className="w-3 h-3" /> Ditolak</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-gray-200 bg-gray-50 text-sm text-gray-600">
                            <p className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded"></span> Baris hijau = dalam kuota (lulus)</p>
                        </div>
                    </div>
                )}

                {!data.gelombang_id && (
                    <div className="text-center py-12 text-gray-500">
                        <ArrowUpDown className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p className="text-lg font-medium">Pilih gelombang untuk memulai seleksi</p>
                        <p className="text-sm mt-1">Data calon siswa akan muncul setelah gelombang dipilih</p>
                    </div>
                )}
            </div>
        </>
    );
}
