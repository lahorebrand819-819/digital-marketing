import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';
import { getData, saveData } from './server/storage';
import {
  AgencyData,
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
} from './src/types';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'marketing';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '25802580';
const ACTIVE_TOKENS = new Set<string>();

// Setup multer storage for direct file uploads
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${uniqueSuffix}-${sanitizedName}`);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/avif', 'image/gif'];
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];

  if (allowedImageTypes.includes(file.mimetype) || allowedVideoTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format. Please upload JPG, PNG, WebP, AVIF, SVG, MP4 or WebM.'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 }, // 30MB max
  fileFilter
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Serve static uploads
  app.use('/uploads', express.static(uploadsDir));

  // Admin Auth Middleware
  const requireAdminAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized. Please login.' });
      return;
    }
    const token = authHeader.split(' ')[1];
    if (!ACTIVE_TOKENS.has(token)) {
      res.status(401).json({ error: 'Session expired or invalid. Please login again.' });
      return;
    }
    next();
  };

  // ==========================================
  // AUTH API
  // ==========================================
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = `dga_auth_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      ACTIVE_TOKENS.add(token);
      res.json({
        success: true,
        token,
        user: {
          username: ADMIN_USERNAME,
          name: 'Agency Admin',
          role: 'administrator'
        }
      });
      return;
    }
    res.status(401).json({ error: 'Invalid username or password' });
  });

  app.get('/api/auth/me', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      if (ACTIVE_TOKENS.has(token)) {
        res.json({
          authenticated: true,
          user: {
            username: ADMIN_USERNAME,
            name: 'Agency Admin',
            role: 'administrator'
          }
        });
        return;
      }
    }
    res.status(401).json({ authenticated: false });
  });

  app.post('/api/auth/logout', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      ACTIVE_TOKENS.delete(token);
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });

  // ==========================================
  // PUBLIC DATA & LEADS API
  // ==========================================
  app.get('/api/data', (req: Request, res: Response) => {
    const data = getData();
    // Return sanitized public data (exclude sensitive leads)
    const publicData = {
      settings: data.settings,
      currencies: data.currencies.filter(c => c.enabled),
      services: data.services.filter(s => s.enabled).sort((a, b) => a.displayOrder - b.displayOrder),
      pricingPackages: data.pricingPackages.filter(p => p.enabled).sort((a, b) => a.displayOrder - b.displayOrder),
      portfolio: data.portfolio,
      caseStudies: data.caseStudies,
      team: data.team.sort((a, b) => a.displayOrder - b.displayOrder),
      testimonials: data.testimonials.filter(t => t.enabled),
      faqs: data.faqs.filter(f => f.enabled).sort((a, b) => a.displayOrder - b.displayOrder),
      blog: data.blog.filter(b => !b.isDraft)
    };
    res.json(publicData);
  });

  app.post('/api/leads', (req: Request, res: Response) => {
    const { name, email, phone, company, service, budget, currency, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ error: 'Name, email, and message are required fields.' });
      return;
    }

    const data = getData();
    const newLead: LeadInquiry = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone || '').trim(),
      company: String(company || '').trim(),
      service: String(service || 'General Inquiries').trim(),
      budget: String(budget || 'Flexible').trim(),
      currency: (currency || data.settings.defaultCurrency || 'PKR'),
      message: String(message).trim(),
      status: 'new',
      notes: '',
      createdAt: new Date().toISOString()
    };

    data.leads.unshift(newLead);
    saveData(data);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your proposal request has been received. Our senior strategist will review your inquiry and reach out within 24 hours.',
      leadId: newLead.id
    });
  });

  // ==========================================
  // MEDIA UPLOAD & LIBRARY API
  // ==========================================
  app.post('/api/media/upload', upload.single('file'), (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: 'No file provided' });
      return;
    }

    const isVideo = req.file.mimetype.startsWith('video/');
    const mediaItem: MediaItem = {
      id: `med_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`,
      uploadDate: new Date().toISOString().split('T')[0],
      type: isVideo ? 'video' : 'image'
    };

    const data = getData();
    data.media = data.media || [];
    data.media.unshift(mediaItem);
    saveData(data);

    res.json({
      success: true,
      media: mediaItem
    });
  });

  // ==========================================
  // ADMIN PROTECTED CRUD ENDPOINTS
  // ==========================================
  app.get('/api/admin/data', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    res.json(data);
  });

  // Settings
  app.put('/api/admin/settings', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.settings = { ...data.settings, ...req.body };
    saveData(data);
    res.json({ success: true, settings: data.settings });
  });

  // Currencies
  app.put('/api/admin/currencies', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    if (Array.isArray(req.body)) {
      data.currencies = req.body;
      saveData(data);
      res.json({ success: true, currencies: data.currencies });
      return;
    }
    res.status(400).json({ error: 'Currencies must be an array' });
  });

  // Services
  app.post('/api/admin/services', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const newService: ServiceItem = {
      id: req.body.id || `srv_${Date.now()}`,
      title: req.body.title || 'New Service',
      category: req.body.category || 'social',
      description: req.body.description || '',
      icon: req.body.icon || 'Sparkles',
      image: req.body.image || '',
      startingPricePKR: Number(req.body.startingPricePKR) || 50000,
      startingPriceUSD: Number(req.body.startingPriceUSD) || 250,
      startingPriceGBP: Number(req.body.startingPriceGBP) || 200,
      enabled: req.body.enabled !== undefined ? req.body.enabled : true,
      displayOrder: req.body.displayOrder || (data.services.length + 1),
      features: req.body.features || [],
      deliverableTime: req.body.deliverableTime || '5-7 Days',
      highlightBadge: req.body.highlightBadge || ''
    };
    data.services.push(newService);
    saveData(data);
    res.status(201).json({ success: true, service: newService });
  });

  app.put('/api/admin/services/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const idx = data.services.findIndex(s => s.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    data.services[idx] = { ...data.services[idx], ...req.body, id: req.params.id };
    saveData(data);
    res.json({ success: true, service: data.services[idx] });
  });

  app.delete('/api/admin/services/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.services = data.services.filter(s => s.id !== req.params.id);
    saveData(data);
    res.json({ success: true });
  });

  // Pricing Packages
  app.post('/api/admin/pricing', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const newPkg: PricingPackage = {
      id: req.body.id || `pkg_${Date.now()}`,
      name: req.body.name || 'New Package',
      tag: req.body.tag || '',
      description: req.body.description || '',
      pricePKR: Number(req.body.pricePKR) || 0,
      priceUSD: Number(req.body.priceUSD) || 0,
      priceGBP: Number(req.body.priceGBP) || 0,
      billingPeriod: req.body.billingPeriod || 'monthly',
      isPopular: req.body.isPopular || false,
      enabled: req.body.enabled !== undefined ? req.body.enabled : true,
      displayOrder: req.body.displayOrder || (data.pricingPackages.length + 1),
      features: req.body.features || [],
      ctaText: req.body.ctaText || 'Get Started'
    };
    data.pricingPackages.push(newPkg);
    saveData(data);
    res.status(201).json({ success: true, package: newPkg });
  });

  app.put('/api/admin/pricing/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const idx = data.pricingPackages.findIndex(p => p.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Package not found' });
      return;
    }
    data.pricingPackages[idx] = { ...data.pricingPackages[idx], ...req.body, id: req.params.id };
    saveData(data);
    res.json({ success: true, package: data.pricingPackages[idx] });
  });

  app.delete('/api/admin/pricing/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.pricingPackages = data.pricingPackages.filter(p => p.id !== req.params.id);
    saveData(data);
    res.json({ success: true });
  });

  // Portfolio
  app.post('/api/admin/portfolio', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const newProject: PortfolioProject = {
      id: req.body.id || `proj_${Date.now()}`,
      name: req.body.name || 'New Project',
      category: req.body.category || 'Social Media',
      clientType: req.body.clientType || '',
      description: req.body.description || '',
      coverImage: req.body.coverImage || '',
      gallery: req.body.gallery || [],
      results: req.body.results || '',
      metrics: req.body.metrics || [],
      technologies: req.body.technologies || [],
      link: req.body.link || '',
      featured: req.body.featured || false,
      clientIndustry: req.body.clientIndustry || ''
    };
    data.portfolio.unshift(newProject);
    saveData(data);
    res.status(201).json({ success: true, project: newProject });
  });

  app.put('/api/admin/portfolio/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const idx = data.portfolio.findIndex(p => p.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    data.portfolio[idx] = { ...data.portfolio[idx], ...req.body, id: req.params.id };
    saveData(data);
    res.json({ success: true, project: data.portfolio[idx] });
  });

  app.delete('/api/admin/portfolio/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.portfolio = data.portfolio.filter(p => p.id !== req.params.id);
    saveData(data);
    res.json({ success: true });
  });

  // Case Studies
  app.post('/api/admin/case-studies', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const newCase: CaseStudy = {
      id: req.body.id || `case_${Date.now()}`,
      title: req.body.title || 'New Case Study',
      client: req.body.client || '',
      industry: req.body.industry || '',
      coverImage: req.body.coverImage || '',
      duration: req.body.duration || '3 Months',
      challenge: req.body.challenge || '',
      strategy: req.body.strategy || '',
      solution: req.body.solution || '',
      results: req.body.results || '',
      metrics: req.body.metrics || [],
      testimonial: req.body.testimonial
    };
    data.caseStudies.unshift(newCase);
    saveData(data);
    res.status(201).json({ success: true, caseStudy: newCase });
  });

  app.put('/api/admin/case-studies/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const idx = data.caseStudies.findIndex(c => c.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Case study not found' });
      return;
    }
    data.caseStudies[idx] = { ...data.caseStudies[idx], ...req.body, id: req.params.id };
    saveData(data);
    res.json({ success: true, caseStudy: data.caseStudies[idx] });
  });

  app.delete('/api/admin/case-studies/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.caseStudies = data.caseStudies.filter(c => c.id !== req.params.id);
    saveData(data);
    res.json({ success: true });
  });

  // Team
  app.post('/api/admin/team', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const newMember: TeamMember = {
      id: req.body.id || `team_${Date.now()}`,
      name: req.body.name || 'Team Member',
      position: req.body.position || 'Growth Specialist',
      bio: req.body.bio || '',
      photo: req.body.photo || '',
      socialLinks: req.body.socialLinks || {},
      displayOrder: req.body.displayOrder || (data.team.length + 1)
    };
    data.team.push(newMember);
    saveData(data);
    res.status(201).json({ success: true, member: newMember });
  });

  app.put('/api/admin/team/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const idx = data.team.findIndex(t => t.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Team member not found' });
      return;
    }
    data.team[idx] = { ...data.team[idx], ...req.body, id: req.params.id };
    saveData(data);
    res.json({ success: true, member: data.team[idx] });
  });

  app.delete('/api/admin/team/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.team = data.team.filter(t => t.id !== req.params.id);
    saveData(data);
    res.json({ success: true });
  });

  // Testimonials
  app.post('/api/admin/testimonials', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const newTestimonial: Testimonial = {
      id: req.body.id || `test_${Date.now()}`,
      name: req.body.name || 'Client Name',
      company: req.body.company || '',
      position: req.body.position || '',
      photo: req.body.photo || '',
      review: req.body.review || '',
      rating: Number(req.body.rating) || 5,
      enabled: req.body.enabled !== undefined ? req.body.enabled : true,
      platform: req.body.platform || 'Google Review'
    };
    data.testimonials.unshift(newTestimonial);
    saveData(data);
    res.status(201).json({ success: true, testimonial: newTestimonial });
  });

  app.put('/api/admin/testimonials/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const idx = data.testimonials.findIndex(t => t.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }
    data.testimonials[idx] = { ...data.testimonials[idx], ...req.body, id: req.params.id };
    saveData(data);
    res.json({ success: true, testimonial: data.testimonials[idx] });
  });

  app.delete('/api/admin/testimonials/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.testimonials = data.testimonials.filter(t => t.id !== req.params.id);
    saveData(data);
    res.json({ success: true });
  });

  // FAQs
  app.post('/api/admin/faqs', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const newFaq: FAQItem = {
      id: req.body.id || `faq_${Date.now()}`,
      question: req.body.question || 'New Question',
      answer: req.body.answer || 'Answer here...',
      category: req.body.category || 'General',
      displayOrder: req.body.displayOrder || (data.faqs.length + 1),
      enabled: req.body.enabled !== undefined ? req.body.enabled : true
    };
    data.faqs.push(newFaq);
    saveData(data);
    res.status(201).json({ success: true, faq: newFaq });
  });

  app.put('/api/admin/faqs/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const idx = data.faqs.findIndex(f => f.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'FAQ not found' });
      return;
    }
    data.faqs[idx] = { ...data.faqs[idx], ...req.body, id: req.params.id };
    saveData(data);
    res.json({ success: true, faq: data.faqs[idx] });
  });

  app.delete('/api/admin/faqs/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.faqs = data.faqs.filter(f => f.id !== req.params.id);
    saveData(data);
    res.json({ success: true });
  });

  // Blog
  app.post('/api/admin/blog', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const title = req.body.title || 'New Blog Article';
    const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newArticle: BlogPost = {
      id: req.body.id || `blog_${Date.now()}`,
      title,
      slug,
      excerpt: req.body.excerpt || '',
      content: req.body.content || '',
      coverImage: req.body.coverImage || '',
      category: req.body.category || 'Digital Marketing',
      author: req.body.author || 'Agency Team',
      authorRole: req.body.authorRole || 'Strategist',
      authorPhoto: req.body.authorPhoto || '',
      publishDate: req.body.publishDate || new Date().toISOString().split('T')[0],
      isDraft: req.body.isDraft || false,
      readTime: req.body.readTime || '4 min read',
      seoTitle: req.body.seoTitle || title,
      seoDescription: req.body.seoDescription || req.body.excerpt || '',
      tags: req.body.tags || ['Marketing']
    };
    data.blog.unshift(newArticle);
    saveData(data);
    res.status(201).json({ success: true, article: newArticle });
  });

  app.put('/api/admin/blog/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const idx = data.blog.findIndex(b => b.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }
    data.blog[idx] = { ...data.blog[idx], ...req.body, id: req.params.id };
    saveData(data);
    res.json({ success: true, article: data.blog[idx] });
  });

  app.delete('/api/admin/blog/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.blog = data.blog.filter(b => b.id !== req.params.id);
    saveData(data);
    res.json({ success: true });
  });

  // Leads
  app.put('/api/admin/leads/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const idx = data.leads.findIndex(l => l.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Lead not found' });
      return;
    }
    data.leads[idx] = { ...data.leads[idx], ...req.body, id: req.params.id };
    saveData(data);
    res.json({ success: true, lead: data.leads[idx] });
  });

  app.delete('/api/admin/leads/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.leads = data.leads.filter(l => l.id !== req.params.id);
    saveData(data);
    res.json({ success: true });
  });

  // Media Management
  app.get('/api/admin/media', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    res.json(data.media || []);
  });

  app.delete('/api/admin/media/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    const item = (data.media || []).find(m => m.id === req.params.id);
    if (item && item.filename) {
      const filePath = path.join(uploadsDir, item.filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.error('Failed to unlink file:', e);
        }
      }
    }
    data.media = (data.media || []).filter(m => m.id !== req.params.id);
    saveData(data);
    res.json({ success: true });
  });

  // ==========================================
  // CRM, CLIENTS, PROJECTS, CAMPAIGNS, RESEARCH, AUDIT
  // ==========================================

  // Admin Leads (Create & Bulk Import)
  app.post('/api/admin/leads', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.leads = data.leads || [];
    if (Array.isArray(req.body)) {
      // Bulk CSV Import
      const newItems = req.body.map((item: any) => ({
        ...item,
        id: item.id || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        createdAt: item.createdAt || new Date().toISOString()
      }));
      data.leads.unshift(...newItems);
      saveData(data);
      res.status(201).json({ success: true, count: newItems.length });
      return;
    }
    const newLead = {
      ...req.body,
      id: req.body.id || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: req.body.createdAt || new Date().toISOString()
    };
    data.leads.unshift(newLead);
    saveData(data);
    res.status(201).json({ success: true, lead: newLead });
  });

  // Clients
  app.get('/api/admin/clients', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    res.json(data.clients || []);
  });

  app.post('/api/admin/clients', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.clients = data.clients || [];
    const newClient = {
      ...req.body,
      id: req.body.id || `cli_${Date.now()}`
    };
    data.clients.unshift(newClient);
    saveData(data);
    res.status(201).json({ success: true, client: newClient });
  });

  app.put('/api/admin/clients/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.clients = data.clients || [];
    const idx = data.clients.findIndex(c => c.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Client not found' });
      return;
    }
    data.clients[idx] = { ...data.clients[idx], ...req.body, id: req.params.id };
    saveData(data);
    res.json({ success: true, client: data.clients[idx] });
  });

  app.delete('/api/admin/clients/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.clients = (data.clients || []).filter(c => c.id !== req.params.id);
    saveData(data);
    res.json({ success: true });
  });

  // Projects
  app.get('/api/admin/projects', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    res.json(data.projects || []);
  });

  app.post('/api/admin/projects', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.projects = data.projects || [];
    const newProject = {
      ...req.body,
      id: req.body.id || `proj_${Date.now()}`
    };
    data.projects.unshift(newProject);
    saveData(data);
    res.status(201).json({ success: true, project: newProject });
  });

  app.put('/api/admin/projects/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.projects = data.projects || [];
    const idx = data.projects.findIndex(p => p.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    data.projects[idx] = { ...data.projects[idx], ...req.body, id: req.params.id };
    saveData(data);
    res.json({ success: true, project: data.projects[idx] });
  });

  app.delete('/api/admin/projects/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.projects = (data.projects || []).filter(p => p.id !== req.params.id);
    saveData(data);
    res.json({ success: true });
  });

  // Tasks
  app.get('/api/admin/tasks', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    res.json(data.tasks || []);
  });

  app.post('/api/admin/tasks', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.tasks = data.tasks || [];
    const newTask = {
      ...req.body,
      id: req.body.id || `task_${Date.now()}`
    };
    data.tasks.unshift(newTask);
    saveData(data);
    res.status(201).json({ success: true, task: newTask });
  });

  app.put('/api/admin/tasks/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.tasks = data.tasks || [];
    const idx = data.tasks.findIndex(t => t.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    data.tasks[idx] = { ...data.tasks[idx], ...req.body, id: req.params.id };
    saveData(data);
    res.json({ success: true, task: data.tasks[idx] });
  });

  app.delete('/api/admin/tasks/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.tasks = (data.tasks || []).filter(t => t.id !== req.params.id);
    saveData(data);
    res.json({ success: true });
  });

  // Campaigns
  app.get('/api/admin/campaigns', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    res.json(data.campaigns || []);
  });

  app.post('/api/admin/campaigns', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.campaigns = data.campaigns || [];
    const newCamp = {
      ...req.body,
      id: req.body.id || `camp_${Date.now()}`
    };
    data.campaigns.unshift(newCamp);
    saveData(data);
    res.status(201).json({ success: true, campaign: newCamp });
  });

  app.put('/api/admin/campaigns/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.campaigns = data.campaigns || [];
    const idx = data.campaigns.findIndex(c => c.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Campaign not found' });
      return;
    }
    data.campaigns[idx] = { ...data.campaigns[idx], ...req.body, id: req.params.id };
    saveData(data);
    res.json({ success: true, campaign: data.campaigns[idx] });
  });

  app.delete('/api/admin/campaigns/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.campaigns = (data.campaigns || []).filter(c => c.id !== req.params.id);
    saveData(data);
    res.json({ success: true });
  });

  // Research Projects
  app.get('/api/admin/research', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    res.json(data.researchProjects || []);
  });

  app.post('/api/admin/research', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.researchProjects = data.researchProjects || [];
    const newResearch = {
      ...req.body,
      id: req.body.id || `res_${Date.now()}`,
      date: req.body.date || new Date().toISOString().split('T')[0]
    };
    data.researchProjects.unshift(newResearch);
    saveData(data);
    res.status(201).json({ success: true, research: newResearch });
  });

  app.put('/api/admin/research/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.researchProjects = data.researchProjects || [];
    const idx = data.researchProjects.findIndex(r => r.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Research project not found' });
      return;
    }
    data.researchProjects[idx] = { ...data.researchProjects[idx], ...req.body, id: req.params.id };
    saveData(data);
    res.json({ success: true, research: data.researchProjects[idx] });
  });

  app.delete('/api/admin/research/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.researchProjects = (data.researchProjects || []).filter(r => r.id !== req.params.id);
    saveData(data);
    res.json({ success: true });
  });

  // Integrations
  app.get('/api/admin/integrations', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    res.json(data.integrations || []);
  });

  app.put('/api/admin/integrations', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    if (Array.isArray(req.body)) {
      data.integrations = req.body;
      saveData(data);
      res.json({ success: true, integrations: data.integrations });
      return;
    }
    res.status(400).json({ error: 'Integrations must be an array' });
  });

  // Invoices & Finance
  app.get('/api/admin/invoices', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    res.json(data.invoices || []);
  });

  app.post('/api/admin/invoices', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.invoices = data.invoices || [];
    const newInv = {
      ...req.body,
      id: req.body.id || `inv_${Date.now()}`
    };
    data.invoices.unshift(newInv);
    saveData(data);
    res.status(201).json({ success: true, invoice: newInv });
  });

  app.put('/api/admin/invoices/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.invoices = data.invoices || [];
    const idx = data.invoices.findIndex(i => i.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Invoice not found' });
      return;
    }
    data.invoices[idx] = { ...data.invoices[idx], ...req.body, id: req.params.id };
    saveData(data);
    res.json({ success: true, invoice: data.invoices[idx] });
  });

  app.delete('/api/admin/invoices/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.invoices = (data.invoices || []).filter(i => i.id !== req.params.id);
    saveData(data);
    res.json({ success: true });
  });

  // Audit Logs
  app.get('/api/admin/audit-logs', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    res.json(data.auditLogs || []);
  });

  app.post('/api/admin/audit-logs', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.auditLogs = data.auditLogs || [];
    const newLog = {
      ...req.body,
      id: `aud_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      date: req.body.date || new Date().toISOString().split('T')[0],
      time: req.body.time || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    data.auditLogs.unshift(newLog);
    // Keep max 200 logs
    if (data.auditLogs.length > 200) {
      data.auditLogs = data.auditLogs.slice(0, 200);
    }
    saveData(data);
    res.status(201).json({ success: true, log: newLog });
  });

  // Notifications
  app.get('/api/admin/notifications', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    res.json(data.notifications || []);
  });

  app.put('/api/admin/notifications/:id/read', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.notifications = data.notifications || [];
    const idx = data.notifications.findIndex(n => n.id === req.params.id);
    if (idx !== -1) {
      data.notifications[idx].read = true;
      saveData(data);
    }
    res.json({ success: true });
  });

  app.delete('/api/admin/notifications/:id', requireAdminAuth, (req: Request, res: Response) => {
    const data = getData();
    data.notifications = (data.notifications || []).filter(n => n.id !== req.params.id);
    saveData(data);
    res.json({ success: true });
  });

  // ==========================================
  // VITE / STATIC CLIENT INTEGRATION
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Digital Growth Agency Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
