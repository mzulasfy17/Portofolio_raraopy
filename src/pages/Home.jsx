import React from 'react';
import Window from '../components/Window';
import Typewriter from '../components/Typewriter';
import { GmailIcon } from '../components/BrandIcons';
import { 
  User, 
  Briefcase, 
  Award, 
  Monitor, 
  Target, 
  BarChart3, 
  GraduationCap, 
  CheckCircle2,
  Download,
  FileText,
  Send,
  Mail,
  MapPin
} from 'lucide-react';
import './Home.css';
import avatarImg from '../assets/images/rahma-avatar.jpg';

export default function Home({ onNavigate }) {
  return (
    <div className="home-container">
      {/* LEFT COLUMN: WELCOME & AVATAR CARD */}
      <aside className="left-column">
        <Window title="WELCOME.EXE" icon={Monitor} tags={['• PROFILE MODE 🌟']} theme="purple">
          <div className="welcome-card-content">
            <div className="avatar-frame">
              <img src={avatarImg} alt="Rahma Novridayanti Pixel Portrait" />
              <div className="avatar-badge">● PROFILE 🌟</div>
            </div>

            <div className="welcome-title-box">
              <h2 className="welcome-heading">
                WELCOME TO MY <br />
                <span style={{ color: '#9333ea' }}>PORTFOLIO!</span> <span style={{ color: '#c084fc' }}>💜</span>
              </h2>
            </div>

            <div className="typewriter-badge">
              &gt; <Typewriter text="Management & HR Specialist ✨" speed={70} delay={500} />
            </div>

            <div className="specialty-list">
              <div className="specialty-item">
                <FileText size={16} color="#9333ea" />
                <span>Human Capital Management</span>
              </div>
              <div className="specialty-item">
                <Target size={16} color="#7e22ce" />
                <span>Digital Marketing Strategy</span>
              </div>
              <div className="specialty-item">
                <BarChart3 size={16} color="#a855f7" />
                <span>Data & Operations Analysis</span>
              </div>
              <div className="specialty-item">
                <GraduationCap size={16} color="#6b21a8" />
                <span>Fresh Grad Manajemen (S.M.)</span>
              </div>
            </div>

            {/* DOWNLOAD CV BUTTON */}
            <div className="download-cv-container">
              <a 
                href="\public\CV_Rahma_Novridayanti.pdf" 
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
              <span>
                Halo! Saya <strong>Rahma Novridayanti, S.M.</strong>, seorang lulusan Fresh Graduate Manajemen yang berdedikasi tinggi dalam mengoptimalkan pengelolaan sumber daya manusia, strategi pemasaran digital, dan efisiensi operasional bisnis.
              </span>
            </p>

            <p className="about-paragraph">
              <span className="prompt-symbol">&gt;</span>
              <span>
                Memiliki pemahaman kuat mengenai Human Resource Information System (HRIS), manajemen talenta, analisis data bisnis menggunakan SPSS & Excel, serta strategi komunikasi pemasaran yang efektif.
              </span>
            </p>

            <p className="about-paragraph">
              <span className="prompt-symbol">&gt;</span>
              <span>
                Saya bersemangat untuk terus belajar, beradaptasi dengan tantangan baru, dan memberikan kontribusi nyata dalam pengembangan organisasi maupun perusahaan tempat saya bekerja.
              </span>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '0.9rem', color: '#581c87', display: 'flex', alignItems: 'center', gap: '6px' }}>
                💼 EXPERIENCE
              </h3>
              <button 
                className="pixel-btn"
                onClick={() => onNavigate && onNavigate('experience')}
              >
                VIEW ALL ↗
              </button>
            </div>

            <div className="experience-item">
              <div className="experience-year-badge">2025</div>
              <div>
                <div className="experience-role">PT. FITRA WIKA </div>
                <div className="experience-company">Intern</div>
                <div className="experience-desc">
                  Membantu proses administrasi keuangan, termasuk pencatatan transaksi harian dan pengarsipan dokumen. 
                </div>
              </div>
            </div>

            <div className="experience-item">
              <div className="experience-year-badge">2024</div>
              <div>
                <div className="experience-role">Himpunan Mahasiswa Manajemen</div>
                <div className="experience-company">Head of Public Relations & Event Manager</div>
                <div className="experience-desc">
                  Memimpin koordinasi komunikasi publik, mengelola kemitraan media, dan sukses menyelenggarakan Seminar Nasional Karir dengan 300+ peserta.
                </div>
              </div>
            </div>
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
                <span className="skill-chip">📊 Microsoft Excel</span>
                <span className="skill-chip">📈 SPSS Analysis</span>
                <span className="skill-chip">👥 HRIS System</span>
                <span className="skill-chip">🎯 Digital Marketing</span>
                <span className="skill-chip">🎨 Canva & Branding</span>
                <span className="skill-chip">🎤 Public Speaking</span>
                <span className="skill-chip">⚙️ Operations</span>
                <span className="skill-chip">💼 Talent Acquisition</span>
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
                  <div className="status-card-value">Pekanbaru, Indonesia</div>
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
                href="mailto:rahma.novridayanti25@gmail.com" 
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
