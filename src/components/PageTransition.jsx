import React from 'react';
import './PageTransition.css';

export default function PageTransition({ activeTab, children }) {
  return (
    <div key={activeTab} className="page-slide-in-container">
      {children}
    </div>
  );
}
