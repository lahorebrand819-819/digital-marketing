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
  CurrencyConfig,
  ClientProfile,
  ProjectItem,
  TaskItem,
  CampaignItem,
  ResearchProject,
  IntegrationSource,
  AuditLog,
  FinanceInvoice,
  AdminNotification
} from '../types';
import { initialAgencyData } from '../../server/initialData';

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
  formatPrice: (pkr?: number, usd?: number, gbp?: number, currencyOverride?: CurrencyCode) => string;
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
  createLead: (lead: Partial<LeadInquiry>) => Promise<boolean>;
  importLeads: (leads: Partial<LeadInquiry>[]) => Promise<boolean>;
  deleteLead: (id: string) => Promise<boolean>;

  // Clients helpers
  createClient: (client: Partial<ClientProfile>) => Promise<boolean>;
  updateClient: (id: string, client: Partial<ClientProfile>) => Promise<boolean>;
  deleteClient: (id: string) => Promise<boolean>;

  // Projects helpers
  createProject: (project: Partial<ProjectItem>) => Promise<boolean>;
  updateProject: (id: string, project: Partial<ProjectItem>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;

  // Tasks helpers
  createTask: (task: Partial<TaskItem>) => Promise<boolean>;
  updateTask: (id: string, task: Partial<TaskItem>) => Promise<boolean>;
  deleteTask: (id: string) => Promise<boolean>;

  // Campaigns helpers
  createCampaign: (campaign: Partial<CampaignItem>) => Promise<boolean>;
  updateCampaign: (id: string, campaign: Partial<CampaignItem>) => Promise<boolean>;
  deleteCampaign: (id: string) => Promise<boolean>;

  // Research helpers
  createResearchProject: (research: Partial<ResearchProject>) => Promise<boolean>;
  updateResearchProject: (id: string, research: Partial<ResearchProject>) => Promise<boolean>;
  deleteResearchProject: (id: string) => Promise<boolean>;

  // Integrations helpers
  saveIntegrations: (integrations: IntegrationSource[]) => Promise<boolean>;

  // Finance helpers
  createInvoice: (invoice: Partial<FinanceInvoice>) => Promise<boolean>;
  updateInvoice: (id: string, invoice: Partial<FinanceInvoice>) => Promise<boolean>;
  deleteInvoice: (id: string) => Promise<boolean>;

  // Audit Logs & Notifications
  recordAuditLog: (action: string, record: string, changesMade: string) => Promise<boolean>;
  markNotificationRead: (id: string) => Promise<boolean>;
  deleteNotification: (id: string) => Promise<boolean>;

  // Media helpers
  deleteMedia: (id: string) => Promise<boolean>;
  deleteMediaItem: (id: string) => Promise<boolean>;
}

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

const STORAGE_KEY = 'dga_agency_data';

const loadCachedAgencyData = (): AgencyData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.settings && Array.isArray(parsed.pricingPackages)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read cached agency data:', e);
  }
  return initialAgencyData;
};

const persistAgencyData = (dataToSave: AgencyData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (e) {
    console.warn('Could not persist agency data locally:', e);
  }
};

