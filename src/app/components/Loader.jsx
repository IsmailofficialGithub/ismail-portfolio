import React, { useEffect } from 'react';

const Loader = ({ size = 30, color = '#3498db', speed = 1 }) => {
  // Define inline styles for loader
  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: `${size + 60}px`,
  };

  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    border: `${size * 0.1}px solid rgba(0, 0, 0, 0.1)`,
    borderTop: `${size * 0.1}px solid ${color}`,
    borderRadius: '50%',
    animation: `spin ${speed}s linear infinite`,
  };

  // Only add keyframes on the client side
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const styles = document.createElement('style');
      styles.innerHTML = `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(styles);

      // Cleanup style element when component unmounts
      return () => {
        document.head.removeChild(styles);
      };
    }
  }, []);

  return (
    <div style={loaderStyle}>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Loader;
