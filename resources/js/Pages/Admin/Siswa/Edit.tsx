import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

interface JurusanOption {
    id: number;
    nama: string;
}

interface KelasOption {
    id: number;
    nama_kelas: string;
}

interface SiswaData {
    id: number;
    nama_lengkap: string;
    nisn: string | null;
    nis: string | null;
    tempat_lahir: string | null;
    tanggal_lahir: string | null;
    jenis_kelamin: string;
    alamat: string | null;
    no_hp: string | null;
    email: string | null;
    nama_ortu: string | null;
    no_hp_ortu: string | null;
    asal_sekolah: string | null;
    status: string;
    tanggal_masuk: string | null;
    jurusan_id: number | null;
    kelasAktif?: {
        kelas?: {
            id: number;
            nama_kelas: string;
            tingkat: string;
        } | null;
    } | null;
}

interface Props {
    siswa: SiswaData;
    jurusanList: JurusanOption[];
    kelasList: KelasOption[];
}

export default function Edit({ siswa, jurusanList, kelasList }: Props) {
    const { errors } = usePage().props;

    const currentKelasId = siswa.kelasAktif?.kelas?.id ?? null;
    const tingkat = siswa.kelasAktif?.kelas?.tingkat || "10";

    const [values, setValues] = useState({
        nama_lengkap: siswa.nama_lengkap ?? "",
        nisn: siswa.nisn ?? "",
        nis: siswa.nis ?? "",
        tempat_lahir: siswa.tempat_lahir ?? "",
        tanggal_lahir: siswa.tanggal_lahir ?? "",
        jenis_kelamin: siswa.jenis_kelamin ?? "L",
        alamat: siswa.alamat ?? "",
        no_hp: siswa.no_hp ?? "",
        email: siswa.email ?? "",
        nama_ortu: siswa.nama_ortu ?? "",
        no_hp_ortu: siswa.no_hp_ortu ?? "",
        asal_sekolah: siswa.asal_sekolah ?? "",
        status: siswa.status ?? "aktif",
        tanggal_masuk: siswa.tanggal_masuk ?? "",
        jurusan_id: siswa.jurusan_id ? String(siswa.jurusan_id) : "",
        kelas_id: currentKelasId ? String(currentKelasId) : "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.put(route("users.murid.update", siswa.id), values);
    };

    const inputClass =
        "w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition-colors";
    const labelClass = "block text-sm font-semibold text-gray-700 mb-1";
    const errorClass = "mt-1 text-sm text-destructive";

    return (
        <>
            <Head title="Edit Siswa" />
            <div className="p-4 lg:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading tracking-tight">
                        Edit Siswa
                    </h1>
                    <Link
                        href={route("users.murid.tingkat", tingkat)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-primary/20 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all"
                    >
                        ← Kembali
                    </Link>
                </div>

                {/* Form Card */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Card header */}
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-yellow-50">
                            <h2 className="text-lg font-bold text-gray-900 font-heading">
                                Form Edit Data Siswa
                            </h2>
                            <p className="text-sm text-gray-500 font-body mt-0.5">
                                Perbarui data siswa yang diperlukan
                            </p>
                        </div>

                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Nama Lengkap */}
                                <div>
                                    <label className={labelClass}>
                                        Nama Lengkap{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="nama_lengkap"
                                        value={values.nama_lengkap}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                    {errors?.nama_lengkap && (
                                        <p className={errorClass}>
                                            {errors.nama_lengkap}
                                        </p>
                                    )}
                                </div>

                                {/* NISN & NIS */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>
                                            NISN{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="nisn"
                                            value={values.nisn}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                        {errors?.nisn && (
                                            <p className={errorClass}>
                                                {errors.nisn}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            NIS
                                        </label>
                                        <input
                                            type="text"
                                            name="nis"
                                            value={values.nis}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                        {errors?.nis && (
                                            <p className={errorClass}>
                                                {errors.nis}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Tempat & Tanggal Lahir */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>
                                            Tempat Lahir
                                        </label>
                                        <input
                                            type="text"
                                            name="tempat_lahir"
                                            value={values.tempat_lahir}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            Tanggal Lahir
                                        </label>
                                        <input
                                            type="date"
                                            name="tanggal_lahir"
                                            value={values.tanggal_lahir}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                {/* Jenis Kelamin */}
                                <div>
                                    <label className={labelClass}>
                                        Jenis Kelamin{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <select
                                        name="jenis_kelamin"
                                        value={values.jenis_kelamin}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                    {errors?.jenis_kelamin && (
                                        <p className={errorClass}>
                                            {errors.jenis_kelamin}
                                        </p>
                                    )}
                                </div>

                                {/* Alamat */}
                                <div>
                                    <label className={labelClass}>Alamat</label>
                                    <textarea
                                        name="alamat"
                                        value={values.alamat}
                                        onChange={handleChange}
                                        rows={2}
                                        className={inputClass}
                                    />
                                </div>

                                {/* Kontak */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>
                                            No HP
                                        </label>
                                        <input
                                            type="text"
                                            name="no_hp"
                                            value={values.no_hp}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                {/* Orang Tua */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>
                                            Nama Orang Tua / Wali
                                        </label>
                                        <input
                                            type="text"
                                            name="nama_ortu"
                                            value={values.nama_ortu}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            No HP Orang Tua
                                        </label>
                                        <input
                                            type="text"
                                            name="no_hp_ortu"
                                            value={values.no_hp_ortu}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                {/* Asal Sekolah, Status, Tanggal Masuk */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className={labelClass}>
                                            Asal Sekolah
                                        </label>
                                        <input
                                            type="text"
                                            name="asal_sekolah"
                                            value={values.asal_sekolah}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            Status{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            name="status"
                                            value={values.status}
                                            onChange={handleChange}
                                            className={inputClass}
                                        >
                                            <option value="aktif">Aktif</option>
                                            <option value="pindah">
                                                Pindah
                                            </option>
                                            <option value="lulus">Lulus</option>
                                            <option value="keluar">
                                                Keluar
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            Tanggal Masuk
                                        </label>
                                        <input
                                            type="date"
                                            name="tanggal_masuk"
                                            value={values.tanggal_masuk}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                {/* Jurusan & Kelas */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>
                                            Jurusan
                                        </label>
                                        <select
                                            name="jurusan_id"
                                            value={values.jurusan_id}
                                            onChange={handleChange}
                                            className={inputClass}
                                        >
                                            <option value="">
                                                -- Pilih Jurusan --
                                            </option>
                                            {jurusanList.map((j) => (
                                                <option key={j.id} value={j.id}>
                                                    {j.nama}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            Kelas{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            name="kelas_id"
                                            value={values.kelas_id}
                                            onChange={handleChange}
                                            className={inputClass}
                                        >
                                            <option value="">
                                                -- Pilih Kelas --
                                            </option>
                                            {kelasList.map((k) => (
                                                <option key={k.id} value={k.id}>
                                                    {k.nama_kelas}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-primary/90 transition-all shadow-sm"
                                    >
                                        Simpan Perubahan
                                    </button>
                                    <Link
                                        href={route(
                                            "users.murid.tingkat",
                                            tingkat,
                                        )}
                                        className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-primary/20 rounded-xl hover:bg-gray-50 transition-all"
                                    >
                                        Batal
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
