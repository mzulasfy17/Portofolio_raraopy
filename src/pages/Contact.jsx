import React, { useState } from 'react';
import Window from '../components/Window';
import avatarImg from '../assets/images/rahma-avatar.jpg';
import mailboxImg from '../assets/images/purple_cat_mailbox.jpg';
import { GmailIcon, LinkedInIcon } from '../components/BrandIcons';
import emailjs from '@emailjs/browser';
import { 
  MapPin, 
  Send, 
  CheckCircle2, 
  User, 
  MessageSquare,
  AlertCircle,
  Loader2
} from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validasi
  if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
    setStatusMessage({
      type: 'error',
      text: 'Nama, email, dan pesan wajib diisi.'
    });
    return;
  }

  setIsSending(true);
  setStatusMessage(null);

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  try {
    // =====================================================
    // 1. EMAILJS
    // =====================================================
    if (serviceId && templateId && publicKey) {
      const templateParams = {
        // Sesuai dengan {{name}} di EmailJS
        name: formData.name.trim(),

        // Sesuai dengan {{email}} di EmailJS
        email: formData.email.trim(),

        // Subject
        subject:
          formData.subject.trim() || 'Pesan dari Portofolio Website',

        // Isi pesan
        message: formData.message.trim(),

        // Tambahan agar tetap kompatibel jika template
        // masih menggunakan nama variabel lama
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),

        // Untuk Reply-To
        reply_to: formData.email.trim()
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        {
          publicKey: publicKey
        }
      );

      setStatusMessage({
        type: 'success',
        text: 'Pesan berhasil terkirim ke email Rahma! 📩✨'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    // =====================================================
    // 2. WEB3FORMS FALLBACK
    // =====================================================
    } else if (web3Key) {
      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3Key,
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject:
              formData.subject.trim() ||
              'Pesan dari Portofolio Rahma',
            message: formData.message.trim()
          })
        }
      );

      const resData = await response.json();

      if (!resData.success) {
        throw new Error(
          resData.message || 'Gagal mengirim pesan.'
        );
      }

      setStatusMessage({
        type: 'success',
        text: 'Pesan berhasil terkirim ke email Rahma! 📩✨'
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    // =====================================================
    // 3. DEMO MODE
    // =====================================================
    } else {
      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      setStatusMessage({
        type: 'success',
        text: 'Form berhasil diproses. Konfigurasi EmailJS terlebih dahulu agar pesan benar-benar terkirim. 📩✨'
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }

  } catch (error) {
    console.error('Email Dispatch Error:', error);

    setStatusMessage({
      type: 'error',
      text: 'Gagal mengirim pesan. Silakan coba lagi atau hubungi Rahma melalui email langsung.'
    });

  } finally {
    setIsSending(false);
  }
};

  return (
    <div className="contact-container">
      <div className="contact-layout">
        {/* LEFT PROFILE SIDEBAR */}
        <aside className="contact-sidebar">
          <div className="profile-card-window">
            <div className="skills-photo-header">
              <div className="skills-photo-title">
                <User size={14} color="#7e22ce" />
                <span>PROFILE.EXE</span>
              </div>
              <div style={{ fontSize: '10px', color: '#7e22ce' }}>_ [] X</div>
            </div>

            <div className="profile-card-body">
              <div className="profile-avatar-frame">
                <img 
                  src={avatarImg} 
                  alt="Rahma Novridayanti Pixel Portrait" 
                  className="profile-avatar-img" 
                />
                <div className="skills-avatar-badge">● PROFILE 🌟</div>
              </div>

              <h2 className="profile-role-title">
                Management & HR Specialist
              </h2>

              <p className="profile-tagline">
                Optimizing human capital, digital marketing strategy, and business operations with excellence.
              </p>

              <hr className="profile-divider" />

              <div className="profile-info-list">
                <div className="profile-info-item">
                  <MapPin size={16} color="#7e22ce" />
                  <span>Pekanbaru, Indonesia</span>
                </div>

                <a 
                  href="mailto:rahma.novridayanti25@gmail.com" 
                  className="profile-info-item interactive-link"
                  title="Send Gmail Email"
                >
                  <GmailIcon size={16} />
                  <span>rahma.novridayanti25@gmail.com</span>
                </a>

                <a 
                  href="https://www.linkedin.com/in/rahma-novridayanti/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="profile-info-item interactive-link"
                  title="View Official LinkedIn Profile"
                >
                  <LinkedInIcon size={16} />
                  <span>LinkedIn / rahma-novridayanti</span>
                </a>

                <div className="profile-info-item status">
                  <CheckCircle2 size={16} color="#9333ea" />
                  <span>● Open for Opportunities 🐾</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTACT AREA */}
        <main className="contact-main-area">
          <Window title="CONTACT.EXE" icon={MessageSquare} tags={['SEND MESSAGE 🐾']} theme="purple">
            <div className="contact-main-header">
              <h2 className="contact-main-title">
                <MessageSquare size={20} color="#6b21a8" />
                <span>SEND ME A MESSAGE</span>
                <span style={{ fontSize: '1rem' }}>🐾</span>
              </h2>
              <p className="contact-main-subtitle">
                Punya pertanyaan atau ingin bekerja sama? Kirim pesan melalui form di bawah ini. ✨
              </p>
              <hr className="skills-divider" />
            </div>

            {statusMessage && (
              <div className={`status-toast ${statusMessage.type}`}>
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 size={18} color="#9333ea" />
                ) : (
                  <AlertCircle size={18} color="#ef4444" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <div className="contact-grid">
              {/* Form Left Side */}
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama lengkap kamu" 
                    className="form-input"
                    disabled={isSending}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@contoh.com" 
                    className="form-input"
                    disabled={isSending}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject / Topik" 
                    className="form-input"
                    disabled={isSending}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tulis pesanmu di sini..." 
                    className="form-textarea"
                    disabled={isSending}
                    required
                  />
                </div>

                <button type="submit" className="contact-submit-btn" disabled={isSending}>
                  {isSending ? (
                    <>
                      <Loader2 size={16} className="spinner-icon" />
                      <span>SENDING MESSAGE...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>SEND MESSAGE</span>
                      <span>🐾</span>
                    </>
                  )}
                </button>
              </form>

              {/* Mailbox Right Side */}
              <div className="mailbox-box">
                <div className="mailbox-frame">
                  <img 
                    src={mailboxImg} 
                    alt="Purple Pixel Cat Mailbox" 
                    className="mailbox-img" 
                  />
                </div>

                <div className="mailbox-speech-bubble">
                  I'm excited to hear from you! Pixel Kitty & I will try our best to respond as soon as possible. ✨ 🐾
                </div>
              </div>
            </div>
          </Window>
        </main>
      </div>
    </div>
  );
}
