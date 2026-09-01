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
  name: string;
  tag?: string;
  description: string;
  pricePKR: number;
  priceUSD: number;
  priceGBP: number;
  billingPeriod: 'monthly' | 'quarterly' | 'custom';
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

export interface LeadInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  currency: CurrencyCode;
  message: string;
  status: 'new' | 'contacted' | 'in-progress' | 'converted' | 'closed' | 'archived';
  notes: string;
  createdAt: string;
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
}
