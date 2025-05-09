// src/components/AddImage.jsx
import { useState, useRef, useEffect } from "react";
import "../style/AddImage.css";

function AddImage({
  id,
  value,
  comment,
  onChange,
  onCommentChange,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  const [imagePreview, setImagePreview] = useState(value || "");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    if (!showConfirmDelete) setIsAnimatingOut(false);
  }, [showConfirmDelete]);

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
    <div className="image-container">
      {imagePreview ? (
        <img src={imagePreview} alt="Uploaded" className="preview-img" />
      ) : (
        <p>No image uploaded.</p>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <button
        className="upload-button"
        onClick={() => fileInputRef.current.click()}
      >
        📷
      </button>
      <button onClick={handleDeleteClick}>🗑️</button>
      <button onClick={() => onMoveUp(id)}>⬆️</button>
      <button onClick={() => onMoveDown(id)}>⬇️</button>
      <button onClick={() => setShowCommentInput(!showCommentInput)}>
        {showCommentInput ? "✖️" : "💭"}
      </button>
      {showCommentInput && (
        <input
          type="text"
          value={comment || ""}
          onChange={(e) => onCommentChange(id, e.target.value)}
          placeholder="Enter comment"
          className="image-comment"
        />
      )}

      {showConfirmDelete && (
        <div
          className={`confirm-delete-popup ${isAnimatingOut ? "fade-out" : "fade-in"}`}
        >
          <div
            className={`confirm-delete-content ${isAnimatingOut ? "scale-out" : "scale-in"}`}
          >
            <p>Delete this image?</p>
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

export default AddImage;
