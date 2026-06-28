import { ReactNode } from 'react';
import Head from './Head';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';

interface FrontendLayoutProps {
    children: ReactNode;
    title?: string;
    footer?: {
        logo: string | null;
        desc: string;
        telp: string;
        email: string;
        linkedln: string;
        twitter: string;
        facebook: string;
        instagram: string;
    } | null;
    jurusanM?: Array<{
        slug: string;
        nama: string;
    }>;
    kegiatanM?: Array<{
        slug: string;
        nama: string;
    }>;
}

export default function FrontendLayout({ children, title, footer, jurusanM, kegiatanM }: FrontendLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-50">
                <Header footer={footer} jurusanM={jurusanM} kegiatanM={kegiatanM} />
                <main className="flex-1">
                    {children}
                </main>
                <Footer footer={footer} />
            </div>
        </>
    );
}