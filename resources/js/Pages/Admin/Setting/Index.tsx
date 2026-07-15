import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Building2, Shield, Settings2, Landmark, PiggyBank } from "lucide-react";

interface SettingData {
    id?: number;
    isEmail?: number;
    email?: string;
    tema?: string;
    hero_media_type?: string;
    hero_media_url?: string;
}

interface ProfileData {
    id?: number;
    nama_sekolah?: string;
    alamat?: string;
    logo_url?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    npsn?: string;
    akreditasi?: string;
    nama_kepala_sekolah?: string;
    nip_kepala_sekolah?: string;
}

export default function Index() {
    const { setting, profileSekolah, banks, spp } = usePage().props as any;
    const p = (profileSekolah || {}) as ProfileData;
    const s = (setting || {}) as SettingData;

    const cards = [
        {
            title: "Data Instansi",
            desc: "Nama sekolah, alamat, logo, media sosial",
            icon: Building2,
            route: route("settings.data-instansi"),
            color: "bg-blue-50 border-blue-200 hover:border-blue-400",
            iconBg: "bg-blue-100 text-blue-600",
            preview: p.nama_sekolah ? p.nama_sekolah : "Belum diisi",
        },
        {
            title: "Legalitas Instansi",
            desc: "NPSN, Akreditasi, Kepala Sekolah",
            icon: Shield,
            route: route("settings.legalitas"),
            color: "bg-emerald-50 border-emerald-200 hover:border-emerald-400",
            iconBg: "bg-emerald-100 text-emerald-600",
            preview: s?.npsn ? `NPSN: ${s.npsn}` : "Belum diisi",
        },
        {
            title: "Konfigurasi Web",
            desc: "Tema, hero, notifikasi",
            icon: Settings2,
            route: route("settings.konfigurasi"),
            color: "bg-amber-50 border-amber-200 hover:border-amber-400",
            iconBg: "bg-amber-100 text-amber-600",
            preview: s?.tema ? `Tema: ${s.tema}` : "Belum diisi",
        },
    ];

    return (
        <>
            <Head title="Pengaturan" />
            <div className="p-4 lg:p-6">
                <div className="mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                        Pengaturan Sistem
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Kelola data instansi, legalitas, tema & konfigurasi website
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <Link
                                key={card.title}
                                href={card.route}
                                className={`rounded-xl border p-5 transition-all ${card.color}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-2.5 rounded-lg ${card.iconBg}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900">
                                            {card.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {card.desc}
                                        </p>
                                        <p className="text-xs font-medium text-gray-700 mt-2 truncate">
                                            {card.preview}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border border-border shadow-sm p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                                <Landmark className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Rekening Bank</h3>
                                <p className="text-xs text-gray-500">
                                    {banks?.length || 0} bank terdaftar
                                </p>
                            </div>
                        </div>
                        {banks?.length > 0 ? (
                            <ul className="space-y-2 text-sm">
                                {banks.map((b: any) => (
                                    <li key={b.id} className="flex justify-between px-3 py-2 bg-gray-50 rounded-lg">
                                        <span className="font-medium">{b.nama_bank}</span>
                                        <span className="text-gray-500">{b.sandi_bank}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-400 text-center py-4">
                                Belum ada bank. Tambah via menu Manajemen Bank.
                            </p>
                        )}
                    </div>

                    <div className="bg-white rounded-xl border border-border shadow-sm p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-rose-100 text-rose-600">
                                <PiggyBank className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">SPP Setting</h3>
                                <p className="text-xs text-gray-500">Besaran SPP default</p>
                            </div>
                        </div>
                        {spp ? (
                            <div className="text-sm px-3 py-2 bg-gray-50 rounded-lg">
                                <span className="text-gray-500">Amount: </span>
                                <span className="font-semibold">
                                    Rp {Number(spp.amount).toLocaleString("id-ID")}
                                </span>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400 text-center py-4">
                                SPP setting belum dikonfigurasi.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
