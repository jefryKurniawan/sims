import { useForm, usePage, Link } from '@inertiajs/inertia-react';
import { useRouter } from '@inertiajs/inertia-react';

export default function Index() {
    const { data } = usePage().props;
    const { bendahara, flash } = data;
    const router = useRouter();

    const handleDelete = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data bendahara ini?')) {
            router.delete(route('backend-pengguna-bendahara.destroy', id), {
                onSuccess: () => {
                    // Success will be shown via flash on next page load
                },
                onError: () => {
                    alert('Gagal menghapus data bendahara');
                },
            });
        }
    };

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Data Bendahara (SPP)</h1>
                <Link
                    href={route('backend-pengguna-bendahara.create')}
                    className="btn btn-primary mb-2"
                >
                    Tambah Bendahara Baru
                </Link>
                {flash?.success && (
                    <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded-lg">
                        {flash.error}
                    </div>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>NIP</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th className="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bendahara.length > 0 ? (
                            bendahara.map((b, index) => (
                                <tr key={b.id}>
                                    <td>{index + 1}</td>
                                    <td>{b.name}</td>
                                    <td>{b.userDetail?.nip || '-'}</td>
                                    <td>{b.email}</td>
                                    <td>
                                        <span
                                            className={`badge ${
                                                b.status === 'Aktif'
                                                    ? 'badge-success'
                                                    : 'badge-warning'
                                            }`}
                                        >
                                            {b.status}
                                        </span>
                                    </td>
                                    <td className="text-center whitespace-nowrap">
                                        <Link
                                            href={route('backend-pengguna-bendahara.edit', b.id)}
                                            className="btn btn-xs btn-outline mr-1"
                                        >
                                            Ubah
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(b.id)}
                                            className="btn btn-xs btn-error"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    Tidak ada data bendahara
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}