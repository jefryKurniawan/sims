import { Head, usePage, Link, useForm, router } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { useReactTable } from '@tanstack/react-table';
import AdminLayout from '@/Layout/AdminLayout';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export default function Index() {
    const { data } = usePage();
    const { peminjam, filters } = data;
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedPeminjam, setSelectedPeminjam] = useState(null);
    const { data: formData, post, processing, reset, errors } = useForm({
        lateness: ''
    });

    const handleUpdate = (peminjam: any) => {
        setSelectedPeminjam(peminjam);
        setShowUpdateModal(true);
        // Reset form and set current lateness value
        reset();
        formData.lateness = peminjam.lateness ?? 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPeminjam) return;

        post('/perpus/update-peminjam', {
            id_peminjam: selectedPeminjam.id,
            lateness: formData.lateness
        }, {
            onSuccess: () => {
                setShowUpdateModal(false);
                // Refetch data to show updated values
                router.visit(route('peminjam.index'), {
                    preserveScroll: true,
                    only: ['peminjam']
                });
            }
        });
    };

    const handleClose = () => {
        setShowUpdateModal(false);
        reset();
    };

    return (
        <AdminLayout
            title="Data Peminjam"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            Data Peminjam
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('peminjam.create')}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                        >
                            Tambah
                        </Link>
                        <Link
                            href="/perpus/history-peminjam"
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        >
                            History Peminjam
                        </Link>
                    </div>
                </div>
            }
        >
            {/* Alerts would be handled via flash messages from Inertia */}

            {/* Table using @tanstack/react-table */}
            <div className="overflow-x-auto">
                {
                    typeof peminjam !== 'undefined' && peminjam !== null && peminjam.data
                        ? (() => {
                              const columns = React.useMemo(
                                  () => [
                                      {
                                          accessorKey: 'borrow_code',
                                          header: 'Kode Pinjam',
                                      },
                                      {
                                          accessorKey: ({ index }) => peminjam.from + index,
                                          header: 'No',
                                      },
                                      {
                                          accessorKey: 'members.name',
                                          header: 'Peminjam',
                                      },
                                      {
                                          accessorKey: 'books.name',
                                          header: 'Judul Buku',
                                      },
                                      {
                                          accessorKey: 'borrow_date',
                                          header: 'Tgl Pinjam',
                                          cell: ({ value }) => (
                                              <div className="text-sm text-gray-500">{new Date(value).toLocaleDateString('id-ID')}</div>
                                          ),
                                      },
                                      {
                                          accessorKey: 'return_date',
                                          header: 'Tgl Akhir',
                                          cell: ({ value }) => (
                                              <div className="text-sm text-gray-500">{new Date(value).toLocaleDateString('id-ID')}</div>
                                          ),
                                      },
                                      {
                                          accessorKey: 'id',
                                          header: 'Action',
                                          cell: ({ row }) => (
                                              <div className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                  <button
                                                      onClick={() => handleUpdate(row.original)}
                                                      className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-primary/90"
                                                  >
                                                      Update
                                                  </button>
                                              </div>
                                          ),
                                      },
                                  ],
                                  []
                              );

                              const table = useReactTable({ columns, data: peminjam.data });

                              return (
                                  <table {...table.getTableProps()} className="min-w-full divide-y divide-gray-200">
                                      <thead>
                                          {table.getHeaderGroups().map(headerGroup => (
                                              <tr {...headerGroup.getHeaderGroupProps()}>
                                                  {headerGroup.headers.map(header => (
                                                      <th
                                                          {...header.getHeaderProps()}
                                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                      >
                                                          {header.render('Header')}
                                                      </th>
                                                  ))}
                                              </tr>
                                          ))}
                                      </thead>
                                      <tbody {...table.getTableBodyProps()}>
                                          {table.getRowModel().rows.map((row, index) => (
                                                  <tr {...row.getRowProps()} key={row.index} className="hover:bg-gray-50">
                                                      {row.cells.map(cell => (
                                                          <td
                                                              {...cell.getCellProps()}
                                                              className="px-6 py-4 whitespace-nowrap"
                                                          >
                                                              {cell.render('Cell')}
                                                          </td>
                                                      ))}
                                                  </tr>
                                              ))}
                                      </tbody>
                                  </table>
                              );
                          })
                          :
                              <table className="min-w-full divide-y divide-gray-200">
                                  <thead>
                                      <tr>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4"></th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">No</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Pinjam</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peminjam</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul Buku</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tgl Pinjam</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tgl Akhir</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr>
                                          <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                                              Tidak ada data peminjam
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                }
            </div>

            {/* Pagination */}
            {peminjam && peminjam.links && (
                <div className="flex flex-wrap items-center justify-between px-4 py-2">
                    <div className="flex items-center flex-1">
                        <span className="text-sm text-gray-500">
                            Menampilkan {peminjam.from} - {peminjam.to} dari {peminjam.total} data
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {/* Previous page link */}
                        {peminjam.prev_page_url && (
                            <a
                                href={peminjam.prev_page_url}
                                className="px-3 py-1 mr-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10"
                            >
                                Prev
                            </a>
                        )}
                        {/* Page numbers */}
                        {peminjam.links && peminjam.links.map((link: any, index: number) => (
                            <a
                                key={index}
                                href={link.url}
                                className={`px-3 py-1 mx-1 text-sm font-medium ${link.active ? 'bg-primary/20 text-primary' : 'bg-white text-gray-500 hover:bg-primary/10'} rounded-md`}
                            >
                                {link.label}
                            </a>
                        ))}
                        {/* Next page link */}
                        {peminjam.next_page_url && (
                            <a
                                href={peminjam.next_page_url}
                                className="px-3 py-1 ml-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10"
                            >
                                Next
                            </a>
                        )}
                    </div>
                </div>
            )}

            {/* Update Modal */}
            {showUpdateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg w-96 max-w-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-gray-900">
                                Update Keterlambatan
                            </h3>
                            <button
                                onClick={handleClose}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Peminjam
                                </label>
                                <p className="platinum text-gray-900 font-medium">
                                    {selectedPeminjam?.members?.name}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kode Buku
                                </label>
                                <p className="platinum text-gray-900 font-medium">
                                    {selectedPeminjam?.borrow_code}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Keterlambatan (hari)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.lateness}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        formData.lateness = parseInt(e.target.value) || 0;
                                    }}
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-md
                                        focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary
                                        ${errors.lateness ? 'border-red-500' : ''}`}
                                    disabled={processing}
                                />
                                {errors.lateness && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.lateness}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
                                    disabled={processing}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
                                    disabled={processing}
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}