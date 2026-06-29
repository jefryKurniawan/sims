import React from 'react';
import { Link } from '@inertiajs/inertia-react';

interface Props {
  data?: {
    links: Array<{ url: string | null; label: string; active: boolean }>;
  };
  paginator?: {
    links: Array<{ url: string | null; label: string; active: boolean }>;
  };
}

export function Pagination({ data, paginator }: Props) {
  const links = data?.links ?? paginator?.links ?? [];
  if (!links.length) return null;
  return (
    <nav className="flex justify-center space-x-2 mt-4">
      {links.map((link, i) => (
        <Link
          key={i}
          href={link.url ?? '#'}
          preserveScroll
          className={`px-3 py-1 rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-200'} `}
        >
          {link.label.replace(/&laquo;|&raquo;/g, '')}
        </Link>
      ))}
    </nav>
  );
}