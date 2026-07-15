import { Head, usePage, Link, useForm } from "@inertiajs/inertia-react";
import { Inertia as router } from "@inertiajs/inertia";
import AdminLayout from "@/Layout/AdminLayout";

export default function Index() {
    const { data } = usePage();
    const { about } = data;
    const { data: formData, delete: destroy, processing, reset } = useForm({});

    const handleDelete = (id) => {
        if (!window.confirm("Yakin ingin menghapus about ini?")) return;
        delete (route("about.destroy", id),
        {
            onSuccess: () => {
                router.visit(route("about.index"), {
                    preserveScroll: true,
                    only: ["about"],
                });
            },
        });
    };

    return (
        <AdminLayout
            title="About Sekolah"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            About Sekolah
                        </h1>
                    </div>
                    <Link
                        href={route("about.create")}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                    >
                        Tambah About
                    </Link>
                </div>
            }
        >
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Judul
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Deskripsi
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
                        {about && about.data && about.data.length > 0 ? (
                            about.data.map((a: any) => (
                                <tr key={a.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {a.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {a.desc}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2">
                                        {a.image ? (
                                            <img
                                                src={`/storage/images/about/${a.image}`}
                                                alt={a.title}
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
                                                a.is_active === "0"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {a.is_active === "0"
                                                ? "Aktif"
                                                : "Tidak Aktif"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <Link
                                            href={route("about.edit", a.id)}
                                            className="text-sm text-primary hover:text-primary/80"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(a.id)}
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
                                    Tidak ada data about
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {about && about.links && (
                <div className="flex flex-wrap items-center justify-between px-4 py-2">
                    <div className="flex items-center flex-1">
                        <span className="text-sm text-gray-500">
                            Menampilkan {about.from} - {about.to} dari{" "}
                            {about.total} data
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {about.prev_page_url && (
                            <a
                                href={about.prev_page_url}
                                className="px-3 py-1 mr-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10"
                            >
                                Prev
                            </a>
                        )}
                        {about.links?.map((link: any, index: number) => (
                            <a
                                key={index}
                                href={link.url}
                                className={`px-3 py-1 mx-1 text-sm font-medium ${link.active ? "bg-primary/20 text-primary" : "bg-white text-gray-500 hover:bg-primary/10"} rounded-md`}
                            >
                                {link.label}
                            </a>
                        ))}
                        {about.next_page_url && (
                            <a
                                href={about.next_page_url}
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
