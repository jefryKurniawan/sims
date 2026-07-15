import { Head, usePage, Link } from "@inertiajs/inertia-react";
import AdminLayout from "@/Layout/AdminLayout";

export default function Index() {
    const { data } = usePage();
    const { visimisi } = data;

    return (
        <AdminLayout
            title="Visi dan Misi"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            Visi dan Misi Sekolah
                        </h1>
                    </div>
                    <Link
                        href={route("website.visimisi.edit", visimisi?.id ?? 1)}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                    >
                        Edit
                    </Link>
                </div>
            }
        >
            <div className="space-y-6">
                {visimisi ? (
                    <>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Visi
                            </h2>
                            <p className="text-gray-700">{visimisi.visi}</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Misi
                            </h2>
                            <p className="text-gray-700">{visimisi.misi}</p>
                        </div>
                        {visimisi.image && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Gambar
                                </h3>
                                <img
                                    src={`/storage/images/visimisi/${visimisi.image}`}
                                    alt="Visi Misi"
                                    className="max-w-full h-auto rounded border"
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-gray-500">
                        Belum ada data visi dan misi.
                    </p>
                )}
            </div>
        </AdminLayout>
    );
}
