import { Head } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { useForm, Link } from '@inertiajs/inertia-react';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Tag, ArrowLeft } from 'lucide-react';
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
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Props {
    agenda: Array<{
        month: string;
        month_name: string;
        items: Array<{
            id: number;
            title: string;
            slug: string;
            thumbnail: string | null;
            excerpt: string;
            date: string;
            date_raw: string;
        }>;
    }>;
    months: string[];
    currentMonth: string | null;
    currentYear: string | null;
}

const monthNames: Record<string, string> = {
    '01': 'Januari',
    '02': 'Februari',
    '03': 'Maret',
    '04': 'April',
    '05': 'Mei',
    '06': 'Juni',
    '07': 'Juli',
    '08': 'Agustus',
    '09': 'September',
    '10': 'Oktober',
    '11': 'November',
    '12': 'Desember',
};

export default function AgendaIndex({ agenda, months, currentMonth, currentYear }: Props) {
    const [selectedMonth, setSelectedMonth] = useState(currentMonth || '');
    const [selectedYear, setSelectedYear] = useState(currentYear || '');

    const form = useForm({
        month: selectedMonth,
        year: selectedYear,
    });

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        form.get(route('agenda'), {
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSelectedMonth('');
        setSelectedYear('');
        form.setData('month', '');
        form.setData('year', '');
        handleFilter(new Event('submit'));
    };

    const hasFilters = selectedMonth || selectedYear;

    // Sort agenda by month descending (newest first)
    const sortedAgenda = [...agenda].sort((a, b) => b.month.localeCompare(a.month));

    return (
        <>
            <Head title="Agenda Kegiatan Sekolah" />

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-yellow-600 py-16 lg:py-24">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl" />
                    </div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
                                <ArrowLeft className="w-4 h-4" />
                                Kembali ke Beranda
                            </Link>
                            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                                Agenda Kegiatan
                            </h1>
                            <p className="text-white/90 text-lg lg:text-xl max-w-2xl mx-auto">
                                Kalender kegiatan dan acara sekolah terbaru
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filter Section */}
                <section className="py-8 -mt-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    Filter Bulan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleFilter} className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1 sm:w-64">
                                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Bulan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">Semua Bulan</SelectItem>
                                                {months.map((m) => (
                                                    <SelectItem key={m} value={m}>
                                                        {monthNames[m.split('-')[1]] || m} {m.split('-')[0]}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button type="submit" className="flex-1 sm:flex-none">
                                            <Calendar className="w-4 h-4 mr-2" />
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

                {/* Agenda Content */}
                <section className="py-8 pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {sortedAgenda.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Calendar className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada agenda</h3>
                                <p className="text-gray-500">Tidak ada kegiatan yang sesuai dengan filter Anda.</p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {sortedAgenda.map((monthGroup) => (
                                    <div key={monthGroup.month} className="animate-fade-in">
                                        {/* Month Header */}
                                        <div className="flex items-center gap-4 mb-6 pb-3 border-b-2 border-red-600">
                                            <div className="w-14 h-14 bg-red-600 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Calendar className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900">
                                                    {monthGroup.month_name}
                                                </h2>
                                                <p className="text-gray-500">{monthGroup.items.length} kegiatan</p>
                                            </div>
                                        </div>

                                        {/* Items Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {monthGroup.items.map((item) => (
                                                <article key={item.id}>
                                                    <Link href={route('detail.berita', item.slug)} className="block h-full">
                                                        <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-red-500">
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
                                                                        <Calendar className="w-12 h-12 text-gray-300" />
                                                                    </div>
                                                                )}
                                                                {/* Date Badge */}
                                                                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 shadow-sm">
                                                                    <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
                                                                        <Calendar className="w-3.5 h-3.5 text-red-600" />
                                                                        {item.date}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Content */}
                                                            <CardContent className="p-4 pt-4">
                                                                <Badge variant="secondary" className="bg-purple-100 text-purple-800 font-normal mb-2">
                                                                    <Tag className="w-3 h-3 mr-1" />
                                                                    Kegiatan
                                                                </Badge>
                                                                <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors mb-2">
                                                                    {item.title}
                                                                </h3>
                                                                <p className="text-sm text-gray-600 line-clamp-3">
                                                                    {item.excerpt}
                                                                </p>
                                                            </CardContent>
                                                        </Card>
                                                    </Link>
                                                </article>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </>
    );
}