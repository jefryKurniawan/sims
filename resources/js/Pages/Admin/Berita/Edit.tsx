import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { ChevronLeft } from "lucide-react";

interface Kategori {
    id: number;
    nama: string;
}

interface BeritaItem {
    id: number;
    title: string;
    thumbnail: string;
    content: string;
    kategori_id: number;
    is_active: string;
}

interface Props {
    berita: BeritaItem;
    kategori: Kategori[];
}

export default function Edit({ berita, kategori }: Props) {
    const { data, setData, put, processing, errors, reset } = useForm({
        title: berita.title,
        kategori_id: String(berita.kategori_id),
        content: berita.content,
        is_active: berita.is_active,
    });

    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("kategori_id", data.kategori_id);
        formData.append("content", data.content);
        formData.append("is_active", data.is_active);
        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }
        formData.append("_method", "PUT");
        Inertia.post(route("berita-admin.update", berita.id), formData);
    };

    return (
        <>
            <Head title="Edit Berita" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Edit Berita</h1>
                        <p className="text-sm text-gray-500 mt-0.5">ID: {berita.id}</p>
                    </div>
                    <Link
                        href={route("berita-admin.index")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Kembali
                    </Link>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm p-6 max-w-3xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-700">Judul Berita</label>
                            <input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                                placeholder="Judul Berita"
                                required
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <label htmlFor="kategori_id" className="block text-sm font-medium mb-1 text-gray-700">Kategori</label>
                                <select
                                    id="kategori_id"
                                    value={data.kategori_id}
                                    onChange={(e) => setData("kategori_id", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                                    required
                                >
                                    <option value="">Pilih</option>
                                    {kategori.map((k) => (
                                        <option key={k.id} value={k.id}>{k.nama}</option>
                                    ))}
                                </select>
                                {errors.kategori_id && <p className="mt-1 text-sm text-red-600">{errors.kategori_id}</p>}
                            </div>

                            <div>
                                <label htmlFor="thumbnail" className="block text-sm font-medium mb-1 text-gray-700">Thumbnail</label>
                                <input
                                    id="thumbnail"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                                {errors.thumbnail && <p className="mt-1 text-sm text-red-600">{errors.thumbnail}</p>}
                            </div>

                            <div>
                                <label htmlFor="is_active" className="block text-sm font-medium mb-1 text-gray-700">Status</label>
                                <select
                                    id="is_active"
                                    value={data.is_active}
                                    onChange={(e) => setData("is_active", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                                >
                                    <option value="1">Publish</option>
                                    <option value="0">Draft</option>
                                </select>
                                {errors.is_active && <p className="mt-1 text-sm text-red-600">{errors.is_active}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium mb-1 text-gray-700">Konten</label>
                            <textarea
                                id="content"
                                value={data.content}
                                onChange={(e) => setData("content", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                                rows={10}
                                required
                            />
                            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <Link
                                href={route("berita-admin.index")}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-school-red rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? "Menyimpan..." : "Perbarui"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}