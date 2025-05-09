import { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-sh";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "./../style/Code.css";

const Code = ({
  id,
  value,
  language,
  comment,
  onChange,
  onCommentChange,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    language || "javascript",
  );
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (!showConfirmDelete) {
      setIsAnimatingOut(false);
    }
  }, [showConfirmDelete]);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    onChange(id, value, newLanguage);
  };

  const handleCodeChange = (newValue) => {
    onChange(id, newValue, selectedLanguage);
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
    <div className="code-container">
      <div className="code-header">
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="language-dropdown"
        >
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="sh">Bash</option>
        </select>
        <div className="code-actions">
          <button onClick={() => onMoveUp(id)} disabled={id === 0}>
            ↑
          </button>
          <button onClick={() => onMoveDown(id)}>↓</button>
          <button onClick={handleDeleteClick}>🗑️</button>
        </div>
      </div>
      <AceEditor
        mode={selectedLanguage}
        theme="monokai"
        value={value}
        onChange={handleCodeChange}
        name={`code-editor-${id}`}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          tabSize: selectedLanguage === "python" ? 4 : 2,
          useSoftTabs: true,
          fontSize: 14,
          showPrintMargin: false,
          wrap: true,
        }}
        style={{ width: "100%", minHeight: "200px" }}
      />
      <textarea
        className="code-comment"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => onCommentChange(id, e.target.value)}
      />

      {showConfirmDelete && (
        <div
          className={`confirm-delete-popup ${isAnimatingOut ? "fade-out" : "fade-in"}`}
        >
          <div
            className={`confirm-delete-content ${isAnimatingOut ? "scale-out" : "scale-in"}`}
          >
            <p>Are you sure you want to delete this code snippet?</p>
            <div className="confirm-delete-buttons">
              <button onClick={handleConfirmDelete} className="confirm-button">
                Confirm
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
};

export default Code;
