import { Head as InertiaHead } from '@inertiajs/inertia-react';
export const Head = InertiaHead;

export default function InertiaHead({ title }) {
    return (
        <>
            <title>{title ? `${title} - Sekolahku` : 'Sekolahku'}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <meta name="description" content="Sekolahku - Sistem Manajemen Sekolah" />
        </>
    );
}