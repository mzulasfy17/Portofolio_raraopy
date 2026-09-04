import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../services/firebase';
import Window from '../components/Window';
import { 
  usePortfolioData,
  updateLocalMemoryCache
} from '../hooks/usePortfolioData';
import { 
  addExperience, 
  updateExperience, 
  deleteExperience,
  saveSkillCategory,
  deleteSkillCategory,
  saveCertificate,
  deleteCertificate,
  saveProject,
  deleteProject,
  updateProfile,
  updateIntro,
  updateNavbar,
  updateFooter,
  seedInitialFirebaseData,
  uploadFileToStorage
} from '../services/dataService';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  Database, 
  Briefcase, 
  Award, 
  FolderGit2, 
  User, 
  X,
  AlertTriangle,
  CheckCircle,
  UploadCloud,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  Loader2,
  Calendar,
  Eye,
  EyeOff,
  Compass
} from 'lucide-react';
import './Admin.css';

const MONTH_OPTIONS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const YEAR_OPTIONS = Array.from({ length: 15 }, (_, i) => 2018 + i);

export default function Admin() {
  const { experiences, skillCategories, certificates, projects, profile, intro, navbar, footer, refreshData } = usePortfolioData();

  // Auth States
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState('experiences');

  // Status & Notifications
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '' }
  const [actionLoading, setActionLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'exp' | 'skillCat' | 'cert' | 'proj' | null
  const [editingItem, setEditingItem] = useState(null);

  // Experience Date Picker State
  const [startMonth, setStartMonth] = useState('Januari');
  const [startYear, setStartYear] = useState('2024');
  const [endMonth, setEndMonth] = useState('Desember');
  const [endYear, setEndYear] = useState('2025');
  const [isCurrent, setIsCurrent] = useState(false);

  // Certificate Date Picker State
  const [certMonth, setCertMonth] = useState('Januari');
  const [certYear, setCertYear] = useState('2024');

  // Form States
  const [expForm, setExpForm] = useState({
    category: 'education',
    badgeLabel: 'EDUCATION',
    role: '',
    company: '',
    location: '',
    bulletsStr: '',
    skillsStr: ''
  });

  const [skillCatForm, setSkillCatForm] = useState({
    title: '',
    pillsStr: ''
  });

  const [certForm, setCertForm] = useState({
    certId: '',
    title: '',
    issuerName: '',
    credentialId: '',
    imageUrl: '',
    credentialUrl: '',
    description: '',
    skillsStr: ''
  });

  const [projForm, setProjForm] = useState({
    badgeLabel: 'PROJECT',
    title: '',
    description: ''
  });

  const [profileForm, setProfileForm] = useState({
    name: '',
    tagline: '',
    bio: '',
    cvUrl: '',
    location: '',
    email: '',
    specialtiesStr: ''
  });

  const [introForm, setIntroForm] = useState({
    title: '',
    subtitle: '',
    badge: '',
    welcomeText: '',
    bootLogsStr: ''
  });

  const [navbarForm, setNavbarForm] = useState({
    title: '',
    subtitle: ''
  });

  const [footerForm, setFooterForm] = useState({
    brandTitle: '',
    brandSubtitle: '',
    email: '',
    linkedin: '',
    copyrightText: '',
    statusText: '',
    showSecretPaw: true
  });

  // Listen to Firebase Auth state
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Update profile form state when profile data loads
  useEffect(() => {
    if (profile) {
      setProfileForm({
        name: profile.name || '',
        tagline: profile.tagline || '',
        bio: profile.bio || '',
        cvUrl: profile.cvUrl || '',
        location: profile.location || '',
        email: profile.email || '',
        specialtiesStr: (profile.specialties || []).join(', ')
      });
    }
  }, [profile]);

  useEffect(() => {
    if (intro) {
      setIntroForm({
        title: intro.title || '',
        subtitle: intro.subtitle || '',
        badge: intro.badge || '',
        welcomeText: intro.welcomeText || '',
        bootLogsStr: (intro.bootLogLines || []).join('\n')
      });
    }
  }, [intro]);

  useEffect(() => {
    if (navbar) {
      setNavbarForm({
        title: navbar.title || '',
        subtitle: navbar.subtitle || ''
      });
    }
  }, [navbar]);

  useEffect(() => {
    if (footer) {
      setFooterForm({
        brandTitle: footer.brandTitle || '',
        brandSubtitle: footer.brandSubtitle || '',
        email: footer.email || '',
        linkedin: footer.linkedin || '',
        copyrightText: footer.copyrightText || '',
        statusText: footer.statusText || '',
        showSecretPaw: footer.showSecretPaw !== false
      });
    }
  }, [footer]);

  const showToast = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!isFirebaseConfigured || !auth) {
      setAuthError('Firebase belum dikonfigurasi di file .env. Anda dapat menggunakan Demo Mode untuk pratinjau.');
      return;
    }

    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast('success', 'Berhasil login ke Admin Dashboard!');
    } catch (err) {
      console.error(err);
      setAuthError('Email atau password salah! (' + err.message + ')');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (isDemoMode) {
      setIsDemoMode(false);
      return;
    }
    if (auth) {
      await signOut(auth);
      showToast('success', 'Berhasil logout.');
    }
  };

  const handleSeedDatabase = async () => {
    if (!window.confirm('Apakah Anda yakin ingin mengisi Firestore Database dengan data awal (seed data)?')) return;
    setActionLoading(true);
    try {
      await seedInitialFirebaseData();
      await refreshData();
      showToast('success', 'Data awal berhasil di-seed ke Firebase Firestore!');
    } catch (err) {
      showToast('error', 'Gagal seed data: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // --- FILE UPLOAD HANDLERS (IMAGES & PDF DOCUMENTS) ---
  const handleCertFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      const fileUrl = await uploadFileToStorage(file, 'certificates');
      const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');

      if (isPdf) {
        setCertForm(prev => ({ ...prev, credentialUrl: fileUrl, isPdf: true }));
        showToast('success', 'Dokumen PDF sertifikat berhasil diunggah!');
      } else {
        setCertForm(prev => ({ ...prev, imageUrl: fileUrl, isPdf: false }));
        showToast('success', 'Gambar sertifikat berhasil diunggah!');
      }
    } catch (err) {
      showToast('error', 'Gagal mengunggah file: ' + err.message);
    } finally {
      setUploadingFile(false);
    }
  };

  const handleCvFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      const fileUrl = await uploadFileToStorage(file, 'cv_documents');
      setProfileForm(prev => ({ ...prev, cvUrl: fileUrl }));
      showToast('success', 'File CV berhasil diunggah!');
    } catch (err) {
      showToast('error', 'Gagal mengunggah CV: ' + err.message);
    } finally {
      setUploadingFile(false);
    }
  };

  // --- EXPERIENCES HANDLERS ---
  const openExpModal = (exp = null) => {
    if (exp) {
      setEditingItem(exp);
      setExpForm({
        category: exp.category || 'education',
        badgeLabel: exp.badgeLabel || 'EDUCATION',
        role: exp.role || '',
        company: exp.company || '',
        location: exp.location || '',
        bulletsStr: (exp.bullets || []).join('\n'),
        skillsStr: (exp.skills || []).join(', ')
      });
      // Parse period string if available
      if (exp.period && exp.period.includes('- Sekarang')) {
        setIsCurrent(true);
      } else {
        setIsCurrent(false);
      }
    } else {
      setEditingItem(null);
      setExpForm({
        category: 'education',
        badgeLabel: 'EDUCATION',
        role: '',
        company: '',
        location: '',
        bulletsStr: '',
        skillsStr: ''
      });
      setIsCurrent(false);
    }
    setActiveModal('exp');
  };

  const handleSaveExp = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    // Build period string from dropdown selects
    const periodText = isCurrent 
      ? `${startMonth.slice(0, 3)} ${startYear} - Sekarang`
      : `${startMonth.slice(0, 3)} ${startYear} - ${endMonth.slice(0, 3)} ${endYear}`;

    try {
      const payload = {
        category: expForm.category,
        badgeLabel: expForm.badgeLabel,
        role: expForm.role,
        company: expForm.company,
        period: periodText,
        location: expForm.location,
        bullets: expForm.bulletsStr.split('\n').filter(Boolean),
        skills: expForm.skillsStr.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (!currentUser) {
        showToast('success', 'Pengalaman berhasil diperbarui! (Demo Mode)');
        setActiveModal(null);
        return;
      }

      if (editingItem && editingItem.id && !editingItem.id.startsWith('exp-')) {
        await updateExperience(editingItem.id, payload);
        showToast('success', 'Pengalaman berhasil diperbarui!');
      } else {
        await addExperience(payload);
        showToast('success', 'Pengalaman baru berhasil disimpan ke Firebase!');
      }
      setActiveModal(null);
      await refreshData();
    } catch (err) {
      showToast('error', 'Gagal menyimpan: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteExp = async (id) => {
    if (!window.confirm('Hapus item pengalaman ini?')) return;
    setActionLoading(true);
    try {
      await deleteExperience(id);
      showToast('success', 'Pengalaman berhasil dihapus.');
      await refreshData();
    } catch (err) {
      showToast('error', 'Gagal menghapus: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // --- SKILL CATEGORY HANDLERS ---
  const openSkillCatModal = (cat = null) => {
    if (cat) {
      setEditingItem(cat);
      setSkillCatForm({
        title: cat.title || '',
        pillsStr: (cat.pills || []).join(', ')
      });
    } else {
      setEditingItem(null);
      setSkillCatForm({ title: '', pillsStr: '' });
    }
    setActiveModal('skillCat');
  };

  const handleSaveSkillCat = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const payload = {
        title: skillCatForm.title,
        pills: skillCatForm.pillsStr.split(',').map(s => s.trim()).filter(Boolean)
      };
      if (!currentUser) {
        showToast('success', 'Kategori skill disimpan! (Demo Mode)');
        setActiveModal(null);
        return;
      }
      await saveSkillCategory(payload, editingItem?.id);
      showToast('success', 'Kategori skill berhasil disimpan!');
      setActiveModal(null);
      await refreshData();
    } catch (err) {
      showToast('error', 'Gagal menyimpan skill: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteSkillCat = async (id) => {
    if (!window.confirm('Hapus kategori skill ini?')) return;
    setActionLoading(true);
    try {
      await deleteSkillCategory(id);
      showToast('success', 'Kategori skill berhasil dihapus.');
      await refreshData();
    } catch (err) {
      showToast('error', 'Gagal menghapus: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // --- CERTIFICATE HANDLERS ---
  const openCertModal = (cert = null) => {
    if (cert) {
      setEditingItem(cert);
      setCertForm({
        certId: cert.certId || '',
        title: cert.title || '',
        issuerName: cert.issuer ? cert.issuer.split('•')[0].trim() : '',
        credentialId: cert.credentialId || '',
        imageUrl: cert.imageUrl || '',
        credentialUrl: cert.credentialUrl || '',
        description: cert.description || '',
        skillsStr: (cert.skills || []).join(', ')
      });
    } else {
      setEditingItem(null);
      setCertForm({
        certId: 'CERT-' + Date.now().toString().slice(-4),
        title: '',
        issuerName: '',
        credentialId: '',
        imageUrl: '',
        credentialUrl: '',
        description: '',
        skillsStr: ''
      });
    }
    setActiveModal('cert');
  };

  const handleSaveCert = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    const fullIssuer = `${certForm.issuerName || 'Penerbit Sertifikat'} • ${certMonth.slice(0, 3)} ${certYear}`;

    try {
      const payload = {
        certId: certForm.certId,
        title: certForm.title,
        issuer: fullIssuer,
        credentialId: certForm.credentialId,
        imageUrl: certForm.imageUrl,
        credentialUrl: certForm.credentialUrl,
        description: certForm.description,
        skills: certForm.skillsStr.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (!currentUser) {
        showToast('success', 'Sertifikat disimpan! (Demo Mode)');
        setActiveModal(null);
        return;
      }

      await saveCertificate(payload, editingItem?.id);
      showToast('success', 'Sertifikat berhasil disimpan!');
      setActiveModal(null);
      await refreshData();
    } catch (err) {
      showToast('error', 'Gagal menyimpan sertifikat: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteCert = async (id) => {
    if (!window.confirm('Hapus sertifikat ini?')) return;
    setActionLoading(true);
    try {
      await deleteCertificate(id);
      showToast('success', 'Sertifikat berhasil dihapus.');
      await refreshData();
    } catch (err) {
      showToast('error', 'Gagal menghapus: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // --- PROJECT HANDLERS ---
  const openProjModal = (proj = null) => {
    if (proj) {
      setEditingItem(proj);
      setProjForm({
        badgeLabel: proj.badgeLabel || 'PROJECT',
        title: proj.title || '',
        description: proj.description || ''
      });
    } else {
      setEditingItem(null);
      setProjForm({ badgeLabel: 'PROJECT', title: '', description: '' });
    }
    setActiveModal('proj');
  };

  const handleSaveProj = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const payload = {
        badgeLabel: projForm.badgeLabel,
        title: projForm.title,
        description: projForm.description
      };
      if (!currentUser) {
        const newProj = { id: editingItem?.id || 'proj-' + Date.now(), ...payload };
        let updatedList;
        if (editingItem?.id) {
          updatedList = projects.map(p => p.id === editingItem.id ? newProj : p);
        } else {
          updatedList = [newProj, ...projects];
        }
        updateLocalMemoryCache('projects', updatedList);
        showToast('success', 'Proyek disimpan! (Demo Mode)');
        setActiveModal(null);
        return;
      }
      const saved = await saveProject(payload, editingItem?.id);
      const newProj = { id: saved.id || editingItem?.id || 'proj-' + Date.now(), ...payload };
      let updatedList;
      if (editingItem?.id) {
        updatedList = projects.map(p => p.id === editingItem.id ? newProj : p);
      } else {
        updatedList = [newProj, ...projects];
      }
      updateLocalMemoryCache('projects', updatedList);
      showToast('success', 'Proyek berhasil disimpan!');
      setActiveModal(null);
      await refreshData();
    } catch (err) {
      showToast('error', 'Gagal menyimpan proyek: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProj = async (id) => {
    if (!window.confirm('Hapus proyek ini?')) return;
    setActionLoading(true);
    try {
      const updatedList = projects.filter(p => p.id !== id);
      if (!currentUser) {
        updateLocalMemoryCache('projects', updatedList);
        showToast('success', 'Proyek berhasil dihapus. (Demo Mode)');
        return;
      }
      await deleteProject(id);
      updateLocalMemoryCache('projects', updatedList);
      showToast('success', 'Proyek berhasil dihapus.');
      await refreshData();
    } catch (err) {
      showToast('error', 'Gagal menghapus: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // --- NAVBAR & FOOTER HANDLERS ---
  const handleSaveNavbar = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const payload = {
        ...navbar,
        title: navbarForm.title,
        subtitle: navbarForm.subtitle
      };
      if (!currentUser) {
        updateLocalMemoryCache('navbar', payload);
        showToast('success', 'Pengaturan Navbar berhasil disimpan! (Demo Mode)');
        return;
      }
      await updateNavbar(payload);
      updateLocalMemoryCache('navbar', payload);
      showToast('success', 'Pengaturan Navbar berhasil disimpan ke Firebase!');
      await refreshData();
    } catch (err) {
      showToast('error', 'Gagal menyimpan navbar: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveFooter = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const payload = {
        ...footer,
        brandTitle: footerForm.brandTitle,
        brandSubtitle: footerForm.brandSubtitle,
        email: footerForm.email,
        linkedin: footerForm.linkedin,
        copyrightText: footerForm.copyrightText,
        statusText: footerForm.statusText,
        showSecretPaw: footerForm.showSecretPaw
      };
      if (!currentUser) {
        updateLocalMemoryCache('footer', payload);
        showToast('success', 'Pengaturan Footer berhasil disimpan! (Demo Mode)');
        return;
      }
      await updateFooter(payload);
      updateLocalMemoryCache('footer', payload);
      showToast('success', 'Pengaturan Footer berhasil disimpan ke Firebase!');
      await refreshData();
    } catch (err) {
      showToast('error', 'Gagal menyimpan footer: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // --- PROFILE HANDLERS ---
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const payload = {
        name: profileForm.name,
        tagline: profileForm.tagline,
        bio: profileForm.bio,
        cvUrl: profileForm.cvUrl,
        location: profileForm.location,
        email: profileForm.email,
        specialties: profileForm.specialtiesStr.split(',').map(s => s.trim()).filter(Boolean)
      };
      if (!currentUser) {
        showToast('success', 'Profil diperbarui! (Demo Mode)');
        return;
      }
      await updateProfile(payload);
      showToast('success', 'Profil & Dokumen CV berhasil diperbarui!');
      await refreshData();
    } catch (err) {
      showToast('error', 'Gagal memperbarui profil: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveIntro = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const payload = {
        title: introForm.title,
        subtitle: introForm.subtitle,
        badge: introForm.badge,
        welcomeText: introForm.welcomeText,
        bootLogLines: introForm.bootLogsStr.split('\n').filter(Boolean)
      };
      if (!currentUser) {
        showToast('success', 'Pengaturan Layar Intro diperbarui! (Demo Mode)');
        return;
      }
      await updateIntro(payload);
      showToast('success', 'Pengaturan Layar Intro (Splash Screen) berhasil diperbarui!');
      await refreshData();
    } catch (err) {
      showToast('error', 'Gagal memperbarui intro: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const isAuthenticated = Boolean(currentUser || isDemoMode);

  return (
    <div className="admin-container">
      {/* Toast Notification */}
      {message && (
        <div className={`admin-alert ${message.type === 'error' ? 'admin-alert-error' : 'admin-alert-success'}`}>
          {message.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Main Retro Window Container */}
      <Window title="FIREBASE_ADMIN_PANEL.EXE" icon={ShieldCheck} tags={['• MOBILE AUTO-LAYOUT', 'V3.5 ✨']}>
        
        {/* Firebase Config Notice */}
        {!isFirebaseConfigured && (
          <div className="config-warning-card">
            <h3>⚠️ Firebase Belum Dikonfigurasi di .env</h3>
            <p>
              Portofolio saat ini berjalan dalam <strong>Fallback Mode</strong> (menggunakan data bawaan & upload lokal). 
              Untuk menghubungkan dengan database asli Firebase Firestore & Firebase Storage:
            </p>
            <ol style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>Buat project di <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" style={{ color: '#b45309', fontWeight: 'bold' }}>Firebase Console</a></li>
              <li>Isi variabel <code>VITE_FIREBASE_API_KEY</code>, dll. pada file <code>.env</code> Anda.</li>
            </ol>
            <div style={{ marginTop: '10px' }}>
              <button 
                className="pixel-btn-secondary" 
                onClick={() => { setIsDemoMode(true); showToast('success', 'Masuk ke Demo Mode Admin.'); }}
              >
                🎮 Masuk Demo Mode (Preview Admin UI & File Upload)
              </button>
            </div>
          </div>
        )}

        {/* LOGIN SCREEN */}
        {!isAuthenticated ? (
          <div className="admin-login-box">
            <Lock size={38} color="#9333ea" style={{ marginBottom: '12px' }} />
            <h2>ADMIN AUTHENTICATION</h2>
            <p>Masukkan akun Firebase Admin Anda untuk mengelola isi portofolio.</p>

            {authError && (
              <div className="admin-alert admin-alert-error" style={{ fontSize: '0.8rem' }}>
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="admin-form-group">
                <label>ADMIN EMAIL</label>
                <input 
                  type="email" 
                  className="admin-input" 
                  placeholder="admin@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>PASSWORD</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    className="admin-input" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: '40px', width: '100%' }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#9333ea',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px'
                    }}
                    title={showPassword ? 'Sembunyikan Sandi' : 'Lihat Sandi'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="pixel-btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={authLoading}>
                {authLoading ? 'LOGGING IN...' : 'LOGIN TO ADMIN'}
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div>
            {/* Header User Info & Actions */}
            <div className="admin-header-bar">
              <div className="admin-title-area">
                <h2><ShieldCheck size={20} /> DASHBOARD KELOLA PORTOFOLIO</h2>
              </div>
              <div className="admin-user-badge">
                <span className="user-email-pill">
                  <User size={14} /> {currentUser ? currentUser.email : 'Demo Admin'}
                </span>
                {isFirebaseConfigured && (
                  <button className="pixel-btn-secondary" onClick={handleSeedDatabase} disabled={actionLoading} title="Isi Firebase dengan data bawaan awal">
                    <Database size={14} /> Seed Data
                  </button>
                )}
                <button className="pixel-btn-secondary" onClick={handleLogout}>
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="admin-tabs">
              <button 
                className={`admin-tab-btn ${activeTab === 'experiences' ? 'active' : ''}`}
                onClick={() => setActiveTab('experiences')}
              >
                <Briefcase size={16} /> Experiences ({experiences.length})
              </button>
              <button 
                className={`admin-tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                <Award size={16} /> Skills & Certs ({skillCategories.length} / {certificates.length})
              </button>
              <button 
                className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                <FolderGit2 size={16} /> Projects ({projects.length})
              </button>
              <button 
                className={`admin-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={16} /> Profile / Intro
              </button>
              <button 
                className={`admin-tab-btn ${activeTab === 'navfooter' ? 'active' : ''}`}
                onClick={() => setActiveTab('navfooter')}
              >
                <Compass size={16} /> Navbar & Footer
              </button>
            </div>

            {/* ========================================================= */}
            {/* TAB 1: EXPERIENCES */}
            {/* ========================================================= */}
            {activeTab === 'experiences' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '0.9rem', color: '#581c87', margin: 0 }}>
                    KELOLA RIWAYAT PENGALAMAN & PENDIDIKAN
                  </h3>
                  <button className="pixel-btn-primary" onClick={() => openExpModal()}>
                    <Plus size={14} /> Tambah Pengalaman
                  </button>
                </div>

                <div className="admin-card-grid">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="admin-item-card">
                      <div>
                        <div className="admin-item-header">
                          <span className="pixel-badge">{exp.badgeLabel || exp.category}</span>
                          <div className="admin-item-actions">
                            <button className="pixel-btn-secondary" style={{ padding: '4px 8px' }} onClick={() => openExpModal(exp)}>
                              <Edit3 size={12} /> Edit
                            </button>
                            <button className="pixel-btn-danger" onClick={() => handleDeleteExp(exp.id)}>
                              <Trash2 size={12} /> Hapus
                            </button>
                          </div>
                        </div>
                        <h4 className="admin-item-title">{exp.role}</h4>
                        <p style={{ fontSize: '0.82rem', color: '#6b21a8', fontWeight: 'bold', margin: '4px 0' }}>
                          {exp.company} • <span style={{ color: '#64748b', fontWeight: 'normal' }}>{exp.period}</span>
                        </p>
                        <p style={{ fontSize: '0.8rem', color: '#475569', margin: '4px 0 8px 0' }}>
                          📍 {exp.location}
                        </p>
                      </div>
                      <div style={{ borderTop: '1px solid #f3e8ff', paddingTop: '8px', marginTop: '8px' }}>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                          {(exp.bullets || []).length} poin deskripsi • {(exp.skills || []).length} tag skill
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 2: SKILLS & CERTIFICATES */}
            {/* ========================================================= */}
            {activeTab === 'skills' && (
              <div>
                {/* Section A: Skill Categories */}
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '0.9rem', color: '#581c87', margin: 0 }}>
                      KATEGORI SKILL PORTOFOLIO
                    </h3>
                    <button className="pixel-btn-primary" onClick={() => openSkillCatModal()}>
                      <Plus size={14} /> Tambah Kategori Skill
                    </button>
                  </div>

                  <div className="admin-card-grid">
                    {skillCategories.map((cat) => (
                      <div key={cat.id} className="admin-item-card">
                        <div>
                          <div className="admin-item-header">
                            <h4 className="admin-item-title">{cat.title}</h4>
                            <div className="admin-item-actions">
                              <button className="pixel-btn-secondary" style={{ padding: '4px 8px' }} onClick={() => openSkillCatModal(cat)}>
                                <Edit3 size={12} />
                              </button>
                              <button className="pixel-btn-danger" onClick={() => handleDeleteSkillCat(cat.id)}>
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
                            {(cat.pills || []).map((pill, idx) => (
                              <span key={idx} style={{ background: '#f3e8ff', color: '#6b21a8', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px' }}>
                                {pill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section B: Certificates */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '0.9rem', color: '#581c87', margin: 0 }}>
                      SERTIFIKAT & LISENSI (UPLOAD GAMBAR / PDF)
                    </h3>
                    <button className="pixel-btn-primary" onClick={() => openCertModal()}>
                      <Plus size={14} /> Tambah Sertifikat
                    </button>
                  </div>

                  <div className="admin-card-grid">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="admin-item-card">
                        <div>
                          <div className="admin-item-header">
                            <span className="pixel-badge">{cert.certId || 'CERT'}</span>
                            <div className="admin-item-actions">
                              <button className="pixel-btn-secondary" style={{ padding: '4px 8px' }} onClick={() => openCertModal(cert)}>
                                <Edit3 size={12} /> Edit
                              </button>
                              <button className="pixel-btn-danger" onClick={() => handleDeleteCert(cert.id)}>
                                <Trash2 size={12} /> Hapus
                              </button>
                            </div>
                          </div>
                          
                          {/* Image/PDF preview badge if uploaded */}
                          {cert.imageUrl ? (
                            <div style={{ marginBottom: '8px', borderRadius: '6px', overflow: 'hidden', height: '100px', border: '1px solid #c084fc' }}>
                              <img src={cert.imageUrl} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          ) : cert.credentialUrl && cert.credentialUrl.endsWith('.pdf') ? (
                            <div style={{ marginBottom: '8px', padding: '8px', background: '#faf5ff', borderRadius: '6px', border: '1px solid #c084fc', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#6b21a8' }}>
                              <FileText size={16} /> <span>Dokumen Sertifikat PDF</span>
                            </div>
                          ) : null}

                          <h4 className="admin-item-title">{cert.title}</h4>
                          <p style={{ fontSize: '0.8rem', color: '#6b21a8', margin: '4px 0' }}>{cert.issuer}</p>
                          <p style={{ fontSize: '0.78rem', color: '#64748b' }}>ID Credential: {cert.credentialId || '-'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 3: PROJECTS */}
            {/* ========================================================= */}
            {activeTab === 'projects' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '0.9rem', color: '#581c87', margin: 0 }}>
                    KELOLA PROYEK AKADEMIK & STUDY CASE
                  </h3>
                  <button className="pixel-btn-primary" onClick={() => openProjModal()}>
                    <Plus size={14} /> Tambah Proyek
                  </button>
                </div>

                <div className="admin-card-grid">
                  {projects.map((proj) => (
                    <div key={proj.id} className="admin-item-card">
                      <div>
                        <div className="admin-item-header">
                          <span className="pixel-badge">{proj.badgeLabel || 'PROJECT'}</span>
                          <div className="admin-item-actions">
                            <button className="pixel-btn-secondary" style={{ padding: '4px 8px' }} onClick={() => openProjModal(proj)}>
                              <Edit3 size={12} /> Edit
                            </button>
                            <button className="pixel-btn-danger" onClick={() => handleDeleteProj(proj.id)}>
                              <Trash2 size={12} /> Hapus
                            </button>
                          </div>
                        </div>
                        <h4 className="admin-item-title">{proj.title}</h4>
                        <p style={{ fontSize: '0.82rem', color: '#475569', margin: '8px 0 0 0', lineHeight: '1.4' }}>
                          {proj.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 4: PROFILE & CV UPLOAD SETTINGS */}
            {/* ========================================================= */}
            {activeTab === 'profile' && (
              <div style={{ maxWidth: '680px' }}>
                <h3 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '0.9rem', color: '#581c87', marginBottom: '16px' }}>
                  PENGATURAN INFORMASI UTAMA & UPLOAD FILE CV
                </h3>

                <form onSubmit={handleSaveProfile} style={{ background: '#ffffff', border: '2px solid #e9d5ff', borderRadius: '12px', padding: '24px' }}>
                  <div className="admin-form-group">
                    <label><User size={14} /> NAMA LENGKAP</label>
                    <input 
                      type="text" 
                      className="admin-input" 
                      value={profileForm.name} 
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} 
                      required 
                    />
                  </div>

                  <div className="admin-form-group">
                    <label><FileText size={14} /> TAGLINE / SUBTITLE HERO</label>
                    <input 
                      type="text" 
                      className="admin-input" 
                      value={profileForm.tagline} 
                      onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })} 
                      required 
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>BIOGRAFI RINGKAS</label>
                    <textarea 
                      className="admin-textarea" 
                      rows={3} 
                      value={profileForm.bio} 
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })} 
                    />
                  </div>

                  {/* UPLOAD FILE CV DOCUMENT */}
                  <div className="admin-form-group">
                    <label><UploadCloud size={14} /> UPLOAD FILE DOKUMEN CV (PDF)</label>
                    <div className="file-dropzone-container">
                      <input 
                        type="file" 
                        accept=".pdf"
                        className="file-dropzone-input" 
                        onChange={handleCvFileUpload}
                        disabled={uploadingFile}
                      />
                      <div className="file-dropzone-content">
                        {uploadingFile ? (
                          <>
                            <Loader2 size={24} className="animate-spin" />
                            <span className="file-dropzone-title">Mengunggah File CV...</span>
                          </>
                        ) : (
                          <>
                            <UploadCloud size={28} />
                            <span className="file-dropzone-title">Klik atau Seret File CV (PDF) ke Sini</span>
                            <span className="file-dropzone-sub">Mendukung file PDF resmi</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Preview CV Link if present */}
                    {profileForm.cvUrl && (
                      <div className="file-preview-box">
                        <FileText size={28} color="#9333ea" />
                        <div className="file-preview-info">
                          <div className="file-preview-name">File CV Terpasang:</div>
                          <a 
                            href={profileForm.cvUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            style={{ fontSize: '0.78rem', color: '#9333ea', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <ExternalLink size={12} /> Buka / Download CV Terdaftar
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="month-year-grid" style={{ marginBottom: '16px' }}>
                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label>LOKASI</label>
                      <input 
                        type="text" 
                        className="admin-input" 
                        value={profileForm.location} 
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })} 
                      />
                    </div>
                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label>EMAIL KONTAK</label>
                      <input 
                        type="email" 
                        className="admin-input" 
                        value={profileForm.email} 
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>POIN SPECIALTIES (Dipisah Koma)</label>
                    <input 
                      type="text" 
                      className="admin-input" 
                      value={profileForm.specialtiesStr} 
                      onChange={(e) => setProfileForm({ ...profileForm, specialtiesStr: e.target.value })} 
                    />
                  </div>

                  <button type="submit" className="pixel-btn-primary" style={{ width: '100%', marginTop: '12px' }} disabled={actionLoading || uploadingFile}>
                    <Save size={16} /> {actionLoading ? 'MENYIMPAN...' : 'SIMPAN PERUBAHAN PROFIL & CV'}
                  </button>
                </form>

                {/* FORM PENGATURAN LAYAR INTRO / SPLASH SCREEN */}
                <div style={{ marginTop: '32px' }}>
                  <h3 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '0.9rem', color: '#581c87', marginBottom: '16px' }}>
                    🎬 PENGATURAN LAYAR INTRO / SPLASH SCREEN
                  </h3>

                  <form onSubmit={handleSaveIntro} style={{ background: '#ffffff', border: '2px solid #e9d5ff', borderRadius: '12px', padding: '24px' }}>
                    <div className="admin-form-group">
                      <label>JUDUL UTAMA INTRO (NAMA)</label>
                      <input 
                        type="text" 
                        className="admin-input" 
                        value={introForm.title} 
                        onChange={(e) => setIntroForm({ ...introForm, title: e.target.value })} 
                        required 
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>SUBTITLE INTRO</label>
                      <input 
                        type="text" 
                        className="admin-input" 
                        value={introForm.subtitle} 
                        onChange={(e) => setIntroForm({ ...introForm, subtitle: e.target.value })} 
                        required 
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>TEXT BADGE TAG INTRO</label>
                      <input 
                        type="text" 
                        className="admin-input" 
                        value={introForm.badge} 
                        onChange={(e) => setIntroForm({ ...introForm, badge: e.target.value })} 
                        required 
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>PESAN FINISH LOG BOOT TERMINAL (100%)</label>
                      <input 
                        type="text" 
                        className="admin-input" 
                        value={introForm.welcomeText} 
                        onChange={(e) => setIntroForm({ ...introForm, welcomeText: e.target.value })} 
                        required 
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>DAFTAR TEKS RUNNING LOG TERMINAL (1 Baris Per Langkah Animasi)</label>
                      <textarea 
                        className="admin-textarea" 
                        rows={5} 
                        placeholder="Tulis setiap teks langkah terminal di baris terpisah..."
                        value={introForm.bootLogsStr} 
                        onChange={(e) => setIntroForm({ ...introForm, bootLogsStr: e.target.value })} 
                        required 
                      />
                      <span style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
                        💡 Tulis 1 teks per baris. Teks ini akan berjalan secara bergantian di layar Intro terminal!
                      </span>
                    </div>

                    <button type="submit" className="pixel-btn-primary" style={{ width: '100%', marginTop: '12px' }} disabled={actionLoading}>
                      <Save size={16} /> {actionLoading ? 'MENYIMPAN...' : 'SIMPAN PENGATURAN INTRO'}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 5: NAVBAR & FOOTER CRUD */}
            {/* ========================================================= */}
            {activeTab === 'navfooter' && (
              <div>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '0.9rem', color: '#581c87', margin: 0 }}>
                    🧭 PENGATURAN TAMPILAN NAVBAR & FOOTER
                  </h3>
                  <p style={{ fontFamily: 'var(--font-pixel-body)', fontSize: '0.8rem', color: '#6b21a8', marginTop: '4px' }}>
                    Kelola nama brand, judul header, hak cipta, link email, LinkedIn, dan teks status footer.
                  </p>
                </div>

                {/* FORM NAVBAR */}
                <div style={{ background: '#ffffff', border: '2px solid #e9d5ff', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                  <h4 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '0.85rem', color: '#581c87', marginTop: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Compass size={16} color="#9333ea" />
                    PENGATURAN NAVBAR HEADER
                  </h4>

                  <form onSubmit={handleSaveNavbar}>
                    <div className="month-year-grid" style={{ marginBottom: '16px' }}>
                      <div className="admin-form-group" style={{ margin: 0 }}>
                        <label>JUDUL UTAMA NAVBAR (NAMA)</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={navbarForm.title} 
                          onChange={(e) => setNavbarForm({ ...navbarForm, title: e.target.value })} 
                          required 
                        />
                      </div>
                      <div className="admin-form-group" style={{ margin: 0 }}>
                        <label>SUBTITLE NAVBAR</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={navbarForm.subtitle} 
                          onChange={(e) => setNavbarForm({ ...navbarForm, subtitle: e.target.value })} 
                          required 
                        />
                      </div>
                    </div>

                    <button type="submit" className="pixel-btn-primary" style={{ width: '100%', marginTop: '8px' }} disabled={actionLoading}>
                      <Save size={16} /> {actionLoading ? 'MENYIMPAN...' : 'SIMPAN PENGATURAN NAVBAR'}
                    </button>
                  </form>
                </div>

                {/* FORM FOOTER */}
                <div style={{ background: '#ffffff', border: '2px solid #e9d5ff', borderRadius: '12px', padding: '24px' }}>
                  <h4 style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '0.85rem', color: '#581c87', marginTop: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={16} color="#9333ea" />
                    PENGATURAN FOOTER SITE
                  </h4>

                  <form onSubmit={handleSaveFooter}>
                    <div className="month-year-grid" style={{ marginBottom: '16px' }}>
                      <div className="admin-form-group" style={{ margin: 0 }}>
                        <label>JUDUL BRAND FOOTER</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={footerForm.brandTitle} 
                          onChange={(e) => setFooterForm({ ...footerForm, brandTitle: e.target.value })} 
                          required 
                        />
                      </div>
                      <div className="admin-form-group" style={{ margin: 0 }}>
                        <label>SUBTITLE BRAND FOOTER</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={footerForm.brandSubtitle} 
                          onChange={(e) => setFooterForm({ ...footerForm, brandSubtitle: e.target.value })} 
                          required 
                        />
                      </div>
                    </div>

                    <div className="month-year-grid" style={{ marginBottom: '16px' }}>
                      <div className="admin-form-group" style={{ margin: 0 }}>
                        <label>EMAIL KONTAK (GMAIL)</label>
                        <input 
                          type="email" 
                          className="admin-input" 
                          value={footerForm.email} 
                          onChange={(e) => setFooterForm({ ...footerForm, email: e.target.value })} 
                          required 
                        />
                      </div>
                      <div className="admin-form-group" style={{ margin: 0 }}>
                        <label>URL LINKEDIN</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={footerForm.linkedin} 
                          onChange={(e) => setFooterForm({ ...footerForm, linkedin: e.target.value })} 
                          required 
                        />
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label>TEKS HAK CIPTA (COPYRIGHT)</label>
                      <input 
                        type="text" 
                        className="admin-input" 
                        value={footerForm.copyrightText} 
                        onChange={(e) => setFooterForm({ ...footerForm, copyrightText: e.target.value })} 
                        required 
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>TEKS STATUS SYSTEM FOOTER</label>
                      <input 
                        type="text" 
                        className="admin-input" 
                        value={footerForm.statusText} 
                        onChange={(e) => setFooterForm({ ...footerForm, statusText: e.target.value })} 
                        required 
                      />
                    </div>

                    <label className="checkbox-current-label" style={{ marginTop: '12px', marginBottom: '16px' }}>
                      <input 
                        type="checkbox" 
                        checked={footerForm.showSecretPaw} 
                        onChange={(e) => setFooterForm({ ...footerForm, showSecretPaw: e.target.checked })} 
                      />
                      <span>Tampilkan Ikon Jejak Kucing Secret Admin Access (🐾) di Footer</span>
                    </label>

                    <button type="submit" className="pixel-btn-primary" style={{ width: '100%' }} disabled={actionLoading}>
                      <Save size={16} /> {actionLoading ? 'MENYIMPAN...' : 'SIMPAN PENGATURAN FOOTER'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </Window>

      {/* ========================================================= */}
      {/* MODAL: EXPERIENCE FORM (WITH MONTH & YEAR PICKERS) */}
      {/* ========================================================= */}
      {activeModal === 'exp' && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                <Briefcase size={18} /> {editingItem ? 'EDIT PENGALAMAN' : 'TAMBAH PENGALAMAN BARU'}
              </h3>
              <button className="pixel-btn-secondary" style={{ padding: '4px' }} onClick={() => setActiveModal(null)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveExp}>
              <div className="month-year-grid" style={{ marginBottom: '16px' }}>
                <div className="admin-form-group" style={{ margin: 0 }}>
                  <label>KATEGORI</label>
                  <select 
                    className="admin-select" 
                    value={expForm.category}
                    onChange={(e) => setExpForm({ ...expForm, category: e.target.value, badgeLabel: e.target.value.toUpperCase() })}
                  >
                    <option value="education">Education</option>
                    <option value="internship">Internship</option>
                    <option value="organization">Organization</option>
                    <option value="project">Project & Freelance</option>
                  </select>
                </div>
                <div className="admin-form-group" style={{ margin: 0 }}>
                  <label>BADGE LABEL</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    value={expForm.badgeLabel} 
                    onChange={(e) => setExpForm({ ...expForm, badgeLabel: e.target.value })} 
                    required
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>PERAN / JABATAN / JUDUL</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  placeholder="Contoh: Intern / S1 Manajemen" 
                  value={expForm.role} 
                  onChange={(e) => setExpForm({ ...expForm, role: e.target.value })} 
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>PERUSAHAAN / INSTANSI / ORGANISASI</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  placeholder="Contoh: PT. FITRA WIKA" 
                  value={expForm.company} 
                  onChange={(e) => setExpForm({ ...expForm, company: e.target.value })} 
                  required
                />
              </div>

              {/* MONTH & YEAR DROPDOWN PICKERS */}
              <div className="period-container-box">
                <div className="period-title-sub"><Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} /> PILIH PERIODE WAKTU</div>
                
                {/* START DATE */}
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '0.7rem', color: '#6b21a8', display: 'block', marginBottom: '4px' }}>WAKTU MULAI:</label>
                  <div className="month-year-grid">
                    <select className="admin-select" value={startMonth} onChange={(e) => setStartMonth(e.target.value)}>
                      {MONTH_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select className="admin-select" value={startYear} onChange={(e) => setStartYear(e.target.value)}>
                      {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>

                {/* END DATE */}
                {!isCurrent && (
                  <div>
                    <label style={{ fontSize: '0.7rem', color: '#6b21a8', display: 'block', marginBottom: '4px' }}>WAKTU SELESAI:</label>
                    <div className="month-year-grid">
                      <select className="admin-select" value={endMonth} onChange={(e) => setEndMonth(e.target.value)}>
                        {MONTH_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <select className="admin-select" value={endYear} onChange={(e) => setEndYear(e.target.value)}>
                        {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                <label className="checkbox-current-label">
                  <input 
                    type="checkbox" 
                    checked={isCurrent} 
                    onChange={(e) => setIsCurrent(e.target.checked)} 
                  />
                  <span>Masih Berjalan / Sampai Sekarang</span>
                </label>
              </div>

              <div className="admin-form-group">
                <label>LOKASI</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  placeholder="Pekanbaru, Indonesia" 
                  value={expForm.location} 
                  onChange={(e) => setExpForm({ ...expForm, location: e.target.value })} 
                />
              </div>

              <div className="admin-form-group">
                <label>POIN DESKRIPSI (1 Poin Per Baris Baru)</label>
                <textarea 
                  className="admin-textarea" 
                  rows={4} 
                  placeholder="Tulis setiap pencapaian/tugas di baris terpisah..."
                  value={expForm.bulletsStr} 
                  onChange={(e) => setExpForm({ ...expForm, bulletsStr: e.target.value })} 
                />
              </div>

              <div className="admin-form-group">
                <label>TAG SKILL (Dipisah Koma)</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  placeholder="Excel, HRIS, Event Management" 
                  value={expForm.skillsStr} 
                  onChange={(e) => setExpForm({ ...expForm, skillsStr: e.target.value })} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                <button type="button" className="pixel-btn-secondary" onClick={() => setActiveModal(null)}>Batal</button>
                <button type="submit" className="pixel-btn-primary" disabled={actionLoading}>
                  <Save size={14} /> {actionLoading ? 'Menyimpan...' : 'Simpan Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: SKILL CATEGORY FORM */}
      {/* ========================================================= */}
      {activeModal === 'skillCat' && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                <Award size={18} /> {editingItem ? 'EDIT KATEGORI SKILL' : 'TAMBAH KATEGORI SKILL'}
              </h3>
              <button className="pixel-btn-secondary" style={{ padding: '4px' }} onClick={() => setActiveModal(null)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveSkillCat}>
              <div className="admin-form-group">
                <label>JUDUL KATEGORI SKILL</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  placeholder="Contoh: DATA & MANAGEMENT TOOLS" 
                  value={skillCatForm.title} 
                  onChange={(e) => setSkillCatForm({ ...skillCatForm, title: e.target.value })} 
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>DAFTAR SKILL PILLS (Dipisah Koma)</label>
                <textarea 
                  className="admin-textarea" 
                  rows={3} 
                  placeholder="Microsoft Excel, SPSS, HRIS System, Power BI" 
                  value={skillCatForm.pillsStr} 
                  onChange={(e) => setSkillCatForm({ ...skillCatForm, pillsStr: e.target.value })} 
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                <button type="button" className="pixel-btn-secondary" onClick={() => setActiveModal(null)}>Batal</button>
                <button type="submit" className="pixel-btn-primary" disabled={actionLoading}>
                  <Save size={14} /> {actionLoading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CERTIFICATE FORM (FILE UPLOAD GAMBAR / PDF + DATE PICKER) */}
      {/* ========================================================= */}
      {activeModal === 'cert' && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                <Award size={18} /> {editingItem ? 'EDIT SERTIFIKAT' : 'TAMBAH SERTIFIKAT'}
              </h3>
              <button className="pixel-btn-secondary" style={{ padding: '4px' }} onClick={() => setActiveModal(null)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveCert}>
              <div className="month-year-grid" style={{ marginBottom: '16px' }}>
                <div className="admin-form-group" style={{ margin: 0 }}>
                  <label>KODE SERTIFIKAT</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    value={certForm.certId} 
                    onChange={(e) => setCertForm({ ...certForm, certId: e.target.value })} 
                    required 
                  />
                </div>
                <div className="admin-form-group" style={{ margin: 0 }}>
                  <label>CREDENTIAL ID</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    value={certForm.credentialId} 
                    onChange={(e) => setCertForm({ ...certForm, credentialId: e.target.value })} 
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>NAMA SERTIFIKASI</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  placeholder="Mastering Excel Data Analysis & SPSS" 
                  value={certForm.title} 
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })} 
                  required 
                />
              </div>

              <div className="admin-form-group">
                <label>INSTANSI PENERBIT</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  placeholder="MySkill Intensive Bootcamp" 
                  value={certForm.issuerName} 
                  onChange={(e) => setCertForm({ ...certForm, issuerName: e.target.value })} 
                  required 
                />
              </div>

              {/* CERTIFICATE DATE PICKER */}
              <div className="period-container-box">
                <div className="period-title-sub"><Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} /> PILIH BULAN & TAHUN PENERBITAN</div>
                <div className="month-year-grid">
                  <select className="admin-select" value={certMonth} onChange={(e) => setCertMonth(e.target.value)}>
                    {MONTH_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select className="admin-select" value={certYear} onChange={(e) => setCertYear(e.target.value)}>
                    {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              {/* FILE UPLOAD DROPZONE (IMAGE OR PDF) */}
              <div className="admin-form-group">
                <label><UploadCloud size={14} /> UPLOAD FILE SERTIFIKAT (GAMBAR / PDF)</label>
                <div className="file-dropzone-container">
                  <input 
                    type="file" 
                    accept="image/*,.pdf"
                    className="file-dropzone-input" 
                    onChange={handleCertFileUpload}
                    disabled={uploadingFile}
                  />
                  <div className="file-dropzone-content">
                    {uploadingFile ? (
                      <>
                        <Loader2 size={24} className="animate-spin" />
                        <span className="file-dropzone-title">Mengunggah File Sertifikat...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud size={28} />
                        <span className="file-dropzone-title">Klik / Seret File Sertifikat (Gambar atau PDF) Ke Sini</span>
                        <span className="file-dropzone-sub">Mendukung format JPG, PNG, WEBP, atau PDF</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Realtime Thumbnail or PDF Preview */}
                {certForm.imageUrl ? (
                  <div className="file-preview-box">
                    <img src={certForm.imageUrl} alt="Pratinjau Sertifikat" className="file-preview-thumb" />
                    <div className="file-preview-info">
                      <div className="file-preview-name">Gambar Sertifikat Terpasang</div>
                      <span style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 'bold' }}>✓ Gambar Siap Dipublikasikan</span>
                    </div>
                  </div>
                ) : certForm.credentialUrl ? (
                  <div className="file-preview-box">
                    <FileText size={32} color="#9333ea" />
                    <div className="file-preview-info">
                      <div className="file-preview-name">File Dokumen PDF Terpasang</div>
                      <a href={certForm.credentialUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.74rem', color: '#9333ea', textDecoration: 'underline' }}>
                        Lihat Dokumen PDF ↗
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="admin-form-group">
                <label>URL LINK BUKTI / VERIFIKASI (OPSIONAL)</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  placeholder="https://..." 
                  value={certForm.credentialUrl} 
                  onChange={(e) => setCertForm({ ...certForm, credentialUrl: e.target.value })} 
                />
              </div>

              <div className="admin-form-group">
                <label>DESKRIPSI RINGKAS</label>
                <textarea 
                  className="admin-textarea" 
                  rows={3} 
                  value={certForm.description} 
                  onChange={(e) => setCertForm({ ...certForm, description: e.target.value })} 
                />
              </div>

              <div className="admin-form-group">
                <label>TAG SKILL (Dipisah Koma)</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  placeholder="Excel Data Analysis, SPSS" 
                  value={certForm.skillsStr} 
                  onChange={(e) => setCertForm({ ...certForm, skillsStr: e.target.value })} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                <button type="button" className="pixel-btn-secondary" onClick={() => setActiveModal(null)}>Batal</button>
                <button type="submit" className="pixel-btn-primary" disabled={actionLoading || uploadingFile}>
                  <Save size={14} /> {actionLoading ? 'Menyimpan...' : 'Simpan Sertifikat'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: PROJECT FORM */}
      {/* ========================================================= */}
      {activeModal === 'proj' && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                <FolderGit2 size={18} /> {editingItem ? 'EDIT PROYEK' : 'TAMBAH PROYEK'}
              </h3>
              <button className="pixel-btn-secondary" style={{ padding: '4px' }} onClick={() => setActiveModal(null)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveProj}>
              <div className="admin-form-group">
                <label>BADGE LABEL</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  placeholder="SKRIPSI / MARKETING CAMPAIGN" 
                  value={projForm.badgeLabel} 
                  onChange={(e) => setProjForm({ ...projForm, badgeLabel: e.target.value })} 
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>JUDUL PROYEK</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={projForm.title} 
                  onChange={(e) => setProjForm({ ...projForm, title: e.target.value })} 
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>DESKRIPSI PROYEK</label>
                <textarea 
                  className="admin-textarea" 
                  rows={4} 
                  value={projForm.description} 
                  onChange={(e) => setProjForm({ ...projForm, description: e.target.value })} 
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                <button type="button" className="pixel-btn-secondary" onClick={() => setActiveModal(null)}>Batal</button>
                <button type="submit" className="pixel-btn-primary" disabled={actionLoading}>
                  <Save size={14} /> {actionLoading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