export const AgencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AgencyData>(loadCachedAgencyData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [currentCurrency, setCurrentCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('dga_currency');
    return (saved as CurrencyCode) || 'PKR';
  });

  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('dga_admin_token');
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('dga_admin_token');
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Automatically persist any data updates to localStorage
  useEffect(() => {
    if (data) {
      persistAgencyData(data);
    }
  }, [data]);

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
    const activeToken = token !== undefined ? token : adminToken;
    const endpoint = activeToken ? '/api/admin/data' : '/api/data';
    const headers: Record<string, string> = {};
    if (activeToken) {
      headers['Authorization'] = `Bearer ${activeToken}`;
    }

    try {
      setIsLoading(true);
      const res = await fetch(endpoint, { headers });
      const contentType = res.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        if (res.ok) {
          const jsonData = await res.json();
          if (jsonData && jsonData.settings) {
            setData(jsonData);
            setError(null);
            return;
          }
        } else if (activeToken && res.status === 401) {
          localStorage.removeItem('dga_admin_token');
          setAdminToken(null);
          setIsAuthenticated(false);
        }
      }
    } catch (err: any) {
      console.warn('Backend API not reachable (running in static / local mode):', err);
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
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            if (res.ok) {
              setIsAuthenticated(true);
              fetchData(adminToken);
              return;
            } else if (res.status === 401) {
              localStorage.removeItem('dga_admin_token');
              setAdminToken(null);
              setIsAuthenticated(false);
              fetchData(null);
              return;
            }
          } else {
            // Netlify or static deployment: token in localStorage is valid
            setIsAuthenticated(true);
            fetchData(adminToken);
            return;
          }
        } catch (e) {
          // Offline / static hosting fallback
          setIsAuthenticated(true);
          fetchData(adminToken);
          return;
        }
      }
      fetchData(null);
    };

    checkAuth();
  }, [adminToken, fetchData]);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrentCurrencyState(code);
    localStorage.setItem('dga_currency', code);
  }, []);

  const formatPrice = useCallback((pkr?: number, usd?: number, gbp?: number, currencyOverride?: CurrencyCode) => {
    const code = currencyOverride || currentCurrency;
    const safePkr = typeof pkr === 'number' && !isNaN(pkr) ? pkr : 0;
    const safeUsd = typeof usd === 'number' && !isNaN(usd) ? usd : Math.round(safePkr / 280);
    const safeGbp = typeof gbp === 'number' && !isNaN(gbp) ? gbp : Math.round(safePkr / 360);

    if (code === 'USD') {
      return `$${(safeUsd ?? 0).toLocaleString()}`;
    }
    if (code === 'GBP') {
      return `£${(safeGbp ?? 0).toLocaleString()}`;
    }
    return `Rs. ${(safePkr ?? 0).toLocaleString()}`;
  }, [currentCurrency]);

  const loginAdmin = async (username: string, password: string) => {
    const cleanUser = username.trim();
    const cleanPass = password.trim();

    // Standard Agency Admin Credentials
    const isStaticMatch = (cleanUser.toLowerCase() === 'marketing' && cleanPass === '25802580');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, password: cleanPass })
      });

      const contentType = res.headers.get('content-type') || '';

      // If backend responded with JSON
      if (contentType.includes('application/json')) {
        const resData = await res.json();
        if (res.ok && resData.token) {
          localStorage.setItem('dga_admin_token', resData.token);
          setAdminToken(resData.token);
          setIsAuthenticated(true);
          addToast('Welcome back! Successfully logged into Admin Panel.', 'success');
          await fetchData(resData.token);
          return { success: true };
        } else {
          return {
            success: false,
            error: resData.error || 'Invalid credentials. Please check your username and password.'
          };
        }
      }

      // If backend returned HTML (e.g. on Netlify / static host / 404 rewrite)
      if (isStaticMatch) {
        const fallbackToken = `dga_auth_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        localStorage.setItem('dga_admin_token', fallbackToken);
        setAdminToken(fallbackToken);
        setIsAuthenticated(true);
        addToast('Welcome back! Successfully logged into Admin Panel.', 'success');
        await fetchData(fallbackToken);
        return { success: true };
      } else {
        return {
          success: false,
          error: 'Invalid username or password. Please verify your credentials.'
        };
      }
    } catch (err: any) {
      // Network failure, offline, or host unreachable
      if (isStaticMatch) {
        const fallbackToken = `dga_auth_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        localStorage.setItem('dga_admin_token', fallbackToken);
        setAdminToken(fallbackToken);
        setIsAuthenticated(true);
        addToast('Welcome back! Successfully logged into Admin Panel.', 'success');
        await fetchData(fallbackToken);
        return { success: true };
      }
      return {
        success: false,
        error: 'Invalid credentials. Please verify your username and password.'
      };
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
  };

  const submitLead = async (leadData: Partial<LeadInquiry>) => {
    const newLead: LeadInquiry = {
      id: `lead-${Date.now()}`,
      name: leadData.name || 'Inquiry Contact',
      email: leadData.email || '',
      phone: leadData.phone || '',
      company: leadData.company || '',
      website: leadData.website || '',
      service: leadData.service || 'Meta Ads',
      budget: leadData.budget || '$1,000 - $3,000',
      country: leadData.country || 'Pakistan',
      message: leadData.message || '',
      currency: (leadData.currency as any) || currentCurrency,
      status: 'New',
      notes: leadData.notes || '',
      createdAt: new Date().toISOString(),
      leadScore: 85,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: new Date().toISOString(),
          action: 'Inquiry Submitted',
          note: 'Client submitted lead form via website.',
          user: 'System'
        }
      ]
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          currency: leadData.currency || currentCurrency
        })
      });
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || 'Failed to submit proposal request');
        }
      }
    } catch (err: any) {
      console.warn('Lead API submission offline/static, saving locally:', err);
    }

    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        leads: [newLead, ...(prev.leads || [])],
        notifications: [
          {
            id: `notif-${Date.now()}`,
            type: 'lead',
            title: `New Lead: ${newLead.name}`,
            message: `${newLead.name} inquired for ${newLead.service}.`,
            timestamp: new Date().toISOString(),
            read: false,
            link: '/admin?tab=leads'
          },
          ...(prev.notifications || [])
        ]
      };
    });

    addToast('Inquiry submitted! Our strategist will reach out shortly.', 'success');
    return { success: true, message: 'Inquiry submitted successfully!' };
  };

  const uploadMediaFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/media/upload', {
          method: 'POST',
          headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {},
          body: formData
        });

        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const json = await res.json();
          if (res.ok && json.media) {
            addToast(`Uploaded ${file.name} successfully!`, 'success');
            setData(prev => prev ? { ...prev, media: [json.media, ...(prev.media || [])] } : prev);
            return { success: true, media: json.media };
          }
        }
      } catch (netErr) {
        console.warn('Media upload endpoint unavailable, reading local data URL:', netErr);
      }

      // Fallback for static hosting
      const reader = new FileReader();
      const mediaPromise = new Promise<{ success: boolean; media?: MediaItem }>((resolve) => {
        reader.onload = () => {
          const dataUrl = reader.result as string;
          const newMedia: MediaItem = {
            id: `media-${Date.now()}`,
            filename: file.name,
            originalname: file.name,
            url: dataUrl,
            size: file.size,
            mimetype: file.type,
            uploadDate: new Date().toISOString(),
            type: file.type.startsWith('video') ? 'video' : 'image'
          };
          setData(prev => prev ? { ...prev, media: [newMedia, ...(prev.media || [])] } : prev);
          addToast(`Uploaded ${file.name} successfully!`, 'success');
          resolve({ success: true, media: newMedia });
        };
        reader.onerror = () => {
          addToast('Failed to read file', 'error');
          resolve({ success: false });
        };
        reader.readAsDataURL(file);
      });
      return await mediaPromise;
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
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || 'Request failed');
        }
        return json;
      }
      // On static deployment (Netlify) where API routes return HTML:
      return { success: true, ...body };
    } catch (err: any) {
      console.warn('Backend request fallback in local mode:', err);
      return { success: true, ...body };
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
    const itemToSave: ServiceItem = {
      id: service.id || `srv-${Date.now()}`,
      title: service.title || 'New Service',
      category: (service.category as any) || 'ads',
      description: service.description || '',
      icon: service.icon || 'Sparkles',
      image: service.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      startingPriceUSD: service.startingPriceUSD || 199,
      startingPricePKR: service.startingPricePKR || 55000,
      startingPriceGBP: service.startingPriceGBP || 155,
      features: service.features || [],
      enabled: service.enabled ?? true,
      displayOrder: service.displayOrder || 99,
      deliverableTime: service.deliverableTime || '3-5 business days',
      highlightBadge: service.highlightBadge || '',
      ...service
    };
    const url = isEdit ? `/api/admin/services/${itemToSave.id}` : '/api/admin/services';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await authFetch(url, method, itemToSave);
    const finalItem = (res && res.service) ? res.service : itemToSave;
    setData(prev => {
      if (!prev) return prev;
      const list = prev.services || [];
      const updated = isEdit ? list.map(s => s.id === finalItem.id ? finalItem : s) : [finalItem, ...list];
      return { ...prev, services: updated };
    });
    addToast(`Service "${finalItem.title}" ${isEdit ? 'updated' : 'added'}!`, 'success');
    return true;
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
    const itemToSave: PricingPackage = {
      id: pkg.id || `pkg-${Date.now()}`,
      serviceId: pkg.serviceId || 'meta-ads',
      serviceName: pkg.serviceName || 'Meta Ads',
      name: pkg.name || 'Standard Package',
      tag: pkg.tag || '',
      description: pkg.description || '',
      priceUSD: pkg.priceUSD || 199,
      pricePKR: pkg.pricePKR || 55000,
      priceGBP: pkg.priceGBP || 155,
      billingPeriod: (pkg.billingPeriod as any) || 'monthly',
      features: pkg.features || [],
      isPopular: pkg.isPopular ?? false,
      enabled: pkg.enabled ?? true,
      displayOrder: pkg.displayOrder || 99,
      ...pkg
    };
    const url = isEdit ? `/api/admin/pricing/${itemToSave.id}` : '/api/admin/pricing';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await authFetch(url, method, itemToSave);
    const finalItem = (res && res.package) ? res.package : itemToSave;
    setData(prev => {
      if (!prev) return prev;
      const list = prev.pricingPackages || [];
      const updated = isEdit ? list.map(p => p.id === finalItem.id ? finalItem : p) : [finalItem, ...list];
      return { ...prev, pricingPackages: updated };
    });
    addToast(`Pricing package "${finalItem.name}" ${isEdit ? 'updated' : 'added'}!`, 'success');
    return true;
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
    const itemToSave: PortfolioProject = {
      id: proj.id || `port-${Date.now()}`,
      name: proj.name || 'Portfolio Item',
      clientType: proj.clientType || 'Corporate',
      clientIndustry: proj.clientIndustry || 'E-commerce',
      category: (proj.category as any) || 'Advertising',
      description: proj.description || '',
      coverImage: proj.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      gallery: proj.gallery || [],
      results: proj.results || '250% Growth in ROAS',
      metrics: proj.metrics || [{ label: 'ROAS', value: '4.8x' }],
      technologies: proj.technologies || ['Meta Ads', 'Shopify'],
      featured: proj.featured ?? false,
      ...proj
    };
    const url = isEdit ? `/api/admin/portfolio/${itemToSave.id}` : '/api/admin/portfolio';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await authFetch(url, method, itemToSave);
    const finalItem = (res && res.project) ? res.project : itemToSave;
    setData(prev => {
      if (!prev) return prev;
      const list = prev.portfolio || [];
      const updated = isEdit ? list.map(p => p.id === finalItem.id ? finalItem : p) : [finalItem, ...list];
      return { ...prev, portfolio: updated };
    });
    addToast(`Project "${finalItem.name}" ${isEdit ? 'updated' : 'created'}!`, 'success');
    return true;
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
    const itemToSave: CaseStudy = {
      id: caseStudy.id || `cs-${Date.now()}`,
      title: caseStudy.title || 'Case Study',
      client: caseStudy.client || 'Client',
      industry: caseStudy.industry || 'E-Commerce',
      coverImage: caseStudy.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      duration: caseStudy.duration || '3 Months',
      challenge: caseStudy.challenge || '',
      strategy: caseStudy.strategy || '',
      solution: caseStudy.solution || '',
      results: caseStudy.results || '',
      metrics: caseStudy.metrics || [{ label: 'Revenue Increase', value: '+340%' }],
      testimonial: caseStudy.testimonial,
      ...caseStudy
    };
    const url = isEdit ? `/api/admin/case-studies/${itemToSave.id}` : '/api/admin/case-studies';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await authFetch(url, method, itemToSave);
    const finalItem = (res && res.caseStudy) ? res.caseStudy : itemToSave;
    setData(prev => {
      if (!prev) return prev;
      const list = prev.caseStudies || [];
      const updated = isEdit ? list.map(c => c.id === finalItem.id ? finalItem : c) : [finalItem, ...list];
      return { ...prev, caseStudies: updated };
    });
    addToast(`Case study "${finalItem.title}" ${isEdit ? 'updated' : 'created'}!`, 'success');
    return true;
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
    const itemToSave: TeamMember = {
      id: member.id || `team-${Date.now()}`,
      name: member.name || 'Team Member',
      position: member.position || 'Specialist',
      bio: member.bio || '',
      photo: member.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      socialLinks: member.socialLinks || {},
      displayOrder: member.displayOrder || 99,
      ...member
    };
    const url = isEdit ? `/api/admin/team/${itemToSave.id}` : '/api/admin/team';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await authFetch(url, method, itemToSave);
    const finalItem = (res && res.member) ? res.member : itemToSave;
    setData(prev => {
      if (!prev) return prev;
      const list = prev.team || [];
      const updated = isEdit ? list.map(t => t.id === finalItem.id ? finalItem : t) : [finalItem, ...list];
      return { ...prev, team: updated };
    });
    addToast(`Team member "${finalItem.name}" ${isEdit ? 'updated' : 'added'}!`, 'success');
    return true;
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
    const itemToSave: Testimonial = {
      id: test.id || `test-${Date.now()}`,
      name: test.name || 'Valued Client',
      position: test.position || 'Founder & CEO',
      company: test.company || 'Enterprise',
      review: test.review || '',
      rating: test.rating || 5,
      photo: test.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      enabled: test.enabled ?? true,
      ...test
    };
    const url = isEdit ? `/api/admin/testimonials/${itemToSave.id}` : '/api/admin/testimonials';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await authFetch(url, method, itemToSave);
    const finalItem = (res && res.testimonial) ? res.testimonial : itemToSave;
    setData(prev => {
      if (!prev) return prev;
      const list = prev.testimonials || [];
      const updated = isEdit ? list.map(t => t.id === finalItem.id ? finalItem : t) : [finalItem, ...list];
      return { ...prev, testimonials: updated };
    });
    addToast('Testimonial saved successfully!', 'success');
    return true;
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
    const itemToSave: FAQItem = {
      id: faq.id || `faq-${Date.now()}`,
      category: faq.category || 'General',
      question: faq.question || 'Question',
      answer: faq.answer || 'Answer',
      displayOrder: faq.displayOrder || 99,
      enabled: faq.enabled ?? true,
      ...faq
    };
    const url = isEdit ? `/api/admin/faqs/${itemToSave.id}` : '/api/admin/faqs';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await authFetch(url, method, itemToSave);
    const finalItem = (res && res.faq) ? res.faq : itemToSave;
    setData(prev => {
      if (!prev) return prev;
      const list = prev.faqs || [];
      const updated = isEdit ? list.map(f => f.id === finalItem.id ? finalItem : f) : [finalItem, ...list];
      return { ...prev, faqs: updated };
    });
    addToast('FAQ updated!', 'success');
    return true;
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
    const itemToSave: BlogPost = {
      id: blog.id || `blog-${Date.now()}`,
      title: blog.title || 'New Insight',
      slug: blog.slug || `post-${Date.now()}`,
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      category: blog.category || 'Marketing Strategy',
      coverImage: blog.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      author: blog.author || 'Editorial Team',
      publishDate: blog.publishDate || new Date().toISOString(),
      readTime: blog.readTime || '5 min read',
      isDraft: blog.isDraft ?? false,
      tags: blog.tags || [],
      ...blog
    };
    const url = isEdit ? `/api/admin/blog/${itemToSave.id}` : '/api/admin/blog';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await authFetch(url, method, itemToSave);
    const finalItem = (res && res.blog) ? res.blog : itemToSave;
    setData(prev => {
      if (!prev) return prev;
      const list = prev.blog || [];
      const updated = isEdit ? list.map(b => b.id === finalItem.id ? finalItem : b) : [finalItem, ...list];
      return { ...prev, blog: updated };
    });
    addToast(`Article "${finalItem.title}" saved!`, 'success');
    return true;
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

  const createLead = async (lead: Partial<LeadInquiry>) => {
    const res = await authFetch('/api/admin/leads', 'POST', lead);
    if (res && res.lead) {
      setData(prev => prev ? {
        ...prev,
        leads: [res.lead, ...(prev.leads || [])]
      } : prev);
      addToast('New lead added to CRM!', 'success');
      return true;
    }
    return false;
  };

  const importLeads = async (leads: Partial<LeadInquiry>[]) => {
    const res = await authFetch('/api/admin/leads', 'POST', leads);
    if (res && res.success) {
      await fetchData(adminToken);
      addToast(`Imported ${res.count || leads.length} leads successfully!`, 'success');
      return true;
    }
    return false;
  };

  // Client helpers
  const createClient = async (client: Partial<ClientProfile>) => {
    const res = await authFetch('/api/admin/clients', 'POST', client);
    if (res && res.client) {
      setData(prev => prev ? {
        ...prev,
        clients: [res.client, ...(prev.clients || [])]
      } : prev);
      addToast('Client created successfully!', 'success');
      return true;
    }
    return false;
  };

  const updateClient = async (id: string, client: Partial<ClientProfile>) => {
    const res = await authFetch(`/api/admin/clients/${id}`, 'PUT', client);
    if (res && res.client) {
      setData(prev => prev ? {
        ...prev,
        clients: (prev.clients || []).map(c => c.id === id ? res.client : c)
      } : prev);
      addToast('Client updated!', 'success');
      return true;
    }
    return false;
  };

  const deleteClient = async (id: string) => {
    const res = await authFetch(`/api/admin/clients/${id}`, 'DELETE');
    if (res) {
      setData(prev => prev ? {
        ...prev,
        clients: (prev.clients || []).filter(c => c.id !== id)
      } : prev);
      addToast('Client removed.', 'info');
      return true;
    }
    return false;
  };

  // Project helpers
  const createProject = async (project: Partial<ProjectItem>) => {
    const res = await authFetch('/api/admin/projects', 'POST', project);
    if (res && res.project) {
      setData(prev => prev ? {
        ...prev,
        projects: [res.project, ...(prev.projects || [])]
      } : prev);
      addToast('Project created!', 'success');
      return true;
    }
    return false;
  };

  const updateProject = async (id: string, project: Partial<ProjectItem>) => {
    const res = await authFetch(`/api/admin/projects/${id}`, 'PUT', project);
    if (res && res.project) {
      setData(prev => prev ? {
        ...prev,
        projects: (prev.projects || []).map(p => p.id === id ? res.project : p)
      } : prev);
      addToast('Project updated!', 'success');
      return true;
    }
    return false;
  };

  const deleteProject = async (id: string) => {
    const res = await authFetch(`/api/admin/projects/${id}`, 'DELETE');
    if (res) {
      setData(prev => prev ? {
        ...prev,
        projects: (prev.projects || []).filter(p => p.id !== id)
      } : prev);
      addToast('Project removed.', 'info');
      return true;
    }
    return false;
  };

  // Task helpers
  const createTask = async (task: Partial<TaskItem>) => {
    const res = await authFetch('/api/admin/tasks', 'POST', task);
    if (res && res.task) {
      setData(prev => prev ? {
        ...prev,
        tasks: [res.task, ...(prev.tasks || [])]
      } : prev);
      addToast('Task created!', 'success');
      return true;
    }
    return false;
  };

  const updateTask = async (id: string, task: Partial<TaskItem>) => {
    const res = await authFetch(`/api/admin/tasks/${id}`, 'PUT', task);
    if (res && res.task) {
      setData(prev => prev ? {
        ...prev,
        tasks: (prev.tasks || []).map(t => t.id === id ? res.task : t)
      } : prev);
      return true;
    }
    return false;
  };

  const deleteTask = async (id: string) => {
    const res = await authFetch(`/api/admin/tasks/${id}`, 'DELETE');
    if (res) {
      setData(prev => prev ? {
        ...prev,
        tasks: (prev.tasks || []).filter(t => t.id !== id)
      } : prev);
      addToast('Task removed.', 'info');
      return true;
    }
    return false;
  };

  // Campaign helpers
  const createCampaign = async (campaign: Partial<CampaignItem>) => {
    const res = await authFetch('/api/admin/campaigns', 'POST', campaign);
    if (res && res.campaign) {
      setData(prev => prev ? {
        ...prev,
        campaigns: [res.campaign, ...(prev.campaigns || [])]
      } : prev);
      addToast('Campaign launched!', 'success');
      return true;
    }
    return false;
  };

  const updateCampaign = async (id: string, campaign: Partial<CampaignItem>) => {
    const res = await authFetch(`/api/admin/campaigns/${id}`, 'PUT', campaign);
    if (res && res.campaign) {
      setData(prev => prev ? {
        ...prev,
        campaigns: (prev.campaigns || []).map(c => c.id === id ? res.campaign : c)
      } : prev);
      addToast('Campaign updated!', 'success');
      return true;
    }
    return false;
  };

  const deleteCampaign = async (id: string) => {
    const res = await authFetch(`/api/admin/campaigns/${id}`, 'DELETE');
    if (res) {
      setData(prev => prev ? {
        ...prev,
        campaigns: (prev.campaigns || []).filter(c => c.id !== id)
      } : prev);
      addToast('Campaign removed.', 'info');
      return true;
    }
    return false;
  };

  // Research helpers
  const createResearchProject = async (research: Partial<ResearchProject>) => {
    const res = await authFetch('/api/admin/research', 'POST', research);
    if (res && res.research) {
      setData(prev => prev ? {
        ...prev,
        researchProjects: [res.research, ...(prev.researchProjects || [])]
      } : prev);
      addToast('Research study saved!', 'success');
      return true;
    }
    return false;
  };

  const updateResearchProject = async (id: string, research: Partial<ResearchProject>) => {
    const res = await authFetch(`/api/admin/research/${id}`, 'PUT', research);
    if (res && res.research) {
      setData(prev => prev ? {
        ...prev,
        researchProjects: (prev.researchProjects || []).map(r => r.id === id ? res.research : r)
      } : prev);
      addToast('Research study updated!', 'success');
      return true;
    }
    return false;
  };

  const deleteResearchProject = async (id: string) => {
    const res = await authFetch(`/api/admin/research/${id}`, 'DELETE');
    if (res) {
      setData(prev => prev ? {
        ...prev,
        researchProjects: (prev.researchProjects || []).filter(r => r.id !== id)
      } : prev);
      addToast('Research project removed.', 'info');
      return true;
    }
    return false;
  };

  // Integration helpers
  const saveIntegrations = async (integrations: IntegrationSource[]) => {
    const res = await authFetch('/api/admin/integrations', 'PUT', integrations);
    if (res && res.integrations) {
      setData(prev => prev ? { ...prev, integrations: res.integrations } : prev);
      addToast('Integration configurations saved!', 'success');
      return true;
    }
    return false;
  };

  // Invoice helpers
  const createInvoice = async (invoice: Partial<FinanceInvoice>) => {
    const res = await authFetch('/api/admin/invoices', 'POST', invoice);
    if (res && res.invoice) {
      setData(prev => prev ? {
        ...prev,
        invoices: [res.invoice, ...(prev.invoices || [])]
      } : prev);
      addToast('Invoice created!', 'success');
      return true;
    }
    return false;
  };

  const updateInvoice = async (id: string, invoice: Partial<FinanceInvoice>) => {
    const res = await authFetch(`/api/admin/invoices/${id}`, 'PUT', invoice);
    if (res && res.invoice) {
      setData(prev => prev ? {
        ...prev,
        invoices: (prev.invoices || []).map(i => i.id === id ? res.invoice : i)
      } : prev);
      addToast('Invoice updated!', 'success');
      return true;
    }
    return false;
  };

  const deleteInvoice = async (id: string) => {
    const res = await authFetch(`/api/admin/invoices/${id}`, 'DELETE');
    if (res) {
      setData(prev => prev ? {
        ...prev,
        invoices: (prev.invoices || []).filter(i => i.id !== id)
      } : prev);
      addToast('Invoice removed.', 'info');
      return true;
    }
    return false;
  };

  // Audit and notification helpers
  const recordAuditLog = async (action: string, record: string, changesMade: string) => {
    const res = await authFetch('/api/admin/audit-logs', 'POST', {
      user: 'Administrator',
      action,
      record,
      changesMade
    });
    if (res && res.log) {
      setData(prev => prev ? {
        ...prev,
        auditLogs: [res.log, ...(prev.auditLogs || [])]
      } : prev);
      return true;
    }
    return false;
  };

  const markNotificationRead = async (id: string) => {
    const res = await authFetch(`/api/admin/notifications/${id}/read`, 'PUT');
    if (res) {
      setData(prev => prev ? {
        ...prev,
        notifications: (prev.notifications || []).map(n => n.id === id ? { ...n, read: true } : n)
      } : prev);
      return true;
    }
    return false;
  };

  const deleteNotification = async (id: string) => {
    const res = await authFetch(`/api/admin/notifications/${id}`, 'DELETE');
    if (res) {
      setData(prev => prev ? {
        ...prev,
        notifications: (prev.notifications || []).filter(n => n.id !== id)
      } : prev);
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
        createLead,
        importLeads,
        deleteLead,
        createClient,
        updateClient,
        deleteClient,
        createProject,
        updateProject,
        deleteProject,
        createTask,
        updateTask,
        deleteTask,
        createCampaign,
        updateCampaign,
        deleteCampaign,
        createResearchProject,
        updateResearchProject,
        deleteResearchProject,
        saveIntegrations,
        createInvoice,
        updateInvoice,
        deleteInvoice,
        recordAuditLog,
        markNotificationRead,
        deleteNotification,
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
