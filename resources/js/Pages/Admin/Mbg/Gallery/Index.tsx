import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Plus, Image } from "lucide-react";

export default function Index() {
    const { galleries } = usePage().props as any;

    const kategoriColor = (v: string) => {
        const m: any = { serah_terima: "bg-blue-100 text-blue-700", uji_kelayakan: "bg-emerald-100 text-emerald-700",
            suasana_makan: "bg-amber-100 text-amber-700", dokumentasi: "bg-muted text-muted-foreground" };
        return m[v] || "bg-muted text-muted-foreground";
    };

    return (<>
        <Head title="Galeri MBG" />
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Galeri Dokumentasi MBG</h1>
                <Link href={route("mbg.galleries.create")}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm">
                    <Plus className="w-4 h-4" /> Tambah
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleries?.data?.map((g: any) => (
                    <div key={g.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow transition">
                        <div className="h-40 bg-accent flex items-center justify-center">
                            {g.file_path?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                <img src={g.file_path} alt={g.judul} className="w-full h-full object-cover" />
                            ) : (
                                <Image className="w-8 h-8 text-muted-foreground" />
                            )}
                        </div>
                        <div className="p-3">
                            <p className="font-medium text-sm truncate">{g.judul}</p>
                            <span className={`inline-block px-2 py-0.5 rounded text-xs mt-1 ${kategoriColor(g.kategori)}`}>{g.kategori}</span>
                            <p className="text-xs text-muted-foreground mt-1">{g.tanggal_kegiatan}</p>
                        </div>
                    </div>
                ))}
            </div>

            {(!galleries?.data || galleries.data.length === 0) && (
                <div className="text-center py-12 text-muted-foreground">
                    <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Belum ada dokumentasi. Tambahkan foto kegiatan MBG.</p>
                </div>
            )}
        </div>
    </>);
}
