import { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { Plus, Trash2 } from "lucide-react";

interface MapelItem {
	id: number;
	rapor_mapel_id: number;
	fase: string | null;
	jam_mengajar_mingguan: number;
	semester: number;
	rapor_mapel: { id: number; nama_mapel: string; kkm: number } | null;
}

interface RaporMapelOption {
	id: number;
	nama_mapel: string;
	kkm: number;
}

export default function Mapels() {
	const { kurikulum, allMapels, flash } = usePage().props as any;
	const [showForm, setShowForm] = useState(false);
	const [mapelId, setMapelId] = useState("");
	const [fase, setFase] = useState("");
	const [jamMengajar, setJamMengajar] = useState(0);
	const [semester, setSemester] = useState(1);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		Inertia.post(route("admin.kurikulum.mapels.store", kurikulum.id), {
			rapor_mapel_id: mapelId,
			fase,
			jam_mengajar_mingguan: jamMengajar,
			semester,
		});
	};

	const handleDelete = (id: number) => {
		if (confirm("Hapus mapel dari kurikulum ini?")) {
			Inertia.delete(
				route("admin.kurikulum.mapels.destroy", [kurikulum.id, id]),
			);
		}
	};

	return (
		<>
			<Head title={`Mapel - ${kurikulum.nama}`} />
			<div className="p-4 lg:p-6 max-w-4xl">
				<div className="mb-6">
					<Link
						href={route("admin.kurikulum.index")}
						className="text-sm text-primary hover:underline"
					>
						&larr; Kembali ke Kurikulum
					</Link>
					<h1 className="text-2xl font-bold text-gray-900 mt-2">
						Mata Pelajaran: {kurikulum.nama}
					</h1>
				</div>

				{flash?.success && (
					<div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">
						{flash.success}
					</div>
				)}

				<div className="bg-white rounded-lg border mb-6">
					<div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
						<h2 className="font-semibold">Daftar Mapel</h2>
						<button
							type="button"
							onClick={() => setShowForm(!showForm)}
							className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-primary text-white rounded hover:bg-primary/90"
						>
							<Plus className="h-3 w-3" />
							Tambah
						</button>
					</div>

					{showForm && (
						<form
							onSubmit={handleAdd}
							className="p-4 border-b bg-gray-50 space-y-3"
						>
							<div className="grid grid-cols-1 md:grid-cols-4 gap-3">
								<select
									value={mapelId}
									onChange={(e) => setMapelId(e.target.value)}
									className="px-3 py-2 border rounded text-sm"
									required
								>
									<option value="">Pilih Mapel</option>
									{(allMapels || []).map((m: RaporMapelOption) => (
										<option key={m.id} value={m.id}>
											{m.nama_mapel}
										</option>
									))}
								</select>
								<input
									type="text"
									value={fase}
									onChange={(e) => setFase(e.target.value)}
									placeholder="Fase (A/B/C/D/E/F)"
									className="px-3 py-2 border rounded text-sm"
								/>
								<input
									type="number"
									value={jamMengajar}
									onChange={(e) => setJamMengajar(Number(e.target.value))}
									placeholder="Jam/minggu"
									className="px-3 py-2 border rounded text-sm"
								/>
								<select
									value={semester}
									onChange={(e) => setSemester(Number(e.target.value))}
									className="px-3 py-2 border rounded text-sm"
								>
									<option value={1}>Semester 1</option>
									<option value={2}>Semester 2</option>
								</select>
							</div>
							<button
								type="submit"
								className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
							>
								Simpan
							</button>
						</form>
					)}

					{!kurikulum.mapels || kurikulum.mapels.length === 0 ? (
						<div className="p-6 text-center text-sm text-gray-500">
							Belum ada mata pelajaran
						</div>
					) : (
						<table className="w-full">
							<thead>
								<tr className="bg-gray-50 border-b">
									<th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
										Mapel
									</th>
									<th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
										Fase
									</th>
									<th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase">
										Jam/Minggu
									</th>
									<th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase">
										Semester
									</th>
									<th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase">
										Aksi
									</th>
								</tr>
							</thead>
							<tbody className="divide-y">
								{kurikulum.mapels.map((m: MapelItem) => (
									<tr key={m.id} className="hover:bg-gray-50">
										<td className="px-4 py-2 text-sm font-medium">
											{m.rapor_mapel?.nama_mapel || "-"}
										</td>
										<td className="px-4 py-2 text-sm">{m.fase || "-"}</td>
										<td className="px-4 py-2 text-sm text-center">
											{m.jam_mengajar_mingguan}
										</td>
										<td className="px-4 py-2 text-sm text-center">
											{m.semester}
										</td>
										<td className="px-4 py-2 text-center">
											<button
												type="button"
												onClick={() => handleDelete(m.id)}
												className="p-1 text-red-600 hover:bg-red-50 rounded"
												aria-label="Hapus"
											>
												<Trash2 className="h-4 w-4" />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</>
	);
}
