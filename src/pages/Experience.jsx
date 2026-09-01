import React, { useState } from 'react';
import Window from '../components/Window';
import avatarImg from '../assets/images/rahma-avatar.jpg';
import { 
  Briefcase, 
  GraduationCap, 
  Users, 
  Sparkles, 
  LayoutGrid, 
  Calendar, 
  MapPin, 
  Building2, 
  Star,
  Award,
  BookOpen,
  User,
  FileText
} from 'lucide-react';
import './Experience.css';

export default function Experience() {
  const [activeCategory, setActiveCategory] = useState('all');

  const experiences = [
    {
      id: 1,
      category: 'education',
      badgeLabel: 'EDUCATION',
      role: 'S1 Manajemen (Sarjana Manajemen)',
      company: 'UIN Sultan Syarif Kasim Riau',
      period: '2022 - 2026',
      location: 'Pekanbaru, Indonesia',
      icon: GraduationCap,
      bullets: [
        'Mempelajari manajemen operasional, Human Resource Management, strategi pemasaran digital, dan analisis bisnis kuantitatif.',
        'Aktif dalam berbagai praktikum studi kasus bisnis, penelitian data SPSS, serta kepemimpinan organisasi mahasiswa.',
        'Meraih predikat IPK 3.59 / 4.00 dengan konsentrasi Manajemen Keuangan.'
      ],
      skills: ['HR Management', 'SPSS Analysis', 'Digital Marketing', 'Business Operations', 'Public Speaking']
    },
    {
      id: 2,
      category: 'internship',
      badgeLabel: 'INTERNSHIP',
      role: 'Intern',
      company: 'PT. FITRA WIKA ',
      period: 'Feb 2025 - April 2025',
      location: 'Pekanbaru, Indonesia',
      icon: Briefcase,
      bullets: [
        'Mendukung tim keuangan dalam pengelolaan dan penyusunan laporan keuangan bulanan.',
        'Membantu proses administrasi keuangan, termasuk pencatatan transaksi harian dan pengarsipan dokumen.',
        'Melakukan analisis sederhana terhadap laporan keuangan untuk mendukung pengambilan keputusan manajerial.',
        'Berkontribusi dalam koordinasi internal tim dan komunikasi lintas departemen untuk kelancaran operasional administrasi.'
      ],
      skills: ['UAT Testing', 'Digital Banking', 'CMS System', 'Data Entry', 'Financial Admin']
    },
    {
      id: 3,
      category: 'organization',
      badgeLabel: 'ORGANIZATION',
      role: 'Head of Public Relations & Event Manager',
      company: 'Himpunan Mahasiswa Manajemen',
      period: '2023 - 2024',
      location: 'UIN Sultan Syarif Kasim Riau',
      icon: Users,
      bullets: [
        'Memimpin tim Humas dalam publikasi media sosial, strategi branding kegiatan, dan pengelolaan kanal komunikasi publik.',
        'Mengatur kemitraan sponsor dan media partner untuk penyelenggaraan Seminar Nasional Karir & Business Plan.',
        'Memimpin pelaksanaan event nasional dengan partisipasi antusias lebih dari 300+ peserta mahasiswa.'
      ],
      skills: ['Event Management', 'Public Relations', 'Sponsorship', 'Team Leadership', 'Branding']
    },
    {
      id: 4,
      category: 'project',
      badgeLabel: 'PROJECT & FREELANCE',
      role: 'Digital Content & Brand Strategist',
      company: 'Independent Partner / UMKM Project',
      period: '2024 - Present',
      location: 'Pekanbaru, Indonesia',
      icon: Sparkles,
      bullets: [
        'Merancang strategi kampanye digital di media sosial Instagram & TikTok untuk meningkatkan awareness UMKM lokal.',
        'Membuat desain konten visual Canva, copywriting promosi, dan evaluasi impresi mingguan performa akun.'
      ],
      skills: ['Canva Design', 'Copywriting', 'Social Media Strategy', 'Content Planning']
    }
  ];

  const filteredExperiences = activeCategory === 'all'
    ? experiences
    : experiences.filter(exp => exp.category === activeCategory);

  return (
    <div className="experience-container">
      <Window title="EXPERIENCE.EXE" icon={Briefcase} tags={['• PURR-FECT JOURNEY', 'V2.5']} className="exp-main-window">
        {/* Main Banner Header */}
        <div className="main-exp-header">
          <h2 className="main-exp-title">
            <span>MY JOURNEY</span>
            <span style={{ fontSize: '1.2rem' }}>🐾</span>
          </h2>
          <p className="main-exp-subtitle">
            A purr-fect journey of learning, building, and growing.
          </p>
          <hr className="main-exp-divider" />
        </div>

        {/* 2-Column Desktop Grid */}
        <div className="exp-layout">
          {/* LEFT SIDEBAR */}
          <aside className="exp-sidebar">
            {/* 0. PROFILE WINDOW */}
            <div className="exp-card-window">
              <div className="exp-card-header">
                <div className="exp-card-title">
                  <User size={14} color="#7e22ce" />
                  <span>PROFILE.EXE</span>
                </div>
                <div style={{ fontSize: '10px', color: '#7e22ce' }}>_ [] X</div>
              </div>
              <div className="exp-card-body" style={{ textAlign: 'center' }}>
                <div className="exp-avatar-frame">
                  <img 
                    src={avatarImg} 
                    alt="Rahma Pixel Portrait" 
                    className="exp-avatar-img" 
                  />
                  <div className="skills-avatar-badge">● PROFILE 🌟</div>
                </div>
                <h3 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '0.8rem', color: '#581c87', margin: '4px 0' }}>
                  RAHMA NOVRIDAYANTI
                </h3>
                <p style={{ fontFamily: 'var(--font-pixel-sub)', fontSize: '0.65rem', color: '#7e22ce', margin: 0 }}>
                  Management & HR Specialist 🐾
                </p>
              </div>
            </div>

            {/* 1. EXP LEVEL WINDOW */}
            <div className="exp-card-window">
              <div className="exp-card-header">
                <div className="exp-card-title">
                  <Star size={14} color="#7e22ce" />
                  <span>EXP_LEVEL.EXE</span>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <span style={{ fontSize: '10px', color: '#7e22ce' }}>_ [] X</span>
                </div>
              </div>
              <div className="exp-card-body">
                <div style={{ fontFamily: 'var(--font-pixel-sub)', fontSize: '0.65rem', color: '#7e22ce', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  ★ EXPERIENCE LEVEL
                </div>
                <div className="exp-level-val">
                  <span>Lv. 10</span>
                  <span className="exp-level-sub">1200 / 1500 XP</span>
                </div>
                <div className="exp-progress-container">
                  <div className="exp-progress-fill" style={{ width: '80%' }}></div>
                </div>
                <div style={{ marginTop: '10px', fontSize: '0.68rem', fontFamily: 'var(--font-pixel-sub)', color: '#6b21a8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>🐾</span> Status: Paw-fessional Explorer
                </div>
              </div>
            </div>

            {/* 2. CATEGORIES WINDOW */}
            <div className="exp-card-window">
              <div className="exp-card-header">
                <div className="exp-card-title">
                  <LayoutGrid size={14} color="#7e22ce" />
                  <span>CATEGORIES.EXE</span>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <span style={{ fontSize: '10px', color: '#7e22ce' }}>_ [] X</span>
                </div>
              </div>
              <div className="exp-card-body">
                <div className="category-btn-list">
                  <button 
                    className={`cat-btn ${activeCategory === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('all')}
                  >
                    <LayoutGrid size={14} color={activeCategory === 'all' ? '#fff' : '#7e22ce'} />
                    <span>All Experience</span>
                    <span className="cat-btn-badge">{experiences.length}</span>
                  </button>

                  <button 
                    className={`cat-btn ${activeCategory === 'education' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('education')}
                  >
                    <GraduationCap size={14} color={activeCategory === 'education' ? '#fff' : '#7e22ce'} />
                    <span>Education</span>
                    <span className="cat-btn-badge">1</span>
                  </button>

                  <button 
                    className={`cat-btn ${activeCategory === 'internship' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('internship')}
                  >
                    <Briefcase size={14} color={activeCategory === 'internship' ? '#fff' : '#7e22ce'} />
                    <span>Internship</span>
                    <span className="cat-btn-badge">1</span>
                  </button>

                  <button 
                    className={`cat-btn ${activeCategory === 'organization' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('organization')}
                  >
                    <Users size={14} color={activeCategory === 'organization' ? '#fff' : '#7e22ce'} />
                    <span>Organization</span>
                    <span className="cat-btn-badge">1</span>
                  </button>

                  <button 
                    className={`cat-btn ${activeCategory === 'project' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('project')}
                  >
                    <Sparkles size={14} color={activeCategory === 'project' ? '#fff' : '#7e22ce'} />
                    <span>Project & Freelance</span>
                    <span className="cat-btn-badge">1</span>
                  </button>
                </div>
              </div>
            </div>


            {/* 4. NOTE WINDOW */}
            <div className="exp-card-window">
              <div className="exp-card-header">
                <div className="exp-card-title">
                  <FileText size={14} color="#7e22ce" />
                  <span>NOTE.EXE</span>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <span style={{ fontSize: '10px', color: '#7e22ce' }}>_ [] X</span>
                </div>
              </div>
              <div className="exp-card-body">
                <div className="exp-note-box">
                  <span className="exp-note-quote">“</span>
                  Every step of my journey shapes who I am. Perseverance & continuous learning are the keys to meaningful growth! ✨
                  <div style={{ textAlign: 'right', marginTop: '8px', fontWeight: 'bold', fontSize: '0.72rem', color: '#7e22ce' }}>
                    — Rahma Novridayanti
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT MAIN CONTENT AREA */}
          <main style={{ flex: 1 }}>
            {filteredExperiences.length === 0 ? (
              <div className="exp-empty-state">
                😿 No experience entries found for this category!
              </div>
            ) : (
              <div className="timeline-list">
                {filteredExperiences.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <div key={`${item.id}-${activeCategory}`} className="exp-card-item">
                      <div className="timeline-bullet" />
                      
                      {/* Left Icon Container */}
                      <div className="exp-card-icon-box">
                        <IconComp size={26} />
                      </div>

                      {/* Main Details */}
                      <div className="exp-card-main">
                        <div className="exp-card-head-row">
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                              <h3 className="exp-card-role-title">{item.role}</h3>
                              <span className="exp-card-cat-badge">
                                🐾 {item.badgeLabel}
                              </span>
                            </div>
                            <div className="exp-card-company">
                              <Building2 size={13} />
                              <span>{item.company}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bullet achievements */}
                        <ul className="exp-card-bullets">
                          {item.bullets.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>

                        {/* Skill Pills */}
                        <div className="exp-card-tags">
                          {item.skills.map((skill, idx) => (
                            <span key={idx} className="exp-card-tag-item">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Meta Info (Dates & Location) */}
                      <div className="exp-card-meta">
                        <div className="meta-item date">
                          <Calendar size={12} />
                          <span>{item.period}</span>
                        </div>
                        <div className="meta-item">
                          <MapPin size={12} />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </Window>
    </div>
  );
}
