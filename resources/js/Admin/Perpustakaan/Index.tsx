import { useForm, usePage, Link } from '@inertiajs/inertia-react';
import { useRouter } from '@inertiajs/inertia-react';

export default function Index() {
    const { data } = usePage().props;
    const { perpus, flash } = data;
    const router = useRouter();

    const handleDelete = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus petugas perpustakaan ini?')) {
            router.delete(route('backend-pengguna-perpus.destroy', id), {
                onSuccess: () => {
                    // Success will be shown via flash on next page load
                },
                onError: () => {
                    alert('Gagal menghapus petugas perpustakaan');
                },
            });
        }
    };

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Petugas Perpustakaan</h1>
                <Link
                    href={route('backend-pengguna-perpus.create')}
                    className="btn btn-primary mb-2"
                >
                    Tambah Petugas Perpustakaan Baru
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
                        {perpus.length > 0 ? (
                            perpus.map((p, index) => (
                                <tr key={p.id}>
                                    <td>{index + 1}</td>
                                    <td>{p.name}</td>
                                    <td>{p.userDetail?.nip || '-'}</td>
                                    <td>{p.email}</td>
                                    <td>
                                        <span
                                            className={`badge ${
                                                p.status === 'Aktif'
                                                    ? 'badge-success'
                                                    : 'badge-warning'
                                            }`}
                                        >
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="text-center whitespace-nowrap">
                                        <Link
                                            href={route('backend-pengguna-perpus.edit', p.id)}
                                            className="btn btn-xs btn-outline mr-1"
                                        >
                                            Ubah
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(p.id)}
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
                                    Tidak ada data petugas perpustakaan
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}