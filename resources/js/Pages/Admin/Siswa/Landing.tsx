import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Users, GraduationCap, ArrowRight, Layers } from 'lucide-react';

interface Angkatan {
    tingkat: string;
    kelas_count: number;
    siswa_count: number;
    variants: string[];
}

export default function Landing() {
    const { angkatan, flash } = usePage().props as unknown as { angkatan: Angkatan[]; flash?: any };

    // ponytail: kasih visual beda untuk tingkatan yang belum punya kelas
    const colorByTingkat: Record<string, { bg: string; text: string; chip: string; icon: string }> = {
        '10': { bg: 'from-blue-500 to-blue-700', text: 'text-blue-700', chip: 'bg-blue-100 text-blue-700', icon: 'bg-blue-100 text-blue-600' },
        '11': { bg: 'from-emerald-500 to-emerald-700', text: 'text-emerald-700', chip: 'bg-emerald-100 text-emerald-700', icon: 'bg-emerald-100 text-emerald-600' },
        '12': { bg: 'from-violet-500 to-violet-700', text: 'text-violet-700', chip: 'bg-violet-100 text-violet-700', icon: 'bg-violet-100 text-violet-600' },
    };

    return (
        <>
            <Head title="Data Siswa" />
            <div className="p-4 lg:p-6">
                <div className="mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Data Siswa</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Kelola data siswa & status akademik per angkatan</p>
               </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">
                        {flash.success}
                   </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                    {angkatan.map((row) => {
                        const colors = colorByTingkat[row.tingkat] ?? colorByTingkat['10'];
                        const empty = row.kelas_count === 0;
                        return (
                            <Link
                                key={row.tingkat}
                                href={route('users.murid.tingkat', row.tingkat)}
                                preserveScroll
                                className={`group relative bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all ${empty ? 'opacity-60 pointer-events-none' : 'hover:-translate-y-0.5'}`}
                            >
                                {/* Top color band */}
                                <div className={`h-2 bg-gradient-to-r ${colors.bg}`} />

                                <div className="p-5 lg:p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-11 h-11 rounded-xl ${colors.icon} flex items-center justify-center`}>
                                            <GraduationCap className="w-5 h-5" />
                                       </div>
                                        <span className={`text-[10px] font-bold tracking-widest ${colors.chip} px-2 py-1 rounded-full uppercase`}>
                                            Tingkat {row.tingkat}
                                       </span>
                                   </div>

                                    <h2 className="text-lg font-bold text-gray-900 font-heading mb-1">
                                        Kelas {row.tingkat}
                                   </h2>
                                    <p className="text-xs text-gray-500 mb-5">
                                        {empty ? 'Belum ada kelas di master' : 'Klik untuk kelola siswa & variant'}
                                   </p>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                <Users className="w-3 h-3" />
                                                Siswa
                                           </div>
                                            <div className="text-xl font-bold text-gray-900 tabular-nums">
                                                {row.siswa_count}
                                           </div>
                                       </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                <Layers className="w-3 h-3" />
                                                Kelas
                                           </div>
                                            <div className="text-xl font-bold text-gray-900 tabular-nums">
                                                {row.kelas_count}
                                           </div>
                                       </div>
                                   </div>

                                    {row.variants.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {row.variants.map((v) => (
                                                <span key={v} className={`text-xs font-bold ${colors.chip} px-2 py-0.5 rounded`}>
                                                    {row.tingkat}{v}
                                               </span>
                                            ))}
                                       </div>
                                    )}

                                    <div className={`mt-5 flex items-center text-sm font-semibold ${colors.text} group-hover:gap-2 transition-all`}>
                                        Buka data
                                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                                   </div>
                               </div>
                           </Link>
                        );
                    })}
               </div>
           </div>
        </>
    );
}
