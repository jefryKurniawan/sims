import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

interface SppSetting {
    id?: number;
    amount: number;
    update_by?: number;
}

interface Props {
    defaultNominal: number;
    activeCount: number;
    setting?: SppSetting | null;
}

const BULAN = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export default function Generate({ defaultNominal, activeCount, setting }: Props) {
    const { errors = {}, flash = {} } = usePage().props;
    const [tab, setTab] = useState<"generate" | "setting">("generate");

    // Generate form state
    const now = new Date();
    const [bulan, setBulan] = useState(now.getMonth() + 1);
    const [tahun, setTahun] = useState(now.getFullYear());
    const [nominal, setNominal] = useState(defaultNominal);
    const [keterangan, setKeterangan] = useState("");

    const lastDay = new Date(tahun, bulan, 0).getDate();
    const defaultJatuhTempo = `${tahun}-${String(bulan).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
    const [jatuhTempo, setJatuhTempo] = useState(defaultJatuhTempo);

    // Setting form state
    const [settingAmount, setSettingAmount] = useState(setting?.amount ?? 0);
    const [settingSaved, setSettingSaved] = useState(false);

    const handleBulansChange = (b: number) => {
        setBulan(b);
        const ld = new Date(tahun, b, 0).getDate();
        setJatuhTempo(`${tahun}-${String(b).padStart(2, "0")}-${String(ld).padStart(2, "0")}`);
    };

    const handleTahunChange = (y: number) => {
        setTahun(y);
        const ld = new Date(y, bulan, 0).getDate();
        setJatuhTempo(`${y}-${String(bulan).padStart(2, "0")}-${String(ld).padStart(2, "0")}`);
    };

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post(route("spp.generate.store"), {
            bulan,
            tahun,
            nominal,
            tanggal_jatuh_tempo: jatuhTempo,
            keterangan: keterangan || undefined,
        });
    };

    const handleSaveSetting = (e: React.FormEvent) => {
        e.preventDefault();
        setSettingSaved(false);
        Inertia.post(route("spp.setting"), {
            amount: settingAmount,
        }, {
            onSuccess: () => {
                setSettingSaved(true);
                setNominal(settingAmount);
                setTimeout(() => setSettingSaved(false), 3000);
            },
        });
    };

    const formatRupiah = (v: number) =>
        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v);

    return (
        <>
            <Head title="SPP - Generate & Setting" />
            <div className="p-4 lg:p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Generate Tagihan Massal
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Buat tagihan SPP bulanan & atur nominal default
                        </p>
                    </div>
                    <Link
                        href={route("spp.index")}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
                    >
                        Kembali
                    </Link>
                </div>

                {/* Tab navigation */}
                <div className="flex gap-1 border-b border-border">
                    <button
                        onClick={() => setTab("generate")}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                            tab === "generate"
                                ? "border-primary text-primary"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        Generate Tagihan
                    </button>
                    <button
                        onClick={() => setTab("setting")}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                            tab === "setting"
                                ? "border-primary text-primary"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        Pengaturan Nominal
                    </button>
                </div>

                {/* ── Generate Tab ── */}
                {tab === "generate" && (
                    <div className="max-w-xl bg-white rounded-lg shadow border">
                        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">Form Generate</h2>
                            <span className="text-sm text-muted-foreground">
                                {activeCount} siswa aktif
                            </span>
                        </div>
                        <div className="p-6 space-y-4">
                            <form onSubmit={handleGenerate} className="space-y-4">
                                {/* Bulan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Bulan <span className="text-destructive">*</span>
                                    </label>
                                    <select
                                        value={bulan}
                                        onChange={(e) => handleBulansChange(Number(e.target.value))}
                                        className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-ring"
                                    >
                                        {BULAN.map((name, i) => (
                                            <option key={i + 1} value={i + 1}>{name}</option>
                                        ))}
                                    </select>
                                    {errors.bulan && <p className="mt-1 text-sm text-destructive">{errors.bulan}</p>}
                                </div>

                                {/* Tahun */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tahun <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={tahun}
                                        onChange={(e) => handleTahunChange(Number(e.target.value))}
                                        className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-ring"
                                        min={2020}
                                        max={2099}
                                    />
                                    {errors.tahun && <p className="mt-1 text-sm text-destructive">{errors.tahun}</p>}
                                </div>

                                {/* Nominal */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nominal (Rp) <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={nominal}
                                        onChange={(e) => setNominal(Number(e.target.value))}
                                        className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-ring"
                                        min={0}
                                        step={1000}
                                    />
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Default: {formatRupiah(setting?.amount ?? 0)} (
                                        <button
                                            type="button"
                                            onClick={() => setNominal(setting?.amount ?? 0)}
                                            className="text-primary hover:underline"
                                        >
                                            pakai nominal default
                                        </button>
                                        )
                                    </p>
                                    {errors.nominal && <p className="mt-1 text-sm text-destructive">{errors.nominal}</p>}
                                </div>

                                {/* Jatuh Tempo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tanggal Jatuh Tempo <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={jatuhTempo}
                                        onChange={(e) => setJatuhTempo(e.target.value)}
                                        className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-ring"
                                    />
                                    {errors.tanggal_jatuh_tempo && (
                                        <p className="mt-1 text-sm text-destructive">{errors.tanggal_jatuh_tempo}</p>
                                    )}
                                </div>

                                {/* Keterangan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Keterangan (opsional)
                                    </label>
                                    <input
                                        type="text"
                                        value={keterangan}
                                        onChange={(e) => setKeterangan(e.target.value)}
                                        className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-ring"
                                        placeholder={`SPP ${BULAN[bulan - 1]} ${tahun}`}
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
                                    >
                                        Generate Tagihan
                                    </button>
                                    <Link
                                        href={route("spp.index")}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                                    >
                                        Batal
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* ── Setting Tab ── */}
                {tab === "setting" && (
                    <div className="max-w-lg bg-white rounded-lg shadow border">
                        <div className="px-6 py-4 border-b border-border">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Pengaturan Nominal Default SPP
                            </h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                Nominal ini akan muncul otomatis saat generate tagihan massal.
                            </p>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSaveSetting} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nominal Default SPP (Rp)
                                    </label>
                                    <input
                                        type="number"
                                        value={settingAmount}
                                        onChange={(e) => setSettingAmount(Number(e.target.value))}
                                        className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-ring"
                                        min={0}
                                        step={1000}
                                    />
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {settingAmount > 0
                                            ? `Rp ${formatRupiah(settingAmount)} per bulan`
                                            : "Belum diatur"}
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
                                    >
                                        {settingSaved ? "✓ Tersimpan" : "Simpan Pengaturan"}
                                    </button>
                                </div>
                            </form>

                            {/* Info box */}
                            <div className="mt-6 p-4 bg-muted/40 rounded-lg border border-border">
                                <p className="text-sm text-muted-foreground">
                                    <strong>Tips:</strong> Nominal default bisa diedit langsung di form Generate
                                    tanpa menyimpan ke pengaturan.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
