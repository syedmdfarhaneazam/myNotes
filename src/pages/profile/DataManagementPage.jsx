import React, { useState, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useNotes } from "../../context/NotesContext";
import ExportModal from "../../components/ExportModal";
import Loader from "../../components/Loader";
import "../../style/DataManagementPage.css";

const DataManagementPage = () => {
  const { theme } = useTheme();
  const { importSubjects } = useNotes();
  const [importStatus, setImportStatus] = useState("");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

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

  const clearStatus = useCallback(() => {
    setImportStatus("");
  }, []);

  return (
    <div className="data-management-page">
      <div className="data-section">
        <h3 style={{ color: theme.colors.accent }}>
          <i className="fas fa-database"></i> Data Management
        </h3>
        <p style={{ color: theme.colors.textSecondary }}>
          Import and export your notes data. Keep your notes safe and portable.
        </p>

        <div className="data-operations">
          <div className="data-operation-card">
            <div className="operation-header">
              <i
                className="fas fa-download"
                style={{ color: theme.colors.primary }}
              ></i>
              <h4>Export Data</h4>
            </div>
            <p>
              Select and download specific subjects as a JSON file. You can
              choose which subjects to include in your export.
            </p>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="operation-button export-button"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.background,
              }}
            >
              <i className="fas fa-download"></i> Export Notes
            </button>
          </div>

          <div className="data-operation-card">
            <div className="operation-header">
              <i
                className="fas fa-upload"
                style={{ color: theme.colors.accent }}
              ></i>
              <h4>Import Data</h4>
            </div>
            <p>
              Upload a previously exported JSON file. Imported subjects will be
              added to your existing notes.
            </p>
            {isImporting ? (
              <div className="importing-state">
                <Loader size="small" message="Importing..." />
              </div>
            ) : (
              <label
                className="operation-button import-button"
                style={{
                  backgroundColor: theme.colors.accent,
                  color: theme.colors.background,
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
          <div className="status-container">
            <div
              className={`status-message ${importStatus.includes("failed") || importStatus.includes("Import failed") ? "error" : "success"}`}
            >
              <div className="status-content">
                <i
                  className={`fas ${importStatus.includes("failed") ? "fa-exclamation-circle" : "fa-check-circle"}`}
                ></i>
                <span>{importStatus}</span>
              </div>
              <button
                onClick={clearStatus}
                className="status-close"
                style={{ color: "inherit" }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}

        <div className="data-info">
          <h4>Data Format Information</h4>
          <ul>
            <li>Exported files are in JSON format</li>
            <li>All note content, colors, and metadata are preserved</li>
            <li>Import appends to existing data (doesn't replace)</li>
            <li>Subject IDs are automatically adjusted to prevent conflicts</li>
          </ul>
        </div>
      </div>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};

export default React.memo(DataManagementPage);
