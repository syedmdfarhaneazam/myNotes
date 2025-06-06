import SubjectSelector from "./SubjectSelector.jsx";
import NoteRenderer from "./NoteRenderer.jsx";
import "../../styles/notes-container.css";

export default function NotesContainer({
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
}) {
  const currentSubject = subjects.find((s) => s.id === currentSubjectId);
  const notes = currentSubject?.notes || [];

  return (
    <div className="notes-container">
      <div className="animate-slide-in">
        <SubjectSelector
          subjects={subjects}
          currentSubjectId={currentSubjectId}
          setCurrentSubjectId={setCurrentSubjectId}
          addSubject={addSubject}
          deleteSubject={deleteSubject}
        />
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="empty-state animate-fade-in">
            <p>
              No notes yet. Start by adding content using the toolbar above!
            </p>
          </div>
        ) : (
          notes.map((note, index) => (
            <div
              key={note.id}
              className="animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <NoteRenderer
                note={note}
                onUpdate={updateNote}
                onCommentChange={updateComment}
                onDelete={deleteNote}
                onMoveUp={() => moveNote(note.id, -1)}
                onMoveDown={() => moveNote(note.id, 1)}
                onColorChange={updateNoteColor}
                canMoveUp={index > 0}
                canMoveDown={index < notes.length - 1}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
