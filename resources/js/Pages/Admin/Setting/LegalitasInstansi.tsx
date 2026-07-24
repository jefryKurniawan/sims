import { Head, useForm, Link, usePage } from "@inertiajs/inertia-react";
import { ArrowLeft } from "lucide-react";

export default function LegalitasInstansi() {
    const { setting, profileSekolah } = usePage().props as any;
    const s = setting || {};
    const p = profileSekolah || {};

    const { data, setData, put, processing, errors } = useForm({
        nama_sekolah: p.nama_sekolah || "",
        logo_url: p.logo_url || "",
        npsn: s.npsn || "",
        akreditasi: s.akreditasi || "",
        nama_kepala_sekolah: s.nama_kepala_sekolah || "",
        nip_kepala_sekolah: s.nip_kepala_sekolah || "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("settings.update"));
    };

    return (
        <>
            <Head title="Legalitas Instansi" />
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={route("settings")}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-card-foreground font-heading">
                        Legalitas Instansi
                    </h1>
                </div>

                <div className="bg-card border border-border rounded-xl shadow-sm">
                    <form onSubmit={submit} className="p-6 space-y-5">
                        {/* Nama Sekolah & Logo */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="nama_sekolah" className="block text-sm font-medium text-foreground mb-1.5">
                                    Nama Sekolah <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="nama_sekolah"
                                    value={data.nama_sekolah}
                                    onChange={(e) => setData("nama_sekolah", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                />
                                {errors.nama_sekolah && (
                                    <p className="text-sm text-destructive mt-1">{errors.nama_sekolah}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="logo_url" className="block text-sm font-medium text-foreground mb-1.5">
                                    URL Logo
                                </label>
                                <input
                                    type="text"
                                    id="logo_url"
                                    value={data.logo_url}
                                    onChange={(e) => setData("logo_url", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                    placeholder="https://example.com/logo.png"
                                />
                                {data.logo_url && (
                                    <img
                                        src={data.logo_url}
                                        alt="Preview"
                                        className="mt-2 h-10 w-auto object-contain border border-border rounded-lg p-0.5"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="npsn" className="block text-sm font-medium text-foreground mb-1.5">
                                    NPSN <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="npsn"
                                    value={data.npsn}
                                    onChange={(e) => setData("npsn", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                />
                                {errors.npsn && (
                                    <p className="text-sm text-destructive mt-1">{errors.npsn}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="akreditasi" className="block text-sm font-medium text-foreground mb-1.5">
                                    Akreditasi <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="akreditasi"
                                    value={data.akreditasi}
                                    onChange={(e) => setData("akreditasi", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                    placeholder="A / B / C"
                                />
                                {errors.akreditasi && (
                                    <p className="text-sm text-destructive mt-1">{errors.akreditasi}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="nama_kepala_sekolah" className="block text-sm font-medium text-foreground mb-1.5">
                                    Nama Kepala Sekolah <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="nama_kepala_sekolah"
                                    value={data.nama_kepala_sekolah}
                                    onChange={(e) => setData("nama_kepala_sekolah", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                />
                                {errors.nama_kepala_sekolah && (
                                    <p className="text-sm text-destructive mt-1">{errors.nama_kepala_sekolah}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="nip_kepala_sekolah" className="block text-sm font-medium text-foreground mb-1.5">
                                    NIP Kepala Sekolah <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="nip_kepala_sekolah"
                                    value={data.nip_kepala_sekolah}
                                    onChange={(e) => setData("nip_kepala_sekolah", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                />
                                {errors.nip_kepala_sekolah && (
                                    <p className="text-sm text-destructive mt-1">{errors.nip_kepala_sekolah}</p>
                                )}
                            </div>
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
                                className="px-5 py-2.5 border border-border rounded-lg text-sm hover:bg-accent"
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
