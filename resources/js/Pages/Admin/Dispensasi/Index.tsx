import { Head, Link, usePage, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { X } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";

interface DispensasiItem {
    id: number;
    siswa: { id: number; nama_lengkap: string; nisn: string } | null;
    jenis: "potongan" | "penundaan";
    nominal: number;
    tanggal_mulai: string;
    tanggal_selesai: string | null;
    keterangan: string | null;
}

export default function Index() {
    const { dispensasi, siswa, flash } = usePage().props as {
        dispensasi: any;
        siswa: any[];
        flash: { success?: string; error?: string };
    };

    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const form = useForm({
        siswa_id: "",
        jenis: "potongan",
        nominal: "",
        tanggal_mulai: "",
        tanggal_selesai: "",
        keterangan: "",
    });

    const openAdd = () => {
        setShowForm(true);
        setEditing(false);
        setEditId(null);
        form.reset();
    };

    const openEdit = (d: DispensasiItem) => {
        form.setData("siswa_id", String((d as any).siswa_id));
        form.setData("jenis", d.jenis);
        form.setData("nominal", String(d.nominal));
        form.setData(
            "tanggal_mulai",
            d.tanggal_mulai ? d.tanggal_mulai.split("T")[0] : "",
        );
        form.setData(
            "tanggal_selesai",
            d.tanggal_selesai ? d.tanggal_selesai.split("T")[0] : "",
        );
        form.setData("keterangan", d.keterangan || "");
        setEditId(d.id);
        setEditing(true);
        setShowForm(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing && editId) {
            form.put(route("dispensasi.update", editId));
        } else {
            form.post(route("dispensasi.store"));
        }
        setShowForm(false);
        setEditing(false);
        setEditId(null);
        form.reset();
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route("dispensasi.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const columns: Column[] = [
        {
            key: "siswa",
            label: "Siswa",
            render: (_v: any, row: any) => (
                <div>
                    <span className="font-medium text-gray-900">
                        {row.siswa?.nama_lengkap || "Tidak Diketahui"}
                    </span>
                    <span className="text-xs text-gray-400 ml-1.5">
                        ({row.siswa?.nisn || "-"})
                    </span>
                </div>
            ),
        },
        {
            key: "jenis",
            label: "Jenis",
            render: (v: string) => (
                <span
                    className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${v === "potongan" ? "bg-destructive/10 text-destructive" : "bg-yellow-100 text-yellow-700"}`}
                >
                    {v === "potongan" ? "Potongan" : "Penundaan"}
                </span>
            ),
        },
        {
            key: "nominal",
            label: "Nominal",
            render: (v: any) => `Rp ${parseFloat(v).toLocaleString("id-ID")}`,
        },
        {
            key: "tanggal_mulai",
            label: "Periode",
            render: (_v: any, row: any) => {
                if (!row.tanggal_mulai) return "-";
                const mulai = new Date(row.tanggal_mulai).toLocaleDateString(
                    "id-ID",
                );
                const selesai = row.tanggal_selesai
                    ? new Date(row.tanggal_selesai).toLocaleDateString("id-ID")
                    : "";
                return `${mulai}${selesai ? " - " + selesai : ""}`;
            },
        },
        {
            key: "keterangan",
            label: "Keterangan",
            render: (v: string) => v || "-",
            wrapClass: "max-w-xs",
        },
    ];

    return (
        <>
            <Head title="Dispensasi SPP" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Dispensasi SPP
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Kelola potongan & penundaan pembayaran SPP
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={openAdd}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm"
                    >
                        Dispensasi Baru
                    </button>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 p-4 bg-destructive/10 text-destructive border-destructive/20 rounded-lg text-sm font-medium">
                        {flash.error}
                    </div>
                )}

                <AdminTable
                    columns={columns}
                    rows={dispensasi?.data || []}
                    pagination={{
                        current_page: dispensasi?.current_page,
                        last_page: dispensasi?.last_page,
                        per_page: dispensasi?.per_page,
                        from: dispensasi?.from,
                        to: dispensasi?.to,
                        total: dispensasi?.total,
                        links: dispensasi?.links,
                    }}
                    actions={(row) => [
                        {
                            icon: "eye",
                            onClick: () =>
                                Inertia.visit(route("dispensasi.show", row.id)),
                            label: "Detail",
                        },
                        {
                            icon: "edit",
                            onClick: () =>
                                Inertia.visit(route("dispensasi.edit", row.id)),
                            label: "Edit",
                        },
                        {
                            icon: "delete",
                            onClick: () => setDeleteTarget(row),
                            label: "Hapus",
                        },
                    ]}
                />

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                            <div className="flex items-start justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-900 font-heading">
                                    {editing
                                        ? "Edit Dispensasi"
                                        : "Tambah Dispensasi"}
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        form.reset();
                                    }}
                                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Siswa{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <select
                                        value={form.data.siswa_id}
                                        onChange={(e) =>
                                            form.setData(
                                                "siswa_id",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                    >
                                        <option value="">Pilih Siswa</option>
                                        {siswa.map((s: any) => (
                                            <option key={s.id} value={s.id}>
                                                {s.nama_lengkap} ({s.nisn})
                                            </option>
                                        ))}
                                    </select>
                                    {form.errors.siswa_id && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {form.errors.siswa_id}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Jenis{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <select
                                        value={form.data.jenis}
                                        onChange={(e) =>
                                            form.setData(
                                                "jenis",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                    >
                                        <option value="potongan">
                                            Potongan
                                        </option>
                                        <option value="penundaan">
                                            Penundaan
                                        </option>
                                    </select>
                                    {form.errors.jenis && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {form.errors.jenis}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Nominal (Rp){" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={form.data.nominal}
                                        onChange={(e) =>
                                            form.setData(
                                                "nominal",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                        placeholder="Nominal dispensasi"
                                    />
                                    {form.errors.nominal && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {form.errors.nominal}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Tanggal Mulai{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="date"
                                            value={form.data.tanggal_mulai}
                                            onChange={(e) =>
                                                form.setData(
                                                    "tanggal_mulai",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                        />
                                        {form.errors.tanggal_mulai && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {form.errors.tanggal_mulai}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Tanggal Selesai
                                        </label>
                                        <input
                                            type="date"
                                            value={form.data.tanggal_selesai}
                                            onChange={(e) =>
                                                form.setData(
                                                    "tanggal_selesai",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                        />
                                        {form.errors.tanggal_selesai && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {form.errors.tanggal_selesai}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Keterangan
                                    </label>
                                    <textarea
                                        value={form.data.keterangan}
                                        onChange={(e) =>
                                            form.setData(
                                                "keterangan",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                        rows={3}
                                        placeholder="Keterangan tambahan"
                                    />
                                    {form.errors.keterangan && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {form.errors.keterangan}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowForm(false);
                                            form.reset();
                                        }}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                        disabled={form.processing}
                                    >
                                        {form.processing
                                            ? "Menyimpan..."
                                            : editing
                                              ? "Update"
                                              : "Simpan"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <ConfirmModal
                    open={!!deleteTarget}
                    title="Hapus Dispensasi"
                    message={`Yakin ingin menghapus dispensasi untuk "${deleteTarget?.siswa?.nama_lengkap || "ini"}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            </div>
        </>
    );
}
