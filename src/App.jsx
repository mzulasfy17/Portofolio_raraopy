import React, { useState, useEffect } from 'react';
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

const getTabFromHash = () => {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (['home', 'experience', 'skills', 'contact', 'admin'].includes(hash)) {
    return hash;
  }
  return 'home';
};

export default function App() {
  const initialTab = getTabFromHash();
  const [showSplash, setShowSplash] = useState(initialTab === 'home');
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const handleHashChange = () => {
      const tab = getTabFromHash();
      setActiveTab(tab);
      if (tab !== 'home') setShowSplash(false);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return;
    window.location.hash = newTab;
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
