import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { getSubjects, saveSubjects } from "../indexedDb";
import { useUserPreferences } from "./UserPreferencesContext";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [currentSubjectId, setCurrentSubjectId] = useState(null);
  const [nextSubjectId, setNextSubjectId] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load subjects only once on mount
  useEffect(() => {
    let isMounted = true;

    const loadSubjects = async () => {
      if (isInitialized) return;

      try {
        setIsLoading(true);
        const storedSubjects = await getSubjects();

        if (!isMounted) return;

        if (
          storedSubjects &&
          Array.isArray(storedSubjects) &&
          storedSubjects.length > 0
        ) {
          setSubjects(storedSubjects);
          setCurrentSubjectId(storedSubjects[0].id);
          const maxId = Math.max(...storedSubjects.map((s) => s.id));
          setNextSubjectId(maxId + 1);
        } else {
          // Only create default subject if none exist
          const defaultSubject = [
            { id: 1, name: "Default Subject", notes: [] },
          ];
          setSubjects(defaultSubject);
          setCurrentSubjectId(1);
          setNextSubjectId(2);
          await saveSubjects(defaultSubject);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to load subjects:", error);
        // Fallback to default subject on error
        const defaultSubject = [{ id: 1, name: "Default Subject", notes: [] }];
        setSubjects(defaultSubject);
        setCurrentSubjectId(1);
        setNextSubjectId(2);
        setIsInitialized(true);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadSubjects();

    return () => {
      isMounted = false;
    };
  }, [isInitialized]);

  // Save subjects with debouncing to prevent excessive saves
  useEffect(() => {
    if (!isInitialized || subjects.length === 0) return;

    const timeoutId = setTimeout(async () => {
      try {
        await saveSubjects(subjects);
      } catch (error) {
        console.error("Failed to save subjects:", error);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [subjects, isInitialized]);

  const addSubject = useCallback(
    (name) => {
      const newSubject = {
        id: nextSubjectId,
        name: name.trim(),
        notes: [],
      };

      setSubjects((prev) => [...prev, newSubject]);
      setNextSubjectId((prev) => prev + 1);
      setCurrentSubjectId(newSubject.id);
    },
    [nextSubjectId],
  );

  const deleteSubject = useCallback(
    (id) => {
      setSubjects((prev) => {
        if (prev.length <= 1) return prev;

        const updated = prev.filter((s) => s.id !== id);

        // Update current subject if deleted
        if (currentSubjectId === id) {
          setCurrentSubjectId(updated[0]?.id || null);
        }

        return updated;
      });
    },
    [currentSubjectId],
  );

  const getNextNoteId = useCallback((notes) => {
    return notes.length === 0 ? 1 : Math.max(...notes.map((n) => n.id)) + 1;
  }, []);

  const addNote = useCallback(
    (type) => {
      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === currentSubjectId
            ? {
                ...subject,
                notes: [
                  ...subject.notes,
                  {
                    id: getNextNoteId(subject.notes),
                    type,
                    value: "",
                    language: type === "Code" ? "javascript" : undefined,
                    comment: "",
                    color: "#000000", // Will be updated by component with user preferences
                  },
                ],
              }
            : subject,
        ),
      );
    },
    [currentSubjectId, getNextNoteId],
  );

  const updateNote = useCallback(
    (id, newValue, newLanguage) => {
      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === currentSubjectId
            ? {
                ...subject,
                notes: subject.notes.map((note) =>
                  note.id === id
                    ? {
                        ...note,
                        value: newValue,
                        language: newLanguage || note.language,
                      }
                    : note,
                ),
              }
            : subject,
        ),
      );
    },
    [currentSubjectId],
  );

  const updateComment = useCallback(
    (id, newComment) => {
      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === currentSubjectId
            ? {
                ...subject,
                notes: subject.notes.map((note) =>
                  note.id === id ? { ...note, comment: newComment } : note,
                ),
              }
            : subject,
        ),
      );
    },
    [currentSubjectId],
  );

  const updateColor = useCallback(
    (id, newColor) => {
      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === currentSubjectId
            ? {
                ...subject,
                notes: subject.notes.map((note) =>
                  note.id === id ? { ...note, color: newColor } : note,
                ),
              }
            : subject,
        ),
      );
    },
    [currentSubjectId],
  );

  const deleteNote = useCallback(
    (id) => {
      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === currentSubjectId
            ? {
                ...subject,
                notes: subject.notes.filter((note) => note.id !== id),
              }
            : subject,
        ),
      );
    },
    [currentSubjectId],
  );

  const moveNote = useCallback(
    (id, direction) => {
      setSubjects((prev) =>
        prev.map((subject) => {
          if (subject.id !== currentSubjectId) return subject;

          const notes = [...subject.notes];
          const index = notes.findIndex((note) => note.id === id);
          const newIndex = index + direction;

          if (newIndex < 0 || newIndex >= notes.length) return subject;

          [notes[index], notes[newIndex]] = [notes[newIndex], notes[index]];

          return { ...subject, notes };
        }),
      );
    },
    [currentSubjectId],
  );

  // Import subjects with append functionality
  const importSubjects = useCallback(async (importedData) => {
    try {
      let newSubjects = [];

      // Handle different import formats
      if (Array.isArray(importedData)) {
        newSubjects = importedData;
      } else if (
        importedData.subjects &&
        Array.isArray(importedData.subjects)
      ) {
        newSubjects = importedData.subjects;
      } else {
        throw new Error("Invalid import format");
      }

      // Validate subjects
      const validSubjects = newSubjects.filter(
        (subject) =>
          subject &&
          typeof subject.name === "string" &&
          Array.isArray(subject.notes),
      );

      if (validSubjects.length === 0) {
        throw new Error("No valid subjects found in import data");
      }

      setSubjects((prev) => {
        // Find the highest existing ID
        const maxExistingId =
          prev.length > 0 ? Math.max(...prev.map((s) => s.id)) : 0;

        // Reassign IDs to imported subjects to avoid conflicts
        const adjustedSubjects = validSubjects.map((subject, index) => ({
          ...subject,
          id: maxExistingId + index + 1,
          notes: subject.notes.map((note, noteIndex) => ({
            ...note,
            id: noteIndex + 1,
          })),
        }));

        // Append to existing subjects
        const combined = [...prev, ...adjustedSubjects];

        // Update next ID
        const newMaxId = Math.max(...combined.map((s) => s.id));
        setNextSubjectId(newMaxId + 1);

        return combined;
      });

      return { success: true, count: validSubjects.length };
    } catch (error) {
      console.error("Import failed:", error);
      return { success: false, error: error.message };
    }
  }, []);

  // Memoized current subject and notes
  const currentSubject = useMemo(
    () => subjects.find((subject) => subject.id === currentSubjectId),
    [subjects, currentSubjectId],
  );

  const notes = useMemo(() => currentSubject?.notes || [], [currentSubject]);

  const contextValue = useMemo(
    () => ({
      subjects,
      currentSubjectId,
      setCurrentSubjectId,
      addSubject,
      deleteSubject,
      addNote,
      updateNote,
      updateComment,
      updateColor,
      deleteNote,
      moveNote,
      importSubjects,
      notes,
      currentSubject,
      isLoading,
    }),
    [
      subjects,
      currentSubjectId,
      addSubject,
      deleteSubject,
      addNote,
      updateNote,
      updateComment,
      updateColor,
      deleteNote,
      moveNote,
      importSubjects,
      notes,
      currentSubject,
      isLoading,
    ],
  );

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
