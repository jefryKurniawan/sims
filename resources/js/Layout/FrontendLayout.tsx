import { ReactNode } from 'react';
import { Head } from './Head';

interface FrontendLayoutProps {
    children: ReactNode;
    title?: string;
    footer?: {
        logo: string | null;
        nama_sekolah: string | null;
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

// ponytail: Design baru menghilangkan layout wrapper agar tiap page
// self-contained dengan own header/footer. Halaman lain nanti juga
// perlu transformasi serupa untuk konsistensi.
export default function FrontendLayout({ children, title }: FrontendLayoutProps) {
    return (
        <>
            <Head title={title} />
            {children}
        </>
    );
}