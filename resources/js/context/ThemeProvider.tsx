import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { Inertia } from "@inertiajs/inertia";

type ThemeContextType = {
    tema: string;
    setTema: (t: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
    tema: "navy",
    setTema: () => {},
});

function getInitialTema(): string {
    try {
        const el = document.getElementById("app");
        if (!el) return "navy";
        const data = JSON.parse(el.dataset.page || "{}");
        return data.props?.setting?.tema || "navy";
    } catch {
        return "navy";
    }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [tema, setTemaState] = useState(getInitialTema);

    useEffect(() => {
        const cleanupNav = Inertia.on("navigate", (event: any) => {
            const page = event.detail?.page;
            if (page?.props?.setting?.tema) {
                setTemaState(page.props.setting.tema);
            }
        });

        const cleanupSuccess = Inertia.on("success", (event: any) => {
            const page = event.detail?.page;
            if (page?.props?.setting?.tema) {
                setTemaState(page.props.setting.tema);
            }
        });

        return () => {
            cleanupNav();
            cleanupSuccess();
        };
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-tema", tema);
    }, [tema]);

    const setTema = (newTema: string) => {
        setTemaState(newTema);
    };

    return (
        <ThemeContext.Provider value={{ tema, setTema }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
}
