import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { ChevronLeft } from "lucide-react";

interface User {
    id: number;
    name: string;
    email: string;
}

interface AlumniItem {
    id: number;
    user_id: number;
    tahun_lulus: number | string;
    pekerjaan: string;
    alamat: string;
    no_telp: string;
    linkedin: string | null;
}

interface Props {
    alumni: AlumniItem;
    users: User[];
}

export default function Edit({ alumni, users }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        user_id: String(alumni.user_id ?? ""),
        tahun_lulus: String(alumni.tahun_lulus ?? ""),
        pekerjaan: alumni.pekerjaan ?? "",
        alamat: alumni.alamat ?? "",
        no_telp: alumni.no_telp ?? "",
        linkedin: alumni.linkedin ?? "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("alumni.update", alumni.id));
    };

    return (
        <>
            <Head title="Edit Alumni" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Edit Alumni
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            ID: {alumni.id}
                        </p>
                    </div>
                    <Link
                        href={route("alumni.index")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Kembali
                    </Link>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm p-6 max-w-3xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="user_id"
                                className="block text-sm font-medium mb-1 text-gray-700"
                            >
                                User
                            </label>
                            <select
                                id="user_id"
                                value={data.user_id}
                                onChange={(e) =>
                                    setData("user_id", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm focus:ring-2 focus:outline-none focus:ring-ring/30 focus:border-ring"
                                required
                            >
                                <option value="">Pilih User</option>
                                {users.map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.name} ({u.email})
                                    </option>
                                ))}
                            </select>
                            {errors.user_id && (
                                <p className="mt-1 text-sm text-destructive">
                                    {errors.user_id}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="tahun_lulus"
                                    className="block text-sm font-medium mb-1 text-gray-700"
                                >
                                    Tahun Lulus
                                </label>
                                <input
                                    id="tahun_lulus"
                                    type="number"
                                    value={data.tahun_lulus}
                                    onChange={(e) =>
                                        setData("tahun_lulus", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm"
                                    placeholder="Contoh: 2023"
                                    required
                                />
                                {errors.tahun_lulus && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.tahun_lulus}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="no_telp"
                                    className="block text-sm font-medium mb-1 text-gray-700"
                                >
                                    No. Telepon
                                </label>
                                <input
                                    id="no_telp"
                                    type="text"
                                    value={data.no_telp}
                                    onChange={(e) =>
                                        setData("no_telp", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm"
                                    placeholder="Contoh: 08123456789"
                                    required
                                />
                                {errors.no_telp && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.no_telp}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="pekerjaan"
                                className="block text-sm font-medium mb-1 text-gray-700"
                            >
                                Pekerjaan
                            </label>
                            <input
                                id="pekerjaan"
                                type="text"
                                value={data.pekerjaan}
                                onChange={(e) =>
                                    setData("pekerjaan", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm"
                                placeholder="Contoh: Software Engineer"
                                required
                            />
                            {errors.pekerjaan && (
                                <p className="mt-1 text-sm text-destructive">
                                    {errors.pekerjaan}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="alamat"
                                className="block text-sm font-medium mb-1 text-gray-700"
                            >
                                Alamat
                            </label>
                            <textarea
                                id="alamat"
                                value={data.alamat}
                                onChange={(e) =>
                                    setData("alamat", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm"
                                rows={3}
                                placeholder="Alamat lengkap"
                                required
                            />
                            {errors.alamat && (
                                <p className="mt-1 text-sm text-destructive">
                                    {errors.alamat}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="linkedin"
                                className="block text-sm font-medium mb-1 text-gray-700"
                            >
                                LinkedIn
                            </label>
                            <input
                                id="linkedin"
                                type="url"
                                value={data.linkedin}
                                onChange={(e) =>
                                    setData("linkedin", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm"
                                placeholder="https://linkedin.com/in/username"
                            />
                            {errors.linkedin && (
                                <p className="mt-1 text-sm text-destructive">
                                    {errors.linkedin}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <Link
                                href={route("alumni.index")}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? "Menyimpan..." : "Update"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
