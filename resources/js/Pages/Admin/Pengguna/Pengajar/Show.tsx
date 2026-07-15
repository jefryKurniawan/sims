import { Head } from "@inertiajs/inertia-react";
import { Badge } from "@/components/ui/badge";

export default function PengajarShow({ pengajar }) {
    return (
        <>
            <Head title="Detail Pengajar" />
            <div className="p-6 space-y-6">
                <div className="flex items-center gap-4 mb-4">
                    {pengajar.foto_profile ? (
                        <img
                            src={`/storage/images/profile/${pengajar.foto_profile}`}
                            alt="Foto Profil"
                            className="h-16 w-16 rounded-full object-cover border border-gray-200"
                        />
                    ) : (
                        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            Tidak Ada Foto
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {pengajar.name}
                        </h1>
                        <p className="text-gray-600">{pengajar.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Informasi Akun
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <span className="w-20 text-gray-500">
                                    Username:
                                </span>
                                <span className="text-gray-700">
                                    {pengajar.username}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-20 text-gray-500">
                                    Role:
                                </span>
                                <span className="text-gray-700">
                                    {pengajar.role}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-20 text-gray-500">
                                    Status:
                                </span>
                                <Badge
                                    variant={
                                        pengajar.status === "Aktif"
                                            ? "default"
                                            : "destructive"
                                    }
                                >
                                    {pengajar.status}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Detail Pengajar
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <span className="w-20 text-gray-500">NIP:</span>
                                <span className="text-gray-700">
                                    {pengajar.userDetail?.nip ?? "-"}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-20 text-gray-500">
                                    Mengajar:
                                </span>
                                <span className="text-gray-700">
                                    {pengajar.userDetail?.mengajar ?? "-"}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-20 text-gray-500">
                                    LinkedIn:
                                </span>
                                <span className="text-gray-700">
                                    {pengajar.userDetail?.linkidln ?? "-"}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-20 text-gray-500">
                                    Instagram:
                                </span>
                                <span className="text-gray-700">
                                    {pengajar.userDetail?.instagram ?? "-"}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-20 text-gray-500">
                                    Website:
                                </span>
                                <span className="text-gray-700">
                                    {pengajar.userDetail?.website ?? "-"}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-20 text-gray-500">
                                    Facebook:
                                </span>
                                <span className="text-gray-700">
                                    {pengajar.userDetail?.facebook ?? "-"}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-20 text-gray-500">
                                    Twitter:
                                </span>
                                <span className="text-gray-700">
                                    {pengajar.userDetail?.twitter ?? "-"}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-20 text-gray-500">
                                    YouTube:
                                </span>
                                <span className="text-gray-700">
                                    {pengajar.userDetail?.youtube ?? "-"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
