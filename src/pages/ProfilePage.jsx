import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../style/ProfilePage.css";

function ProfilePage() {
  const { theme } = useTheme();
  const location = useLocation();

  const tabs = [
    {
      id: "appearance",
      label: "Appearance",
      path: "/profile/appearance",
      icon: "fas fa-palette",
    },
    {
      id: "data",
      label: "Data Management",
      path: "/profile/data",
      icon: "fas fa-database",
    },
    {
      id: "general",
      label: "General Settings",
      path: "/profile/general",
      icon: "fas fa-cog",
    },
  ];

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes("/appearance")) return "appearance";
    if (path.includes("/data")) return "data";
    if (path.includes("/general")) return "general";
    return "appearance"; // default
  };

  const activeTab = getActiveTab();

  return (
    <div className="profile-page" style={{ color: theme.colors.text }}>
      <div className="profile-container">
        <h2 style={{ color: theme.colors.accent }}>Profile Settings</h2>

        <div className="profile-tabs">
          <div className="tab-navigation">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                style={{
                  backgroundColor:
                    activeTab === tab.id ? theme.colors.primary : "transparent",
                  color:
                    activeTab === tab.id
                      ? theme.colors.background
                      : theme.colors.text,
                  borderColor: theme.colors.border,
                }}
              >
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
              </Link>
            ))}
          </div>

          <div
            className="tab-content"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProfilePage);
