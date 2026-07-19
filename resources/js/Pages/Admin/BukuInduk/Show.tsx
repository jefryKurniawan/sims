import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import {
    ArrowLeft,
    User,
    Heart,
    Users,
    ArrowLeftRight,
    FileDown,
    Save,
    Plus,
    Trash2,
} from "lucide-react";

type Tab = "profil" | "medis" | "orang-tua" | "mutasi";

export default function Show() {
    const {
        siswa,
        bukuInduk,
        rekamMedis,
        orangTua,
        mutasi,
        pendidikanOptions,
        penghasilanOptions,
        agamaOptions,
        transportasiOptions,
        golonganDarahOptions,
        hubunganOptions,
        statusPernikahanOptions,
        flash,
    } = usePage().props as any;

    const [tab, setTab] = useState<Tab>("profil");

    const tabs = [
        { id: "profil" as Tab, label: "Profil", icon: User },
        { id: "medis" as Tab, label: "Rekam Medis", icon: Heart },
        {
            id: "orang-tua" as Tab,
            label: "Orang Tua / Wali",
            icon: Users,
            count: (orangTua || []).length,
        },
        {
            id: "mutasi" as Tab,
            label: "Mutasi",
            icon: ArrowLeftRight,
            count: (mutasi || []).length,
        },
    ];

    return (
        <>
            <Head title={`Buku Induk - ${siswa.nama_lengkap}`} />
            <div className="p-4 lg:p-6">
                {/* Header */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                        <Link
                            href={route("buku-induk.index")}
                            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary mb-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke daftar
                        </Link>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                            {siswa.nama_lengkap}
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            NISN {siswa.nisn} · NIS {siswa.nis} ·{" "}
                            {siswa.jenis_kelamin === "L"
                                ? "Laki-laki"
                                : "Perempuan"}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <a
                            href={route("buku-induk.cetak-pdf", siswa.id)}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/5"
                        >
                            <FileDown className="h-4 w-4" />
                            Download PDF
                        </a>
                    </div>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-3 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                        {flash.success}
                    </div>
                )}

                {/* Tabs */}
                <div className="border-b flex gap-2 mb-4 overflow-x-auto">
                    {tabs.map((t) => {
                        const Icon = t.icon;
                        const active = tab === t.id;
                        return (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                type="button"
                                className={
                                    "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition " +
                                    (active
                                        ? "border-primary text-primary"
                                        : "border-transparent text-gray-600 hover:text-gray-900")
                                }
                            >
                                <Icon className="h-4 w-4" />
                                {t.label}
                                {typeof t.count === "number" && (
                                    <span
                                        className={
                                            "inline-flex items-center justify-center min-w-[20px] px-1.5 py-0.5 text-xs rounded-full " +
                                            (active
                                                ? "bg-primary/15 text-primary"
                                                : "bg-gray-100 text-gray-600")
                                        }
                                    >
                                        {t.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {tab === "profil" && (
                    <ProfilTab
                        siswa={siswa}
                        bukuInduk={bukuInduk}
                        agamaOptions={agamaOptions}
                        transportasiOptions={transportasiOptions}
                    />
                )}
                {tab === "medis" && (
                    <MedisTab
                        siswa={siswa}
                        rekamMedis={rekamMedis}
                        golonganDarahOptions={golonganDarahOptions}
                    />
                )}
                {tab === "orang-tua" && (
                    <OrangTuaTab
                        siswa={siswa}
                        orangTua={orangTua || []}
                        hubunganOptions={hubunganOptions}
                        pendidikanOptions={pendidikanOptions}
                        penghasilanOptions={penghasilanOptions}
                        statusPernikahanOptions={statusPernikahanOptions}
                    />
                )}
                {tab === "mutasi" && (
                    <MutasiTab siswa={siswa} mutasi={mutasi || []} />
                )}
            </div>
        </>
    );
}

function ProfilTab({
    siswa,
    bukuInduk,
    agamaOptions,
    transportasiOptions,
}: any) {
    const [editing, setEditing] = useState(false);
    const initial = {
        agama: bukuInduk?.agama ?? "",
        anak_ke: bukuInduk?.anak_ke ?? "",
        jumlah_saudara: bukuInduk?.jumlah_saudara ?? "",
        bahasa_sehari_hari: bukuInduk?.bahasa_sehari_hari ?? "",
        transportasi: bukuInduk?.transportasi ?? "",
        jarak_rumah_sekolah_km: bukuInduk?.jarak_rumah_sekolah_km ?? "",
        hobi: bukuInduk?.hobi ?? "",
        cita_cita: bukuInduk?.cita_cita ?? "",
        berat_badan_kg: bukuInduk?.berat_badan_kg ?? "",
        tinggi_badan_cm: bukuInduk?.tinggi_badan_cm ?? "",
        kebutuhan_khusus: bukuInduk?.kebutuhan_khusus ?? "",
    };
    const [data, setData] = useState<any>(initial);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post(route("buku-induk.update-profil", siswa.id), data, {
            onSuccess: () => setEditing(false),
        });
    };

    if (!editing) {
        return (
            <div className="bg-white rounded-lg border p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Profil Tambahan</h2>
                    <button
                        type="button"
                        onClick={() => setEditing(true)}
                        className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                        Edit
                    </button>
                </div>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <Field label="Agama" v={bukuInduk?.agama} />
                    <Field label="Anak ke-" v={bukuInduk?.anak_ke} />
                    <Field
                        label="Jumlah Saudara"
                        v={bukuInduk?.jumlah_saudara}
                    />
                    <Field
                        label="Bahasa Sehari-hari"
                        v={bukuInduk?.bahasa_sehari_hari}
                    />
                    <Field label="Transportasi" v={bukuInduk?.transportasi} />
                    <Field
                        label="Jarak Rumah-Sekolah (km)"
                        v={bukuInduk?.jarak_rumah_sekolah_km}
                    />
                    <Field label="Hobi" v={bukuInduk?.hobi} />
                    <Field label="Cita-cita" v={bukuInduk?.cita_cita} />
                    <Field
                        label="Berat Badan (kg)"
                        v={bukuInduk?.berat_badan_kg}
                    />
                    <Field
                        label="Tinggi Badan (cm)"
                        v={bukuInduk?.tinggi_badan_cm}
                    />
                    <Field
                        label="Kebutuhan Khusus"
                        v={bukuInduk?.kebutuhan_khusus}
                        full
                    />
                </dl>
                {!bukuInduk && (
                    <p className="text-sm text-gray-500 mt-4">
                        Belum ada data. Klik Edit untuk mengisi
                    </p>
                )}
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg border p-6"
        >
            <h2 className="text-lg font-semibold mb-4">Profil Tambahan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                    label="Agama"
                    value={data.agama}
                    onChange={(v) => setData({ ...data, agama: v })}
                    options={agamaOptions}
                />
                <Input
                    label="Anak ke-"
                    type="number"
                    value={data.anak_ke}
                    onChange={(v) => setData({ ...data, anak_ke: v })}
                />
                <Input
                    label="Jumlah Saudara"
                    type="number"
                    value={data.jumlah_saudara}
                    onChange={(v) => setData({ ...data, jumlah_saudara: v })}
                />
                <Input
                    label="Bahasa Sehari-hari"
                    value={data.bahasa_sehari_hari}
                    onChange={(v) =>
                        setData({ ...data, bahasa_sehari_hari: v })
                    }
                />
                <Select
                    label="Transportasi"
                    value={data.transportasi}
                    onChange={(v) => setData({ ...data, transportasi: v })}
                    options={transportasiOptions}
                />
                <Input
                    label="Jarak Rumah-Sekolah (km)"
                    type="number"
                    value={data.jarak_rumah_sekolah_km}
                    onChange={(v) =>
                        setData({ ...data, jarak_rumah_sekolah_km: v })
                    }
                />
                <Input
                    label="Hobi"
                    value={data.hobi}
                    onChange={(v) => setData({ ...data, hobi: v })}
                />
                <Input
                    label="Cita-cita"
                    value={data.cita_cita}
                    onChange={(v) => setData({ ...data, cita_cita: v })}
                />
                <Input
                    label="Berat Badan (kg)"
                    type="number"
                    value={data.berat_badan_kg}
                    onChange={(v) => setData({ ...data, berat_badan_kg: v })}
                />
                <Input
                    label="Tinggi Badan (cm)"
                    type="number"
                    value={data.tinggi_badan_cm}
                    onChange={(v) => setData({ ...data, tinggi_badan_cm: v })}
                />
                <Textarea
                    label="Kebutuhan Khusus"
                    value={data.kebutuhan_khusus}
                    onChange={(v) => setData({ ...data, kebutuhan_khusus: v })}
                    full
                />
            </div>
            <div className="flex gap-2 mt-4">
                <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90"
                >
                    <Save className="h-4 w-4" />
                    Simpan
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setData(initial);
                        setEditing(false);
                    }}
                    className="px-4 py-2 border rounded-lg text-sm"
                >
                    Batal
                </button>
            </div>
        </form>
    );
}

function MedisTab({ siswa, rekamMedis, golonganDarahOptions }: any) {
    const [editing, setEditing] = useState(false);
    const initial = {
        golongan_darah: rekamMedis?.golongan_darah ?? "",
        alergi: rekamMedis?.alergi ?? "",
        penyakit_terdahulu: rekamMedis?.penyakit_terdahulu ?? "",
        obat_rutin: rekamMedis?.obat_rutin ?? "",
        nama_dokter: rekamMedis?.nama_dokter ?? "",
        rumah_sakit_rujukan: rekamMedis?.rumah_sakit_rujukan ?? "",
        kontak_darurat_nama: rekamMedis?.kontak_darurat_nama ?? "",
        kontak_darurat_hp: rekamMedis?.kontak_darurat_hp ?? "",
        kontak_darurat_hubungan: rekamMedis?.kontak_darurat_hubungan ?? "",
    };
    const [data, setData] = useState<any>(initial);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post(route("buku-induk.update-rekam-medis", siswa.id), data, {
            onSuccess: () => setEditing(false),
        });
    };

    if (!editing) {
        return (
            <div className="bg-white rounded-lg border p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Heart className="h-5 w-5 text-rose-500" />
                        Rekam Medis
                    </h2>
                    <button
                        type="button"
                        onClick={() => setEditing(true)}
                        className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                        Edit
                    </button>
                </div>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <Field
                        label="Golongan Darah"
                        v={rekamMedis?.golongan_darah}
                    />
                    <Field label="Alergi" v={rekamMedis?.alergi} />
                    <Field
                        label="Penyakit Terdahulu"
                        v={rekamMedis?.penyakit_terdahulu}
                    />
                    <Field label="Obat Rutin" v={rekamMedis?.obat_rutin} />
                    <Field label="Nama Dokter" v={rekamMedis?.nama_dokter} />
                    <Field
                        label="RS Rujukan"
                        v={rekamMedis?.rumah_sakit_rujukan}
                    />
                    <Field
                        label="Kontak Darurat (Nama)"
                        v={rekamMedis?.kontak_darurat_nama}
                    />
                    <Field
                        label="Kontak Darurat (HP)"
                        v={rekamMedis?.kontak_darurat_hp}
                    />
                    <Field
                        label="Hubungan"
                        v={rekamMedis?.kontak_darurat_hubungan}
                    />
                </dl>
                {!rekamMedis && (
                    <p className="text-sm text-gray-500 mt-4">
                        Belum ada data. Klik Edit untuk mengisi
                    </p>
                )}
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg border p-6"
        >
            <h2 className="text-lg font-semibold mb-4">Rekam Medis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                    label="Golongan Darah"
                    value={data.golongan_darah}
                    onChange={(v) => setData({ ...data, golongan_darah: v })}
                    options={golonganDarahOptions}
                />
                <Input
                    label="Nama Dokter"
                    value={data.nama_dokter}
                    onChange={(v) => setData({ ...data, nama_dokter: v })}
                />
                <Input
                    label="RS Rujukan"
                    value={data.rumah_sakit_rujukan}
                    onChange={(v) =>
                        setData({ ...data, rumah_sakit_rujukan: v })
                    }
                />
                <Input
                    label="Kontak Darurat (Nama)"
                    value={data.kontak_darurat_nama}
                    onChange={(v) =>
                        setData({ ...data, kontak_darurat_nama: v })
                    }
                />
                <Input
                    label="Kontak Darurat (HP)"
                    value={data.kontak_darurat_hp}
                    onChange={(v) => setData({ ...data, kontak_darurat_hp: v })}
                />
                <Input
                    label="Hubungan"
                    value={data.kontak_darurat_hubungan}
                    onChange={(v) =>
                        setData({ ...data, kontak_darurat_hubungan: v })
                    }
                />
                <Textarea
                    label="Alergi"
                    value={data.alergi}
                    onChange={(v) => setData({ ...data, alergi: v })}
                />
                <Textarea
                    label="Penyakit Terdahulu"
                    value={data.penyakit_terdahulu}
                    onChange={(v) =>
                        setData({ ...data, penyakit_terdahulu: v })
                    }
                />
                <Textarea
                    label="Obat Rutin"
                    value={data.obat_rutin}
                    onChange={(v) => setData({ ...data, obat_rutin: v })}
                    full
                />
            </div>
            <div className="flex gap-2 mt-4">
                <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90"
                >
                    <Save className="h-4 w-4" />
                    Simpan
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setData(initial);
                        setEditing(false);
                    }}
                    className="px-4 py-2 border rounded-lg text-sm"
                >
                    Batal
                </button>
            </div>
        </form>
    );
}

function OrangTuaTab({
    siswa,
    orangTua,
    hubunganOptions,
    pendidikanOptions,
    penghasilanOptions,
    statusPernikahanOptions,
}: any) {
    const [showForm, setShowForm] = useState(false);
    const [empty, setEmpty] = useState({
        hubungan: "Ayah",
        nama_lengkap: "",
        nik: "",
        npwp: "",
        tanggal_lahir: "",
        pendidikan_terakhir: "",
        pekerjaan: "",
        penghasilan_bulanan: "",
        status_pernikahan: "",
        jumlah_tanggungan: "",
        no_hp: "",
        email: "",
        alamat: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post(route("buku-induk.store-orang-tua", siswa.id), empty, {
            onSuccess: () => {
                setShowForm(false);
            },
        });
    };

    const del = (id: number) => {
        if (confirm("Hapus data orang tua/wali ini?")) {
            Inertia.delete(
                route("buku-induk.destroy-orang-tua", [siswa.id, id]),
            );
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">
                    Orang Tua / Wali ({orangTua.length})
                </h2>
                {!showForm && (
                    <button
                        type="button"
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah
                    </button>
                )}
            </div>

            {showForm && (
                <form
                    onSubmit={submit}
                    className="bg-white rounded-lg border p-6 mb-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Select
                            label="Hubungan"
                            value={empty.hubungan}
                            onChange={(v) =>
                                setEmpty({ ...empty, hubungan: v })
                            }
                            options={hubunganOptions}
                            required
                        />
                        <Input
                            label="Nama Lengkap"
                            value={empty.nama_lengkap}
                            onChange={(v) =>
                                setEmpty({ ...empty, nama_lengkap: v })
                            }
                            required
                        />
                        <Input
                            label="NIK"
                            value={empty.nik}
                            onChange={(v) => setEmpty({ ...empty, nik: v })}
                        />
                        <Input
                            label="NPWP"
                            value={empty.npwp}
                            onChange={(v) => setEmpty({ ...empty, npwp: v })}
                        />
                        <Input
                            label="Tanggal Lahir"
                            type="date"
                            value={empty.tanggal_lahir}
                            onChange={(v) =>
                                setEmpty({ ...empty, tanggal_lahir: v })
                            }
                        />
                        <Select
                            label="Pendidikan"
                            value={empty.pendidikan_terakhir}
                            onChange={(v) =>
                                setEmpty({ ...empty, pendidikan_terakhir: v })
                            }
                            options={pendidikanOptions}
                        />
                        <Input
                            label="Pekerjaan"
                            value={empty.pekerjaan}
                            onChange={(v) =>
                                setEmpty({ ...empty, pekerjaan: v })
                            }
                        />
                        <Select
                            label="Penghasilan"
                            value={empty.penghasilan_bulanan}
                            onChange={(v) =>
                                setEmpty({ ...empty, penghasilan_bulanan: v })
                            }
                            options={penghasilanOptions}
                        />
                        <Select
                            label="Status Pernikahan"
                            value={empty.status_pernikahan}
                            onChange={(v) =>
                                setEmpty({ ...empty, status_pernikahan: v })
                            }
                            options={statusPernikahanOptions}
                        />
                        <Input
                            label="Jumlah Tanggungan"
                            type="number"
                            value={empty.jumlah_tanggungan}
                            onChange={(v) =>
                                setEmpty({ ...empty, jumlah_tanggungan: v })
                            }
                        />
                        <Input
                            label="No HP"
                            value={empty.no_hp}
                            onChange={(v) => setEmpty({ ...empty, no_hp: v })}
                        />
                        <Input
                            label="Email"
                            type="email"
                            value={empty.email}
                            onChange={(v) => setEmpty({ ...empty, email: v })}
                        />
                        <Textarea
                            label="Alamat"
                            value={empty.alamat}
                            onChange={(v) => setEmpty({ ...empty, alamat: v })}
                            full
                        />
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90"
                        >
                            <Save className="h-4 w-4" />
                            Simpan
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-4 py-2 border rounded-lg text-sm"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-3">
                {orangTua.length === 0 && (
                    <div className="bg-white rounded-lg border p-6 text-center text-sm text-gray-500">
                        Belum ada data orang tua / wali
                    </div>
                )}
                {orangTua.map((o: any) => (
                    <div key={o.id} className="bg-white rounded-lg border p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {o.nama_lengkap}{" "}
                                    <span className="text-xs font-normal text-gray-500 ml-1">
                                        ({o.hubungan})
                                    </span>
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {o.pekerjaan || "-"} · {o.no_hp || "-"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Pendidikan: {o.pendidikan_terakhir || "-"} ·
                                    Penghasilan: {o.penghasilan_bulanan || "-"}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => del(o.id)}
                                className="p-1.5 text-destructive hover:bg-destructive/10 rounded"
                                aria-label="Hapus"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MutasiTab({ siswa, mutasi }: any) {
    const [showForm, setShowForm] = useState(false);
    const [empty, setEmpty] = useState({
        jenis: "masuk",
        tanggal_mutasi: new Date().toISOString().split("T")[0],
        asal_sekolah: "",
        sekolah_tujuan: "",
        alasan: "",
        no_sk: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post(route("buku-induk.store-mutasi", siswa.id), empty, {
            onSuccess: () => {
                setShowForm(false);
            },
        });
    };
    const del = (id: number) => {
        if (confirm("Hapus mutasi ini?"))
            Inertia.delete(route("buku-induk.destroy-mutasi", [siswa.id, id]));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">
                    Riwayat Mutasi ({mutasi.length})
                </h2>
                {!showForm && (
                    <button
                        type="button"
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                        <Plus className="h-4 w-4" />
                        Catat Mutasi
                    </button>
                )}
            </div>

            {showForm && (
                <form
                    onSubmit={submit}
                    className="bg-white rounded-lg border p-6 mb-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                            label="Jenis"
                            value={empty.jenis}
                            onChange={(v) => setEmpty({ ...empty, jenis: v })}
                            options={["masuk", "keluar"]}
                            required
                        />
                        <Input
                            label="Tanggal Mutasi"
                            type="date"
                            value={empty.tanggal_mutasi}
                            onChange={(v) =>
                                setEmpty({ ...empty, tanggal_mutasi: v })
                            }
                            required
                        />
                        <Input
                            label="Asal Sekolah"
                            value={empty.asal_sekolah}
                            onChange={(v) =>
                                setEmpty({ ...empty, asal_sekolah: v })
                            }
                        />
                        <Input
                            label="Sekolah Tujuan"
                            value={empty.sekolah_tujuan}
                            onChange={(v) =>
                                setEmpty({ ...empty, sekolah_tujuan: v })
                            }
                        />
                        <Input
                            label="No SK"
                            value={empty.no_sk}
                            onChange={(v) => setEmpty({ ...empty, no_sk: v })}
                        />
                        <Textarea
                            label="Alasan"
                            value={empty.alasan}
                            onChange={(v) => setEmpty({ ...empty, alasan: v })}
                            required
                            full
                        />
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90"
                        >
                            <Save className="h-4 w-4" />
                            Simpan
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-4 py-2 border rounded-lg text-sm"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-3">
                {mutasi.length === 0 && (
                    <div className="bg-white rounded-lg border p-6 text-center text-sm text-gray-500">
                        Belum ada catatan mutasi
                    </div>
                )}
                {mutasi.map((m: any) => (
                    <div key={m.id} className="bg-white rounded-lg border p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-gray-900 capitalize">
                                    Mutasi {m.jenis}{" "}
                                    <span className="text-xs font-normal text-gray-500 ml-1">
                                        {m.tanggal_mutasi}
                                    </span>
                                </h3>
                                <p className="text-sm text-gray-700 mt-1">
                                    {m.alasan}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {m.jenis === "masuk"
                                        ? `Dari: ${m.asal_sekolah || "-"}`
                                        : `Ke: ${m.sekolah_tujuan || "-"}`}{" "}
                                    · SK: {m.no_sk || "-"}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => del(m.id)}
                                className="p-1.5 text-destructive hover:bg-destructive/10 rounded"
                                aria-label="Hapus"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Field({
    label,
    v,
    full,
}: {
    label: string;
    v: unknown;
    full?: boolean;
}) {
    return (
        <div className={full ? "md:col-span-2" : ""}>
            <dt className="text-xs text-gray-500">{label}</dt>
            <dd className="text-sm font-medium text-gray-900 mt-0.5">
                {v || "-"}
            </dd>
        </div>
    );
}

function Input({ label, value, onChange, type, required, full }: any) {
    return (
        <div className={full ? "md:col-span-3" : ""}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-destructive"> *</span>}
            </label>
            <input
                type={type || "text"}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                required={!!required}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
        </div>
    );
}

function Select({ label, value, onChange, options, required }: any) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-destructive"> *</span>}
            </label>
            <select
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                required={!!required}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
                <option value="">-- Pilih --</option>
                {options.map((o: string) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </div>
    );
}

function Textarea({ label, value, onChange, required, full }: any) {
    return (
        <div className={full ? "md:col-span-3" : ""}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-destructive"> *</span>}
            </label>
            <textarea
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                required={!!required}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
        </div>
    );
}
