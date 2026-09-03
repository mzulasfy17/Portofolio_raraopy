import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './App.css';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return;
    setActiveTab(newTab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onNavigate={handleTabChange} />;
      case 'experience':
        return <Experience />;
      case 'skills':
        return <Skills />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return <Admin />;
      default:
        return <Home onNavigate={handleTabChange} />;
    }
  };

  return (
    <div className="app-wrapper">
      {/* 1. First-time opening splash screen animation */}
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}

      {/* 2. Main Navigation bar */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* 3. Main layout wrapped in smooth content slide-in transition */}
      <main className="main-content-layout">
        <PageTransition activeTab={activeTab}>
          {renderContent()}
        </PageTransition>
      </main>

      {/* 4. Footer with replay intro option & Admin link */}
      <Footer onReplayIntro={() => setShowSplash(true)} onOpenAdmin={() => handleTabChange('admin')} />
    </div>
  );
}
