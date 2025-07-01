import React, { useState, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNotes } from "../context/NotesContext";
import Loader from "./Loader";
import "../style/ExportModal.css";

const ExportModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const { subjects } = useNotes();
  const [selectedSubjects, setSelectedSubjects] = useState(new Set());
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState("");

  const allSelected = useMemo(
    () => selectedSubjects.size === subjects.length,
    [selectedSubjects.size, subjects.length],
  );

  const handleSubjectToggle = (subjectId) => {
    setSelectedSubjects((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(subjectId)) {
        newSet.delete(subjectId);
      } else {
        newSet.add(subjectId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedSubjects(new Set());
    } else {
      setSelectedSubjects(new Set(subjects.map((s) => s.id)));
    }
  };

  const handleExport = async () => {
    if (selectedSubjects.size === 0) {
      setExportStatus("Please select at least one subject to export.");
      setTimeout(() => setExportStatus(""), 3000);
      return;
    }

    setIsExporting(true);

    try {
      const subjectsToExport = subjects.filter((s) =>
        selectedSubjects.has(s.id),
      );
      const exportData = {
        exportDate: new Date().toISOString(),
        version: "1.0",
        subjects: subjectsToExport,
      };

      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      const fileName = `notes-export-${selectedSubjects.size}-subjects-${new Date().toISOString().slice(0, 10)}.json`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setExportStatus(
        `Successfully exported ${selectedSubjects.size} subject(s)!`,
      );
      setTimeout(() => {
        setExportStatus("");
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Export failed:", error);
      setExportStatus("Export failed. Please try again.");
      setTimeout(() => setExportStatus(""), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isExporting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="export-modal-overlay" onClick={handleOverlayClick}>
      <div
        className="export-modal-content"
        style={{
          backgroundColor: theme.colors.surface,
          color: theme.colors.text,
          borderColor: theme.colors.border,
        }}
      >
        <div className="export-modal-header">
          <h3 style={{ color: theme.colors.accent }}>Export Notes</h3>
          {!isExporting && (
            <button
              className="export-modal-close"
              onClick={onClose}
              style={{ color: theme.colors.textSecondary }}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        {isExporting ? (
          <div className="export-loading">
            <Loader message="Exporting your notes..." />
          </div>
        ) : (
          <>
            <div className="export-modal-body">
              <p style={{ color: theme.colors.textSecondary }}>
                Select the subjects you want to export:
              </p>

              <div className="subject-selection">
                <label className="select-all-option">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                  />
                  <span>Select All ({subjects.length} subjects)</span>
                </label>

                <div className="subjects-list">
                  {subjects.map((subject) => (
                    <label key={subject.id} className="subject-option">
                      <input
                        type="checkbox"
                        checked={selectedSubjects.has(subject.id)}
                        onChange={() => handleSubjectToggle(subject.id)}
                      />
                      <span>{subject.name}</span>
                      <small>({subject.notes.length} notes)</small>
                    </label>
                  ))}
                </div>
              </div>

              {exportStatus && (
                <div
                  className={`export-status ${exportStatus.includes("failed") ? "error" : "success"}`}
                >
                  {exportStatus}
                </div>
              )}
            </div>

            <div className="export-modal-footer">
              <button
                onClick={onClose}
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.background,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                disabled={selectedSubjects.size === 0}
                style={{
                  backgroundColor:
                    selectedSubjects.size > 0
                      ? theme.colors.accent
                      : theme.colors.border,
                  color: theme.colors.background,
                }}
              >
                Export{" "}
                {selectedSubjects.size > 0 ? `(${selectedSubjects.size})` : ""}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(ExportModal);
