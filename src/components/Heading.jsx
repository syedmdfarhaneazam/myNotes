import { useState, useRef, useEffect } from "react";
import "../style/Heading.css";

function Heading({
  id,
  value,
  comment,
  onChange,
  onCommentChange,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "0px";
    const newHeight = textarea.scrollHeight;
    textarea.style.height = `${newHeight}px`;
  }, [value]);

  useEffect(() => {
    if (!showConfirmDelete) {
      setIsAnimatingOut(false);
    }
  }, [showConfirmDelete]);

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    animateAndClose();
    setTimeout(() => {
      onDelete(id);
    }, 300);
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

  return (
    <div className="heading-container">
      <h2>
        <textarea
          ref={textareaRef}
          type="text"
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder="Enter heading"
          className="heading-input"
        />
      </h2>

      {comment && <div className="heading-comment-display">{comment}</div>}

      <div>
        <button onClick={() => setShowCommentInput(!showCommentInput)}>
          {showCommentInput ? "✖️" : "💭"}
        </button>

        {showCommentInput && (
          <input
            type="text"
            value={comment || ""}
            onChange={(e) => onCommentChange(id, e.target.value)}
            placeholder="Enter comment"
            className="heading-comment-enter"
          />
        )}

        <button onClick={handleDeleteClick}>🗑️</button>
        <button onClick={() => onMoveUp(id)}>⬆️</button>
        <button onClick={() => onMoveDown(id)}>⬇️</button>
      </div>

      {showConfirmDelete && (
        <div
          className={`confirm-delete-popup ${isAnimatingOut ? "fade-out" : "fade-in"}`}
        >
          <div
            className={`confirm-delete-content ${isAnimatingOut ? "scale-out" : "scale-in"}`}
          >
            <p>Are you sure you want to delete this heading?</p>
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

export default Heading;
