import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { useTheme } from "../context/ThemeContext";
import "../style/Subject.css";

function Subject({
  subjects,
  currentSubjectId,
  setCurrentSubjectId,
  addSubject,
  deleteSubject,
}) {
  const { theme } = useTheme();
  const [newSubjectName, setNewSubjectName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "add-subject") {
      setShowInput(true);
    } else {
      setCurrentSubjectId(Number(value));
      setShowInput(false);
    }
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (newSubjectName.trim()) {
      addSubject(newSubjectName.trim());
      setNewSubjectName("");
      setShowInput(false);
    }
  };

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    deleteSubject(currentSubjectId);
    setShowConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  const currentSubject = subjects.find(
    (subject) => subject.id === currentSubjectId,
  );

  return (
    <div className="subject-selector">
      <div className="subject-controls">
        <select
          value={currentSubjectId}
          onChange={handleSelectChange}
          className="subject-dropdown"
          style={{
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            borderColor: theme.colors.primary,
          }}
        >
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
          <option value="add-subject">+ Add a Subject</option>
        </select>
        <button
          onClick={handleDeleteClick}
          className="delete-subject"
          title="Delete subject"
        >
          🗑️
        </button>
      </div>

      {showInput && (
        <form onSubmit={handleAddSubject} className="add-subject-form">
          <input
            type="text"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            placeholder="Enter subject name"
            className="subject-input"
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              borderColor: theme.colors.primary,
            }}
          />
          <button
            type="submit"
            className="submit-subject"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.text,
            }}
          >
            Add
          </button>
        </form>
      )}

      <ConfirmationModal
        isOpen={showConfirmDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Subject"
        message={`Are you sure you want to delete "${currentSubject?.name}"?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default Subject;
