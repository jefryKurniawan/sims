/// <reference types="vite/client" />
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import AppLayout from './Layout/AppLayout';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('[Inertia Error]', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-2">Terjadi Kesalahan</h1>
            <p className="text-gray-600 mb-4">Muat ulang halaman atau hubungi administrator.</p>
            <pre className="text-left bg-red-50 border border-red-200 rounded p-4 text-xs text-red-700 max-w-xl overflow-auto">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#002244]"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

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

        // Skip layout wrapping for public (self-contained with own Header/Footer) pages
        if (name.startsWith('Frontend/') || name.startsWith('Spmb/') || name.startsWith('Auth/')) {
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
        createRoot(el).render(
            <ErrorBoundary>
                <App {...props} />
            </ErrorBoundary>
        );
    },
    onError(error) {
        console.error('[Inertia onError]', error);
    },
    progress: {
        color: '#4B5563',
    },
});
