import { Head } from "@/Layout/Head";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/inertia-react";
import { Inertia as router } from "@inertiajs/inertia";

export default function Show({ bank }: { bank: any }) {
    return (
        <>
            <Head title="Detail Bank" />
            <div className="pb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h1 className="text-2xl font-bold">Detail Bank</h1>
                    <div className="space-x-3">
                        <Link
                            href={route("master-bank.edit", bank.id)}
                            className={Button}
                        >
                            Edit
                        </Link>
                        <Link
                            href={route("master-bank.index")}
                            className={Button}
                            variant="secondary"
                        >
                            Kembali
                        </Link>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="border rounded-lg p-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Nama Bank
                                </p>
                                <p className="text-lg font-medium text-gray-900">
                                    {bank.nama_bank}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Kode Bank
                                </p>
                                <p className="text-lg font-medium text-gray-900">
                                    {bank.kode_bank}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Cabang
                                </p>
                                <p className="text-lg font-medium text-gray-900">
                                    {bank.cabang}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Rekening Default
                                </p>
                                <p className="text-lg font-medium text-gray-900">
                                    {bank.rekening_default}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-lg p-6">
                        <p className="text-sm font-medium text-gray-500 mb-2">
                            Status
                        </p>
                        <span className="px-3 py-1 rounded-full text-xs font-medium">
                            {bank.deleted_at ? (
                                <>
                                    <Badge variant="destructive">
                                        Tidak Aktif
                                    </Badge>
                                </>
                            ) : (
                                <>
                                    <Badge variant="default">Aktif</Badge>
                                </>
                            )}
                        </span>
                    </div>

                    <div className="border rounded-lg p-6">
                        <p className="text-sm font-medium text-gray-500 mb-2">
                            Timestamps
                        </p>
                        <div className="space-y-2">
                            <div>
                                <p className="text-xs text-gray-500">
                                    Dibuat pada
                                </p>
                                <p className="text-sm font-medium">
                                    {bank.created_at}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">
                                    Diperbarui pada
                                </p>
                                <p className="text-sm font-medium">
                                    {bank.updated_at}
                                </p>
                            </div>
                            {bank.deleted_at && (
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Dihapus pada
                                    </p>
                                    <p className="text-sm font-medium">
                                        {bank.deleted_at}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
