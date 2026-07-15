import { Head, useForm, Link, usePage } from "@inertiajs/inertia-react";
import { ArrowLeft } from "lucide-react";

const TEMA_OPTIONS = [
    { value: "navy", label: "Navy", color: "bg-blue-900" },
    { value: "emerald", label: "Emerald", color: "bg-emerald-600" },
    { value: "amber", label: "Amber", color: "bg-amber-500" },
    { value: "rose", label: "Rose", color: "bg-rose-600" },
    { value: "indigo", label: "Indigo", color: "bg-indigo-600" },
];

export default function KonfigurasiWeb() {
    const { setting } = usePage().props as any;
    const s = setting || {};

    const { data, setData, put, processing, errors } = useForm({
        tema: s.tema || "navy",
        hero_media_type: s.hero_media_type || "foto",
        hero_media_url: s.hero_media_url || "",
        isEmail: s.isEmail ? true : false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("settings.update"));
    };

    return (
        <>
            <Head title="Konfigurasi Web" />
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={route("settings")}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading">
                        Konfigurasi Web
                    </h1>
                </div>

                <div className="bg-white rounded-xl border border-border shadow-sm">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Tema Warna
                            </label>
                            <div className="flex gap-3">
                                {TEMA_OPTIONS.map((t) => (
                                    <button
                                        key={t.value}
                                        type="button"
                                        onClick={() => setData("tema", t.value)}
                                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                                            data.tema === t.value
                                                ? "border-primary ring-2 ring-primary/20"
                                                : "border-transparent hover:border-gray-200"
                                        }`}
                                    >
                                        <div className={`w-8 h-8 rounded-full ${t.color}`} />
                                        <span className="text-xs font-medium text-gray-600">{t.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Hero Media
                            </label>
                            <div className="flex gap-4 mb-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="hero_media_type"
                                        checked={data.hero_media_type === "foto"}
                                        onChange={() => setData("hero_media_type", "foto")}
                                        className="accent-primary"
                                    />
                                    <span className="text-sm text-gray-700">Foto</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="hero_media_type"
                                        checked={data.hero_media_type === "video"}
                                        onChange={() => setData("hero_media_type", "video")}
                                        className="accent-primary"
                                    />
                                    <span className="text-sm text-gray-700">Video</span>
                                </label>
                            </div>
                            <label htmlFor="hero_media_url" className="block text-sm font-medium text-gray-700 mb-1.5">
                                URL {data.hero_media_type === "foto" ? "Gambar" : "Video"} Hero
                            </label>
                            <input
                                type="text"
                                id="hero_media_url"
                                value={data.hero_media_url}
                                onChange={(e) => setData("hero_media_url", e.target.value)}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                placeholder={
                                    data.hero_media_type === "foto"
                                        ? "https://example.com/hero.webp"
                                        : "https://example.com/hero.mp4"
                                }
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                {data.hero_media_type === "foto"
                                    ? "Format: webp/avif, 1920x1080, max 200KB. Hanya satu media aktif."
                                    : "Format: mp4(H.264)/webm, 1920x1080, 5-10 detik, tanpa suara."}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-border">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.isEmail}
                                    onChange={(e) => setData("isEmail", e.target.checked)}
                                    className="w-4 h-4 accent-primary rounded"
                                />
                                <div>
                                    <span className="text-sm font-medium text-gray-700">Aktifkan Notifikasi Email</span>
                                    <p className="text-xs text-gray-400">Kirim notifikasi email untuk event sistem</p>
                                </div>
                            </label>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-border">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm disabled:opacity-50"
                            >
                                {processing ? "Menyimpan..." : "Simpan"}
                            </button>
                            <Link
                                href={route("settings")}
                                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-semibold"
                            >
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
