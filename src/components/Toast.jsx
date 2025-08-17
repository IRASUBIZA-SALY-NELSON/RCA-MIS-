import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyle = () => {
    const baseStyle = {
      position: 'fixed',
      top: '20px',
      right: '20px', // Mobile responsive - full width on small screens
      left: '20px', 
      padding: '12px 16px',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      color: 'white',
      fontSize: '14px',
      fontWeight: '500',
      maxWidth: '400px',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      animation: 'slideInRight 0.3s ease-out',
      cursor: 'pointer'
    };

    // Responsive adjustments
    if (window.innerWidth <= 768) {
      baseStyle.right = '20px';
      baseStyle.left = '20px';
      baseStyle.maxWidth = 'none';
      baseStyle.padding = '16px 20px';
      baseStyle.fontSize = '16px';
    }

    const typeStyles = {
      success: {
        backgroundColor: '#10b981',
        borderLeft: '4px solid #059669'
      },
      error: {
        backgroundColor: '#ef4444',
        borderLeft: '4px solid #dc2626'
      },
      warning: {
        backgroundColor: '#f59e0b',
        borderLeft: '4px solid #d97706'
      },
      info: {
        backgroundColor: '#3b82f6',
        borderLeft: '4px solid #2563eb'
      }
    };

    return { ...baseStyle, ...typeStyles[type] };
  };

  const getIcon = () => {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type];
  };

  return (
    <>
      <style>
        {`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes slideOutRight {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(100%);
              opacity: 0;
            }
          }

          @media (max-width: 768px) {
            @keyframes slideInRight {
              from {
                transform: translateY(-100%);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
          }
        `}
      </style>
      <div 
        style={getToastStyle()} 
        onClick={onClose}
        title="Click to dismiss"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1' }}>
          <span style={{ fontSize: window.innerWidth <= 768 ? '18px' : '16px' }}>{getIcon()}</span>
          <span style={{ wordBreak: 'break-word' }}>{message}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: window.innerWidth <= 768 ? '20px' : '18px',
            cursor: 'pointer',
            padding: '4px',
            width: window.innerWidth <= 768 ? '24px' : '20px',
            height: window.innerWidth <= 768 ? '24px' : '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background-color 0.2s',
            flexShrink: 0
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          ×
        </button>
      </div>
    </>
  );
};

export default Toast;
