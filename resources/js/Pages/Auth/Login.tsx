import { useForm, usePage } from '@inertiajs/inertia-react';
import Head from '@/Layout/Head';
import GuestLayout from '@/Layout/GuestLayout';
import type { PageProps } from '@/types';

export default function Login() {
    const { flash } = usePage().props as unknown as PageProps;

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/auth/login');
    }

    return (
        <>
            <Head title="Login" />

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-6">
                    Masuk ke Akun Anda
                </h2>

                {flash?.error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300">
                        {flash.error}
                    </div>
                )}

                {flash?.success && (
                    <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-700 dark:text-green-300">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
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
                            placeholder="admin@sekolahku.sch.id"
                            required
                            autoFocus
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
                            placeholder="••••••••"
                            required
                        />
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            id="remember"
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            Ingat saya
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-2.5 bg-primary hover:bg-primary-light text-white font-medium rounded-lg text-sm transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>
            </div>
        </>
    );
}

Login.layout = GuestLayout;
