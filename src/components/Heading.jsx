import { useRef, useEffect } from "react";
import OptionsButton from "./OptionsButton";
import { useTheme } from "../context/ThemeContext";
import "../style/Heading.css";

function Heading({
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
      className="heading-container"
      style={{
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
      }}
    >
      <div className="heading-content">
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

export default Heading;
