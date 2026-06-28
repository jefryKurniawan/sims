import { useForm, usePage, Link } from '@inertiajs/inertia-react';
import { useState } from 'react';

export default function Index() {
    const { data } = usePage().props;
    const { banks } = data;
    const [showForm, setShowForm] = useState(false);

    const form = useForm({
        bank_name: '',
        account_name: '',
        account_number: '',
        is_active: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('settings.add.bank'), form);
        form.reset();
        setShowForm(false);
    };

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Pengaturan Bank</h1>
                {data.flash?.success && (
                    <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg">
                        {data.flash.success}
                    </div>
                )}
                {data.flash?.error && (
                    <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded-lg">
                        {data.flash.error}
                    </div>
                )}
            </div>

            <div className="mb-4">
                <button
                    onClick={() => setShowForm(true)}
                    className="btn btn-primary"
                >
                    Tambah Bank Baru
                </button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nama Bank</label>
                            <input
                                type="text"
                                value={form.bank_name}
                                onChange={e => form.set('bank_name', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Nama Bank"
                            />
                            {!!form.errors.bank_name && <span className="text-error text-sm">{form.errors.bank_name}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Nama Pemilik Rekening</label>
                            <input
                                type="text"
                                value={form.account_name}
                                onChange={e => form.set('account_name', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Nama Pemilik Rekening"
                            />
                            {!!form.errors.account_name && <span className="text-error text-sm">{form.errors.account_name}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Nomor Rekening</label>
                            <input
                                type="text"
                                value={form.account_number}
                                onChange={e => form.set('account_number', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Nomor Rekening"
                            />
                            {!!form.errors.account_number && <span className="text-error text-sm">{form.errors.account_number}</span>}
                        </div>
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={form.is_active}
                                onChange={e => form.set('is_active', e.target.checked)}
                                className="checkbox checkbox-primary"
                            />
                            <label className="text-sm font-medium">Aktif</label>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="btn btn-outline"
                            >
                                Batal
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Nama Bank</th>
                            <th>Nama Pemilik Rekening</th>
                            <th>Nomor Rekening</th>
                            <th>Status</th>
                            <th className="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banks.map((bank) => (
                            <tr key={bank.id}>
                                <td>{bank.bank_name}</td>
                                <td>{bank.account_name}</td>
                                <td>{bank.account_number}</td>
                                <td>
                                    <span
                                        className={`badge ${bank.is_active ? 'badge-success' : 'badge-warning'}`}
                                    >
                                        {bank.is_active ? 'Aktif' : 'Tidak Aktif'}
                                    </span>
                                </td>
                                <td className="text-center whitespace-nowrap">
                                    {/* Action buttons will go here */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}