import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { Download } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";
import { useState } from "react";

export default function Index() {
	const { raporSiswa, kelas, flash, filters } = usePage().props as {
		raporSiswa: any;
		kelas: any[];
		flash: { success?: string; error?: string };
		filters: Record<string, string>;
	};
	const [kelasFilter, setKelasFilter] = useState((filters as any)?.rapor_kelas_id || "");
	const [semester, setSemester] = useState((filters as any)?.semester || "");
	const [tahunAjaran, setTahunAjaran] = useState((filters as any)?.tahun_ajaran || "");
	const [deleteTarget, setDeleteTarget] = useState<any>(null);

	const handleFilter = () => {
		const params = new URLSearchParams();
		if (kelasFilter) params.set("rapor_kelas_id", kelasFilter);
		if (semester) params.set("semester", semester);
		if (tahunAjaran) params.set("tahun_ajaran", tahunAjaran);
		const url = `/dashboard/rapor-siswa${params.toString() ? "?" + params.toString() : ""}`;
		window.location.href = url;
	};

	const handleDelete = () => {
		if (!deleteTarget) return;
		Inertia.delete(route("rapor-siswa.destroy", deleteTarget.id));
		setDeleteTarget(null);
	};

	const columns: Column[] = [
		{
			key: "nama",
			label: "Nama Siswa",
			render: (_v: any, row: any) => row.siswa?.nama_lengkap || "-",
		},
		{
			key: "nisn",
			label: "NISN",
			render: (_v: any, row: any) => row.siswa?.nisn || "-",
		},
		{
			key: "kelas",
			label: "Kelas",
			render: (_v: any, row: any) =>
				row.rapor_kelas
					? `Kelas ${row.rapor_kelas.tingkat} - ${row.rapor_kelas.nama_kelas} (${row.rapor_kelas.jurusan?.singkatan || "-"})`
					: "-",
		},
		{ key: "semester", label: "Semester" },
		{ key: "tahun_ajaran", label: "Thn Ajaran" },
	];

	return (
		<>
			<Head title="Rapor Siswa" />
			<div className="p-4 lg:p-6">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
					<div>
						<h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
							Rapor Siswa
						</h1>
						<p className="text-sm text-gray-500 mt-0.5">
							Kelola data rapor siswa per semester
						</p>
					</div>
					<div className="flex items-center gap-2 flex-wrap">
						<Link
							href={route("rapor-siswa.cetak-pdf-massal", {
								rapor_kelas_id: filters?.rapor_kelas_id || undefined,
								semester: filters?.semester || undefined,
								tahun_ajaran: filters?.tahun_ajaran || undefined,
							})}
							className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-sm font-semibold shadow-sm"
						>
							<Download className="h-4 w-4" />
							Cetak PDF Massal
						</Link>
						<Link
							href={route("rapor-siswa.assign")}
							className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm"
						>
							Assign Siswa
						</Link>
					</div>
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

				<div className="bg-white border border-primary/10 rounded-lg shadow-sm p-4 mb-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Kelas
							</label>
							<select
								value={kelasFilter}
								onChange={(e) => setKelasFilter(e.target.value)}
								className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
							>
								<option value="">Semua Kelas</option>
								{(kelas || []).map((k: any) => (
									<option key={k.id} value={k.id}>
										Kelas {k.tingkat} - {k.nama_kelas} (
										{k.jurusan?.singkatan || "-"})
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Semester
							</label>
							<select
								value={semester}
								onChange={(e) => setSemester(e.target.value)}
								className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
							>
								<option value="">Semua</option>
								<option value="Ganjil">Ganjil</option>
								<option value="Genap">Genap</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Tahun Ajaran
							</label>
							<input
								type="text"
								value={tahunAjaran}
								onChange={(e) => setTahunAjaran(e.target.value)}
								placeholder="2024/2025"
								className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
							/>
						</div>
						<div className="flex items-end gap-2">
							<button
								onClick={handleFilter}
								className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
							>
								Filter
							</button>
							<Link
								href={route("rapor-siswa.index")}
								className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
							>
								Reset
							</Link>
						</div>
					</div>
				</div>

				<AdminTable
					columns={columns}
					rows={raporSiswa?.data || []}
					pagination={{
						current_page: raporSiswa?.current_page,
						last_page: raporSiswa?.last_page,
						per_page: raporSiswa?.per_page,
						from: raporSiswa?.from,
						to: raporSiswa?.to,
						total: raporSiswa?.total,
						links: raporSiswa?.links,
					}}
					actions={(row) => [
						{
							icon: "edit",
							onClick: () =>
								Inertia.visit(route("rapor-siswa.input-nilai", row.id)),
							label: "Nilai",
						},
						{
							icon: "eye",
							onClick: () => Inertia.visit(route("rapor-siswa.show", row.id)),
							label: "Detail",
						},
						{
							icon: "delete",
							onClick: () => setDeleteTarget(row),
							label: "Hapus",
						},
					]}
				/>

				<ConfirmModal
					open={!!deleteTarget}
					title="Hapus Rapor Siswa"
					message={`Yakin ingin menghapus rapor untuk "${deleteTarget?.siswa?.nama_lengkap || "ini"}"?`}
					onConfirm={handleDelete}
					onCancel={() => setDeleteTarget(null)}
				/>
			</div>
		</>
	);
}
