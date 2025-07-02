import React, { useMemo, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNotes } from "../context/NotesContext";
import { useUserPreferences } from "../context/UserPreferencesContext";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import SubSubHeading from "../components/SubSubHeading";
import Content from "../components/Content";
import Code from "../components/Code";
import AddImage from "../components/AddImage";
import Loader from "../components/Loader";
import "../style/NotesPage.css";

const NoteComponent = React.memo(
  ({
    note,
    updateNote,
    updateColor,
    deleteNote,
    moveNote,
    getDefaultColorForNoteType,
  }) => {
    useEffect(() => {
      if (!note.color || note.color === "#000000") {
        const defaultColor = getDefaultColorForNoteType(note.type);
        if (defaultColor !== note.color) {
          updateColor(note.id, defaultColor);
        }
      }
    }, [
      note.id,
      note.color,
      note.type,
      updateColor,
      getDefaultColorForNoteType,
    ]);

    const props = {
      id: note.id,
      value: note.value,
      color: note.color || getDefaultColorForNoteType(note.type),
      onChange: updateNote,
      onColorChange: updateColor,
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
      case "Image":
        return <AddImage {...props} />;
      default:
        return null;
    }
  },
);

NoteComponent.displayName = "NoteComponent";

function NotesPage() {
  const { theme } = useTheme();
  const { notes, updateNote, updateColor, deleteNote, moveNote, isLoading } =
    useNotes();
  const { getDefaultColorForNoteType } = useUserPreferences();

  const renderedNotes = useMemo(
    () =>
      notes.map((note) => (
        <NoteComponent
          key={note.id}
          note={note}
          updateNote={updateNote}
          updateColor={updateColor}
          deleteNote={deleteNote}
          moveNote={moveNote}
          getDefaultColorForNoteType={getDefaultColorForNoteType}
        />
      )),
    [
      notes,
      updateNote,
      updateColor,
      deleteNote,
      moveNote,
      getDefaultColorForNoteType,
    ],
  );

  if (isLoading) {
    return (
      <div className="notes-page">
        <div className="notes-container">
          <Loader message="Loading your notes..." />
        </div>
      </div>
    );
  }

  return (
    <div className="notes-page">
      <div className="notes-container">
        <div className="notes-inner">
          {notes.length === 0 ? (
            <div
              className="empty-state"
              style={{ color: theme.colors.textSecondary }}
            >
              <p>
                No notes yet. Start by adding a heading, content, or code from
                the toolbar above!
              </p>
            </div>
          ) : (
            renderedNotes
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(NotesPage);
