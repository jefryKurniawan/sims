/// <reference types="vite/client" />
import { Head, Link } from "@inertiajs/inertia-react";
import Header from "@/Components/Frontend/Header";
import Footer from "@/Components/Frontend/Footer";
import { useState } from "react";
import { Heart, Shield, ArrowRight, CreditCard } from "lucide-react";

export default function Donasi() {
    const [donationAmount, setDonationAmount] = useState<number>(0);
    const [customAmount, setCustomAmount] = useState<string>("");

    const presetAmounts = [50000, 100000, 250000, 500000, 1000000];

    const handlePresetClick = (amount: number) => {
        setDonationAmount(amount);
        setCustomAmount("");
    };

    const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        setCustomAmount(value);
        setDonationAmount(value ? parseInt(value) : 0);
    };

    return (
        <>
            <Head title="Donasi Alumni - SMAS St. Bonaventura" />
            <Header />
            <div className="min-h-screen bg-gray-50 pt-20">
                {/* Hero Section */}
                <div className="relative h-[300px] bg-gradient-to-br from-rose-500 via-rose-700 to-pink-900 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white px-4">
                            <div className="inline-block mb-4">
                                <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium">
                                    ❤️ Donasi Alumni
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Berbagi untuk Sekolah
                            </h1>
                            <p className="text-xl text-white/90">
                                Dukung pengembangan sekolah melalui donasi Anda
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
                </div>

                {/* Content Section */}
                <section className="py-12 -mt-10">
                    <div className="container mx-auto px-4">
                        {/* Navigation Tabs */}
                        <div className="flex flex-wrap gap-2 mb-8 justify-center">
                            <Link
                                href="/alumni"
                                className="px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-50 transition shadow-lg"
                            >
                                📋 Direktori Alumni
                            </Link>
                            <Link
                                href="/alumni/tracer-study"
                                className="px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-50 transition shadow-lg"
                            >
                                📊 Tracer Study
                            </Link>
                            <Link
                                href="/alumni/forum"
                                className="px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-50 transition shadow-lg"
                            >
                                💬 Forum
                            </Link>
                            <Link
                                href="/alumni/donasi"
                                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition shadow-lg shadow-primary/30"
                            >
                                ❤️ Donasi
                            </Link>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {/* Donation Form */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-2xl shadow-xl p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <Heart
                                            className="w-6 h-6 text-rose-500"
                                            fill="currentColor"
                                        />
                                        Pilih Nominal Donasi
                                    </h2>

                                    {/* Preset Amounts */}
                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
                                        {presetAmounts.map((amount) => (
                                            <button
                                                key={amount}
                                                onClick={() =>
                                                    handlePresetClick(amount)
                                                }
                                                className={`py-3 px-2 rounded-xl font-semibold transition ${
                                                    donationAmount === amount
                                                        ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                            >
                                                Rp{" "}
                                                {(amount / 1000).toLocaleString(
                                                    "id-ID",
                                                )}
                                                K
                                            </button>
                                        ))}
                                    </div>

                                    {/* Custom Amount */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Atau Masukkan Nominal Lainnya
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                                                Rp
                                            </span>
                                            <input
                                                type="text"
                                                value={
                                                    customAmount
                                                        ? Number(
                                                              customAmount,
                                                          ).toLocaleString(
                                                              "id-ID",
                                                          )
                                                        : ""
                                                }
                                                onChange={handleCustomChange}
                                                placeholder="0"
                                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-lg font-semibold"
                                            />
                                        </div>
                                    </div>

                                    {/* Current Amount Display */}
                                    {donationAmount > 0 && (
                                        <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-4 mb-6 text-center">
                                            <p className="text-sm text-rose-600 mb-1">
                                                Total Donasi
                                            </p>
                                            <p className="text-3xl font-bold text-rose-700">
                                                Rp{" "}
                                                {donationAmount.toLocaleString(
                                                    "id-ID",
                                                )}
                                            </p>
                                        </div>
                                    )}

                                    {/* Payment Method */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-gray-900 mb-3">
                                            Metode Pembayaran
                                        </h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-rose-500 transition text-center">
                                                <div className="text-2xl mb-2">
                                                    🏦
                                                </div>
                                                <div className="text-sm font-semibold">
                                                    Transfer Bank
                                                </div>
                                            </button>
                                            <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-rose-500 transition text-center">
                                                <div className="text-2xl mb-2">
                                                    💳
                                                </div>
                                                <div className="text-sm font-semibold">
                                                    Kartu Kredit/Debit
                                                </div>
                                            </button>
                                            <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-rose-500 transition text-center">
                                                <div className="text-2xl mb-2">
                                                    📱
                                                </div>
                                                <div className="text-sm font-semibold">
                                                    E-Wallet
                                                </div>
                                            </button>
                                            <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-rose-500 transition text-center">
                                                <div className="text-2xl mb-2">
                                                    🏪
                                                </div>
                                                <div className="text-sm font-semibold">
                                                    Retail/Alfamart
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        disabled={donationAmount === 0}
                                        className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-rose-500/30 flex items-center justify-center gap-2"
                                    >
                                        <CreditCard className="w-5 h-5" />
                                        Lanjutkan Donasi
                                    </button>
                                </div>
                            </div>

                            {/* Sidebar - Info */}
                            <div className="lg:col-span-1">
                                {/* Impact Card */}
                                <div className="bg-gradient-to-br from-rose-500 to-pink-700 rounded-2xl shadow-lg p-6 text-white mb-6">
                                    <h3 className="font-bold text-lg mb-4">
                                        Dampak Donasi Anda
                                    </h3>
                                    <ul className="space-y-3 text-sm">
                                        <li className="flex items-start gap-2">
                                            <span>📚</span>
                                            <span>
                                                Rp 50.000 = 1 paket buku tulis
                                                untuk siswa kurang mampu
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span>💻</span>
                                            <span>
                                                Rp 500.000 = 1 hari pelatihan
                                                komputer untuk 10 siswa
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span>🔬</span>
                                            <span>
                                                Rp 1.000.000 = Alat praktikum
                                                laboratorium untuk 1 bulan
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span>🏆</span>
                                            <span>
                                                Rp 2.000.000 = Beasiswa prestasi
                                                untuk 1 siswa berprestasi
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Progress Card */}
                                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                                    <h3 className="font-bold text-gray-900 mb-4">
                                        Target Donasi Bulan Ini
                                    </h3>
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">
                                                Terkumpul
                                            </span>
                                            <span className="font-semibold">
                                                Rp 12.500.000
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className="bg-gradient-to-r from-rose-500 to-pink-600 h-3 rounded-full transition-all"
                                                style={{ width: "62.5%" }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                                            <span>Rp 0</span>
                                            <span>Target: Rp 20.000.000</span>
                                        </div>
                                    </div>
                                    <div className="text-center text-sm text-gray-600">
                                        <span className="font-bold text-rose-600">
                                            156
                                        </span>{" "}
                                        donatur telah berkontribusi
                                    </div>
                                </div>

                                {/* Transparency Card */}
                                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                            <Shield className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <h3 className="font-bold text-emerald-800">
                                            Transparansi
                                        </h3>
                                    </div>
                                    <p className="text-sm text-emerald-700">
                                        Semua donasi akan dilaporkan
                                        penggunaannya secara transparan dan
                                        dapat diakses oleh seluruh donatur.
                                    </p>
                                    <a
                                        href="#"
                                        className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-sm mt-3 hover:underline"
                                    >
                                        Lihat Laporan
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Donor Recognition */}
                        <div className="mt-16 max-w-4xl mx-auto">
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                                    🏆 Top Donatur Bulan Ini
                                </h2>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {/* 1st Place */}
                                    <div className="text-center relative">
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <span className="text-4xl">🥇</span>
                                        </div>
                                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                                            A
                                        </div>
                                        <h3 className="font-bold text-gray-900">
                                            Ahmad Fauzi
                                        </h3>
                                        <p className="text-rose-600 font-semibold">
                                            Rp 5.000.000
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Angkatan 2015
                                        </p>
                                    </div>

                                    {/* 2nd Place */}
                                    <div className="text-center relative">
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <span className="text-4xl">🥈</span>
                                        </div>
                                        <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                                            S
                                        </div>
                                        <h3 className="font-bold text-gray-900">
                                            Siti Aminah
                                        </h3>
                                        <p className="text-rose-600 font-semibold">
                                            Rp 3.000.000
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Angkatan 2012
                                        </p>
                                    </div>

                                    {/* 3rd Place */}
                                    <div className="text-center relative">
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <span className="text-4xl">🥉</span>
                                        </div>
                                        <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                                            B
                                        </div>
                                        <h3 className="font-bold text-gray-900">
                                            Budi Hartono
                                        </h3>
                                        <p className="text-rose-600 font-semibold">
                                            Rp 2.000.000
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Angkatan 2018
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
