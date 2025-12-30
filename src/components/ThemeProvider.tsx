"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
});

const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme: Theme) => {
  if (typeof window === "undefined") return;
  
  const root = document.documentElement;
  const resolved = theme === "system" ? getSystemTheme() : theme;
  
  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      let savedTheme: Theme = "system";
      
      // Try to get theme from Supabase user metadata first
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.user_metadata?.theme) {
          savedTheme = session.user.user_metadata.theme as Theme;
        }
      } catch (e) {
        // Fallback to localStorage
      }
      
      // Fallback to localStorage if no Supabase theme
      if (savedTheme === "system") {
        const localTheme = localStorage.getItem("theme") as Theme | null;
        if (localTheme && ["light", "dark", "system"].includes(localTheme)) {
          savedTheme = localTheme;
        }
      }
      
      setThemeState(savedTheme);
      const resolved = savedTheme === "system" ? getSystemTheme() : savedTheme;
      setResolvedTheme(resolved);
      applyTheme(savedTheme);
      setMounted(true);
    };

    loadTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (theme === "system") {
        const resolved = getSystemTheme();
        setResolvedTheme(resolved);
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const resolved = theme === "system" ? getSystemTheme() : theme;
    setResolvedTheme(resolved);
    applyTheme(theme);
    localStorage.setItem("theme", theme);
    
    // Sync to Supabase user metadata
    const syncToSupabase = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await supabase.auth.updateUser({
            data: { theme }
          });
        }
      } catch (e) {
        // Silently fail if update doesn't work
      }
    };
    
    syncToSupabase();
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
