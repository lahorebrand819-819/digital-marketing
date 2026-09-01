import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  AgencyData,
  CurrencyCode,
  ServiceItem,
  PricingPackage,
  PortfolioProject,
  CaseStudy,
  TeamMember,
  Testimonial,
  FAQItem,
  BlogPost,
  LeadInquiry,
  MediaItem,
  WebsiteSettings,
  CurrencyConfig
} from '../types';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AgencyContextType {
  data: AgencyData | null;
  isLoading: boolean;
  error: string | null;
  currentCurrency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (pkr: number, usd: number, gbp: number, currencyOverride?: CurrencyCode) => string;
  submitLead: (leadData: Partial<LeadInquiry>) => Promise<{ success: boolean; message: string }>;
  
  // Auth
  isAuthenticated: boolean;
  adminToken: string | null;
  loginAdmin: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => void;
  
  // Toast notifications
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Refresh
  refreshData: () => Promise<void>;

  // Upload
  uploadMediaFile: (file: File) => Promise<{ success: boolean; media?: MediaItem; error?: string }>;

  // Admin Mutations
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
  updateSettings: (settings: Partial<WebsiteSettings>) => Promise<boolean>;
  saveSettings: (settings: Partial<WebsiteSettings>) => Promise<boolean>;
  saveCurrencies: (currencies: CurrencyConfig[]) => Promise<boolean>;

  // Service helpers
  createService: (service: Partial<ServiceItem>) => Promise<boolean>;
  updateService: (id: string, service: Partial<ServiceItem>) => Promise<boolean>;
  saveService: (service: Partial<ServiceItem>, isEdit?: boolean) => Promise<boolean>;
  deleteService: (id: string) => Promise<boolean>;

  // Pricing helpers
  createPricingPackage: (pkg: Partial<PricingPackage>) => Promise<boolean>;
  updatePricingPackage: (id: string, pkg: Partial<PricingPackage>) => Promise<boolean>;
  savePricingPackage: (pkg: Partial<PricingPackage>, isEdit?: boolean) => Promise<boolean>;
  deletePricingPackage: (id: string) => Promise<boolean>;

  // Portfolio helpers
  createPortfolio: (proj: Partial<PortfolioProject>) => Promise<boolean>;
  updatePortfolio: (id: string, proj: Partial<PortfolioProject>) => Promise<boolean>;
  savePortfolioProject: (proj: Partial<PortfolioProject>, isEdit?: boolean) => Promise<boolean>;
  deletePortfolioProject: (id: string) => Promise<boolean>;

  // Case study helpers
  createCaseStudy: (caseStudy: Partial<CaseStudy>) => Promise<boolean>;
  updateCaseStudy: (id: string, caseStudy: Partial<CaseStudy>) => Promise<boolean>;
  saveCaseStudy: (caseStudy: Partial<CaseStudy>, isEdit?: boolean) => Promise<boolean>;
  deleteCaseStudy: (id: string) => Promise<boolean>;

  // Team helpers
  createTeamMember: (member: Partial<TeamMember>) => Promise<boolean>;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => Promise<boolean>;
  saveTeamMember: (member: Partial<TeamMember>, isEdit?: boolean) => Promise<boolean>;
  deleteTeamMember: (id: string) => Promise<boolean>;

  // Testimonial helpers
  createTestimonial: (test: Partial<Testimonial>) => Promise<boolean>;
  updateTestimonial: (id: string, test: Partial<Testimonial>) => Promise<boolean>;
  saveTestimonial: (test: Partial<Testimonial>, isEdit?: boolean) => Promise<boolean>;
  deleteTestimonial: (id: string) => Promise<boolean>;

  // FAQ helpers
  createFAQ: (faq: Partial<FAQItem>) => Promise<boolean>;
  updateFAQ: (id: string, faq: Partial<FAQItem>) => Promise<boolean>;
  saveFAQ: (faq: Partial<FAQItem>, isEdit?: boolean) => Promise<boolean>;
  deleteFAQ: (id: string) => Promise<boolean>;

  // Blog helpers
  createBlogPost: (blog: Partial<BlogPost>) => Promise<boolean>;
  updateBlogPost: (id: string, blog: Partial<BlogPost>) => Promise<boolean>;
  saveBlogArticle: (blog: Partial<BlogPost>, isEdit?: boolean) => Promise<boolean>;
  deleteBlogPost: (id: string) => Promise<boolean>;
  deleteBlogArticle: (id: string) => Promise<boolean>;

  // Leads helpers
  updateLeadStatus: (id: string, status: LeadInquiry['status'], notes?: string) => Promise<boolean>;
  updateLead: (id: string, updates: Partial<LeadInquiry>) => Promise<boolean>;
  deleteLead: (id: string) => Promise<boolean>;

  // Media helpers
  deleteMedia: (id: string) => Promise<boolean>;
  deleteMediaItem: (id: string) => Promise<boolean>;
}

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

