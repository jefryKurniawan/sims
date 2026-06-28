import { usePage, Link } from '@inertiajs/inertia-react';

export default function Show() {
    const { data } = usePage().props;
    const { applicant, flash } = data;

    const getStatusBadge = (status: string) => {
        const classes: Record<string, string> = {
            draft: 'badge badge-neutral',
            submitted: 'badge badge-info',
            verifikasi_berkas: 'badge badge-warning',
            lulus_seleksi: 'badge badge-success',
            diterima: 'badge badge-success',
            ditolak: 'badge badge-error',
        };
        return classes[status] || 'badge badge-neutral';
    };

    return (
        <>
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <Link href={route('spmb.applicant.index')} className="text-sm text-primary hover:underline mb-2 inline-block">&larr; Kembali</Link>
                    <h1 className="text-2xl font-bold">{applicant.nama_lengkap}</h1>
                    <p className="text-gray-500">{applicant.nomor_registrasi} | {applicant.nisn}</p>
                </div>
                <div className="flex gap-2">
                    <span className={getStatusBadge(applicant.status_pendaftaran) + ' badge-lg badge'}>
                        {applicant.status_pendaftaran?.replace(/_/g, ' ')}
                    </span>
                    <Link href={route('spmb.applicant.edit', applicant.id)} className="btn btn-sm btn-outline">Edit</Link>
                </div>
            </div>

            {flash?.success && (
                <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg">{flash.success}</div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Data Pribadi */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-bold mb-4">Data Pribadi</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Nama Lengkap</p>
                            <p className="font-medium">{applicant.nama_lengkap}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">NISN</p>
                            <p className="font-medium">{applicant.nisn}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Tempat, Tanggal Lahir</p>
                            <p className="font-medium">{applicant.tempat_lahir}, {new Date(applicant.tanggal_lahir).toLocaleDateString('id-ID')}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Jenis Kelamin</p>
                            <p className="font-medium">{applicant.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm text-gray-500">Alamat</p>
                            <p className="font-medium">{applicant.alamat}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">No. HP</p>
                            <p className="font-medium">{applicant.no_hp}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{applicant.email || '-'}</p>
                        </div>
                    </div>

                    <h2 className="text-lg font-bold mb-4 mt-6">Data Pendidikan</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Asal Sekolah</p>
                            <p className="font-medium">{applicant.asal_sekolah}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">NPSN</p>
                            <p className="font-medium">{applicant.npsn_sekolah || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Jurusan</p>
                            <p className="font-medium">{applicant.jurusan_sekolah || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Tahun Lulus</p>
                            <p className="font-medium">{applicant.tahun_lulus || '-'}</p>
                        </div>
                    </div>

                    <h2 className="text-lg font-bold mb-4 mt-6">Data Orang Tua</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Ayah</p>
                            <p className="font-medium">{applicant.nama_ayah || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Ibu</p>
                            <p className="font-medium">{applicant.nama_ibu || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Pekerjaan Ayah</p>
                            <p className="font-medium">{applicant.pekerjaan_ayah || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Pekerjaan Ibu</p>
                            <p className="font-medium">{applicant.pekerjaan_ibu || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Penghasilan</p>
                            <p className="font-medium">{applicant.penghasilan_ortu || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">No. HP Orang Tua</p>
                            <p className="font-medium">{applicant.no_hp_ortu || '-'}</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Status Info */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-bold mb-4">Informasi Pendaftaran</h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Jalur</p>
                                <p className="font-medium capitalize">{applicant.jalur_pendaftaran}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <span className={`${getStatusBadge(applicant.status_pendaftaran)} badge`}>
                                    {applicant.status_pendaftaran?.replace(/_/g, ' ')}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Tanggal Daftar</p>
                                <p className="font-medium">{new Date(applicant.created_at).toLocaleDateString('id-ID')}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Token</p>
                                <p className="font-mono text-xs">{applicant.token_pendaftaran}</p>
                            </div>
                        </div>
                    </div>

                    {/* Afirmasi */}
                    {applicant.afirmasi && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 className="text-lg font-bold mb-4">Data Afirmasi</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Jenis</p>
                                    <p className="font-medium">{applicant.afirmasi.jenis}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Nomor Kartu</p>
                                    <p className="font-medium">{applicant.afirmasi.nomor_kartu}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Ranking */}
                    {applicant.ranking && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 className="text-lg font-bold mb-4">Hasil Seleksi</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Skor Total</p>
                                    <p className="font-bold text-xl text-primary">{Number(applicant.ranking.skor_total).toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Peringkat</p>
                                    <p className="font-bold text-lg">#{applicant.ranking.peringkat}</p>
                                </div>
                                {applicant.ranking.keterangan && (
                                    <div>
                                        <p className="text-sm text-gray-500">Keterangan</p>
                                        <p className="font-medium">{applicant.ranking.keterangan}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Prestasi */}
                    {applicant.prestasi?.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 className="text-lg font-bold mb-4">Prestasi ({applicant.prestasi.length})</h2>
                            <div className="space-y-2">
                                {applicant.prestasi.map((p: any) => (
                                    <div key={p.id} className="border-b pb-2 last:border-0">
                                        <p className="font-medium">{p.nama_prestasi}</p>
                                        <p className="text-sm text-gray-500">{p.jenis} - {p.tingkat} (Peringkat {p.peringkat})</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TKA */}
                    {applicant.tka && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 className="text-lg font-bold mb-4">Nilai TKA</h2>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span>Matematika</span><span className="font-medium">{applicant.tka.matematika}</span></div>
                                <div className="flex justify-between"><span>IPA</span><span className="font-medium">{applicant.tka.ipa}</span></div>
                                <div className="flex justify-between"><span>Bahasa Indonesia</span><span className="font-medium">{applicant.tka.bahasa_indonesia}</span></div>
                                <div className="flex justify-between"><span>Bahasa Inggris</span><span className="font-medium">{applicant.tka.bahasa_inggris}</span></div>
                                <div className="flex justify-between"><span>Penalaran</span><span className="font-medium">{applicant.tka.penalaran}</span></div>
                                <div className="border-t pt-2 flex justify-between font-bold"><span>Skor IQ</span><span>{applicant.tka.skor_iq}</span></div>
                                <div className="flex justify-between font-bold text-primary"><span>Total</span><span>{applicant.tka.total}</span></div>
                            </div>
                        </div>
                    )}

                    {/* Nilai Akademik */}
                    {applicant.nilai_akademik?.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 className="text-lg font-bold mb-4">Nilai Akademik ({applicant.nilai_akademik.length})</h2>
                            <div className="space-y-2">
                                {applicant.nilai_akademik.map((n: any) => (
                                    <div key={n.id} className="flex justify-between text-sm">
                                        <span>{n.mata_pelajaran}</span>
                                        <span className="font-medium">{n.nilai}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
