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
    const savedSubjects = localStorage.getItem("mySubjects");
    return savedSubjects
      ? JSON.parse(savedSubjects)
      : [{ id: 1, name: "Default Subject", notes: [] }];
  });

  const [currentSubjectId, setCurrentSubjectId] = useState(() => {
    const savedSubjects = localStorage.getItem("mySubjects");
    return savedSubjects ? JSON.parse(savedSubjects)[0].id : 1;
  });

  const [nextSubjectId, setNextSubjectId] = useState(() => {
    const savedSubjects = localStorage.getItem("mySubjects");
    if (savedSubjects) {
      const parsedSubjects = JSON.parse(savedSubjects);
      const maxId = parsedSubjects.reduce(
        (max, subject) => (subject.id > max ? subject.id : max),
        0,
      );
      return maxId + 1;
    }
    return 2;
  });

  useEffect(() => {
    if (subjects.length > 0 || localStorage.getItem("mySubjects")) {
      localStorage.setItem("mySubjects", JSON.stringify(subjects));
    }
  }, [subjects]);

  const addSubject = (name) => {
    const newSubject = {
      id: nextSubjectId,
      name,
      notes: [],
    };
    const updatedSubjects = [...subjects, newSubject];
    setSubjects(updatedSubjects);
    setNextSubjectId(nextSubjectId + 1);
    setCurrentSubjectId(newSubject.id);
    localStorage.setItem("mySubjects", JSON.stringify(updatedSubjects));
  };

  const deleteSubject = (id) => {
    if (subjects.length <= 1) {
      alert("Cannot delete the last subject.");
      return;
    }
    const updatedSubjects = subjects.filter((subject) => subject.id !== id);
    setSubjects(updatedSubjects);
    localStorage.setItem("mySubjects", JSON.stringify(updatedSubjects));
    if (currentSubjectId === id) {
      setCurrentSubjectId(updatedSubjects[0].id);
    }
  };

  const addNote = (type) => {
    const updatedSubjects = subjects.map((subject) =>
      subject.id === currentSubjectId
        ? {
            ...subject,
            notes: [
              ...subject.notes,
              {
                id: getNextNoteId(subject.notes),
                type,
                value: type === "Code" ? "" : "",
                language: type === "Code" ? "javascript" : undefined,
                comment: "",
              },
            ],
          }
        : subject,
    );
    setSubjects(updatedSubjects);
    localStorage.setItem("mySubjects", JSON.stringify(updatedSubjects));
  };

  const getNextNoteId = (notes) => {
    const maxId = notes.reduce(
      (max, note) => (note.id > max ? note.id : max),
      0,
    );
    return maxId + 1;
  };

  const updateNote = (id, newValue, newLanguage) => {
    const updatedSubjects = subjects.map((subject) =>
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
    setSubjects(updatedSubjects);
    localStorage.setItem("mySubjects", JSON.stringify(updatedSubjects));
  };

  const updateComment = (id, newComment) => {
    const updatedSubjects = subjects.map((subject) =>
      subject.id === currentSubjectId
        ? {
            ...subject,
            notes: subject.notes.map((note) =>
              note.id === id ? { ...note, comment: newComment } : note,
            ),
          }
        : subject,
    );
    setSubjects(updatedSubjects);
    localStorage.setItem("mySubjects", JSON.stringify(updatedSubjects));
  };

  const deleteNote = (id) => {
    const updatedSubjects = subjects.map((subject) =>
      subject.id === currentSubjectId
        ? {
            ...subject,
            notes: subject.notes.filter((note) => note.id !== id),
          }
        : subject,
    );
    setSubjects(updatedSubjects);
    localStorage.setItem("mySubjects", JSON.stringify(updatedSubjects));
  };

  const moveNoteUp = (id) => {
    const currentSubject = subjects.find(
      (subject) => subject.id === currentSubjectId,
    );
    const index = currentSubject.notes.findIndex((note) => note.id === id);
    if (index > 0) {
      const updatedNotes = [...currentSubject.notes];
      [updatedNotes[index - 1], updatedNotes[index]] = [
        updatedNotes[index],
        updatedNotes[index - 1],
      ];
      const updatedSubjects = subjects.map((subject) =>
        subject.id === currentSubjectId
          ? { ...subject, notes: updatedNotes }
          : subject,
      );
      setSubjects(updatedSubjects);
      localStorage.setItem("mySubjects", JSON.stringify(updatedSubjects));
    }
  };

  const moveNoteDown = (id) => {
    const currentSubject = subjects.find(
      (subject) => subject.id === currentSubjectId,
    );
    const index = currentSubject.notes.findIndex((note) => note.id === id);
    if (index < currentSubject.notes.length - 1) {
      const updatedNotes = [...currentSubject.notes];
      [updatedNotes[index], updatedNotes[index + 1]] = [
        updatedNotes[index + 1],
        updatedNotes[index],
      ];
      const updatedSubjects = subjects.map((subject) =>
        subject.id === currentSubjectId
          ? { ...subject, notes: updatedNotes }
          : subject,
      );
      setSubjects(updatedSubjects);
      localStorage.setItem("mySubjects", JSON.stringify(updatedSubjects));
    }
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
          <button className="add-heading" onClick={() => addNote("Heading")}>
            + Heading
          </button>
          <button
            className="add-subheading"
            onClick={() => addNote("SubHeading")}
          >
            + SubHeading
          </button>
          <button
            className="add-subsubheading"
            onClick={() => addNote("SubSubHeading")}
          >
            + SubSubHeading
          </button>
          <button className="add-content" onClick={() => addNote("Content")}>
            + Content
          </button>
          <button className="add-code" onClick={() => addNote("Code")}>
            + Code
          </button>
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
              switch (note.type) {
                case "Heading":
                  return (
                    <Heading
                      key={note.id}
                      id={note.id}
                      value={note.value}
                      comment={note.comment}
                      onChange={updateNote}
                      onCommentChange={updateComment}
                      onDelete={deleteNote}
                      onMoveUp={moveNoteUp}
                      onMoveDown={moveNoteDown}
                    />
                  );
                case "SubHeading":
                  return (
                    <SubHeading
                      key={note.id}
                      id={note.id}
                      value={note.value}
                      comment={note.comment}
                      onChange={updateNote}
                      onCommentChange={updateComment}
                      onDelete={deleteNote}
                      onMoveUp={moveNoteUp}
                      onMoveDown={moveNoteDown}
                    />
                  );
                case "SubSubHeading":
                  return (
                    <SubSubHeading
                      key={note.id}
                      id={note.id}
                      value={note.value}
                      comment={note.comment}
                      onChange={updateNote}
                      onCommentChange={updateComment}
                      onDelete={deleteNote}
                      onMoveUp={moveNoteUp}
                      onMoveDown={moveNoteDown}
                    />
                  );
                case "Content":
                  return (
                    <Content
                      key={note.id}
                      id={note.id}
                      value={note.value}
                      comment={note.comment}
                      onChange={updateNote}
                      onCommentChange={updateComment}
                      onDelete={deleteNote}
                      onMoveUp={moveNoteUp}
                      onMoveDown={moveNoteDown}
                    />
                  );
                case "Code":
                  return (
                    <Code
                      key={note.id}
                      id={note.id}
                      value={note.value}
                      language={note.language}
                      comment={note.comment}
                      onChange={updateNote}
                      onCommentChange={updateComment}
                      onDelete={deleteNote}
                      onMoveUp={moveNoteUp}
                      onMoveDown={moveNoteDown}
                    />
                  );
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
