import React from "react";
import { useTheme } from "../context/ThemeContext";
import "../style/Loader.css";

const Loader = ({ size = "medium", message = "Loading..." }) => {
  const { theme } = useTheme();

  return (
    <div className="loader-container">
      <div
        className={`loader-spinner ${size}`}
        style={{
          borderTopColor: theme.colors.primary,
          borderRightColor: theme.colors.secondary,
        }}
      />
      <p
        className="loader-message"
        style={{ color: theme.colors.textSecondary }}
      >
        {message}
      </p>
    </div>
  );
};

export default React.memo(Loader);
