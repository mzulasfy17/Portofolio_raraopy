import React, { useState } from 'react';
import WindowButtons from './WindowButtons';

export default function Window({ title, icon: Icon, tags = [], children, className = '', theme = 'purple' }) {
  const [isMinimized, setIsMinimized] = useState(false);

  const isPurple = theme === 'purple';

  const headerBg = isPurple 
    ? 'linear-gradient(90deg, #ede9fe 0%, #ddd6fe 100%)' 
    : 'linear-gradient(90deg, #dbeafe 0%, #bfdbfe 100%)';

  const headerBorder = isPurple ? '2px solid #a855f7' : '2px solid #3b82f6';
  const iconColor = isPurple ? '#6b21a8' : '#1d4ed8';
  const titleColor = isPurple ? '#581c87' : '#1e3a8a';

  const tagBg = isPurple ? '#f3e8ff' : '#eff6ff';
  const tagBorder = isPurple ? '1px solid #c084fc' : '1px solid #93c5fd';
  const tagColor = isPurple ? '#7e22ce' : '#2563eb';

  return (
    <div className={`pixel-box ${className}`} style={{ 
      marginBottom: '20px', 
      transition: 'all 0.2s ease',
      borderColor: isPurple ? '#a855f7' : 'var(--window-border)',
      background: isPurple ? 'rgba(253, 248, 255, 0.96)' : 'var(--window-bg)',
      boxShadow: isPurple ? '4px 4px 0px rgba(107, 33, 168, 0.2)' : 'var(--pixel-shadow)'
    }}>
      {/* Window Header */}
      <div className="pixel-window-header" style={{
        background: headerBg,
        padding: '8px 12px',
        borderBottom: headerBorder,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        gap: '8px',
        overflow: 'hidden'
      }}>
        {/* Title Group */}
        <div className="pixel-window-title-group" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          minWidth: 0, 
          flex: '1 1 auto',
          overflow: 'hidden'
        }}>
          {Icon && <Icon size={16} color={iconColor} style={{ flexShrink: 0 }} />}
          <span style={{
            fontFamily: "var(--font-pixel-sub)",
            fontSize: '0.75rem',
            fontWeight: 'bold',
            color: titleColor,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {title}
          </span>
        </div>

        {/* Actions & Tags Group */}
        <div className="pixel-window-actions-group" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          flexShrink: 0
        }}>
          {tags.length > 0 && (
            <div className="pixel-window-tags-container" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {tags.map((tag, idx) => (
                <span key={idx} className="pixel-window-tag-badge" style={{
                  fontFamily: "var(--font-pixel-sub)",
                  fontSize: '0.55rem',
                  padding: '2px 6px',
                  background: tagBg,
                  border: tagBorder,
                  color: tagColor,
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                  display: 'inline-block'
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <WindowButtons onMinimize={() => setIsMinimized(!isMinimized)} />
        </div>
      </div>

      {/* Window Content */}
      <div 
        className={`pixel-window-content-wrapper ${isMinimized ? 'minimized' : 'expanded'}`}
        style={{ 
          overflow: isMinimized ? 'hidden' : 'visible',
          transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          maxHeight: isMinimized ? '0px' : 'none',
          display: isMinimized ? 'none' : 'block',
          opacity: isMinimized ? 0 : 1,
          padding: isMinimized ? '0px 16px' : '16px'
        }}
      >
        {children}
      </div>
    </div>
  );
}
