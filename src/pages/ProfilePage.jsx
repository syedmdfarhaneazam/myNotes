import React, { useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNotes } from "../context/NotesContext";
import ExportModal from "../components/ExportModal";
import Loader from "../components/Loader";
import "../style/ProfilePage.css";

function ProfilePage() {
  const { theme, userName, changeUserName } = useTheme();
  const { importSubjects } = useNotes();
  const [name, setName] = useState(userName);
  const [importStatus, setImportStatus] = useState("");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const saveUserName = useCallback(() => {
    const trimmedName = name.trim();
    changeUserName(trimmedName || "My Notes");
    setImportStatus("Username updated successfully!");
    setTimeout(() => setImportStatus(""), 3000);
  }, [name, changeUserName]);

  const handleImportData = useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setIsImporting(true);
      setImportStatus("");

      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const data = JSON.parse(event.target.result);
          const result = await importSubjects(data);

          if (result.success) {
            setImportStatus(
              `Successfully imported ${result.count} subject(s)! They have been added to your existing notes.`,
            );
          } else {
            setImportStatus(`Import failed: ${result.error}`);
          }
        } catch (error) {
          console.error("Import failed:", error);
          setImportStatus(
            "Import failed. Please check your file format and try again.",
          );
        } finally {
          setIsImporting(false);
          // Clear the file input
          e.target.value = "";
        }
      };

      reader.onerror = () => {
        setImportStatus("Failed to read file. Please try again.");
        setIsImporting(false);
        e.target.value = "";
      };

      reader.readAsText(file);
    },
    [importSubjects],
  );

  return (
    <div className="profile-page" style={{ color: theme.colors.text }}>
      <div className="profile-container">
        <h2 style={{ color: theme.colors.accent }}>User Profile</h2>

        <div className="profile-section">
          <h3>User Name</h3>
          <div className="input-group">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              style={{
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                borderColor: theme.colors.primary,
              }}
            />
            <button
              onClick={saveUserName}
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.text,
              }}
            >
              Save
            </button>
          </div>
        </div>

        <div className="profile-section">
          <h3>Keyboard Shortcuts</h3>
          <p>Enhance your productivity with these shortcuts:</p>
          <div className="shortcuts-list">
            <p>
              <kbd>Alt+N</kbd>: Go to Notes
            </p>
            <p>
              <kbd>Alt+P</kbd>: Go to Profile
            </p>
            <p>
              <kbd>Alt+1</kbd>: Add Heading
            </p>
            <p>
              <kbd>Alt+2</kbd>: Add SubHeading
            </p>
            <p>
              <kbd>Alt+3</kbd>: Add SubSubHeading
            </p>
            <p>
              <kbd>Alt+4</kbd>: Add Content
            </p>
            <p>
              <kbd>Alt+5</kbd>: Add Code
            </p>
            <p>
              <kbd>Alt+G</kbd>: Go to end of the page
            </p>
          </div>
        </div>

        <div className="profile-section">
          <h3>Data Management</h3>

          <div className="data-management">
            <div className="export-section">
              <h4>Export Data</h4>
              <p>Select and download specific subjects as a JSON file</p>
              <button
                onClick={() => setIsExportModalOpen(true)}
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.text,
                }}
              >
                <i className="fas fa-download"></i> Export Notes
              </button>
            </div>

            <div className="import-section">
              <h4>Import Data</h4>
              <p>
                Upload a previously exported JSON file (will be added to
                existing notes)
              </p>
              {isImporting ? (
                <Loader size="small" message="Importing..." />
              ) : (
                <label
                  className="import-button"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.text,
                  }}
                >
                  <i className="fas fa-upload"></i> Import Notes
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    style={{ display: "none" }}
                    disabled={isImporting}
                  />
                </label>
              )}
            </div>
          </div>

          {importStatus && (
            <div
              className={`status-message ${importStatus.includes("failed") || importStatus.includes("Import failed") ? "error" : "success"}`}
            >
              {importStatus}
            </div>
          )}
        </div>
      </div>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}

export default React.memo(ProfilePage);
