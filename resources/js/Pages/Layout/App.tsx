import React from "react";
import { Link } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/inertia-react";
import { Head } from "@/Layout/Head";
import Header from "@/Layout/Header";
import Sidebar from "@/Layout/Sidebar";
import Footer from "@/Layout/Footer";

export default function App({ children }) {
    return (
        <html lang="en">
            <Head />
            <body className="flex h-screen bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <Header />
                        <main className="flex-1 overflow-y-auto p-6">
                            <Flash />
                            {children}
                        </main>
                        <Footer />
                    </div>
                </div>
            </body>
        </html>
    );
}

function Flash() {
    const { page } = usePage();

    if (!Array.isArray(page.props.flank?.success) && !page.props.flank?.error) {
        return null;
    }

    return (
        <>
            {page.props.flank?.success && (
                <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg">
                    {page.props.flank.success}
                </div>
            )}
            {page.props.flank?.error && (
                <div className="mb-4 p-4 bg-destructive/10 dark:bg-destructive/20 dark:text-destructive rounded-lg">
                    {page.props.flank.error}
                </div>
            )}
        </>
    );
}
