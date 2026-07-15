import { Head, usePage, Link, useForm } from "@inertiajs/inertia-react";
import { Inertia as router } from "@inertiajs/inertia";
import AdminLayout from "@/Layout/AdminLayout";

export default function Index() {
    const { data } = usePage();
    const { event } = data;
    const { data: formData, delete: destroy, processing, reset } = useForm({});

    const handleDelete = (id) => {
        if (!window.confirm("Yakin ingin menghapus event ini?")) return;
        delete (route("website.event.destroy", id),
        {
            onSuccess: () => {
                router.visit(route("website.event.index"), {
                    preserveScroll: true,
                    only: ["event"],
                });
            },
        });
    };

    return (
        <AdminLayout
            title="Events"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            Events
                        </h1>
                    </div>
                    <Link
                        href={route("website.event.create")}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                    >
                        Tambah Event
                    </Link>
                </div>
            }
        >
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Slug
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acara
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Lokasi
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Thumbnail
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
                        {event && event.data && event.data.length > 0 ? (
                            event.data.map((e: any) => (
                                <tr key={e.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {e.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {e.slug}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {e.acara}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {e.lokasi}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2">
                                        {e.thumbnail ? (
                                            <img
                                                src={`/storage/images/event/${e.thumbnail}`}
                                                alt={e.title}
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
                                                e.is_Active === "0"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {e.is_Active === "0"
                                                ? "Aktif"
                                                : "Tidak Aktif"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <Link
                                            href={route(
                                                "website.event.edit",
                                                e.id,
                                            )}
                                            className="text-sm text-primary hover:text-primary/80"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(e.id)}
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
                                    colSpan="7"
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    Tidak ada data event
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {event && event.links && (
                <div className="flex flex-wrap items-center justify-between px-4 py-2">
                    <div className="flex items-center flex-1">
                        <span className="text-sm text-gray-500">
                            Menampilkan {event.from} - {event.to} dari{" "}
                            {event.total} data
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {event.prev_page_url && (
                            <a
                                href={event.prev_page_url}
                                className="px-3 py-1 mr-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10"
                            >
                                Prev
                            </a>
                        )}
                        {event.links &&
                            event.links.map((link: any, index: number) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-1 mx-1 text-sm font-medium ${link.active ? "bg-primary/20 text-primary" : "bg-white text-gray-500 hover:bg-primary/10"} rounded-md`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        {event.next_page_url && (
                            <a
                                href={event.next_page_url}
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
