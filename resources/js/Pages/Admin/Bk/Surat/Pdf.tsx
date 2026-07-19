import { Head } from "@inertiajs/inertia-react";
import { useEffect } from "react";

interface Props {
    html: string;
    filename: string;
}

export default function PdfPage({ html, filename }: Props) {
    useEffect(() => {
        // Create a blob from the HTML and trigger download
        const blob = new Blob([html], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Navigate back after short delay
        setTimeout(() => {
            window.history.back();
        }, 500);
    }, [html, filename]);

    return (
        <>
            <Head title="Mengunduh PDF..." />
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">Mempersiapkan unduhan PDF...</p>
                </div>
            </div>
        </>
    );
}
