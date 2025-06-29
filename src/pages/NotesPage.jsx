import { useTheme } from "../context/ThemeContext";
import { useNotes } from "../context/NotesContext";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import SubSubHeading from "../components/SubSubHeading";
import Content from "../components/Content";
import Code from "../components/Code";
import AddImage from "../components/AddImage";
import "../style/NotesPage.css";

function NotesPage() {
  const { theme } = useTheme();
  const { notes, updateNote, updateColor, deleteNote, moveNote } = useNotes();

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
            notes.map((note) => {
              const props = {
                key: note.id,
                id: note.id,
                value: note.value,
                color: note.color || "#000000",
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
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default NotesPage;
