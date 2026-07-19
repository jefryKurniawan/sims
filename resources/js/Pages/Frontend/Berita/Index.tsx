import { Head } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { useForm, Link } from '@inertiajs/inertia-react';
import { Search, Filter, Calendar, Tag } from 'lucide-react';
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
import { Badge } from '@/Components/ui/badge';
import { Pagination } from '@/Components/Frontend/Pagination';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';

interface Props {
    berita: {
        data: Array<{
            id: number;
            title: string;
            slug: string;
            content: string;
            kategori: string;
            thumbnail: string | null;
            published_at: string;
            penulis: { id: number; name: string } | null;
            approvedBy: { id: number; name: string } | null;
        }>;
        links: Array<{ url: string | null; label: string; active: boolean }>;
        meta: { current_page: number; last_page: number; total: number; per_page: number };
    };
    kategoriFilter: string | null;
    search: string;
    kategoriOptions: string[];
}

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

const kategoriIcons: Record<string, React.ReactNode> = {
    pengumuman: <Tag className="w-4 h-4 mr-1" />,
    kegiatan: <Calendar className="w-4 h-4 mr-1" />,
    artikel: <Tag className="w-4 h-4 mr-1" />,
};

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
}

export default function BeritaIndex({ berita, kategoriFilter, search, kategoriOptions }: Props) {
    const [searchInput, setSearchInput] = useState(search);
    const [selectedKategori, setSelectedKategori] = useState(kategoriFilter || '');

    const form = useForm({
        kategori: selectedKategori,
        search: searchInput,
    });

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        form.get(route('berita'), {
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearchInput('');
        setSelectedKategori('');
        form.setData('search', '');
        form.setData('kategori', '');
        handleFilter(new Event('submit'));
    };

    const hasFilters = searchInput || selectedKategori;

    return (
        <>
            <Head title="Berita & Pengumuman Sekolah" />
            <Header />

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-yellow-600 py-16 lg:py-24">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl" />
                    </div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                                Berita & Pengumuman
                            </h1>
                            <p className="text-white/90 text-lg lg:text-xl max-w-2xl mx-auto">
                                Terkini informasi, pengumuman resmi, dan kegiatan sekolah
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filter & Search */}
                <section className="py-8 -mt-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Filter className="w-5 h-5" />
                                    Filter & Pencarian
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleFilter} className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1">
                                        <label htmlFor="search" className="sr-only">Cari berita</label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <Input
                                                id="search"
                                                type="text"
                                                placeholder="Cari judul atau konten..."
                                                value={searchInput}
                                                onChange={(e) => setSearchInput(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full sm:w-64">
                                        <Select value={selectedKategori} onValueChange={setSelectedKategori}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Semua Kategori" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">Semua Kategori</SelectItem>
                                                {kategoriOptions.map((k) => (
                                                    <SelectItem key={k} value={k}>
                                                        <div className="flex items-center gap-2">
                                                            {kategoriIcons[k]}
                                                            {kategoriLabels[k]}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button type="submit" className="flex-1 sm:flex-none">
                                            <Filter className="w-4 h-4 mr-2" />
                                            Terapkan
                                        </Button>
                                        {hasFilters && (
                                            <Button type="button" variant="outline" onClick={clearFilters} className="flex-1 sm:flex-none">
                                                Bersihkan
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Berita Grid */}
                <section className="py-8 pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {berita.data.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Tag className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada berita</h3>
                                <p className="text-gray-500">Tidak ada berita yang sesuai dengan filter Anda.</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                    {berita.data.map((item) => (
                                        <article key={item.id} className="group">
                                            <Link href={route('detail.berita', item.slug)} className="block h-full">
                                                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                                    {/* Thumbnail */}
                                                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                                                        {item.thumbnail ? (
                                                            <img
                                                                src={`/storage/images/berita/${item.thumbnail}`}
                                                                alt={item.title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <Tag className="w-12 h-12 text-gray-300" />
                                                            </div>
                                                        )}
                                                        {/* Kategori Badge */}
                                                        <div className="absolute top-3 left-3">
                                                            <Badge variant="secondary" className={`${kategoriColors[item.kategori]} font-normal`}>
                                                                {kategoriIcons[item.kategori]}
                                                                {kategoriLabels[item.kategori]}
                                                            </Badge>
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <CardContent className="p-4 pt-4">
                                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            <time dateTime={item.published_at}>
                                                                {format(new Date(item.published_at), 'dd MMMM yyyy', { locale: id })}
                                                            </time>
                                                            {item.penulis && (
                                                                <>
                                                                    <span aria-hidden="true">·</span>
                                                                    <span>{item.penulis.name}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                        <h2 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors mb-2">
                                                            {item.title}
                                                        </h2>
                                                        <p className="text-sm text-gray-600 line-clamp-3">
                                                            {stripHtml(item.content).substring(0, 150)}...
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </article>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {berita.links.length > 1 && (
                                    <div className="flex justify-center">
                                        <Pagination
                                            links={berita.links}
                                            currentPage={berita.meta.current_page}
                                            onPageChange={(url) => form.get(url, { preserveScroll: true })}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
