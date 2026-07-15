import { Head } from "@inertiajs/inertia-react";

export default function Home({ auth, data }) {
    const user = auth.user;
    const role = (user.role || "").toLowerCase();

    // Role-based content
    let content;
    switch (role) {
        case "admin":
            content = (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Dashboard Admin
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl border border-gray-100 p-5">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Guru Aktif
                            </h3>
                            <p className="text-2xl font-bold text-blue-600">
                                {data.guru ?? 0}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-100 p-5">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Murid Aktif
                            </h3>
                            <p className="text-2xl font-bold text-green-600">
                                {data.murid ?? 0}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-100 p-5">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Alumni Aktif
                            </h3>
                            <p className="text-2xl font-bold text-purple-600">
                                {data.alumni ?? 0}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-100 p-5">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Buku Stok
                            </h3>
                            <p className="text-2xl font-bold text-orange-600">
                                {data.book ?? 0}
                            </p>
                        </div>
                    </div>
                    {data.event && (
                        <div className="bg-white rounded-xl border border-gray-100 p-5">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Event Terdekat
                            </h3>
                            <p className="text-gray-700">
                                {data.event.nama ?? "-"}
                            </p>
                        </div>
                    )}
                </div>
            );
        case "murid":
            content = (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Dashboard Murid
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl border border-gray-100 p-5">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Terlambat Pengembalian
                            </h3>
                            <p className="text-2xl font-bold text-destructive">
                                {data.lateness ?? 0}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-100 p-5">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Sedang Dipinjam
                            </h3>
                            <p className="text-2xl font-bold text-blue-600">
                                {data.pinjam ?? 0}
                            </p>
                        </div>
                    </div>
                    {data.event && (
                        <div className="bg-white rounded-xl border border-gray-100 p-5">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Event Terdekat
                            </h3>
                            <p className="text-gray-700">
                                {data.event.nama ?? "-"}
                            </p>
                        </div>
                    )}
                </div>
            );
        case "guru":
        case "staf":
            content = (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Dashboard Guru/Staf
                    </h2>
                    {data.event && (
                        <div className="bg-white rounded-xl border border-gray-100 p-5">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Event Terdekat
                            </h3>
                            <p className="text-gray-700">
                                {data.event.nama ?? "-"}
                            </p>
                        </div>
                    )}
                </div>
            );
        case "perpustakaan":
            content = (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Dashboard Perpustakaan
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white rounded-xl border border-gray-100 p-5">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Stok Buku
                            </h3>
                            <p className="text-2xl font-bold text-green-600">
                                {data.book ?? 0}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-100 p-5">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Peminjaman Aktif
                            </h3>
                            <p className="text-2xl font-bold text-blue-600">
                                {data.borrow ?? 0}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-100 p-5">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Anggota Tidak Aktif
                            </h3>
                            <p className="text-2xl font-bold text-destructive">
                                {data.member ?? 0}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-100 p-5">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Total Anggota
                            </h3>
                            <p className="text-2xl font-bold text-purple-600">
                                {data.members ?? 0}
                            </p>
                        </div>
                    </div>
                </div>
            );
        case "bendahara":
            content = (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Dashboard Bendahara
                    </h2>
                    <p className="text-gray-600">
                        Selamat datang, Bendahara. Silakan akses menu SPP untuk
                        mengelola pembayaran.
                    </p>
                </div>
            );
        default:
            content = (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Dashboard
                    </h2>
                    <p className="text-gray-600">
                        Selamat datang, {user.name}. Role Anda: {user.role}
                    </p>
                </div>
            );
    }

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold text-gray-800">
                    Selamat Datang, {user.name}!
                </h1>
            </div>
            {content}
        </>
    );
}
