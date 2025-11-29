import React from 'react';
import Toast from './Toast';

function ToastContainer({ toasts, removeToast }) {
  return (
    <div style={{ position: 'fixed', top: '80px', right: '20px', zIndex: 9999 }}>
      {toasts.map((toast) => (
        <div key={toast.id} style={{ marginBottom: '10px' }}>
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration}
          />
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;

