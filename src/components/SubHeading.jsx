import { useRef, useEffect } from "react";
import OptionsButton from "./OptionsButton";
import { useTheme } from "../context/ThemeContext";
import "../style/SubHeading.css";

function SubHeading({
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
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "0px";
      const newHeight = textarea.scrollHeight;
      textarea.style.height = `${newHeight}px`;
    }
  }, [value]);

  return (
    <div
      className="subheading-container"
      style={{ borderColor: theme.colors.primary }}
    >
      <div className="subheading-content">
        <h3>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(id, e.target.value)}
            placeholder="Enter subheading"
            className="subheading-input"
            style={{ color: color || theme.colors.text }}
          />
        </h3>
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
  );
}

export default SubHeading;
