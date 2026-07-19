import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { FileText, Edit, Trash2, Download, ChevronLeft } from "lucide-react";

interface SiswaItem { id: number; nama_lengkap: string; nisn: string; }
interface UserItem { id: number; name: string; nip?: string; }
interface SuratItem {
    id: number;
    jenis: string;
    isi_surat: string;
    file_path: string | null;
    status: string;
    tanggal_surat: string;
    catatan: string | null;
    created_at: string;
    siswa: SiswaItem;
    pembuat: UserItem | null;
    penyetuju: UserItem | null;
}

interface Props {
    surat: SuratItem;
}

const jenisLabels: Record<string, string> = {
    panggilan_ortu: 'Surat Panggilan Orang Tua',
    pernyataan: 'Surat Pernyataan',
    rekomendasi_pkl: 'Surat Rekomendasi PKL',
    rekomendasi_kuliah: 'Surat Rekomendasi Kuliah',
    lainnya: 'Surat Lainnya',
};

const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    diajukan: 'bg-yellow-100 text-yellow-700',
    disetujui: 'bg-green-100 text-green-700',
    ditolak: 'bg-red-100 text-red-700',
};

export default function Show({ surat }: Props) {
    const handleDelete = () => {
        if (confirm('Yakin ingin menghapus surat ini?')) {
            Inertia.delete(route('bk.surat.destroy', surat.id));
        }
    };

    const handleDownloadPdf = () => {
        Inertia.get(route('bk.surat.cetak-pdf', surat.id));
    };

    return (
        <>
            <Head title={`Surat - ${surat.siswa.nama_lengkap}`} />
            <div className="p-4 lg:p-6 max-w-3xl mx-auto">
                <div className="mb-6 flex items-center gap-4">
                    <Link
                        href={route('bk.surat.index')}
                        className="flex items-center gap-2 px-3 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Kembali
                    </Link>
                    <div className="flex gap-2 ml-auto">
                        <Link
                            href={route('bk.surat.edit', surat.id)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition"
                        >
                            <Edit className="w-4 h-4" />
                            Edit
                        </Link>
                        <button
                            onClick={handleDownloadPdf}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition"
                        >
                            <Download className="w-4 h-4" />
                            Unduh PDF
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                        >
                            <Trash2 className="w-4 h-4" />
                            Hapus
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-border rounded-xl p-6 lg:p-8 space-y-6">
                    {/* Header */}
                    <div className="border-b border-border pb-4">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {jenisLabels[surat.jenis] || surat.jenis}
                            </h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[surat.status] || 'bg-gray-100 text-gray-700'}`}>
                                {surat.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500">
                            Nomor: {surat.id}/{new Date(surat.created_at).getFullYear()}
                        </p>
                    </div>

                    {/* Siswa Info */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Data Siswa</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div><span className="font-medium text-gray-600">Nama: </span>{surat.siswa.nama_lengkap}</div>
                            <div><span className="font-medium text-gray-600">NISN: </span>{surat.siswa.nisn}</div>
                        </div>
                    </div>

                    {/* Surat Content */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Isi Surat</h3>
                        <div className="prose prose-sm max-w-none bg-gray-50 rounded-lg p-6 min-h-[200px] whitespace-pre-line">
                            {surat.isi_surat || <em className="text-gray-400">Belum diisi</em>}
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                        <div>
                            <p className="text-xs text-gray-500">Tanggal Surat</p>
                            <p className="text-sm font-medium">{surat.tanggal_surat ? new Date(surat.tanggal_surat).toLocaleDateString('id-ID') : '-'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Dibuat pada</p>
                            <p className="text-sm font-medium">{new Date(surat.created_at).toLocaleString('id-ID')}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Dibuat oleh</p>
                            <p className="text-sm font-medium">{surat.pembuat?.name || '-'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Disetujui oleh</p>
                            <p className="text-sm font-medium">{surat.penyetuju?.name || '-'}</p>
                        </div>
                    </div>

                    {surat.catatan && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <p className="text-xs font-semibold text-amber-800 mb-1">Catatan Internal</p>
                            <p className="text-sm text-amber-700">{surat.catatan}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
