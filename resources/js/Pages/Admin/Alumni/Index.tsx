import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { Plus } from "lucide-react";

interface User {
    id: number;
    name: string;
    email: string;
}

interface AlumniItem {
    id: number;
    user_id: number;
    user: User;
    tahun_lulus: number;
    pekerjaan: string;
    alamat: string;
    no_telp: string;
    linkedin: string | null;
}

interface Props {
    alumni: AlumniItem[];
}

export default function Index({ alumni }: Props) {
    const { flash } = usePage().props;

    const handleDelete = (id: number) => {
        if (confirm("Apakah anda yakin ingin menghapus alumni ini?")) {
            Inertia.delete(route("alumni.destroy", id));
        }
    };

    return (
        <>
            <Head title="Alumni" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Alumni</h1>
                    <Link
                        href={route("alumni.create")}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-school-red rounded-lg hover:bg-red-700 transition"
                    >
                        <Plus className="w-4 h-4" />
                        Alumni Baru
                    </Link>
                </div>

                {flash.success && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        {flash.success}
                    </div>
                )}

                <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                    <table className="w-full text-sm text-left rtl:text-right text-body">
                        <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                            <tr>
                                <th className="px-6 py-3 font-medium">No</th>
                                <th className="px-6 py-3 font-medium">Nama</th>
                                <th className="px-6 py-3 font-medium">
                                    Tahun Lulus
                                </th>
                                <th className="px-6 py-3 font-medium">
                                    Pekerjaan
                                </th>
                                <th className="px-6 py-3 font-medium">
                                    No. Telp
                                </th>
                                <th className="px-6 py-3 font-medium">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {alumni.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        {item.user?.name || "Tidak Diketahui"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.tahun_lulus}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.pekerjaan}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.no_telp}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Link
                                                href={route(
                                                    "alumni.edit",
                                                    item.id,
                                                )}
                                                className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {alumni.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-8 text-center text-sm text-gray-500"
                                    >
                                        Tidak ada data alumni
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
