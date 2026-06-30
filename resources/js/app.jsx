/// <reference types="vite-client" />
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import AppLayout from './Layout/AppLayout';

const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
if (initialDark) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Sekolahku';

createInertiaApp({
    title: (title) => `${title ? `${title} - ` : ''}${appName}`,
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx')
        );

        // Skip layout wrapping for Frontend pages
        if (name.startsWith('Frontend/')) {
            return page;
        }

        // Get the layout from the page, fallback to AppLayout
        const layout = page.default.layout || AppLayout;

        // Return a new component instead of modifying page.default
        const PageComponent = page.default;
        return {
            ...page,
            default: (props) => React.createElement(layout, null, React.createElement(PageComponent, props))
        };
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});