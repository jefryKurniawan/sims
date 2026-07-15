// Zustand store for header scroll state
import { create } from "zustand";

interface HeaderScrollState {
    scrolled: boolean;
    setScrolled: (value: boolean) => void;
}

export const useHeaderScroll = create<HeaderScrollState>((set) => ({
    scrolled: false,
    setScrolled: (value) => set({ scrolled: value }),
}));
