import { Head, useForm } from "@inertiajs/inertia-react";
import { Inertia as router } from "@inertiajs/inertia";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function PengajarCreate() {
    const {
        data: formData,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        name: "",
        email: "",
        username: "",
        password: "",
        foto_profile: null,
        nip: "",
        mengajar: "",
        linkidln: "",
        instagram: "",
        website: "",
        facebook: "",
        twitter: "",
        youtube: "",
    });

    const handleFotoProfileChange = (e) => {
        if (e.target.files[0]) {
            setData("foto_profile", e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("users.pengajar.store"), {
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    return (
        <>
            <Head title="Tambah Pengajar" />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Tambah Pengajar Baru
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="name" className="mb-2">
                            Nama Lengkap
                        </Label>
                        <Input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.name ? "border-destructive" : ""}`}
                            disabled={processing}
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-destructive">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="email" className="mb-2">
                            Email
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.email ? "border-destructive" : ""}`}
                            disabled={processing}
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-destructive">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="username" className="mb-2">
                            Username
                        </Label>
                        <Input
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.username ? "border-destructive" : ""}`}
                            disabled={processing}
                        />
                        {errors.username && (
                            <p className="mt-1 text-xs text-destructive">
                                {errors.username}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="password" className="mb-2">
                            Password
                        </Label>
                        <Input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.password ? "border-destructive" : ""}`}
                            disabled={processing}
                        />
                        {errors.password && (
                            <p className="mt-1 text-xs text-destructive">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="foto_profile" className="mb-2">
                            Foto Profile
                        </Label>
                        <input
                            type="file"
                            id="foto_profile"
                            accept="image/*"
                            onChange={handleFotoProfileChange}
                            className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.foto_profile ? "border-destructive" : ""}`}
                            disabled={processing}
                        />
                        {errors.foto_profile && (
                            <p className="mt-1 text-xs text-destructive">
                                {errors.foto_profile}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="nip" className="mb-2">
                            NIP
                        </Label>
                        <Input
                            type="text"
                            id="nip"
                            value={formData.nip}
                            onChange={(e) => setData("nip", e.target.value)}
                            className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.nip ? "border-destructive" : ""}`}
                            disabled={processing}
                        />
                        {errors.nip && (
                            <p className="mt-1 text-xs text-destructive">
                                {errors.nip}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="mengajar" className="mb-2">
                            Mengajar
                        </Label>
                        <Input
                            type="text"
                            id="mengajar"
                            value={formData.mengajar}
                            onChange={(e) =>
                                setData("mengajar", e.target.value)
                            }
                            className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.mengajar ? "border-destructive" : ""}`}
                            disabled={processing}
                        />
                        {errors.mengajar && (
                            <p className="mt-1 text-xs text-destructive">
                                {errors.mengajar}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="linkidln" className="mb-2">
                            LinkedIn
                        </Label>
                        <Input
                            type="text"
                            id="linkidln"
                            value={formData.linkidln}
                            onChange={(e) =>
                                setData("linkidln", e.target.value)
                            }
                            className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.linkidln ? "border-destructive" : ""}`}
                            disabled={processing}
                        />
                        {errors.linkidln && (
                            <p className="mt-1 text-xs text-destructive">
                                {errors.linkidln}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="instagram" className="mb-2">
                            Instagram
                        </Label>
                        <Input
                            type="text"
                            id="instagram"
                            value={formData.instagram}
                            onChange={(e) =>
                                setData("instagram", e.target.value)
                            }
                            className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.instagram ? "border-destructive" : ""}`}
                            disabled={processing}
                        />
                        {errors.instagram && (
                            <p className="mt-1 text-xs text-destructive">
                                {errors.instagram}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="website" className="mb-2">
                            Website
                        </Label>
                        <Input
                            type="text"
                            id="website"
                            value={formData.website}
                            onChange={(e) => setData("website", e.target.value)}
                            className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.website ? "border-destructive" : ""}`}
                            disabled={processing}
                        />
                        {errors.website && (
                            <p className="mt-1 text-xs text-destructive">
                                {errors.website}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="facebook" className="mb-2">
                            Facebook
                        </Label>
                        <Input
                            type="text"
                            id="facebook"
                            value={formData.facebook}
                            onChange={(e) =>
                                setData("facebook", e.target.value)
                            }
                            className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.facebook ? "border-destructive" : ""}`}
                            disabled={processing}
                        />
                        {errors.facebook && (
                            <p className="mt-1 text-xs text-destructive">
                                {errors.facebook}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="twitter" className="mb-2">
                            Twitter
                        </Label>
                        <Input
                            type="text"
                            id="twitter"
                            value={formData.twitter}
                            onChange={(e) => setData("twitter", e.target.value)}
                            className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.twitter ? "border-destructive" : ""}`}
                            disabled={processing}
                        />
                        {errors.twitter && (
                            <p className="mt-1 text-xs text-destructive">
                                {errors.twitter}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="youtube" className="mb-2">
                            YouTube
                        </Label>
                        <Input
                            type="text"
                            id="youtube"
                            value={formData.youtube}
                            onChange={(e) => setData("youtube", e.target.value)}
                            className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.youtube ? "border-destructive" : ""}`}
                            disabled={processing}
                        />
                        {errors.youtube && (
                            <p className="mt-1 text-xs text-destructive">
                                {errors.youtube}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button
                            type="button"
                            onClick={() =>
                                router.visit(route("users.pengajar.index"))
                            }
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mr-2"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                            disabled={processing}
                        >
                            {processing ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
