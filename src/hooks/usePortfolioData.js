import { useState, useEffect, useCallback } from 'react';
import { 
  fetchExperiences, 
  fetchSkills, 
  fetchCertificates, 
  fetchProjects, 
  fetchProfile,
  fetchIntro,
  fetchNavbar,
  fetchFooter,
  DEFAULT_EXPERIENCES,
  DEFAULT_SKILL_CATEGORIES,
  DEFAULT_CERTIFICATES,
  DEFAULT_PROJECTS,
  DEFAULT_PROFILE,
  DEFAULT_INTRO,
  DEFAULT_NAVBAR,
  DEFAULT_FOOTER
} from '../services/dataService';

const STORAGE_PREFIX = 'portfolio_data_cache_';

function getStoredData(key, fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return fallback;
}

function setStoredData(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    // ignore
  }
}

// Global In-Memory Cache shared across all page transitions with LocalStorage backup
let memoryCache = {
  experiences: getStoredData('experiences', DEFAULT_EXPERIENCES),
  skillCategories: getStoredData('skillCategories', DEFAULT_SKILL_CATEGORIES),
  certificates: getStoredData('certificates', DEFAULT_CERTIFICATES),
  projects: getStoredData('projects', DEFAULT_PROJECTS),
  profile: getStoredData('profile', DEFAULT_PROFILE),
  intro: getStoredData('intro', DEFAULT_INTRO),
  navbar: getStoredData('navbar', DEFAULT_NAVBAR),
  footer: getStoredData('footer', DEFAULT_FOOTER),
  isFetched: false
};

const listeners = new Set();

function notifyListeners() {
  listeners.forEach(listener => listener({ ...memoryCache }));
}

export function updateLocalMemoryCache(key, newData) {
  memoryCache[key] = newData;
  setStoredData(key, newData);
  notifyListeners();
}

export function usePortfolioData() {
  const [data, setData] = useState({ ...memoryCache });
  const [loading, setLoading] = useState(!memoryCache.isFetched);
  const [error, setError] = useState(null);

  const loadData = useCallback(async (forceRefresh = false) => {
    // If data is already cached in memory, don't show loading spinner during page transitions
    if (!forceRefresh && memoryCache.isFetched) {
      setLoading(false);
    }
    
    try {
      const [expData, skillsData, certsData, projData, profileData, introData, navData, footerData] = await Promise.all([
        fetchExperiences(),
        fetchSkills(),
        fetchCertificates(),
        fetchProjects(),
        fetchProfile(),
        fetchIntro(),
        fetchNavbar(),
        fetchFooter()
      ]);
      
      // Preserve local user edits if remote returned identical fallback defaults
      const storedExp = getStoredData('experiences', null);
      const finalExp = (expData === DEFAULT_EXPERIENCES && storedExp) ? storedExp : expData;
      setStoredData('experiences', finalExp);

      const storedSkills = getStoredData('skillCategories', null);
      const finalSkills = (skillsData === DEFAULT_SKILL_CATEGORIES && storedSkills) ? storedSkills : skillsData;
      setStoredData('skillCategories', finalSkills);

      const storedCerts = getStoredData('certificates', null);
      const finalCerts = (certsData === DEFAULT_CERTIFICATES && storedCerts) ? storedCerts : certsData;
      setStoredData('certificates', finalCerts);

      const storedProj = getStoredData('projects', null);
      const finalProj = (projData === DEFAULT_PROJECTS && storedProj) ? storedProj : projData;
      setStoredData('projects', finalProj);

      memoryCache = {
        experiences: finalExp,
        skillCategories: finalSkills,
        certificates: finalCerts,
        projects: finalProj,
        profile: profileData,
        intro: introData,
        navbar: navData,
        footer: footerData,
        isFetched: true
      };
      
      notifyListeners();
    } catch (err) {
      console.error('Failed to load portfolio data:', err);
      setError(err.message || 'Error loading data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleUpdate = (newData) => {
      setData(newData);
      setLoading(false);
    };
    listeners.add(handleUpdate);

    // Initial background fetch on app load
    if (!memoryCache.isFetched) {
      loadData();
    }

    return () => {
      listeners.delete(handleUpdate);
    };
  }, [loadData]);

  return {
    experiences: data.experiences,
    skillCategories: data.skillCategories,
    certificates: data.certificates,
    projects: data.projects,
    profile: data.profile,
    intro: data.intro,
    navbar: data.navbar,
    footer: data.footer,
    loading,
    error,
    refreshData: () => loadData(true)
  };
}
