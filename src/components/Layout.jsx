import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeContext";
import { useNotes } from "../context/NotesContext";
import { useEffect } from "react";
import "../style/Layout.css";
import Help from "./Help";

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
          case "n":
            navigate("/notes");
            break;
          case "1":
            addNote("Heading");
            break;
          case "2":
            addNote("SubHeading");
            break;
          case "3":
            addNote("SubSubHeading");
            break;
          case "4":
            addNote("Content");
            break;
          case "5":
            addNote("Code");
            break;
          case "g":
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
            break;
          default:
            break;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
        <button
          className="scroll-down-btn"
          onClick={() =>
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          ⬇
        </button>
      </main>
      <Help />
    </div>
  );
}

export default Layout;
