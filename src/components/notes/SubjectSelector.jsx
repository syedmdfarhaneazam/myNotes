import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import AlertDialog from "../ui/AlertDialog.jsx";
import "../../styles/subject-selector.css";

export default function SubjectSelector({
  subjects,
  currentSubjectId,
  setCurrentSubjectId,
  addSubject,
  deleteSubject,
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleAddSubject = () => {
    if (newSubjectName.trim()) {
      addSubject(newSubjectName.trim());
      setNewSubjectName("");
      setShowAddForm(false);
    }
  };

  const currentSubject = subjects.find((s) => s.id === currentSubjectId);

  return (
    <div className="subject-selector">
      <div className="subject-controls">
        <select
          value={currentSubjectId?.toString() || ""}
          onChange={(e) => setCurrentSubjectId(Number(e.target.value))}
          className="subject-dropdown"
        >
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id.toString()}>
              {subject.name}
            </option>
          ))}
        </select>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={16} />
          Add Subject
        </button>

        {subjects.length > 1 && currentSubject && (
          <button
            className="btn btn-ghost btn-sm btn-destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="add-subject-form animate-slide-in">
          <input
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            placeholder="Subject name"
            className="input"
            onKeyDown={(e) => e.key === "Enter" && handleAddSubject()}
          />
          <button onClick={handleAddSubject} className="btn btn-primary btn-sm">
            Add
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setShowAddForm(false);
              setNewSubjectName("");
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Subject"
        description={`Are you sure you want to delete "${currentSubject?.name}"? This action cannot be undone and will delete all notes in this subject.`}
        onConfirm={() => deleteSubject(currentSubjectId)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
