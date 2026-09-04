import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  deleteDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from './firebase';

// Helper for timing out hanging Firestore requests (6s max limit)
const withTimeout = (promise, ms = 6000, errorMsg = 'Waktu koneksi Firebase habis. Cek koneksi internet atau Firestore Rules.') => {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(errorMsg)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
};

// ==========================================
// DEFAULT FALLBACK DATA (USED IF FIREBASE IS UNCONFIGURED OR EMPTY)
// ==========================================
export const DEFAULT_EXPERIENCES = [
  {
    id: 'exp-1',
    category: 'education',
    badgeLabel: 'EDUCATION',
    role: 'S1 Manajemen (Sarjana Manajemen)',
    company: 'UIN Sultan Syarif Kasim Riau',
    period: '2022 - 2026',
    location: 'Pekanbaru, Indonesia',
    bullets: [
      'Mempelajari manajemen operasional, Human Resource Management, strategi pemasaran digital, dan analisis bisnis kuantitatif.',
      'Aktif dalam berbagai praktikum studi kasus bisnis, penelitian data SPSS, serta kepemimpinan organisasi mahasiswa.',
      'Meraih predikat IPK 3.59 / 4.00 dengan konsentrasi Manajemen Keuangan.'
    ],
    skills: ['HR Management', 'SPSS Analysis', 'Digital Marketing', 'Business Operations', 'Public Speaking']
  },
  {
    id: 'exp-2',
    category: 'internship',
    badgeLabel: 'INTERNSHIP',
    role: 'Intern',
    company: 'PT. FITRA WIKA',
    period: 'Feb 2025 - April 2025',
    location: 'Pekanbaru, Indonesia',
    bullets: [
      'Mendukung tim keuangan dalam pengelolaan dan penyusunan laporan keuangan bulanan.',
      'Membantu proses administrasi keuangan, termasuk pencatatan transaksi harian dan pengarsipan dokumen.',
      'Melakukan analisis sederhana terhadap laporan keuangan untuk mendukung pengambilan keputusan manajerial.',
      'Berkontribusi dalam koordinasi internal tim dan komunikasi lintas departemen untuk kelancaran operasional administrasi.'
    ],
    skills: ['UAT Testing', 'Digital Banking', 'CMS System', 'Data Entry', 'Financial Admin']
  },
  {
    id: 'exp-3',
    category: 'organization',
    badgeLabel: 'ORGANIZATION',
    role: 'Head of Public Relations & Event Manager',
    company: 'Himpunan Mahasiswa Manajemen',
    period: '2023 - 2024',
    location: 'UIN Sultan Syarif Kasim Riau',
    bullets: [
      'Memimpin tim Humas dalam publikasi media sosial, strategi branding kegiatan, dan pengelolaan kanal komunikasi publik.',
      'Mengatur kemitraan sponsor dan media partner untuk penyelenggaraan Seminar Nasional Karir & Business Plan.',
      'Memimpin pelaksanaan event nasional dengan partisipasi antusias lebih dari 300+ peserta mahasiswa.'
    ],
    skills: ['Event Management', 'Public Relations', 'Sponsorship', 'Team Leadership', 'Branding']
  },
  {
    id: 'exp-4',
    category: 'project',
    badgeLabel: 'PROJECT & FREELANCE',
    role: 'Digital Content & Brand Strategist',
    company: 'Independent Partner / UMKM Project',
    period: '2024 - Present',
    location: 'Pekanbaru, Indonesia',
    bullets: [
      'Merancang strategi kampanye digital di media sosial Instagram & TikTok untuk meningkatkan awareness UMKM lokal.',
      'Membuat desain konten visual Canva, copywriting promosi, dan evaluasi impresi mingguan performa akun.'
    ],
    skills: ['Canva Design', 'Copywriting', 'Social Media Strategy', 'Content Planning']
  }
];

