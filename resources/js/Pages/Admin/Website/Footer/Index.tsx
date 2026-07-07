import { Head, usePage, Link } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layout/AdminLayout';

export default function Index() {
    const { data } = usePage();
    const { footer } = data;

    return (
        <AdminLayout
            title="Footer Website"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Footer Website</h1>
                    </div>
                    {footer ? (
                        <Link
                            href={route('footer.edit', footer.id)}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                        >
                            Edit Footer
                        </Link>
                    ) : (
                        <Link
                            href={route('footer.create')}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                        >
                            Tambah Footer
                        </Link>
                    )}
                </div>
            }
        >
            <div className="space-y-6">
                {footer ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">Media Sosial</h2>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <span className="w-20 text-gray-500">Facebook:</span>
                                        <span>{footer.facebook ?? '-'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-20 text-gray-500">Instagram:</span>
                                        <span>{footer.instagram ?? '-'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-20 text-gray-500">Twitter:</span>
                                        <span>{footer.twitter ?? '-'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-20 text-gray-500">YouTube:</span>
                                        <span>{footer.youtube ?? '-'}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">Kontak</h2>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <span className="w-20 text-gray-500">Email:</span>
                                        <span>{footer.email ?? '-'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-20 text-gray-500">Telepon:</span>
                                        <span>{footer.telp ?? '-'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-20 text-gray-500">WhatsApp:</span>
                                        <span>{footer.whatsapp ?? '-'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {footer.logo && (
                            <div className="mt-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">Logo</h2>
                                <img
                                    src={`/storage/images/logo/${footer.logo}`}
                                    alt="Footer Logo"
                                    className="max-w-xs h-auto rounded border"
                                />
                            </div>
                        )}

                        <div className="mt-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">Deskripsi</h2>
                            <p className="text-gray-700">{footer.desc ?? '-'}</p>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500">Belum ada data footer. Silakan tambah terlebih dahulu.</p>
                )}
            </div>
        </AdminLayout>
    );
}