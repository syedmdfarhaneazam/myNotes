import { useState, useRef } from "react";
import OptionsButton from "./OptionsButton";
import { useTheme } from "../context/ThemeContext";
import "../style/AddImage.css";

function AddImage({
  id,
  value,
  color,
  onChange,
  onColorChange,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  const { theme } = useTheme();
  const [imagePreview, setImagePreview] = useState(value || "");
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

  return (
    <div
      className="image-container"
      style={{ borderColor: theme.colors.primary }}
    >
      <div className="image-content">
        <div className="image-preview-area">
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

          <button
            className="upload-button"
            onClick={() => fileInputRef.current.click()}
            title="Upload image"
            style={{
              marginTop: "16px",
              padding: "8px 16px",
              backgroundColor: theme.colors.primary,
              color: theme.colors.text,
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <i className="fas fa-camera"></i> Upload Image
          </button>
        </div>

        <OptionsButton
          id={id}
          onColorChange={onColorChange}
          onDelete={onDelete}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          currentColor={color}
        />
      </div>
    </div>
  );
}

export default AddImage;
