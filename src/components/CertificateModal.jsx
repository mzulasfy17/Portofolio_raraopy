import React from 'react';
import { Award, CheckCircle2, X, ExternalLink, ShieldCheck } from 'lucide-react';
import './CertificateModal.css';

export default function CertificateModal({ cert, onClose }) {
  if (!cert) return null;

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
          {/* Certificate Document Image Frame */}
          <div className="cert-paper-frame">
            {cert.image ? (
              <div className="cert-image-container">
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="cert-document-img" 
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
            {cert.credentialUrl && (
              <a 
                href={cert.credentialUrl} 
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
