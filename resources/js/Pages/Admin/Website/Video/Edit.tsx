import { Head, usePage, Link, useForm } from "@inertiajs/inertia-react";
import { Inertia as router } from "@inertiajs/inertia";
import AdminLayout from "@/Layout/AdminLayout";

export default function Edit() {
    const { data } = usePage();
    const { video } = data;
    const {
        data: formData,
        put,
        processing,
        reset,
        errors,
    } = useForm({
        title: video?.title ?? "",
        desc: video?.desc ?? "",
        url: video?.url ?? "",
        is_active: video?.is_active === "1" ? "1" : "0",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("website.video.update", video.id), {
            onSuccess: () => {
                router.visit(route("video.index"), {
                    preserveScroll: true,
                    only: ["video"],
                });
            },
        });
    };

    return (
        <AdminLayout
            title="Edit Video"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            Edit Video
                        </h1>
                    </div>
                    <Link
                        href={route("video.index")}
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
                        Judul
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => {
                            formData.title = e.target.value;
                        }}
                        className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-${errors.title ? "destructive" : ""}`}
                        disabled={processing}
                    />
                    {errors.title && (
                        <p className="mt-1 text-xs text-destructive">
                            {errors.title}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Deskripsi
                    </label>
                    <textarea
                        value={formData.desc}
                        onChange={(e) => {
                            formData.desc = e.target.value;
                        }}
                        className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus-ring-2 focus-ring-primary/20 focus:border-${errors.title ? "destructive" : ""}`}
                        rows={3}
                        disabled={processing}
                    />
                    {errors.desc && (
                        <p className="mt-1 text-xs text-destructive">
                            {errors.desc}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL Video
                    </label>
                    <input
                        type="text"
                        value={formData.url}
                        onChange={(e) => {
                            formData.url = e.target.value;
                        }}
                        className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-${errors.title ? "destructive" : ""}`}
                        disabled={processing}
                    />
                    {errors.url && (
                        <p className="mt-1 text-xs text-destructive">
                            {errors.url}
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
                        onClick={() => router.visit(route("video.index"))}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                        disabled={processing}
                    >
                        {processing ? "Mengupdate..." : "Update"}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
