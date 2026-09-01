import React from 'react';

export default function WindowButtons({ onMinimize, onMaximize, onClose }) {
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
      <button 
        onClick={onMinimize} 
        style={{
          width: '16px',
          height: '16px',
          background: '#e2e8f0',
          border: '1.5px solid #475569',
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          fontWeight: 'bold',
          color: '#334155',
          cursor: 'pointer'
        }}
        title="Minimize"
      >
        _
      </button>
      <button 
        onClick={onMaximize}
        style={{
          width: '16px',
          height: '16px',
          background: '#e2e8f0',
          border: '1.5px solid #475569',
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '9px',
          fontWeight: 'bold',
          color: '#334155',
          cursor: 'pointer'
        }}
        title="Maximize"
      >
        □
      </button>
      <button 
        onClick={onClose}
        style={{
          width: '16px',
          height: '16px',
          background: '#f87171',
          border: '1.5px solid #991b1b',
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          fontWeight: 'bold',
          color: '#ffffff',
          cursor: 'pointer'
        }}
        title="Close"
      >
        ✕
      </button>
    </div>
  );
}
