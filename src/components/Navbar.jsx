import React, { useState } from 'react';
import { Home, Briefcase, FolderGit2, Award, Mail, Menu, X, ShieldCheck } from 'lucide-react';
import avatarImg from '../assets/images/rahma-avatar.jpg';
import { usePortfolioData } from '../hooks/usePortfolioData';
import './Navbar.css';

const ICON_MAP = {
  Home: Home,
  Briefcase: Briefcase,
  FolderGit2: FolderGit2,
  Award: Award,
  Mail: Mail,
  ShieldCheck: ShieldCheck
};

export default function Navbar({ activeTab, setActiveTab }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navbar, profile } = usePortfolioData();

  const title = navbar?.title || 'RAHMA NOVRIDAYANTI';
  const subtitle = navbar?.subtitle || 'PORTFOLIO.EXE 🌟';
  const avatarSrc = profile?.avatarUrl || avatarImg;

  const defaultItems = [
    { id: 'home', label: 'HOME', icon: 'Home', visible: true },
    { id: 'experience', label: 'EXPERIENCE', icon: 'Briefcase', visible: true },
    { id: 'skills', label: 'SKILLS', icon: 'Award', visible: true },
    { id: 'contact', label: 'CONTACT', icon: 'Mail', visible: true },
  ];

  const rawItems = navbar?.items && navbar.items.length > 0 ? navbar.items : defaultItems;
  const navItems = rawItems.filter(item => item.visible !== false && item.id !== 'projects');

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-top-bar">
        <div className="navbar-brand" onClick={() => handleNavClick('home')}>
          <div className="navbar-avatar-box">
            <img 
              src={avatarSrc} 
              alt={title} 
              onError={(e) => { e.currentTarget.src = avatarImg; }}
            />
          </div>
          <div>
            <h1 className="navbar-title">{title}</h1>
            <div className="navbar-subtitle">{subtitle}</div>
          </div>
        </div>

        {/* Mobile Hamburger Toggle Button (Garis Tiga) */}
        <button 
          className="mobile-menu-toggle-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation Menu"
          title="Menu Navigasi"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className={`navbar-nav-menu ${isMenuOpen ? 'mobile-open' : ''}`}>
        <ul className="navbar-links">
          {navItems.map((item) => {
            const IconComponent = (typeof item.icon === 'string' ? ICON_MAP[item.icon] : item.icon) || Briefcase;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  className={`nav-item-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <IconComponent size={14} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
