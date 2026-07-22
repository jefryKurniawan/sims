import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Plus } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";

export default function Index() {
    const { meetings } = usePage().props as any;
    const columns: Column[] = [
        { key: "tanggal_rapat", label: "Tanggal" },
        { key: "agenda", label: "Agenda", render: (v: string) => v?.substring(0, 80) + (v?.length > 80 ? "..." : "") },
        { key: "tempat", label: "Tempat", render: (v: any) => v || "-" },
        { key: "creator", label: "Dibuat Oleh", render: (_: any, r: any) => r.creator?.nama || "-" },
        { key: "created_at", label: "Dibuat" },
    ];

    return (<>
        <Head title="Notulensi Rapat MBG" />
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Notulensi Rapat Evaluasi MBG</h1>
                <Link href={route("mbg.meetings.create")}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Plus className="w-4 h-4" /> Rapat Baru
                </Link>
            </div>
            <AdminTable columns={columns} rows={meetings?.data || []} pagination={meetings} />
        </div>
    </>);
}
