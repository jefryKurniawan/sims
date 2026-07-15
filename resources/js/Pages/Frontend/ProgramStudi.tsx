import { Head, Link } from "@inertiajs/inertia-react";
import Header from "@/Components/Frontend/Header";
import Footer from "@/Components/Frontend/Footer";
import { BookOpen, ArrowLeft } from "lucide-react";

interface DataJurusan {
    id: number;
    nama: string;
    deskripsi: string;
    gambar: string | null;
    prospek: string | null;
}

interface Jurusan {
    id: number;
    nama: string;
    slug: string;
    deskripsi: string | null;
    gambar: string | null;
    data_jurusan: DataJurusan[];
}

interface Props {
    jurusan: Jurusan;
}

export default function ProgramStudi({ jurusan }: Props) {
    return (
        <>
            <Head title={`${jurusan.nama} - SMAS St. Bonaventura`} />
            <Header />
            <div className="min-h-screen bg-gray-50 pt-20">
                {/* Hero Section */}
                <div className="relative h-[350px] bg-gradient-to-br from-primary via-primary-dark to-blue-900 overflow-hidden">
                    {jurusan.gambar ? (
                        <div className="absolute inset-0">
                            <img
                                src={`/storage/images/jurusan/${jurusan.gambar}`}
                                alt={jurusan.nama}
                                className="w-full h-full object-cover opacity-20"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary-dark/80 to-blue-900/80" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white px-4">
                            <div className="inline-block mb-4">
                                <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium">
                                    🎓 Program Studi
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                {jurusan.nama}
                            </h1>
                            {jurusan.deskripsi && (
                                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                                    {jurusan.deskripsi}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
                </div>

                {/* Content Section */}
                <section className="py-12 -mt-10">
                    <div className="container mx-auto px-4">
                        {/* Program Info Cards */}
                        {jurusan.data_jurusan &&
                        jurusan.data_jurusan.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {jurusan.data_jurusan.map((data) => (
                                    <div
                                        key={data.id}
                                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                                    >
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-blue-500/10">
                                            {data.gambar ? (
                                                <img
                                                    src={`/storage/images/jurusan/${data.gambar}`}
                                                    alt={data.nama}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <BookOpen
                                                        className="w-20 h-20 text-primary/30"
                                                        strokeWidth={1.5}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                {data.nama}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {data.deskripsi}
                                            </p>

                                            {data.prospek && (
                                                <div className="mt-4 pt-4 border-t">
                                                    <h4 className="font-semibold text-primary mb-2 text-sm">
                                                        Prospek Karir
                                                    </h4>
                                                    <p className="text-gray-600 text-xs line-clamp-2">
                                                        {data.prospek}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                                <BookOpen
                                    className="w-20 h-20 text-gray-300 mx-auto mb-4"
                                    strokeWidth={1.5}
                                />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Belum Ada Data
                                </h3>
                                <p className="text-gray-600">
                                    Data program studi belum tersedia.
                                </p>
                            </div>
                        )}

                        {/* Back Button */}
                        <div className="mt-8">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
                            >
                                <ArrowLeft
                                    className="w-5 h-5"
                                    strokeWidth={2}
                                />
                                Kembali ke Beranda
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
