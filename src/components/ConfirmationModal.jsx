import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import "../style/ConfirmationModal.css";

function ConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  const { theme } = useTheme();
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsAnimatingOut(false);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm();
    animateAndClose();
  };

  const handleCancel = () => {
    animateAndClose();
  };

  const animateAndClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onCancel();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`confirmation-modal-overlay ${isAnimatingOut ? "fade-out" : "fade-in"}`}
    >
      <div
        className={`confirmation-modal-content ${isAnimatingOut ? "scale-out" : "scale-in"}`}
        style={{
          backgroundColor: theme.colors.surface,
          color: theme.colors.text,
          borderColor: theme.colors.border,
        }}
      >
        {title && <h3 className="confirmation-modal-title">{title}</h3>}
        <p className="confirmation-modal-message">{message}</p>
        <div className="confirmation-modal-buttons">
          <button
            onClick={handleConfirm}
            className="confirmation-modal-confirm"
            style={{
              backgroundColor: theme.colors.accent,
              color: theme.colors.background,
            }}
          >
            {confirmText}
          </button>
          <button
            onClick={handleCancel}
            className="confirmation-modal-cancel"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.background,
            }}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
