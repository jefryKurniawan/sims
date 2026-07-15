import { Head } from "@/Layout/Head";

export default function Show({ calonSiswa }: { calonSiswa: any }) {
    return (
        <>
            <Head title="Calon Siswa Detail" />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Detail Calon Siswa
                </h1>
                <div className="space-y-4">
                    <div>
                        <p className="font-semibold text-gray-700">NISN</p>
                        <p className="text-gray-900">
                            {calonSiswa.nisn ?? "-"}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">
                            Nama Lengkap
                        </p>
                        <p className="text-gray-900">
                            {calonSiswa.nama_lengkap ?? "-"}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">
                            Tempat Lahir
                        </p>
                        <p className="text-gray-900">
                            {calonSiswa.tempat_lahir ?? "-"}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">
                            Tanggal Lahir
                        </p>
                        <p className="text-gray-900">
                            {calonSiswa.tanggal_lahir
                                ? new Date(
                                      calonSiswa.tanggal_lahir,
                                  ).toLocaleDateString()
                                : "-"}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">
                            Jenis Kelamin
                        </p>
                        <p className="text-gray-900">
                            {calonSiswa.jenis_kelamin === "L"
                                ? "Laki-laki"
                                : calonSiswa.jenis_kelamin === "P"
                                  ? "Perempuan"
                                  : "-"}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Alamat</p>
                        <p className="text-gray-900">
                            {calonSiswa.alamat ?? "-"}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">No HP</p>
                        <p className="text-gray-900">
                            {calonSiswa.no_hp ?? "-"}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Email</p>
                        <p className="text-gray-900">
                            {calonSiswa.email ?? "-"}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">
                            Nama Orang Tua
                        </p>
                        <p className="text-gray-900">
                            {calonSiswa.nama_ortu ?? "-"}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">
                            No HP Orang Tua
                        </p>
                        <p className="text-gray-900">
                            {calonSiswa.no_hp_ortu ?? "-"}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">
                            Asal Sekolah
                        </p>
                        <p className="text-gray-900">
                            {calonSiswa.asal_sekolah ?? "-"}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Prestasi</p>
                        <p className="text-gray-900">
                            {calonSiswa.prestasi ?? "-"}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">
                            Biaya Pendaftaran
                        </p>
                        <p className="text-gray-900">
                            Rp{" "}
                            {Number(
                                calonSiswa.biaya_pendaftaran,
                            ).toLocaleString("id-ID")}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Status</p>
                        <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${calonSiswa.status === "pendaftaran" ? "bg-yellow-100 text-yellow-700" : calonSiswa.status === "seleksi" ? "bg-blue-100 text-blue-700" : calonSiswa.status === "lulus" ? "bg-green-100 text-green-700" : "bg-destructive/10 text-destructive"}`}
                        >
                            {calonSiswa.status === "pendaftaran"
                                ? "Pendaftaran"
                                : calonSiswa.status === "seleksi"
                                  ? "Seleksi"
                                  : calonSiswa.status === "lulus"
                                    ? "Lulus"
                                    : "Tidak Lulus"}
                        </span>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Keputusan</p>
                        <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${calonSiswa.keputusan === "belum" ? "bg-gray-100 text-gray-700" : calonSiswa.keputusan === "diterima" ? "bg-green-100 text-green-700" : "bg-destructive/10 text-destructive"}`}
                        >
                            {calonSiswa.keputusan === "belum"
                                ? "Belum"
                                : calonSiswa.keputusan === "diterima"
                                  ? "Diterima"
                                  : "Ditolak"}
                        </span>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">
                            Tanggal Daftar
                        </p>
                        <p className="text-gray-900">
                            {calonSiswa.tanggal_daftar
                                ? new Date(
                                      calonSiswa.tanggal_daftar,
                                  ).toLocaleDateString()
                                : "-"}
                        </p>
                    </div>
                    {calonSiswa.jurusan && calonSiswa.catatan && (
                        <div>
                            <p className="font-semibold text-gray-700">
                                Catatan
                            </p>
                            <p className="text-gray-900 whitespace-pre-line">
                                {calonSiswa.catatan}
                            </p>
                        </div>
                    )}
                    {calonSiswa.jurusan && (
                        <div>
                            <p className="font-semibold text-gray-700">
                                Jurusan
                            </p>
                            <p className="text-gray-900">
                                {calonSiswa.jurusan.nama ?? "-"}
                            </p>
                        </div>
                    )}
                    {calonSiswa.gelombang && (
                        <div>
                            <p className="font-semibold text-gray-700">
                                Gelombang
                            </p>
                            <p className="text-gray-900">
                                {calonSiswa.gelombang.nama ?? "-"}
                            </p>
                        </div>
                    )}
                </div>
                <div className="mt-6">
                    <a href="/" className="text-blue-600 hover:underline">
                        Kembali ke Daftar Calon Siswa
                    </a>
                </div>
            </div>
        </>
    );
}
