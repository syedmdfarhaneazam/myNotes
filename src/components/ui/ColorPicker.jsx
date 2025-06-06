import { useState } from "react";
import { Palette } from "lucide-react";
import "../../styles/color-picker.css";

const predefinedColors = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#64748b",
  "#374151",
  "#111827",
];

export default function ColorPicker({ color, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="color-picker">
      <button
        className="btn btn-ghost btn-sm color-trigger"
        onClick={() => setOpen(!open)}
      >
        <Palette size={16} />
      </button>

      {open && (
        <div className="color-popover animate-scale-in">
          <div className="color-content">
            <h4>Choose Color</h4>
            <div className="color-grid">
              {predefinedColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className="color-swatch"
                  style={{ backgroundColor: presetColor }}
                  onClick={() => {
                    onChange(presetColor);
                    setOpen(false);
                  }}
                />
              ))}
            </div>
            <div className="custom-color">
              <label>Custom Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="color-input"
              />
            </div>
          </div>
        </div>
      )}

      {open && <div className="color-overlay" onClick={() => setOpen(false)} />}
    </div>
  );
}
