import { useForm, usePage } from '@inertiajs/inertia-react';
import Head from '@/Layout/Head';
import GuestLayout from '@/Layout/GuestLayout';
import type { PageProps } from '@/types';

export default function Register() {
    const { flash } = usePage().props as unknown as PageProps;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/register');
    }

    return (
        <>
            <Head title="Daftar" />

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-6">
                    Daftar Akun
                </h2>

                {flash?.error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300">
                        {flash.error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nama Lengkap
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition dark:bg-gray-700 dark:text-white dark:border-gray-600 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Nama Lengkap"
                            required
                            autoFocus
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition dark:bg-gray-700 dark:text-white dark:border-gray-600 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="email@contoh.com"
                            required
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition dark:bg-gray-700 dark:text-white dark:border-gray-600 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Minimal 8 karakter"
                            required
                        />
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Konfirmasi Password
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition dark:bg-gray-700 dark:text-white dark:border-gray-600 ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Ulangi password"
                            required
                        />
                        {errors.password_confirmation && (
                            <p className="mt-1 text-xs text-red-500">{errors.password_confirmation}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-2.5 bg-primary hover:bg-primary-light text-white font-medium rounded-lg text-sm transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Memproses...' : 'Daftar'}
                    </button>
                </form>

                <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
                    Sudah punya akun?{' '}
                    <a href="/login" className="text-primary hover:text-primary-light font-medium">
                        Masuk
                    </a>
                </p>
            </div>
        </>
    );
}

Register.layout = GuestLayout;
