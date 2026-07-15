import { usePage, Link } from "@inertiajs/inertia-react";
import AdminLayout from "@/Layout/AdminLayout";

export default function Show() {
    const { data } = usePage().props;
    const { applicant, flash } = data;

    const getStatusBadge = (status: string) => {
        const classes: Record<string, string> = {
            draft: "bg-gray-100 text-gray-700",
            submitted: "bg-blue-100 text-blue-700",
            verifikasi_berkas: "bg-yellow-100 text-yellow-700",
            lulus_seleksi: "bg-green-100 text-green-700",
            diterima: "bg-green-100 text-green-700",
            ditolak: "bg-destructive/10 text-destructive",
        };
        return classes[status] || "bg-gray-100 text-gray-700";
    };

    return (
        <AdminLayout title="Detail Pendaftar SPMB">
            <div className="p-6">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <Link
                            href={route("spmb.applicant.index")}
                            className="text-sm text-blue-600 hover:underline mb-2 inline-block"
                        >
                            &larr; Kembali
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {applicant.nama_lengkap}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {applicant.nomor_registrasi} | {applicant.nisn}
                        </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span
                            className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadge(applicant.status_pendaftaran)}`}
                        >
                            {applicant.status_pendaftaran?.replace(/_/g, " ")}
                        </span>
                        <Link
                            href={route("spmb.applicant.edit", applicant.id)}
                            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-primary/20 rounded-lg hover:bg-gray-50"
                        >
                            Edit
                        </Link>
                    </div>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        {flash.success}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Data Pribadi */}
                    <div className="lg:col-span-2 bg-white rounded-lg border p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">
                            Data Pribadi
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Nama Lengkap
                                </p>
                                <p className="font-medium text-gray-800">
                                    {applicant.nama_lengkap}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">NISN</p>
                                <p className="font-medium text-gray-800">
                                    {applicant.nisn}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Tempat, Tanggal Lahir
                                </p>
                                <p className="font-medium text-gray-800">
                                    {applicant.tempat_lahir},{" "}
                                    {new Date(
                                        applicant.tanggal_lahir,
                                    ).toLocaleDateString("id-ID")}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Jenis Kelamin
                                </p>
                                <p className="font-medium text-gray-800">
                                    {applicant.jenis_kelamin === "L"
                                        ? "Laki-laki"
                                        : "Perempuan"}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-gray-500">Alamat</p>
                                <p className="font-medium text-gray-800">
                                    {applicant.alamat}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">No. HP</p>
                                <p className="font-medium text-gray-800">
                                    {applicant.no_hp}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium text-gray-800">
                                    {applicant.email || "-"}
                                </p>
                            </div>
                        </div>

                        <h2 className="text-lg font-bold text-gray-800 mb-4 mt-6">
                            Data Pendidikan
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Asal Sekolah
                                </p>
                                <p className="font-medium text-gray-800">
                                    {applicant.asal_sekolah}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">NPSN</p>
                                <p className="font-medium text-gray-800">
                                    {applicant.npsn_sekolah || "-"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Jurusan</p>
                                <p className="font-medium text-gray-800">
                                    {applicant.jurusan_sekolah || "-"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Tahun Lulus
                                </p>
                                <p className="font-medium text-gray-800">
                                    {applicant.tahun_lulus || "-"}
                                </p>
                            </div>
                        </div>

                        <h2 className="text-lg font-bold text-gray-800 mb-4 mt-6">
                            Data Orang Tua
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Ayah</p>
                                <p className="font-medium text-gray-800">
                                    {applicant.nama_ayah || "-"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Ibu</p>
                                <p className="font-medium text-gray-800">
                                    {applicant.nama_ibu || "-"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Pekerjaan Ayah
                                </p>
                                <p className="font-medium text-gray-800">
                                    {applicant.pekerjaan_ayah || "-"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Pekerjaan Ibu
                                </p>
                                <p className="font-medium text-gray-800">
                                    {applicant.pekerjaan_ibu || "-"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Penghasilan
                                </p>
                                <p className="font-medium text-gray-800">
                                    {applicant.penghasilan_ortu || "-"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    No. HP Orang Tua
                                </p>
                                <p className="font-medium text-gray-800">
                                    {applicant.no_hp_ortu || "-"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        {/* Status Info */}
                        <div className="bg-white rounded-lg border p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">
                                Informasi Pendaftaran
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Jalur
                                    </p>
                                    <p className="font-medium text-gray-800 capitalize">
                                        {applicant.jalur_pendaftaran}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Status
                                    </p>
                                    <span
                                        className={`px-3 py-1 text-sm font-medium rounded-full inline-block ${getStatusBadge(applicant.status_pendaftaran)}`}
                                    >
                                        {applicant.status_pendaftaran?.replace(
                                            /_/g,
                                            " ",
                                        )}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Tanggal Daftar
                                    </p>
                                    <p className="font-medium text-gray-800">
                                        {new Date(
                                            applicant.created_at,
                                        ).toLocaleDateString("id-ID")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Token
                                    </p>
                                    <p className="font-mono text-xs text-gray-800">
                                        {applicant.token_pendaftaran}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Afirmasi */}
                        {applicant.afirmasi && (
                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">
                                    Data Afirmasi
                                </h2>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Jenis
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {applicant.afirmasi.jenis}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Nomor Kartu
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {applicant.afirmasi.nomor_kartu}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Ranking */}
                        {applicant.ranking && (
                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">
                                    Hasil Seleksi
                                </h2>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Skor Total
                                        </p>
                                        <p className="font-bold text-xl text-blue-600">
                                            {Number(
                                                applicant.ranking.skor_total,
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Peringkat
                                        </p>
                                        <p className="font-bold text-lg text-gray-800">
                                            #{applicant.ranking.peringkat}
                                        </p>
                                    </div>
                                    {applicant.ranking.keterangan && (
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Keterangan
                                            </p>
                                            <p className="font-medium text-gray-800">
                                                {applicant.ranking.keterangan}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Prestasi */}
                        {applicant.prestasi?.length > 0 && (
                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">
                                    Prestasi ({applicant.prestasi.length})
                                </h2>
                                <div className="space-y-2">
                                    {applicant.prestasi.map((p: any) => (
                                        <div
                                            key={p.id}
                                            className="border-b pb-2 last:border-0"
                                        >
                                            <p className="font-medium text-gray-800">
                                                {p.nama_prestasi}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {p.jenis} - {p.tingkat}{" "}
                                                (Peringkat {p.peringkat})
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TKA */}
                        {applicant.tka && (
                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">
                                    Nilai TKA
                                </h2>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Matematika
                                        </span>
                                        <span className="font-medium text-gray-800">
                                            {applicant.tka.matematika}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            IPA
                                        </span>
                                        <span className="font-medium text-gray-800">
                                            {applicant.tka.ipa}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Bahasa Indonesia
                                        </span>
                                        <span className="font-medium text-gray-800">
                                            {applicant.tka.bahasa_indonesia}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Bahasa Inggris
                                        </span>
                                        <span className="font-medium text-gray-800">
                                            {applicant.tka.bahasa_inggris}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Penalaran
                                        </span>
                                        <span className="font-medium text-gray-800">
                                            {applicant.tka.penalaran}
                                        </span>
                                    </div>
                                    <div className="border-t pt-2 flex justify-between font-bold">
                                        <span className="text-gray-800">
                                            Skor IQ
                                        </span>
                                        <span className="text-gray-800">
                                            {applicant.tka.skor_iq}
                                        </span>
                                    </div>
                                    <div className="flex justify-between font-bold text-blue-600">
                                        <span>Total</span>
                                        <span>{applicant.tka.total}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Nilai Akademik */}
                        {applicant.nilai_akademik?.length > 0 && (
                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">
                                    Nilai Akademik (
                                    {applicant.nilai_akademik.length})
                                </h2>
                                <div className="space-y-2">
                                    {applicant.nilai_akademik.map((n: any) => (
                                        <div
                                            key={n.id}
                                            className="flex justify-between text-sm"
                                        >
                                            <span className="text-gray-500">
                                                {n.mata_pelajaran}
                                            </span>
                                            <span className="font-medium text-gray-800">
                                                {n.nilai}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
