import React, { useState, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import "../../style/GeneralSettingsPage.css";

const GeneralSettingsPage = () => {
  const { theme, userName, changeUserName } = useTheme();
  const [name, setName] = useState(userName);
  const [saveStatus, setSaveStatus] = useState("");

  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const saveUserName = useCallback(() => {
    const trimmedName = name.trim();
    changeUserName(trimmedName || "My Notes");
    setSaveStatus("Username updated successfully!");
    setTimeout(() => setSaveStatus(""), 3000);
  }, [name, changeUserName]);

  const shortcuts = [
    { key: "Alt+N", description: "Go to Notes page" },
    { key: "Alt+P", description: "Go to Profile page" },
    { key: "Alt+H", description: "Show/Hide help modal" },
    { key: "Alt+1", description: "Add new Heading" },
    { key: "Alt+2", description: "Add new Sub-heading" },
    { key: "Alt+3", description: "Add new Sub-sub-heading" },
    { key: "Alt+4", description: "Add new Content block" },
    { key: "Alt+5", description: "Add new Code block" },
    { key: "Alt+G", description: "Scroll to bottom of page" },
    { key: "Esc", description: "Close modals and overlays" },
  ];

  return (
    <div className="general-settings-page">
      <div className="settings-section">
        <h3 style={{ color: theme.colors.accent }}>
          <i className="fas fa-user"></i> User Profile
        </h3>
        <p style={{ color: theme.colors.textSecondary }}>
          Manage your personal information and preferences
        </p>

        <div className="profile-setting">
          <label htmlFor="username">Display Name</label>
          <div className="input-group">
            <input
              id="username"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              style={{
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              }}
            />
            <button
              onClick={saveUserName}
              className="save-name-button"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.background,
              }}
            >
              <i className="fas fa-save"></i> Save
            </button>
          </div>
          {saveStatus && (
            <div className="save-status success">
              <i className="fas fa-check-circle"></i>
              {saveStatus}
            </div>
          )}
        </div>
      </div>

      <div className="settings-section">
        <h3 style={{ color: theme.colors.accent }}>
          <i className="fas fa-keyboard"></i> Keyboard Shortcuts
        </h3>
        <p style={{ color: theme.colors.textSecondary }}>
          Use these keyboard shortcuts to enhance your productivity
        </p>

        <div className="shortcuts-grid">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="shortcut-item"
              style={{ borderColor: theme.colors.border }}
            >
              <div className="shortcut-key">
                <kbd
                  style={{
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  }}
                >
                  {shortcut.key}
                </kbd>
              </div>
              <div className="shortcut-description">{shortcut.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h3 style={{ color: theme.colors.accent }}>
          <i className="fas fa-cogs"></i> System Preferences
        </h3>
        <p style={{ color: theme.colors.textSecondary }}>
          Application behavior and performance settings
        </p>

        <div className="system-preferences">
          <div className="preference-item">
            <div className="preference-info">
              <h4>Auto-save</h4>
              <p>Automatically save changes as you type</p>
            </div>
            <div className="preference-control">
              <span className="status-badge enabled">
                <i className="fas fa-check"></i> Enabled
              </span>
            </div>
          </div>

          <div className="preference-item">
            <div className="preference-info">
              <h4>Data Persistence</h4>
              <p>Store notes locally in your browser</p>
            </div>
            <div className="preference-control">
              <span className="status-badge enabled">
                <i className="fas fa-check"></i> Enabled
              </span>
            </div>
          </div>

          <div className="preference-item">
            <div className="preference-info">
              <h4>Performance Mode</h4>
              <p>Optimized rendering for better performance</p>
            </div>
            <div className="preference-control">
              <span className="status-badge enabled">
                <i className="fas fa-check"></i> Active
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 style={{ color: theme.colors.accent }}>
          <i className="fas fa-info-circle"></i> Application Information
        </h3>

        <div className="app-info">
          <div className="info-item">
            <strong>Version:</strong> 2.0.0
          </div>
          <div className="info-item">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </div>
          <div className="info-item">
            <strong>Storage:</strong> IndexedDB (Local Browser Storage)
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(GeneralSettingsPage);
