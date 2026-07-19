import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Search, Plus, Trash2, Edit, User, Mail, Phone, Users } from "lucide-react";

export default function Index() {
    const { orangTua, filters } = usePage().props as any;
    const [search, setSearch] = useState(filters?.search || "");
    const [hubungan, setHubungan] = useState(filters?.hubungan || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.get("/dashboard/orang-tua", { search, hubungan }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm("Hapus data orang tua/wali ini?")) {
            Inertia.delete(`/dashboard/orang-tua/${id}`);
        }
    };

    return (
        <>
            <Head title="Orang Tua / Wali" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Orang Tua / Wali</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Kelola data orang tua dan wali siswa</p>
                    </div>
                    <Link
                        href="/dashboard/orang-tua/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah
                    </Link>
                </div>

                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama, NIK, no HP, atau nama siswa..."
                            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm"
                        />
                    </div>
                    <select
                        value={hubungan}
                        onChange={(e) => setHubungan(e.target.value)}
                        className="px-3 py-2 border rounded-lg text-sm"
                    >
                        <option value="">Semua Hubungan</option>
                        <option value="Ayah">Ayah</option>
                        <option value="Ibu">Ibu</option>
                        <option value="Wali">Wali</option>
                    </select>
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm">
                        Cari
                    </button>
                </form>

                <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-4 py-3 font-medium text-gray-600">Nama</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-600">Hubungan</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-600">Siswa</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-600">No HP</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-600">Pekerjaan</th>
                                    <th className="text-center px-4 py-3 font-medium text-gray-600">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {orangTua.data?.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center py-8 text-gray-500">
                                            Belum ada data orang tua/wali
                                        </td>
                                    </tr>
                                )}
                                {orangTua.data?.map((o: any) => (
                                    <tr key={o.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-gray-400" />
                                                <span className="font-medium">{o.nama_lengkap}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-medium">
                                                {o.hubungan}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {o.siswa?.nama_lengkap || "-"}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1 text-gray-600">
                                                <Phone className="h-3.5 w-3.5" />
                                                {o.no_hp || "-"}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{o.pekerjaan || "-"}</td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex justify-center gap-1">
                                                <Link
                                                    href={`/dashboard/orang-tua/${o.id}/edit`}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(o.id)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {orangTua.links && (
                        <div className="flex justify-center gap-1 p-4 border-t">
                            {orangTua.links.map((link: any, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => Inertia.get(link.url)}
                                    disabled={!link.url}
                                    className={`px-3 py-1 text-sm rounded ${link.active ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"} ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
