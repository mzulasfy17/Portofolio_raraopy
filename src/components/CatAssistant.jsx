import React, { useState } from 'react';
import pixelGreyKitty from '../assets/images/pixel_grey_kitty.png';

export default function CatAssistant() {
  const [isOpen, setIsOpen] = useState(true);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const dialogues = [
    "Meow! Saya Pixel Kitty, asisten kucing Rahma. 🐱💜",
    "Rahma adalah lulusan Fresh Graduate Manajemen yang terampil & kreatif!",
    "Ahli di bidang Human Capital, Digital Marketing, & Business Ops. 🐾",
    "Klik tombol CONTACT jika ingin berkolaborasi dengan Rahma!"
  ];

  const nextDialogue = () => {
    setDialogueIndex((prev) => (prev + 1) % dialogues.length);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '8px'
    }}>
      {isOpen && (
        <div 
          key={dialogueIndex}
          className="cat-speech-bubble-pop"
          style={{
            background: '#ffffff',
            border: '2px solid #a855f7',
            borderRadius: '12px',
            padding: '10px 14px',
            maxWidth: '240px',
            boxShadow: '4px 4px 0px rgba(107, 33, 168, 0.25)',
            position: 'relative',
            fontFamily: 'var(--font-pixel-sub)',
            fontSize: '0.72rem',
            color: '#581c87',
            cursor: 'pointer'
          }} 
          onClick={nextDialogue}
        >
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            right: '28px',
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid #a855f7'
          }} />
          <p style={{ margin: 0, lineHeight: 1.4 }}>
            {dialogues[dialogueIndex]}
          </p>
          <div style={{
            fontSize: '0.55rem',
            color: '#a855f7',
            marginTop: '6px',
            textAlign: 'right',
            fontWeight: 'bold'
          }}>
            [Klik untuk lanjut 🐾]
          </div>
        </div>
      )}

      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '56px',
          height: '56px',
          background: '#f3e8ff',
          border: '3px solid #9333ea',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0px 4px 0px rgba(107, 33, 168, 0.3)',
          overflow: 'hidden',
          transition: 'transform 0.2s ease',
          padding: '4px'
        }}
        className="animated-cat-bounce"
        title="Pixel Assistant Kitty 🐾"
      >
        <img 
          src={pixelGreyKitty} 
          alt="Pixel Assistant Kitty" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}
