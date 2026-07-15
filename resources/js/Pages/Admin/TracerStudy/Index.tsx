import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia as router } from "@inertiajs/inertia";
import { GraduationCap, Briefcase, TrendingUp } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";
import { useState } from "react";

export default function Index() {
    const {
        tracerStudies,
        filters = { status: "", search: "" },
        stats,
    } = usePage().props as any;
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const handleFilter = (key: string, value: string) => {
        const params: Record<string, string> = { ...(filters || {}) };
        if (value) params[key] = value;
        else delete params[key];
        delete params.page;
        router.get(route("admin.tracer-study.index"), params);
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        router.delete(route("admin.tracer-study.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const getStatusBadge = (status: string) => {
        const badges: Record<
            string,
            { bg: string; text: string; label: string }
        > = {
            bekerja: {
                bg: "bg-emerald-100",
                text: "text-emerald-700",
                label: "Bekerja",
            },
            kuliah: {
                bg: "bg-blue-100",
                text: "text-blue-700",
                label: "Kuliah",
            },
            wirausaha: {
                bg: "bg-purple-100",
                text: "text-purple-700",
                label: "Wirausaha",
            },
            tidak_bekerja: {
                bg: "bg-gray-100",
                text: "text-gray-700",
                label: "Tidak Bekerja",
            },
        };
        const b = badges[status] || badges.tidak_bekerja;
        return (
            <span
                className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${b.bg} ${b.text}`}
            >
                {b.label}
            </span>
        );
    };

    const columns: Column[] = [
        {
            key: "nama_lengkap",
            label: "Nama Alumni",
            render: (_v: any, row: any) => (
                <div>
                    <div className="text-sm font-semibold text-gray-900">
                        {row.nama_lengkap || row.alumni?.user?.name || "-"}
                    </div>
                    {row.no_telp && (
                        <div className="text-xs text-gray-500">
                            {row.no_telp}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: "tahun_lulus",
            label: "Tahun Lulus",
            render: (v: any) => v || "-",
        },
        {
            key: "status",
            label: "Status",
            render: (v: string) => getStatusBadge(v),
        },
        {
            key: "instansi",
            label: "Instansi / Pendidikan",
            render: (_v: any, row: any) => (
                <div className="text-sm text-gray-900">
                    {row.jenjang_pendidikan || row.nama_instansi || "-"}
                </div>
            ),
        },
        {
            key: "bidang_studi",
            label: "Bidang Studi",
            render: (v: any) => v || "-",
        },
    ];

    return (
        <>
            <Head title="Tracer Study Alumni" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Tracer Study Alumni
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Data perkembangan alumni setelah lulus
                        </p>
                    </div>
                    <Link
                        href={route("admin.tracer-study.create")}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm"
                    >
                        Tracer Study Baru
                    </Link>
                </div>

                {stats && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Total
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stats.total}
                                    </p>
                                </div>
                                <div className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5 text-gray-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Bekerja
                                    </p>
                                    <p className="text-2xl font-bold text-emerald-600">
                                        {stats.bekerja}
                                    </p>
                                </div>
                                <div className="w-11 h-11 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <Briefcase className="w-5 h-5 text-emerald-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Kuliah
                                    </p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {stats.kuliah}
                                    </p>
                                </div>
                                <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Wirausaha
                                    </p>
                                    <p className="text-2xl font-bold text-purple-600">
                                        {stats.wirausaha}
                                    </p>
                                </div>
                                <div className="w-11 h-11 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-purple-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Belum Bekerja
                                    </p>
                                    <p className="text-2xl font-bold text-gray-500">
                                        {stats.tidak_bekerja}
                                    </p>
                                </div>
                                <div className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Briefcase className="w-5 h-5 text-gray-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cari
                            </label>
                            <input
                                type="text"
                                placeholder="Nama atau instansi..."
                                defaultValue={filters.search}
                                onBlur={(e) =>
                                    handleFilter("search", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) =>
                                    handleFilter("status", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                            >
                                <option value="">Semua</option>
                                <option value="bekerja">Bekerja</option>
                                <option value="kuliah">Kuliah</option>
                                <option value="wirausaha">Wirausaha</option>
                                <option value="tidak_bekerja">
                                    Tidak Bekerja
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <AdminTable
                    columns={columns}
                    rows={tracerStudies?.data || []}
                    pagination={{
                        current_page: tracerStudies?.current_page,
                        last_page: tracerStudies?.last_page,
                        per_page: tracerStudies?.per_page,
                        from: tracerStudies?.from,
                        to: tracerStudies?.to,
                        total: tracerStudies?.total,
                        links: tracerStudies?.links,
                    }}
                    actions={(row) => [
                        {
                            icon: "eye",
                            onClick: () =>
                                router.visit(
                                    route("admin.tracer-study.show", row.id),
                                ),
                            label: "Detail",
                        },
                        {
                            icon: "edit",
                            onClick: () =>
                                router.visit(
                                    route("admin.tracer-study.edit", row.id),
                                ),
                            label: "Edit",
                        },
                        {
                            icon: "delete",
                            onClick: () => setDeleteTarget(row),
                            label: "Hapus",
                        },
                    ]}
                />

                <ConfirmModal
                    open={!!deleteTarget}
                    title="Hapus Tracer Study"
                    message={`Yakin ingin menghapus data tracer study "${deleteTarget?.nama_lengkap || ""}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            </div>
        </>
    );
}
