import { useState } from "react";
import { ChevronUp, ChevronDown, Trash2, MessageSquare, X } from "lucide-react";
import ColorPicker from "../ui/ColorPicker.jsx";
import AlertDialog from "../ui/AlertDialog.jsx";
import "../../styles/note-renderer.css";

export default function NoteRenderer({
  note,
  onUpdate,
  onCommentChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  onColorChange,
  canMoveUp,
  canMoveDown,
}) {
  const [showComment, setShowComment] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onUpdate(note.id, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const renderNoteContent = () => {
    const style = { color: note.color || "inherit" };

    switch (note.type) {
      case "Heading":
        return (
          <h1 className="heading-text" style={style}>
            <textarea
              value={note.value}
              onChange={(e) => onUpdate(note.id, e.target.value)}
              placeholder="Enter heading"
              className="heading-input"
              rows={1}
            />
          </h1>
        );

      case "SubHeading":
        return (
          <h2 className="subheading-text" style={style}>
            <textarea
              value={note.value}
              onChange={(e) => onUpdate(note.id, e.target.value)}
              placeholder="Enter subheading"
              className="subheading-input"
              rows={1}
            />
          </h2>
        );

      case "SubSubHeading":
        return (
          <h3 className="subsubheading-text" style={style}>
            <textarea
              value={note.value}
              onChange={(e) => onUpdate(note.id, e.target.value)}
              placeholder="Enter sub-subheading"
              className="subsubheading-input"
              rows={1}
            />
          </h3>
        );

      case "Content":
        return (
          <div style={style}>
            <textarea
              value={note.value}
              onChange={(e) => onUpdate(note.id, e.target.value)}
              placeholder="Enter content"
              className="content-input"
              rows={Math.max(1, note.value.split("\n").length)}
            />
          </div>
        );

      case "Code":
        return (
          <div className="code-block">
            <div className="code-header">
              <select
                value={note.language || "javascript"}
                onChange={(e) => onUpdate(note.id, note.value, e.target.value)}
                className="language-select"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="sql">SQL</option>
              </select>
            </div>
            <textarea
              value={note.value}
              onChange={(e) => onUpdate(note.id, e.target.value)}
              placeholder="Enter code"
              className="code-input"
              rows={Math.max(4, note.value.split("\n").length)}
            />
          </div>
        );

      case "Image":
        return (
          <div className="image-block">
            {note.value ? (
              <img
                src={note.value || "/placeholder.svg?height=200&width=300"}
                alt="Uploaded"
                className="uploaded-image"
              />
            ) : (
              <div className="image-placeholder">
                <p>No image uploaded</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="image-input"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="note-card"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {renderNoteContent()}

      {note.comment && (
        <div className="note-comment-display">{note.comment}</div>
      )}

      {showComment && (
        <div className="note-comment-input animate-slide-in">
          <input
            value={note.comment || ""}
            onChange={(e) => onCommentChange(note.id, e.target.value)}
            placeholder="Add a comment..."
            className="input"
          />
        </div>
      )}

      <div className={`note-controls ${showControls ? "visible" : ""}`}>
        <ColorPicker
          color={note.color || "#000000"}
          onChange={(color) => onColorChange(note.id, color)}
        />

        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setShowComment(!showComment)}
        >
          {showComment ? <X size={16} /> : <MessageSquare size={16} />}
        </button>

        <button
          className="btn btn-ghost btn-sm"
          onClick={onMoveUp}
          disabled={!canMoveUp}
        >
          <ChevronUp size={16} />
        </button>

        <button
          className="btn btn-ghost btn-sm"
          onClick={onMoveDown}
          disabled={!canMoveDown}
        >
          <ChevronDown size={16} />
        </button>

        <button
          className="btn btn-ghost btn-sm btn-destructive"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Note"
        description="Are you sure you want to delete this note? This action cannot be undone."
        onConfirm={() => onDelete(note.id)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
