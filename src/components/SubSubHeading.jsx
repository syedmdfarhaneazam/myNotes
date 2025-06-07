import { useState, useRef, useEffect } from "react";
import ColorPicker from "./ColorPicker";
import ConfirmationModal from "./ConfirmationModal";
import { useTheme } from "../context/ThemeContext";
import "../style/SubSubHeading.css";

function SubSubHeading({
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
      className="subsubheading-container"
      style={{ borderColor: theme.colors.primary }}
    >
      <h4>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder="Enter sub-subheading"
          className="subsubheading-input"
          style={{ color: color || "#000000" }}
        />
      </h4>

      {comment && (
        <div className="subsubheading-comment-display">{comment}</div>
      )}

      <div className="subsubheading-controls">
        <ColorPicker
          currentColor={color}
          onColorChange={(newColor) => onColorChange(id, newColor)}
        />

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

      <ConfirmationModal
        isOpen={showConfirmDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Sub-subheading"
        message="Are you sure you want to delete this sub-subheading?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default SubSubHeading;