export const DEFAULT_SKILL_CATEGORIES = [
  {
    id: 'cat-1',
    title: 'DATA & MANAGEMENT TOOLS',
    pills: ['Microsoft Excel (Advanced)', 'SPSS Statistics', 'HRIS System', 'Power BI', 'Canva Pro']
  },
  {
    id: 'cat-2',
    title: 'HUMAN CAPITAL & HR',
    pills: ['Talent Acquisition', 'Performance Mgmt', 'Employee Relations', 'Training & Dev']
  },
  {
    id: 'cat-3',
    title: 'DIGITAL MARKETING',
    pills: ['Social Media Strategy', 'Content Creation', 'Copywriting', 'Instagram/TikTok Ads']
  },
  {
    id: 'cat-4',
    title: 'BUSINESS OPERATIONS',
    pills: ['Project Operations', 'Financial Admin', 'Event Planning', 'CMS System', 'Public Relations']
  }
];

export const DEFAULT_CERTIFICATES = [
  {
    id: 'cert-1',
    certId: 'CERT-KARIRNEXT-01',
    title: 'Sertifikasi Microsoft Office Excel, Word & Power Point Specialist',
    issuer: 'KarirNex • 2026',
    credentialUrl: 'https://karirnex.com/c/rig1xRo'
  },
  {
    id: 'cert-2',
    certId: 'CERT-MYSKILL-02',
    title: 'Mastering Excel Data Analysis & SPSS',
    issuer: 'MySkill • 2024',
    credentialUrl: 'https://myskill.id/verify/MYSKILL-EXCEL-SPSS-7714'
  },
  {
    id: 'cert-3',
    certId: 'CERT-DICODING-03',
    title: 'Dasar Digital Marketing & Analytics',
    issuer: 'Dicoding Academy • 2024',
    credentialUrl: 'https://dicoding.com/certificates/DICODING-DM-9921'
  }
];

export const DEFAULT_PROJECTS = [
  {
    id: 'proj-1',
    badgeLabel: 'SKRIPSI / FINAL RESEARCH',
    title: 'Analisis Pengaruh Budaya Organisasi Terhadap Kinerja Karyawan',
    company: 'Universitas Islam Riau',
    period: 'Jan 2024 - Des 2024',
    description: 'Penelitian analisis kuantitatif menggunakan SPSS untuk menguji hubungan antara komunikasi internal dan motivasi kerja terhadap produktivitas tim.',
    skills: ['SPSS Statistics', 'Data Analysis', 'Employee Performance', 'Quantitative Research']
  },
  {
    id: 'proj-2',
    badgeLabel: 'MARKETING CAMPAIGN',
    title: 'Digital Marketing Strategy Plan for Local MSME',
    company: 'Independent Client / UMKM Pekanbaru',
    period: 'Jan 2025 - Mei 2025',
    description: 'Perancangan strategi re-branding, perencanaan konten Instagram/TikTok, serta pemetaan target pasar konsumen muda bagi UMKM lokal.',
    skills: ['Digital Marketing', 'Content Strategy', 'Social Media Ads', 'Market Research']
  }
];

export const DEFAULT_PROFILE = {
  name: 'Rahma Novridayanti',
  tagline: 'Management & HR Specialist ✨',
  bio: 'Fresh Graduate Manajemen dengan minat mendalam pada Human Resource Management, Digital Marketing, dan Analisis Data Bisnis.',
  cvUrl: '/CV_Rahma_Novridayanti.pdf',
  avatarUrl: '',
  location: 'Pekanbaru, Riau, Indonesia',
  email: 'rahma.novridayanti@email.com',
  specialties: [
    'Human Capital Management',
    'Digital Marketing Strategy',
    'Data & Operations Analysis',
    'Fresh Grad Manajemen (S.M.)'
  ]
};

