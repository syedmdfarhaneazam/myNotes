import { useState } from "react";
import AceEditor from "react-ace";
import OptionsButton from "./OptionsButton";
import { useTheme } from "../context/ThemeContext";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-sh";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "../style/Code.css";

const Code = ({
  id,
  value,
  language,
  color,
  onChange,
  onColorChange,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  const { theme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState(
    language || "javascript",
  );

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    onChange(id, value, newLanguage);
  };

  const handleCodeChange = (newValue) => {
    onChange(id, newValue, selectedLanguage);
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
          <option value="cpp">C++</option>
          <option value="c">C</option>
        </select>

        <OptionsButton
          id={id}
          onColorChange={onColorChange}
          onDelete={onDelete}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          currentColor={color}
        />
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
    </div>
  );
};

export default Code;
