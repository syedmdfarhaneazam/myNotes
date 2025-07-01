import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";

const UserPreferencesContext = createContext();

const defaultNoteColors = {
  heading: "#1f2937",
  subheading: "#374151",
  subsubheading: "#4b5563",
  content: "#6b7280",
};

export const UserPreferencesProvider = ({ children }) => {
  const [noteColors, setNoteColors] = useState(defaultNoteColors);
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const savedColors = localStorage.getItem("noteColors");
      if (savedColors) {
        setNoteColors(JSON.parse(savedColors));
      }
    } catch (error) {
      console.error("Error loading note colors:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("noteColors", JSON.stringify(noteColors));
      } catch (error) {
        console.error("Error saving note colors:", error);
      }
    }
  }, [noteColors, isLoading]);

  const updateNoteColor = useCallback((noteType, color) => {
    setNoteColors((prev) => ({
      ...prev,
      [noteType]: color,
    }));
  }, []);

  const resetNoteColors = useCallback(() => {
    setNoteColors(defaultNoteColors);
  }, []);

  const getDefaultColorForNoteType = useCallback(
    (noteType) => {
      const typeMap = {
        Heading: "heading",
        SubHeading: "subheading",
        SubSubHeading: "subsubheading",
        Content: "content",
      };
      return noteColors[typeMap[noteType]] || noteColors.content;
    },
    [noteColors],
  );

  const contextValue = useMemo(
    () => ({
      noteColors,
      updateNoteColor,
      resetNoteColors,
      getDefaultColorForNoteType,
      isLoading,
    }),
    [
      noteColors,
      updateNoteColor,
      resetNoteColors,
      getDefaultColorForNoteType,
      isLoading,
    ],
  );

  return (
    <UserPreferencesContext.Provider value={contextValue}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error(
      "useUserPreferences must be used within a UserPreferencesProvider",
    );
  }
  return context;
};
