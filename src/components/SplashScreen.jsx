import React, { useState, useEffect } from 'react';
import { Sparkles, Play, Terminal } from 'lucide-react';
import avatarImg from '../assets/images/rahma-avatar.jpg';
import catImg from '../assets/images/pixel_grey_kitty.png';
import { usePortfolioData } from '../hooks/usePortfolioData';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [bootText, setBootText] = useState('SYSTEM BOOTING...');
  const [isClosing, setIsClosing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { intro } = usePortfolioData();

  const defaultLogs = [
    '> INITIALIZING RAHMA OS v2.0...',
    '> LOADING HR & MANAGEMENT MODULES...',
    '> LOADING DIGITAL MARKETING STRATEGIES...',
    '> MOUNTING PIXEL GRAPHICS & CAT ASSISTANT...',
    '> SYSTEM READY! WELCOME TO MY PORTFOLIO! ✨'
  ];

  const rawLogs = (intro?.bootLogLines && intro.bootLogLines.length > 0) 
    ? intro.bootLogLines 
    : defaultLogs;

  useEffect(() => {
    const bootSteps = rawLogs.map((text, idx) => ({
      pct: Math.round(((idx + 1) / rawLogs.length) * 100),
      text: text.startsWith('>') ? text : `> ${text}`
    }));

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
          setIsClosing(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 800);
      }
    }, 380);

    return () => clearInterval(interval);
  }, [rawLogs, onComplete]);

  const handleEnter = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onComplete();
    }, 600);
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
              <span>{intro?.badge || 'S1 MANAJEMEN • HR & MARKETING'}</span>
            </div>
          </div>

          {/* Welcome Heading */}
          <h1 className="splash-title">
            {intro?.title || 'RAHMA NOVRIDAYANTI'}
          </h1>
          <p className="splash-subtitle">{intro?.subtitle || 'PORTFOLIO.EXE 🌟'}</p>

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
