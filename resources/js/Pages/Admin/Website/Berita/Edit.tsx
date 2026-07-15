import { Head } from '@inertiajs/inertia-react';
import { useForm, Link } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { ArrowLeft, Save, Send, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
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
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/Components/ui/alert-dialog';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Props {
    berita: {
        id: number;
        title: string;
        slug: string;
        content: string;
        kategori: string;
        status: string;
        thumbnail: string | null;
        published_at: string | null;
        created_at: string;
        rejection_reason: string | null;
        penulis: { id: number; name: string } | null;
        approvedBy: { id: number; name: string } | null;
        createdBy: { id: number; name: string } | null;
    };
    kategoriOptions: string[];
    isPenulis: boolean;
    canSubmit: boolean;
    canApprove: boolean;
    canReject: boolean;
}

const kategoriLabels: Record<string, string> = {
    pengumuman: 'Pengumuman',
    kegiatan: 'Kegiatan',
    artikel: 'Artikel',
};

const statusLabels: Record<string, string> = {
    draft: 'Draft',
    pending: 'Pending Approval',
    published: 'Published',
    rejected: 'Ditolak',
};

const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    published: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
};

export default function Edit({ berita, kategoriOptions, isPenulis, canSubmit, canApprove, canReject }: Props) {
    const form = useForm({
        title: berita.title,
        slug: berita.slug,
        content: berita.content,
        kategori: berita.kategori,
        thumbnail: null as File | null,
        sumber: 'manual',
        status: berita.status,
        rejection_reason: berita.rejection_reason || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(route('admin.berita.update', berita.id), {
            onFinish: () => form.reset(),
        });
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        form.setData('thumbnail', file);
    };

    const handleAction = (action: 'submit' | 'approve' | 'reject') => {
        const confirmMessages: Record<string, string> = {
            submit: 'Kirim berita untuk persetujuan Humas?',
            approve: 'Setujui dan publish berita ini?',
            reject: 'Tolak berita ini? Alasan penolakan wajib diisi.',
        };

        if (!confirm(confirmMessages[action])) return;

        if (action === 'reject') {
            const reason = prompt('Alasan penolakan:');
            if (!reason) return;
            form.post(route('admin.berita.reject', berita.id), {
                data: { rejection_reason: reason },
                preserveScroll: true,
            });
            return;
        }

        form.post(route(`admin.berita.${action}`, berita.id), {
            preserveScroll: true,
        });
    };

    const handleDelete = () => {
        form.delete(route('admin.berita.destroy', berita.id), {
            preserveScroll: true,
            onSuccess: () => {
                // redirect will be handled by inertia
            },
        });
    };

    return (
        <>
            <Head title={`Edit: ${berita.title}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <Link href={route('admin.berita.index')} className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-2">
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Berita</h1>
                        <p className="text-gray-500 mt-1">Perbarui berita, pengumuman, atau kegiatan</p>
                    </div>
                    <div className="flex gap-2">
                        {canSubmit && (
                            <Button variant="outline" onClick={() => handleAction('submit')} disabled={form.processing}>
                                <Send className="w-4 h-4 mr-2" />
                                Kirim Approval
                            </Button>
                        )}
                        {canApprove && (
                            <Button variant="default" onClick={() => handleAction('approve')} disabled={form.processing} className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Setujui
                            </Button>
                        )}
                        {canReject && (
                            <Button variant="destructive" onClick={() => handleAction('reject')} disabled={form.processing}>
                                <XCircle className="w-4 h-4 mr-2" />
                                Tolak
                            </Button>
                        )}
                    </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Status:</span>
                    <Badge variant="secondary" className={`${statusColors[berita.status]} font-normal`}>
                        {statusLabels[berita.status]}
                    </Badge>
                    {berita.rejection_reason && berita.status === 'rejected' && (
                        <span className="text-sm text-red-600">Alasan: {berita.rejection_reason}</span>
                    )}
                    {berita.published_at && (
                        <span className="text-sm text-gray-600">
                            Dipublish: {format(new Date(berita.published_at), 'dd MMM yyyy HH:mm', { locale: id })}
                        </span>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Berita</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Judul */}
                            <div>
                                <Label htmlFor="title" className="block text-sm font-medium mb-1">
                                    Judul <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    value={form.data.title}
                                    onChange={(e) => {
                                        form.setData('title', e.target.value);
                                        // Auto-generate slug if empty
                                        if (!form.data.slug || form.data.slug === '/' || form.data.slug === form.data.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')) {
                                            form.setData('slug', e.target.value
                                                .toLowerCase()
                                                .replace(/[^\w\s-]/g, '')
                                                .replace(/\s+/g, '-')
                                                .replace(/--+/g, '-')
                                            );
                                        }
                                    }}
                                    placeholder="Masukkan judul berita"
                                    className={form.errors.title ? 'border-destructive' : ''}
                                    disabled={form.processing}
                                />
                                {form.errors.title && (
                                    <p className="mt-1 text-xs text-destructive" role="alert">
                                        {form.errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Slug */}
                            <div>
                                <Label htmlFor="slug" className="block text-sm font-medium mb-1">
                                    Slug <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="slug"
                                    value={form.data.slug}
                                    onChange={(e) => form.setData('slug', e.target.value)}
                                    placeholder="akan di-generate otomatis dari judul"
                                    className={form.errors.slug ? 'border-destructive' : ''}
                                    disabled={form.processing}
                                />
                                {form.errors.slug && (
                                    <p className="mt-1 text-xs text-destructive" role="alert">
                                        {form.errors.slug}
                                    </p>
                                )}
                            </div>

                            {/* Kategori */}
                            <div>
                                <Label htmlFor="kategori" className="block text-sm font-medium mb-1">
                                    Kategori <span className="text-red-500">*</span>
                                </Label>
                                <Select value={form.data.kategori} onValueChange={(v) => form.setData('kategori', v)}>
                                    <SelectTrigger id="kategori">
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kategoriOptions.map((k) => (
                                            <SelectItem key={k} value={k}>
                                                {kategoriLabels[k]}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {form.errors.kategori && (
                                    <p className="mt-1 text-xs text-destructive" role="alert">
                                        {form.errors.kategori}
                                    </p>
                                )}
                            </div>

                            {/* Konten */}
                            <div>
                                <Label htmlFor="content" className="block text-sm font-medium mb-1">
                                    Konten <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="content"
                                    value={form.data.content}
                                    onChange={(e) => form.setData('content', e.target.value)}
                                    placeholder="Tulis konten berita di sini..."
                                    rows={12}
                                    className={form.errors.content ? 'border-destructive' : ''}
                                    disabled={form.processing}
                                />
                                {form.errors.content && (
                                    <p className="mt-1 text-xs text-destructive" role="alert">
                                        {form.errors.content}
                                    </p>
                                )}
                            </div>

                            {/* Thumbnail */}
                            <div>
                                <Label htmlFor="thumbnail" className="block text-sm font-medium mb-1">
                                    Thumbnail
                                </Label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        id="thumbnail"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        className={form.errors.thumbnail ? 'border-destructive' : ''}
                                        disabled={form.processing}
                                    />
                                    {berita.thumbnail && (
                                        <img
                                            src={`/storage/images/berita/${berita.thumbnail}`}
                                            alt="Current thumbnail"
                                            className="h-16 w-auto rounded-lg border"
                                        />
                                    )}
                                </div>
                                {form.errors.thumbnail && (
                                    <p className="mt-1 text-xs text-destructive" role="alert">
                                        {form.errors.thumbnail}
                                    </p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">
                                    Format: jpeg, png, jpg, webp. Maksimal 2MB. Biarkan kosong untuk mempertahankan thumbnail lama.
                                </p>
                            </div>

                            {/* Status - only for Admin/Humas */}
                            {!isPenulis && (
                                <div>
                                    <Label htmlFor="status" className="block text-sm font-medium mb-1">
                                        Status
                                    </Label>
                                    <Select value={form.data.status} onValueChange={(v) => form.setData('status', v)}>
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="pending">Pending Approval</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button type="button" variant="destructive" onClick={handleDelete}>
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Hapus
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Hapus Berita?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Tindakan ini tidak dapat dibatalkan. Berita "{berita.title}" akan dihapus permanen.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <div className="flex justify-end gap-2">
                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
                                        </div>
                                    </AlertDialogContent>
                                </AlertDialog>

                                <Link href={route('admin.berita.index')}>
                                    <Button type="button" variant="outline">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Batal
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={form.processing}>
                                    <Save className="w-4 h-4 mr-2" />
                                    {form.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}