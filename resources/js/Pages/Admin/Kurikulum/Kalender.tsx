import { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { Plus, Trash2 } from "lucide-react";

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

	return (
		<>
			<Head title="Kalender Akademik" />
			<div className="p-4 lg:p-6 max-w-4xl">
				<div className="mb-6">
					<h1 className="text-2xl font-bold text-gray-900">
						Kalender Akademik
					</h1>
					<p className="text-sm text-gray-500 mt-0.5">
						Kelola kegiatan akademik per semester
					</p>
				</div>

				{flash?.success && (
					<div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">
						{flash.success}
					</div>
				)}

				<div className="bg-white rounded-lg border mb-6">
					<div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
						<h2 className="font-semibold">Kegiatan</h2>
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
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								<input
									type="date"
									value={tanggal}
									onChange={(e) => setTanggal(e.target.value)}
									className="px-3 py-2 border rounded text-sm"
									required
								/>
								<input
									type="text"
									value={kegiatan}
									onChange={(e) => setKegiatan(e.target.value)}
									placeholder="Nama kegiatan"
									className="px-3 py-2 border rounded text-sm"
									required
								/>
								<textarea
									value={keterangan}
									onChange={(e) => setKeterangan(e.target.value)}
									placeholder="Keterangan (opsional)"
									className="px-3 py-2 border rounded text-sm"
									rows={2}
								/>
								<div className="grid grid-cols-2 gap-3">
									<select
										value={semester}
										onChange={(e) => setSemester(e.target.value)}
										className="px-3 py-2 border rounded text-sm"
									>
										<option value="">Semester</option>
										<option value="Ganjil">Ganjil</option>
										<option value="Genap">Genap</option>
									</select>
									<input
										type="text"
										value={tahunAjaran}
										onChange={(e) => setTahunAjaran(e.target.value)}
										placeholder="Thn Ajaran"
										className="px-3 py-2 border rounded text-sm"
									/>
								</div>
							</div>
							<button
								type="submit"
								className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
							>
								Simpan
							</button>
						</form>
					)}

					{!events?.data || events.data.length === 0 ? (
						<div className="p-6 text-center text-sm text-gray-500">
							Belum ada kegiatan akademik
						</div>
					) : (
						<table className="w-full">
							<thead>
								<tr className="bg-gray-50 border-b">
									<th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
										Tanggal
									</th>
									<th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
										Kegiatan
									</th>
									<th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
										Keterangan
									</th>
									<th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase">
										Semester
									</th>
									<th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase">
										Thn Ajaran
									</th>
									<th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase">
										Aksi
									</th>
								</tr>
							</thead>
							<tbody className="divide-y">
								{events.data.map((e: EventItem) => (
									<tr key={e.id} className="hover:bg-gray-50">
										<td className="px-4 py-2 text-sm">{e.tanggal}</td>
										<td className="px-4 py-2 text-sm font-medium">
											{e.kegiatan}
										</td>
										<td className="px-4 py-2 text-sm text-gray-500 max-w-xs truncate">
											{e.keterangan || "-"}
										</td>
										<td className="px-4 py-2 text-sm text-center">
											{e.semester || "-"}
										</td>
										<td className="px-4 py-2 text-sm text-center">
											{e.tahun_ajaran || "-"}
										</td>
										<td className="px-4 py-2 text-center">
											<button
												type="button"
												onClick={() => handleDelete(e.id)}
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

					{events?.meta && (
						<div className="px-4 py-3 border-t text-sm text-gray-500 text-center">
							Halaman {events.meta.current_page || events.current_page} dari{" "}
							{events.meta.last_page || events.last_page}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
