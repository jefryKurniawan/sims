import { Head, Link, useForm } from "@inertiajs/inertia-react";
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    Calendar,
    Link as LinkIcon,
    Laptop,
    Briefcase,
} from "lucide-react";

interface Alumni {
    id: number;
    user: { name: string };
    tahun_lulus: number;
}

interface TracerStudy {
    id: number;
    alumni_id?: number;
    nama_lengkap: string;
    jenjang_pendidikan: string | null;
    nama_instansi: string | null;
    bidang_studi: string | null;
    tahun_lulus: number | null;
    status: "kuliah" | "bekerja" | "wirausaha" | "tidak_bekerja";
    alamat: string | null;
    no_telp: string | null;
    linkedin: string | null;
    created_at: string;
    updated_at: string;
    alumni: Alumni | null;
}

interface Props {
    tracerStudy: TracerStudy;
}

export default function Show({ tracerStudy }: Props) {
    const { data } = useForm(); // for future actions like verify

    const getStatusBadge = (status: string) => {
        const badges: { [key: string]: string } = {
            kuliah: "bg-blue-100 text-blue-700",
            bekerja: "bg-emerald-100 text-emerald-700",
            wirausaha: "bg-purple-100 text-purple-700",
            tidak_bekerja: "bg-gray-100 text-gray-700",
        };
        return status;
    };

    return (
        <>
            <Head title={`Detail Tracer Study - ${tracerStudy.nama_lengkap}`} />

            <div className="min-h-screen bg-gray-50">
                <div className="bg-white border-b">
                    <div className="max-w-4xl mx-auto px-6 py-6">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route("admin.tracer-study.index")}
                                className="p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Detail Tracer Study
                                </h1>
                                <p className="text-gray-600 text-sm mt-1">
                                    Informasi lengkap alumni
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="border-b pb-4 mb-4">
                            <h2 className="text-xl font-bold mb-2">
                                {tracerStudy.nama_lengkap}
                            </h2>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(tracerStudy.status)}`}
                            >
                                {tracerStudy.status}
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Status */}
                            <div>
                                <h4 className="font-semibold mb-2">Status</h4>
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-6 h-6 text-gray-600" />
                                    <span className="text-gray-900">
                                        {tracerStudy.status}
                                    </span>
                                </div>
                            </div>

                            {/* Alumni */}
                            {tracerStudy.alumni && (
                                <div>
                                    <h4 className="font-semibold mb-2">
                                        Alumni
                                    </h4>
                                    <div className="flex items-center gap-2">
                                        <User className="w-6 h-6 text-gray-600" />
                                        <span className="text-gray-900">
                                            {tracerStudy.alumni.user.name}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Tahun Lulus */}
                            <div>
                                <h4 className="font-semibold mb-2">
                                    Tahun Lulus
                                </h4>
                                <p className="text-gray-900">
                                    {tracerStudy.tahun_lulus || "-"}
                                </p>
                            </div>

                            {/* Jenjang Pendidikan */}
                            <div>
                                <h4 className="font-semibold mb-2">
                                    Jenjang Pendidikan
                                </h4>
                                <p className="text-gray-900">
                                    {tracerStudy.jenjang_pendidikan || "-"}
                                </p>
                            </div>

                            {/* Nama Instansi*/}
                            <div>
                                <h4 className="font-semibold mb-2">
                                    Instansi/Kampus
                                </h4>
                                <p className="text-gray-900">
                                    {tracerStudy.nama_instansi || "-"}
                                </p>
                            </div>

                            {/* Bidang Studi */}
                            <div>
                                <h4 className="font-semibold mb-2">
                                    Bidang Studi
                                </h4>
                                <p className="text-gray-900">
                                    {tracerStudy.bidang_studi || "-"}
                                </p>
                            </div>

                            {/* No Telp */}
                            {tracerStudy.no_telp && (
                                <div>
                                    <h4 className="font-semibold mb-2">
                                        No. Telepon
                                    </h4>
                                    <p className="text-gray-900">
                                        {tracerStudy.no_telp}
                                    </p>
                                </div>
                            )}

                            {/* LinkedIn */}
                            {tracerStudy.linkedin && (
                                <div>
                                    <h4 className="font-semibold mb-2">
                                        LinkedIn
                                    </h4>
                                    <a
                                        href={tracerStudy.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {tracerStudy.linkedin}
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="mt-6">
                            <h4 className="font-bold mb-2">Alamat</h4>
                            <p className="text-gray-900">
                                {tracerStudy.alamat || "-"}
                            </p>
                        </div>

                        <div className="border-t mt-8 pt-4">
                            <span className="text-sm text-gray-600">
                                Dibuat:{" "}
                                {new Date(
                                    tracerStudy.created_at,
                                ).toLocaleString("id-ID")}
                            </span>
                            <br />
                            <span className="text-sm text-gray-600">
                                Terakhir diupdate:{" "}
                                {new Date(
                                    tracerStudy.updated_at,
                                ).toLocaleString("id-ID")}
                            </span>
                        </div>

                        <div className="mt-8 flex justify-end gap-4">
                            <Link
                                href={route(
                                    "admin.tracer-study.edit",
                                    tracerStudy.id,
                                )}
                                className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold"
                            >
                                Edit
                            </Link>
                            <Link
                                href={route("admin.tracer-study.index")}
                                className="px-6 py-2.5 border border-primary/20 rounded-lg text-gray-700 hover:bg-gray-100 transition font-semibold"
                            >
                                Kembali
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
