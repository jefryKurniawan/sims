import { Head, useForm, usePage, Link } from "@inertiajs/inertia-react";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function Index() {
    const { banks, flash } = usePage().props;
    const [showForm, setShowForm] = useState(false);

    const form = useForm({
        bank_name: "",
        account_name: "",
        account_number: "",
        is_active: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route("settings.add.bank"));
        form.reset();
        setShowForm(false);
    };

    return (
        <>
            <Head title="Pengaturan Bank" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Pengaturan Bank
                    </h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-school-red rounded-lg hover:bg-red-700 transition"
                    >
                        <Plus className="w-4 h-4" />
                        Bank Baru
                    </button>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        {data.flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                        {data.flash.error}
                    </div>
                )}

                {showForm && (
                    <div className="mb-6 bg-white rounded-lg border p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Bank
                                </label>
                                <input
                                    type="text"
                                    value={form.bank_name}
                                    onChange={(e) =>
                                        form.set("bank_name", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nama Bank"
                                />
                                {!!form.errors.bank_name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.errors.bank_name}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Pemilik Rekening
                                </label>
                                <input
                                    type="text"
                                    value={form.account_name}
                                    onChange={(e) =>
                                        form.set("account_name", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nama Pemilik Rekening"
                                />
                                {!!form.errors.account_name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.errors.account_name}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nomor Rekening
                                </label>
                                <input
                                    type="text"
                                    value={form.account_number}
                                    onChange={(e) =>
                                        form.set(
                                            "account_number",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nomor Rekening"
                                />
                                {!!form.errors.account_number && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.errors.account_number}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={form.is_active}
                                    onChange={(e) =>
                                        form.set("is_active", e.target.checked)
                                    }
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="text-sm font-medium text-gray-700">
                                    Aktif
                                </label>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                    <table className="w-full text-sm text-left rtl:text-right text-body">
                        <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                            <tr>
                                <th className="px-6 py-3 font-medium">
                                    Nama Bank
                                </th>
                                <th className="px-6 py-3 font-medium">
                                    Nama Pemilik Rekening
                                </th>
                                <th className="px-6 py-3 font-medium">
                                    Nomor Rekening
                                </th>
                                <th className="px-6 py-3 font-medium">
                                    Status
                                </th>
                                <th className="px-6 py-3 font-medium">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {banks.map((bank) => (
                                <tr key={bank.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        {bank.bank_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {bank.account_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {bank.account_number}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-0.5 text-xs font-medium rounded-full ${bank.is_active ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                                        >
                                            {bank.is_active
                                                ? "Aktif"
                                                : "Tidak Aktif"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
