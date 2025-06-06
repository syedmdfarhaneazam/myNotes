import { useState, useEffect, useCallback } from "react";
import { notesStorage } from "../lib/storage.jsx";

export function useNotes() {
  const [subjects, setSubjects] = useState([]);
  const [currentSubjectId, setCurrentSubjectId] = useState(null);
  const [nextSubjectId, setNextSubjectId] = useState(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedSubjects = await notesStorage.getSubjects();
        if (storedSubjects && storedSubjects.length > 0) {
          setSubjects(storedSubjects);
          setCurrentSubjectId(storedSubjects[0].id);
          const maxId = Math.max(...storedSubjects.map((s) => s.id));
          setNextSubjectId(maxId + 1);
        } else {
          const defaultSubject = {
            id: 1,
            name: "My First Subject",
            notes: [],
          };
          setSubjects([defaultSubject]);
          setCurrentSubjectId(1);
          setNextSubjectId(2);
        }
      } catch (error) {
        console.error("Failed to load subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Save to storage whenever subjects change (but not during initial load)
  useEffect(() => {
    if (subjects.length > 0 && !loading) {
      notesStorage.saveSubjects(subjects).catch(console.error);
    }
  }, [subjects, loading]);

  const addSubject = useCallback(
    (name) => {
      const newSubject = {
        id: nextSubjectId,
        name,
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
      if (subjects.length <= 1) return;

      const updated = subjects.filter((s) => s.id !== id);
      setSubjects(updated);

      if (currentSubjectId === id) {
        setCurrentSubjectId(updated[0].id);
      }
    },
    [subjects, currentSubjectId],
  );

  const getNextNoteId = useCallback((notes) => {
    return notes.length === 0 ? 1 : Math.max(...notes.map((n) => n.id)) + 1;
  }, []);

  const addNote = useCallback(
    (type) => {
      if (!currentSubjectId) return;

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
                    color: "#000000",
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
    (id, value, language) => {
      if (!currentSubjectId) return;

      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === currentSubjectId
            ? {
                ...subject,
                notes: subject.notes.map((note) =>
                  note.id === id
                    ? { ...note, value, language: language || note.language }
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
    (id, comment) => {
      if (!currentSubjectId) return;

      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === currentSubjectId
            ? {
                ...subject,
                notes: subject.notes.map((note) =>
                  note.id === id ? { ...note, comment } : note,
                ),
              }
            : subject,
        ),
      );
    },
    [currentSubjectId],
  );

  const updateNoteColor = useCallback(
    (id, color) => {
      if (!currentSubjectId) return;

      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === currentSubjectId
            ? {
                ...subject,
                notes: subject.notes.map((note) =>
                  note.id === id ? { ...note, color } : note,
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
      if (!currentSubjectId) return;

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
      if (!currentSubjectId) return;

      setSubjects((prev) => {
        const currentSubject = prev.find((s) => s.id === currentSubjectId);
        if (!currentSubject) return prev;

        const index = currentSubject.notes.findIndex((note) => note.id === id);
        const newIndex = index + direction;

        if (newIndex < 0 || newIndex >= currentSubject.notes.length)
          return prev;

        const updatedNotes = [...currentSubject.notes];
        [updatedNotes[index], updatedNotes[newIndex]] = [
          updatedNotes[newIndex],
          updatedNotes[index],
        ];

        return prev.map((subject) =>
          subject.id === currentSubjectId
            ? { ...subject, notes: updatedNotes }
            : subject,
        );
      });
    },
    [currentSubjectId],
  );

  return {
    subjects,
    currentSubjectId,
    setCurrentSubjectId,
    addSubject,
    deleteSubject,
    addNote,
    updateNote,
    updateComment,
    deleteNote,
    moveNote,
    updateNoteColor,
    loading,
  };
}
