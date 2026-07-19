import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { ChevronLeft, ChevronRight, File, CheckCircle2, AlertCircle, Circle } from "lucide-react";
import { useState } from "react";

interface DocNode {
    id: number;
    butir: string;
    nama_dokumen: string;
    status: string;
    file_path: string;
    penanggung_jawab?: { id: number; name: string };
}

export default function TreeView({ tree, tahunAjaran }: { tree: Record<string, Record<string, Record<string, DocNode[]>>>; tahunAjaran: string }) {
    const [openStandars, setOpenStandars] = useState<Record<string, boolean>>(() => {
        const init: Record<string, boolean> = {};
        Object.keys(tree).forEach((k) => { init[k] = true; });
        return init;
    });
    const [openSubs, setOpenSubs] = useState<Record<string, boolean>>({});

    const toggleStandar = (s: string) => setOpenStandars((prev) => ({ ...prev, [s]: !prev[s] }));
    const toggleSub = (s: string) => setOpenSubs((prev) => ({ ...prev, [s]: !prev[s] }));

    const standarLabels: Record<string, string> = {
        "1": "Standar 1: Mutu & Daya Saing",
        "2": "Standar 2: Tata Kelola",
        "3": "Standar 3: Mutu Lulusan",
        "4": "Standar 4: Kurikulum & Pembelajaran",
        "5": "Standar 5: Pendidik & Tenaga Kependidikan",
        "6": "Standar 6: Sarana & Prasarana",
        "7": "Standar 7: Pembiayaan",
        "8": "Standar 8: Penjaminan Mutu",
    };

    return (
        <>
            <Head title={`Tree View - ${tahunAjaran}`} />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Tree View Akreditasi
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">Tahun Ajaran: {tahunAjaran}</p>
                    </div>
                    <Link
                        href={route("tu.arsip-akreditasi.index")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Kembali
                    </Link>
                </div>

                <div className="space-y-3">
                    {Object.entries(tree).map(([standar, subs]) => (
                        <div key={standar} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                            <button
                                type="button"
                                onClick={() => toggleStandar(standar)}
                                className="w-full flex items-center justify-between px-5 py-3.5 bg-gray-50 hover:bg-gray-100 transition text-left"
                            >
                                <div className="flex items-center gap-2">
                                    {openStandars[standar] ? (
                                        <ChevronRight className="w-4 h-4 text-gray-500 rotate-90" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-500" />
                                    )}
                                    <h3 className="font-semibold text-gray-800">{standarLabels[standar] || `Standar ${standar}`}</h3>
                                </div>
                            </button>

                            {openStandars[standar] && (
                                <div className="p-4 space-y-3">
                                    {Object.entries(subs).map(([sub, butirs]) => {
                                        const subKey = `${standar}-${sub}`;
                                        return (
                                            <div key={subKey} className="border border-gray-100 rounded-lg">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleSub(subKey)}
                                                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition text-left"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {openSubs[subKey] ? (
                                                            <ChevronRight className="w-3.5 h-3.5 text-gray-400 rotate-90" />
                                                        ) : (
                                                            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                                                        )}
                                                        <span className="text-sm font-medium text-gray-700">{sub}</span>
                                                    </div>
                                                </button>

                                                {openSubs[subKey] && (
                                                    <div className="px-4 pb-3 space-y-2">
                                                        {Object.entries(butirs).map(([butir, docs]) => (
                                                            <div key={butir}>
                                                                {docs.map((doc: DocNode) => (
                                                                    <div
                                                                        key={doc.id}
                                                                        className="flex items-center justify-between px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer"
                                                                        onClick={() => Inertia.visit(route("tu.arsip-akreditasi.show", doc.id))}
                                                                    >
                                                                        <div className="flex items-center gap-3 min-w-0">
                                                                            <File className="w-4 h-4 text-gray-400 shrink-0" />
                                                                            <div className="min-w-0">
                                                                                <p className="text-sm font-medium text-gray-800 truncate">{doc.nama_dokumen}</p>
                                                                                <p className="text-xs text-gray-500">{butir}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center gap-2 shrink-0">
                                                                            {doc.status === "lengkap" ? (
                                                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
                                                                                    <CheckCircle2 className="w-3 h-3" />
                                                                                    Lengkap
                                                                                </span>
                                                                            ) : (
                                                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-700">
                                                                                    <AlertCircle className="w-3 h-3" />
                                                                                    Belum
                                                                                </span>
                                                                            )}
                                                                            {doc.penanggung_jawab && (
                                                                                <span className="text-xs text-gray-500">{doc.penanggung_jawab.name}</span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
