import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";

const HARI_OPTIONS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const SEMESTER_OPTIONS = [
    { value: "Ganjil", label: "Ganjil" },
    { value: "Genap", label: "Genap" },
];

const empty = {
    nama_mapel: "",
    hari: "Senin",
    jam_ke: "1",
    jam_mulai: "07:00",
    jam_selesai: "07:45",
    kelas_id: "",
    guru_id: "",
    ruangan: "",
    semester: "Ganjil",
    tahun_ajaran: "",
};

export default function Index() {
    const { jadwal, kelas, guru, mapelOptions, flash } = usePage().props as any;
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const form = useForm({ ...empty });

    const openAdd = () => {
        form.setData({ ...empty });
        setEditing(false);
        setEditId(null);
        setShowForm(true);
    };

    const openEdit = (j: any) => {
        form.setData({
            nama_mapel: j.nama_mapel,
            hari: j.hari,
            jam_ke: String(j.jam_ke),
            jam_mulai: j.jam_mulai?.slice(0, 5) || "07:00",
            jam_selesai: j.jam_selesai?.slice(0, 5) || "07:45",
            kelas_id: String(j.kelas_id),
            guru_id: j.guru_id ? String(j.guru_id) : "",
            ruangan: j.ruangan || "",
            semester: j.semester,
            tahun_ajaran: j.tahun_ajaran,
        });
        setEditId(j.id);
        setEditing(true);
        setShowForm(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing && editId) form.put(route("jadwal.update", editId));
        else form.post(route("jadwal.store"));
        setShowForm(false);
        setEditing(false);
        setEditId(null);
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route("jadwal.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const columns: Column[] = [
        {
            key: "hari",
            label: "Hari",
            render: (v: string) => (
                <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                    {v}
                </span>
            ),
        },
        { key: "jam_ke", label: "Jam ke-" },
        {
            key: "jam_mulai",
            label: "Waktu",
            render: (_v: any, row: any) =>
                `${row.jam_mulai?.slice(0, 5) || "-"} - ${row.jam_selesai?.slice(0, 5) || "-"}`,
        },
        { key: "nama_mapel", label: "Mata Pelajaran" },
        {
            key: "kelas",
            label: "Kelas",
            render: (_v: any, row: any) => row.kelas?.nama_kelas || "-",
        },
        {
            key: "guru",
            label: "Guru",
            render: (_v: any, row: any) => row.guru?.nama_lengkap || "-",
        },
        { key: "ruangan", label: "Ruangan", render: (v: string) => v || "-" },
    ];

    return (
        <>
            <Head title="Jadwal Pelajaran" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Jadwal Pelajaran
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Atur jadwal mingguan & penugasan guru
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={openAdd}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Jadwal Baru
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
                    rows={jadwal?.data || []}
                    pagination={{
                        current_page: jadwal?.current_page,
                        last_page: jadwal?.last_page,
                        per_page: jadwal?.per_page,
                        from: jadwal?.from,
                        to: jadwal?.to,
                        total: jadwal?.total,
                        links: jadwal?.links,
                    }}
                    actions={(row) => [
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

                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="relative bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto mx-4">
                            <div className="flex items-center justify-between px-6 pt-6 pb-4">
                                <h2 className="text-xl font-bold text-gray-900 font-heading">
                                    {editing ? "Edit Jadwal" : "Tambah Jadwal"}
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
                            <form
                                onSubmit={handleSubmit}
                                className="px-6 pb-6 space-y-4"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="f_nama_mapel" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Mata Pelajaran <span className="text-destructive">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="f_nama_mapel"
                                            list="mapel-list"
                                            value={form.data.nama_mapel}
                                            onChange={(e) =>
                                                form.setData("nama_mapel", e.target.value)
                                            }
                                            className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                            placeholder="Matematika"
                                        />
                                        <datalist id="mapel-list">
                                            {mapelOptions?.map((m: string) => (
                                                <option key={m} value={m} />
                                            ))}
                                        </datalist>
                                        {form.errors.nama_mapel && (
                                            <span className="text-destructive text-xs">
                                                {form.errors.nama_mapel}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="f_kelas_id" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Kelas <span className="text-destructive">*</span>
                                        </label>
                                        <select
                                            id="f_kelas_id"
                                            value={form.data.kelas_id}
                                            onChange={(e) =>
                                                form.setData("kelas_id", e.target.value)
                                            }
                                            className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                        >
                                            <option value="">Pilih Kelas</option>
                                            {kelas?.map((k: any) => (
                                                <option key={k.id} value={k.id}>
                                                    {k.nama_kelas} ({k.tingkat})
                                                </option>
                                            ))}
                                        </select>
                                        {form.errors.kelas_id && (
                                            <span className="text-destructive text-xs">
                                                {form.errors.kelas_id}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label htmlFor="f_hari" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Hari <span className="text-destructive">*</span>
                                        </label>
                                        <select
                                            id="f_hari"
                                            value={form.data.hari}
                                            onChange={(e) =>
                                                form.setData("hari", e.target.value)
                                            }
                                            className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                        >
                                            {HARI_OPTIONS.map((h) => (
                                                <option key={h} value={h}>{h}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="f_jam_ke" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Jam ke- <span className="text-destructive">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            id="f_jam_ke"
                                            min="1"
                                            max="12"
                                            value={form.data.jam_ke}
                                            onChange={(e) =>
                                                form.setData("jam_ke", e.target.value)
                                            }
                                            className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="f_ruangan" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Ruangan
                                        </label>
                                        <input
                                            type="text"
                                            id="f_ruangan"
                                            value={form.data.ruangan}
                                            onChange={(e) =>
                                                form.setData("ruangan", e.target.value)
                                            }
                                            className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                            placeholder="Ruang 101"
                                        />
                                        {form.errors.ruangan && (
                                            <span className="text-destructive text-xs">
                                                {form.errors.ruangan}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="f_jam_mulai" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Jam Mulai <span className="text-destructive">*</span>
                                        </label>
                                        <input
                                            type="time"
                                            id="f_jam_mulai"
                                            value={form.data.jam_mulai}
                                            onChange={(e) =>
                                                form.setData("jam_mulai", e.target.value)
                                            }
                                            className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="f_jam_selesai" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Jam Selesai <span className="text-destructive">*</span>
                                        </label>
                                        <input
                                            type="time"
                                            id="f_jam_selesai"
                                            value={form.data.jam_selesai}
                                            onChange={(e) =>
                                                form.setData("jam_selesai", e.target.value)
                                            }
                                            className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                        />
                                        {form.errors.jam_selesai && (
                                            <span className="text-destructive text-xs">
                                                {form.errors.jam_selesai}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="f_guru_id" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Guru Pengampu
                                    </label>
                                    <select
                                        id="f_guru_id"
                                        value={form.data.guru_id}
                                        onChange={(e) =>
                                            form.setData("guru_id", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                    >
                                        <option value="">Belum Ditentukan</option>
                                        {guru?.map((g: any) => (
                                            <option key={g.id} value={g.id}>
                                                {g.nama_lengkap}
                                            </option>
                                        ))}
                                    </select>
                                    {form.errors.guru_id && (
                                        <span className="text-destructive text-xs">
                                            {form.errors.guru_id}
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="f_semester" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Semester <span className="text-destructive">*</span>
                                        </label>
                                        <select
                                            id="f_semester"
                                            value={form.data.semester}
                                            onChange={(e) =>
                                                form.setData("semester", e.target.value)
                                            }
                                            className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                        >
                                            {SEMESTER_OPTIONS.map((s) => (
                                                <option key={s.value} value={s.value}>
                                                    {s.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="f_tahun_ajaran" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Tahun Ajaran <span className="text-destructive">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="f_tahun_ajaran"
                                            value={form.data.tahun_ajaran}
                                            onChange={(e) =>
                                                form.setData("tahun_ajaran", e.target.value)
                                            }
                                            className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                            placeholder="2025/2026"
                                        />
                                        {form.errors.tahun_ajaran && (
                                            <span className="text-destructive text-xs">
                                                {form.errors.tahun_ajaran}
                                            </span>
                                        )}
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
                    title="Hapus Jadwal"
                    message={`Yakin ingin menghapus "${deleteTarget?.nama_mapel}" (${deleteTarget?.hari} jam ${deleteTarget?.jam_ke})?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            </div>
        </>
    );
}
