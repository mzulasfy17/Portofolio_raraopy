import React from 'react';
import Window from '../components/Window';
import { FolderGit2 } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Projects() {
  const { projects } = usePortfolioData();

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 12px' }}>
      <Window title="PROJECTS_ARCHIVE.EXE" icon={FolderGit2}>
        <h2 style={{ fontFamily: 'var(--font-pixel-heading)', color: '#581c87', marginBottom: '16px' }}>
          ACADEMIC & CASE STUDY PROJECTS
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {projects.map((proj) => (
            <div key={proj.id} style={{ background: '#fff', border: '2px solid #a855f7', borderRadius: '8px', padding: '16px' }}>
              <span className="pixel-badge" style={{ marginBottom: '8px' }}>
                {proj.badgeLabel || 'PROJECT'}
              </span>
              <h3 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '0.85rem', color: '#581c87', margin: '6px 0' }}>
                {proj.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-pixel-body)', fontSize: '0.85rem', color: '#475569', lineHeight: '1.4' }}>
                {proj.description}
              </p>
            </div>
          ))}
        </div>
      </Window>
    </div>
  );
}
