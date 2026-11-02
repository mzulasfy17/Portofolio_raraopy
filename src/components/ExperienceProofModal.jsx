import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Briefcase, 
  Building2, 
  Calendar, 
  MapPin, 
  X, 
  ShieldCheck, 
  Camera,
  Sparkles
} from 'lucide-react';
import './ExperienceProofModal.css';

export default function ExperienceProofModal({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item || item.noPhoto || item.imageUrl === '' || item.imageUrl === 'none' || item.photoUrl === '') return null;

  const imageUrl = item.imageUrl || item.photoUrl || (
    (item.imageUrl === undefined && item.photoUrl === undefined) ? (
      (item.id === 'exp-2' || (item.company && item.company.toUpperCase().includes('FITRA WIKA')) ? '/internship_proof.jpg' : null) ||
      (item.id === 'exp-2b' || (item.company && item.company.toUpperCase().includes('DUMAI')) ? '/internship_dumai_beton.jpg' : null)
    ) : null
  );
  if (!imageUrl) return null;

  const captionText = item.imageCaption || 
    (item.id === 'exp-2' || (item.company && item.company.toUpperCase().includes('FITRA WIKA')) ? 'Dokumentasi Pelaksanaan Magang Divisi Keuangan - PT. FITRA WIKA' : null) ||
    (item.id === 'exp-2b' || (item.company && item.company.toUpperCase().includes('DUMAI')) ? 'Dokumentasi Kegiatan Administrasi & Operasional Spun Pile - PT Dumai Jaya Beton' : null) ||
    (item.category === 'internship' ? `Dokumentasi Resmi Kegiatan Magang - ${item.company}` : `Dokumentasi Kegiatan - ${item.company}`);

  const modalContent = (
    <div className="proof-modal-backdrop" onClick={onClose}>
      <div className="proof-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Retro Header Bar */}
        <div className="proof-modal-header">
          <div className="proof-modal-title">
            <Camera size={16} />
            <span>EVIDENCE_VIEWER.EXE // {item.category?.toUpperCase() || 'EXPERIENCE'}_PROOF</span>
          </div>
          <div className="proof-modal-controls">
            <span className="proof-window-btn minimize">_</span>
            <span className="proof-window-btn maximize">[]</span>
            <button className="proof-modal-close-btn" onClick={onClose} title="Tutup Bukti">
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="proof-modal-body">
          {/* Metadata Card Info */}
          <div className="proof-meta-banner">
            <div className="proof-meta-top">
              <div className="proof-category-badge">
                <Briefcase size={12} />
                <span>{item.badgeLabel || item.category?.toUpperCase() || 'PENGALAMAN'}</span>
              </div>
              <div className="proof-verified-pill">
                <ShieldCheck size={13} />
                <span>TERVERIFIKASI RESMI</span>
              </div>
            </div>

            <h3 className="proof-item-role">{item.role}</h3>
            
            <div className="proof-item-subinfo">
              <span className="proof-sub-item">
                <Building2 size={13} />
                <strong>{item.company}</strong>
              </span>
              {item.period && (
                <span className="proof-sub-item">
                  <Calendar size={13} />
                  <span>{item.period}</span>
                </span>
              )}
              {item.location && (
                <span className="proof-sub-item">
                  <MapPin size={13} />
                  <span>{item.location}</span>
                </span>
              )}
            </div>
          </div>

          {/* Photo Display Frame */}
          <div className="proof-image-frame">
            <div className="proof-image-wrapper">
              <img 
                src={imageUrl} 
                alt={`Bukti Magang ${item.role} di ${item.company}`}
                className="proof-full-image"
                decoding="async"
              />
              <div className="proof-stamp-badge">
                <Sparkles size={13} color="#ffffff" />
                <span>OFFICIAL INTERNSHIP EVIDENCE</span>
              </div>
            </div>

            {/* Caption */}
            {captionText && (
              <div className="proof-caption-box">
                <span className="proof-caption-icon">📸</span>
                <span className="proof-caption-text">{captionText}</span>
              </div>
            )}
          </div>

          {/* Actions Footer */}
          <div className="proof-modal-footer" style={{ justifyContent: 'flex-end' }}>
            <button 
              type="button" 
              className="proof-btn-close"
              onClick={onClose}
            >
              TUTUP PREVIEW
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
