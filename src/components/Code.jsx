import { useState } from "react";
import AceEditor from "react-ace";
import ColorPicker from "./ColorPicker";
import ConfirmationModal from "./ConfirmationModal";
import { useTheme } from "../context/ThemeContext";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-sh";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "../style/Code.css";

const Code = ({
  id,
  value,
  language,
  comment,
  color,
  onChange,
  onCommentChange,
  onColorChange,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  const { theme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState(
    language || "javascript",
  );
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

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
    setShowConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <div
      className="code-container"
      style={{ borderColor: theme.colors.primary }}
    >
      <div
        className="code-header"
        style={{ backgroundColor: theme.colors.secondary }}
      >
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="language-dropdown"
          style={{
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            borderColor: theme.colors.primary,
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="sh">Bash</option>
        </select>

        <div className="code-actions">
          {/* <ColorPicker */}
          {/*   currentColor={color} */}
          {/*   onColorChange={(newColor) => onColorChange(id, newColor)} */}
          {/* /> */}
          <button
            onClick={() => onMoveUp(id)}
            disabled={id === 0}
            title="Move up"
          >
            ↑
          </button>
          <button onClick={() => onMoveDown(id)} title="Move down">
            ↓
          </button>
          <button onClick={handleDeleteClick} title="Delete">
            🗑️
          </button>
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
        style={{
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
          borderColor: theme.colors.primary,
        }}
      />

      <ConfirmationModal
        isOpen={showConfirmDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Code"
        message="Are you sure you want to delete this code snippet?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Code;
