import { Head, usePage, Link, useForm } from "@inertiajs/inertia-react";
import { Inertia as router } from "@inertiajs/inertia";
import AdminLayout from "@/Layout/AdminLayout";

export default function Index() {
    const { data } = usePage();
    const { video } = data;
    const { data: formData, delete: destroy, processing, reset } = useForm({});

    const handleDelete = (id) => {
        if (!window.confirm("Yakin ingin menghapus video ini?")) return;
        delete (route("website.video.destroy", id),
        {
            onSuccess: () => {
                router.visit(route("website.video.index"), {
                    preserveScroll: true,
                    only: ["video"],
                });
            },
        });
    };

    return (
        <AdminLayout
            title="Video"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            Video
                        </h1>
                    </div>
                    <Link
                        href={route("website.video.create")}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                    >
                        Tambah Video
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
                                URL
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
                        {video && video.data && video.data.length > 0 ? (
                            video.data.map((v: any) => (
                                <tr key={v.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {v.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {v.desc}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 break-all max-w-[200px]">
                                        {v.url}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span
                                            className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                                v.is_active === "0"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {v.is_active === "0"
                                                ? "Aktif"
                                                : "Tidak Aktif"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <Link
                                            href={route(
                                                "website.video.edit",
                                                v.id,
                                            )}
                                            className="text-sm text-primary hover:text-primary/80"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(v.id)}
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
                                    Tidak ada data video
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {video && video.links && (
                <div className="flex flex-wrap items-center justify-between px-4 py-2">
                    <div className="flex items-center flex-1">
                        <span className="text-sm text-gray-500">
                            Menampilkan {video.from} - {video.to} dari{" "}
                            {video.total} data
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {video.prev_page_url && (
                            <a
                                href={video.prev_page_url}
                                className="px-3 py-1 mr-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10"
                            >
                                Prev
                            </a>
                        )}
                        {video.links &&
                            video.links.map((link: any, index: number) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-1 mx-1 text-sm font-medium ${link.active ? "bg-primary/20 text-primary" : "bg-white text-gray-500 hover:bg-primary/10"} rounded-md`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        {video.next_page_url && (
                            <a
                                href={video.next_page_url}
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
