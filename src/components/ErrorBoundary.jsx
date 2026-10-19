import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('The Carat Theory App Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '3rem 1.5rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: '#55142A', fontSize: '2rem', marginBottom: '1rem' }}>
            The Carat Theory
          </h2>
          <p style={{ color: '#666', maxWidth: '500px', marginBottom: '2rem' }}>
            A temporary display issue occurred while rendering this view.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.hash = '';
              window.location.reload();
            }}
            style={{
              background: '#55142A',
              color: '#FFF',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Reload Storefront
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
