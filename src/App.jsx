import { useState, useEffect } from "react";
import "./App.css";
import Heading from "./components/Heading";
import SubHeading from "./components/SubHeading";
import SubSubHeading from "./components/SubSubHeading";
import Content from "./components/Content";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("myNotes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [nextId, setNextId] = useState(() => {
    const savedNotes = localStorage.getItem("myNotes");
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      const maxId = parsedNotes.reduce(
        (max, note) => (note.id > max ? note.id : max),
        0,
      );
      return maxId + 1;
    }
    return 1;
  });

  useEffect(() => {
    if (notes.length > 0 || localStorage.getItem("myNotes")) {
      localStorage.setItem("myNotes", JSON.stringify(notes));
    }
  }, [notes]);

  const addNote = (type) => {
    const newNote = {
      id: nextId,
      type: type,
      value: type === "Heading" ? "" : "",
      comment: "",
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setNextId(nextId + 1);
    localStorage.setItem("myNotes", JSON.stringify(updatedNotes));
  };

  const updateNote = (id, newValue) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, value: newValue } : note,
    );
    setNotes(updatedNotes);
    localStorage.setItem("myNotes", JSON.stringify(updatedNotes));
  };

  const updateComment = (id, newComment) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, comment: newComment } : note,
    );
    setNotes(updatedNotes);
    localStorage.setItem("myNotes", JSON.stringify(updatedNotes));
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("myNotes", JSON.stringify(updatedNotes));
  };

  const moveNoteUp = (id) => {
    const index = notes.findIndex((note) => note.id === id);
    if (index > 0) {
      const updatedNotes = [...notes];
      [updatedNotes[index - 1], updatedNotes[index]] = [
        updatedNotes[index],
        updatedNotes[index - 1],
      ];
      setNotes(updatedNotes);
      localStorage.setItem("myNotes", JSON.stringify(updatedNotes));
    }
  };

  const moveNoteDown = (id) => {
    const index = notes.findIndex((note) => note.id === id);
    if (index < notes.length - 1) {
      const updatedNotes = [...notes];
      [updatedNotes[index], updatedNotes[index + 1]] = [
        updatedNotes[index + 1],
        updatedNotes[index],
      ];
      setNotes(updatedNotes);
      localStorage.setItem("myNotes", JSON.stringify(updatedNotes));
    }
  };

  return (
    <div className="app-container">
      <header className="fixed-toolbar">
        <h1>My Notes</h1>
        <div className="toolbar">
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
        </div>
      </header>

      <div className="notes-container">
        <div className="notes-inner">
          {notes.length === 0 ? (
            <div className="empty-state">
              <p>No notes yet. Start by adding a heading or content above!</p>
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
