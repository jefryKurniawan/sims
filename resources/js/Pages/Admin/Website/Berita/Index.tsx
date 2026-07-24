import { Head } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { useForm, Link, usePage } from '@inertiajs/inertia-react';
import {
    Search, Filter, Plus, Edit, Trash2, Eye, Send, CheckCircle, XCircle,
    Download, Newspaper, FileText, CalendarDays, CircleCheck, Clock,
    User as UserIcon, Megaphone, PartyPopper, PenLine,
} from 'lucide-react';
import ConfirmModal from "@/Components/ConfirmModal";
interface BeritaItem {
    id: number;
    title: string;
    slug: string;
    content: string;
    kategori: string;
    status: string;
    thumbnail: string | null;
    published_at: string | null;
    created_at: string;
    penulis: { id: number; name: string } | null;
    approvedBy: { id: number; name: string } | null;
    createdBy: { id: number; name: string } | null;
}

interface Props {
    berita: {
        data: BeritaItem[];
        current_page: number;
        last_page: number;
        per_page: number;
        from: number;
        to: number;
        total: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    filters: { status: string; search: string; kategori: string };
    stats: { all: number; draft: number; pending: number; published: number; rejected: number };
    kategoriOptions: string[];
    statusOptions: string[];
}

const statusLabels: Record<string, string> = {
    all: 'Semua',
    draft: 'Draft',
    pending: 'Menunggu',
    published: 'Dipublikasikan',
    rejected: 'Ditolak',
};

const kategoriLabels: Record<string, string> = {
    pengumuman: 'Pengumuman',
    kegiatan: 'Kegiatan',
    artikel: 'Artikel',
};

export default function BeritaIndex({ berita, filters, stats, kategoriOptions }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string; error?: string } };
    const { auth } = usePage().props as { auth: { user: { id: number; roles: string[] } } };
    const user = auth?.user;
    const userRoles = user?.roles ?? [];
    const isAdminOrHumas = userRoles.some((r) => ['Admin', 'Humas'].includes(r));
    const isPenulis = userRoles.includes('Penulis');

    const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
	const [confirmAction, setConfirmAction] = useState<{type: string; id: number} | null>(null);
	const [rejectReason, setRejectReason] = useState("");
	const [search, setSearch] = useState(filters.search ?? '');
    const [statusFilter, setStatusFilter] = useState(filters.status ?? 'all');
    const [kategoriFilter, setKategoriFilter] = useState(filters.kategori ?? '');

    const form = useForm({
        search,
        status: statusFilter,
        kategori: kategoriFilter,
    });

    const applyFilters = () => {
        form.setData({
            search,
            status: statusFilter,
            kategori: kategoriFilter,
        });
        form.get(route('admin.berita.index'), { preserveScroll: true });
    };

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const handleTab = (key: string) => {
        setStatusFilter(key);
        form.setData('status', key);
        form.get(
            route('admin.berita.index', {
                status: key,
                search,
                kategori: kategoriFilter,
            }),
            { preserveScroll: true }
        );
    };

    const handleDelete = (id: number) => {
        setDeleteTarget(id);
    };

    const confirmDelete = () => {
        if (deleteTarget === null) return;
        form.delete(route('admin.berita.destroy', deleteTarget), {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                setDeleteTarget(null);
            },
        });
    };

    const handleAction = (action: 'submit' | 'approve' | 'reject', id: number) => {
        const confirmMessages: Record<string, string> = {
            submit: 'Kirim berita ini untuk persetujuan?',
            approve: 'Setujui dan publikasikan berita ini?',
            reject: 'Tolak berita ini?',
        };
        if (!confirm(confirmMessages[action])) return;

        if (action === 'reject') {
            const reason = prompt('Alasan penolakan:');
            if (!reason) return;
            form.post(route('admin.berita.reject', id), {
                data: { rejection_reason: reason },
                preserveScroll: true,
            });
            return;
        }
        form.post(route(`admin.berita.${action}`, id), { preserveScroll: true });
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, { bg: string; text: string; icon: any; label: string }> = {
            draft: { bg: 'bg-gray-100', text: 'text-gray-700', icon: PenLine, label: 'Draft' },
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, label: 'Menunggu' },
            published: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CircleCheck, label: 'Dipublikasikan' },
            rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Ditolak' },
        };
        const s = styles[status] ?? styles.draft;
        const Icon = s.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
                <Icon className="w-3 h-3" />
                {s.label}
           </span>
        );
    };

    const getKategoriBadge = (kategori: string) => {
        const styles: Record<string, { bg: string; text: string; icon: any; label: string }> = {
            pengumuman: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Megaphone, label: 'Pengumuman' },
            kegiatan: { bg: 'bg-purple-100', text: 'text-purple-700', icon: PartyPopper, label: 'Kegiatan' },
            artikel: { bg: 'bg-indigo-100', text: 'text-indigo-700', icon: FileText, label: 'Artikel' },
        };
        const k = styles[kategori] ?? styles.artikel;
        const Icon = k.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${k.bg} ${k.text}`}>
                <Icon className="w-3 h-3" />
                {k.label}
           </span>
        );
    };

    const isOwner = (item: BeritaItem) =>
        item.penulis?.id === user?.id || item.createdBy?.id === user?.id;

    const statsCards = [
        { key: 'all', label: 'Total Berita', value: stats.all, color: 'blue', icon: Newspaper },
        { key: 'draft', label: 'Draft', value: stats.draft, color: 'gray', icon: PenLine },
        { key: 'pending', label: 'Menunggu Approval', value: stats.pending, color: 'yellow', icon: Clock },
        { key: 'published', label: 'Dipublikasikan', value: stats.published, color: 'emerald', icon: CircleCheck },
        { key: 'rejected', label: 'Ditolak', value: stats.rejected, color: 'red', icon: XCircle },
    ];

    return (
        <>
            <Head title="Kelola Berita" />

            <div className="p-4 lg:p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                            Kelola Berita
                       </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Buat, edit, dan kelola berita sekolah — dengan alur approval
                            (Menunggu → Dipublikasikan / Ditolak) untuk menjaga kualitas konten.
                       </p>
                   </div>
                    <Link
                        href={route('admin.berita.create')}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Berita
                   </Link>
               </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{flash.success}</span>
                   </div>
                )}
                {flash?.error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
                        <XCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{flash.error}</span>
                   </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {statsCards.map((card) => {
                        const Icon = card.icon;
                        const isActive = statusFilter === card.key;
                        return (
                            <button
                                key={card.key}
                                type="button"
                                onClick={() => handleTab(card.key)}
                                className={`text-left bg-white rounded-xl shadow-sm border-2 p-4 hover:shadow transition ${
                                    isActive
                                        ? 'border-primary ring-2 ring-primary/20'
                                        : 'border-transparent hover:border-gray-200'
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">
                                            {card.label}
                                       </p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">
                                            {card.value}
                                       </p>
                                   </div>
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${card.color}-100`}>
                                        <Icon className={`w-5 h-5 text-${card.color}-600`} />
                                   </div>
                               </div>
                           </button>
                        );
                    })}
               </div>

                {/* Filter Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gray-500" />
                        <h3 className="font-semibold text-gray-900">Cari & Filter</h3>
                   </div>
                    <form onSubmit={handleFilter} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                                <label
                                    htmlFor="search"
                                    className="block text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Cari Judul atau Konten
                               </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        id="search"
                                        type="text"
                                        placeholder="Ketik judul atau isi berita..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                               </div>
                           </div>
                            <div>
                                <label
                                    htmlFor="kategori"
                                    className="block text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Kategori
                               </label>
                                <select
                                    id="kategori"
                                    value={kategoriFilter}
                                    onChange={(e) => setKategoriFilter(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="">Semua Kategori</option>
                                    {kategoriOptions.map((k) => (
                                        <option key={k} value={k}>
                                            {kategoriLabels[k]}
                                       </option>
                                    ))}
                               </select>
                           </div>
                       </div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-500">
                                Menampilkan <span className="font-semibold">{berita.from ?? 0}</span> –{' '}
                                <span className="font-semibold">{berita.to ?? 0}</span> dari{' '}
                                <span className="font-semibold">{berita.total}</span> berita
                           </p>
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition shadow-sm"
                            >
                                <Filter className="w-4 h-4" />
                                Terapkan Filter
                           </button>
                       </div>
                   </form>
               </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="w-12 py-3 px-4 text-xs font-semibold text-gray-600 uppercase text-center">
                                        No
                                   </th>
                                    <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase text-left">
                                        Judul Berita
                                   </th>
                                    <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase text-left">
                                        Kategori
                                   </th>
                                    <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase text-left">
                                        Status
                                   </th>
                                    <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase text-left">
                                        Penulis
                                   </th>
                                    <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase text-left">
                                        Dipublikasi
                                   </th>
                                    <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase text-center">
                                        Aksi
                                   </th>
                               </tr>
                           </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {berita.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-16 text-center">
                                            <div className="flex flex-col items-center gap-2 text-gray-500">
                                                <Newspaper className="w-12 h-12 text-gray-300" />
                                                <p className="font-medium">Tidak ada berita ditemukan</p>
                                                <p className="text-sm">
                                                    Belum ada berita yang sesuai dengan filter saat ini,
                                                    atau klik <strong>+ Tambah Berita</strong> untuk membuat
                                                    baru.
                                               </p>
                                           </div>
                                       </td>
                                   </tr>
                                ) : (
                                    berita.data.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition">
                                            <td className="py-3 px-4 text-center text-sm text-gray-500 font-medium">
                                                {((berita.current_page ?? 1) - 1) * (berita.per_page ?? 10) + index + 1}
                                           </td>
                                            <td className="py-3 px-4">
                                                <div className="font-semibold text-gray-900 max-w-md truncate">
                                                    {item.title}
                                               </div>
                                                <div className="text-xs text-gray-400 mt-0.5 truncate">
                                                    /berita/{item.slug}
                                               </div>
                                           </td>
                                            <td className="py-3 px-4">
                                                {getKategoriBadge(item.kategori)}
                                           </td>
                                            <td className="py-3 px-4">
                                                {getStatusBadge(item.status)}
                                           </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <UserIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                    <span className="truncate max-w-[10rem]">
                                                        {item.penulis?.name ??
                                                            item.createdBy?.name ??
                                                            'Anonim'}
                                                   </span>
                                               </div>
                                           </td>
                                            <td className="py-3 px-4">
                                                {item.published_at ? (
                                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                                        <CalendarDays className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                        <span>
                                                            {new Date(item.published_at).toLocaleDateString(
                                                                'id-ID',
                                                                { day: 'numeric', month: 'short', year: 'numeric' }
                                                            )}
                                                       </span>
                                                   </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400">
                                                        Belum dipublikasi
                                                   </span>
                                                )}
                                           </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            window.open(
                                                                route('detail.berita', item.slug),
                                                                '_blank'
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 rounded transition"
                                                        title="Lihat di halaman publik"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        <span className="hidden xl:inline">Lihat</span>
                                                   </button>

                                                    {item.status === 'draft' && isPenulis && isOwner(item) && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAction('submit', item.id)}
                                                            className="inline-flex items-center gap-1 px-2 py-1 text-xs text-blue-700 hover:bg-blue-50 rounded transition"
                                                            title="Kirim untuk persetujuan"
                                                        >
                                                            <Send className="w-4 h-4" />
                                                            <span className="hidden xl:inline">Kirim</span>
                                                       </button>
                                                    )}

                                                    {item.status === 'pending' && isAdminOrHumas && (
                                                        <>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleAction('approve', item.id)}
                                                                className="inline-flex items-center gap-1 px-2 py-1 text-xs text-emerald-700 hover:bg-emerald-50 rounded transition"
                                                                title="Setujui & Publikasikan"
                                                            >
                                                                <CheckCircle className="w-4 h-4" />
                                                                <span className="hidden xl:inline">Setujui</span>
                                                           </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleAction('reject', item.id)}
                                                                className="inline-flex items-center gap-1 px-2 py-1 text-xs text-red-700 hover:bg-red-50 rounded transition"
                                                                title="Tolak"
                                                            >
                                                                <XCircle className="w-4 h-4" />
                                                                <span className="hidden xl:inline">Tolak</span>
                                                           </button>
                                                        </>
                                                    )}

                                                    {(isAdminOrHumas || (isPenulis && isOwner(item))) && (
                                                        <Link
                                                            href={route('admin.berita.edit', item.id)}
                                                            className="inline-flex items-center gap-1 px-2 py-1 text-xs text-amber-700 hover:bg-amber-50 rounded transition"
                                                            title="Edit berita"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                            <span className="hidden xl:inline">Edit</span>
                                                       </Link>
                                                    )}

                                                    {(isAdminOrHumas || (isPenulis && isOwner(item))) && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(item.id)}
                                                            className="inline-flex items-center gap-1 px-2 py-1 text-xs text-red-700 hover:bg-red-50 rounded transition"
                                                            title="Hapus berita"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                       </button>
                                                    )}
                                               </div>
                                           </td>
                                       </tr>
                                    ))
                                )}
                           </tbody>
                       </table>
                   </div>

                    {/* Pagination */}
                    {berita.last_page > 1 && (
                        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between flex-wrap gap-2">
                            <p className="text-sm text-gray-500">
                                Halaman <span className="font-semibold">{berita.current_page}</span> dari{' '}
                                <span className="font-semibold">{berita.last_page}</span>
                           </p>
                            <div className="flex flex-wrap items-center gap-1">
                                {berita.links.map((link, i) => {
                                    const labelClean = link.label.replace(/&laquo;|&raquo;/g, '').trim();
                                    const isPrev = labelClean.includes('Previous');
                                    const isNext = labelClean.includes('Next');
                                    const isActive = link.active;
                                    const baseClass =
                                        'inline-flex items-center justify-center min-w-[2rem] h-9 px-3 text-sm font-medium rounded transition border';
                                    if (!link.url) {
                                        return (
                                            <span
                                                key={i}
                                                className={`${baseClass} text-gray-300 border-transparent cursor-not-allowed`}
                                            >
                                                {isPrev ? '‹' : isNext ? '›' : labelClean}
                                           </span>
                                        );
                                    }
                                    return (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            preserveScroll
                                            className={`${baseClass} ${
                                                isActive
                                                    ? 'bg-primary text-white border-primary'
                                                    : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {isPrev ? '‹' : isNext ? '›' : labelClean}
                                       </Link>
                                    );
                                })}
                           </div>
                       </div>
                    )}
               </div>

                {/* Footer Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
                    <p>
                        💡 <strong>Tips</strong> Berita dengan status{' '}
                        <strong>Menunggu</strong> perlu disetujui Admin atau Humas dulu sebelum
                        tampil di halaman publik.
                   </p>
                    <Link
                        href={route('admin.berita.export')}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition shadow-sm"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                   </Link>
               </div>
           
            {/* Delete Confirmation */}
            <ConfirmModal
                open={deleteTarget !== null}
                title="Hapus Berita"
                message="Yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan."
                confirmLabel="Hapus"
                variant="danger"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
            />

            {/* Reject Confirmation */}
            <ConfirmModal
                open={confirmAction?.type === "reject"}
                title="Tolak Berita"
                message="Berikan alasan penolakan:"
                confirmLabel="Tolak"
                confirmButtonText="Tolak"
                variant="warning"
                inputType="textarea"
                inputPlaceholder="Alasan penolakan..."
                inputValue={rejectReason}
                inputRequired={true}
                onInputChange={(v) => setRejectReason(v)}
                onConfirm={() => {
                    if (confirmAction?.id </div></div> rejectReason.trim()) {
                        form.post(route("admin.berita.reject", confirmAction.id), {
                            data: { rejection_reason: rejectReason },
                            preserveScroll: true,
                        });
                        setConfirmAction(null);
                    }
                }}
                onCancel={() => setConfirmAction(null)}
            />
            </div>
        </>
    );
}
