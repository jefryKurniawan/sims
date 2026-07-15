import { Link, Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

interface Props {
    errors?: Record<string, string[]>;
}

export default function Create({ errors }: Props) {
    const [values, setValues] = useState({
        nama_lengkap: "",
        nuptk: "",
        jenis_kelamin: "L",
        tempat_lahir: "",
        tanggal_lahir: "",
        agama: "",
        alamat: "",
        no_telp: "",
        email: "",
        jenis: "Guru",
        bidang_studi: "",
        jabatan: "",
        status_kepegawaian: "Tetap Yayasan",
        tanggal_masuk: "",
        foto: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post(route("gtk.store"), values);
    };

    const agamaList = [
        "Islam",
        "Kristen",
        "Katholik",
        "Hindu",
        "Buddha",
        "Konghucu",
    ];

    return (
        <>
            <Head title="Tambah GTK" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Tambah GTK
                        </h1>
                    </div>
                    <Link
                        href={route("gtk.index")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Kembali
                    </Link>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm p-6 max-w-3xl">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Lengkap{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nama_lengkap"
                                    value={values.nama_lengkap}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                    placeholder="Nama lengkap"
                                />
                                {errors?.nama_lengkap && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.nama_lengkap[0]}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    NUPTK
                                </label>
                                <input
                                    type="text"
                                    name="nuptk"
                                    value={values.nuptk}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                    placeholder="Nomor NUPTK"
                                />
                                {errors?.nuptk && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.nuptk[0]}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Jenis Kelamin{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <select
                                        name="jenis_kelamin"
                                        value={values.jenis_kelamin}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                    >
                                        <option value="">Pilih</option>
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                    {errors?.jenis_kelamin && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.jenis_kelamin[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tempat Lahir{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="tempat_lahir"
                                        value={values.tempat_lahir}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                        placeholder="Tempat lahir"
                                    />
                                    {errors?.tempat_lahir && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.tempat_lahir[0]}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tanggal Lahir{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="date"
                                        name="tanggal_lahir"
                                        value={values.tanggal_lahir}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                    />
                                    {errors?.tanggal_lahir && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.tanggal_lahir[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Agama{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <select
                                        name="agama"
                                        value={values.agama}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                    >
                                        <option value="">Pilih</option>
                                        {agamaList.map((a) => (
                                            <option key={a} value={a}>
                                                {a}
                                            </option>
                                        ))}
                                    </select>
                                    {errors?.agama && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.agama[0]}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Alamat{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <textarea
                                    name="alamat"
                                    value={values.alamat}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                    placeholder="Alamat lengkap"
                                />
                                {errors?.alamat && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.alamat[0]}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        No. Telepon{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="no_telp"
                                        value={values.no_telp}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                        placeholder="08123456789"
                                    />
                                    {errors?.no_telp && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.no_telp[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                        placeholder="email@sekolah.ac.id"
                                    />
                                    {errors?.email && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.email[0]}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Jenis{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <select
                                        name="jenis"
                                        value={values.jenis}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                    >
                                        <option value="">Pilih</option>
                                        <option value="Guru">Guru</option>
                                        <option value="Tenaga Kependidikan">
                                            Tenaga Kependidikan
                                        </option>
                                    </select>
                                    {errors?.jenis && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.jenis[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Bidang Studi
                                    </label>
                                    <input
                                        type="text"
                                        name="bidang_studi"
                                        value={values.bidang_studi}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                        placeholder="Matematika, Bahasa Inggris, dll"
                                    />
                                    {errors?.bidang_studi && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.bidang_studi[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Jabatan{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="jabatan"
                                        value={values.jabatan}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                        placeholder="Kepala Sekolah, Wali Kelas, dll"
                                    />
                                    {errors?.jabatan && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.jabatan[0]}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status Kepegawaian{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <select
                                        name="status_kepegawaian"
                                        value={values.status_kepegawaian}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                    >
                                        <option value="">Pilih</option>
                                        <option value="Tetap Yayasan">
                                            Tetap Yayasan
                                        </option>
                                        <option value="Kontrak">Kontrak</option>
                                        <option value="Honorer">Honorer</option>
                                    </select>
                                    {errors?.status_kepegawaian && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.status_kepegawaian[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tanggal Masuk{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="date"
                                        name="tanggal_masuk"
                                        value={values.tanggal_masuk}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                    />
                                    {errors?.tanggal_masuk && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.tanggal_masuk[0]}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Foto
                                </label>
                                <input
                                    type="text"
                                    name="foto"
                                    value={values.foto}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                    placeholder="URL gambar (opsional)"
                                />
                                {errors?.foto && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.foto[0]}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
                            >
                                Simpan
                            </button>
                            <Link
                                href={route("gtk.index")}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
