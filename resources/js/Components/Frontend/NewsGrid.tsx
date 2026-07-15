import React from "react";

interface Props {
    berita: Array<{
        id: number;
        title: string;
        slug: string;
        created_at: string;
    }>;
    event: Array<any>;
}

export default function NewsGrid({ berita, event }: Props) {
    return (
        <section className="py-8">
            <h2 className="text-2xl font-bold mb-4">Berita &amp; Event</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {berita.slice(0, 3).map((b) => (
                    <div key={b.id} className="border p-4 rounded">
                        <h3 className="font-semibold">{b.title}</h3>
                        <p className="text-xs text-gray-500">{b.created_at}</p>
                    </div>
                ))}
                {event.slice(0, 3).map((e) => (
                    <div key={e.id} className="border p-4 rounded bg-gray-50">
                        <h3 className="font-semibold">{e.title}</h3>
                        <p className="text-xs text-gray-500">{e.acara}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
