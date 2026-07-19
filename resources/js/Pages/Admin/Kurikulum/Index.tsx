import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import { Plus, BookOpen } from "lucide-react";

interface KurikulumItem {
	id: number;
	nama: string;
	aktif: boolean;
	keterangan: string | null;
	mapels_count: number;
	created_at: string;
}

export default function Index() {
	const { kurikulums, flash } = usePage().props as any;

	const columns: Column[] = [
		{
			key: "nama",
			label: "Nama Kurikulum",
			render: (_v: unknown, row: KurikulumItem) => (
				<Link
					href={route("admin.kurikulum.edit", row.id)}
					className="font-medium text-primary hover:underline"
				>
					{row.nama}
				</Link>
			),
		},
		{
			key: "aktif",
			label: "Status",
			render: (_v: unknown, row: KurikulumItem) =>
				row.aktif ? (
					<span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
						Aktif
					</span>
				) : (
					<span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-gray-50 text-gray-500 ring-1 ring-gray-200">
						Tidak Aktif
					</span>
				),
		},
		{
			key: "mapels_count",
			label: "Jumlah Mapel",
		},
		{
			key: "keterangan",
			label: "Keterangan",
			render: (v: string) => v || "-",
		},
		{
			key: "created_at",
			label: "Dibuat",
			render: (v: string) => (v ? v.slice(0, 10) : "-"),
		},
		{
			key: "aksi",
			label: "Aksi",
			render: (_v: unknown, row: KurikulumItem) => (
				<div className="flex gap-1">
					<Link
						href={route("admin.kurikulum.edit", row.id)}
						className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
					>
						Edit
					</Link>
					<Link
						href={route("admin.kurikulum.mapels", row.id)}
						className="px-2 py-1 text-xs font-medium bg-purple-50 text-purple-700 rounded hover:bg-purple-100"
					>
						Mapel
					</Link>
					<Link
						href={route("admin.kurikulum.skbm", row.id)}
						className="px-2 py-1 text-xs font-medium bg-amber-50 text-amber-700 rounded hover:bg-amber-100"
					>
						SKBM
					</Link>
				</div>
			),
		},
	];

	return (
		<>
			<Head title="Kurikulum" />
			<div className="p-4 lg:p-6">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
					<div>
						<h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
							Kurikulum
						</h1>
						<p className="text-sm text-gray-500 mt-0.5">
							Kelola struktur kurikulum, mapping mata pelajaran, dan SKBM
						</p>
					</div>
					<div className="flex items-center gap-2">
						<Link
							href={route("admin.kurikulum.create")}
							className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition shadow-sm"
						>
							<Plus className="h-4 w-4" />
							Tambah Kurikulum
						</Link>
					</div>
				</div>

				{flash?.success && (
					<div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">
						{flash.success}
					</div>
				)}

				<AdminTable
					columns={columns}
					rows={kurikulums?.data || []}
					pagination={{
						current_page: kurikulums?.current_page,
						last_page: kurikulums?.last_page,
						per_page: kurikulums?.per_page,
						from: kurikulums?.from,
						to: kurikulums?.to,
						total: kurikulums?.total,
						links: kurikulums?.links,
					}}
				/>
			</div>
		</>
	);
}
