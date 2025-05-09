import { useState, useRef, useEffect } from "react";
import "../style/Heading.css";

function Heading({
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

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "0px";
    const newHeight = textarea.scrollHeight;
    textarea.style.height = `${newHeight}px`;
  }, [value]);

  return (
    <div className="heading-container">
      <h2>
        <textarea
          ref={textareaRef}
          type="text"
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder="Enter heading"
          className="heading-input"
        />
      </h2>
      {comment && <div className="heading-comment-display">{comment}</div>}
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
            className="heading-comment-enter"
          />
        )}
        <button onClick={() => onDelete(id)}>🗑️</button>
        <button onClick={() => onMoveUp(id)}>⬆️</button>
        <button onClick={() => onMoveDown(id)}>⬇️</button>
      </div>
    </div>
  );
}

export default Heading;
