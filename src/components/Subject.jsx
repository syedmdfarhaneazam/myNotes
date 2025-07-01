import React, { useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import ConfirmationModal from "./ConfirmationModal";
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  const handleSelectChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (value === "add-subject") {
        setShowInput(true);
      } else if (value === "") {
        setShowInput(false);
      } else {
        setCurrentSubjectId(Number(value));
        setShowInput(false);
      }
    },
    [setCurrentSubjectId],
  );

  const handleAddSubject = useCallback(
    (e) => {
      e.preventDefault();
      const trimmedName = newSubjectName.trim();
      if (trimmedName) {
        addSubject(trimmedName);
        setNewSubjectName("");
        setShowInput(false);
      }
    },
    [newSubjectName, addSubject],
  );

  const handleDeleteClick = useCallback(() => {
    if (currentSubjectId && subjects.length > 1) {
      const subject = subjects.find((s) => s.id === currentSubjectId);
      setSubjectToDelete(subject);
      setShowDeleteModal(true);
    }
  }, [currentSubjectId, subjects]);

  const confirmDelete = useCallback(() => {
    if (subjectToDelete) {
      deleteSubject(subjectToDelete.id);
      setShowDeleteModal(false);
      setSubjectToDelete(null);
    }
  }, [subjectToDelete, deleteSubject]);

  const cancelDelete = useCallback(() => {
    setShowDeleteModal(false);
    setSubjectToDelete(null);
  }, []);

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

      <ConfirmationModal
        isOpen={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        title="Delete Subject"
        message={`Are you sure you want to delete "${subjectToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default React.memo(Subject);
