// tailwind.config.cjs – custom Tailwind configuration for Sekolahku
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./resources/**/*.jsx",
        "./resources/**/*.tsx",
        "./resources/**/*.js",
        "./resources/**/*.ts",
        "./resources/**/*.php",
        "./vendor/**/*.php",
    ],
    theme: {
        extend: {
            colors: {
                // Sekolahku brand colors: merah & kuning
                primary: {
                    DEFAULT: "#E31E24", // merah utama
                    light: "#FF6B70", // merah muda (hover/focus)
                    dark: "#A11618", // merah tua (gradient/shadow)
                },
                secondary: {
                    DEFAULT: "#FFD700", // kuning utama
                    light: "#FFE666", // kuning muda
                    dark: "#C9A800", // kuning tua
                },
                "on-surface": "#1A1A1A",
                "surface-container-low": "#FFFDE7",
                "surface-container-high": "#FFF9C4",
                surface: "#FFFFFF",
                background: "#FFFFFF",
                "on-primary": "#1A1A1A",
                "on-secondary": "#FFFFFF",
                "on-primary-container": "#1A1A1A",
                "primary-container": "#FFD700",
                "secondary-container": "#FFEBEE",
                // any additional colors you may need
            },
            spacing: {
                gutter: "24px",
                "container-max": "1280px",
                "margin-desktop": "64px",
                "margin-mobile": "20px",
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                full: "9999px",
            },
            fontFamily: {
                "headline-lg-mobile": ["Manrope"],
                "body-lg": ["Work Sans"],
                "label-md": ["Hanken Grotesk"],
                "body-md": ["Work Sans"],
                "display-lg": ["Manrope"],
                "headline-lg": ["Manrope"],
                "headline-md": ["Manrope"],
            },
            fontSize: {
                "headline-lg-mobile": [
                    "28px",
                    { lineHeight: "1.3", fontWeight: "700" },
                ],
                "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
                "label-md": [
                    "14px",
                    {
                        lineHeight: "1",
                        letterSpacing: "0.05em",
                        fontWeight: "600",
                    },
                ],
                "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
                "display-lg": [
                    "48px",
                    {
                        lineHeight: "1.2",
                        letterSpacing: "-0.02em",
                        fontWeight: "800",
                    },
                ],
                "headline-lg": [
                    "32px",
                    { lineHeight: "1.3", fontWeight: "700" },
                ],
                "headline-md": [
                    "24px",
                    { lineHeight: "1.4", fontWeight: "600" },
                ],
            },
        },
    },
    plugins: [],
};
