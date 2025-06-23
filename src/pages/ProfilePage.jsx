import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { getSubjects, saveSubjects } from "../indexedDb";
import "../style/ProfilePage.css";

function ProfilePage() {
  const { theme, userName, changeUserName } = useTheme();
  const [name, setName] = useState(userName);
  const [importStatus, setImportStatus] = useState("");
  const [exportStatus, setExportStatus] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const saveUserName = () => {
    changeUserName(name);
    setExportStatus("Username updated successfully!");
    setTimeout(() => setExportStatus(""), 3000);
  };

  const exportData = async () => {
    try {
      const data = await getSubjects();
      if (!data) {
        setExportStatus("No data to export");
        return;
      }

      const jsonString = JSON.stringify(data);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `notes-export-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setExportStatus("Data exported successfully!");
      setTimeout(() => setExportStatus(""), 3000);
    } catch (error) {
      console.error("Export failed:", error);
      setExportStatus("Export failed. Please try again.");
    }
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target.result);
        await saveSubjects(data);
        setImportStatus("Data imported successfully!");
        setTimeout(() => setImportStatus(""), 3000);
      } catch (error) {
        console.error("Import failed:", error);
        setImportStatus("Import failed. Please check your file format.");
      }
    };
    reader.readAsText(file);
  };

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
              <kbd>Alt+H</kbd>: Add Heading
            </p>
            <p>
              <kbd>Alt+S</kbd>: Add SubHeading
            </p>
            <p>
              <kbd>Alt+X</kbd>: Add SubSubHeading
            </p>
            <p>
              <kbd>Alt+C</kbd>: Add Content
            </p>
            <p>
              <kbd>Alt+D</kbd>: Add Code
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
              <p>Download all your notes as a JSON file</p>
              <button
                onClick={exportData}
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.text,
                }}
              >
                Export Notes
              </button>
              {exportStatus && <p className="status-message">{exportStatus}</p>}
            </div>

            <div className="import-section">
              <h4>Import Data</h4>
              <p>Upload a previously exported JSON file</p>
              <label
                className="import-button"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.text,
                }}
              >
                Import Notes
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  style={{ display: "none" }}
                />
              </label>
              {importStatus && <p className="status-message">{importStatus}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
