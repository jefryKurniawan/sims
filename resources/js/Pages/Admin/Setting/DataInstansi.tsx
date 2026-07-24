import { Head, useForm, Link, usePage } from "@inertiajs/inertia-react";
import { ArrowLeft } from "lucide-react";

export default function DataInstansi() {
    const { profileSekolah, setting } = usePage().props as any;
    const p = profileSekolah || {};
    const s = setting || {};

    const { data, setData, put, processing, errors } = useForm({
        nama_sekolah: p.nama_sekolah || s.nama_sekolah || "",
        alamat: p.alamat || "",
        logo_url: p.logo_url || "",
        facebook: p.facebook || "",
        twitter: p.twitter || "",
        instagram: p.instagram || "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("settings.update"));
    };

    return (
        <>
            <Head title="Data Instansi" />
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={route("settings")}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-card-foreground font-heading">
                        Data Instansi
                    </h1>
                </div>

                <div className="bg-card border border-border rounded-xl shadow-sm">
                    <form onSubmit={submit} className="p-6 space-y-5">
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
                            <label htmlFor="alamat" className="block text-sm font-medium text-foreground mb-1.5">
                                Alamat
                            </label>
                            <textarea
                                id="alamat"
                                value={data.alamat}
                                onChange={(e) => setData("alamat", e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                            />
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
                                    className="mt-2 h-16 w-auto object-contain border rounded-lg p-1"
                                />
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="facebook" className="block text-sm font-medium text-foreground mb-1.5">
                                    Facebook
                                </label>
                                <input
                                    type="text"
                                    id="facebook"
                                    value={data.facebook}
                                    onChange={(e) => setData("facebook", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                />
                            </div>
                            <div>
                                <label htmlFor="twitter" className="block text-sm font-medium text-foreground mb-1.5">
                                    Twitter
                                </label>
                                <input
                                    type="text"
                                    id="twitter"
                                    value={data.twitter}
                                    onChange={(e) => setData("twitter", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                />
                            </div>
                            <div>
                                <label htmlFor="instagram" className="block text-sm font-medium text-foreground mb-1.5">
                                    Instagram
                                </label>
                                <input
                                    type="text"
                                    id="instagram"
                                    value={data.instagram}
                                    onChange={(e) => setData("instagram", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                />
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
