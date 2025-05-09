import { useState, useRef, useEffect } from "react";
import "../style/Content.css";

function Content({
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
    if (!showConfirmDelete) {
      setIsAnimatingOut(false);
    }
  }, [showConfirmDelete]);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "0px";
    const newHeight = textarea.scrollHeight;
    textarea.style.height = `${newHeight}px`;
  }, [value]);

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
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

  return (
    <div className="content-container">
      <p>
        <textarea
          ref={textareaRef}
          type="text"
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder="Enter content"
          className="content-input"
        />
      </p>
      {comment && <div className="content-comment-display">{comment}</div>}
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
            className="content-comment-enter"
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
            <p>Delete this content?</p>
            <div className="confirm-delete-buttons">
              <button onClick={handleConfirmDelete} className="confirm-button">
                Delete
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

export default Content;
