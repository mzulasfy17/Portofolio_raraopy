import React from 'react';
import Window from '../components/Window';
import { FolderGit2, Sparkles } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Projects() {
  const { projects = [] } = usePortfolioData();

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 12px' }}>
      <Window title="PROJECTS_ARCHIVE.EXE" icon={FolderGit2} tags={['• CASE STUDIES', 'PORTFOLIO_V2.5']}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '1rem', color: '#581c87', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>ACADEMIC & CASE STUDY PROJECTS</span>
            <Sparkles size={18} color="#9333ea" />
          </h2>
          <p style={{ fontFamily: 'var(--font-pixel-body)', fontSize: '0.85rem', color: '#6b21a8', margin: 0 }}>
            Daftar proyek akademik, riset studi kasus, dan kampanye digital yang telah dikerjakan.
          </p>
        </div>

        {projects.length === 0 ? (
          <div style={{ background: '#fdf4ff', border: '2px dashed #c084fc', borderRadius: '8px', padding: '24px', textAlign: 'center', color: '#7e22ce', fontFamily: 'var(--font-pixel-body)' }}>
            🐾 Belum ada proyek yang ditambahkan ke database. Silakan tambah proyek melalui Admin Panel.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {projects.map((proj) => (
              <div 
                key={proj.id || Math.random()} 
                style={{ 
                  background: '#ffffff', 
                  border: '2px solid #a855f7', 
                  borderRadius: '10px', 
                  padding: '18px',
                  boxShadow: '3px 3px 0px rgba(107, 33, 168, 0.15)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'inline-block', marginBottom: '10px' }}>
                    <span className="pixel-badge" style={{ background: '#f3e8ff', color: '#6b21a8', border: '1px solid #c084fc' }}>
                      {proj.badgeLabel || 'PROJECT'}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '0.9rem', color: '#581c87', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                    {proj.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-pixel-body)', fontSize: '0.85rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
                    {proj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Window>
    </div>
  );
}
