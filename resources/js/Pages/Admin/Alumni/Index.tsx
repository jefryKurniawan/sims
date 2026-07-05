import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Upload } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";
import ImportModal from "@/Components/ImportModal";

export default function Index() {
  const { alumni, flash } = usePage().props as {
    alumni: any;
    flash: { success?: string; error?: string };
  };
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [showImport, setShowImport] = useState(false);

  const handleDelete = () => {
    if (!deleteTarget) return;
    Inertia.delete(route("alumni.destroy", deleteTarget.id));
    setDeleteTarget(null);
  };

  const columns: Column[] = [
    { key: "user", label: "Nama", render: (_v: any, row: any) => row.user?.name || "Tidak Diketahui" },
    { key: "tahun_lulus", label: "Tahun Lulus" },
    { key: "pekerjaan", label: "Pekerjaan", render: (v: string) => v || "-" },
    { key: "no_telp", label: "No. Telp", render: (v: string) => v || "-" },
  ];

  return (
    <>
      <Head title="Alumni" />
      <div className="p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Alumni</h1>
            <p className="text-sm text-gray-500 mt-0.5">Kelola data alumni sekolah</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={route("alumni.create")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-school-red text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold shadow-sm"
            >
              Alumni Baru
            </Link>
            <button
              onClick={() => setShowImport(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-semibold shadow-sm"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
          </div>
        </div>

        {flash?.success && <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">{flash.success}</div>}
        {flash?.error && <div className="mb-4 p-4 bg-red-50 text-red-50 border border-red-200 rounded-lg text-sm font-medium">{flash.error}</div>}

        <AdminTable
          columns={columns}
          rows={alumni?.data || []}
          pagination={{
            current_page: alumni?.current_page,
            last_page: alumni?.last_page,
            per_page: alumni?.per_page,
            from: alumni?.from,
            to: alumni?.to,
            total: alumni?.total,
            links: alumni?.links,
          }}
          actions={(row) => [
            { icon: "eye", onClick: () => Inertia.visit(route("alumni.show", row.id)), label: "Detail" },
            { icon: "edit", onClick: () => Inertia.visit(route("alumni.edit", row.id)), label: "Edit" },
            { icon: "delete", onClick: () => setDeleteTarget(row), label: "Hapus" },
          ]}
        />

        <ConfirmModal
          open={!!deleteTarget}
          title="Hapus Alumni"
          message={`Yakin ingin menghapus alumni "${deleteTarget?.user?.name || "ini"}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />

        <ImportModal
          open={showImport}
          onClose={() => setShowImport(false)}
          title="Import Alumni"
          templateRouteXlsx={route("alumni.template") + "?format=xlsx"}
          templateRouteCsv={route("alumni.template") + "?format=csv"}
          importRoute={route("alumni.import")}
        />
      </div>
    </>
  );
}