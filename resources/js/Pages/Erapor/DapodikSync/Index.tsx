import { Head } from "@/Layout/Head";

export default function DapodikSync({ syncLogs, stats, mappings }) {
    return (
        <>
            <Head title="Sinkronisasi Dapodik" />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Sinkronisasi Dapodik
                </h1>
                <div className="space-y-6">
                    {/* Statistik */}
                    <div className="bg-white p-4 rounded-lg shadow border">
                        <h2 className="font-semibold text-gray-700 mb-2">
                            Statistik
                        </h2>
                        <div className="space-y-1">
                            <div className="flex">
                                <span className="w-32 font-medium text-gray-600">
                                    Pending
                                </span>
                                <span className="text-gray-900">
                                    {stats.pending ?? 0}
                                </span>
                            </div>
                            <div className="flex">
                                <span className="w-32 font-medium text-gray-600">
                                    Berhasil (Hari Ini)
                                </span>
                                <span className="text-gray-900">
                                    {stats.success ?? 0}
                                </span>
                            </div>
                            <div className="flex">
                                <span className="w-32 font-medium text-gray-600">
                                    Gagal (Hari Ini)
                                </span>
                                <span className="text-gray-900">
                                    {stats.failed ?? 0}
                                </span>
                            </div>
                            <div className="flex">
                                <span className="w-32 font-medium text-gray-600">
                                    Total Mapping
                                </span>
                                <span className="text-gray-900">
                                    {stats.total_mappings ?? 0}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Log Sinkronisasi */}
                    <div className="bg-white p-4 rounded-lg shadow border">
                        <h2 className="font-semibold text-gray-700 mb-2">
                            Log Sinkronisasi Terbaru
                        </h2>
                        {syncLogs.length > 0 ? (
                            <ul className="space-y-1">
                                {syncLogs.map((log) => (
                                    <li
                                        key={log.id}
                                        className="flex justify-between text-sm"
                                    >
                                        <span>
                                            {log.entity_type} #{log.entity_id} -{" "}
                                            {log.action}
                                        </span>
                                        <span
                                            className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                                log.status === "success"
                                                    ? "bg-green-100 text-green-700"
                                                    : log.status === "failed"
                                                      ? "bg-destructive/10 text-destructive"
                                                      : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {log.status}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">
                                Belum ada log sinkronisasi.
                            </p>
                        )}
                    </div>

                    {/* Mapping ID */}
                    <div className="bg-white p-4 rounded-lg shadow border">
                        <h2 className="font-semibold text-gray-700 mb-2">
                            Mapping ID Lokal ke Dapodik
                        </h2>
                        {mappings.length > 0 ? (
                            <ul className="space-y-1">
                                {mappings.map((m) => (
                                    <li
                                        key={`${m.entity_type}-${m.local_id}`}
                                        className="flex justify-between text-sm"
                                    >
                                        <span>
                                            {m.entity_type}: {m.local_id} →{" "}
                                            {m.dapodik_id}
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            {m.last_sync_at ??
                                                "Belum pernah sync"}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">
                                Belum ada mapping data.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
