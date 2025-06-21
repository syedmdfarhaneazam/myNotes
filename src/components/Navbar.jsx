import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useNotes } from "../context/NotesContext";
import Subject from "./Subject";
import BurgerMenu from "./BurgerMenu";
import "../style/Navbar.css";

function Navbar() {
  const { theme, currentTheme, changeTheme, themeOptions, userName } =
    useTheme();
  const {
    subjects,
    currentSubjectId,
    setCurrentSubjectId,
    addSubject,
    deleteSubject,
    addNote,
  } = useNotes();
  const location = useLocation();
  const isNotesPage = location.pathname === "/notes";

  const handleThemeChange = (e) => {
    changeTheme(e.target.value);
  };

  return (
    <nav
      className="navbar"
      style={{
        color: theme.colors.text,
        borderBottomColor: theme.colors.border,
      }}
    >
      <div className="navbar-brand">
        <h1>{userName}</h1>
        {isNotesPage && (
          <Subject
            subjects={subjects}
            currentSubjectId={currentSubjectId}
            setCurrentSubjectId={setCurrentSubjectId}
            addSubject={addSubject}
            deleteSubject={deleteSubject}
          />
        )}
      </div>

      <div className="navbar-menu">
        <BurgerMenu>
          {isNotesPage && (
            <div className="navbar-controls">
              <div className="navbar-buttons">
                <button
                  className="nav-button"
                  onClick={() => addNote("Heading")}
                  style={{
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.text,
                  }}
                >
                  <i className="fas fa-heading"></i> Heading
                </button>
                <button
                  className="nav-button"
                  onClick={() => addNote("SubHeading")}
                  style={{
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.text,
                  }}
                >
                  <i className="fas fa-heading"></i> SubHeading
                </button>
                <button
                  className="nav-button"
                  onClick={() => addNote("SubSubHeading")}
                  style={{
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.text,
                  }}
                >
                  <i className="fas fa-heading"></i> SubSubHeading
                </button>
                <button
                  className="nav-button"
                  onClick={() => addNote("Content")}
                  style={{
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.text,
                  }}
                >
                  <i className="fas fa-paragraph"></i> Content
                </button>
                <button
                  className="nav-button"
                  onClick={() => addNote("Code")}
                  style={{
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.text,
                  }}
                >
                  <i className="fas fa-code"></i> Code
                </button>
                <button
                  className="nav-button"
                  onClick={() => addNote("Image")}
                  style={{
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.text,
                  }}
                >
                  <i className="fas fa-image"></i> Image
                </button>
              </div>
            </div>
          )}
          <div className="navbar-right">
            <div className="theme-selector">
              <select
                value={currentTheme}
                onChange={handleThemeChange}
                style={{
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                }}
                aria-label="Select theme"
                title="Choose a theme"
              >
                {Object.keys(themeOptions).map((themeKey) => (
                  <option key={themeKey} value={themeKey}>
                    {themeOptions[themeKey].name}
                  </option>
                ))}
              </select>
            </div>
            <div className="nav-links">
              <Link
                to="/notes"
                className="nav-link"
                style={{ color: theme.colors.text }}
              >
                <i className="fas fa-sticky-note"></i> Notes
              </Link>
              <Link
                to="/profile"
                className="nav-link"
                style={{ color: theme.colors.text }}
              >
                <i className="fas fa-user"></i> Profile
              </Link>
            </div>
          </div>
        </BurgerMenu>
        <div className="navbar-desktop">
          {isNotesPage && (
            <div className="navbar-controls">
              <div className="navbar-buttons">
                <button
                  className="nav-button"
                  onClick={() => addNote("Heading")}
                  style={{
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.text,
                  }}
                >
                  <i className="fas fa-heading"></i> Heading
                </button>
                <button
                  className="nav-button"
                  onClick={() => addNote("SubHeading")}
                  style={{
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.text,
                  }}
                >
                  <i className="fas fa-heading"></i> SubHeading
                </button>
                <button
                  className="nav-button"
                  onClick={() => addNote("SubSubHeading")}
                  style={{
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.text,
                  }}
                >
                  <i className="fas fa-heading"></i> SubSubHeading
                </button>
                <button
                  className="nav-button"
                  onClick={() => addNote("Content")}
                  style={{
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.text,
                  }}
                >
                  <i className="fas fa-paragraph"></i> Content
                </button>
                <button
                  className="nav-button"
                  onClick={() => addNote("Code")}
                  style={{
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.text,
                  }}
                >
                  <i className="fas fa-code"></i> Code
                </button>
                <button
                  className="nav-button"
                  onClick={() => addNote("Image")}
                  style={{
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.text,
                  }}
                >
                  <i className="fas fa-image"></i> Image
                </button>
              </div>
            </div>
          )}
          <div className="navbar-right">
            <div className="theme-selector">
              <select
                value={currentTheme}
                onChange={handleThemeChange}
                style={{
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                }}
                aria-label="Select theme"
                title="Choose a theme"
              >
                {Object.keys(themeOptions).map((themeKey) => (
                  <option key={themeKey} value={themeKey}>
                    {themeOptions[themeKey].name}
                  </option>
                ))}
              </select>
            </div>
            <div className="nav-links">
              <Link
                to="/notes"
                className="nav-link"
                style={{ color: theme.colors.text }}
              >
                <i className="fas fa-sticky-note"></i> Notes
              </Link>
              <Link
                to="/profile"
                className="nav-link"
                style={{ color: theme.colors.text }}
              >
                <i className="fas fa-user"></i> Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
