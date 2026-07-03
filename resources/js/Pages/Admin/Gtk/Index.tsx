import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";

export default function Index() {
  const { guru, flash } = usePage().props as { guru: any; flash: { success?: string; error?: string } };
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const handleDelete = () => {
    if (!deleteTarget) return;
    Inertia.delete(route("gtk.destroy", deleteTarget.id));
    setDeleteTarget(null);
  };

  const columns: Column[] = [
    { key: "nama_lengkap", label: "Nama" },
    { key: "nuptk", label: "NUPTK", render: (v: string) => v || "-" },
    {
      key: "jenis",
      label: "Jenis",
      render: (v: string) => (
        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${v === "Guru" ? "bg-indigo-100 text-indigo-700" : "bg-cyan-100 text-cyan-700"}`}>
          {v}
        </span>
      ),
    },
    { key: "jabatan", label: "Jabatan" },
    { key: "no_telp", label: "No. Telp", render: (v: string) => v || "-" },
    {
      key: "status_kepegawaian",
      label: "Status Kepegawaian",
      render: (v: string) => {
        const map: Record<string, string> = {
          "Tetap Yayasan": "bg-emerald-100 text-emerald-700",
          Kontrak: "bg-yellow-100 text-yellow-700",
          Honorer: "bg-gray-100 text-gray-700",
        };
        const label: Record<string, string> = {
          "Tetap Yayasan": "Tetap",
          Kontrak: "Kontrak",
          Honorer: "Honorer",
        };
        return <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${map[v] || map.Honorer}`}>{label[v] || v}</span>;
      },
    },
  ];

  return (
    <>
      <Head title="GTK" />
      <div className="p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">GTK</h1>
            <p className="text-sm text-gray-500 mt-0.5">Kelola data Guru & Tenaga Kependidikan</p>
          </div>
          <Link
            href={route("gtk.create")}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-school-red text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold shadow-sm"
          >
            GTK Baru
          </Link>
        </div>

        {flash?.success && <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">{flash.success}</div>}
        {flash?.error && <div className="mb-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium">{flash.error}</div>}

        <AdminTable
          columns={columns}
          rows={guru?.data || []}
          pagination={{
            current_page: guru?.current_page,
            last_page: guru?.last_page,
            per_page: guru?.per_page,
            from: guru?.from,
            to: guru?.to,
            total: guru?.total,
            links: guru?.links,
          }}
          actions={(row) => [
            { icon: "eye", onClick: () => Inertia.visit(route("gtk.show", row.id)), label: "Detail" },
            { icon: "edit", onClick: () => Inertia.visit(route("gtk.edit", row.id)), label: "Edit" },
            { icon: "delete", onClick: () => setDeleteTarget(row), label: "Hapus" },
          ]}
        />

        <ConfirmModal
          open={!!deleteTarget}
          title="Hapus GTK"
          message={`Yakin ingin menghapus "${deleteTarget?.nama_lengkap}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </>
  );
}
