import { createContext, useState, useEffect, useContext, useMemo } from "react";

const themeOptions = {
  aqua: {
    name: "Aqua",
    colors: {
      primary: "#14b8a6",
      secondary: "#2dd4bf",
      background: "#ecfeff",
      surface: "#f8fafc",
      text: "#1e293b",
      textSecondary: "#64748b",
      accent: "#22d3ee",
      border: "#d1d5db",
      hover: "#e0f2fe",
    },
  },
  deepSea: {
    name: "Deep Sea",
    colors: {
      primary: "#2563eb",
      secondary: "#3b82f6",
      background: "#0f172a",
      surface: "#1e293b",
      text: "#f8fafc",
      textSecondary: "#94a3b8",
      accent: "#60a5fa",
      border: "#475569",
      hover: "#334155",
    },
  },
  sunshine: {
    name: "Sunshine",
    colors: {
      primary: "#f59e0b",
      secondary: "#facc15",
      background: "#fefce8",
      surface: "#ffffff",
      text: "#78350f",
      textSecondary: "#a16207",
      accent: "#fb923c",
      border: "#fed7aa",
      hover: "#fef3c7",
    },
  },
  sunset: {
    name: "Sunset",
    colors: {
      primary: "#ef4444",
      secondary: "#fb923c",
      background: "#1f2937",
      surface: "#374151",
      text: "#f9fafb",
      textSecondary: "#d1d5db",
      accent: "#f87171",
      border: "#6b7280",
      hover: "#4b5563",
    },
  },
  twilight: {
    name: "Twilight",
    colors: {
      primary: "#8b5cf6",
      secondary: "#a78bfa",
      background: "#1e1b4b",
      surface: "#2e1065",
      text: "#f1f5f9",
      textSecondary: "#c4b5fd",
      accent: "#c084fc",
      border: "#4c1d95",
      hover: "#6d28d9",
    },
  },
  light: {
    name: "Light",
    colors: {
      primary: "#4b5563",
      secondary: "#6b7280",
      background: "#f9fafb",
      surface: "#ffffff",
      text: "#111827",
      textSecondary: "#6b7280",
      accent: "#3b82f6",
      border: "#e5e7eb",
      hover: "#f3f4f6",
    },
  },
  dark: {
    name: "Dark",
    colors: {
      primary: "#6b7280",
      secondary: "#9ca3af",
      background: "#111827",
      surface: "#1f2937",
      text: "#f9fafb",
      textSecondary: "#d1d5db",
      accent: "#60a5fa",
      border: "#374151",
      hover: "#4b5563",
    },
  },
  nature: {
    name: "Nature",
    colors: {
      primary: "#16a34a",
      secondary: "#22c55e",
      background: "#f0fdf4",
      surface: "#ffffff",
      text: "#14532d",
      textSecondary: "#15803d",
      accent: "#4ade80",
      border: "#bbf7d0",
      hover: "#dcfce7",
    },
  },
  forest: {
    name: "Forest",
    colors: {
      primary: "#15803d",
      secondary: "#16a34a",
      background: "#0f172a",
      surface: "#1a2e1a",
      text: "#f0fdf4",
      textSecondary: "#86efac",
      accent: "#4ade80",
      border: "#166534",
      hover: "#14532d",
    },
  },
  bubbleGum: {
    name: "Bubble Gum",
    colors: {
      primary: "#ec4899",
      secondary: "#f472b6",
      background: "#fdf2f8",
      surface: "#ffffff",
      text: "#831843",
      textSecondary: "#be185d",
      accent: "#db2777",
      border: "#f9a8d4",
      hover: "#fce7f3",
    },
  },
  cyberpunk: {
    name: "Cyberpunk",
    colors: {
      primary: "#a855f7",
      secondary: "#c084fc",
      background: "#0a0a0a",
      surface: "#1a0a1a",
      text: "#00ff88",
      textSecondary: "#ff0080",
      accent: "#00ffff",
      border: "#7c3aed",
      hover: "#581c87",
    },
  },
  goldenDark: {
    name: "Golden Dark",
    colors: {
      primary: "#d97706",
      secondary: "#f59e0b",
      background: "#1c1917",
      surface: "#292524",
      text: "#fef3c7",
      textSecondary: "#fcd34d",
      accent: "#f59e0b",
      border: "#78716c",
      hover: "#44403c",
    },
  },
};

// Create the context
export const ThemeContext = createContext();

// Initialize theme from localStorage synchronously
const getInitialTheme = () => {
  try {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme && themeOptions[savedTheme] ? savedTheme : "light";
  } catch (error) {
    console.error("Error accessing localStorage for initial theme:", error);
    return "light";
  }
};

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(getInitialTheme);
  const [userName, setUserName] = useState("My Notes");

  // Memoize themeOptions to prevent unnecessary re-renders
  const memoizedThemeOptions = useMemo(() => themeOptions, []);

  // Load username from localStorage on mount
  useEffect(() => {
    try {
      const savedUserName = localStorage.getItem("userName");
      if (savedUserName) {
        console.log("Loaded userName from localStorage:", savedUserName);
        setUserName(savedUserName);
      }
    } catch (error) {
      console.error("Error accessing localStorage for userName:", error);
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    try {
      console.log("Saving theme to localStorage:", currentTheme);
      localStorage.setItem("theme", currentTheme);
    } catch (error) {
      console.error("Error saving theme to localStorage:", error);
    }
  }, [currentTheme]);

  // Save username to localStorage when it changes
  useEffect(() => {
    try {
      console.log("Saving userName to localStorage:", userName);
      localStorage.setItem("userName", userName);
    } catch (error) {
      console.error("Error saving userName to localStorage:", error);
    }
  }, [userName]);

  // Function to update the theme
  const changeTheme = (newTheme) => {
    if (memoizedThemeOptions[newTheme]) {
      console.log("Changing theme to:", newTheme);
      setCurrentTheme(newTheme);
    } else {
      console.warn(`Theme "${newTheme}" not found, reverting to light`);
      setCurrentTheme("light");
    }
  };

  // Function to update the username
  const changeUserName = (newName) => {
    console.log("Changing userName to:", newName);
    setUserName(newName || "My Notes");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: memoizedThemeOptions[currentTheme],
        currentTheme,
        changeTheme,
        themeOptions: memoizedThemeOptions,
        userName,
        changeUserName,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
