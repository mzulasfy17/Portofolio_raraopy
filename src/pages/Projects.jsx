import React from 'react';
import Window from '../components/Window';
import { FolderGit2 } from 'lucide-react';

export default function Projects() {
  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 12px' }}>
      <Window title="PROJECTS_ARCHIVE.EXE" icon={FolderGit2}>
        <h2 style={{ fontFamily: 'var(--font-pixel-heading)', color: '#581c87', marginBottom: '16px' }}>
          ACADEMIC & CASE STUDY PROJECTS
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <div style={{ background: '#fff', border: '2px solid #a855f7', borderRadius: '8px', padding: '16px' }}>
            <span className="pixel-badge" style={{ marginBottom: '8px' }}>SKRIPSI / FINAL RESEARCH</span>
            <h3 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '0.85rem', color: '#581c87', margin: '6px 0' }}>
              Analisis Pengaruh Budaya Organisasi Terhadap Kinerja Karyawan
            </h3>
            <p style={{ fontFamily: 'var(--font-pixel-body)', fontSize: '0.85rem', color: '#475569', lineHeight: '1.4' }}>
              Penelitian analisis kuantitatif menggunakan SPSS untuk menguji hubungan antara komunikasi internal dan motivasi kerja terhadap produktivitas tim.
            </p>
          </div>

          <div style={{ background: '#fff', border: '2px solid #a855f7', borderRadius: '8px', padding: '16px' }}>
            <span className="pixel-badge" style={{ marginBottom: '8px' }}>MARKETING CAMPAIGN</span>
            <h3 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '0.85rem', color: '#581c87', margin: '6px 0' }}>
              Digital Marketing Strategy Plan for Local MSME
            </h3>
            <p style={{ fontFamily: 'var(--font-pixel-body)', fontSize: '0.85rem', color: '#475569', lineHeight: '1.4' }}>
              Perancangan strategi re-branding, perencanaan konten Instagram/TikTok, serta pemetaan target pasar konsumen muda bagi UMKM lokal.
            </p>
          </div>
        </div>
      </Window>
    </div>
  );
}
