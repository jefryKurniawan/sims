import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia as router } from "@inertiajs/inertia";
import {
    ArrowLeft,
    RefreshCw,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Copy,
    ExternalLink,
    Library,
    Mail,
    Edit,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Show() {
    const { siswa } = usePage().props as any;

    const getStatusBadge = () => {
        const issues: string[] = [];
        if (!siswa.nisn || siswa.nisn === "") issues.push("Kosong");
        if (
            siswa.nisn &&
            (siswa.nisn.length !== 10 || !/^[0-9]{10}$/.test(siswa.nisn))
        )
            issues.push("Format Invalid");

        return issues.length > 0 ? (
            <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
                {issues.join(", ")}
            </span>
        ) : (
            <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                Valid
            </span>
        );
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <Head title={`Detail NISN - ${siswa.nama_lengkap}`} />
            <div className="p-4 lg:p-6">
                <div className="mb-6">
                    <Link
                        href={route("tu.nisn-management.index")}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </Link>
                </div>

                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Main Card */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Header Card */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="text-2xl font-bold text-white font-heading">
                                            {siswa.nama_lengkap}
                                        </h1>
                                        <div className="flex items-center gap-4 mt-2 text-white/80 text-sm">
                                            <span>
                                                NIS:{" "}
                                                <span className="font-mono font-medium">
                                                    {siswa.nis || "-"}
                                                </span>
                                            </span>
                                            <span>
                                                Status:{" "}
                                                <span className="font-medium capitalize">
                                                    {siswa.status}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span
                                            className={cn(
                                                "inline-flex px-3 py-1 rounded-full text-sm font-medium",
                                                getStatusBadge().props
                                                    .className,
                                            )}
                                        >
                                            {getStatusBadge().props.children}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            NISN Saat Ini
                                        </label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span
                                                className={cn(
                                                    "font-mono text-lg",
                                                    !siswa.nisn ||
                                                        siswa.nisn === ""
                                                        ? "text-red-500"
                                                        : siswa.nisn.length !==
                                                                10 ||
                                                            !/^[0-9]{10}$/.test(
                                                                siswa.nisn,
                                                            )
                                                          ? "text-yellow-500"
                                                          : "text-gray-900",
                                                )}
                                            >
                                                {siswa.nisn || "— Kosong —"}
                                            </span>
                                            {siswa.nisn &&
                                                siswa.nisn.length === 10 &&
                                                /^[0-9]{10}$/.test(
                                                    siswa.nisn,
                                                ) && (
                                                    <button
                                                        onClick={() =>
                                                            copyToClipboard(
                                                                siswa.nisn,
                                                            )
                                                        }
                                                        className="p-1.5 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded transition"
                                                        title="Salin NISN"
                                                    >
                                                        <Copy className="w-4 h-4" />
                                                    </button>
                                                )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            Jurusan
                                        </label>
                                        <p className="mt-1 text-gray-900">
                                            {siswa.jurusan?.nama_jurusan || "-"}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            Kelas Aktif
                                        </label>
                                        <p className="mt-1 text-gray-900">
                                            {siswa.kelasAktif?.kelas
                                                ?.nama_kelas || "-"}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            Tanggal Masuk
                                        </label>
                                        <p className="mt-1 text-gray-900">
                                            {siswa.tanggal_masuk
                                                ? new Date(
                                                      siswa.tanggal_masuk,
                                                  ).toLocaleDateString(
                                                      "id-ID",
                                                      {
                                                          day: "2-digit",
                                                          month: "long",
                                                          year: "numeric",
                                                      },
                                                  )
                                                : "-"}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() =>
                                            router.post(
                                                route(
                                                    "tu.nisn-management.regenerate",
                                                    siswa.id,
                                                ),
                                                {
                                                    reason:
                                                        prompt(
                                                            "Alasan regenerate NISN:",
                                                        ) ||
                                                        "Manual regenerate dari detail",
                                                },
                                            )
                                        }
                                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Regenerate NISN
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sync Logs */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Riwayat Perubahan NISN
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {siswa.nisnSyncLogs?.length > 0 ? (
                                    siswa.nisnSyncLogs.map((log: any) => (
                                        <div
                                            key={log.id}
                                            className="p-6 hover:bg-gray-50"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className={cn(
                                                            "w-10 h-10 rounded-lg flex items-center justify-center",
                                                            log.action ===
                                                                "regenerate" &&
                                                                "bg-blue-100 text-blue-600",
                                                            log.action ===
                                                                "bulk_regenerate" &&
                                                                "bg-purple-100 text-purple-600",
                                                            log.action ===
                                                                "fix_duplicate" &&
                                                                "bg-yellow-100 text-yellow-600",
                                                            log.action ===
                                                                "fix_empty" &&
                                                                "bg-green-100 text-green-600",
                                                            log.action ===
                                                                "sync_dapodik" &&
                                                                "bg-indigo-100 text-indigo-600",
                                                        )}
                                                    >
                                                        <RefreshCw className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 capitalize">
                                                            {log.action.replace(
                                                                "_",
                                                                " ",
                                                            )}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {log.reason}
                                                            {log.executor &&
                                                                ` • Oleh: ${log.executor.name}`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <div>
                                                        <span className="font-mono text-gray-700">
                                                            {log.old_nisn ||
                                                                "—"}
                                                        </span>
                                                        <ArrowRightLeft className="w-4 h-4 mx-2 text-gray-400 hidden md:inline" />
                                                        <span className="font-mono text-blue-700 font-medium">
                                                            {log.new_nisn}
                                                        </span>
                                                    </div>
                                                    <span className="text-gray-400">
                                                        {new Date(
                                                            log.created_at,
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            },
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center text-gray-500">
                                        <RefreshCw className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                                        <p>Belum ada riwayat perubahan NISN</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Card */}
                    <div className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Info Siswa
                            </h3>
                            <dl className="space-y-4">
                                <div>
                                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Nama Lengkap
                                    </dt>
                                    <dd className="mt-1 text-gray-900">
                                        {siswa.nama_lengkap}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Tempat / Tanggal Lahir
                                    </dt>
                                    <dd className="mt-1 text-gray-900">
                                        {siswa.tempat_lahir},{" "}
                                        {siswa.tanggal_lahir
                                            ? new Date(
                                                  siswa.tanggal_lahir,
                                              ).toLocaleDateString("id-ID")
                                            : "-"}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Jenis Kelamin
                                    </dt>
                                    <dd className="mt-1 text-gray-900 capitalize">
                                        {siswa.jenis_kelamin}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        No. HP
                                    </dt>
                                    <dd className="mt-1 text-gray-900">
                                        {siswa.no_hp || "-"}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Email
                                    </dt>
                                    <dd className="mt-1 text-gray-900">
                                        {siswa.email || "-"}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Nama Orang Tua
                                    </dt>
                                    <dd className="mt-1 text-gray-900">
                                        {siswa.nama_ortu || "-"}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        No. HP Ortu
                                    </dt>
                                    <dd className="mt-1 text-gray-900">
                                        {siswa.no_hp_ortu || "-"}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Alamat
                                    </dt>
                                    <dd className="mt-1 text-gray-900">
                                        {siswa.alamat || "-"}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Aksi Cepat
                            </h3>
                            <div className="space-y-3">
                                <Link
                                    href={route("users.murid.edit", siswa.id)}
                                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                                >
                                    <span className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <Edit className="w-5 h-5" />
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        Edit Data Siswa
                                    </span>
                                </Link>
                                <Link
                                    href={route("buku-induk.show", siswa.id)}
                                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                                >
                                    <span className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                                        <Library className="w-5 h-5" />
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        Buku Induk Digital
                                    </span>
                                </Link>
                                <Link
                                    href={route("tu.surat-masuk.index")}
                                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                                >
                                    <span className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                                        <Mail className="w-5 h-5" />
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        Surat Masuk TU
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
