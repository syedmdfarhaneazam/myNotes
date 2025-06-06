import { useNotes } from "../hooks/useNotes.jsx";
import NotesContainer from "../components/notes/NotesContainer.jsx";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";

export default function NotesPage() {
  const {
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
  } = useNotes();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 4rem)",
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className="container mobile-responsive tablet-responsive desktop-responsive"
      style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
    >
      <NotesContainer
        subjects={subjects}
        currentSubjectId={currentSubjectId}
        setCurrentSubjectId={setCurrentSubjectId}
        addSubject={addSubject}
        deleteSubject={deleteSubject}
        addNote={addNote}
        updateNote={updateNote}
        updateComment={updateComment}
        deleteNote={deleteNote}
        moveNote={moveNote}
        updateNoteColor={updateNoteColor}
      />
    </div>
  );
}
