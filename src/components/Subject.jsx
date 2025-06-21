import { useState } from "react";
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

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "add-subject") {
      setShowInput(true);
    } else if (value === "") {
      // Handle empty selection
      setShowInput(false);
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
    if (currentSubjectId && subjects.length > 1) {
      const confirmed = window.confirm(
        `Are you sure you want to delete this subject?`,
      );
      if (confirmed) {
        deleteSubject(currentSubjectId);
      }
    }
  };

  // Convert null to empty string for React select
  const selectValue = currentSubjectId === null ? "" : String(currentSubjectId);

  return (
    <div className="subject-selector">
      <div className="subject-controls">
        <select
          value={selectValue}
          onChange={handleSelectChange}
          className="subject-dropdown"
          style={{
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            borderColor: theme.colors.primary,
          }}
        >
          {currentSubjectId === null && (
            <option value="">Select a subject</option>
          )}
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
          <option value="add-subject">+ Add a Subject</option>
        </select>

        {currentSubjectId && subjects.length > 1 && (
          <button
            onClick={handleDeleteClick}
            className="delete-subject"
            title="Delete subject"
          >
            <i className="fas fa-trash"></i>
          </button>
        )}
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
            autoFocus
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
    </div>
  );
}

export default Subject;
