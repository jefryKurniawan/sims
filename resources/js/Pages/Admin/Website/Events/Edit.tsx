import { Head, usePage, Link, useForm } from "@inertiajs/inertia-react";
import { Inertia as router } from "@inertiajs/inertia";
import { useState } from "react";
import AdminLayout from "@/Layout/AdminLayout";

export default function Edit() {
    const { data } = usePage();
    const { event } = data;
    const {
        data: formData,
        put,
        processing,
        reset,
        errors,
    } = useForm({
        title: event?.title ?? "",
        slug: event?.slug ?? "",
        desc: event?.desc ?? "",
        content: event?.content ?? "",
        thumbnail: null,
        acara: event?.acara ?? "",
        lokasi: event?.lokasi ?? "",
        is_active: event?.is_Active === "1" ? "1" : "0",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("website.event.update", event.id), {
            onSuccess: () => {
                router.visit(route("website.event.index"), {
                    preserveScroll: true,
                    only: ["event"],
                });
            },
        });
    };

    const handleThumbnailChange = (e) => {
        if (e.target.files[0]) {
            formData.thumbnail = e.target.files[0];
        }
    };

    return (
        <AdminLayout
            title="Edit Event"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            Edit Event
                        </h1>
                    </div>
                    <Link
                        href={route("website.event.index")}
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
                        Title
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => {
                            formData.title = e.target.value;
                        }}
                        className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.title ? "border-destructive" : ""}`}
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
                        Slug (opsional)
                    </label>
                    <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => {
                            formData.slug = e.target.value;
                        }}
                        className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.slug ? "border-destructive" : ""}`}
                        disabled={processing}
                    />
                    {errors.slug && (
                        <p className="mt-1 text-xs text-destructive">
                            {errors.slug}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Deskripsi Singkat
                    </label>
                    <textarea
                        value={formData.desc}
                        onChange={(e) => {
                            formData.desc = e.target.value;
                        }}
                        className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.desc ? "border-destructive" : ""}`}
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
                        Konten
                    </label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => {
                            formData.content = e.target.value;
                        }}
                        className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.content ? "border-destructive" : ""}`}
                        rows={8}
                        disabled={processing}
                    />
                    {errors.content && (
                        <p className="mt-1 text-xs text-destructive">
                            {errors.content}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thumbnail (biarkan kosong jika tidak ingin mengganti)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.thumbnail ? "border-destructive" : ""}`}
                        disabled={processing}
                    />
                    {errors.thumbnail && (
                        <p className="mt-1 text-xs text-destructive">
                            {errors.thumbnail}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Acara
                    </label>
                    <input
                        type="text"
                        value={formData.acara}
                        onChange={(e) => {
                            formData.acara = e.target.value;
                        }}
                        className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.acara ? "border-destructive" : ""}`}
                        disabled={processing}
                    />
                    {errors.acara && (
                        <p className="mt-1 text-xs text-destructive">
                            {errors.acara}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lokasi
                    </label>
                    <input
                        type="text"
                        value={formData.lokasi}
                        onChange={(e) => {
                            formData.lokasi = e.target.value;
                        }}
                        className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.lokasi ? "border-destructive" : ""}`}
                        disabled={processing}
                    />
                    {errors.lokasi && (
                        <p className="mt-1 text-xs text-destructive">
                            {errors.lokasi}
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
                            router.visit(route("website.event.index"))
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
                        {processing ? "Mengupdate..." : "Update"}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
