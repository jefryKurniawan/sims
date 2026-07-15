import { Head, usePage, Link, useForm } from "@inertiajs/inertia-react";
import { Inertia as router } from "@inertiajs/inertia";
import AdminLayout from "@/Layout/AdminLayout";

export default function Index() {
    const { data } = usePage();
    const { kegiatan } = data;
    const { data: formData, delete: destroy, processing, reset } = useForm({});

    const handleDelete = (id) => {
        if (!window.confirm("Yakin ingin menghapus kegiatan ini?")) return;
        delete (route("website.kegiatan.destroy", id),
        {
            onSuccess: () => {
                router.visit(route("website.kegiatan.index"), {
                    preserveScroll: true,
                    only: ["kegiatan"],
                });
            },
        });
    };

    return (
        <AdminLayout
            title="Kegiatan"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            Kegiatan
                        </h1>
                    </div>
                    <Link
                        href={route("website.kegiatan.create")}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                    >
                        Tambah Kegiatan
                    </Link>
                </div>
            }
        >
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nama
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Slug
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Gambar
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {kegiatan &&
                        kegiatan.data &&
                        kegiatan.data.length > 0 ? (
                            kegiatan.data.map((k: any) => (
                                <tr key={k.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {k.nama}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {k.slug}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2">
                                        {k.image ? (
                                            <img
                                                src={`/storage/images/kegiatan/${k.image}`}
                                                alt={k.nama}
                                                className="h-8 w-8 rounded border"
                                            />
                                        ) : (
                                            <span className="text-xs text-gray-400">
                                                -
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span
                                            className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                                k.is_active === "0"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {k.is_active === "0"
                                                ? "Aktif"
                                                : "Tidak Aktif"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <Link
                                            href={route(
                                                "website.kegiatan.edit",
                                                k.id,
                                            )}
                                            className="text-sm text-primary hover:text-primary/80"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(k.id)}
                                            className="text-sm text-destructive hover:text-destructive/80"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    Tidak ada data kegiatan
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {kegiatan && kegiatan.links && (
                <div className="flex flex-wrap items-center justify-between px-4 py-2">
                    <div className="flex items-center flex-1">
                        <span className="text-sm text-gray-500">
                            Menampilkan {kegiatan.from} - {kegiatan.to} dari{" "}
                            {kegiatan.total} data
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {kegiatan.prev_page_url && (
                            <a
                                href={kegiatan.prev_page_url}
                                className="px-3 py-1 mr-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10"
                            >
                                Prev
                            </a>
                        )}
                        {kegiatan.links?.map((link: any, index: number) => (
                            <a
                                key={index}
                                href={link.url}
                                className={`px-3 py-1 mx-1 text-sm font-medium ${link.active ? "bg-primary/20 text-primary" : "bg-white text-gray-500 hover:bg-primary/10"} rounded-md`}
                            >
                                {link.label}
                            </a>
                        ))}
                        {kegiatan.next_page_url && (
                            <a
                                href={kegiatan.next_page_url}
                                className="px-3 py-1 ml-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10"
                            >
                                Next
                            </a>
                        )}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
