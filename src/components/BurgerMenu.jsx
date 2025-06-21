import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "../style/BurgerMenu.css";

function BurgerMenu({ children }) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="burger-menu">
      <button
        className="burger-icon"
        onClick={toggleMenu}
        style={{ color: theme.colors.text }}
      >
        <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>
      <div
        className={`burger-content ${isOpen ? "open" : ""}`}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          color: theme.colors.text,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default BurgerMenu;
