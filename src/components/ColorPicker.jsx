import { useState, useEffect } from "react";
import { createPortal } from "react-dom"; // Add this import
import { useColorPalette } from "../context/ColorPaletteContext";
import "../style/ColorPicker.css";

function ColorPicker({ currentColor, onColorChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const { colorPalettes } = useColorPalette();

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleColorSelect = (color) => {
    onColorChange(color);
    setIsOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  // Portal content for the overlay
  const overlayContent = isOpen && (
    <div className="color-picker-overlay" onClick={handleOverlayClick}>
      <div className="color-picker-modal">
        <div className="color-picker-header">
          <h3 className="color-picker-title">Choose a Color</h3>
          <button
            className="color-picker-close"
            onClick={() => setIsOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {Object.entries(colorPalettes).map(([paletteName, colors]) => (
          <div key={paletteName} className="color-palette-section">
            <h4 className="palette-name">{paletteName}</h4>
            <div className="color-grid">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`color-option ${currentColor === color ? "selected" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                  title={color}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="color-info">
          <div className="selected-color-display">
            <span>Selected Color:</span>
            <div
              className="selected-color-preview"
              style={{ backgroundColor: currentColor || "#000000" }}
            />
            <span>{currentColor || "#000000"}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="color-picker-container">
      <button
        className="color-picker-trigger"
        onClick={() => setIsOpen(true)}
        style={{
          backgroundColor: currentColor || "#000000",
        }}
        title="Choose color"
      />
      {/* Render overlay via portal */}
      {isOpen && createPortal(overlayContent, document.body)}
    </div>
  );
}

export default ColorPicker;
