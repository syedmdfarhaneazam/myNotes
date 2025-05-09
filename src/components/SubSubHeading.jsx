import { useState, useRef, useEffect } from "react";
import "../style/SubSubHeading.css";

function SubSubHeading({
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
    if (textarea) {
      textarea.style.height = "0px";
      const newHeight = textarea.scrollHeight;
      textarea.style.height = `${newHeight}px`;
    }
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
    <div className="subsubheading-container">
      <h4>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder="Enter sub-subheading"
          className="subsubheading-input"
        />
      </h4>

      {comment && (
        <div className="subsubheading-comment-display">{comment}</div>
      )}

      <div>
        <button
          onClick={() => setShowCommentInput(!showCommentInput)}
          title={showCommentInput ? "Cancel" : "Add Comment"}
        >
          {showCommentInput ? "✖️" : "💭"}
        </button>

        {showCommentInput && (
          <input
            type="text"
            value={comment || ""}
            onChange={(e) => onCommentChange(id, e.target.value)}
            placeholder="Enter comment"
            className="subsubheading-comment-enter"
          />
        )}

        <button onClick={handleDeleteClick} title="Delete">
          🗑️
        </button>

        <button onClick={() => onMoveUp(id)} title="Move Up">
          ⬆️
        </button>

        <button onClick={() => onMoveDown(id)} title="Move Down">
          ⬇️
        </button>
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

export default SubSubHeading;
