import { useRef, useEffect } from "react";
import OptionsButton from "./OptionsButton";
import { useTheme } from "../context/ThemeContext";
import "../style/Content.css";

function Content({
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
      className="content-container"
      style={{ borderColor: theme.colors.primary }}
    >
      <div className="content-content">
        <p>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(id, e.target.value)}
            placeholder="Enter content"
            className="content-input"
            style={{ color: color || theme.colors.text }}
          />
        </p>
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

export default Content;
