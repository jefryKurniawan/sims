import Head from '@/Layout/Head';
import Header from '@/Components/Frontend/Header';
import Slider from '@/Components/Frontend/Slider';
import About from '@/Components/Frontend/About';
import Video from '@/Components/Frontend/Video';
import Teachers from '@/Components/Frontend/Teachers';
import NewsEvents from '@/Components/Frontend/NewsEvents';
import Footer from '@/Components/Frontend/Footer';
import type { ReactElement } from 'react';

interface FrontendIndexProps {
    berita: Array<{
        id: number;
        title: string;
        slug: string;
        thumbnail: string;
        created_at: string;
    }>;
    event: Array<{
        id: number;
        title: string;
        slug: string;
        desc: string;
        acara: string;
        lokasi: string;
    }>;
    slider: Array<{
        image: string;
        title: string;
        desc: string;
    }>;
    about: {
        title: string;
        desc: string;
        image: string;
    } | null;
    video: {
        title: string;
        desc: string;
        url: string;
    } | null;
    footer: {
        logo: string | null;
        desc: string;
        telp: string;
        email: string;
        linkedln: string;
        twitter: string;
        facebook: string;
        instagram: string;
    } | null;
    jurusanM: Array<{
        slug: string;
        nama: string;
    }>;
    kegiatanM: Array<{
        slug: string;
        nama: string;
    }>;
    pengajar: Array<{
        id: number;
        name: string;
        email: string;
        foto_profile: string;
        userDetail: {
            mengajar: string;
            website?: string;
            linkedln?: string;
            twitter?: string;
            facebook?: string;
            instagram?: string;
        } | null;
    }>;
}

export default function Index({
    berita,
    event,
    slider,
    about,
    video,
    footer,
    jurusanM,
    kegiatanM,
    pengajar,
}: FrontendIndexProps) {
    return (
        <>
            <Head title="Beranda" />
            <div className="min-h-screen bg-gray-50">
                <Header footer={footer} jurusanM={jurusanM} kegiatanM={kegiatanM} />
                <main className="flex-1">
                    <Slider slider={slider} />
                    <About about={about} />
                    <Video video={video} />
                    <Teachers pengajar={pengajar} />
                    <NewsEvents berita={berita} event={event} />
                </main>
                <Footer footer={footer} />
            </div>
        </>
    );
}

Index.layout = (page: React.ReactElement) => page;