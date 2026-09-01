import React, { useState, useEffect } from 'react';
import { GmailIcon, LinkedInIcon } from './BrandIcons';
import './Footer.css';

export default function Footer({ onReplayIntro }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="footer-wrapper">
      <footer className="footer-container">
        {/* Top Row: Brand & Social Links */}
        <div className="footer-top-row">
          <div>
            <div className="footer-brand-title">
              <span>RAHMA NOVRIDAYANTI</span>
              <span style={{ fontSize: '0.75rem', color: '#c084fc' }}>| PORTFOLIO.EXE</span>
              <span>🐾</span>
            </div>
            <div className="footer-brand-sub">
              MANAGEMENT & HR SPECIALIST • PEKANBARU, INDONESIA
            </div>
          </div>

          <div className="footer-social-links">
            <a 
              href="mailto:rahma.novridayanti25@gmail.com" 
              className="footer-social-btn email-btn" 
              title="Send Gmail Email"
            >
              <GmailIcon size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/rahma-novridayanti/" 
              target="_blank" 
              rel="noreferrer" 
              className="footer-social-btn linkedin-btn" 
              title="Official LinkedIn Profile"
            >
              <LinkedInIcon size={20} />
            </a>
          </div>
        </div>

        {/* Bottom Row: Copyright & Status */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            © 2026 RAHMA NOVRIDAYANTI. ALL RIGHTS RESERVED. 🐾
          </div>

          <div className="footer-status-box">
            <div className="footer-status-item">
              <span className="status-dot-pulse"></span>
              <span>SYSTEM STATUS: ONLINE 🐾</span>
            </div>

            <span className="status-divider">|</span>
            
            <div className="footer-status-item">
              <span>SYS_TIME: {time} WIB</span>
            </div>

            {onReplayIntro && (
              <>
                <span className="status-divider">|</span>
                <button className="footer-replay-btn" onClick={onReplayIntro} title="Replay Opening Splash Animation">
                  🎬 REPLAY INTRO
                </button>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
