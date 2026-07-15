import { Head, usePage, Link } from "@inertiajs/inertia-react";
import AdminLayout from "@/Layout/AdminLayout";

export default function Show() {
    const { data } = usePage();
    const { footer } = data;

    return (
        <AdminLayout
            title="Detail Footer Website"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            Detail Footer Website
                        </h1>
                    </div>
                    <Link
                        href={route("footer.edit", footer.id)}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                    >
                        Edit
                    </Link>
                </div>
            }
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Media Sosial
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 text-blue-500 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                                    ></path>
                                </svg>
                                <span>{footer.facebook}</span>
                            </div>
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 text-pink-500 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8c-1.1 0-2 .9-2 2s1 2 2 2 2-.9 2-2m0 12c-1.1 0-2 .9-2 2s1 2 2 2 2-.9 2-2m0-6c-1.1 0-2-.9-2-2s1-2 2-2 2.9 2 2 2"
                                    ></path>
                                </svg>
                                <span>{footer.instagram}</span>
                            </div>
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 text-blue-500 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                                    ></path>
                                </svg>
                                <span>{footer.twitter}</span>
                            </div>
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 text-destructive mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M22 12h-4l-3 9L9 3l-3 9h-2"
                                    ></path>
                                </svg>
                                <span>{footer.youtube}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Informasi Kontak
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 text-blue-500 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    ></path>
                                </svg>
                                <span>Email: {footer.email}</span>
                            </div>
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 text-green-500 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    ></path>
                                </svg>
                                <span>Telepon: {footer.telp}</span>
                            </div>
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 text-green-500 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h11a2 2 0 012 2v8a2 2 0 01-2 2z"
                                    ></path>
                                </svg>
                                <span>WhatsApp: {footer.whatsapp}</span>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Logo
                        </h2>
                        {footer.logo ? (
                            <div className="text-center">
                                <img
                                    src={`/storage/images/logo/${footer.logo}`}
                                    alt="Logo Sekolah"
                                    className="max-w-sm h-auto mx-auto border rounded"
                                />
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center">
                                Tidak ada logo
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Deskripsi
                        </h2>
                        <p className="text-gray-700">{footer.desc}</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
