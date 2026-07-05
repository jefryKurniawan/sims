import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus, Upload, X } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";
import ImportModal from "@/Components/ImportModal";

const KATEGORI_OPTIONS = [
    { value: "ruangan", label: "Ruangan" },
    { value: "laboratorium", label: "Laboratorium" },
    { value: "perpustakaan", label: "Perpustakaan" },
    { value: "olahraga", label: "Olahraga" },
    { value: "ibadah", label: "Ibadah" },
    { value: "sanitasi", label: "Sanitasi" },
    { value: "teknologi", label: "Teknologi" },
    { value: "lainnya", label: "Lainnya" },
];

const KONDISI_OPTIONS = [
    { value: "baik", label: "Baik" },
    { value: "rusak_ringan", label: "Rusak Ringan" },
    { value: "rusak_berat", label: "Rusak Berat" },
];

export default function Index() {
    const { sarana, flash } = usePage().props;
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<any>(null);
    const [showImport, setShowImport] = useState(false);
    const form = useForm({
        nama: "",
        kategori: "ruangan",
        deskripsi: "",
        lokasi: "",
        kapasitas: "",
        kondisi: "baik",
        foto: "",
        tahun_pengadaan: "",
        sumber_dana: "",
    });

    const openAdd = () => {
        setShowForm(true);
        setEditing(false);
        setEditId(null);
        form.reset();
    };

    const openEdit = (s: any) => {
        form.setData("nama", s.nama);
        form.setData("kategori", s.kategori);
        form.setData("deskripsi", s.deskripsi || "");
        form.setData("lokasi", s.lokasi || "");
        form.setData("kapasitas", s.kapasitas ? String(s.kapasitas) : "");
        form.setData("kondisi", s.kondisi);
        form.setData("foto", s.foto || "");
        form.setData(
            "tahun_pengadaan",
            s.tahun_pengadaan ? String(s.tahun_pengadaan) : "",
        );
        form.setData("sumber_dana", s.sumber_dana || "");
        setEditId(s.id);
        setEditing(true);
        setShowForm(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing && editId) form.put(route("sarana.update", editId));
        else form.post(route("sarana.store"));
        setShowForm(false);
        setEditing(false);
        setEditId(null);
        form.reset();
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route("sarana.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const columns: Column[] = [
        { key: "nama", label: "Nama" },
        {
            key: "kategori",
            label: "Kategori",
            render: (v: string) => {
                const opt = KATEGORI_OPTIONS.find((o) => o.value === v);
                return (
                    <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                        {opt?.label || v}
                    </span>
                );
            },
        },
        { key: "lokasi", label: "Lokasi", render: (v: string) => v || "-" },
        {
            key: "kondisi",
            label: "Kondisi",
            render: (v: string) => {
                const colors: Record<string, string> = {
                    baik: "bg-emerald-100 text-emerald-700",
                    rusak_ringan: "bg-yellow-100 text-yellow-700",
                    rusak_berat: "bg-red-100 text-red-700",
                };
                const labels: Record<string, string> = {
                    baik: "Baik",
                    rusak_ringan: "Rusak Ringan",
                    rusak_berat: "Rusak Berat",
                };
                return (
                    <span
                        className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${colors[v] || "bg-gray-100 text-gray-700"}`}
                    >
                        {labels[v] || v}
                    </span>
                );
            },
        },
        {
            key: "kapasitas",
            label: "Kapasitas",
            render: (v: any) => (v ? `${v} orang` : "-"),
        },
        {
            key: "tahun_pengadaan",
            label: "Tahun",
            render: (v: any) => v || "-",
        },
    ];

    return (
        <>
            <Head title="Sarana & Prasarana" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Sarana & Prasarana
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Kelola fasilitas & infrastruktur sekolah
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={openAdd}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-school-red text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold shadow-sm"
                        >
                            Sarana Baru
                        </button>
                        <button
                            onClick={() => setShowImport(true)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-semibold shadow-sm"
                        >
                            <Upload className="w-4 h-4" />
                            Import
                        </button>
                    </div>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium">
                        {flash.error}
                    </div>
                )}

                <AdminTable
                    columns={columns}
                    rows={sarana?.data || []}
                    pagination={{
                        current_page: sarana?.current_page,
                        last_page: sarana?.last_page,
                        per_page: sarana?.per_page,
                        from: sarana?.from,
                        to: sarana?.to,
                        total: sarana?.total,
                        links: sarana?.links,
                    }}
                    actions={(row) => [
                        {
                            icon: "eye",
                            onClick: () =>
                                Inertia.visit(route("sarana.show", row.id)),
                            label: "Detail",
                        },
                        {
                            icon: "edit",
                            onClick: () => openEdit(row),
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
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="relative bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto mx-4">
                            <div className="flex items-center justify-between px-6 pt-6 pb-4">
                                <h2 className="text-xl font-bold text-gray-900 font-heading">
                                    {editing ? "Edit Sarana" : "Tambah Sarana"}
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowForm(false);
                                        form.reset();
                                    }}
                                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="px-6 pb-6 space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">
                                        Nama
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.nama}
                                        onChange={(e) =>
                                            form.setData("nama", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm"
                                        placeholder="Lab Komputer 1"
                                    />
                                    {form.errors.nama && (
                                        <span className="text-red-600 text-xs">
                                            {form.errors.nama}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">
                                        Kategori
                                    </label>
                                    <select
                                        value={form.data.kategori}
                                        onChange={(e) =>
                                            form.setData(
                                                "kategori",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm"
                                    >
                                        {KATEGORI_OPTIONS.map((o) => (
                                            <option
                                                key={o.value}
                                                value={o.value}
                                            >
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        value={form.data.deskripsi}
                                        onChange={(e) =>
                                            form.setData(
                                                "deskripsi",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm"
                                        rows={3}
                                        placeholder="Deskripsi singkat"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">
                                            Lokasi
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.lokasi}
                                            onChange={(e) =>
                                                form.setData(
                                                    "lokasi",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm"
                                            placeholder="Lantai 2, Gedung A"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">
                                            Kapasitas
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={form.data.kapasitas}
                                            onChange={(e) =>
                                                form.setData(
                                                    "kapasitas",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm"
                                            placeholder="30"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">
                                        Kondisi
                                    </label>
                                    <select
                                        value={form.data.kondisi}
                                        onChange={(e) =>
                                            form.setData(
                                                "kondisi",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm"
                                    >
                                        {KONDISI_OPTIONS.map((o) => (
                                            <option
                                                key={o.value}
                                                value={o.value}
                                            >
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">
                                            Tahun Pengadaan
                                        </label>
                                        <input
                                            type="number"
                                            min="1900"
                                            max="2100"
                                            value={form.data.tahun_pengadaan}
                                            onChange={(e) =>
                                                form.setData(
                                                    "tahun_pengadaan",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm"
                                            placeholder="2020"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">
                                            Sumber Dana
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.sumber_dana}
                                            onChange={(e) =>
                                                form.setData(
                                                    "sumber_dana",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm"
                                            placeholder="BOS / Komite"
                                        />
                                    </div>
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
                                        className="px-4 py-2 text-sm font-medium text-white bg-school-red rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
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
                    title="Hapus Sarana"
                    message={`Yakin ingin menghapus "${deleteTarget?.nama}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />

                <ImportModal
                    open={showImport}
                    onClose={() => setShowImport(false)}
                    title="Import Sarana & Prasarana"
                    templateRouteXlsx={route("sarana.template") + "?format=xlsx"}
                    templateRouteCsv={route("sarana.template") + "?format=csv"}
                    importRoute={route("sarana.import")}
                />
            </div>
        </>
    );
}

