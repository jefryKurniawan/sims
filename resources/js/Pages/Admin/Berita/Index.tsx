import { Head, Link, usePage } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

interface Kategori {
    id: number;
    nama: string;
}

interface BeritaItem {
    id: number;
    title: string;
    thumbnail: string;
    kategori: Kategori;
    is_active: string;
    created_at: string;
}

interface Props {
    berita: {
        data: BeritaItem[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    kategori: Kategori[];
    filters: { search?: string };
}

export default function Index({ berita, kategori, filters }: Props) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.get(
            route("berita-admin.index"),
            { search },
            { preserveState: true, replace: true },
        );
    };

    const handleDelete = (id: number) => {
        if (confirm("Apakah anda yakin ingin menghapus berita ini?")) {
            Inertia.delete(route("berita-admin.destroy", id));
        }
    };

    return (
        <>
            <Head title="Berita" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Berita</h1>
                    <Link
                        href={route("berita-admin.create")}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Tambah Berita
                    </Link>
                </div>

                {flash.message && (
                    <div
                        className={`p-4 mb-4 rounded-lg text-sm font-medium ${
                            flash.type === "success"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {flash.message}
                    </div>
                )}

                {kategori.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 bg-white rounded-lg border">
                        <h3 className="text-lg font-semibold">
                            Kategori Masih Kosong!
                        </h3>
                        <p className="mt-2">
                            Silakan tambah kategori berita terlebih dahulu.
                        </p>
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari berita..."
                                    className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700"
                                >
                                    Cari
                                </button>
                            </div>
                        </form>

                        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                            <table className="w-full text-sm text-left rtl:text-right text-body">
                                <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">
                                            No
                                        </th>
                                        <th className="px-6 py-3 font-medium">
                                            Title
                                        </th>
                                        <th className="px-6 py-3 font-medium">
                                            Thumbnail
                                        </th>
                                        <th className="px-6 py-3 font-medium">
                                            Kategori
                                        </th>
                                        <th className="px-6 py-3 font-medium">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 font-medium">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {berita.data.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4">
                                                {berita.from + index}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.title}
                                            </td>
                                            <td className="px-6 py-4">
                                                <img
                                                    src={`/storage/images/berita/${item.thumbnail}`}
                                                    alt={item.title}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.kategori?.nama}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                        item.is_active === "0"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                                >
                                                    {item.is_active === "0"
                                                        ? "Publish"
                                                        : "Draft"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={route(
                                                            "berita-admin.edit",
                                                            item.id,
                                                        )}
                                                        className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id,
                                                            )
                                                        }
                                                        className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination data={berita} />
                    </>
                )}
            </div>
        </>
    );
}
