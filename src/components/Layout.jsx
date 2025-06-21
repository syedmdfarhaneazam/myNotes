import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeContext";
import { useNotes } from "../context/NotesContext";
import { useEffect } from "react";
import "../style/Layout.css";

function Layout() {
  const { theme } = useTheme();
  const { addNote } = useNotes();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey) {
        event.preventDefault();

        switch (event.key.toLowerCase()) {
          case "p":
            navigate("/profile");
            break;
          case "h":
            addNote("Heading");
            break;
          case "s":
            addNote("SubHeading");
            break;
          case "x":
            addNote("SubSubHeading");
            break;
          case "c":
            addNote("Content");
            break;
          case "d":
            addNote("Code");
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [addNote, navigate]);

  return (
    <div
      className="app-layout"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
