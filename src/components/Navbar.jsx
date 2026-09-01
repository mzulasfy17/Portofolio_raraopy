import React from 'react';
import { Home, Briefcase, Award, Mail } from 'lucide-react';
import avatarImg from '../assets/images/rahma-avatar.jpg';
import './Navbar.css';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
    { id: 'skills', label: 'SKILLS', icon: Award },
    { id: 'contact', label: 'CONTACT', icon: Mail },
  ];

  return (
    <header className="navbar-container">
      <div className="navbar-brand">
        <div className="navbar-avatar-box">
          <img src={avatarImg} alt="Rahma Novridayanti" />
        </div>
        <div>
          <h1 className="navbar-title">RAHMA NOVRIDAYANTI</h1>
          <div className="navbar-subtitle">PORTFOLIO.EXE 🌟</div>
        </div>
      </div>

      <nav>
        <ul className="navbar-links">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  className={`nav-item-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
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
