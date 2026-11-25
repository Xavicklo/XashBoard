import React from "react";

// Shows the error on screen instead of React's default blank page, so a crash on a
// phone (where there is no console to look at) can be read and reported.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <div style={{ padding: 24, fontFamily: "sans-serif", color: "#edf2f7", background: "#20232A", minHeight: "100vh" }}>
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>Something went wrong</h1>
        <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, marginTop: 12, color: "#fca5a5" }}>
          {String(error && (error.stack || error.message || error))}
        </pre>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{ marginTop: 16, padding: "8px 16px", borderRadius: 10, background: "#0497cc", color: "white" }}
        >
          Reload
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
