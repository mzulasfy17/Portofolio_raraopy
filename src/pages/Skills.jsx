import React, { useState } from 'react';
import Window from '../components/Window';
import CertificateModal from '../components/CertificateModal';
import avatarImg from '../assets/images/rahma-avatar.jpg';
import certBnspImg from '../assets/images/cert_bnsp.jpg';
import certMySkillImg from '../assets/images/cert_myskill.jpg';
import certDicodingImg from '../assets/images/cert_dicoding.jpg';
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
  FileCheck2,
  FolderGit2,
  Eye,
  ExternalLink
} from 'lucide-react';
import './Skills.css';

export default function Skills() {
  const [selectedCert, setSelectedCert] = useState(null);

  const techCategories = [
    {
      title: 'DATA & MANAGEMENT TOOLS',
      icon: Monitor,
      pills: ['Microsoft Excel (Advanced)', 'SPSS Statistics', 'HRIS System', 'Power BI', 'Canva Pro']
    },
    {
      title: 'HUMAN CAPITAL & HR',
      icon: Users,
      pills: ['Talent Acquisition', 'Performance Mgmt', 'Employee Relations', 'Training & Dev']
    },
    {
      title: 'DIGITAL MARKETING',
      icon: Target,
      pills: ['Social Media Strategy', 'Content Creation', 'Copywriting', 'Instagram/TikTok Ads']
    },
    {
      title: 'BUSINESS OPERATIONS',
      icon: BarChart3,
      pills: ['Project Operations', 'Financial Admin', 'Event Planning', 'CMS System', 'Public Relations']
    }
  ];

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

  const certificates = [
    {
      id: 'CERT-KARIRNEXT-01',
      title: 'Sertifikasi Microsoft Office Excel, Word & Power Point Specialist',
      issuer: 'KarirNex / PT Ebiz Karisma Internasional • 2026',
      credentialId: 'rig1xRo',
      icon: Award,
      image: certBnspImg,
      credentialUrl: 'https://karirnex.com/c/rig1xRo',
      description: 'Sertifikasi resmi kompetensi nasional dalam mengelola sumber daya manusia, perencanaan tenaga kerja, rekrutmen, serta pengoperasian sistem HRIS perusahaan.',
      skills: ['HRIS Management', 'Talent Acquisition', 'Employee Performance', 'Workplace Relations']
    },
    {
      id: 'CERT-MYSKILL-02',
      title: 'Mastering Excel Data Analysis & SPSS',
      issuer: 'MySkill Intensive Bootcamp • 2024',
      credentialId: 'MYSKILL-EXCEL-SPSS-7714',
      icon: FileCheck2,
      image: certMySkillImg,
      credentialUrl: 'https://myskill.id/',
      description: 'Pelatihan intensif analisis data kuantitatif menggunakan fitur advanced Microsoft Excel (PivotTable, VLOOKUP/XLOOKUP, Dynamic Charts) serta uji hipotesis regresi dengan SPSS.',
      skills: ['Advanced Excel', 'SPSS Hypothesis Testing', 'Data Cleaning', 'Business Analytics']
    },
    {
      id: 'CERT-DICODING-03',
      title: 'Digital Marketing & Content Strategy',
      issuer: 'Dicoding Indonesia • 2024',
      credentialId: 'DICODING-DM-2024-3329',
      icon: FolderGit2,
      image: certDicodingImg,
      credentialUrl: 'https://www.dicoding.com/',
      description: 'Kelulusan program strategi pemasaran digital, analisis audiens media sosial, perencanaan konten kreatif, copywriting promosi, serta manajemen kampanye iklan.',
      skills: ['Social Media Strategy', 'Copywriting', 'Content Planning', 'Instagram & TikTok Ads']
    }
  ];

  return (
    <div className="skills-container">
      {/* Certificate Modal Lightbox */}
      {selectedCert && (
        <CertificateModal 
          cert={selectedCert} 
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
              {techCategories.map((cat, idx) => {
                const IconComp = cat.icon;
                return (
                  <div key={idx} className="tech-skill-card">
                    <div className="tech-skill-header">
                      <IconComp size={16} color="#7e22ce" />
                      <span>{cat.title}</span>
                    </div>
                    <div className="tech-pill-list">
                      {cat.pills.map((pill, pIdx) => (
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
                return (
                  <div 
                    key={cert.id} 
                    className="cert-card-item clickable-cert"
                    onClick={() => setSelectedCert(cert)}
                    title={`Klik untuk lihat dokumen ${cert.title}`}
                  >
                    <div className="cert-thumb-frame">
                      <img 
                        src={cert.image} 
                        alt={cert.title} 
                        className="cert-thumb-img" 
                      />
                    </div>
                    
                    <div className="cert-text-content">
                      <div className="cert-title">{cert.title}</div>
                      <div className="cert-issuer">{cert.issuer}</div>
                      
                      <div className="cert-action-row">
                        <span className="cert-preview-badge">
                          <Eye size={12} />
                          <span>LIHAT GAMBAR</span>
                        </span>

                        {cert.credentialUrl && (
                          <a 
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="cert-link-btn"
                            onClick={(e) => e.stopPropagation()}
                            title="Buka keabsahan sertifikat di website penerbit"
                          >
                            <ExternalLink size={12} />
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
