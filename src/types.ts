export type CurrencyCode = 'PKR' | 'USD' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  name: string;
  symbol: string;
  enabled: boolean;
  isDefault?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'social' | 'ads' | 'seo' | 'creative' | 'dev' | 'ai';
  description: string;
  icon: string;
  image: string;
  startingPricePKR: number;
  startingPriceUSD: number;
  startingPriceGBP: number;
  enabled: boolean;
  displayOrder: number;
  features: string[];
  deliverableTime: string;
  highlightBadge?: string;
}

export interface PricingPackage {
  id: string;
  serviceId?: string;
  serviceName?: string;
  name: string;
  tag?: string;
  description: string;
  pricePKR: number;
  priceUSD: number;
  priceGBP: number;
  billingType?: 'month' | 'project' | 'custom';
  billingPeriod: 'monthly' | 'quarterly' | 'project' | 'custom';
  isPopular?: boolean;
  enabled: boolean;
  displayOrder: number;
  features: string[];
  ctaText?: string;
}

export interface PortfolioProject {
  id: string;
  name: string;
  category: 'Social Media' | 'SEO' | 'Advertising' | 'Branding' | 'Web Development' | 'E-commerce';
  clientType: string;
  description: string;
  coverImage: string;
  gallery: string[];
  results: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  link?: string;
  featured: boolean;
  clientIndustry: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  coverImage: string;
  duration: string;
  challenge: string;
  strategy: string;
  solution: string;
  results: string;
  metrics: { label: string; value: string; before?: string; after?: string }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
  displayOrder: number;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  photo: string;
  review: string;
  rating: number;
  enabled: boolean;
  platform?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  enabled: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  authorRole?: string;
  authorPhoto?: string;
  publishDate: string;
  isDraft: boolean;
  readTime: string;
  seoTitle?: string;
  seoDescription?: string;
  tags: string[];
}

export type LeadStatus =
  | 'New'
  | 'First Approach'
  | 'Second Approach'
  | 'Third Approach'
  | 'Interested'
  | 'Qualified'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Won'
  | 'Not Interested'
  | 'Lost'
  | 'No Response'
  | 'Follow Up Later'
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'interested'
  | 'proposal-sent'
  | 'won'
  | 'lost';

export interface LeadTimelineEvent {
  id: string;
  date: string;
  action: string;
  note?: string;
  user?: string;
}

export interface LeadInquiry {
  id: string;
  name: string;
  businessName?: string;
  email: string;
  phone: string;
  company?: string;
  website?: string;
  source?: string;
  country?: string;
  industry?: string;
  service?: string;
  serviceInterested?: string;
  budget: string;
  currency?: CurrencyCode;
  leadScore?: number;
  status: LeadStatus | string;
  priority?: 'Low' | 'Medium' | 'High' | 'Urgent';
  assignedTeamMember?: string;
  tags?: string[];
  message?: string;
  notes: string;
  lastContacted?: string;
  nextFollowUp?: string;
  createdAt: string;
  timeline?: LeadTimelineEvent[];
}

export type ClientHealth = 'Healthy' | 'Needs Attention' | 'At Risk';

export interface ClientProfile {
  id: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website?: string;
  country: string;
  industry: string;
  services: string[];
  package: string;
  startDate: string;
  renewalDate: string;
  monthlyValueUSD: number;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue' | 'Active Retainer';
  assignedTeamMember: string;
  health: ClientHealth;
  healthReason?: string;
  notes?: string;
  projectsCount?: number;
  activeCampaignsCount?: number;
  documents?: { name: string; url: string; date: string }[];
  reports?: { title: string; date: string; url?: string }[];
  activity?: { date: string; title: string; description: string }[];
}

export type ProjectStatus =
  | 'Planning'
  | 'In Progress'
  | 'Waiting for Client'
  | 'Review'
  | 'Revision'
  | 'Completed'
  | 'Paused'
  | 'Cancelled';

export interface ProjectItem {
  id: string;
  projectName: string;
  client: string;
  clientId?: string;
  service: string;
  package: string;
  startDate: string;
  deadline: string;
  budgetUSD: number;
  assignedTeam: string[];
  status: ProjectStatus;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  deliverables: string[];
  progressPercent: number;
}

export interface TaskItem {
  id: string;
  task: string;
  project: string;
  projectId?: string;
  client: string;
  assignedTo: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  dueDate: string;
  status: 'Todo' | 'In Progress' | 'Review' | 'Done';
  notes: string;
  isOverdue?: boolean;
}

export type AdPlatform =
  | 'Meta Ads'
  | 'Google Ads'
  | 'TikTok Ads'
  | 'LinkedIn Ads'
  | 'Email Marketing'
  | 'Social Media'
  | 'Website'
  | 'SEO';

