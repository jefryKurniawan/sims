import { Head, usePage, Link, useForm, router } from '@inertiajs/inertia-react';
import { useState, useMemo } from 'react';
import { useReactTable } from '@tanstack/react-table';
import AdminLayout from '@/Layout/AdminLayout';
import { Trash2, Edit2, FileText } from 'lucide-react';

export default function Index() {
    const { data } = usePage();
    const { berita, filters } = data;
    const { data: formData, post, processing, reset } = useForm({
        _method: 'delete'
    });

    const handleDelete = (id: number) => {
        if (!window.confirm('Yakin ingin menghapus berita ini?')) return;
        post(route('berita.destroy', id), {
            onSuccess: () => {
                // refetch data
                router.visit(route('berita.index'), {
                    preserveScroll: true,
                    only: ['berita']
                });
            }
        });
    };

    return (
        <AdminLayout title="Berita" header={
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Berita</h1>
                </div>
                <Link
                    href={route('berita.create')}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                    Tambah Berita
                </Link>
            </div>
        }>
            {/* Table using @tanstack/react-table */}
            <div className="overflow-x-auto">
                {
                    berita && berita.data
                        ? (() => {
                              const columns = useMemo(
                                  () => [
                                      {
                                          accessorKey: 'title',
                                          header: 'Judul',
                                      },
                                      {
                                          accessorKey: 'kategori.nama',
                                          header: 'Kategori',
                                          cell: ({ value }) => (
                                              <div className="text-sm text-gray-500">{value ?? '-'}</div>
                                          ),
                                      },
                                      {
                                          accessorKey: 'status',
                                          header: 'Status',
                                          cell: ({ value }) => (
                                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                                  value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                              }`}>
                                                  {value}
                                              </span>
                                          ),
                                      },
                                      {
                                          accessorKey: 'created_at',
                                          header: 'Tanggal',
                                          cell: ({ value }) => (
                                              <div className="text-sm text-gray-500">{new Date(value).toLocaleDateString('id-ID')}</div>
                                          ),
                                      },
                                      {
                                          accessorKey: 'id',
                                          header: 'Aksi',
                                          cell: ({ row }) => (
                                              <div className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                  <Link
                                                      href={route('berita.edit', row.original.id)}
                                                      className="text-sm text-primary hover:text-primary/80"
                                                  >
                                                      <Edit2 className="w-4 h-4" /> Edit
                                                  </Link>
                                                  <button
                                                      onClick={() => handleDelete(row.original.id)}
                                                      className="text-sm text-red-600 hover:text-red-800"
                                                  >
                                                      <Trash2 className="w-4 h-4" /> Hapus
                                                  </button>
                                              </div>
                                          ),
                                      },
                                  ],
                                  []
                              );

                              const {
                                  getTableProps,
                                  getTableBodyProps,
                                  headerGroups,
                                  rows,
                                  prepareRow,
                              } = useReactTable({ columns, data: berita.data });

                              return (
                                  <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                                      <thead>
                                          {headerGroups.map(headerGroup => (
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
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr>
                                          <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                              Tidak ada data berita
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                }
            </div>

            {/* Pagination */}
            {berita && berita.links && (
                <div className="flex flex-wrap items-center justify-between px-4 py-2">
                    <div className="flex items-center flex-1">
                        <span className="text-sm text-gray-500">
                            Menampilkan {berita.from} - {berita.to} dari {berita.total} data
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {berita.prev_page_url && (
                            <a
                                href={berita.prev_page_url}
                                className="px-3 py-1 mr-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10"
                            >
                                Prev
                            </a>
                        )}
                        {berita.links && berita.links.map((link: any, index: number) => (
                            <a
                                key={index}
                                href={link.url}
                                className={`px-3 py-1 mx-1 text-sm font-medium ${link.active ? 'bg-primary/20 text-primary' : 'bg-white text-gray-500 hover:bg-primary/10'} rounded-md`}
                            >
                                {label}
                            </a>
                        ))}
                        {berita.next_page_url && (
                            <a
                                href={berita.next_page_url}
                                className="px-3 py-1 ml-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10"
                            >
                                Next
                            </a>
                        )}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}