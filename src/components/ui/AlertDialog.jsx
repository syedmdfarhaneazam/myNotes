import "../../styles/alert-dialog.css";

export default function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  if (!open) return null;

  return (
    <div className="alert-overlay">
      <div className="alert-dialog animate-scale-in">
        <div className="alert-header">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="alert-footer">
          <button
            className="btn btn-secondary"
            onClick={() => onOpenChange(false)}
          >
            {cancelText}
          </button>
          <button
            className="btn btn-destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
