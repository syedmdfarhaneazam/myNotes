import { useState, useEffect } from "react";
import { X } from "lucide-react";
import "../../styles/toaster.css";

let toastId = 0;
const toasts = [];
const listeners = [];

export function toast({ title, description, variant = "default" }) {
  const id = toastId++;
  const newToast = { id, title, description, variant };

  toasts.push(newToast);
  listeners.forEach((listener) => listener([...toasts]));

  setTimeout(() => {
    const index = toasts.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.splice(index, 1);
      listeners.forEach((listener) => listener([...toasts]));
    }
  }, 5000);
}

export function Toaster() {
  const [toastList, setToastList] = useState([]);

  useEffect(() => {
    listeners.push(setToastList);
    return () => {
      const index = listeners.indexOf(setToastList);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  const removeToast = (id) => {
    const index = toasts.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.splice(index, 1);
      setToastList([...toasts]);
    }
  };

  return (
    <div className="toaster">
      {toastList.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.variant} animate-slide-in`}
        >
          <div className="toast-content">
            <div className="toast-title">{toast.title}</div>
            {toast.description && (
              <div className="toast-description">{toast.description}</div>
            )}
          </div>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
