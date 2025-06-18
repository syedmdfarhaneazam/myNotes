import { useState, useRef, useEffect } from "react";
import ColorPicker from "./ColorPicker";
import ConfirmationModal from "./ConfirmationModal";
import { useTheme } from "../context/ThemeContext";
import "../style/Content.css";

function Content({
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
      className="content-container"
      style={{ borderColor: theme.colors.primary }}
    >
      <p>
        <textarea
          ref={textareaRef}
          type="text"
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder="Enter content"
          className="content-input"
          style={{ color: color || "#000000" }}
        />
      </p>

      {comment && <div className="content-comment-display">{comment}</div>}

      <div className="content-controls">
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
          <textarea
            type="text"
            value={comment || ""}
            onChange={(e) => onCommentChange(id, e.target.value)}
            placeholder="Enter comment"
            className="content-comment-enter"
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
        title="Delete Content"
        message="Are you sure you want to delete this content?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default Content;