export const DEFAULT_INTRO = {
  title: 'RAHMA NOVRIDAYANTI',
  subtitle: 'PORTFOLIO.EXE 🌟',
  badge: 'S1 MANAJEMEN • HR & MARKETING',
  welcomeText: '> SYSTEM READY! WELCOME TO MY PORTFOLIO! ✨',
  bootLogLines: [
    '> INITIALIZING RAHMA OS v2.0...',
    '> LOADING HR & MANAGEMENT MODULES...',
    '> LOADING DIGITAL MARKETING STRATEGIES...',
    '> MOUNTING PIXEL GRAPHICS & CAT ASSISTANT...',
    '> SYSTEM READY! WELCOME TO MY PORTFOLIO! ✨'
  ]
};

export const DEFAULT_NAVBAR = {
  title: 'RAHMA NOVRIDAYANTI',
  subtitle: 'PORTFOLIO.EXE 🌟',
  items: [
    { id: 'home', label: 'HOME', icon: 'Home', visible: true },
    { id: 'experience', label: 'EXPERIENCE', icon: 'Briefcase', visible: true },
    { id: 'skills', label: 'SKILLS', icon: 'Award', visible: true },
    { id: 'contact', label: 'CONTACT', icon: 'Mail', visible: true }
  ]
};

export const DEFAULT_FOOTER = {
  brandTitle: 'RAHMA NOVRIDAYANTI',
  brandSubtitle: 'MANAGEMENT & HR SPECIALIST • PEKANBARU, INDONESIA',
  email: 'rahma.novridayanti25@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rahma-novridayanti/',
  copyrightText: '© 2026 RAHMA NOVRIDAYANTI. ALL RIGHTS RESERVED.',
  statusText: 'SYSTEM STATUS: ONLINE 🐾',
  showSecretPaw: true
};

// ==========================================
// EXPERIENCES CRUD
// ==========================================
export async function fetchExperiences() {
  if (!isFirebaseConfigured || !db) return DEFAULT_EXPERIENCES;
  try {
    const querySnapshot = await withTimeout(getDocs(collection(db, 'experiences')));
    if (querySnapshot.empty) return DEFAULT_EXPERIENCES;
    const list = [];
    querySnapshot.forEach((docSnap) => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });
    return list;
  } catch (error) {
    console.warn('Firestore fetchExperiences failed, using defaults:', error);
    return DEFAULT_EXPERIENCES;
  }
}

export async function addExperience(data) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured yet. Check your .env file.');
  }
  const docRef = await withTimeout(addDoc(collection(db, 'experiences'), {
    ...data,
    createdAt: new Date().toISOString()
  }));
  return { id: docRef.id, ...data };
}

export async function updateExperience(id, data) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured yet. Check your .env file.');
  }
  const docRef = doc(db, 'experiences', id);
  await withTimeout(setDoc(docRef, {
    ...data,
    updatedAt: new Date().toISOString()
  }, { merge: true }));
  return { id, ...data };
}

export async function deleteExperience(id) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured yet. Check your .env file.');
  }
  await withTimeout(deleteDoc(doc(db, 'experiences', id)));
}

// ==========================================
// SKILLS & CERTIFICATES CRUD
// ==========================================
export async function fetchSkills() {
  if (!isFirebaseConfigured || !db) return DEFAULT_SKILL_CATEGORIES;
  try {
    const querySnapshot = await withTimeout(getDocs(collection(db, 'skillCategories')));
    if (querySnapshot.empty) return DEFAULT_SKILL_CATEGORIES;
    const list = [];
    querySnapshot.forEach((docSnap) => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });
    return list;
  } catch (error) {
    console.warn('Firestore fetchSkills failed, using defaults:', error);
    return DEFAULT_SKILL_CATEGORIES;
  }
}

export async function saveSkillCategory(data, id = null) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured yet. Check your .env file.');
  }
  if (id) {
    const docRef = doc(db, 'skillCategories', id);
    await withTimeout(setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true }));
    return { id, ...data };
  } else {
    const docRef = await withTimeout(addDoc(collection(db, 'skillCategories'), {
      ...data,
      createdAt: new Date().toISOString()
    }));
    return { id: docRef.id, ...data };
  }
}

export async function deleteSkillCategory(id) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured yet. Check your .env file.');
  }
  await withTimeout(deleteDoc(doc(db, 'skillCategories', id)));
}