export const AgencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AgencyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentCurrency, setCurrentCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('dga_currency');
    return (saved as CurrencyCode) || 'PKR';
  });

  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('dga_admin_token');
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Fetch data
  const fetchData = useCallback(async (token?: string | null) => {
    try {
      setIsLoading(true);
      const activeToken = token !== undefined ? token : adminToken;
      
      const endpoint = activeToken ? '/api/admin/data' : '/api/data';
      const headers: Record<string, string> = {};
      if (activeToken) {
        headers['Authorization'] = `Bearer ${activeToken}`;
      }

      const res = await fetch(endpoint, { headers });
      if (!res.ok) {
        // If admin data fails with 401, fallback to public
        if (activeToken && res.status === 401) {
          localStorage.removeItem('dga_admin_token');
          setAdminToken(null);
          setIsAuthenticated(false);
          const fallbackRes = await fetch('/api/data');
          const fallbackData = await fallbackRes.json();
          setData(fallbackData);
          return;
        }
        throw new Error(`Failed to load agency data: ${res.statusText}`);
      }

      const jsonData = await res.json();
      setData(jsonData);
      setError(null);
    } catch (err: any) {
      console.error('Data fetch error:', err);
      setError(err.message || 'Error fetching data');
    } finally {
      setIsLoading(false);
    }
  }, [adminToken]);

  // Check auth on load
  useEffect(() => {
    const checkAuth = async () => {
      if (adminToken) {
        try {
          const res = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${adminToken}` }
          });
          if (res.ok) {
            setIsAuthenticated(true);
            fetchData(adminToken);
            return;
          }
        } catch (e) {
          console.error(e);
        }
        // token invalid
        localStorage.removeItem('dga_admin_token');
        setAdminToken(null);
        setIsAuthenticated(false);
      }
      fetchData(null);
    };

    checkAuth();
  }, [adminToken, fetchData]);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrentCurrencyState(code);
    localStorage.setItem('dga_currency', code);
  }, []);

  const formatPrice = useCallback((pkr: number, usd: number, gbp: number, currencyOverride?: CurrencyCode) => {
    const code = currencyOverride || currentCurrency;
    if (code === 'USD') {
      return `$${usd.toLocaleString()}`;
    }
    if (code === 'GBP') {
      return `£${gbp.toLocaleString()}`;
    }
    return `Rs. ${pkr.toLocaleString()}`;
  }, [currentCurrency]);

  const loginAdmin = async (username: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const resData = await res.json();
      if (res.ok && resData.token) {
        localStorage.setItem('dga_admin_token', resData.token);
        setAdminToken(resData.token);
        setIsAuthenticated(true);
        addToast('Welcome back! Successfully logged into Admin Panel.', 'success');
        await fetchData(resData.token);
        return { success: true };
      } else {
        return { success: false, error: resData.error || 'Invalid credentials' };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const logoutAdmin = async () => {
    try {
      if (adminToken) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${adminToken}` }
        });
      }
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem('dga_admin_token');
    setAdminToken(null);
    setIsAuthenticated(false);
    addToast('Logged out of Admin Panel.', 'info');
    fetchData(null);
  };

  const submitLead = async (leadData: Partial<LeadInquiry>) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          currency: leadData.currency || currentCurrency
        })
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit proposal request');
      }
      addToast('Inquiry submitted! Our strategist will reach out shortly.', 'success');
      return { success: true, message: json.message };
    } catch (err: any) {
      addToast(err.message || 'Failed to submit inquiry', 'error');
      return { success: false, message: err.message };
    }
  };

  const uploadMediaFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/media/upload', {
        method: 'POST',
        headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {},
        body: formData
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to upload media file');
      }

      addToast(`Uploaded ${file.name} successfully!`, 'success');
      // Update media in local state if available
      if (data && json.media) {
        setData(prev => prev ? { ...prev, media: [json.media, ...(prev.media || [])] } : prev);
      }
      return { success: true, media: json.media };
    } catch (err: any) {
      addToast(err.message || 'Media upload failed', 'error');
      return { success: false, error: err.message };
    }
  };

  // Helper for authenticated API calls
  const authFetch = async (url: string, method: string, body?: any) => {
    if (!adminToken) {
      addToast('Unauthorized. Please log in.', 'error');
      return false;
    }
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: body ? JSON.stringify(body) : undefined
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Request failed');
      }
      return json;
    } catch (err: any) {
      addToast(err.message || 'Operation failed', 'error');
      return false;
    }
  };

  const saveSettings = async (settings: Partial<WebsiteSettings>) => {
    const res = await authFetch('/api/admin/settings', 'PUT', settings);
    if (res) {
      setData(prev => prev ? { ...prev, settings: res.settings } : prev);
      addToast('Website settings saved successfully!', 'success');
      return true;
    }
    return false;
  };

  const saveCurrencies = async (currencies: CurrencyConfig[]) => {
    const res = await authFetch('/api/admin/currencies', 'PUT', currencies);
    if (res) {
      setData(prev => prev ? { ...prev, currencies: res.currencies } : prev);
      addToast('Currencies updated successfully!', 'success');
      return true;
    }
    return false;
  };

  const saveService = async (service: Partial<ServiceItem>, isEdit = false) => {
    const url = isEdit ? `/api/admin/services/${service.id}` : '/api/admin/services';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await authFetch(url, method, service);
    if (res) {
      await fetchData(adminToken);
      addToast(`Service "${service.title}" ${isEdit ? 'updated' : 'added'}!`, 'success');
      return true;
    }
    return false;
  };

  const deleteService = async (id: string) => {
    const res = await authFetch(`/api/admin/services/${id}`, 'DELETE');
    if (res) {
      setData(prev => prev ? { ...prev, services: prev.services.filter(s => s.id !== id) } : prev);
      addToast('Service deleted.', 'info');
      return true;
    }
    return false;
  };

  const savePricingPackage = async (pkg: Partial<PricingPackage>, isEdit = false) => {
    const url = isEdit ? `/api/admin/pricing/${pkg.id}` : '/api/admin/pricing';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await authFetch(url, method, pkg);
    if (res) {
      await fetchData(adminToken);
      addToast(`Pricing package "${pkg.name}" ${isEdit ? 'updated' : 'added'}!`, 'success');
      return true;
    }
    return false;
  };

  const deletePricingPackage = async (id: string) => {
    const res = await authFetch(`/api/admin/pricing/${id}`, 'DELETE');
    if (res) {
      setData(prev => prev ? { ...prev, pricingPackages: prev.pricingPackages.filter(p => p.id !== id) } : prev);
      addToast('Package deleted.', 'info');
      return true;
    }
    return false;
  };

  const savePortfolioProject = async (proj: Partial<PortfolioProject>, isEdit = false) => {
    const url = isEdit ? `/api/admin/portfolio/${proj.id}` : '/api/admin/portfolio';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await authFetch(url, method, proj);
    if (res) {
      await fetchData(adminToken);
      addToast(`Project "${proj.name}" ${isEdit ? 'updated' : 'created'}!`, 'success');
      return true;
    }
    return false;
  };

  const deletePortfolioProject = async (id: string) => {
    const res = await authFetch(`/api/admin/portfolio/${id}`, 'DELETE');
    if (res) {
      setData(prev => prev ? { ...prev, portfolio: prev.portfolio.filter(p => p.id !== id) } : prev);
      addToast('Portfolio project deleted.', 'info');
      return true;
    }
    return false;
  };

  const saveCaseStudy = async (caseStudy: Partial<CaseStudy>, isEdit = false) => {
    const url = isEdit ? `/api/admin/case-studies/${caseStudy.id}` : '/api/admin/case-studies';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await authFetch(url, method, caseStudy);
    if (res) {
      await fetchData(adminToken);
      addToast(`Case study "${caseStudy.title}" ${isEdit ? 'updated' : 'created'}!`, 'success');
      return true;
    }
    return false;
  };

  const deleteCaseStudy = async (id: string) => {
    const res = await authFetch(`/api/admin/case-studies/${id}`, 'DELETE');
    if (res) {
      setData(prev => prev ? { ...prev, caseStudies: prev.caseStudies.filter(c => c.id !== id) } : prev);
      addToast('Case study deleted.', 'info');
      return true;
    }
    return false;
  };

  const saveTeamMember = async (member: Partial<TeamMember>, isEdit = false) => {
    const url = isEdit ? `/api/admin/team/${member.id}` : '/api/admin/team';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await authFetch(url, method, member);
    if (res) {
      await fetchData(adminToken);
      addToast(`Team member "${member.name}" ${isEdit ? 'updated' : 'added'}!`, 'success');
      return true;
    }
    return false;
  };

  const deleteTeamMember = async (id: string) => {
    const res = await authFetch(`/api/admin/team/${id}`, 'DELETE');
    if (res) {
      setData(prev => prev ? { ...prev, team: prev.team.filter(t => t.id !== id) } : prev);
      addToast('Team member deleted.', 'info');
      return true;
    }
    return false;
  };

  const saveTestimonial = async (test: Partial<Testimonial>, isEdit = false) => {
    const url = isEdit ? `/api/admin/testimonials/${test.id}` : '/api/admin/testimonials';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await authFetch(url, method, test);
    if (res) {
      await fetchData(adminToken);
      addToast('Testimonial saved successfully!', 'success');
      return true;
    }
    return false;
  };

  const deleteTestimonial = async (id: string) => {
    const res = await authFetch(`/api/admin/testimonials/${id}`, 'DELETE');
    if (res) {
      setData(prev => prev ? { ...prev, testimonials: prev.testimonials.filter(t => t.id !== id) } : prev);
      addToast('Testimonial deleted.', 'info');
      return true;
    }
    return false;
  };

  const saveFAQ = async (faq: Partial<FAQItem>, isEdit = false) => {
    const url = isEdit ? `/api/admin/faqs/${faq.id}` : '/api/admin/faqs';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await authFetch(url, method, faq);
    if (res) {
      await fetchData(adminToken);
      addToast('FAQ updated!', 'success');
      return true;
    }
    return false;
  };

  const deleteFAQ = async (id: string) => {
    const res = await authFetch(`/api/admin/faqs/${id}`, 'DELETE');
    if (res) {
      setData(prev => prev ? { ...prev, faqs: prev.faqs.filter(f => f.id !== id) } : prev);
      addToast('FAQ deleted.', 'info');
      return true;
    }
    return false;
  };

  const saveBlogArticle = async (blog: Partial<BlogPost>, isEdit = false) => {
    const url = isEdit ? `/api/admin/blog/${blog.id}` : '/api/admin/blog';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await authFetch(url, method, blog);
    if (res) {
      await fetchData(adminToken);
      addToast(`Article "${blog.title}" saved!`, 'success');
      return true;
    }
    return false;
  };

  const deleteBlogArticle = async (id: string) => {
    const res = await authFetch(`/api/admin/blog/${id}`, 'DELETE');
    if (res) {
      setData(prev => prev ? { ...prev, blog: prev.blog.filter(b => b.id !== id) } : prev);
      addToast('Article deleted.', 'info');
      return true;
    }
    return false;
  };

  const updateLead = async (id: string, updates: Partial<LeadInquiry>) => {
    const res = await authFetch(`/api/admin/leads/${id}`, 'PUT', updates);
    if (res) {
      setData(prev => prev ? {
        ...prev,
        leads: prev.leads.map(l => l.id === id ? { ...l, ...updates } : l)
      } : prev);
      addToast('Lead updated successfully!', 'success');
      return true;
    }
    return false;
  };

  const deleteLead = async (id: string) => {
    const res = await authFetch(`/api/admin/leads/${id}`, 'DELETE');
    if (res) {
      setData(prev => prev ? { ...prev, leads: prev.leads.filter(l => l.id !== id) } : prev);
      addToast('Lead removed.', 'info');
      return true;
    }
    return false;
  };

  const deleteMedia = async (id: string) => {
    const res = await authFetch(`/api/admin/media/${id}`, 'DELETE');
    if (res) {
      setData(prev => prev ? { ...prev, media: (prev.media || []).filter(m => m.id !== id) } : prev);
      addToast('Media file deleted.', 'info');
      return true;
    }
    return false;
  };

  const changePassword = async (oldPass: string, newPass: string) => {
    try {
      const res = await fetch('/api/admin/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ oldPassword: oldPass, newPassword: newPass })
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Password update failed');
      }
      addToast('Admin password updated successfully!', 'success');
      return { success: true };
    } catch (err: any) {
      addToast(err.message || 'Failed to update password', 'error');
      return { success: false, error: err.message };
    }
  };

  const updateLeadStatus = async (id: string, status: LeadInquiry['status'], notes?: string) => {
    return updateLead(id, { status, ...(notes !== undefined ? { notes } : {}) });
  };

  return (
    <AgencyContext.Provider
      value={{
        data,
        isLoading,
        error,
        currentCurrency,
        setCurrency,
        formatPrice,
        submitLead,
        isAuthenticated,
        adminToken,
        loginAdmin,
        login: loginAdmin,
        logoutAdmin,
        logout: logoutAdmin,
        changePassword,
        toasts,
        addToast,
        showToast: addToast,
        removeToast,
        refreshData: () => fetchData(adminToken),
        uploadMediaFile,
        saveSettings,
        updateSettings: saveSettings,
        saveCurrencies,
        createService: (s) => saveService(s, false),
        updateService: (id, s) => saveService({ ...s, id }, true),
        saveService,
        deleteService,
        createPricingPackage: (p) => savePricingPackage(p, false),
        updatePricingPackage: (id, p) => savePricingPackage({ ...p, id }, true),
        savePricingPackage,
        deletePricingPackage,
        createPortfolio: (p) => savePortfolioProject(p, false),
        updatePortfolio: (id, p) => savePortfolioProject({ ...p, id }, true),
        savePortfolioProject,
        deletePortfolioProject,
        createCaseStudy: (c) => saveCaseStudy(c, false),
        updateCaseStudy: (id, c) => saveCaseStudy({ ...c, id }, true),
        saveCaseStudy,
        deleteCaseStudy,
        createTeamMember: (m) => saveTeamMember(m, false),
        updateTeamMember: (id, m) => saveTeamMember({ ...m, id }, true),
        saveTeamMember,
        deleteTeamMember,
        createTestimonial: (t) => saveTestimonial(t, false),
        updateTestimonial: (id, t) => saveTestimonial({ ...t, id }, true),
        saveTestimonial,
        deleteTestimonial,
        createFAQ: (f) => saveFAQ(f, false),
        updateFAQ: (id, f) => saveFAQ({ ...f, id }, true),
        saveFAQ,
        deleteFAQ,
        createBlogPost: (b) => saveBlogArticle(b, false),
        updateBlogPost: (id, b) => saveBlogArticle({ ...b, id }, true),
        saveBlogArticle,
        deleteBlogPost: deleteBlogArticle,
        deleteBlogArticle,
        updateLeadStatus,
        updateLead,
        deleteLead,
        deleteMedia,
        deleteMediaItem: deleteMedia
      }}
    >
      {children}
    </AgencyContext.Provider>
  );
};

export const useAgency = () => {
  const context = useContext(AgencyContext);
  if (!context) {
    throw new Error('useAgency must be used within an AgencyProvider');
  }
  return context;
};
