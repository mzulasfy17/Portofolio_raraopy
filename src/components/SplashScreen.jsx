import React, { useState, useEffect } from 'react';
import { Sparkles, Play, Terminal } from 'lucide-react';
import avatarImg from '../assets/images/rahma-avatar.jpg';
import catImg from '../assets/images/pixel_grey_kitty.png';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [bootText, setBootText] = useState('SYSTEM BOOTING...');
  const [isClosing, setIsClosing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const bootSteps = [
      { pct: 15, text: '> INITIALIZING RAHMA OS v2.0...' },
      { pct: 35, text: '> LOADING HR & MANAGEMENT MODULES...' },
      { pct: 60, text: '> LOADING DIGITAL MARKETING STRATEGIES...' },
      { pct: 85, text: '> MOUNTING PIXEL GRAPHICS & CAT ASSISTANT...' },
      { pct: 100, text: '> SYSTEM READY! WELCOME TO MY PORTFOLIO! ✨' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < bootSteps.length) {
        const step = bootSteps[currentStep];
        setProgress(step.pct);
        setBootText(step.text);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsReady(true);
        // Auto proceed after short delay
        setTimeout(() => {
          handleEnter();
        }, 800);
      }
    }, 380);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onComplete();
    }, 600); // match curtain transition time
  };

  return (
    <div className={`splash-overlay ${isClosing ? 'splash-exit' : ''}`}>
      {/* Upper shutter curtain */}
      <div className="splash-curtain curtain-top"></div>
      {/* Lower shutter curtain */}
      <div className="splash-curtain curtain-bottom"></div>

      {/* Main retro window container */}
      <div className="splash-card">
        <div className="splash-header">
          <div className="splash-header-title">
            <Terminal size={14} />
            <span>RAHMA_OS_BOOT.EXE</span>
          </div>
          <div className="splash-header-controls">_ [] X</div>
        </div>

        <div className="splash-body">
          {/* Animated Avatar / Cat Frame */}
          <div className="splash-avatar-container">
            <div className="splash-avatar-box">
              <img src={avatarImg} alt="Rahma Novridayanti" className="splash-avatar-img" />
              <img src={catImg} alt="Pixel Kitty" className="splash-cat-sprite" />
            </div>
            <div className="splash-badge">
              <Sparkles size={12} />
              <span>S1 MANAJEMEN • HR & MARKETING</span>
            </div>
          </div>

          {/* Welcome Heading */}
          <h1 className="splash-title">
            RAHMA NOVRIDAYANTI
          </h1>
          <p className="splash-subtitle">PORTFOLIO.EXE 🌟</p>

          {/* Boot Terminal Log */}
          <div className="splash-terminal">
            <div className="splash-terminal-line">{bootText}</div>
          </div>

          {/* Pixel Progress Bar */}
          <div className="splash-progress-wrapper">
            <div className="splash-progress-track">
              <div 
                className="splash-progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="splash-progress-text">
              <span>PROGRESS</span>
              <span>{progress}%</span>
            </div>
          </div>

          {/* Action button */}
          <button 
            className={`splash-start-btn ${isReady ? 'pulse-ready' : ''}`}
            onClick={handleEnter}
          >
            <Play size={14} />
            <span>{isReady ? 'ENTER PORTFOLIO ✦' : 'SKIP INTRO ⏩'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
