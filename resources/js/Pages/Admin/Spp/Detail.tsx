import { Head, usePage, Link } from '@inertiajs/inertia-react';

interface SiswaData {
  id: number;
  nama_lengkap: string;
  nisn: string | null;
}

interface PembayaranItem {
  id: number;
  nominal: number;
  tanggal_bayar: string;
  metode: string;
  status: string;
  keterangan?: string | null;
}

interface TagihanDetail {
  id: number;
  siswa_id: number;
  nominal: number;
  status: string;
  tanggal_jatuh_tempo: string;
  keterangan: string | null;
  siswa: SiswaData | null;
  pembayaran: PembayaranItem[];
}

interface Props {
  tagihan: TagihanDetail;
}

export default function Detail({ tagihan }: Props) {
  const { flash } = usePage().props;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      lunas: 'bg-green-100 text-green-700',
      belum_lunas: 'bg-red-100 text-red-700',
      overdue: 'bg-yellow-100 text-yellow-700',
    };
    const label: Record<string, string> = {
      lunas: 'Lunas',
      belum_lunas: 'Belum Lunas',
      overdue: 'Overdue',
    };
    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${map[status] || 'bg-gray-100 text-gray-700'}`}>
        {label[status] || status}
      </span>
    );
  };

  return (
    <>
      <Head title="Detail Tagihan SPP" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Detail Tagihan SPP</h1>
          <Link
            href={route('spp.index')}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
          >
            Kembali ke Daftar
          </Link>
        </div>

        {flash.success && (
          <div className="mb-4 p-4 bg-green-100 rounded-lg text-green-800">{flash.success}</div>
        )}
        {flash.error && (
          <div className="mb-4 p-4 bg-red-100 rounded-lg text-red-800">{flash.error}</div>
        )}

        <div className="bg-white rounded-lg shadow border p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Info Tagihan</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="font-medium text-gray-600">Siswa</div>
            <div>{tagihan.siswa?.nama_lengkap ?? '-'} {tagihan.siswa?.nisn ? `(${tagihan.siswa.nisn})` : ''}</div>

            <div className="font-medium text-gray-600">Nominal</div>
            <div>{formatRupiah(tagihan.nominal)}</div>

            <div className="font-medium text-gray-600">Jatuh Tempo</div>
            <div>{tagihan.tanggal_jatuh_tempo}</div>

            <div className="font-medium text-gray-600">Status</div>
            <div>{statusBadge(tagihan.status)}</div>

            <div className="font-medium text-gray-600">Keterangan</div>
            <div>{tagihan.keterangan ?? '-'}
            </div>
          </div>
        </div>

        {/* Pembayaran list */}
        <div className="mt-6 bg-white rounded-lg shadow border p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Riwayat Pembayaran</h2>
          {tagihan.pembayaran && tagihan.pembayaran.length > 0 ? (
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Tanggal</th>
                  <th className="px-4 py-2">Nominal</th>
                  <th className="px-4 py-2">Metode</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {tagihan.pembayaran.map((p, idx) => (
                  <tr key={p.id} className={idx % 2 === 0 ? 'bg-gray-100' : ''}>
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{p.tanggal_bayar}</td>
                    <td className="px-4 py-2">{formatRupiah(p.nominal)}</td>
                    <td className="px-4 py-2">{p.metode}</td>
                    <td className="px-4 py-2">{p.status}</td>
                    <td className="px-4 py-2">{p.keterangan ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">Tidak ada pembayaran tercatat.</p>
          )}
        </div>
      </div>
    </>
  );
}