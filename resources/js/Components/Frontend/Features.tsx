import React from "react";

export default function Features() {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border rounded">
                    <h3 className="font-semibold mb-2">Fitur 1</h3>
                    <p className="text-sm text-gray-600">Deskripsi singkat.</p>
                </div>
                <div className="p-4 border rounded">
                    <h3 className="font-semibold mb-2">Fitur 2</h3>
                    <p className="text-sm text-gray-600">Deskripsi singkat.</p>
                </div>
                <div className="p-4 border rounded">
                    <h3 className="font-semibold mb-2">Fitur 3</h3>
                    <p className="text-sm text-gray-600">Deskripsi singkat.</p>
                </div>
            </div>
        </section>
    );
}
