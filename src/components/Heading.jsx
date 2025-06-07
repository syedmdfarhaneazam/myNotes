import { useState, useRef, useEffect } from "react";
import ColorPicker from "./ColorPicker";
import ConfirmationModal from "./ConfirmationModal";
import { useTheme } from "../context/ThemeContext";
import "../style/Heading.css";

function Heading({
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
    if (textarea) {
      textarea.style.height = "0px";
      const newHeight = textarea.scrollHeight;
      textarea.style.height = `${newHeight}px`;
    }
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
      className="heading-container"
      style={{
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
      }}
    >
      <h2>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder="Enter heading"
          className="heading-input"
          style={{
            color: color || theme.colors.text,
            backgroundColor: "transparent",
          }}
        />
      </h2>

      {comment && (
        <div
          className="heading-comment-display"
          style={{ color: theme.colors.textSecondary }}
        >
          {comment}
        </div>
      )}

      <div className="heading-controls">
        <ColorPicker
          currentColor={color}
          onColorChange={(newColor) => onColorChange(id, newColor)}
        />

        <button
          onClick={() => setShowCommentInput(!showCommentInput)}
          title={showCommentInput ? "Hide comment" : "Add comment"}
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.text,
          }}
        >
          {showCommentInput ? "✖️" : "💭"}
        </button>

        {showCommentInput && (
          <input
            type="text"
            value={comment || ""}
            onChange={(e) => onCommentChange(id, e.target.value)}
            placeholder="Enter comment"
            className="heading-comment-enter"
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              borderColor: theme.colors.border,
            }}
          />
        )}

        <button
          onClick={handleDeleteClick}
          title="Delete"
          style={{
            backgroundColor: theme.colors.accent,
            color: theme.colors.background,
          }}
        >
          🗑️
        </button>
        <button
          onClick={() => onMoveUp(id)}
          title="Move up"
          style={{
            backgroundColor: theme.colors.secondary,
            color: theme.colors.text,
          }}
        >
          ⬆️
        </button>
        <button
          onClick={() => onMoveDown(id)}
          title="Move down"
          style={{
            backgroundColor: theme.colors.secondary,
            color: theme.colors.text,
          }}
        >
          ⬇️
        </button>
      </div>

      <ConfirmationModal
        isOpen={showConfirmDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Heading"
        message="Are you sure you want to delete this heading?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default Heading;