export async function fetchCertificates() {
  if (!isFirebaseConfigured || !db) return DEFAULT_CERTIFICATES;
  try {
    const querySnapshot = await withTimeout(getDocs(collection(db, 'certificates')));
    if (querySnapshot.empty) return DEFAULT_CERTIFICATES;
    const list = [];
    querySnapshot.forEach((docSnap) => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });
    return list;
  } catch (error) {
    console.warn('Firestore fetchCertificates failed, using defaults:', error);
    return DEFAULT_CERTIFICATES;
  }
}

export async function saveCertificate(data, id = null) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured yet. Check your .env file.');
  }
  if (id) {
    const docRef = doc(db, 'certificates', id);
    await withTimeout(setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true }));
    return { id, ...data };
  } else {
    const docRef = await withTimeout(addDoc(collection(db, 'certificates'), {
      ...data,
      createdAt: new Date().toISOString()
    }));
    return { id: docRef.id, ...data };
  }
}

export async function deleteCertificate(id) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured yet. Check your .env file.');
  }
  await withTimeout(deleteDoc(doc(db, 'certificates', id)));
}

// ==========================================
// PROJECTS CRUD
// ==========================================
export async function fetchProjects() {
  if (!isFirebaseConfigured || !db) return DEFAULT_PROJECTS;
  try {
    const querySnapshot = await withTimeout(getDocs(collection(db, 'projects')));
    if (querySnapshot.empty) return DEFAULT_PROJECTS;
    const list = [];
    querySnapshot.forEach((docSnap) => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });
    return list;
  } catch (error) {
    console.warn('Firestore fetchProjects failed, using defaults:', error);
    return DEFAULT_PROJECTS;
  }
}

export async function saveProject(data, id = null) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured yet. Check your .env file.');
  }
  if (id) {
    const docRef = doc(db, 'projects', id);
    await withTimeout(setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true }));
    return { id, ...data };
  } else {
    const docRef = await withTimeout(addDoc(collection(db, 'projects'), {
      ...data,
      createdAt: new Date().toISOString()
    }));
    return { id: docRef.id, ...data };
  }
}

export async function deleteProject(id) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured yet. Check your .env file.');
  }
  await withTimeout(deleteDoc(doc(db, 'projects', id)));
}

// ==========================================
// PROFILE CRUD
// ==========================================
export async function fetchProfile() {
  if (!isFirebaseConfigured || !db) return DEFAULT_PROFILE;
  try {
    const docRef = doc(db, 'settings', 'profile');
    const docSnap = await withTimeout(getDoc(docRef));
    if (docSnap.exists()) {
      return { ...DEFAULT_PROFILE, ...docSnap.data() };
    }
    return DEFAULT_PROFILE;
  } catch (error) {
    console.warn('Firestore fetchProfile failed, using defaults:', error);
    return DEFAULT_PROFILE;
  }
}

export async function updateProfile(data) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured yet. Check your .env file.');
  }
  const docRef = doc(db, 'settings', 'profile');
  await withTimeout(setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true }));
  return data;
}

// ==========================================
// INTRO SCREEN CRUD
// ==========================================
export async function fetchIntro() {
  if (!isFirebaseConfigured || !db) return DEFAULT_INTRO;
  try {
    const docRef = doc(db, 'settings', 'intro');
    const docSnap = await withTimeout(getDoc(docRef));
    if (docSnap.exists()) {
      return { ...DEFAULT_INTRO, ...docSnap.data() };
    }
    return DEFAULT_INTRO;
  } catch (error) {
    console.warn('Firestore fetchIntro failed, using defaults:', error);
    return DEFAULT_INTRO;
  }
}

export async function updateIntro(data) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured yet. Check your .env file.');
  }
  const docRef = doc(db, 'settings', 'intro');
  await withTimeout(setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true }));
  return data;
}

