import { Head } from "@/Layout/Head";

export default function DapodikSync({ syncLogs, stats, mappings }: any) {
    return (
        <>
            <Head title="Sinkronisasi Dapodik" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">
                                Sinkronisasi Dapodik
                            </h1>
                            <p className="text-muted-foreground mt-1 text-sm">
                                Sinkronisasi data siswa, guru, dan rombongan belajar
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Statistik */}
                        <div className="bg-card p-4 rounded-xl shadow-sm border-border border">
                            <h2 className="font-semibold text-foreground mb-2">
                                Statistik
                            </h2>
                            <div className="space-y-1">
                                <div className="flex">
                                    <span className="w-32 font-medium text-muted-foreground">
                                        Pending
                                    </span>
                                    <span className="text-foreground">
                                        {stats.pending ?? 0}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-muted-foreground">
                                        Berhasil (Hari Ini)
                                    </span>
                                    <span className="text-foreground">
                                        {stats.success ?? 0}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-muted-foreground">
                                        Gagal (Hari Ini)
                                    </span>
                                    <span className="text-foreground">
                                        {stats.failed ?? 0}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-muted-foreground">
                                        Total Mapping
                                    </span>
                                    <span className="text-foreground">
                                        {stats.total_mappings ?? 0}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Log Sinkronisasi */}
                        <div className="bg-card p-4 rounded-xl shadow-sm border-border border">
                            <h2 className="font-semibold text-foreground mb-2">
                                Log Sinkronisasi Terbaru
                            </h2>
                            {syncLogs.length > 0 ? (
                                <ul className="space-y-1">
                                    {syncLogs.map((log: any) => (
                                        <li
                                            key={log.id}
                                            className="flex justify-between text-sm"
                                        >
                                            <span className="text-foreground">
                                                {log.entity_type} #{log.entity_id} -{" "}
                                                {log.action}
                                            </span>
                                            <span
                                                className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                                    log.status === "success"
                                                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                                        : log.status === "failed"
                                                          ? "bg-destructive/10 text-destructive"
                                                          : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                                                }`}
                                            >
                                                {log.status}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted-foreground text-sm">
                                    Belum ada log sinkronisasi.
                                </p>
                            )}
                        </div>

                        {/* Mapping ID */}
                        <div className="bg-card p-4 rounded-xl shadow-sm border-border border">
                            <h2 className="font-semibold text-foreground mb-2">
                                Mapping ID Lokal ke Dapodik
                            </h2>
                            {mappings.length > 0 ? (
                                <ul className="space-y-1">
                                    {mappings.map((m: any) => (
                                        <li
                                            key={`${m.entity_type}-${m.local_id}`}
                                            className="flex justify-between text-sm"
                                        >
                                            <span className="text-foreground">
                                                {m.entity_type}: {m.local_id} →{" "}
                                                {m.dapodik_id}
                                            </span>
                                            <span className="text-muted-foreground text-xs">
                                                {m.last_sync_at ??
                                                    "Belum pernah sync"}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted-foreground text-sm">
                                    Belum ada mapping data.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
