import { createContext, useState, useEffect, useContext } from "react";
import { getSubjects, saveSubjects } from "../indexedDb";

// Create the context
export const NotesContext = createContext();

// Create a provider component
export const NotesProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [currentSubjectId, setCurrentSubjectId] = useState(null);
  const [nextSubjectId, setNextSubjectId] = useState(2);

  useEffect(() => {
    const loadSubjects = async () => {
      const storedSubjects = await getSubjects();
      if (storedSubjects && storedSubjects.length > 0) {
        setSubjects(storedSubjects);
        setCurrentSubjectId(storedSubjects[0].id);
        const maxId = Math.max(...storedSubjects.map((s) => s.id));
        setNextSubjectId(maxId + 1);
      } else {
        const defaultSubject = [{ id: 1, name: "Default Subject", notes: [] }];
        setSubjects(defaultSubject);
        setCurrentSubjectId(1);
        setNextSubjectId(2);
      }
    };
    loadSubjects();
  }, []);

  useEffect(() => {
    if (subjects.length > 0) {
      saveSubjects(subjects);
    }
  }, [subjects]);

  const addSubject = (name) => {
    const newSubject = { id: nextSubjectId, name, notes: [] };
    const updated = [...subjects, newSubject];
    setSubjects(updated);
    setNextSubjectId(nextSubjectId + 1);
    setCurrentSubjectId(newSubject.id);
  };

  const deleteSubject = (id) => {
    if (subjects.length <= 1) {
      alert("Cannot delete the last subject.");
      return;
    }
    const updated = subjects.filter((s) => s.id !== id);
    setSubjects(updated);
    if (currentSubjectId === id) {
      setCurrentSubjectId(updated[0].id);
    }
  };

  const getNextNoteId = (notes) => {
    return notes.length === 0 ? 1 : Math.max(...notes.map((n) => n.id)) + 1;
  };

  const addNote = (type) => {
    const updated = subjects.map((subject) =>
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
                color: "#000000",
              },
            ],
          }
        : subject,
    );
    setSubjects(updated);
  };

  const updateNote = (id, newValue, newLanguage) => {
    const updated = subjects.map((subject) =>
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
    );
    setSubjects(updated);
  };

  const updateComment = (id, newComment) => {
    const updated = subjects.map((subject) =>
      subject.id === currentSubjectId
        ? {
            ...subject,
            notes: subject.notes.map((note) =>
              note.id === id ? { ...note, comment: newComment } : note,
            ),
          }
        : subject,
    );
    setSubjects(updated);
  };

  const updateColor = (id, newColor) => {
    const updated = subjects.map((subject) =>
      subject.id === currentSubjectId
        ? {
            ...subject,
            notes: subject.notes.map((note) =>
              note.id === id ? { ...note, color: newColor } : note,
            ),
          }
        : subject,
    );
    setSubjects(updated);
  };

  const deleteNote = (id) => {
    const updated = subjects.map((subject) =>
      subject.id === currentSubjectId
        ? { ...subject, notes: subject.notes.filter((note) => note.id !== id) }
        : subject,
    );
    setSubjects(updated);
  };

  const moveNote = (id, direction) => {
    const current = subjects.find((subject) => subject.id === currentSubjectId);
    const index = current.notes.findIndex((note) => note.id === id);
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= current.notes.length) return;

    const updatedNotes = [...current.notes];
    [updatedNotes[index], updatedNotes[newIndex]] = [
      updatedNotes[newIndex],
      updatedNotes[index],
    ];

    const updated = subjects.map((subject) =>
      subject.id === currentSubjectId
        ? { ...subject, notes: updatedNotes }
        : subject,
    );
    setSubjects(updated);
  };

  const currentSubject = subjects.find(
    (subject) => subject.id === currentSubjectId,
  );
  const notes = currentSubject ? currentSubject.notes : [];

  return (
    <NotesContext.Provider
      value={{
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
        notes,
        currentSubject,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

// Custom hook to use the notes context
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
