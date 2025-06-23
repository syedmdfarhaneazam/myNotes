import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../context/ThemeContext";
import "../style/Help.css";

function Help() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key.toLowerCase() === "h") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    if (isOpen) document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const modalContent = isOpen && (
    <div
      className="help-overlay"
      onClick={handleOverlayClick}
      style={{
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        className="help-modal"
        style={{
          backgroundColor: theme.colors.surface,
          color: theme.colors.text,
          borderColor: theme.colors.border,
        }}
      >
        <div className="help-header">
          <h3 className="help-title">Keyboard Shortcuts</h3>
          <button
            className="help-close"
            style={{ color: theme.colors.textSecondary }}
            onClick={() => setIsOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="shortcuts-list">
          <p>
            <kbd>esc</kbd>: To exit help
          </p>
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
            <kbd>Alt+G</kbd>: Scroll to Bottom
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default Help;
