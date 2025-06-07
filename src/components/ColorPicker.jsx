import { useState } from "react";
import { useColorPalette } from "../context/ColorPaletteContext";
import "../style/ColorPicker.css";

function ColorPicker({ currentColor, onColorChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const { colorPalettes } = useColorPalette();
  const [selectedPalette, setSelectedPalette] = useState("default");

  const togglePicker = () => {
    setIsOpen(!isOpen);
  };

  const handleColorSelect = (color) => {
    onColorChange(color);
    setIsOpen(false);
  };

  const handlePaletteChange = (e) => {
    setSelectedPalette(e.target.value);
  };

  return (
    <div className="color-picker-container">
      <button
        className="color-picker-button"
        onClick={togglePicker}
        style={{ backgroundColor: currentColor || "#000000" }}
      >
        <span className="color-picker-icon">🎨</span>
      </button>

      {isOpen && (
        <div className="color-picker-dropdown">
          <select
            value={selectedPalette}
            onChange={handlePaletteChange}
            className="palette-selector"
          >
            {Object.keys(colorPalettes).map((palette) => (
              <option key={palette} value={palette}>
                {palette.charAt(0).toUpperCase() + palette.slice(1)}
              </option>
            ))}
          </select>

          <div className="color-options">
            {colorPalettes[selectedPalette].map((color, index) => (
              <div
                key={index}
                className="color-option"
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
