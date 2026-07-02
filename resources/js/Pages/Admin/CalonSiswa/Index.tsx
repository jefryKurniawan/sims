import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Edit, Trash, Plus } from "lucide-react";

export default function Index({ calonSiswa, filters = {} }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const [statusFilter, setStatusFilter] = useState(filters.status || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.get(
            "/dashboard/ppdb",
            {
                search: search || undefined,
                status: statusFilter || undefined,
            },
            { preserveState: true },
        );
    };

    const handleDelete = (id) => {
        if (
            window.confirm(
                "Apakah Anda yakin ingin menghapus data calon siswa ini?",
            )
        ) {
            fetch(`/dashboard/ppdb/${id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN":
                        document.querySelector('meta[name="csrf-token"]')
                            ?.content || "",
                    Accept: "application/json",
                },
            }).then(() => {
                window.location.reload();
            });
        }
    };

    // Keep optional accept/reject handlers in case needed elsewhere (not used in UI)
    const handleAccept = (id) => {
        if (
            window.confirm("Terima calon siswa ini dan konversi menjadi siswa?")
        ) {
            fetch(`/dashboard/ppdb/${id}/accept`, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN":
                        document.querySelector('meta[name="csrf-token"]')
                            ?.content || "",
                    Accept: "application/json",
                },
            }).then(() => {
                window.location.reload();
            });
        }
    };

    const handleReject = (id) => {
        if (window.confirm("Tolak calon siswa ini?")) {
            fetch(`/dashboard/ppdb/${id}/reject`, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN":
                        document.querySelector('meta[name="csrf-token"]')
                            ?.content || "",
                    Accept: "application/json",
                },
            }).then(() => {
                window.location.reload();
            });
        }
    };

    return (
        <>
            <Head title="SPMB - Calon Siswa" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        SPMB - Calon Siswa
                    </h1>
                    <Link
                        href={route("ppdb.create")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-school-red text-white rounded-md hover:bg-red-700 transition text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        Calon Siswa Baru
                    </Link>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        {flash.success}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="mb-6 bg-white border border-default p-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pencarian
                            </label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Nama, NISN, atau No HP..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Semua Status</option>
                                <option value="pendaftaran">Pendaftaran</option>
                                <option value="seleksi">Seleksi</option>
                                <option value="lulus">Lulus</option>
                                <option value="tidak_lulus">Tidak Lulus</option>
                            </select>
                        </div>
                        <div className="flex items-end space-x-2">
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex-1"
                            >
                                Filter
                            </button>
                            <Link
                                href={route("ppdb.index")}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Reset
                            </Link>
                        </div>
                    </div>
                </form>

                <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                    <table className="w-full text-sm text-left rtl:text-right text-body">
                        <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-medium text-left whitespace-nowrap"
                                >
                                    No
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-medium text-left whitespace-nowrap"
                                >
                                    NISN
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-medium text-left whitespace-nowrap"
                                >
                                    Nama Lengkap
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-medium text-left whitespace-nowrap"
                                >
                                    Asal Sekolah
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-medium text-left whitespace-nowrap"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-medium text-left whitespace-nowrap"
                                >
                                    Keputusan
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-medium text-left whitespace-nowrap"
                                >
                                    Tanggal Daftar
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-medium text-left whitespace-nowrap"
                                >
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {calonSiswa.data.length > 0 ? (
                                calonSiswa.data.map((cs, index) => (
                                    <tr key={cs.id} className="">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {(calonSiswa.current_page - 1) *
                                                calonSiswa.per_page +
                                                index +
                                                1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {cs.nisn}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="font-medium">
                                                {cs.nama_lengkap}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {cs.no_hp}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {cs.asal_sekolah}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <span
                                                className={`px-2 py-1 text-xs font-medium rounded-full ${cs.status === "pendaftaran" ? "bg-yellow-100 text-yellow-700" : cs.status === "seleksi" ? "bg-blue-100 text-blue-700" : cs.status === "lulus" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} `}
                                            >
                                                {cs.status === "pendaftaran"
                                                    ? "Pendaftaran"
                                                    : cs.status === "seleksi"
                                                      ? "Seleksi"
                                                      : cs.status === "lulus"
                                                        ? "Lulus"
                                                        : "Tidak Lulus"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <span
                                                className={`px-2 py-1 text-xs font-medium rounded-full ${cs.keputusan === "belum" ? "bg-gray-100 text-gray-700" : cs.keputusan === "diterima" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} `}
                                            >
                                                {cs.keputusan === "belum"
                                                    ? "Belum"
                                                    : cs.keputusan ===
                                                        "diterima"
                                                      ? "Diterima"
                                                      : "Ditolak"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {cs.tanggal_daftar?.format(
                                                "d M Y",
                                            ) ?? "-"}
                                        </td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                            <Link
                                                href={route("ppdb.edit", cs.id)}
                                                className="mr-3"
                                            >
                                                <Edit className="h-5 w-5 text-blue-600 hover:text-blue-700" />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (
                                                        window.confirm(
                                                            "Yakin ingin menghapus data calon siswa ini?",
                                                        )
                                                    ) {
                                                        fetch(
                                                            `/dashboard/ppdb/${cs.id}`,
                                                            {
                                                                method: "DELETE",
                                                                headers: {
                                                                    "X-CSRF-TOKEN":
                                                                        document.querySelector(
                                                                            'meta[name="csrf-token"]',
                                                                        )
                                                                            ?.content ||
                                                                        "",
                                                                    Accept: "application/json",
                                                                },
                                                            },
                                                        ).then(() => {
                                                            window.location.reload();
                                                        });
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="px-6 py-4 text-center text-gray-500"
                                    >
                                        Tidak ada data calon siswa
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {calonSiswa.data.length > 0 && (
                        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                            <div>
                                Menampilkan {calonSiswa.from} - {calonSiswa.to}{" "}
                                dari {calonSiswa.total} data
                            </div>
                            <div className="flex space-x-2">
                                {calonSiswa.prev_page_url && (
                                    <Link
                                        href={calonSiswa.prev_page_url}
                                        className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                                    >
                                        Prev
                                    </Link>
                                )}
                                <Link
                                    href={route("ppdb.index", {
                                        _query: { ...filters, page: 1 },
                                    })}
                                    className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                                >
                                    1
                                </Link>
                                {calonSiswa.next_page_url && (
                                    <Link
                                        href={calonSiswa.next_page_url}
                                        className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

