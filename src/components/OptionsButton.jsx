import { useState } from "react";
import ColorPicker from "./ColorPicker";
import Delete from "./Delete";
import "../style/OptionsButton.css";

function OptionsButton({
  id,
  onColorChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  currentColor,
  canMoveUp = true,
  canMoveDown = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleToggle = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    setIsOpen(false);
  };

  const handleDeleteConfirm = () => {
    onDelete(id);
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleAction = (action) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="options-container">
      {isOpen && (
        <div className={`options-menu ${isClosing ? "closing" : "open"}`}>
          <ColorPicker
            currentColor={currentColor}
            onColorChange={(color) => onColorChange(id, color)}
          />

          <button
            onClick={() => handleAction(() => onMoveUp(id))}
            disabled={!canMoveUp}
            title="Move up"
          >
            <i className="fas fa-arrow-up"></i>
          </button>

          <button
            onClick={() => handleAction(() => onMoveDown(id))}
            disabled={!canMoveDown}
            title="Move down"
          >
            <i className="fas fa-arrow-down"></i>
          </button>

          <button
            onClick={handleDeleteClick}
            title="Delete"
            style={{ color: "#ef4444" }}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      )}

      <button
        className={`options-toggle ${isOpen ? "active" : ""}`}
        onClick={handleToggle}
        title="Options"
      >
        <i className="fas fa-ellipsis-h"></i>
      </button>

      <Delete
        isOpen={showDeleteModal}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        itemName="item"
      />
    </div>
  );
}

export default OptionsButton;
