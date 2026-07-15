import { Head } from '@inertiajs/inertia-react';
import { useForm, Link } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
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
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Props {
    kategoriOptions: string[];
    isPenulis: boolean;
}

const kategoriLabels: Record<string, string> = {
    pengumuman: 'Pengumuman',
    kegiatan: 'Kegiatan',
    artikel: 'Artikel',
};

export default function Create({ kategoriOptions, isPenulis }: Props) {
    const form = useForm({
        title: '',
        slug: '',
        content: '',
        kategori: '',
        thumbnail: null as File | null,
        sumber: 'manual',
        status: 'published',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route('admin.berita.store'), {
            onSuccess: () => {},
            onFinish: () => form.reset(),
        });
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        form.setData('thumbnail', file);
    };

    return (
        <>
            <Head title="Tambah Berita" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <Link href={route('admin.berita.index')} className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-2">
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Tambah Berita</h1>
                        <p className="text-gray-500 mt-1">Buat berita, pengumuman, atau kegiatan baru</p>
                    </div>
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
                                        // Auto-generate slug
                                        if (!form.data.slug || form.data.slug === '/') {
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
                                    rows={10}
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
                                <Input
                                    id="thumbnail"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleThumbnailChange}
                                    className={form.errors.thumbnail ? 'border-destructive' : ''}
                                    disabled={form.processing}
                                />
                                {form.errors.thumbnail && (
                                    <p className="mt-1 text-xs text-destructive" role="alert">
                                        {form.errors.thumbnail}
                                    </p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">
                                    Format: jpeg, png, jpg, webp. Maksimal 2MB.
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
                                <Link href={route('admin.berita.index')}>
                                    <Button type="button" variant="outline">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Batal
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={form.processing}>
                                    <Save className="w-4 h-4 mr-2" />
                                    {form.processing ? 'Menyimpan...' : 'Simpan'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}