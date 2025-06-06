import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNotes } from "../../hooks/useNotes.jsx";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import {
  BookOpen,
  User,
  Menu,
  X,
  Plus,
  Heading1,
  Heading2,
  Heading3,
  Type,
  Code,
  ImageIcon,
  Moon,
  Sun,
} from "lucide-react";
import "../../styles/navbar.css";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { addNote } = useNotes();
  const { theme, toggleTheme } = useTheme();

  const isNotesPage = location.pathname === "/notes";

  const noteTypes = [
    { type: "Heading", icon: Heading1, label: "Heading" },
    { type: "SubHeading", icon: Heading2, label: "Sub Heading" },
    { type: "SubSubHeading", icon: Heading3, label: "Sub Sub Heading" },
    { type: "Content", icon: Type, label: "Content" },
    { type: "Code", icon: Code, label: "Code" },
    { type: "Image", icon: ImageIcon, label: "Image" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <Link to="/notes" className="brand-link">
              <BookOpen size={24} />
              <span>My Notes</span>
            </Link>
          </div>

          <div className="navbar-desktop">
            {isNotesPage && (
              <>
                {noteTypes.map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    className="btn btn-ghost btn-sm"
                    onClick={() => addNote(type)}
                  >
                    <Plus size={12} />
                    <Icon size={12} />
                    <span className="desktop-only">{label}</span>
                  </button>
                ))}
                <div className="navbar-divider" />
              </>
            )}

            <Link
              to="/profile"
              className={`btn btn-ghost btn-sm ${location.pathname === "/profile" ? "active" : ""}`}
            >
              <User size={16} />
              <span className="desktop-only">Profile</span>
            </Link>

            <button className="btn btn-ghost btn-sm" onClick={toggleTheme}>
              {theme === "light" ? (
                <>
                  <Moon size={16} />
                  <span className="desktop-only">Dark</span>
                </>
              ) : (
                <>
                  <Sun size={16} />
                  <span className="desktop-only">Light</span>
                </>
              )}
            </button>
          </div>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="navbar-mobile animate-slide-in">
            <div className="mobile-menu">
              {isNotesPage && (
                <>
                  <div className="mobile-section-title">Add Notes</div>
                  {noteTypes.map(({ type, icon: Icon, label }) => (
                    <button
                      key={type}
                      className="btn btn-ghost mobile-btn"
                      onClick={() => {
                        addNote(type);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Plus size={16} />
                      <Icon size={16} />
                      {label}
                    </button>
                  ))}
                  <div className="mobile-divider" />
                </>
              )}

              <Link
                to="/profile"
                className="btn btn-ghost mobile-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={16} />
                Profile
              </Link>

              <button
                className="btn btn-ghost mobile-btn"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <>
                    <Moon size={16} />
                    Dark Mode
                  </>
                ) : (
                  <>
                    <Sun size={16} />
                    Light Mode
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
