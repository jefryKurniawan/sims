import { Head, usePage, Link } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { Edit, Trash, Plus } from 'lucide-react';

interface SiswaData {
  id: number;
  nisn: string;
  nama_lengkap: string;
}

interface TagihanItem {
  id: number;
  siswa_id: number;
  nominal: number;
  status: string;
  tanggal_jatuh_tempo: string;
  keterangan: string | null;
  siswa: SiswaData | null;
}

interface PaginatedData {
  data: TagihanItem[];
  current_page: number;
  last_page: number;
  total: number;
  from: number | null;
  to: number | null;
  per_page: number;
}

interface Props {
  tagihan: PaginatedData;
}

export default function Index({ tagihan }: Props) {
  const { flash } = usePage().props;

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      lunas: 'bg-green-100 text-green-700',
      belum_lunas: 'bg-red-100 text-red-700',
      pending: 'bg-yellow-100 text-yellow-700',
    };
    const label: Record<string, string> = {
      lunas: 'Lunas',
      belum_lunas: 'Belum Lunas',
      pending: 'Pending',
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${map[status] || 'bg-gray-100 text-gray-700'} `}>
        {label[status] || status}
      </span>
    );
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  return (
    <>
      <Head title="SPP & Pembayaran" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">SPP & Pembayaran</h1>
          <Link
            href={route('spp.create')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-school-red text-white rounded-md hover:bg-red-700 transition text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            SPP Baru
          </Link>
        </div>

        {flash.success && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg">
            {flash.success}
          </div>
        )}
        {flash.error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded-lg">
            {flash.error}
          </div>
        )}

        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">No</th>
                <th scope="col" className="px-6 py-3 font-medium">Nama Siswa</th>
                <th scope="col" className="px-6 py-3 font-medium">NISN</th>
                <th scope="col" className="px-6 py-3 font-medium">Nominal</th>
                <th scope="col" className="px-6 py-3 font-medium">Jatuh Tempo</th>
                <th scope="col" className="px-6 py-3 font-medium">Status</th>
                <th scope="col" className="px-6 py-3 font-medium">Keterangan</th>
                <th scope="col" className="px-6 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tagihan.data.length > 0 ? (
                tagihan.data.map((item, index) => {
                  const no = (tagihan.current_page - 1) * tagihan.per_page + index + 1;
                  return (
                    <tr key={item.id} className="">
                      <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">{no}</td>
                      <td className="px-6 py-4">{item.siswa?.nama_lengkap ?? '-'}</td>
                      <td className="px-6 py-4">{item.siswa?.nisn ?? '-'}</td>
                      <td className="px-6 py-4">{formatRupiah(item.nominal)}</td>
                      <td className="px-6 py-4">{item.tanggal_jatuh_tempo}</td>
                      <td className="px-6 py-4">{statusBadge(item.status)}</td>
                      <td className="px-6 py-4">{item.keterangan ?? '-'}</td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <Link
                          href={route('spp.edit', item.id)}
                          className="mr-3"
                        >
                          <Edit className="h-5 w-5 text-blue-600 hover:text-blue-700" />
                        </Link>
                        <button
                          onClick={() => {
                            if (window.confirm('Yakin ingin menghapus SPP ini?')) {
                              Inertia.delete(route('spp.destroy', item.id));
                            }
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data tagihan SPP
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {tagihan.data.length > 0 && (
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <div>
              Menampilkan {tagihan.from} - {tagihan.to} dari {tagihan.total} data
            </div>
            <div className="flex space-x-2">
              {tagihan.prev_page_url && (
                <Link
                  href={tagihan.prev_page_url}
                  className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                >
                  Prev
                </Link>
              )}
              <Link
                href={route('spp.index', { page: 1 })}
                className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              >
                1
              </Link>
              {tagihan.next_page_url && (
                <Link
                  href={tagihan.next_page_url}
                  className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
