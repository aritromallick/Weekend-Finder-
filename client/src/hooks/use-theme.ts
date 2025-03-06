import { create } from "zustand";

type Theme = "dark" | "light" | "system";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useTheme = create<ThemeStore>((set) => ({
  theme: 
    (typeof window !== "undefined" && 
    window.localStorage.getItem("theme") as Theme) || 
    "system",
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", theme);
      
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        document.documentElement.classList.toggle("dark", systemTheme === "dark");
      } else {
        document.documentElement.classList.toggle("dark", theme === "dark");
      }
    }
    set({ theme });
  },
}));
