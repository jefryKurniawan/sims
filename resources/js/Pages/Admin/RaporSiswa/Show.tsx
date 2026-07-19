import { Link, usePage } from "@inertiajs/inertia-react";
import AdminLayout from "@/Layout/AdminLayout";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

interface SiswaInfo {
	id: number;
	nama_lengkap: string;
	nisn: string;
	tempat_lahir: string;
	tanggal_lahir: string;
	jenis_kelamin: string;
	agama: string;
	alamat: string;
}

interface RaporKelasInfo {
	id: number;
	nama_kelas: string;
	tingkat: number;
	jurusan: { id: number; singkatan: string; nama: string } | null;
}

interface RaporMapelInfo {
	id: number;
	nama_mapel: string;
	kkm: number;
	kelompok: string;
}

interface RaporNilaiItem {
	id: number;
	rapor_mapel_id: number;
	nilai_pengetahuan: number | null;
	predikat_pengetahuan: string | null;
	nilai_keterampilan: number | null;
	predikat_keterampilan: string | null;
	nilai_akhir: number | null;
	rapor_mapel: RaporMapelInfo | null;
	deskripsi_pengetahuan?: string | null;
	deskripsi_keterampilan?: string | null;
}

interface RaporEkskulItem {
	id: number;
	nama_ekskul: string;
	nilai: string;
	deskripsi: string | null;
}

interface RaporCatatanItem {
	id: number;
	catatan_wali_kelas: string | null;
	catatan_ortu: string | null;
	tinggi_badan: string | null;
	berat_badan: string | null;
	jumlah_sakit: number;
	jumlah_izin: number;
	jumlah_alpha: number;
}

interface FullRapor {
	id: number;
	semester: string;
	tahun_ajaran: string;
	siswa: SiswaInfo | null;
	rapor_kelas: RaporKelasInfo | null;
	rapor_nilai: RaporNilaiItem[];
	rapor_ekstrakurikuler: RaporEkskulItem[];
	rapor_catatan: RaporCatatanItem | null;
}

interface Props {
	rapor: FullRapor;
}

