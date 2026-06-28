import { Link } from '@inertiajs/inertia-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Paginator {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
    paginator: Paginator;
}

export function Pagination({ paginator }: Props) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
                Menampilkan <span className="font-semibold text-primary">{paginator.from}</span> - <span className="font-semibold text-primary">{paginator.to}</span> dari <span className="font-semibold text-primary">{paginator.total}</span> event
            </div>

            <div className="flex gap-2">
                {/* Previous Button */}
                {paginator.current_page > 1 && (
                    <Link
                        href={paginator.links[0]?.url || '?page=1'}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                )}

                {/* Page Numbers */}
                {Array.from({ length: paginator.last_page }, (_, i) => i + 1).map((page) => (
                    <Link
                        key={page}
                        href={`?page=${page}`}
                        className={`px-4 py-2 rounded-lg transition ${
                            page === paginator.current_page
                                ? 'bg-primary text-white'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        {page}
                    </Link>
                ))}

                {/* Next Button */}
                {paginator.current_page < paginator.last_page && (
                    <Link
                        href={paginator.links[paginator.links.length - 2]?.url || `?page=${paginator.current_page + 1}`}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                )}
            </div>
        </div>
    );
}