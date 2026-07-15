import { Link } from "@inertiajs/inertia-react";

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    data: any[];
    current_page: number;
    last_page: number;
    per_page: number;
    from: number;
    to: number;
    total: number;
    links: PaginationLink[];
}

export default function Pagination({ data }: { data: PaginationProps }) {
    if (!data || data.total <= data.per_page) return null;

    return (
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-t dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
                Menampilkan {data.from} - {data.to} dari {data.total} data
            </div>
            <div className="join">
                {data.links?.map((link, i) => {
                    if (!link.url) {
                        return (
                            <span
                                key={i}
                                className="join-item btn btn-sm btn-disabled pointer-events-none opacity-40"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    }
                    return (
                        <Link
                            key={i}
                            href={link.url}
                            className={`join-item btn btn-sm ${
                                link.active ? "btn-active" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            preserveScroll
                        />
                    );
                })}
            </div>
        </div>
    );
}
