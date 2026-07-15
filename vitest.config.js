import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/app.js"],
            refresh: true,
        }),
        react(),
    ],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./tests/setup.js",
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            exclude: [
                "node_modules/",
                "tests/",
                "dist",
                ".idea",
                ".git",
                ".env",
                ".czrc",
                "package.json",
                "vite.config.js",
                "vitest.config.js",
                "manifest.json",
            ],
        },
    },
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
});