export interface CampaignItem {
  id: string;
  name: string;
  platform: AdPlatform;
  client: string;
  budgetUSD: number;
  spendUSD: number;
  status: 'Active' | 'Optimizing' | 'Learning' | 'Paused' | 'Review';
  impressions: number;
  reach: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  conversions: number;
  conversionRate: number;
  cpl: number;
  cpa: number;
  revenueUSD: number;
  roas: number;
  traffic: number;
  sessions: number;
  engagementRate: number;
  leads: number;
  purchases: number;
  targetRoas?: number;
  targetCpa?: number;
  alert?: string;
  isUnderperforming?: boolean;
  dateRange?: string;
}

export type ResearchType =
  | 'Competitor Research'
  | 'Market Research'
  | 'Audience Research'
  | 'SEO / Keyword Research'
  | 'Website Audit'
  | 'Paid Ads Research'
  | 'Social Media Research'
  | 'Content Research'
  | 'Industry Research'
  | 'AI Search / AI Visibility Research';

export interface ResearchProject {
  id: string;
  researchName: string;
  client: string;
  researchType: ResearchType;
  industry: string;
  country: string;
  targetAudience: string;
  competitors: string[];
  date: string;
  findings: string;
  opportunities: string;
  risks: string;
  recommendations: string;
  sources: string[];
  attachments: string[];
  status: 'Draft' | 'In Progress' | 'Completed' | 'Archived';
  createdBy: string;
  dataClassification: {
    verifiedData: string[];
    estimatedData: string[];
    aiInsights: string[];
    recommendationsList: string[];
  };
  auditDetails?: {
    technicalSeoScore: number;
    pageStructureScore: number;
    mobileScore: number;
    performanceScore: number;
    criticalIssues: string[];
    highPriority: string[];
    mediumPriority: string[];
    quickWins: string[];
  };
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  date: string;
  time: string;
  record: string;
  changesMade: string;
  ipAddress?: string;
}

export interface FinanceInvoice {
  id: string;
  invoiceNumber: string;
  client: string;
  service?: string;
  services?: string[];
  amountUSD?: number;
  amount?: number;
  currency?: string;
  issueDate?: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'paid' | 'pending' | 'overdue';
}

export interface AdminNotification {
  id: string;
  type: 'alert' | 'info' | 'warning' | 'success' | 'lead' | 'campaign' | 'invoice' | 'task';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  linkTab?: string;
}

export interface IntegrationSource {
  id: string;
  name: string;
  platform?: string;
  provider?: string;
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
  lastSync?: string;
  lastSynced?: string;
  accountName?: string;
  autoSync?: boolean;
  webhookUrl?: string;
  icon?: string;
  apiKey?: string;
  description?: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  url: string;
  uploadDate: string;
  type: 'image' | 'video';
}

export interface WebsiteSettings {
  name: string;
  tagline: string;
  logo: string;
  favicon: string;
  contactEmail: string;
  phone: string;
  whatsappNumber: string;
  whatsappMessage: string;
  address: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
  };
  footerText: string;
  copyrightText: string;
  defaultCurrency: CurrencyCode;
  seoTitle: string;
  seoDescription: string;
  primaryColor: string;
  secondaryColor: string;
  themeMode: 'dark' | 'light' | 'system';
  buttonStyle: 'rounded' | 'pill' | 'sharp';
}

export type LeadItem = LeadInquiry;
export type CaseStudyItem = CaseStudy;
export type TestimonialItem = Testimonial;
export type AgencySettings = WebsiteSettings;

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent' | 'Low' | 'Medium' | 'High' | 'Urgent' | 'Critical';
export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'Todo' | 'In Progress' | 'Review' | 'Done';

export interface CompetitorAnalysis {
  id: string;
  name: string;
  website: string;
  strengths: string[];
  weaknesses: string[];
  estimatedSpend: string;
  traffic: string;
  socialChannels: string[];
}

export interface MarketTrend {
  id: string;
  trendName: string;
  industry: string;
  impact: 'critical' | 'high' | 'medium' | 'low';
  recommendation: string;
}

export interface KeywordResearch {
  id: string;
  keyword: string;
  searchVolume: string;
  difficulty: string;
  intent: string;
  action: string;
}

export type InvoiceItem = FinanceInvoice;
export type IntegrationItem = IntegrationSource;

export interface AgencyData {
  settings: WebsiteSettings;
  currencies: CurrencyConfig[];
  services: ServiceItem[];
  pricingPackages: PricingPackage[];
  portfolio: PortfolioProject[];
  caseStudies: CaseStudy[];
  team: TeamMember[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  blog: BlogPost[];
  leads: LeadInquiry[];
  media: MediaItem[];
  clients: ClientProfile[];
  projects: ProjectItem[];
  tasks: TaskItem[];
  campaigns: CampaignItem[];
  researchProjects: ResearchProject[];
  research?: {
    competitors: CompetitorAnalysis[];
    trends: MarketTrend[];
    keywords: KeywordResearch[];
  };
  integrations: IntegrationSource[];
  auditLogs: AuditLog[];
  invoices: FinanceInvoice[];
  notifications: AdminNotification[];
}
