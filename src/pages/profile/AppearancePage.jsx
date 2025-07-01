import React, { useState, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useUserPreferences } from "../../context/UserPreferencesContext";
import ColorPicker from "../../components/ColorPicker";
import Loader from "../../components/Loader";
import "../../style/AppearancePage.css";

const AppearancePage = () => {
  const { theme, currentTheme, changeTheme, themeOptions } = useTheme();
  const { noteColors, updateNoteColor, resetNoteColors, isLoading } =
    useUserPreferences();
  const [previewColors, setPreviewColors] = useState(noteColors);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const noteTypes = [
    { key: "heading", label: "Main Headings", icon: "fas fa-heading" },
    { key: "subheading", label: "Sub-headings", icon: "fas fa-heading" },
    { key: "subsubheading", label: "Sub-sub-headings", icon: "fas fa-heading" },
    { key: "content", label: "Regular Content", icon: "fas fa-paragraph" },
  ];

  const handleColorChange = useCallback((noteType, color) => {
    setPreviewColors((prev) => ({
      ...prev,
      [noteType]: color,
    }));
    setHasUnsavedChanges(true);
  }, []);

  const handleSaveColors = useCallback(() => {
    Object.entries(previewColors).forEach(([noteType, color]) => {
      updateNoteColor(noteType, color);
    });
    setHasUnsavedChanges(false);
  }, [previewColors, updateNoteColor]);

  const handleResetColors = useCallback(() => {
    resetNoteColors();
    setPreviewColors(noteColors);
    setHasUnsavedChanges(false);
  }, [resetNoteColors, noteColors]);

  const handleThemeChange = useCallback(
    (e) => {
      changeTheme(e.target.value);
    },
    [changeTheme],
  );

  if (isLoading) {
    return <Loader message="Loading appearance settings..." />;
  }

  return (
    <div className="appearance-page">
      <div className="appearance-section">
        <h3 style={{ color: theme.colors.accent }}>
          <i className="fas fa-palette"></i> Theme Selection
        </h3>
        <p style={{ color: theme.colors.textSecondary }}>
          Choose your preferred color theme for the application
        </p>

        <div className="theme-selector-container">
          <select
            value={currentTheme}
            onChange={handleThemeChange}
            className="theme-selector-dropdown"
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              borderColor: theme.colors.border,
            }}
          >
            {Object.entries(themeOptions).map(([key, themeOption]) => (
              <option key={key} value={key}>
                {themeOption.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="appearance-section">
        <h3 style={{ color: theme.colors.accent }}>
          <i className="fas fa-paint-brush"></i> Note Color Configuration
        </h3>
        <p style={{ color: theme.colors.textSecondary }}>
          Set default colors for different note types. These colors will be
          applied to new notes automatically.
        </p>

        <div className="color-configuration">
          <div className="color-controls">
            {noteTypes.map((noteType) => (
              <div key={noteType.key} className="color-control-item">
                <div className="color-control-header">
                  <i className={noteType.icon}></i>
                  <span>{noteType.label}</span>
                </div>
                <ColorPicker
                  currentColor={previewColors[noteType.key]}
                  onColorChange={(color) =>
                    handleColorChange(noteType.key, color)
                  }
                />
              </div>
            ))}
          </div>

          <div className="preview-panel">
            <h4 style={{ color: theme.colors.accent }}>Preview</h4>
            <div
              className="preview-content"
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
              }}
            >
              <div className="preview-note">
                <h2 style={{ color: previewColors.heading }}>
                  Main Heading Example
                </h2>
              </div>
              <div className="preview-note">
                <h3 style={{ color: previewColors.subheading }}>
                  Sub-heading Example
                </h3>
              </div>
              <div className="preview-note">
                <h4 style={{ color: previewColors.subsubheading }}>
                  Sub-sub-heading Example
                </h4>
              </div>
              <div className="preview-note">
                <p style={{ color: previewColors.content }}>
                  This is how regular content will appear with your selected
                  colors. You can see how readable and visually appealing your
                  choices are.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="color-actions">
          <button
            onClick={handleSaveColors}
            disabled={!hasUnsavedChanges}
            className="save-button"
            style={{
              backgroundColor: hasUnsavedChanges
                ? theme.colors.accent
                : theme.colors.border,
              color: theme.colors.background,
            }}
          >
            <i className="fas fa-save"></i> Save Color Preferences
          </button>
          <button
            onClick={handleResetColors}
            className="reset-button"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.background,
            }}
          >
            <i className="fas fa-undo"></i> Reset to Defaults
          </button>
        </div>

        {hasUnsavedChanges && (
          <div className="unsaved-changes-notice">
            <i className="fas fa-exclamation-triangle"></i>
            You have unsaved changes. Click "Save Color Preferences\" to apply
            them.
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(AppearancePage);
