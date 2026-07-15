import { Head } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { useForm, Link, usePage } from '@inertiajs/inertia-react';
import {
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    Eye,
    Send,
    CheckCircle,
    XCircle,
    Download,
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/Components/ui/table';
import { Badge } from '@/Components/ui/badge';
import Pagination from '@/Components/Pagination';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Props {
    berita: {
        data: Array<{
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
        }>;
        links: Array<{ url: string | null; label: string; active: boolean }>;
        meta: { current_page: number; last_page: number; total: number; per_page: number };
    };
    filters: { status: string; search: string; kategori: string };
    stats: { all: number; draft: number; pending: number; published: number; rejected: number };
    kategoriOptions: string[];
    statusOptions: string[];
}

const statusLabels: Record<string, string> = {
    draft: 'Draft',
    pending: 'Pending',
    published: 'Published',
    rejected: 'Ditolak',
};

const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    published: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
};

const kategoriLabels: Record<string, string> = {
    pengumuman: 'Pengumuman',
    kegiatan: 'Kegiatan',
    artikel: 'Artikel',
};

const kategoriColors: Record<string, string> = {
    pengumuman: 'bg-blue-100 text-blue-800',
    kegiatan: 'bg-purple-100 text-purple-800',
    artikel: 'bg-indigo-100 text-indigo-800',
};

