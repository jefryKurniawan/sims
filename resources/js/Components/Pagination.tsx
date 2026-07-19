import { Link } from "@inertiajs/inertia-react";

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    data: Array<any>;
    current_page: number;
    last_page: number;
    per_page: number;
    from: number;
    to: number;
    total: number;
    links: PaginationLink[];
}

export default function Pagination({ data, current_page, last_page, per_page, from, to, total, links }: PaginationProps) {
    if (!data || total <= per_page) return null;

    return (
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-t dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
                Menampilkan {from} - {to} dari {total} data
            </div>
            <div className="join">
                {links?.map((link, i) => {
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
                            className={`join-item btn btn-sm ${link.active ? "btn-active" : ""}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            preserveScroll
                        />
                    );
                })}
            </div>
        </div>
    );
}
