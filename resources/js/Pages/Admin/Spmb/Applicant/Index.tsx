import { Head, usePage, Link, useForm } from "@inertiajs/inertia-react";
import { useState } from "react";
import AdminLayout from "@/Layout/AdminLayout";
import AdminTable from "@/Components/AdminTable";
import { Edit2, Trash2 } from "lucide-react";

export default function Index() {
    const { data } = usePage().props;
    const { applicants, filters, flash } = data;
    const [search, setSearch] = useState(filters.search || "");
    const [statusFilter, setStatusFilter] = useState(
        filters.status_pendaftaran || "",
    );
    const [jalurFilter, setJalurFilter] = useState(filters.jalur || "");
    const { delete: deleteRequest } = useForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (statusFilter) params.set("status_pendaftaran", statusFilter);
        if (jalurFilter) params.set("jalur", jalurFilter);
        window.location.href = `/dashboard/spmb/applicant?${params.toString()}`;
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Yakin ingin menghapus data pendaftar ini?")) {
            deleteRequest(`/dashboard/spmb/applicant/${id}`);
        }
    };

    const getStatusBadge = (status: string) => {
        const classes: Record<string, string> = {
            draft: "px-2 py-0.5 text-xs font-md rounded-full bg-gray-100 text-gray-700",
            submitted:
                "px-2 py-0.5 text-xs font-md rounded-full bg-blue-100 text-blue-700",
            verifikasi_berkas:
                "px-2 py-0.5 text-xs font-md rounded-full bg-yellow-100 text-yellow-700",
            lulus_seleksi:
                "px-2 py-0.5 text-xs font-md rounded-full bg-green-100 text-green-700",
            diterima:
                "px-2 py-0.5 text-xs font-md rounded-full bg-green-100 text-green-700",
            ditolak:
                "px-2 py-0.5 text-xs font-md rounded-full bg-destructive/10 text-destructive",
        };
        return (
            classes[status] ||
            "px-2 py-0.5 text-xs font-md rounded-full bg-gray-100 text-gray-700"
        );
    };

    return (
        <AdminLayout title="Pendaftar SPMB">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Pendaftar SPMB
                    </h1>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        {flash.success}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="mb-6 bg-white rounded-lg border p-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pencarian
                            </label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Nama, NISN, No. Registrasi..."
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
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
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            >
                                <option value="">Semua Status</option>
                                <option value="draft">Draft</option>
                                <option value="submitted">Submitted</option>
                                <option value="verifikasi_berkas">
                                    Verifikasi Berkas
                                </option>
                                <option value="lulus_seleksi">
                                    Lulus Seleksi
                                </option>
                                <option value="diterima">Diterima</option>
                                <option value="ditolak">Ditolak</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Jalur
                            </label>
                            <select
                                value={jalurFilter}
                                onChange={(e) => setJalurFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            >
                                <option value="">Semua Jalur</option>
                                <option value="reguler">Reguler</option>
                                <option value="afirmasi">Afirmasi</option>
                                <option value="prestasi">Prestasi</option>
                            </select>
                        </div>
                        <div className="flex items-end space-x-2">
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex-1"
                            >
                                Filter
                            </button>
                            <a
                                href="/dashboard/spmb/applicant"
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-primary/20 rounded-lg hover:bg-gray-50"
                            >
                                Reset
                            </a>
                        </div>
                    </div>
                </form>

                <div className="bg-white rounded-lg border overflow-x-auto">
                    <AdminTable
                        data={applicants}
                        columns={[
                            {
                                key: "no_registrasi",
                                label: "No. Registrasi",
                                className: "whitespace-nowrap",
                            },
                            {
                                key: "nama_lengkap",
                                label: "Nama Lengkap",
                            },
                            {
                                key: "jalur",
                                label: "Jalur",
                                render: (value: any) => {
                                    const colors: Record<string, string> = {
                                        reguler: "bg-blue-100 text-blue-800",
                                        afirmasi:
                                            "bg-purple-100 text-purple-800",
                                        prestasi:
                                            "bg-orange-100 text-orange-800",
                                    };
                                    const color =
                                        colors[value] ||
                                        "bg-gray-100 text-gray-800";
                                    return (
                                        <span
                                            className={`px-2 py-0.5 text-xs font-md rounded-full ${color}`}
                                        >
                                            {value}
                                        </span>
                                    );
                                },
                            },
                            {
                                key: "tanggal_lahir",
                                label: "Tgl. Lahir",
                                render: (value: any) => {
                                    return value
                                        ? new Date(value).toLocaleDateString(
                                              "id-ID",
                                          )
                                        : "-";
                                },
                            },
                            {
                                key: "jenis_kelamin",
                                label: "Jenis Kelamin",
                            },
                            {
                                key: "alamat",
                                label: "Alamat",
                                className: "whitespace-nowrap",
                            },
                            {
                                key: "no_telepon",
                                label: "No. Telepon",
                            },
                            {
                                key: "asal_sekolah",
                                label: "Asal Sekolah",
                            },
                            {
                                key: "nilai_raport",
                                label: "Nilai Raport",
                            },
                            {
                                key: "prestasi",
                                label: "Prestasi",
                                className: "whitespace-nowrap",
                            },
                            {
                                key: "status",
                                label: "Status",
                                render: (value: any) => {
                                    return (
                                        <span className={getStatusBadge(value)}>
                                            {value}
                                        </span>
                                    );
                                },
                            },
                            {
                                key: "action",
                                label: "Aksi",
                                className: "whitespace-nowrap text-right",
                                render: (row: any) => (
                                    <div className="flex space-x-2">
                                        <Link
                                            href={`/dashboard/spmb/applicant/${row.id}/edit`}
                                            className="text-sm text-primary hover:text-primary/80"
                                        >
                                            <Edit2 className="w-4 h-4" /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(row.id)}
                                            className="text-sm text-destructive hover:text-destructive/80"
                                        >
                                            <Trash2 className="w-4 h-4" /> Hapus
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        className="min-w-full"
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
