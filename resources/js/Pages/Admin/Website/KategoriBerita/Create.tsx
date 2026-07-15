import { Head, usePage, Link, useForm } from "@inertiajs/inertia-react";
import { Inertia as router } from "@inertiajs/inertia";
import AdminLayout from "@/Layout/AdminLayout";

export default function Create() {
    const { data } = usePage();
    const {
        data: formData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        nama: "",
        is_active: "0",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("website.kategori-berita.store"), {
            onSuccess: () => {
                router.visit(route("website.kategori-berita.index"), {
                    preserveScroll: true,
                    only: ["kategori"],
                });
            },
        });
    };

    return (
        <AdminLayout
            title="Tambah Kategori Berita"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            Tambah Kategori Berita
                        </h1>
                    </div>
                    <Link
                        href={route("website.kategori-berita.index")}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Kembali
                    </Link>
                </div>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Kategori
                    </label>
                    <input
                        type="text"
                        value={formData.nama}
                        onChange={(e) => {
                            formData.nama = e.target.value;
                        }}
                        className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.nama ? "border-destructive" : ""}`}
                        disabled={processing}
                    />
                    {errors.nama && (
                        <p className="mt-1 text-xs text-destructive">
                            {errors.nama}
                        </p>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                        <input
                            type="checkbox"
                            checked={formData.is_active === "1"}
                            onChange={(e) => {
                                formData.is_active = e.target.checked
                                    ? "1"
                                    : "0";
                            }}
                        />
                        Aktif
                    </label>
                </div>

                <div className="flex justify-end space-x-6">
                    <button
                        type="button"
                        onClick={() =>
                            router.visit(route("website.kategori-berita.index"))
                        }
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                        disabled={processing}
                    >
                        {processing ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
