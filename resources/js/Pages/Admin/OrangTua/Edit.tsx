import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";

export default function Edit() {
    const { orangTua, siswa, hubunganOptions, pendidikanOptions, penghasilanOptions, statusPernikahanOptions } = usePage().props as any;

    const [data, setData] = useState({
        siswa_id: orangTua.siswa_id?.toString() || "",
        hubungan: orangTua.hubungan || "Ayah",
        nama_lengkap: orangTua.nama_lengkap || "",
        nik: orangTua.nik || "",
        npwp: orangTua.npwp || "",
        tanggal_lahir: orangTua.tanggal_lahir || "",
        pendidikan_terakhir: orangTua.pendidikan_terakhir || "",
        pekerjaan: orangTua.pekerjaan || "",
        penghasilan_bulanan: orangTua.penghasilan_bulanan || "",
        status_pernikahan: orangTua.status_pernikahan || "",
        jumlah_tanggungan: orangTua.jumlah_tanggungan || "",
        no_hp: orangTua.no_hp || "",
        email: orangTua.email || "",
        alamat: orangTua.alamat || "",
    });
    const [errors, setErrors] = useState<any>({});

    const handleChange = (field: string, value: any) => {
        setData({ ...data, [field]: value });
        if (errors[field]) setErrors({ ...errors, [field]: null });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.put(`/dashboard/orang-tua/${orangTua.id}`, data, {
            onError: (err) => setErrors(err),
        });
    };

    return (
        <>
            <Head title="Edit Orang Tua / Wali" />
            <div className="p-4 lg:p-6">
                <div className="mb-6">
                    <Link
                        href="/dashboard/orang-tua"
                        className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary mb-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Orang Tua / Wali</h1>
                </div>

                <form onSubmit={handleSubmit} className="max-w-3xl space-y-4">
                    <div className="bg-white rounded-lg border p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Siswa *</label>
                                <select
                                    value={data.siswa_id}
                                    onChange={(e) => handleChange("siswa_id", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    required
                                >
                                    <option value="">Pilih Siswa</option>
                                    {siswa?.map((s: any) => (
                                        <option key={s.id} value={s.id}>
                                            {s.nama_lengkap} ({s.nisn})
                                        </option>
                                    ))}
                                </select>
                                {errors.siswa_id && <p className="text-xs text-red-500 mt-1">{errors.siswa_id}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hubungan *</label>
                                <select
                                    value={data.hubungan}
                                    onChange={(e) => handleChange("hubungan", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    required
                                >
                                    {hubunganOptions?.map((o: string) => (
                                        <option key={o} value={o}>{o}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                                <input
                                    type="text"
                                    value={data.nama_lengkap}
                                    onChange={(e) => handleChange("nama_lengkap", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    required
                                />
                                {errors.nama_lengkap && <p className="text-xs text-red-500 mt-1">{errors.nama_lengkap}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
                                <input
                                    type="text"
                                    value={data.nik}
                                    onChange={(e) => handleChange("nik", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">NPWP</label>
                                <input
                                    type="text"
                                    value={data.npwp}
                                    onChange={(e) => handleChange("npwp", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                                <input
                                    type="date"
                                    value={data.tanggal_lahir}
                                    onChange={(e) => handleChange("tanggal_lahir", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pendidikan</label>
                                <select
                                    value={data.pendidikan_terakhir}
                                    onChange={(e) => handleChange("pendidikan_terakhir", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                >
                                    <option value="">-- Pilih --</option>
                                    {pendidikanOptions?.map((o: string) => (
                                        <option key={o} value={o}>{o}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
                                <input
                                    type="text"
                                    value={data.pekerjaan}
                                    onChange={(e) => handleChange("pekerjaan", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Penghasilan</label>
                                <select
                                    value={data.penghasilan_bulanan}
                                    onChange={(e) => handleChange("penghasilan_bulanan", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                >
                                    <option value="">-- Pilih --</option>
                                    {penghasilanOptions?.map((o: string) => (
                                        <option key={o} value={o}>{o}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status Pernikahan</label>
                                <select
                                    value={data.status_pernikahan}
                                    onChange={(e) => handleChange("status_pernikahan", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                >
                                    <option value="">-- Pilih --</option>
                                    {statusPernikahanOptions?.map((o: string) => (
                                        <option key={o} value={o}>{o}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Tanggungan</label>
                                <input
                                    type="number"
                                    value={data.jumlah_tanggungan}
                                    onChange={(e) => handleChange("jumlah_tanggungan", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">No HP</label>
                                <input
                                    type="text"
                                    value={data.no_hp}
                                    onChange={(e) => handleChange("no_hp", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                />
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                                <textarea
                                    value={data.alamat}
                                    onChange={(e) => handleChange("alamat", e.target.value)}
                                    rows={2}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90"
                        >
                            <Save className="h-4 w-4" />
                            Simpan Perubahan
                        </button>
                        <Link
                            href="/dashboard/orang-tua"
                            className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
