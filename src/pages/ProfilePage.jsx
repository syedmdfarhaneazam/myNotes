import { useState } from "react";
import { useProfile } from "../hooks/useProfile.jsx";
import { useToast } from "../hooks/useToast.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";
import HelpTicketModal from "../components/profile/HelpTicketModal.jsx";
import { Download, Upload, HelpCircle, User, Palette } from "lucide-react";
import "../styles/profile.css";

export default function ProfilePage() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const { userName, setUserName, exportData, importData } = useProfile();
  const { theme, setTheme, availableThemes } = useTheme();
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      await exportData();
      toast({
        title: "Export Successful",
        description: "Your notes have been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export your notes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await importData(file);
      toast({
        title: "Import Successful",
        description: "Your notes have been imported successfully.",
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description:
          "Failed to import your notes. Please check the file format.",
        variant: "destructive",
      });
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    toast({
      title: "Theme Changed",
      description: `Switched to ${availableThemes.find((t) => t.id === newTheme)?.name} theme`,
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-content animate-fade-in">
        <div className="profile-header">
          <h1>Profile Settings</h1>
          <p>Manage your account and data preferences</p>
        </div>

        <div className="profile-grid">
          <div className="profile-card animate-slide-in">
            <div className="card-header">
              <h3>
                <User size={20} /> Personal Information
              </h3>
              <p>Update your personal details</p>
            </div>
            <div className="card-content">
              <div className="form-group">
                <label htmlFor="userName">Your Name</label>
                <input
                  id="userName"
                  className="input"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
            </div>
          </div>

          <div
            className="profile-card animate-slide-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="card-header">
              <h3>
                <HelpCircle size={20} /> Support
              </h3>
              <p>Get help or provide feedback</p>
            </div>
            <div className="card-content">
              <button
                onClick={() => setShowHelpModal(true)}
                className="btn btn-secondary full-width"
              >
                Raise Support Ticket
              </button>
            </div>
          </div>

          <div
            className="profile-card theme-card animate-slide-in"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="card-header">
              <h3>
                <Palette size={20} /> Theme Selection
              </h3>
              <p>Choose your preferred color theme</p>
            </div>
            <div className="card-content">
              <div className="theme-grid">
                {availableThemes.map((themeOption) => (
                  <button
                    key={themeOption.id}
                    className={`theme-option ${theme === themeOption.id ? "active" : ""}`}
                    onClick={() => handleThemeChange(themeOption.id)}
                  >
                    <div className={`theme-preview ${themeOption.id}`}>
                      <div className="theme-color-1"></div>
                      <div className="theme-color-2"></div>
                      <div className="theme-color-3"></div>
                    </div>
                    <div className="theme-info">
                      <span className="theme-name">{themeOption.name}</span>
                      <span className="theme-description">
                        {themeOption.description}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className="profile-card data-management animate-slide-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="card-header">
              <h3>Data Management</h3>
              <p>Export or import your notes data for backup or transfer</p>
            </div>
            <div className="card-content">
              <div className="data-buttons">
                <button onClick={handleExport} className="btn btn-primary">
                  <Download size={16} />
                  Export Notes
                </button>
                <div className="import-wrapper">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="file-input"
                  />
                  <button className="btn btn-secondary">
                    <Upload size={16} />
                    Import Notes
                  </button>
                </div>
              </div>
              <p className="data-description">
                Export creates a JSON file with all your notes. Import allows
                you to restore from a previously exported file.
              </p>
            </div>
          </div>
        </div>
      </div>

      <HelpTicketModal open={showHelpModal} onOpenChange={setShowHelpModal} />
    </div>
  );
}
