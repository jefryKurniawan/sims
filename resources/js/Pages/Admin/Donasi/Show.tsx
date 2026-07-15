import { Head, Link, useForm } from "@inertiajs/inertia-react";
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    Calendar,
    DollarSign,
    CheckCircle,
} from "lucide-react";

interface Donasi {
    id: number;
    alumni_id: number | null;
    nama_pendonor: string;
    email: string | null;
    no_telp: string | null;
    nominal: number;
    metode_pembayaran: string;
    status: "pending" | "verified" | "rejected";
    tanggal_donasi: string;
    keterangan: string | null;
    anonym: boolean;
    created_at: string;
    updated_at: string;
    alumni: { id: number; user: { name: string }; tahun_lulus: number } | null;
    verified_by: { name: string } | null;
}

interface Props {
    donasi: Donasi;
}

export default function Show({ donasi }: Props) {
    const { post } = useForm();

    const handleVerify = () => {
        if (confirm("Verifikasi donasi ini?")) {
            post(route("admin.donasi.verify", donasi.id));
        }
    };

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            pending: {
                bg: "bg-yellow-100",
                text: "text-yellow-700",
                label: "Pending",
                icon: "⏳",
            },
            verified: {
                bg: "bg-emerald-100",
                text: "text-emerald-700",
                label: "Verified",
                icon: "✅",
            },
            rejected: {
                bg: "bg-red-100",
                text: "text-red-700",
                label: "Rejected",
                icon: "❌",
            },
        };
        const badge = badges[status as keyof typeof badges];
        return (
            <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${badge.bg} ${badge.text}`}
            >
                {badge.icon} {badge.label}
            </span>
        );
    };

    return (
        <>
            <Head title={`Detail Donasi - ${donasi.nama_pendonor}`} />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b">
                    <div className="max-w-4xl mx-auto px-6 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Link
                                    href={route("admin.donasi.index")}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                                >
                                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                                </Link>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        Detail Donasi
                                    </h1>
                                    <p className="text-gray-600 text-sm mt-1">
                                        Informasi lengkap donasi
                                    </p>
                                </div>
                            </div>
                            {donasi.status === "pending" && (
                                <button
                                    onClick={handleVerify}
                                    className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition font-semibold"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Verifikasi
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        {/* Status Banner */}
                        <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                                ID Donasi: #{donasi.id}
                            </span>
                            {getStatusBadge(donasi.status)}
                        </div>

                        <div className="p-6">
                            {/* Nominal */}
                            <div className="mb-8 p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <DollarSign className="w-5 h-5 text-emerald-600" />
                                    <span className="text-sm text-emerald-700 font-semibold">
                                        Total Donasi
                                    </span>
                                </div>
                                <p className="text-4xl font-bold text-emerald-700">
                                    {formatRupiah(donasi.nominal)}
                                </p>
                            </div>

                            {/* Info Grid */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                {/* Nama */}
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <User className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm text-gray-600">
                                            Nama Pendonor
                                        </span>
                                    </div>
                                    <p className="font-bold text-gray-900">
                                        {donasi.anonym
                                            ? "Anonym"
                                            : donasi.nama_pendonor}
                                    </p>
                                </div>

                                {/* Email */}
                                {donasi.email && (
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Mail className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                                Email
                                            </span>
                                        </div>
                                        <p className="font-semibold text-gray-900">
                                            {donasi.email}
                                        </p>
                                    </div>
                                )}

                                {/* No Telp */}
                                {donasi.no_telp && (
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Phone className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                                No. Telepon
                                            </span>
                                        </div>
                                        <p className="font-semibold text-gray-900">
                                            {donasi.no_telp}
                                        </p>
                                    </div>
                                )}

                                {/* Tanggal */}
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm text-gray-600">
                                            Tanggal Donasi
                                        </span>
                                    </div>
                                    <p className="font-semibold text-gray-900">
                                        {new Date(
                                            donasi.tanggal_donasi,
                                        ).toLocaleDateString("id-ID", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>

                                {/* Metode Pembayaran */}
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm text-gray-600">
                                            Metode Pembayaran
                                        </span>
                                    </div>
                                    <p className="font-semibold text-gray-900">
                                        {donasi.metode_pembayaran.toUpperCase()}
                                    </p>
                                </div>

                                {/* Alumni */}
                                {donasi.alumni && (
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <User className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                                Alumni
                                            </span>
                                        </div>
                                        <p className="font-semibold text-gray-900">
                                            {donasi.alumni.user.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Angkatan {donasi.alumni.tahun_lulus}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Keterangan */}
                            {donasi.keterangan && (
                                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                        Keterangan
                                    </h4>
                                    <p className="text-gray-700">
                                        {donasi.keterangan}
                                    </p>
                                </div>
                            )}

                            {/* Timestamps */}
                            <div className="border-t pt-6">
                                <h4 className="font-semibold text-gray-900 mb-4">
                                    Informasi Sistem
                                </h4>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">
                                            Dibuat:
                                        </span>
                                        <p className="font-semibold text-gray-900">
                                            {new Date(
                                                donasi.created_at,
                                            ).toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">
                                            Terakhir Diupdate:
                                        </span>
                                        <p className="font-semibold text-gray-900">
                                            {new Date(
                                                donasi.updated_at,
                                            ).toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                    {donasi.verified_by && (
                                        <div>
                                            <span className="text-gray-600">
                                                Diverifikasi Oleh:
                                            </span>
                                            <p className="font-semibold text-gray-900">
                                                {donasi.verified_by.name}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-gray-50 px-6 py-4 border-t flex items-center justify-end gap-4">
                            <Link
                                href={route("admin.donasi.edit", donasi.id)}
                                className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold"
                            >
                                Edit Donasi
                            </Link>
                            <Link
                                href={route("admin.donasi.index")}
                                className="px-5 py-2.5 border border-primary/20 rounded-lg text-gray-700 hover:bg-gray-100 transition font-semibold"
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
