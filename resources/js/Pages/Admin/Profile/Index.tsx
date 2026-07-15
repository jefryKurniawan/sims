import { Head, useForm } from "@inertiajs/inertia-react";
import { Inertia as router } from "@inertiajs/inertia";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";

export default function ProfileIndex({ profile }) {
    const [activeTab, setActiveTab] = useState("profile"); // 'profile' or 'password'
    const {
        data: profileData,
        put: updateProfile,
        processing: profileProcessing,
        errors: profileErrors,
    } = useForm({
        name: profile.name ?? "",
        username: profile.username ?? "",
        email: profile.email ?? "",
        foto_profile: null,
    });

    const {
        data: passwordData,
        put: updatePassword,
        processing: passwordProcessing,
        errors: passwordErrors,
    } = useForm({
        password: "",
        password_confirmation: "",
    });

    const handleProfileImageChange = (e) => {
        if (e.target.files[0]) {
            profileData.foto_profile = e.target.files[0];
        }
    };

    const handleSubmitProfile = (e) => {
        e.preventDefault();
        updateProfile(route("profile.update", profile.id), {
            onSuccess: () => {
                // Success handled by Inertia
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        updatePassword(route("profile.change-password", profile.id), {
            onSuccess: () => {
                // Reset password form
                passwordData.password = "";
                passwordData.password_confirmation = "";
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    return (
        <>
            <Head title="Profile Settings" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Pengaturan Profil
                    </h1>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`px-4 py-2 bg-${activeTab === "profile" ? "primary/20" : "gray-200"} text-${activeTab === "profile" ? "primary" : "gray-600"} rounded-md hover:bg-gray-300 transition-colors`}
                        >
                            Profil
                        </button>
                        <button
                            onClick={() => setActiveTab("password")}
                            className={`px-4 py-2 bg-${activeTab === "password" ? "primary/20" : "gray-200"} text-${activeTab === "password" ? "primary" : "gray-600"} rounded-md hover:bg-gray-300 transition-colors`}
                        >
                            Ubah Password
                        </button>
                    </div>
                </div>

                {activeTab === "profile" && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 mb-4">
                            {profile.foto_profile ? (
                                <img
                                    src={`/storage/images/profile/${profile.foto_profile}`}
                                    alt="Foto Profil"
                                    className="h-16 w-16 rounded-full object-cover border border-gray-200"
                                />
                            ) : (
                                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    Tidak Ada Foto
                                </div>
                            )}
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    {profile.name}
                                </h2>
                                <p className="text-gray-600">{profile.email}</p>
                            </div>
                        </div>

                        <form
                            onSubmit={handleSubmitProfile}
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="name" className="mb-2">
                                    Nama Lengkap
                                </Label>
                                <Input
                                    type="text"
                                    id="name"
                                    value={profileData.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${profileErrors.name ? "border-destructive" : ""}`}
                                    disabled={profileProcessing}
                                />
                                {profileErrors.name && (
                                    <p className="mt-1 text-xs text-destructive">
                                        {profileErrors.name}
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
                                    value={profileData.username}
                                    onChange={(e) =>
                                        setData("username", e.target.value)
                                    }
                                    className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${profileErrors.username ? "border-destructive" : ""}`}
                                    disabled={profileProcessing}
                                />
                                {profileErrors.username && (
                                    <p className="mt-1 text-xs text-destructive">
                                        {profileErrors.username}
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
                                    value={profileData.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${profileErrors.email ? "border-destructive" : ""}`}
                                    disabled={profileProcessing}
                                />
                                {profileErrors.email && (
                                    <p className="mt-1 text-xs text-destructive">
                                        {profileErrors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="foto_profile" className="mb-2">
                                    Foto Profile
                                </Label>
                                <div className="flex items-center gap-4 mb-2">
                                    {profile.foto_profile ? (
                                        <img
                                            src={`/storage/images/profile/${profile.foto_profile}`}
                                            alt="Foto Profil Saat Ini"
                                            className="h-12 w-12 rounded-full object-cover border border-gray-200"
                                        />
                                    ) : (
                                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                            Tidak Ada Foto
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    id="foto_profile"
                                    accept="image/*"
                                    onChange={handleProfileImageChange}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary"
                                    disabled={profileProcessing}
                                />
                                {profileErrors.foto_profile && (
                                    <p className="mt-1 text-xs text-destructive">
                                        {profileErrors.foto_profile}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mr-2"
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                                    disabled={profileProcessing}
                                >
                                    {profileProcessing
                                        ? "Mengupdate..."
                                        : "Update Profil"}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {activeTab === "password" && (
                    <form onSubmit={handleSubmitPassword} className="space-y-4">
                        <div>
                            <Label htmlFor="password" className="mb-2">
                                Password Baru
                            </Label>
                            <Input
                                type="password"
                                id="password"
                                value={passwordData.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${passwordErrors.password ? "border-destructive" : ""}`}
                                disabled={passwordProcessing}
                            />
                            {passwordErrors.password && (
                                <p className="mt-1 text-xs text-destructive">
                                    {passwordErrors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label
                                htmlFor="password_confirmation"
                                className="mb-2"
                            >
                                Konfirmasi Password Baru
                            </Label>
                            <Input
                                type="password"
                                id="password_confirmation"
                                value={passwordData.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                className={`w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${passwordErrors.password_confirmation ? "border-destructive" : ""}`}
                                disabled={passwordProcessing}
                            />
                            {passwordErrors.password_confirmation && (
                                <p className="mt-1 text-xs text-destructive">
                                    {passwordErrors.password_confirmation}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="button"
                                onClick={() => window.history.back()}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mr-2"
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                                disabled={passwordProcessing}
                            >
                                {passwordProcessing
                                    ? "Mengupdate..."
                                    : "Ubah Password"}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
