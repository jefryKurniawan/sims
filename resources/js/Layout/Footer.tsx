/// <reference types="vite/client" />
export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-800 border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Sekolahku. All rights reserved.
                </p>
            </div>
        </footer>
    );
}