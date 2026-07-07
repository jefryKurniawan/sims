import { Head, Link, router } from '@inertiajs/inertia-react';
import { useMemo } from 'react';
import { useReactTable } from '@tanstack/react-table';
import { DollarSign, CheckCircle, Clock, XCircle, Search, Filter, Plus } from 'lucide-react';
import Pagination from '@/Components/Pagination';

interface Donasi {
    id: number;
    alumni_id: number | null;
    nama_pendonor: string;
    email: string | null;
    no_telp: string | null;
    nominal: number;
    metode_pembayaran: string;
    status: 'pending' | 'verified' | 'rejected';
    tanggal_donasi: string;
    keterangan: string | null;
    anonym: boolean;
    created_at: string;
    alumni: { user: { name: string } } | null;
    verified_by: { name: string } | null;
}

interface Props {
    donasis: {
        data: Donasi[];
        current_page: number;
        last_page: number;
        per_page: number;
        from: number;
        to: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters: {
        status: string;
        tanggal_mulai: string;
        tanggal_selesai: string;
        search: string;
    };
    stats: {
        total: number;
        pending: number;
        verified: number;
        total_nominal: number;
    };
}

export default function Index({ donasis, filters, stats }: Props) {
    const handleFilter = (key: string, value: string) => {
        const params = new URLSearchParams(window.location.search);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.get(route('admin.donasi.index'), params.toString());
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, label: 'Pending' },
            verified: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle, label: 'Verified' },
            rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Rejected' },
        };
        const badge = badges[status as keyof typeof badges];
        const Icon = badge.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                <Icon className="w-3 h-3" />
                {badge.label}
            </span>
        );
    };

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // Define columns for the table
    const columns = useMemo(() => [
        {
            accessorKey: 'tanggal_donasi',
            header: 'Tanggal',
            cell: ({ row }: { row: { original: Donasi } }) => (
                <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(row.original.tanggal_donasi).toLocaleDateString('id-ID')}
                </div>
            )
        },
        {
            accessorKey: 'nama_pendonor',
            header: 'Pendonor',
            cell: ({ row }: { row: { original: Donasi } }) => (
                <div className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{row.original.nama_pendonor}</div>
                    {row.original.email && <div className="text-sm text-gray-500">{row.original.email}</div>}
                </div>
            )
        },
        {
            accessorKey: 'nominal',
            header: 'Nominal',
            cell: ({ row }: { row: { original: Donasi } }) => (
                <div className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary">
                    {formatRupiah(row.original.nominal)}
                </div>
            )
        },
        {
            accessorKey: 'metode_pembayaran',
            header: 'Metode',
            cell: ({ row }: { row: { original: Donasi } }) => (
                <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {row.original.metode_pembayaran.toUpperCase()}
                </div>
            )
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }: { row: { original: Donasi } }) => (
                <div className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(row.original.status)}
                </div>
            )
        },
        {
            accessorKey: 'alumni',
            header: 'Alumni',
            cell: ({ row }: { row: { original: Donasi } }) => (
                <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {row.original.alumni?.user.name || '-'}
                </div>
            )
        },
        {
            accessorKey: 'id',
            header: 'Aksi',
            cell: ({ row }: { row: { original: Donasi } }) => (
                <div className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <Link
                            href={route('admin.donasi.show', row.original.id)}
                            className="text-primary hover:text-primary-dark"
                        >
                            Detail
                        </Link>
                        <Link
                            href={route('admin.donasi.edit', row.original.id)}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Edit
                        </Link>
                    </div>
                </div>
            )
        },
    ], []);

    const table = useReactTable({
        columns,
        data: donasis.data,
        pagination: true,
    });

    return (
        <>
            <Head title="Kelola Donasi Alumni" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Donasi Alumni</h1>
                                <p className="text-gray-600 text-sm mt-1">Kelola data donasi dari alumni</p>
                            </div>
                            <Link
                                href={route('admin.donasi.create')}
                                className="inline-flex items-center gap-2 bg-school-red text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition font-semibold"
                            >
                                +
                                +Donasi Baru
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Total Donasi</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Pending</p>
                                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                                </div>
                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-yellow-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Terverifikasi</p>
                                    <p className="text-2xl font-bold text-emerald-600">{stats.verified}</p>
                                </div>
                                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Total Nominal</p>
                                    <p className="text-lg font-bold text-primary">{formatRupiah(stats.total_nominal)}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="w-5 h-5 text-gray-600" />
                            <h3 className="font-bold text-gray-900">Filter</h3>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Cari Nama</label>
                                <input
                                    type="text"
                                    placeholder="Nama pendonor..."
                                    value={filters.search}
                                    onChange={(e) => handleFilter('search', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => handleFilter('status', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="">Semua</option>
                                    <option value="pending">Pending</option>
                                    <option value="verified">Verified</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Mulai</label>
                                <input
                                    type="date"
                                    value={filters.tanggal_mulai}
                                    onChange={(e) => handleFilter('tanggal_mulai', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Akhir</label>
                                <input
                                    type="date"
                                    value={filters.tanggal_selesai}
                                    onChange={(e) => handleFilter('tanggal_selesai', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table {...table.getTableProps()} className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    {table.getHeaderGroups().map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(header => (
                                                <th {...header.getHeaderProps()} className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    {header.render('Header')}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...table.getTableBodyProps()}>
                                    {table.getRowModel().rows.map((row, index) => {
                                        // Note: In v8, we don't need to call prepareRow because the row is already prepared.
                                        return (
                                            <tr {...row.getRowProps()} key={row.id} className="hover:bg-gray-50">
                                                {row.cells.map(cell => (
                                                    <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap">
                                                        {cell.render('Cell')}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {donasis.data.length > 0 && (
                            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    Menampilkan {donasis.from} - {donasis.to} dari {donasis.total} data
                                </div>
                                <div className="flex items-center space-x-2">
                                    {/* Previous page link */}
                                    {table.getState().pagination.pageIndex > 0 ? (
                                        <button
                                            onClick={() => {
                                                const params = new URLSearchParams(window.location.search);
                                                params.set('page', (donasis.current_page - 1).toString());
                                                router.get(route('admin.donasi.index'), params.toString());
                                            }}
                                            className="px-3 py-1 mr-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10"
                                        >
                                            Prev
                                        </button>
                                    ) : (
                                        <span className="px-3 py-1 mr-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10 opacity-50">
                                            Prev
                                        </span>
                                    )}

                                    {/* Page numbers */}
                                    {Array.from({ length: donasis.last_page }, (_, i) => i + 1).map(pageNumber => (
                                        <button
                                            key={pageNumber}
                                            onClick={() => {
                                                const params = new URLSearchParams(window.location.search);
                                                params.set('page', pageNumber.toString());
                                                router.get(route('admin.donasi.index'), params.toString());
                                            }}
                                            className={`px-3 py-1 mx-1 text-sm font-medium ${pageNumber === donasis.current_page ? 'bg-primary/20 text-primary' : 'bg-white text-gray-500 hover:bg-primary/10'} rounded-md`}
                                        >
                                            {pageNumber}
                                        </button>
                                    ))}

                                    {/* Next page link */}
                                    {table.getState().pagination.pageIndex < table.getState().pagination.pageCount - 1 ? (
                                        <button
                                            onClick={() => {
                                                const params = new URLSearchParams(window.location.search);
                                                params.set('page', (donasis.current_page + 1).toString());
                                                router.get(route('admin.donasi.index'), params.toString());
                                            }}
                                            className="px-3 py-1 ml-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10"
                                        >
                                            Next
                                        </button>
                                    ) : (
                                        <span className="px-3 py-1 ml-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10 opacity-50">
                                            Next
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}