export default function Show({ rapor }: Props) {
	const { flash } = usePage().props;
	const kelas = rapor.rapor_kelas;
	const siswa = rapor.siswa;
	const nilai = rapor.rapor_nilai || [];

	// Hitung kelulusan
	const mapelCount = nilai.length;
	const mapelLulus = nilai.filter(
		(n) =>
			n.nilai_akhir !== null &&
			n.rapor_mapel &&
			n.nilai_akhir >= n.rapor_mapel.kkm,
	).length;
	const rataRata =
		mapelCount > 0
			? (
					nilai.reduce((sum, n) => sum + (n.nilai_akhir ?? 0), 0) / mapelCount
				).toFixed(2)
			: "0.00";
	const semuaLulus = mapelCount > 0 && mapelLulus === mapelCount;

	const [showEkskulForm, setShowEkskulForm] = useState(false);
	const [showCatatanForm, setShowCatatanForm] = useState(false);

	const [ekskulName, setEkskulName] = useState("");
	const [ekskulNilai, setEkskulNilai] = useState("");
	const [ekskulKet, setEkskulKet] = useState("");

	const catatan = rapor.rapor_catatan;
	const [catatanWali, setCatatanWali] = useState(
		catatan?.catatan_wali_kelas || "",
	);
	const [catatanOrtu, setCatatanOrtu] = useState(catatan?.catatan_ortu || "");
	const [tinggi, setTinggi] = useState(catatan?.tinggi_badan || "");
	const [berat, setBerat] = useState(catatan?.berat_badan || "");
	const [sakit, setSakit] = useState(catatan?.jumlah_sakit || 0);
	const [izin, setIzin] = useState(catatan?.jumlah_izin || 0);
	const [alpha, setAlpha] = useState(catatan?.jumlah_alpha || 0);

	const handleGenerateDeskripsi = () => {
		if (confirm("Generate deskripsi otomatis untuk semua mapel?")) {
			Inertia.post(route("rapor-siswa.generate-deskripsi", rapor.id));
		}
	};

	const handleAddEkskul = (e: React.FormEvent) => {
		e.preventDefault();
		Inertia.post(route("rapor-siswa.ekstrakurikuler", rapor.id), {
			nama_ekskul: ekskulName,
			nilai: ekskulNilai,
			deskripsi: ekskulKet,
		});
	};

	const handleDeleteEkskul = (id: number) => {
		if (confirm("Hapus ekstrakurikuler ini?")) {
			Inertia.delete(route("rapor-siswa.hapus-ekstrakurikuler", id));
		}
	};

	const handleSaveCatatan = (e: React.FormEvent) => {
		e.preventDefault();
		Inertia.post(route("rapor-siswa.catatan", rapor.id), {
			catatan_wali_kelas: catatanWali,
			catatan_ortu: catatanOrtu,
			tinggi_badan: tinggi,
			berat_badan: berat,
			jumlah_sakit: sakit,
			jumlah_izin: izin,
			jumlah_alpha: alpha,
		});
	};

	if (!siswa || !kelas) {
		return (
			<AdminLayout title="Rapor Tidak Ditemukan">
				<div className="p-6 text-center text-gray-500">
					Data rapor tidak lengkap.
				</div>
			</AdminLayout>
		);
	}

	return (
		<AdminLayout title={`Rapor - ${siswa.nama_lengkap}`}>
			<div className="mb-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold text-gray-800">Detail Rapor</h1>
						<p className="text-sm text-gray-500 mt-1">
							Semester {rapor.semester} - {rapor.tahun_ajaran}
						</p>
					</div>
					<div className="flex gap-2">
						<Link
							href={route("rapor-siswa.input-nilai", rapor.id)}
							className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
						>
							Input/Edit Nilai
						</Link>
						<a
							href={route("rapor-siswa.cetak-pdf", rapor.id)}
							className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
							target="_blank"
							rel="noopener"
						>
							Download PDF
						</a>
						<Link
							href={route("rapor-siswa.index")}
							className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
						>
							Kembali
						</Link>
					</div>
				</div>
			</div>

			{flash.success && (
				<div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
					{flash.success}
				</div>
			)}

			{/* Identitas Siswa */}
			<div className="bg-white rounded-lg border p-6 mb-6">
				<div className="flex justify-between items-start mb-4">
					<h2 className="text-lg font-semibold">Identitas Siswa</h2>
					{mapelCount > 0 && (
						<div className="flex items-center gap-3">
							<div className="text-right">
								<span className="text-xs text-gray-500 block">Rata-rata</span>
								<span className="text-lg font-bold">{rataRata}</span>
							</div>
							<div
								className={`px-3 py-1 rounded-full text-sm font-semibold ${
									semuaLulus
										? "bg-green-100 text-green-700"
										: "bg-red-100 text-red-700"
								}`}
							>
								{semuaLulus ? "\u2713 LULUS" : "\u2717 TIDAK LULUS"}
							</div>
						</div>
					)}
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<span className="text-sm text-gray-500">Nama:</span>{" "}
						<span className="text-sm font-medium">{siswa.nama_lengkap}</span>
					</div>
					<div>
						<span className="text-sm text-gray-500">NISN:</span>{" "}
						<span className="text-sm font-medium">{siswa.nisn}</span>
					</div>
					<div>
						<span className="text-sm text-gray-500">Tempat/Tgl Lahir:</span>{" "}
						<span className="text-sm font-medium">
							{siswa.tempat_lahir}, {siswa.tanggal_lahir}
						</span>
					</div>
					<div>
						<span className="text-sm text-gray-500">Jenis Kelamin:</span>{" "}
						<span className="text-sm font-medium">{siswa.jenis_kelamin}</span>
					</div>
					<div>
						<span className="text-sm text-gray-500">Kelas:</span>{" "}
						<span className="text-sm font-medium">
							Kelas {kelas.tingkat} - {kelas.nama_kelas} (
							{kelas.jurusan?.singkatan || "-"})
						</span>
					</div>
				</div>
			</div>

			{/* Nilai */}
			<div className="bg-white rounded-lg border overflow-hidden mb-6">
				<div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
					<h2 className="text-lg font-semibold">Nilai Akademik</h2>
					<button
						onClick={handleGenerateDeskripsi}
						className="px-3 py-1 text-xs font-medium text-white bg-purple-600 rounded hover:bg-purple-700"
					>
						Generate Deskripsi
					</button>
				</div>
				<table className="w-full">
					<thead>
						<tr className="bg-gray-50 border-b">
							<th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
								Mapel
							</th>
							<th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase">
								Nilai P
							</th>
							<th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase">
								Pred P
							</th>
							<th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase">
								Nilai K
							</th>
							<th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase">
								Pred K
							</th>
							<th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase">
								Nilai Akhir
							</th>
							<th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase">
								Status
							</th>
							<th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase">
								Deskripsi P
							</th>
							<th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase">
								Deskripsi K
							</th>
						</tr>
					</thead>
					<tbody className="divide-y">
						{nilai.length === 0 ? (
							<tr>
								<td
									colSpan={9}
									className="px-4 py-6 text-center text-sm text-gray-500"
								>
									Belum ada nilai.{" "}
									<Link
										href={route("rapor-siswa.input-nilai", rapor.id)}
										className="text-blue-600 hover:underline"
									>
										Input Nilai
									</Link>
								</td>
							</tr>
						) : (
							nilai.map((n) => {
								const mapel = n.rapor_mapel;
								const lulus =
									n.nilai_akhir !== null && mapel && n.nilai_akhir >= mapel.kkm;
								return (
									<tr key={n.id} className="hover:bg-gray-50">
										<td className="px-4 py-2 text-sm font-medium text-gray-900">
											{mapel?.nama_mapel || "-"}
											<span className="text-xs text-gray-400 ml-1">
												(KKM: {mapel?.kkm || "-"})
											</span>
										</td>
										<td className="px-4 py-2 text-sm text-center">
											{n.nilai_pengetahuan ?? "-"}
										</td>
										<td className="px-4 py-2 text-sm text-center font-semibold">
											{n.predikat_pengetahuan ?? "-"}
										</td>
										<td className="px-4 py-2 text-sm text-center">
											{n.nilai_keterampilan ?? "-"}
										</td>
										<td className="px-4 py-2 text-sm text-center font-semibold">
											{n.predikat_keterampilan ?? "-"}
										</td>
										<td className="px-4 py-2 text-sm text-center font-bold">
											{n.nilai_akhir ?? "-"}
										</td>
										<td className="px-4 py-2 text-sm text-center">
											{n.nilai_akhir !== null && mapel ? (
												<span
													className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
														lulus
															? "bg-green-100 text-green-700"
															: "bg-red-100 text-red-700"
													}`}
												>
													{lulus ? "LULUS" : "TIDAK"}
												</span>
											) : (
												<span className="text-gray-400">-</span>
											)}
										</td>
										<td className="px-4 py-2 text-sm text-gray-600 max-w-xs">
											{n.deskripsi_pengetahuan || "-"}
										</td>
										<td className="px-4 py-2 text-sm text-gray-600 max-w-xs">
											{n.deskripsi_keterampilan || "-"}
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>

			{/* Ekstrakurikuler */}
			<div className="bg-white rounded-lg border overflow-hidden mb-6">
				<div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
					<h2 className="text-lg font-semibold">Ekstrakurikuler</h2>
					<button
						onClick={() => setShowEkskulForm(!showEkskulForm)}
						className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700"
					>
						{showEkskulForm ? "Batal" : "Tambah"}
					</button>
				</div>

				{showEkskulForm && (
					<form onSubmit={handleAddEkskul} className="p-4 border-b bg-gray-50">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
							<input
								type="text"
								value={ekskulName}
								onChange={(e) => setEkskulName(e.target.value)}
								placeholder="Nama Ekstrakurikuler"
								className="px-3 py-2 border rounded text-sm"
								required
							/>
							<input
								type="text"
								value={ekskulNilai}
								onChange={(e) => setEkskulNilai(e.target.value)}
								placeholder="Nilai (A/B/C)"
								className="px-3 py-2 border rounded text-sm"
								required
							/>
							<input
								type="text"
								value={ekskulKet}
								onChange={(e) => setEkskulKet(e.target.value)}
								placeholder="Keterangan"
								className="px-3 py-2 border rounded text-sm"
							/>
						</div>
						<button
							type="submit"
							className="mt-3 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
						>
							Simpan
						</button>
					</form>
				)}

				{rapor.rapor_ekstrakurikuler.length === 0 ? (
					<div className="p-4 text-center text-sm text-gray-500">
						Belum ada data ekstrakurikuler
					</div>
				) : (
					<table className="w-full">
						<thead>
							<tr className="bg-gray-50 border-b">
								<th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
									Nama
								</th>
								<th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
									Nilai
								</th>
								<th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
									Keterangan
								</th>
								<th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase">
									Aksi
								</th>
							</tr>
						</thead>
						<tbody className="divide-y">
							{rapor.rapor_ekstrakurikuler.map((e) => (
								<tr key={e.id} className="hover:bg-gray-50">
									<td className="px-4 py-2 text-sm">{e.nama_ekskul}</td>
									<td className="px-4 py-2 text-sm font-semibold">{e.nilai}</td>
									<td className="px-4 py-2 text-sm text-gray-600">
										{e.deskripsi || "-"}
									</td>
									<td className="px-4 py-2 text-center">
										<button
											onClick={() => handleDeleteEkskul(e.id)}
											className="px-2 py-1 text-xs font-medium text-white bg-destructive rounded hover:bg-destructive/90"
										>
											Hapus
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>

			{/* Catatan */}
			<div className="bg-white rounded-lg border overflow-hidden mb-6">
				<div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
					<h2 className="text-lg font-semibold">Catatan Wali Kelas & Fisik</h2>
					<button
						onClick={() => setShowCatatanForm(!showCatatanForm)}
						className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700"
					>
						{showCatatanForm ? "Batal" : "Edit"}
					</button>
				</div>

				{showCatatanForm ? (
					<form onSubmit={handleSaveCatatan} className="p-4">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
							<div>
								<label className="block text-xs font-medium text-gray-600 mb-1">
									Tinggi Badan
								</label>
								<input
									type="text"
									value={tinggi}
									onChange={(e) => setTinggi(e.target.value)}
									className="w-full px-3 py-2 border rounded text-sm"
									placeholder="cm"
								/>
							</div>
							<div>
								<label className="block text-xs font-medium text-gray-600 mb-1">
									Berat Badan
								</label>
								<input
									type="text"
									value={berat}
									onChange={(e) => setBerat(e.target.value)}
									className="w-full px-3 py-2 border rounded text-sm"
									placeholder="kg"
								/>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
							<div>
								<label className="block text-xs font-medium text-gray-600 mb-1">
									Sakit
								</label>
								<input
									type="number"
									value={sakit}
									onChange={(e) => setSakit(Number(e.target.value))}
									className="w-full px-3 py-2 border rounded text-sm"
								/>
							</div>
							<div>
								<label className="block text-xs font-medium text-gray-600 mb-1">
									Izin
								</label>
								<input
									type="number"
									value={izin}
									onChange={(e) => setIzin(Number(e.target.value))}
									className="w-full px-3 py-2 border rounded text-sm"
								/>
							</div>
							<div>
								<label className="block text-xs font-medium text-gray-600 mb-1">
									Alpha
								</label>
								<input
									type="number"
									value={alpha}
									onChange={(e) => setAlpha(Number(e.target.value))}
									className="w-full px-3 py-2 border rounded text-sm"
								/>
							</div>
						</div>
						<div className="mb-4">
							<label className="block text-xs font-medium text-gray-600 mb-1">
								Catatan Wali Kelas
							</label>
							<textarea
								value={catatanWali}
								onChange={(e) => setCatatanWali(e.target.value)}
								className="w-full px-3 py-2 border rounded text-sm"
								rows={3}
							/>
						</div>
						<div className="mb-4">
							<label className="block text-xs font-medium text-gray-600 mb-1">
								Catatan Orang Tua
							</label>
							<textarea
								value={catatanOrtu}
								onChange={(e) => setCatatanOrtu(e.target.value)}
								className="w-full px-3 py-2 border rounded text-sm"
								rows={3}
							/>
						</div>
						<button
							type="submit"
							className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
						>
							Simpan Catatan
						</button>
					</form>
				) : (
					<div className="p-4">
						<div className="grid grid-cols-3 gap-4 mb-4">
							<div>
								<span className="text-xs text-gray-500">Tinggi:</span>{" "}
								<span className="text-sm">{catatan?.tinggi_badan || "-"}</span>
							</div>
							<div>
								<span className="text-xs text-gray-500">Berat:</span>{" "}
								<span className="text-sm">{catatan?.berat_badan || "-"}</span>
							</div>
						</div>
						<div className="grid grid-cols-3 gap-4 mb-4">
							<div>
								<span className="text-xs text-gray-500">Sakit:</span>{" "}
								<span className="text-sm">{catatan?.jumlah_sakit || 0}</span>
							</div>
							<div>
								<span className="text-xs text-gray-500">Izin:</span>{" "}
								<span className="text-sm">{catatan?.jumlah_izin || 0}</span>
							</div>
							<div>
								<span className="text-xs text-gray-500">Alpha:</span>{" "}
								<span className="text-sm">{catatan?.jumlah_alpha || 0}</span>
							</div>
						</div>
						<div className="mb-3">
							<span className="text-xs text-gray-500 block mb-1">
								Catatan Wali Kelas:
							</span>
							<p className="text-sm bg-gray-50 p-3 rounded">
								{catatan?.catatan_wali_kelas || "-"}
							</p>
						</div>
						<div>
							<span className="text-xs text-gray-500 block mb-1">
								Catatan Orang Tua:
							</span>
							<p className="text-sm bg-gray-50 p-3 rounded">
								{catatan?.catatan_ortu || "-"}
							</p>
						</div>
					</div>
				)}
			</div>
		</AdminLayout>
	);
}
