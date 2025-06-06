import { useState } from "react";
import { useToast } from "../../hooks/useToast.jsx";
import "../../styles/help-ticket-modal.css";

export default function HelpTicketModal({ open, onOpenChange }) {
  const [ticketType, setTicketType] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ticketType || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Ticket Submitted",
        description:
          "Your support ticket has been submitted successfully. We'll get back to you soon!",
      });

      setTicketType("");
      setEmail("");
      setDescription("");
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-dialog animate-scale-in">
        <div className="modal-header">
          <h3>Submit Support Ticket</h3>
          <p>Tell us about your issue or suggestion and we'll help you out.</p>
        </div>

        <form onSubmit={handleSubmit} className="modal-content">
          <div className="form-group">
            <label htmlFor="ticketType">Type of Request *</label>
            <select
              id="ticketType"
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
              className="select"
              required
            >
              <option value="">Select request type</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="help">General Help</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email (Optional)</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe your issue or suggestion in detail..."
              rows={4}
              className="textarea"
              required
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
