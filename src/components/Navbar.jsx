import React, { useState } from 'react';
import { Home, Briefcase, Award, Mail, Menu, X } from 'lucide-react';
import avatarImg from '../assets/images/rahma-avatar.jpg';
import './Navbar.css';

export default function Navbar({ activeTab, setActiveTab }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
    { id: 'skills', label: 'SKILLS', icon: Award },
    { id: 'contact', label: 'CONTACT', icon: Mail },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-top-bar">
        <div className="navbar-brand" onClick={() => handleNavClick('home')}>
          <div className="navbar-avatar-box">
            <img src={avatarImg} alt="Rahma Novridayanti" />
          </div>
          <div>
            <h1 className="navbar-title">RAHMA NOVRIDAYANTI</h1>
            <div className="navbar-subtitle">PORTFOLIO.EXE 🌟</div>
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
            const IconComponent = item.icon;
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
