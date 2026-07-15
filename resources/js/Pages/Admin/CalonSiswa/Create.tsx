import { useForm, usePage, Link } from "@inertiajs/inertia-react";
import { useState } from "react";
import AdminLayout from "@/Layout/AdminLayout";

export default function Create() {
    const { flash } = usePage().props;
    const [previewBukti, setPreviewBukti] = useState("");

    const { data, setData, post, processing, errors, reset } = useForm({
        nisn: "",
        nama_lengkap: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        alamat: "",
        no_hp: "",
        email: "",
        nama_ortu: "",
        no_hp_ortu: "",
        asal_sekolah: "",
        prestasi: "",
        biaya_pendaftaran: "",
        bukti_bayar: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("bukti_bayar", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewBukti(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("ppdb.store"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminLayout title="PPDB - Tambah Calon Siswa">
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Tambah Calon Siswa Baru
                    </h1>
                    <Link
                        href={route("ppdb.index")}
                        className="inline-block px-4 py-2 border border-primary/20 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 mt-2"
                    >
                        Kembali ke Daftar Calon Siswa
                    </Link>
                    {flash?.success && (
                        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg">
                            {flash.success}
                        </div>
                    )}
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6"
                >
                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
                            Data Pribadi Siswa
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    NISN{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nisn}
                                    onChange={(e) =>
                                        setData("nisn", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ring dark:bg-gray-700 dark:border-gray-600"
                                    placeholder="Nomor Induk Siswa Nasional"
                                />
                                {errors.nisn && (
                                    <span className="text-destructive text-sm mt-1">
                                        {errors.nisn}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Nama Lengkap{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nama_lengkap}
                                    onChange={(e) =>
                                        setData("nama_lengkap", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ring dark:bg-gray-700 dark:border-gray-600"
                                    placeholder="Nama lengkap siswa"
                                />
                                {errors.nama_lengkap && (
                                    <span className="text-destructive text-sm mt-1">
                                        {errors.nama_lengkap}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Tempat Lahir{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.tempat_lahir}
                                    onChange={(e) =>
                                        setData("tempat_lahir", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ring dark:bg-gray-700 dark:border-gray-600"
                                    placeholder="Tempat lahir"
                                />
                                {errors.tempat_lahir && (
                                    <span className="text-destructive text-sm mt-1">
                                        {errors.tempat_lahir}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Tanggal Lahir{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.tanggal_lahir}
                                    onChange={(e) =>
                                        setData("tanggal_lahir", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ring dark:bg-gray-700 dark:border-gray-600"
                                />
                                {errors.tanggal_lahir && (
                                    <span className="text-destructive text-sm mt-1">
                                        {errors.tanggal_lahir}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Jenis Kelamin{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <select
                                    value={data.jenis_kelamin}
                                    onChange={(e) =>
                                        setData("jenis_kelamin", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ring dark:bg-gray-700 dark:border-gray-600"
                                >
                                    <option value="">Pilih</option>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                                {errors.jenis_kelamin && (
                                    <span className="text-destructive text-sm mt-1">
                                        {errors.jenis_kelamin}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Email (Opsional)
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ring dark:bg-gray-700 dark:border-gray-600"
                                    placeholder="email@example.com"
                                />
                                {errors.email && (
                                    <span className="text-destructive text-sm mt-1">
                                        {errors.email}
                                    </span>
                                )}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">
                                    Alamat{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <textarea
                                    value={data.alamat}
                                    onChange={(e) =>
                                        setData("alamat", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ring dark:bg-gray-700 dark:border-gray-600"
                                    rows="3"
                                    placeholder="Alamat lengkap"
                                ></textarea>
                                {errors.alamat && (
                                    <span className="text-destructive text-sm mt-1">
                                        {errors.alamat}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    No. HP Siswa{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.no_hp}
                                    onChange={(e) =>
                                        setData("no_hp", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ring dark:bg-gray-700 dark:border-gray-600"
                                    placeholder="08xxxxxxxxxx"
                                />
                                {errors.no_hp && (
                                    <span className="text-destructive text-sm mt-1">
                                        {errors.no_hp}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Prestasi (Opsional)
                                </label>
                                <textarea
                                    value={data.prestasi}
                                    onChange={(e) =>
                                        setData("prestasi", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ring dark:bg-gray-700 dark:border-gray-600"
                                    rows="2"
                                    placeholder="Prestasi yang dicapai (jika ada)"
                                ></textarea>
                                {errors.prestasi && (
                                    <span className="text-destructive text-sm mt-1">
                                        {errors.prestasi}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
                            Data Orang Tua/Wali
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Nama Orang Tua{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nama_ortu}
                                    onChange={(e) =>
                                        setData("nama_ortu", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ring dark:bg-gray-700 dark:border-gray-600"
                                    placeholder="Nama lengkap orang tua/wali"
                                />
                                {errors.nama_ortu && (
                                    <span className="text-destructive text-sm mt-1">
                                        {errors.nama_ortu}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    No. HP Orang Tua{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.no_hp_ortu}
                                    onChange={(e) =>
                                        setData("no_hp_ortu", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ring dark:bg-gray-700 dark:border-gray-600"
                                    placeholder="08xxxxxxxxxx"
                                />
                                {errors.no_hp_ortu && (
                                    <span className="text-destructive text-sm mt-1">
                                        {errors.no_hp_ortu}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
                            Data Sekolah Asal
                        </h2>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Nama Sekolah Asal{" "}
                                <span className="text-destructive">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.asal_sekolah}
                                onChange={(e) =>
                                    setData("asal_sekolah", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ring dark:bg-gray-700 dark:border-gray-600"
                                placeholder="Nama sekolah sebelumnya"
                            />
                            {errors.asal_sekolah && (
                                <span className="text-destructive text-sm mt-1">
                                    {errors.asal_sekolah}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
                            Pembayaran Pendaftaran
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Biaya Pendaftaran{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={data.biaya_pendaftaran}
                                    onChange={(e) =>
                                        setData(
                                            "biaya_pendaftaran",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ring dark:bg-gray-700 dark:border-gray-600"
                                    placeholder="0"
                                    min="0"
                                />
                                {errors.biaya_pendaftaran && (
                                    <span className="text-destructive text-sm mt-1">
                                        {errors.biaya_pendaftaran}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Bukti Bayar (Opsional)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-md dark:bg-gray-700 dark:border-gray-600"
                                />
                                {previewBukti && (
                                    <div className="mt-2">
                                        <img
                                            src={previewBukti}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded border"
                                        />
                                    </div>
                                )}
                                {errors.bukti_bayar && (
                                    <span className="text-destructive text-sm mt-1">
                                        {errors.bukti_bayar}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4 border-t">
                        <Link
                            href={route("ppdb.index")}
                            className="px-4 py-2 border border-primary/20 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
                            disabled={processing}
                        >
                            {processing ? "Menyimpan..." : "Simpan Data"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
