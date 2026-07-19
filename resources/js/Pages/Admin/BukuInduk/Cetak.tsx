import { Head, usePage } from "@inertiajs/inertia-react";
import { Printer, FileDown, ArrowLeft } from "lucide-react";

export default function Cetak() {
    const { siswa, bukuInduk, rekamMedis, orangTua, mutasi, namaSekolah, namaKepalaSekolah } =
        usePage().props as any;

    return (
        <>
            <Head title={`Cetak - ${siswa.nama_lengkap}`} />
            <style
                dangerouslySetInnerHTML={{
                    __html: `@media print { @page { size: A4 portrait; margin: 15mm; } .no-print { display: none !important; } }`,
                }}
            />

            <div className="no-print p-4 bg-primary/5 border-b text-center">
                <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                    <Printer className="h-4 w-4" /> Cetak / Simpan PDF
                </button>
                <a
                    href={route("buku-induk.cetak-pdf", siswa.id)}
                    target="_blank"
                    className="ml-2 inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5"
                >
                    <FileDown className="h-4 w-4" /> Download PDF (Server)
                </a>
                <a
                    href={route("buku-induk.show", siswa.id)}
                    className="ml-2 inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                    <ArrowLeft className="h-4 w-4" /> Kembali
                </a>
            </div>

            <div className="print:p-0 max-w-4xl mx-auto bg-white p-8 lg:p-12 my-6 print:my-0 shadow print:shadow-none">
                <header className="text-center border-b-2 border-gray-900 pb-3 mb-6">
                    <h1 className="text-xl font-bold uppercase">
                        Buku Induk Siswa
                    </h1>
                    <p className="text-sm">Sekolah: {namaSekolah || "________________________________________"}</p>
                </header>

                <Section title="IDENTITAS SISWA">
                    <Row label="Nama Lengkap" v={siswa.nama_lengkap} />
                    <Row label="NISN" v={siswa.nisn} />
                    <Row label="NIS" v={siswa.nis} />
                    <Row
                        label="Tempat/Tgl Lahir"
                        v={`${siswa.tempat_lahir}, ${siswa.tanggal_lahir}`}
                    />
                    <Row
                        label="Jenis Kelamin"
                        v={
                            siswa.jenis_kelamin === "L"
                                ? "Laki-laki"
                                : "Perempuan"
                        }
                    />
                    <Row label="Agama" v={bukuInduk?.agama} />
                    <Row label="Anak ke-" v={bukuInduk?.anak_ke} />
                    <Row label="Jumlah Saudara" v={bukuInduk?.jumlah_saudara} />
                    <Row label="Alamat" v={siswa.alamat} full />
                </Section>

                <Section title="DATA ORANG TUA / WALI">
                    {!orangTua || orangTua.length === 0 ? (
                        <p className="text-sm italic">Belum ada data.</p>
                    ) : (
                        <table className="w-full text-sm border-collapse border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 px-2 py-1 text-left">
                                        Hubungan
                                    </th>
                                    <th className="border border-gray-300 px-2 py-1 text-left">
                                        Nama
                                    </th>
                                    <th className="border border-gray-300 px-2 py-1 text-left">
                                        Pekerjaan
                                    </th>
                                    <th className="border border-gray-300 px-2 py-1 text-left">
                                        Pendidikan
                                    </th>
                                    <th className="border border-gray-300 px-2 py-1 text-left">
                                        No HP
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orangTua.map((o: any) => (
                                    <tr key={o.id}>
                                        <td className="border border-gray-300 px-2 py-1">
                                            {o.hubungan}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1">
                                            {o.nama_lengkap}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1">
                                            {o.pekerjaan || "-"}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1">
                                            {o.pendidikan_terakhir || "-"}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1">
                                            {o.no_hp || "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </Section>

                <Section title="REKAM MEDIS">
                    <Row
                        label="Golongan Darah"
                        v={rekamMedis?.golongan_darah}
                    />
                    <Row label="Alergi" v={rekamMedis?.alergi} />
                    <Row
                        label="Penyakit Terdahulu"
                        v={rekamMedis?.penyakit_terdahulu}
                    />
                    <Row
                        label="Berat Badan (kg)"
                        v={bukuInduk?.berat_badan_kg}
                    />
                    <Row
                        label="Tinggi Badan (cm)"
                        v={bukuInduk?.tinggi_badan_cm}
                    />
                </Section>

                <Section title="RIWAYAT MUTASI">
                    {!mutasi || mutasi.length === 0 ? (
                        <p className="text-sm italic">
                            Tidak ada riwayat mutasi.
                        </p>
                    ) : (
                        <table className="w-full text-sm border-collapse border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 px-2 py-1 text-left">
                                        Tanggal
                                    </th>
                                    <th className="border border-gray-300 px-2 py-1 text-left">
                                        Jenis
                                    </th>
                                    <th className="border border-gray-300 px-2 py-1 text-left">
                                        Sekolah
                                    </th>
                                    <th className="border border-gray-300 px-2 py-1 text-left">
                                        Alasan
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {mutasi.map((m: any) => (
                                    <tr key={m.id}>
                                        <td className="border border-gray-300 px-2 py-1">
                                            {m.tanggal_mutasi}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1 capitalize">
                                            {m.jenis}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1">
                                            {m.jenis === "masuk"
                                                ? m.asal_sekolah || "-"
                                                : m.sekolah_tujuan || "-"}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1">
                                            {m.alasan}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </Section>

                <footer className="mt-12 text-sm print:mt-16">
                    <div className="text-right">
                        <p className="mb-16">____________________________</p>
                        <p>Kepala Sekolah</p>
                        {namaKepalaSekolah ? (
                            <p className="text-xs mt-1 font-medium">{namaKepalaSekolah}</p>
                        ) : null}
                    </div>
                </footer>
            </div>
        </>
    );
}

function Section({ title, children }: any) {
    return (
        <section className="mb-6">
            <h2 className="text-sm font-bold uppercase mb-2 border-b border-gray-300 pb-1">
                {title}
            </h2>
            {children}
        </section>
    );
}
function Row({ label, v, full }: any) {
    return (
        <div
            className={
                "grid grid-cols-12 gap-2 text-sm py-0.5 " + (full ? "" : "")
            }
        >
            <div className="col-span-4 font-medium">{label}</div>
            <div className="col-span-8">: {v || "-"}</div>
        </div>
    );
}
