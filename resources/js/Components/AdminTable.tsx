import { Link } from "@inertiajs/inertia-react";
import { Eye, Edit, Trash, ChevronLeft, ChevronRight } from "lucide-react";

// ── Column & Action definitions ──

export interface Column {
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
    className?: string;
    wrapClass?: string;
}

interface Action {
    icon: "eye" | "edit" | "delete";
    onClick: (row: any) => void;
    show?: (row: any) => boolean;
    label?: string;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    from: number;
    to: number;
    total: number;
    links?: { url: string | null; label: string; active: boolean }[];
}

interface AdminTableProps {
    columns: Column[];
    rows: any[];
    actions?: (row: any) => Action[];
    pagination?: PaginationMeta;
    searchSlot?: React.ReactNode;
}

// ── Action Icon Map ──
const iconMap: Record<string, React.ReactNode> = {
    eye: <Eye className="w-4 h-4" />,
    edit: <Edit className="w-4 h-4" />,
    delete: <Trash className="w-4 h-4" />,
};

const actionColors: Record<string, string> = {
    eye: "text-muted-foreground hover:text-primary",
    edit: "text-muted-foreground hover:text-primary",
    delete: "text-muted-foreground hover:text-destructive",
};

// ── AdminPagination (inline, no rounded) ──
function AdminPagination({ meta }: { meta: PaginationMeta }) {
    if (!meta || meta.total <= meta.per_page) return null;

    return (
        <div className="px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-border">
            <span className="text-xs text-muted-foreground">
                {meta.from} – {meta.to} dari {meta.total}
            </span>
            <div className="flex items-center gap-1">
                {meta.links?.map((link, i) => {
                    const isNav =
                        link.label.includes("Previous") ||
                        link.label.includes("Next");
                    if (!link.url) {
                        return (
                            <span
                                key={i}
                                className={`inline-flex items-center justify-center min-w-[32px] h-8 px-2 text-xs font-medium text-muted-foreground select-none ${
                                    isNav ? "opacity-40" : ""
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    }
                    if (isNav) {
                        const isPrev = link.label.includes("Previous");
                        return (
                            <Link
                                key={i}
                                href={link.url}
                                preserveScroll
                                className="inline-flex items-center justify-center min-w-[32px] h-8 px-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                            >
                                {isPrev ? (
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                ) : (
                                    <ChevronRight className="w-3.5 h-3.5" />
                                )}
                            </Link>
                        );
                    }
                    return (
                        <Link
                            key={i}
                            href={link.url}
                            preserveScroll
                            className={`inline-flex items-center justify-center min-w-[32px] h-8 px-2 text-xs font-medium transition-colors ${
                                link.active
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            }`}
                        >
                            {link.label.replace(/&/g, "&")}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

// ── Main Component ──
export default function AdminTable({
    columns,
    rows,
    actions,
    pagination,
    searchSlot,
}: AdminTableProps) {
    return (
        <div className="bg-card shadow-sm border border-border">
            {searchSlot && (
                <div className="px-4 py-3 border-b border-border">
                    {searchSlot}
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                    <thead className="bg-accent/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider w-12">
                                #
                            </th>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider ${col.className || ""}`}
                                >
                                    {col.label}
                                </th>
                            ))}
                            {actions && (
                                <th className="px-4 py-3 text-center text-[11px] font-semibold text-muted-foreground uppercase tracking-wider w-28">
                                    Aksi
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (actions ? 2 : 1)}
                                    className="px-4 py-16 text-center text-sm text-muted-foreground"
                                >
                                    Tidak ada data.
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, idx) => {
                                const rowActions = actions ? actions(row) : [];
                                return (
                                    <tr
                                        key={row.id ?? idx}
                                        className="hover:bg-accent/30 transition-colors"
                                    >
                                        <td className="px-4 py-3 text-sm text-muted-foreground tabular-nums">
                                            {pagination
                                                ? (pagination.current_page -
                                                      1) *
                                                      pagination.per_page +
                                                  idx +
                                                  1
                                                : idx + 1}
                                        </td>
                                        {columns.map((col) => (
                                            <td
                                                key={col.key}
                                                className={`px-4 py-3 text-sm text-foreground ${col.wrapClass || ""}`}
                                            >
                                                {col.render
                                                    ? col.render(
                                                          row[col.key],
                                                          row,
                                                      )
                                                    : (row[col.key] ?? "-")}
                                            </td>
                                        ))}
                                        {actions && (
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    {rowActions.map(
                                                        (act, ai) => {
                                                            if (
                                                                act.show &&
                                                                !act.show(row)
                                                            )
                                                                return null;
                                                            return (
                                                                <button
                                                                    key={ai}
                                                                    onClick={() =>
                                                                        act.onClick(
                                                                            row,
                                                                        )
                                                                    }
                                                                    title={
                                                                        act.label ||
                                                                        act.icon
                                                                    }
                                                                    className={`p-1.5 rounded-md transition-colors ${actionColors[act.icon] || "text-muted-foreground hover:text-foreground"}`}
                                                                >
                                                                    {
                                                                        iconMap[
                                                                            act
                                                                                .icon
                                                                        ]
                                                                    }
                                                                </button>
                                                            );
                                                        },
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            {pagination && <AdminPagination meta={pagination} />}
        </div>
    );
}
