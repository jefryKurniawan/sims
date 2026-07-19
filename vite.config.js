import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
    server: {
        hmr: false,
        port: 5176,
        host: "localhost",
    },
    plugins: [
        tailwindcss(),
        laravel({
            input: ["resources/css/app.css", "resources/js/app.jsx"],
            refresh: true,
        }),
        react({ jsxRuntime: "automatic" }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "resources/js"),
        },
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    },
    build: {
        outDir: "public/build",
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            output: {
                assetFileNames: "assets/[name][extname]",
                entryFileNames: "assets/[name].js",
                chunkFileNames: "assets/[name].js",
            },
        },
    },
});
