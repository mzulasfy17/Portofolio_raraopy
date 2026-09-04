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

// Global In-Memory Cache shared across all page transitions
let memoryCache = {
  experiences: DEFAULT_EXPERIENCES,
  skillCategories: DEFAULT_SKILL_CATEGORIES,
  certificates: DEFAULT_CERTIFICATES,
  projects: DEFAULT_PROJECTS,
  profile: DEFAULT_PROFILE,
  intro: DEFAULT_INTRO,
  navbar: DEFAULT_NAVBAR,
  footer: DEFAULT_FOOTER,
  isFetched: false
};

const listeners = new Set();

function notifyListeners() {
  listeners.forEach(listener => listener({ ...memoryCache }));
}

export function updateLocalMemoryCache(key, newData) {
  memoryCache[key] = newData;
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
      
      memoryCache = {
        experiences: expData,
        skillCategories: skillsData,
        certificates: certsData,
        projects: projData,
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
