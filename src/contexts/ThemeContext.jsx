import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  setTheme: () => null,
  toggleTheme: () => null,
  availableThemes: [],
});

const themes = [
  { id: "light", name: "Light", description: "Clean and bright" },
  { id: "dark", name: "Dark", description: "Easy on the eyes" },
  { id: "aqua", name: "Aqua", description: "Ocean depths" },
  { id: "deep-sea", name: "Deep Sea", description: "Mysterious depths" },
  { id: "twilight", name: "Twilight", description: "Purple evening" },
  { id: "forest", name: "Forest", description: "Natural greens" },
  { id: "dark-forest", name: "Dark Forest", description: "Deep woods" },
  { id: "wings", name: "Wings", description: "Soft pinks" },
  { id: "volcano", name: "Volcano", description: "Fiery reds" },
];

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "notes-theme",
}) {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme && themes.find((t) => t.id === storedTheme)) {
      setTheme(storedTheme);
    }
  }, [storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;
    // Remove all theme classes
    themes.forEach((t) => root.classList.remove(t.id));
    // Add current theme class
    root.classList.add(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    availableThemes: themes,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
