import React, { useEffect } from 'react';

function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === 'success' ? 'bg-success' : 
                  type === 'error' ? 'bg-danger' : 
                  type === 'warning' ? 'bg-warning' : 'bg-info';

  return (
    <div 
      className={`toast show position-fixed top-0 end-0 m-3 ${bgColor} text-white`}
      role="alert"
      style={{ 
        zIndex: 9999,
        minWidth: '300px',
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      <div className="toast-header bg-transparent text-white border-0">
        <strong className="me-auto">
          {type === 'success' && '✅'}
          {type === 'error' && '❌'}
          {type === 'warning' && '⚠️'}
          {type === 'info' && 'ℹ️'}
          {' '}{type.charAt(0).toUpperCase() + type.slice(1)}
        </strong>
        <button 
          type="button" 
          className="btn-close btn-close-white" 
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">
        {message}
      </div>
    </div>
  );
}

export default Toast;

