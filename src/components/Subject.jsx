import { useState, useEffect } from "react";
import "./../style/Subject.css";

function Subject({
  subjects,
  currentSubjectId,
  setCurrentSubjectId,
  addSubject,
  deleteSubject,
}) {
  const [newSubjectName, setNewSubjectName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (!showConfirmDelete) {
      setIsAnimatingOut(false);
    }
  }, [showConfirmDelete]);

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
    animateAndClose();
  };

  const handleCancelDelete = () => {
    animateAndClose();
  };

  const animateAndClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setShowConfirmDelete(false);
    }, 300);
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
        >
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
          <option value="add-subject">+ Add a Subject</option>
        </select>
        <button onClick={handleDeleteClick} className="delete-subject">
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
          />
          <button type="submit" className="submit-subject">
            Add
          </button>
        </form>
      )}
      {showConfirmDelete && (
        <div
          className={`confirm-delete-popup ${isAnimatingOut ? "fade-out" : "fade-in"}`}
        >
          <div
            className={`confirm-delete-content ${isAnimatingOut ? "scale-out" : "scale-in"}`}
          >
            <p>Are you sure you want to delete "{currentSubject.name}"?</p>
            <div className="confirm-delete-buttons">
              <button onClick={handleConfirmDelete} className="confirm-button">
                Confirm
              </button>
              <button onClick={handleCancelDelete} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Subject;
