import { useState } from "react";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { Plus, Trash2 } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import Pagination from "@/Components/Pagination";

interface EventItem {
	id: number;
	tanggal: string;
	kegiatan: string;
	keterangan: string | null;
	semester: string | null;
	tahun_ajaran: string | null;
}

export default function Kalender() {
	const { events, flash } = usePage().props as any;
	const [showForm, setShowForm] = useState(false);
	const [tanggal, setTanggal] = useState("");
	const [kegiatan, setKegiatan] = useState("");
	const [keterangan, setKeterangan] = useState("");
	const [semester, setSemester] = useState("");
	const [tahunAjaran, setTahunAjaran] = useState("");

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		Inertia.post(route("admin.kurikulum.kalender.store"), {
			tanggal,
			kegiatan,
			keterangan,
			semester,
			tahun_ajaran: tahunAjaran,
		});
		setShowForm(false);
		setTanggal("");
		setKegiatan("");
		setKeterangan("");
		setSemester("");
		setTahunAjaran("");
	};

	const handleDelete = (id: number) => {
		if (confirm("Hapus event kalender ini?")) {
			Inertia.delete(route("admin.kurikulum.kalender.destroy", id));
		}
	};

	const items = (Array.isArray(events) ? events : events?.data) || [];
	const meta = Array.isArray(events) ? null : events;

	const columns: Column<EventItem>[] = [
		{ key: "tanggal", label: "Tanggal" },
		{ key: "kegiatan", label: "Kegiatan" },
		{ key: "keterangan", label: "Keterangan", render: (_v, r) => r.keterangan || "-" },
		{ key: "semester", label: "Semester", render: (_v, r) => r.semester || "-" },
		{ key: "tahun_ajaran", label: "Thn Ajaran", render: (_v, r) => r.tahun_ajaran || "-" },
		{
			key: "aksi",
			label: "Aksi",
			render: (_v, r) => (
				<button
					onClick={() => handleDelete(r.id)}
					className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
					title="Hapus"
				>
					<Trash2 className="w-4 h-4" />
				</button>
			),
		},
	];

	return (
		<>
			<Head title="Kalender Akademik" />
			<div className="p-4 lg:p-6">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
						Kalender Akademik
					</h1>
					<button
						type="button"
						onClick={() => setShowForm(!showForm)}
						className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:opacity-90"
					>
						<Plus className="w-4 h-4" /> Tambah
					</button>
				</div>

				{flash?.success && (
					<div className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded">{flash.success}</div>
				)}

				{showForm && (
					<div className="mb-6 p-4 border rounded-lg bg-gray-50">
						<form onSubmit={handleAdd} className="space-y-3">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								<input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} className="border border-border px-3 py-2 rounded text-sm" required />
								<input type="text" value={kegiatan} onChange={(e) => setKegiatan(e.target.value)} placeholder="Nama kegiatan" className="border border-border px-3 py-2 rounded text-sm" required />
								<textarea value={keterangan} onChange={(e) => setKeterangan(e.target.value)} placeholder="Keterangan (opsional)" className="border border-border px-3 py-2 rounded text-sm" rows={2} />
								<select value={semester} onChange={(e) => setSemester(e.target.value)} className="border border-border px-3 py-2 rounded text-sm">
									<option value="">Semester</option>
									<option value="Ganjil">Ganjil</option>
									<option value="Genap">Genap</option>
								</select>
								<input type="text" value={tahunAjaran} onChange={(e) => setTahunAjaran(e.target.value)} placeholder="Thn Ajaran (2025/2026)" className="border border-border px-3 py-2 rounded text-sm" />
							</div>
							<button type="submit" className="px-4 py-2 text-sm font-medium bg-primary text-white rounded hover:opacity-90">
								Simpan
							</button>
						</form>
					</div>
				)}

				<AdminTable columns={columns} rows={items} />

				{meta && (
					<Pagination
						data={items}
						current_page={meta.current_page}
						last_page={meta.last_page}
						per_page={meta.per_page}
						from={meta.from}
						to={meta.to}
						total={meta.total}
						links={meta.links}
					/>
				)}
			</div>
		</>
	);
}
