import React, { useState } from 'react';
import Window from '../components/Window';
import CertificateModal from '../components/CertificateModal';
import avatarImg from '../assets/images/rahma-avatar.jpg';
import certBnspImg from '../assets/images/cert_bnsp.jpg';
import certMySkillImg from '../assets/images/cert_myskill.jpg';
import certDicodingImg from '../assets/images/cert_dicoding.jpg';
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
  Eye,
  ExternalLink
} from 'lucide-react';
import './Skills.css';

export default function Skills() {
  const [selectedCert, setSelectedCert] = useState(null);
  const { skillCategories, certificates } = usePortfolioData();

  const getCategoryIcon = (index) => {
    const icons = [Monitor, Users, Target, BarChart3];
    return icons[index % icons.length];
  };

  const getCertImage = (cert) => {
    if (cert.imageUrl) return cert.imageUrl;
    if (cert.image) return cert.image;
    if (cert.imageKey === 'certBnspImg' || cert.id === 'cert-1' || cert.certId === 'CERT-KARIRNEXT-01') return certBnspImg;
    if (cert.imageKey === 'certMySkillImg' || cert.id === 'cert-2' || cert.certId === 'CERT-MYSKILL-02') return certMySkillImg;
    if (cert.imageKey === 'certDicodingImg' || cert.id === 'cert-3' || cert.certId === 'CERT-DICODING-03') return certDicodingImg;
    return certBnspImg;
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
      {/* Certificate Modal Lightbox */}
      {selectedCert && (
        <CertificateModal 
          cert={{ ...selectedCert, image: getCertImage(selectedCert) }} 
          onClose={() => setSelectedCert(null)} 
        />
      )}

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
                  src={avatarImg} 
                  alt="Rahma Pixel Portrait" 
                  className="skills-avatar-img" 
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

          {/* SERTIFIKAT PELATIHAN (GAMBAR & LINK PENERBIT) */}
          <Window title="SERTIFIKAT PELATIHAN" icon={Award} tags={['GAMBAR & LINK BUKTI 📜']} theme="purple">
            <div className="cert-cards-row">
              {certificates.map((cert) => {
                const certImage = getCertImage(cert);
                return (
                  <div 
                    key={cert.id} 
                    className="cert-card-item clickable-cert"
                    onClick={() => setSelectedCert(cert)}
                    title={`Klik untuk lihat dokumen ${cert.title}`}
                  >
                    <div 
                      className="cert-thumb-frame"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCert(cert);
                      }}
                    >
                      <img 
                        src={certImage} 
                        alt={cert.title} 
                        className="cert-thumb-img" 
                      />
                    </div>
                    
                    <div className="cert-text-content">
                      <div className="cert-title">{cert.title}</div>
                      <div className="cert-issuer">{cert.issuer}</div>
                      
                      <div className="cert-action-row">
                        <button 
                          type="button"
                          className="cert-preview-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCert(cert);
                          }}
                          title="Buka pratinjau gambar sertifikat"
                        >
                          <Eye size={13} />
                          <span>LIHAT GAMBAR</span>
                        </button>

                        {cert.credentialUrl && (
                          <a 
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="cert-link-btn"
                            onClick={(e) => e.stopPropagation()}
                            title="Buka keabsahan sertifikat di website penerbit"
                          >
                            <ExternalLink size={13} />
                            <span>BUKTI LINK ↗</span>
                          </a>
                        )}
                      </div>
                    </div>
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
