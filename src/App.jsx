import { useState, useEffect } from "react";
import "./App.css";
import Heading from "./components/Heading";
import SubHeading from "./components/SubHeading";
import SubSubHeading from "./components/SubSubHeading";
import Content from "./components/Content";
import Code from "./components/Code";
import Subject from "./components/Subject";

function App() {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem("mySubjects");
    return saved
      ? JSON.parse(saved)
      : [{ id: 1, name: "Default Subject", notes: [] }];
  });

  const [currentSubjectId, setCurrentSubjectId] = useState(() => {
    const saved = localStorage.getItem("mySubjects");
    return saved ? JSON.parse(saved)[0].id : 1;
  });

  const [nextSubjectId, setNextSubjectId] = useState(() => {
    const saved = localStorage.getItem("mySubjects");
    if (saved) {
      const parsed = JSON.parse(saved);
      const maxId = Math.max(...parsed.map((s) => s.id), 0);
      return maxId + 1;
    }
    return 2;
  });

  useEffect(() => {
    localStorage.setItem("mySubjects", JSON.stringify(subjects));
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
    <div className="app-container">
      <header className="fixed-toolbar">
        <h1>My Notes</h1>
        <div className="toolbar">
          <Subject
            subjects={subjects}
            currentSubjectId={currentSubjectId}
            setCurrentSubjectId={setCurrentSubjectId}
            addSubject={addSubject}
            deleteSubject={deleteSubject}
          />
          <button onClick={() => addNote("Heading")}>+ Heading</button>
          <button onClick={() => addNote("SubHeading")}>+ SubHeading</button>
          <button onClick={() => addNote("SubSubHeading")}>
            + SubSubHeading
          </button>
          <button onClick={() => addNote("Content")}>+ Content</button>
          <button onClick={() => addNote("Code")}>+ Code</button>
        </div>
      </header>

      <div className="notes-container">
        <div className="notes-inner">
          {notes.length === 0 ? (
            <div className="empty-state">
              <p>
                No notes yet. Start by adding a heading, content, or code above!
              </p>
            </div>
          ) : (
            notes.map((note) => {
              const props = {
                key: note.id,
                id: note.id,
                value: note.value,
                comment: note.comment,
                onChange: updateNote,
                onCommentChange: updateComment,
                onDelete: deleteNote,
                onMoveUp: () => moveNote(note.id, -1),
                onMoveDown: () => moveNote(note.id, 1),
              };

              switch (note.type) {
                case "Heading":
                  return <Heading {...props} />;
                case "SubHeading":
                  return <SubHeading {...props} />;
                case "SubSubHeading":
                  return <SubSubHeading {...props} />;
                case "Content":
                  return <Content {...props} />;
                case "Code":
                  return <Code {...props} language={note.language} />;
                default:
                  return null;
              }
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
