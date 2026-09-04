import React, { useState } from 'react';
import Window from '../components/Window';
import avatarImg from '../assets/images/rahma-avatar.jpg';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { 
  Award, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  Monitor, 
  Users, 
  Target, 
  BarChart3,
  Lightbulb,
  MessageSquare,
  Clock,
  RefreshCw,
  ExternalLink,
  Info,
  X,
  ShieldCheck
} from 'lucide-react';
import './Skills.css';

const formatExternalUrl = (url) => {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('//') || trimmed.startsWith('/') || trimmed.startsWith('mailto:')) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

export default function Skills() {
  const { skillCategories, certificates, profile } = usePortfolioData();

  const getCategoryIcon = (index) => {
    const icons = [Monitor, Users, Target, BarChart3];
    return icons[index % icons.length];
  };

  const personalSkills = [
    {
      title: 'PROBLEM SOLVING',
      icon: Lightbulb,
      desc: 'Mampu menganalisis masalah dan mencari solusi yang efektif.'
    },
    {
      title: 'COMMUNICATION',
      icon: MessageSquare,
      desc: 'Mampu berkomunikasi dengan baik dalam tim.'
    },
    {
      title: 'TIME MANAGEMENT',
      icon: Clock,
      desc: 'Mampu mengatur prioritas pekerjaan.'
    },
    {
      title: 'ADAPTABILITY',
      icon: RefreshCw,
      desc: 'Mampu beradaptasi dengan teknologi baru.'
    },
    {
      title: 'TEAMWORK',
      icon: Users,
      desc: 'Mampu bekerjasama dalam tim untuk hasil terbaik.'
    }
  ];

  return (
    <div className="skills-container">
      <div className="skills-layout">
        {/* LEFT SIDEBAR */}
        <aside className="skills-sidebar">
          {/* SKILLS.EXE PHOTO WINDOW */}
          <div className="skills-photo-window">
            <div className="skills-photo-header">
              <div className="skills-photo-title">
                <Award size={14} color="#7e22ce" />
                <span>SKILLS.EXE</span>
              </div>
              <div style={{ fontSize: '10px', color: '#7e22ce' }}>_ [] X</div>
            </div>
            <div className="skills-photo-body">
              <div className="skills-avatar-frame">
                <img 
                  src={profile?.avatarUrl || avatarImg} 
                  alt="Rahma Pixel Portrait" 
                  className="skills-avatar-img" 
                  onError={(e) => { e.currentTarget.src = avatarImg; }}
                />
                <div className="skills-avatar-badge">● PROFILE 🌟</div>
              </div>

              <h2 className="skills-heading-main">
                MY SKILLS 🌟
              </h2>
              <hr className="skills-divider" />
              <p className="skills-subtext">
                Technologies, mindset, and skills I use to build great solutions.
              </p>
            </div>
          </div>

          {/* STATUS.EXE SIDEBAR WINDOW */}
          <div className="status-card-window">
            <div className="skills-photo-header">
              <div className="skills-photo-title">
                <CheckCircle2 size={14} color="#7e22ce" />
                <span>STATUS.EXE</span>
              </div>
              <div style={{ fontSize: '10px', color: '#7e22ce' }}>_ [] X</div>
            </div>
            <div className="status-card-body">
              <div className="status-card-list">
                <div className="status-card-item">
                  <div className="status-card-icon">
                    <MapPin size={18} color="#7e22ce" />
                  </div>
                  <div className="status-card-content">
                    <div className="status-card-label">LOCATION</div>
                    <div className="status-card-value">Pekanbaru, Indonesia</div>
                  </div>
                </div>

                <div className="status-card-item">
                  <div className="status-card-icon">
                    <GraduationCap size={18} color="#7e22ce" />
                  </div>
                  <div className="status-card-content">
                    <div className="status-card-label">EDUCATION</div>
                    <div className="status-card-value">S1 Manajemen (Cumlaude)</div>
                  </div>
                </div>

                <div className="status-card-item">
                  <div className="status-card-icon">
                    <CheckCircle2 size={18} color="#7e22ce" />
                  </div>
                  <div className="status-card-content">
                    <div className="status-card-label">STATUS</div>
                    <div className="status-card-value">● Open for Opportunities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN AREA */}
        <main className="skills-main-area">
          {/* KEAHLIAN TEKNIS */}
          <Window title="KEAHLIAN TEKNIS" icon={Monitor} tags={['TECHNICAL SKILLS 💻']} theme="purple">
            <div className="tech-skills-grid">
              {skillCategories.map((cat, idx) => {
                const IconComp = getCategoryIcon(idx);
                return (
                  <div key={cat.id || idx} className="tech-skill-card">
                    <div className="tech-skill-header">
                      <IconComp size={16} color="#7e22ce" />
                      <span>{cat.title}</span>
                    </div>
                    <div className="tech-pill-list">
                      {(cat.pills || []).map((pill, pIdx) => (
                        <span key={pIdx} className="tech-pill">
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Window>

          {/* KEAHLIAN PERSONAL */}
          <Window title="KEAHLIAN PERSONAL" icon={Users} tags={['SOFT SKILLS 🌟']} theme="purple">
            <div className="personal-skills-row">
              {personalSkills.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="soft-skill-card">
                    <div className="soft-skill-icon-box">
                      <IconComp size={20} />
                    </div>
                    <div className="soft-skill-title">{item.title}</div>
                    <div className="soft-skill-desc">{item.desc}</div>
                  </div>
                );
              })}
            </div>
          </Window>

          {/* SERTIFIKAT PELATIHAN & LISENSI */}
          <Window title="SERTIFIKAT PELATIHAN" icon={Award} tags={['VERIFIKASI LINK 📜']} theme="purple">
            <div className="cert-cards-row">
              {certificates.map((cert) => {
                const linkUrl = formatExternalUrl(cert.credentialUrl);
                return (
                  <div key={cert.id} className="cert-card-item">
                    {/* Header Row: Icon + Title & Issuer */}
                    <div className="cert-card-header-row">
                      <div className="cert-icon-box">
                        <Award size={22} color="#7e22ce" />
                      </div>
                      <div className="cert-header-info">
                        <h3 className="cert-title">{cert.title}</h3>
                        <div className="cert-issuer">{cert.issuer}</div>
                      </div>
                    </div>

                    {/* Single Full-width Button */}
                    {linkUrl ? (
                      <a 
                        href={linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="cert-full-view-btn"
                        title={`Buka sertifikat ${cert.title}`}
                      >
                        VIEW CERTIFICATE
                      </a>
                    ) : (
                      <button 
                        type="button" 
                        className="cert-full-view-btn cert-btn-disabled" 
                        disabled
                      >
                        VIEW CERTIFICATE
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </Window>
        </main>
      </div>
    </div>
  );
}
