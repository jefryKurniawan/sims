import { Head, Link } from "@inertiajs/inertia-react";
import { ClipboardCheck, ClipboardList, Users, Utensils, AlertTriangle } from "lucide-react";

interface Stats { bast_hari_ini: number; bast_diterima: number; total_siswa: number; sudah_absen: number; insiden_aktif: number }

interface Bast { id: number; tanggal: string; status: string; porsi_diterima: number; creator: any }
interface Alert { id: number; siswa: any; condition: any }

interface Props { stats: Stats; bastHariIni: Bast[]; alerts: Alert[] }

const statCards = [
  { label: "BAST Hari Ini", key: "bast_hari_ini" as const, icon: ClipboardCheck, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "BAST Diterima", key: "bast_diterima" as const, icon: ClipboardList, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Total Siswa", key: "total_siswa" as const, icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Sudah Absen Makan", key: "sudah_absen" as const, icon: Utensils, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Insiden Aktif", key: "insiden_aktif" as const, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
];

const quickLinks = [
  { label: "Input BAST", href: route("mbg.basts.create"), icon: ClipboardCheck, color: "text-blue-500" },
  { label: "Uji Organoleptik", href: route("mbg.organoleptik.create"), icon: ClipboardList, color: "text-emerald-500" },
  { label: "Absensi Makan", href: route("mbg.attendances.create"), icon: Users, color: "text-amber-500" },
  { label: "Laporkan Insiden", href: route("mbg.incidents.create"), icon: AlertTriangle, color: "text-red-500" },
];

export default function Dashboard({ stats, bastHariIni, alerts }: Props) {
  return (<>
    <Head title="Dashboard MBG" />
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard MBG — Makan Bergizi Gratis</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (<div key={card.key} className={`${card.bg} rounded-lg p-4 border`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${card.color} bg-white/80`}><Icon className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-gray-500">{card.label}</p>
                <p className={`text-xl font-bold ${card.color}`}>{stats[card.key]}</p>
              </div>
            </div>
          </div>);
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg border p-4">
          <h2 className="font-semibold mb-3">Aksi Cepat</h2>
          <div className="grid grid-cols-2 gap-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (<Link key={link.href} href={link.href}
                className="flex items-center gap-2 p-3 rounded-lg border hover:bg-gray-50 transition">
                <Icon className={`w-5 h-5 ${link.color}`} />
                <span className="text-sm font-medium">{link.label}</span>
              </Link>);
            })}
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <h2 className="font-semibold mb-3">BAST Hari Ini</h2>
          {bastHariIni.length === 0 ? (
            <p className="text-sm text-gray-400">Belum ada BAST hari ini.</p>
          ) : (
            <div className="space-y-2">
              {bastHariIni.map((bast) => (
                <div key={bast.id} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                  <span>{bast.porsi_diterima} porsi</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    bast.status === 'diterima' ? 'bg-emerald-100 text-emerald-700' :
                    bast.status === 'ditolak' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                  }`}>{bast.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h2 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Alert Alergi / Kondisi Khusus
          </h2>
          <div className="space-y-1">
            {alerts.map((a) => (
              <p key={a.id} className="text-sm text-amber-700">
                <strong>{a.siswa?.nama_lengkap}</strong> — {a.condition?.nama} ({a.condition?.kategori})
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  </>);
}
