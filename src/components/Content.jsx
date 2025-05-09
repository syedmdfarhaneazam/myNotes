import { useState, useRef, useEffect } from "react";
import "../style/Content.css";

function Content({
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
    <div className="content-container">
      <p>
        <textarea
          ref={textareaRef}
          type="text"
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder="Enter content"
          className="content-input"
        />
      </p>
      {comment && <div className="content-comment-display">{comment}</div>}
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
            className="content-comment-enter"
          />
        )}
        <button onClick={() => onDelete(id)}>🗑️</button>
        <button onClick={() => onMoveUp(id)}>⬆️</button>
        <button onClick={() => onMoveDown(id)}>⬇️</button>
      </div>
    </div>
  );
}

export default Content;
