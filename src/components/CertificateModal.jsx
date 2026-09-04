import React from 'react';
import { Award, CheckCircle2, X, ExternalLink, ShieldCheck, FileText } from 'lucide-react';
import certBnspImg from '../assets/images/cert_bnsp.jpg';
import certMySkillImg from '../assets/images/cert_myskill.jpg';
import certDicodingImg from '../assets/images/cert_dicoding.jpg';
import './CertificateModal.css';

const isPdfFile = (url) => {
  if (!url) return false;
  const lower = url.toLowerCase();
  return lower.includes('data:application/pdf') || lower.endsWith('.pdf') || lower.includes('.pdf?');
};

const resolveCertImage = (cert) => {
  if (!cert) return null;
  if (cert.imageUrl && !isPdfFile(cert.imageUrl)) return cert.imageUrl;
  if (cert.image && !isPdfFile(cert.image)) return cert.image;
  if (cert.imageKey === 'certBnspImg' || cert.id === 'cert-1' || cert.certId === 'CERT-KARIRNEXT-01') return certBnspImg;
  if (cert.imageKey === 'certMySkillImg' || cert.id === 'cert-2' || cert.certId === 'CERT-MYSKILL-02') return certMySkillImg;
  if (cert.imageKey === 'certDicodingImg' || cert.id === 'cert-3' || cert.certId === 'CERT-DICODING-03') return certDicodingImg;
  return null;
};

const formatExternalUrl = (url) => {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('//') || trimmed.startsWith('/') || trimmed.startsWith('mailto:')) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

export default function CertificateModal({ cert, onClose }) {
  if (!cert) return null;

  const certImg = resolveCertImage(cert);
  const pdfUrl = (cert.credentialUrl && isPdfFile(cert.credentialUrl)) 
    ? cert.credentialUrl 
    : (cert.imageUrl && isPdfFile(cert.imageUrl)) 
      ? cert.imageUrl 
      : null;
  const formattedUrl = formatExternalUrl(pdfUrl || cert.credentialUrl);

  return (
    <div className="cert-modal-backdrop" onClick={onClose}>
      <div className="cert-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Retro Header */}
        <div className="cert-modal-header">
          <div className="cert-modal-title">
            <Award size={16} />
            <span>CERTIFICATE_VIEWER.EXE // {cert.id || 'PREVIEW'}</span>
          </div>
          <button className="cert-modal-close-btn" onClick={onClose} title="Close Preview">
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="cert-modal-body">
          {/* Certificate Document Image / PDF Frame */}
          <div className="cert-paper-frame">
            {pdfUrl ? (
              <div style={{ background: '#faf5ff', borderRadius: '12px', border: '2px solid #d8b4fe', padding: '24px', textAlign: 'center' }}>
                <FileText size={48} color="#7e22ce" style={{ margin: '0 auto 12px auto', display: 'block' }} />
                <h4 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '0.82rem', color: '#581c87', margin: '0 0 8px 0' }}>
                  📄 DOKUMEN SERTIFIKAT (FORMAT PDF)
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#6b21a8', margin: '0 0 16px 0' }}>
                  Dokumen bukti sertifikasi diunggah dalam format file PDF resmi.
                </p>
                <a 
                  href={formatExternalUrl(pdfUrl)} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="cert-action-btn external-link-btn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', textDecoration: 'none' }}
                >
                  <ExternalLink size={16} />
                  <span>LIHAT / BUKA DOKUMEN PDF LENGKAP ↗</span>
                </a>
              </div>
            ) : certImg ? (
              <div className="cert-image-container">
                <img 
                  src={certImg} 
                  alt={cert.title} 
                  className="cert-document-img" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="cert-verified-overlay-badge">
                  <ShieldCheck size={14} color="#ffffff" />
                  <span>VERIFIED ORIGINAL DOCUMENT</span>
                </div>
              </div>
            ) : (
              <div className="cert-paper-inner">
                <div className="cert-watermark">RAHMA OS</div>
                <div className="cert-top-row">
                  <div className="cert-seal-badge">
                    <ShieldCheck size={20} color="#7e22ce" />
                    <span>VERIFIED CREDENTIAL</span>
                  </div>
                  <div className="cert-sys-code">ID: {cert.credentialId || 'REF-2024-RM'}</div>
                </div>

                <div className="cert-content-main">
                  <div className="cert-subtitle">CERTIFICATE OF ACHIEVEMENT</div>
                  <h2 className="cert-main-title">{cert.title}</h2>
                  <div className="cert-presented-text">PROUDLY PRESENTED TO</div>
                  <div className="cert-recipient-name">RAHMA NOVRIDAYANTI, S.M.</div>
                  <p className="cert-description">{cert.description}</p>
                </div>
              </div>
            )}
          </div>

          {/* Certificate Meta Info Box */}
          <div className="cert-details-box">
            <h3 className="cert-details-title">{cert.title}</h3>
            <div className="cert-details-meta">
              <span><strong>Penerbit:</strong> {cert.issuer}</span>
              <span><strong>ID Kredensial:</strong> {cert.credentialId}</span>
            </div>
            <p className="cert-details-desc">{cert.description}</p>

            {cert.skills && (
              <div className="cert-skills-tags-row">
                <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#7e22ce' }}>VERIFIED SKILLS:</span>
                {cert.skills.map((s, idx) => (
                  <span key={idx} className="cert-skill-tag">✓ {s}</span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Action Controls */}
          <div className="cert-modal-actions">
            {formattedUrl && (
              <a 
                href={formattedUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="cert-action-btn external-link-btn"
                title="Buka bukti keabsahan sertifikat di website resmi penerbit"
              >
                <ExternalLink size={15} />
                <span>BUKTI SERTIFIKAT (LINK PENERBIT) ↗</span>
              </a>
            )}
            <button className="cert-action-btn primary" onClick={onClose}>
              <CheckCircle2 size={15} />
              <span>TUTUP PREVIEW</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
