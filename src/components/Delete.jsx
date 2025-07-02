import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "../style/Delete.css";

function Delete({ isOpen, onConfirm, onCancel, itemName = "item" }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onCancel]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  const overlayContent = isOpen && (
    <div className="delete-overlay" onClick={handleOverlayClick}>
      <div className="delete-modal">
        <div className="delete-header">
          <div className="delete-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h3 className="delete-title">Confirm Deletion</h3>
          <button className="delete-close" onClick={handleCancel}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="delete-content">
          <p className="delete-message">
            Are you sure you want to delete this {itemName}?
          </p>
          <p className="delete-warning">This action cannot be undone.</p>
        </div>

        <div className="delete-actions">
          <button className="delete-cancel-btn" onClick={handleCancel}>
            <i className="fas fa-times"></i>
            Cancel
          </button>
          <button className="delete-confirm-btn" onClick={handleConfirm}>
            <i className="fas fa-trash"></i>
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return <>{isOpen && createPortal(overlayContent, document.body)}</>;
}

export default Delete;
