import { useState, useRef, useEffect } from "react";
import ColorPicker from "./ColorPicker";
import ConfirmationModal from "./ConfirmationModal";
import { useTheme } from "../context/ThemeContext";
import "../style/AddImage.css";

function AddImage({
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
  const [imagePreview, setImagePreview] = useState(value || "");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      onChange(id, reader.result);
    };
    reader.readAsDataURL(file);
  };

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
      className="image-container"
      style={{ borderColor: theme.colors.primary }}
    >
      {imagePreview ? (
        <img
          src={imagePreview || "/placeholder.svg"}
          alt="Uploaded"
          className="preview-img"
        />
      ) : (
        <p style={{ color: theme.colors.text }}>No image uploaded.</p>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      <div className="image-controls">
        <ColorPicker
          currentColor={color}
          onColorChange={(newColor) => onColorChange(id, newColor)}
        />

        <button
          className="upload-button"
          onClick={() => fileInputRef.current.click()}
          title="Upload image"
        >
          📷
        </button>

        <button onClick={handleDeleteClick} title="Delete">
          🗑️
        </button>
        <button onClick={() => onMoveUp(id)} title="Move up">
          ⬆️
        </button>
        <button onClick={() => onMoveDown(id)} title="Move down">
          ⬇️
        </button>

        <button
          onClick={() => setShowCommentInput(!showCommentInput)}
          title={showCommentInput ? "Hide comment" : "Add comment"}
        >
          {showCommentInput ? "✖️" : "💭"}
        </button>
      </div>

      {showCommentInput && (
        <input
          type="text"
          value={comment || ""}
          onChange={(e) => onCommentChange(id, e.target.value)}
          placeholder="Enter comment"
          className="image-comment"
          style={{
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            borderColor: theme.colors.primary,
          }}
        />
      )}

      <ConfirmationModal
        isOpen={showConfirmDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Image"
        message="Are you sure you want to delete this image?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default AddImage;