export default function BeritaIndex({ berita, filters, stats, kategoriOptions, statusOptions }: Props) {
    const { flash } = usePage().props as { flash: { message?: string; type?: string } };
    const { auth } = usePage().props as { auth: { user: { roles: string[] } } };
    const [search, setSearch] = useState(filters.search);
    const [statusFilter, setStatusFilter] = useState(filters.status);
    const [kategoriFilter, setKategoriFilter] = useState(filters.kategori);

    const form = useForm({
        search,
        status: statusFilter,
        kategori: kategoriFilter,
    });

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        form.get(route('admin.berita.index'), {
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus berita ini?')) {
            form.delete(route('admin.berita.destroy', id), {
                preserveScroll: true,
                onSuccess: () => form.reset(),
            });
        }
    };

    const handleAction = (action: 'submit' | 'approve' | 'reject', id: number) => {
        const confirmMessages: Record<string, string> = {
            submit: 'Kirim berita untuk persetujuan Humas?',
            approve: 'Setujui dan publish berita ini?',
            reject: 'Tolak berita ini? Alasan penolakan wajib diisi.',
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

        form.post(route(`admin.berita.${action}`, id), {
            preserveScroll: true,
        });
    };

    const getActionButtons = (item: typeof berita.data[0]) => {
        const user = auth.user;
        const isAdminOrHumas = user?.roles?.some((r: string) => ['Admin', 'Humas'].includes(r)) ?? false;
        const isPenulis = user?.roles?.includes('Penulis') ?? false;
        const isOwner = item.penulis?.id === user?.id || item.createdBy?.id === user?.id;

        const buttons = [
            <Link key="view" href={route('detail.berita', item.slug)} target="_blank">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Lihat publik">
                    <Eye className="w-4 h-4" />
                </Button>
            </Link>,
            <Link key="edit" href={route('admin.berita.edit', item.id)}>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Edit">
                    <Edit className="w-4 h-4" />
                </Button>
            </Link>,
        ];

        if (item.status === 'draft' && isPenulis && isOwner) {
            buttons.push(
                <Button
                    key="submit"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleAction('submit', item.id)}
                    aria-label="Kirim approval"
                >
                    <Send className="w-4 h-4" />
                </Button>
            );
        }

        if (item.status === 'pending' && isAdminOrHumas) {
            buttons.push(
                <Button
                    key="approve"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                    onClick={() => handleAction('approve', item.id)}
                    aria-label="Setujui"
                >
                    <CheckCircle className="w-4 h-4" />
                </Button>
            );
            buttons.push(
                <Button
                    key="reject"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    onClick={() => handleAction('reject', item.id)}
                    aria-label="Tolak"
                >
                    <XCircle className="w-4 h-4" />
                </Button>
            );
        }

        if ((isAdminOrHumas || (isPenulis && isOwner && item.status === 'draft')) && !['pending', 'published'].includes(item.status)) {
            buttons.push(
                <Button
                    key="delete"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(item.id)}
                    aria-label="Hapus"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            );
        }

        return buttons;
    };

    return (
        <>
            <Head title="Kelola Berita" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Kelola Berita</h1>
                        <p className="text-gray-500 mt-1">Kelola berita, pengumuman, dan kegiatan sekolah dengan approval Humas</p>
                    </div>
                    <Link href={route('admin.berita.create')}>
                        <Button className="gap-2">
                            <Plus className="w-4 h-4" />
                            Tambah Berita
                        </Button>
                    </Link>
                </div>

                {/* Flash Message */}
                {flash?.message && (
                    <div className={`p-4 rounded-lg ${flash.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'} flex items-center justify-between`}>
                        <span>{flash.message}</span>
                        <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>
                            OK
                        </Button>
                    </div>
                )}

                {/* Stats Tabs */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-wrap gap-2" role="tablist">
                            {(
                                [
                                    { key: 'all', label: 'Semua' },
                                    { key: 'draft', label: 'Draft' },
                                    { key: 'pending', label: 'Pending' },
                                    { key: 'published', label: 'Published' },
                                    { key: 'rejected', label: 'Ditolak' },
                                ] as const
                            ).map(({ key, label }) => (
                                <Button
                                    key={key}
                                    variant={statusFilter === key ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => {
                                        setStatusFilter(key);
                                        form.setData('status', key);
                                        handleFilter(new Event('submit'));
                                    }}
                                    role="tab"
                                    aria-selected={statusFilter === key}
                                >
                                    {label} <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 rounded-full">{stats[key]}</span>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Filter Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="w-5 h-5" />
                            Filter & Pencarian
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFilter} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="search" className="block text-sm font-medium mb-1">Cari Judul/Konten</label>
                                <Input
                                    id="search"
                                    type="text"
                                    placeholder="Judul atau konten..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="kategori" className="block text-sm font-medium mb-1">Kategori</label>
                                <Select value={kategoriFilter} onValueChange={setKategoriFilter}>
                                    <SelectTrigger id="kategori">
                                        <SelectValue placeholder="Semua kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua</SelectItem>
                                        {kategoriOptions.map((k) => (
                                            <SelectItem key={k} value={k}>
                                                {kategoriLabels[k]}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-end">
                                <Button type="submit" className="w-full">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Terapkan
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Data Table */}
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-gray-50 sticky top-0">
                                    <TableRow>
                                        <TableHead className="w-10 text-center">No</TableHead>
                                        <TableHead>Judul</TableHead>
                                        <TableHead className="w-36">Kategori</TableHead>
                                        <TableHead className="w-36 text-center">Status</TableHead>
                                        <TableHead className="w-40">Penulis</TableHead>
                                        <TableHead className="w-40">Publish Oleh</TableHead>
                                        <TableHead className="w-40">Tanggal</TableHead>
                                        <TableHead className="w-48 text-center">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {berita.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                                                Tidak ada data berita
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        berita.data.map((item, index) => (
                                            <TableRow key={item.id} className="hover:bg-gray-50 border-t">
                                                <TableCell className="text-center text-sm text-gray-500 font-medium">
                                                    {(berita.meta.current_page - 1) * berita.meta.per_page + index + 1}
                                                </TableCell>
                                                <TableCell className="font-medium max-w-xs truncate">{item.title}</TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className={`${kategoriColors[item.kategori]} font-normal`}>
                                                        {kategoriLabels[item.kategori]}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant="secondary" className={`${statusColors[item.status]} font-normal`}>
                                                        {statusLabels[item.status]}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    {item.penulis?.name ?? item.createdBy?.name ?? '-'}
                                                </TableCell>
                                                <TableCell className="text-sm text-gray-600">
                                                    {item.approvedBy?.name ?? '-'}
                                                </TableCell>
                                                <TableCell className="text-sm text-gray-600">
                                                    {item.published_at ? format(new Date(item.published_at), 'dd MMM yyyy', { locale: id }) : '-'}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex items-center justify-center gap-1">
                                                        {getActionButtons(item)}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {berita.links.length > 1 && (
                            <div className="px-4 py-3 border-t">
                                <Pagination
                                    links={berita.links}
                                    currentPage={berita.meta.current_page}
                                    onPageChange={(url) => form.get(url, { preserveScroll: true })}
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Export Button */}
                <div className="flex justify-end">
                    <Button
                        variant="outline"
                        onClick={() => window.open(route('admin.berita.export'), '_blank')}
                        className="gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </Button>
                </div>
            </div>
        </>
    );
}