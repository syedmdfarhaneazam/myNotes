import { useState, useRef, useEffect } from "react";
import "../style/SubHeading.css";

function SubHeading({
  id,
  value,
  comment,
  onChange,
  onCommentChange,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const textareaRef = useRef(null);

  // Adjust textarea height dynamically
  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "0px"; // Reset height to 0 to get accurate scrollHeight
    const newHeight = textarea.scrollHeight;
    textarea.style.height = `${newHeight}px`; // Set height to content height
  }, [value]);

  return (
    <div className="subheading-container">
      <h3>
        <textarea
          ref={textareaRef}
          type="text"
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder="Enter subheading"
          className="subheading-input"
        />
      </h3>
      {comment && <div className="subheading-comment-display">{comment}</div>}
      <div>
        <button onClick={() => setShowCommentInput(!showCommentInput)}>
          {showCommentInput ? "✖️" : "💭"}
        </button>
        {showCommentInput && (
          <input
            type="text"
            value={comment || ""}
            onChange={(e) => onCommentChange(id, e.target.value)}
            placeholder="Enter comment"
            className="subheading-comment-enter"
          />
        )}
        <button onClick={() => onDelete(id)}>🗑️</button>
        <button onClick={() => onMoveUp(id)}>⬆️</button>
        <button onClick={() => onMoveDown(id)}>⬇️</button>
      </div>
    </div>
  );
}

export default SubHeading;
