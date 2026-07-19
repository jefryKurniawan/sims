import { Head, Link, router, usePage } from "@inertiajs/inertia-react";
import { Bell, CheckCheck, ChevronLeft, ChevronRight } from "lucide-react";

interface NotificationItem {
    id: string;
    type: string;
    data: Record<string, any>;
    read_at: string | null;
    created_at: string;
}

interface Props {
    notifications: {
        data: NotificationItem[];
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
}

export default function Index({ notifications }: Props) {
    const { flash } = usePage().props as any;

    const markAsRead = (id: string) => {
        router.put(route("notifications.mark-as-read", id), {}, { preserveScroll: true });
    };

    const markAllAsRead = () => {
        router.post(route("notifications.mark-all-read"), {}, { preserveScroll: true });
    };

    const getMessage = (n: NotificationItem): string => {
        if (typeof n.data === "string") return n.data;
        return n.data?.message || n.data?.title || `Notifikasi: ${n.type}`;
    };

    const getTimeAgo = (dateStr: string): string => {
        const d = new Date(dateStr);
        const now = new Date();
        const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
        if (diff < 60) return "baru saja";
        if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
        return d.toLocaleDateString("id-ID");
    };

    return (
        <>
            <Head title="Notifikasi" />
            <div className="p-4 lg:p-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Notifikasi</h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {notifications.total} notifikasi
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={markAllAsRead}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20"
                    >
                        <CheckCheck className="w-4 h-4" />
                        Tandai Semua Dibaca
                    </button>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm">{flash.success}</div>
                )}

                {notifications.data.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl border border-border">
                        <Bell className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-500 font-medium">Belum ada notifikasi</p>
                        <p className="text-sm text-gray-400 mt-1">Notifikasi akan muncul di sini</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-2">
                            {notifications.data.map((n) => (
                                <div
                                    key={n.id}
                                    className={`bg-white rounded-xl border border-border p-4 transition-colors ${
                                        !n.read_at ? "border-l-4 border-l-primary bg-primary/[0.02]" : ""
                                    }`}
                                    onClick={() => !n.read_at && markAsRead(n.id)}
                                    role={!n.read_at ? "button" : undefined}
                                    tabIndex={!n.read_at ? 0 : undefined}
                                    onKeyDown={(e) => { if (e.key === "Enter" && !n.read_at) markAsRead(n.id); }}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm ${n.read_at ? "text-gray-600" : "text-gray-900 font-medium"}`}>
                                                {getMessage(n)}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">{getTimeAgo(n.created_at)}</p>
                                        </div>
                                        {!n.read_at && (
                                            <span className="inline-block w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {notifications.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                                <p className="text-xs text-gray-500">
                                    Halaman {notifications.current_page} dari {notifications.last_page}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        disabled={notifications.current_page <= 1}
                                        onClick={() => router.get(route("notifications.index", { page: notifications.current_page - 1 }))}
                                        className="px-3 py-1.5 text-xs text-gray-700 bg-gray-100 border border-border rounded-lg hover:bg-gray-200 disabled:opacity-50"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        disabled={notifications.current_page >= notifications.last_page}
                                        onClick={() => router.get(route("notifications.index", { page: notifications.current_page + 1 }))}
                                        className="px-3 py-1.5 text-xs text-gray-700 bg-gray-100 border border-border rounded-lg hover:bg-gray-200 disabled:opacity-50"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