// ==========================================
// NAVBAR & FOOTER CRUD
// ==========================================
export async function fetchNavbar() {
  if (!isFirebaseConfigured || !db) return DEFAULT_NAVBAR;
  try {
    const docRef = doc(db, 'settings', 'navbar');
    const docSnap = await withTimeout(getDoc(docRef));
    if (docSnap.exists()) {
      return { ...DEFAULT_NAVBAR, ...docSnap.data() };
    }
    return DEFAULT_NAVBAR;
  } catch (error) {
    console.warn('Firestore fetchNavbar failed, using defaults:', error);
    return DEFAULT_NAVBAR;
  }
}

export async function updateNavbar(data) {
  if (!isFirebaseConfigured || !db) {
    return data;
  }
  const docRef = doc(db, 'settings', 'navbar');
  await withTimeout(setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true }));
  return data;
}

export async function fetchFooter() {
  if (!isFirebaseConfigured || !db) return DEFAULT_FOOTER;
  try {
    const docRef = doc(db, 'settings', 'footer');
    const docSnap = await withTimeout(getDoc(docRef));
    if (docSnap.exists()) {
      return { ...DEFAULT_FOOTER, ...docSnap.data() };
    }
    return DEFAULT_FOOTER;
  } catch (error) {
    console.warn('Firestore fetchFooter failed, using defaults:', error);
    return DEFAULT_FOOTER;
  }
}

export async function updateFooter(data) {
  if (!isFirebaseConfigured || !db) {
    return data;
  }
  const docRef = doc(db, 'settings', 'footer');
  await withTimeout(setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true }));
  return data;
}

// Helper to seed Firebase with initial default data if collections are empty
export async function seedInitialFirebaseData() {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured yet.');
  }
  
  // Seed Experiences
  for (const exp of DEFAULT_EXPERIENCES) {
    const expData = { ...exp };
    delete expData.id;
    await withTimeout(addDoc(collection(db, 'experiences'), expData));
  }

  // Seed Skill Categories
  for (const cat of DEFAULT_SKILL_CATEGORIES) {
    const catData = { ...cat };
    delete catData.id;
    await withTimeout(addDoc(collection(db, 'skillCategories'), catData));
  }

  // Seed Certificates
  for (const cert of DEFAULT_CERTIFICATES) {
    const certData = { ...cert };
    delete certData.id;
    await withTimeout(addDoc(collection(db, 'certificates'), certData));
  }

  // Seed Projects
  for (const proj of DEFAULT_PROJECTS) {
    const projData = { ...proj };
    delete projData.id;
    await withTimeout(addDoc(collection(db, 'projects'), projData));
  }

  // Seed Profile, Intro, Navbar, & Footer
  await withTimeout(setDoc(doc(db, 'settings', 'profile'), DEFAULT_PROFILE));
  await withTimeout(setDoc(doc(db, 'settings', 'intro'), DEFAULT_INTRO));
  await withTimeout(setDoc(doc(db, 'settings', 'navbar'), DEFAULT_NAVBAR));
  await withTimeout(setDoc(doc(db, 'settings', 'footer'), DEFAULT_FOOTER));
}

// ==========================================
// FILE UPLOAD HELPER (FIREBASE STORAGE OR DATA URL FALLBACK)
// ==========================================
export async function uploadFileToStorage(file, folder = 'uploads') {
  if (!file) return null;

  const readAsDataURL = (fileToRead) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(fileToRead);
    });
  };

  // 1. Try Firebase Storage if configured
  if (isFirebaseConfigured && storage) {
    try {
      const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const storageRef = ref(storage, `${folder}/${cleanFileName}`);
      const snapshot = await withTimeout(uploadBytes(storageRef, file), 3000, 'Upload storage timeout');
      const downloadURL = await withTimeout(getDownloadURL(snapshot.ref), 3000);
      if (downloadURL) return downloadURL;
    } catch (err) {
      console.warn('Firebase Storage upload unavailable, using Base64 Data URL fallback:', err);
    }
  }

  // 2. Fallback to FileReader Data URL (for local demo & offline testing)
  return await readAsDataURL(file);
}
