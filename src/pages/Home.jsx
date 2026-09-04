import React from 'react';
import Window from '../components/Window';
import Typewriter from '../components/Typewriter';
import { GmailIcon } from '../components/BrandIcons';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { 
  User, 
  Briefcase, 
  Award, 
  Monitor, 
  GraduationCap, 
  CheckCircle2,
  Download,
  FileText,
  Send,
  MapPin
} from 'lucide-react';
import './Home.css';
import avatarImg from '../assets/images/rahma-avatar.jpg';

export default function Home({ onNavigate }) {
  const { experiences, skillCategories, profile } = usePortfolioData();

  const taglineText = profile?.tagline || "Management & HR Specialist ✨";
  const bioText = profile?.bio || "Halo! Saya Rahma Novridayanti, S.M., seorang lulusan Fresh Graduate Manajemen yang berdedikasi tinggi dalam mengoptimalkan pengelolaan sumber daya manusia, strategi pemasaran digital, dan efisiensi operasional bisnis.";
  const specialties = profile?.specialties || [
    'Human Capital Management',
    'Digital Marketing Strategy',
    'Data & Operations Analysis',
    'Fresh Grad Manajemen (S.M.)'
  ];

  return (
    <div className="home-container">
      {/* LEFT COLUMN: WELCOME & AVATAR CARD */}
      <aside className="left-column">
        <Window title="WELCOME.EXE" icon={Monitor} tags={['• PROFILE MODE 🌟']} theme="purple">
          <div className="welcome-card-content">
            <div className="avatar-frame">
              <img 
                src={profile?.avatarUrl || avatarImg} 
                alt="Rahma Novridayanti Pixel Portrait" 
                onError={(e) => { e.currentTarget.src = avatarImg; }}
              />
              <div className="avatar-badge">● PROFILE 🌟</div>
            </div>

            <div className="welcome-title-box">
              <h2 className="welcome-heading">
                WELCOME TO MY <br />
                <span style={{ color: '#9333ea' }}>PORTFOLIO!</span> <span style={{ color: '#c084fc' }}>💜</span>
              </h2>
            </div>

            <div className="typewriter-badge">
              &gt; <Typewriter text={taglineText} speed={70} delay={500} />
            </div>

            <div className="specialty-list">
              {specialties.map((item, idx) => (
                <div key={idx} className="specialty-item">
                  <FileText size={16} color="#9333ea" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* DOWNLOAD CV BUTTON */}
            <div className="download-cv-container">
              <a 
                href={profile?.cvUrl || "/CV_Rahma_Novridayanti.pdf"} 
                download="CV_Rahma_Novridayanti.pdf" 
                className="download-cv-btn"
                title="Download Full Curriculum Vitae PDF"
              >
                <Download size={18} />
                <span>DOWNLOAD CV (PDF)</span>
              </a>
            </div>
          </div>
        </Window>
      </aside>

      {/* RIGHT COLUMN: MAIN CONTENT WINDOWS */}
      <main className="right-column">
        {/* ABOUT ME WINDOW */}
        <Window title="ABOUT_ME.EXE" icon={User} tags={['▲ PURSEVERANCE', 'PROFILE.LOG']} theme="purple">
          <div>
            <h3 style={{
              fontFamily: 'var(--font-pixel-heading)',
              fontSize: '0.95rem',
              color: '#581c87',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ background: '#f3e8ff', padding: '4px 8px', borderRadius: '4px', border: '1px solid #c084fc' }}>0</span>
              ABOUT ME 🌟
            </h3>

            <p className="about-paragraph">
              <span className="prompt-symbol">&gt;</span>
              <span>{bioText}</span>
            </p>

            <div className="about-tags">
              <span className="pixel-badge">HUMAN RESOURCES & TALENT</span>
              <span className="pixel-badge">MARKETING STRATEGY</span>
              <span className="pixel-badge">BUSINESS OPERATIONS</span>
              <span className="pixel-badge">DATA ANALYSIS</span>
            </div>
          </div>
        </Window>

        {/* EXPERIENCE WINDOW */}
        <Window title="EXPERIENCE.EXE" icon={Briefcase} theme="purple">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '0.88rem', color: '#581c87', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <Briefcase size={16} color="#581c87" />
                <span>RECENT EXPERIENCE</span>
              </h3>
              <button 
                className="pixel-btn"
                onClick={() => onNavigate && onNavigate('experience')}
              >
                VIEW ALL ↗
              </button>
            </div>

            {experiences.slice(0, 2).map((item) => {
              const displayTitle = item.company || item.role;
              const displaySubtitle = item.role || item.company;
              const displayDesc = (item.bullets && item.bullets[0]) || item.description || item.location;
              const badgeText = item.period ? item.period.replace(' - ', ' -\n') : '2025';

              return (
                <div key={item.id} className="experience-item">
                  <div className="experience-year-badge">{badgeText}</div>
                  <div>
                    <div className="experience-role">{displayTitle}</div>
                    <div className="experience-company">{displaySubtitle}</div>
                    <div className="experience-desc">{displayDesc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Window>

        {/* BOTTOM GRID: SKILLS.EXE & STATUS.EXE */}
        <div className="bottom-grid">
          {/* MY SKILLS */}
          <Window title="SKILLS.EXE" icon={Award} theme="purple">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ fontFamily: 'var(--font-pixel-sub)', fontSize: '0.8rem', fontWeight: 'bold', color: '#581c87', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  ⭐ MY SKILLS & TOOLS
                </h4>
                <button 
                  className="pixel-btn" 
                  style={{ fontSize: '0.6rem', padding: '2px 8px' }}
                  onClick={() => onNavigate && onNavigate('skills')}
                >
                  VIEW ALL ↗
                </button>
              </div>

              <div className="skills-pills">
                {skillCategories.flatMap(cat => cat.pills || []).slice(0, 8).map((pill, idx) => (
                  <span key={idx} className="skill-chip">✨ {pill}</span>
                ))}
              </div>
            </div>
          </Window>

          {/* STATUS.EXE */}
          <Window title="STATUS.EXE" icon={CheckCircle2} theme="purple">
            <div className="status-card-list">
              <div className="status-card-item">
                <div className="status-card-icon">
                  <MapPin size={20} color="#7e22ce" />
                </div>
                <div className="status-card-content">
                  <div className="status-card-label">LOCATION</div>
                  <div className="status-card-value">{profile?.location || "Pekanbaru, Indonesia"}</div>
                </div>
              </div>

              <div className="status-card-item">
                <div className="status-card-icon">
                  <GraduationCap size={20} color="#7e22ce" />
                </div>
                <div className="status-card-content">
                  <div className="status-card-label">EDUCATION</div>
                  <div className="status-card-value">S1 Manajemen</div>
                </div>
              </div>

              <div className="status-card-item">
                <div className="status-card-icon">
                  <CheckCircle2 size={20} color="#7e22ce" />
                </div>
                <div className="status-card-content">
                  <div className="status-card-label">STATUS</div>
                  <div className="status-card-value">● Open for Opportunities</div>
                </div>
              </div>
            </div>
          </Window>
        </div>

        {/* QUEST TERMINAL // OPEN FOR COLLABORATION BANNER */}
        <div className="quest-banner-window">
          <div className="quest-banner-header">
            <div className="quest-banner-title">
              <span className="quest-dot">●</span>
              <span>QUEST_TERMINAL // OPEN FOR COLLABORATION</span>
            </div>
            <div className="quest-sys-id">SYS_ID #2026-RAHMA</div>
          </div>

          <div className="quest-banner-body">
            <div className="quest-icon-box">
              <Send size={24} color="#ffffff" />
            </div>

            <div className="quest-content">
              <h3 className="quest-heading">HAVE A PROJECT IN MIND?</h3>
              <p className="quest-subtext">
                Let's turn your vision into an impactful result with human capital management, digital marketing, & operations.
              </p>

              <div className="quest-badges">
                <span className="quest-chip">✦ FAST RESPONSE</span>
                <span className="quest-chip">✦ HR & OPERATIONS</span>
                <span className="quest-chip">✦ MARKETING STRATEGY</span>
              </div>
            </div>

            <div className="quest-actions">
              <button 
                className="quest-btn-primary"
                onClick={() => onNavigate && onNavigate('contact')}
              >
                LET'S TALK NOW ↗
              </button>
              <a 
                href={`mailto:${profile?.email || 'rahma.novridayanti25@gmail.com'}`} 
                className="quest-btn-secondary"
              >
                <GmailIcon size={14} />
                <span>SEND EMAIL</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
