/// <reference types="vite-client" />
import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ThemeProvider } from "./context/ThemeProvider";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Sekolahku";

createInertiaApp({
    title: (title) => `${title ? `${title} - ` : ""}${appName}`,
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./Pages/${name.replace(/\//g, "/")}.tsx`,
            import.meta.glob("./Pages/**/*.tsx"),
        );

        // Skip layout wrapping for Frontend pages
        if (name.startsWith("Frontend/") || name.startsWith("Spmb/")) {
            return page;
        }

        const layout =
            page.default.layout || (await import("./Layout/AppLayout")).default;

        const PageComponent = page.default;
        return {
            ...page,
            default: (props) =>
                React.createElement(
                    layout,
                    null,
                    React.createElement(PageComponent, props),
                ),
        };
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <ThemeProvider>
                <App {...props} />
            </ThemeProvider>,
        );
    },
    progress: {
        color: "#4B5563",
    },
});
