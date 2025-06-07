import { useState, useRef, useEffect } from "react";
import ColorPicker from "./ColorPicker";
import ConfirmationModal from "./ConfirmationModal";
import { useTheme } from "../context/ThemeContext";
import "../style/SubHeading.css";

function SubHeading({
  id,
  value,
  comment,
  color,
  onChange,
  onCommentChange,
  onColorChange,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  const { theme } = useTheme();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const textareaRef = useRef(null);

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
    setShowConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <div
      className="subheading-container"
      style={{ borderColor: theme.colors.primary }}
    >
      <h3>
        <textarea
          ref={textareaRef}
          type="text"
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder="Enter subheading"
          className="subheading-input"
          style={{ color: color || "#000000" }}
        />
      </h3>

      {comment && <div className="subheading-comment-display">{comment}</div>}

      <div className="subheading-controls">
        <ColorPicker
          currentColor={color}
          onColorChange={(newColor) => onColorChange(id, newColor)}
        />

        <button
          onClick={() => setShowCommentInput(!showCommentInput)}
          title={showCommentInput ? "Hide comment" : "Add comment"}
        >
          {showCommentInput ? "✖️" : "💭"}
        </button>

        {showCommentInput && (
          <input
            type="text"
            value={comment || ""}
            onChange={(e) => onCommentChange(id, e.target.value)}
            placeholder="Enter comment"
            className="subheading-comment-enter"
          />
        )}

        <button onClick={handleDeleteClick} title="Delete">
          🗑️
        </button>
        <button onClick={() => onMoveUp(id)} title="Move up">
          ⬆️
        </button>
        <button onClick={() => onMoveDown(id)} title="Move down">
          ⬇️
        </button>
      </div>

      <ConfirmationModal
        isOpen={showConfirmDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Subheading"
        message="Are you sure you want to delete this subheading?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default SubHeading;
