import React from "react";
import { useTheme } from "../context/ThemeContext";
import "../style/ErrorBoundary.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to console for debugging
    console.error("Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          onRetry={() =>
            this.setState({ hasError: false, error: null, errorInfo: null })
          }
        />
      );
    }

    return this.props.children;
  }
}

const ErrorFallback = ({ error, onRetry }) => {
  const { theme } = useTheme();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div
      className="error-boundary-container"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      <div
        className="error-boundary-content"
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        }}
      >
        <div className="error-icon">
          <i
            className="fas fa-exclamation-triangle"
            style={{ color: "#ef4444" }}
          ></i>
        </div>

        <h2 style={{ color: theme.colors.accent }}>
          Oops! Something went wrong
        </h2>

        <p style={{ color: theme.colors.textSecondary }}>
          We encountered an unexpected error. Don't worry, your data is safe.
        </p>

        {error && (
          <details className="error-details">
            <summary style={{ color: theme.colors.textSecondary }}>
              Error Details (for developers)
            </summary>
            <pre
              style={{
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              }}
            >
              {error.toString()}
            </pre>
          </details>
        )}

        <div className="error-actions">
          <button
            onClick={onRetry}
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.background,
            }}
          >
            Try Again
          </button>
          <button
            onClick={handleReload}
            style={{
              backgroundColor: theme.colors.accent,
              color: theme.colors.background,
            }}
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
