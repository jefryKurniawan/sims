import { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { Plus, Trash2 } from "lucide-react";

interface SkbmItem {
	id: number;
	rapor_mapel_id: number;
	fase: string | null;
	kode_kd: string;
	deskripsi_kd: string;
	rapor_mapel: { id: number; nama_mapel: string } | null;
}

interface RaporMapelOption {
	id: number;
	nama_mapel: string;
}

export default function Skbm() {
	const { kurikulum, allMapels, flash } = usePage().props as any;
	const [showForm, setShowForm] = useState(false);
	const [mapelId, setMapelId] = useState("");
	const [fase, setFase] = useState("");
	const [kodeKd, setKodeKd] = useState("");
	const [deskripsi, setDeskripsi] = useState("");

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		Inertia.post(route("admin.kurikulum.skbm.store", kurikulum.id), {
			rapor_mapel_id: mapelId,
			fase,
			kode_kd: kodeKd,
			deskripsi_kd: deskripsi,
		});
		setShowForm(false);
		setKodeKd("");
		setDeskripsi("");
	};

	const handleDelete = (id: number) => {
		if (confirm("Hapus SKBM ini?")) {
			Inertia.delete(route("admin.kurikulum.skbm.destroy", [kurikulum.id, id]));
		}
	};

	return (
		<>
			<Head title={`SKBM - ${kurikulum.nama}`} />
			<div className="p-4 lg:p-6 max-w-4xl">
				<div className="mb-6">
					<Link
						href={route("admin.kurikulum.index")}
						className="text-sm text-primary hover:underline"
					>
						&larr; Kembali ke Kurikulum
					</Link>
					<h1 className="text-2xl font-bold text-gray-900 mt-2">
						SKBM: {kurikulum.nama}
					</h1>
					<p className="text-sm text-gray-500">
						Standar Ketuntasan Belajar Minimal per Kompetensi Dasar
					</p>
				</div>

				{flash?.success && (
					<div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">
						{flash.success}
					</div>
				)}

				<div className="bg-white rounded-lg border mb-6">
					<div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
						<h2 className="font-semibold">Daftar KD & SKBM</h2>
						<button
							type="button"
							onClick={() => setShowForm(!showForm)}
							className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-primary text-white rounded hover:bg-primary/90"
						>
							<Plus className="h-3 w-3" />
							Tambah KD
						</button>
					</div>

					{(showForm || !kurikulum.skbms || kurikulum.skbms.length === 0) &&
						showForm && (
							<form
								onSubmit={handleAdd}
								className="p-4 border-b bg-gray-50 space-y-3"
							>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
								</div>
								<input
									type="text"
									value={kodeKd}
									onChange={(e) => setKodeKd(e.target.value)}
									placeholder="Kode KD (contoh: 3.1)"
									className="w-full px-3 py-2 border rounded text-sm"
									required
								/>
								<textarea
									value={deskripsi}
									onChange={(e) => setDeskripsi(e.target.value)}
									placeholder="Deskriksi KD"
									className="w-full px-3 py-2 border rounded text-sm"
									rows={2}
									required
								/>
								<button
									type="submit"
									className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
								>
									Simpan
								</button>
							</form>
						)}

					{!kurikulum.skbms || kurikulum.skbms.length === 0 ? (
						<div className="p-6 text-center text-sm text-gray-500">
							{showForm ? "" : "Belum ada SKBM. Klik Tambah KD untuk mulai."}
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
									<th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
										Kode KD
									</th>
									<th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
										Deskripsi
									</th>
									<th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase">
										Aksi
									</th>
								</tr>
							</thead>
							<tbody className="divide-y">
								{kurikulum.skbms.map((s: SkbmItem) => (
									<tr key={s.id} className="hover:bg-gray-50">
										<td className="px-4 py-2 text-sm font-medium">
											{s.rapor_mapel?.nama_mapel || "-"}
										</td>
										<td className="px-4 py-2 text-sm">{s.fase || "-"}</td>
										<td className="px-4 py-2 text-sm font-mono">{s.kode_kd}</td>
										<td className="px-4 py-2 text-sm max-w-xs truncate">
											{s.deskripsi_kd}
										</td>
										<td className="px-4 py-2 text-center">
											<button
												type="button"
												onClick={() => handleDelete(s.id)}
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
