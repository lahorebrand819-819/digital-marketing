import { AgencyData } from '../src/types';
import {
  telcaPricingPackages,
  telcaFaqs,
  telcaClients,
  telcaProjects,
  telcaTasks,
  telcaCampaigns,
  telcaResearchProjects,
  telcaIntegrations,
  telcaAuditLogs,
  telcaInvoices,
  telcaNotifications,
  telcaLeads
} from './telcaData';

export const initialAgencyData: AgencyData = {
  settings: {
    name: 'Digital Growth Agency',
    tagline: 'Scale Smarter. Reach More Customers. Dominate Your Market.',
    logo: '',
    favicon: '',
    contactEmail: 'growth@digitalgrowthagency.com',
    phone: '+92 300 1234567',
    whatsappNumber: '923001234567',
    whatsappMessage: "Hi Digital Growth Agency! I'd like to scale my business with a tailored marketing strategy.",
    address: 'Suite 402, Executive Heights, Tech Avenue, Lahore & London',
    socialLinks: {
      instagram: 'https://instagram.com/digitalgrowthagency',
      facebook: 'https://facebook.com/digitalgrowthagency',
      tiktok: 'https://tiktok.com/@digitalgrowthagency',
      linkedin: 'https://linkedin.com/company/digitalgrowthagency',
      youtube: 'https://youtube.com/@digitalgrowthagency',
      twitter: 'https://twitter.com/digitalgrowth'
    },
    footerText: 'Transforming ambitious brands through high-impact paid ads, organic SEO dominance, bespoke e-commerce engines, and cutting-edge AI marketing automation.',
    copyrightText: '© 2026 Digital Growth Agency. All rights reserved. Built with precision for market leaders.',
    defaultCurrency: 'PKR',
    seoTitle: 'Digital Growth Agency | #1 Performance Marketing & AI Agency',
    seoDescription: 'Drive measurable ROI, scale paid advertising, dominate Google Search, and accelerate sales with our full-service digital marketing agency.',
    primaryColor: '#6366f1',
    secondaryColor: '#a855f7',
    themeMode: 'dark',
    buttonStyle: 'rounded'
  },
  currencies: [
    {
      code: 'PKR',
      name: 'Pakistani Rupee',
      symbol: 'Rs.',
      enabled: true,
      isDefault: true
    },
    {
      code: 'USD',
      name: 'US Dollar',
      symbol: '$',
      enabled: true,
      isDefault: false
    },
    {
      code: 'GBP',
      name: 'British Pound',
      symbol: '£',
      enabled: true,
      isDefault: false
    }
  ],
  services: [
    {
      id: 'social-media-marketing',
      title: 'Social Media Marketing',
      category: 'social',
      description: 'High-converting viral social campaigns across Instagram, TikTok, LinkedIn & Facebook that captivate audiences and trigger direct action.',
      icon: 'Share2',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80',
      startingPricePKR: 75000,
      startingPriceUSD: 350,
      startingPriceGBP: 280,
      enabled: true,
      displayOrder: 1,
      deliverableTime: '7-14 Days setup',
      highlightBadge: 'High ROI',
      features: ['Viral Content Calendar', 'Audience Growth Strategy', 'Influencer Collab Framework', 'Weekly Analytics Report']
    },
    {
      id: 'social-media-management',
      title: 'Social Media Management',
      category: 'social',
      description: 'Complete hands-off daily management, community engagement, storytelling posts, reels editing, and 24/7 brand reputation care.',
      icon: 'Users',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80',
      startingPricePKR: 85000,
      startingPriceUSD: 400,
      startingPriceGBP: 320,
      enabled: true,
      displayOrder: 2,
      deliverableTime: 'Monthly ongoing',
      features: ['Daily High-Res Posts & Reels', 'Community DMs & Replies', 'Custom Graphic Assets', 'Monthly Growth Strategy Review']
    },
    {
      id: 'search-engine-optimization',
      title: 'SEO (Search Engine Optimization)',
      category: 'seo',
      description: 'Dominate page #1 for high-intent keywords. Technical audits, programmatic on-page SEO, high-authority backlink architecture, and local rank tracking.',
      icon: 'Search',
      image: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=800&auto=format&fit=crop&q=80',
      startingPricePKR: 95000,
      startingPriceUSD: 450,
      startingPriceGBP: 360,
      enabled: true,
      displayOrder: 3,
      deliverableTime: 'Ongoing retainer',
      highlightBadge: 'Long-Term Growth',
      features: ['Technical Site Speed & Schema Audit', 'High-Intent Keyword Mapping', 'Premium Backlink Acquisition', 'Rank Tracking Dashboard']
    },
    {
      id: 'google-ads-ppc',
      title: 'Google Ads & Search PPC',
      category: 'ads',
      description: 'Capture buyers at the exact moment they search. Precision Google Search, Shopping, Performance Max, and YouTube ad campaigns with ruthless ROAS optimization.',
      icon: 'Target',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      startingPricePKR: 90000,
      startingPriceUSD: 420,
      startingPriceGBP: 340,
      enabled: true,
      displayOrder: 4,
      deliverableTime: '3-5 Days setup',
      highlightBadge: 'Fastest Traffic',
      features: ['High-Intent Search Campaigns', 'Performance Max Setup', 'Negative Keyword Shielding', 'Conversion API Integration']
    },
    {
      id: 'meta-facebook-ads',
      title: 'Meta / Facebook Ads',
      category: 'ads',
      description: 'Scale direct response e-commerce and B2B lead generation with hyper-targeted audience funnels, lookalikes, and dynamic creative testing.',
      icon: 'Megaphone',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
      startingPricePKR: 85000,
      startingPriceUSD: 400,
      startingPriceGBP: 320,
      enabled: true,
      displayOrder: 5,
      deliverableTime: '3-5 Days setup',
      highlightBadge: 'Top Converter',
      features: ['Full-Funnel Retargeting', 'Creative Angle A/B Testing', 'CBO Scaling Architecture', 'Custom ROAS Dashboard']
    },
    {
      id: 'instagram-marketing',
      title: 'Instagram Marketing',
      category: 'social',
      description: 'Turn your Instagram profile into a customer-generating powerhouse with aesthetic carousels, trending reels, and direct DM conversion flows.',
      icon: 'Instagram',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      startingPricePKR: 70000,
      startingPriceUSD: 330,
      startingPriceGBP: 260,
      enabled: true,
      displayOrder: 6,
      deliverableTime: 'Weekly cycle',
      features: ['Aesthetic Grid Design', 'Viral Reel Scripts & Edits', 'Story Highlights & Bio Optimization', 'DM Funnel Automation']
    },
    {
      id: 'tiktok-marketing',
      title: 'TikTok Marketing',
      category: 'social',
      description: 'Leverage TikTok algorithm dynamics, UGC creators, Spark Ads, and viral organic formats that blow up brand visibility among Gen Z and Millennials.',
      icon: 'Video',
      image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&auto=format&fit=crop&q=80',
      startingPricePKR: 80000,
      startingPriceUSD: 380,
      startingPriceGBP: 300,
      enabled: true,
      displayOrder: 7,
      deliverableTime: '5-7 Days setup',
      highlightBadge: 'Trending',
      features: ['Hook-First Video Strategy', 'UGC Creator Sourcing', 'TikTok Ads Manager Scaling', 'Sound & Trend Riding']
    },
    {
      id: 'content-creation',
      title: 'Content Creation & Copywriting',
      category: 'creative',
      description: 'Compelling brand stories, SEO blog posts, persuasive ad copies, video scripts, and sales letters designed to trigger emotional buying decisions.',
      icon: 'PenTool',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80',
      startingPricePKR: 60000,
      startingPriceUSD: 290,
      startingPriceGBP: 230,
      enabled: true,
      displayOrder: 8,
      deliverableTime: '3-7 Days',
      features: ['Persuasive Direct Response Copy', 'SEO Optimized Blog Posts', 'Social Media Copywriting', 'Video Scriptwriting']
    },
    {
      id: 'graphic-design',
      title: 'Graphic Design & Brand Assets',
      category: 'creative',
      description: 'World-class visual assets, ad creatives, presentation decks, packaging, and marketing collateral crafted to command authority in your niche.',
      icon: 'Palette',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80',
      startingPricePKR: 65000,
      startingPriceUSD: 300,
      startingPriceGBP: 240,
      enabled: true,
      displayOrder: 9,
      deliverableTime: '3-5 Days',
      features: ['High-Converting Ad Banners', 'Vector Brand Assets', 'Pitch Decks & Presentations', 'Packaging & Print Files']
    },
    {
      id: 'video-marketing',
      title: 'Video Marketing & Motion Graphics',
      category: 'creative',
      description: 'Cinematic brand films, motion graphic explainers, 3D product animations, and punchy vertical reels with sound design and subtitle animation.',
      icon: 'Film',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
      startingPricePKR: 90000,
      startingPriceUSD: 430,
      startingPriceGBP: 350,
      enabled: true,
      displayOrder: 10,
      deliverableTime: '7-10 Days',
      highlightBadge: 'High Engagement',
      features: ['Motion Graphics Animation', 'Color Grading & Sound Design', 'Fast-Paced Hook Edits', 'Multi-Platform Export Formats']
    },
    {
      id: 'website-development',
      title: 'Website Development',
      category: 'dev',
      description: 'Bespoke, lightning-fast, high-converting websites built with modern React, Next.js, and Tailwind CSS engineered for seamless conversions.',
      icon: 'Globe',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
      startingPricePKR: 150000,
      startingPriceUSD: 700,
      startingPriceGBP: 550,
      enabled: true,
      displayOrder: 11,
      deliverableTime: '10-20 Days',
      highlightBadge: 'Full-Stack',
      features: ['Modern Responsive Architecture', '100/100 Core Web Vitals', 'Custom CMS Integration', 'SEO & Analytics Pre-Installed']
    },
    {
      id: 'ecommerce-solutions',
      title: 'E-commerce Solutions',
      category: 'dev',
      description: 'End-to-end Shopify and custom headless e-commerce stores designed for high checkout rates, upsells, automated inventory, and frictionless payments.',
      icon: 'ShoppingCart',
      image: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=800&auto=format&fit=crop&q=80',
      startingPricePKR: 180000,
      startingPriceUSD: 850,
      startingPriceGBP: 680,
      enabled: true,
      displayOrder: 12,
      deliverableTime: '14-25 Days',
      highlightBadge: 'Revenue Engine',
      features: ['Shopify Plus / Custom Store', 'High-Converting Checkout Flow', 'Upsell & Cross-sell Automations', 'Multi-Currency Gateways']
    },
    {
      id: 'branding-identity',
      title: 'Branding & Visual Identity',
      category: 'creative',
      description: 'Comprehensive brand identity kits: modern logos, typography systems, color guidelines, tone of voice manuals, and brand story books.',
      icon: 'Sparkles',
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80',
      startingPricePKR: 110000,
      startingPriceUSD: 520,
      startingPriceGBP: 420,
      enabled: true,
      displayOrder: 13,
      deliverableTime: '7-14 Days',
      features: ['Primary & Secondary Logo Suite', 'Typography & Color Guidelines', 'Brand Identity Book (PDF)', 'Social Media Design Kit']
    },
    {
      id: 'email-marketing-automation',
      title: 'Email Marketing & CRM Funnels',
      category: 'ads',
      description: 'Automated email flows (Welcome Series, Abandoned Cart, VIP Nurture) with Klaviyo/Mailchimp generating up to 35% of total revenue on autopilot.',
      icon: 'Mail',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      startingPricePKR: 70000,
      startingPriceUSD: 330,
      startingPriceGBP: 260,
      enabled: true,
      displayOrder: 14,
      deliverableTime: '5-7 Days',
      features: ['Klaviyo / CRM Setup', 'Segmented Welcome & Cart Flows', 'High-Click Email Templates', 'A/B Testing & Deliverability Guard']
    },
    {
      id: 'ai-automation-solutions',
      title: 'AI Automation & Chatbots',
      category: 'ai',
      description: 'Automate repetitive workflows, customer support chatbots, AI lead qualification agents, and automated outreach engines to 10x your operational speed.',
      icon: 'Bot',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
      startingPricePKR: 130000,
      startingPriceUSD: 600,
      startingPriceGBP: 480,
      enabled: true,
      displayOrder: 15,
      deliverableTime: '7-14 Days',
      highlightBadge: 'Cutting-Edge',
      features: ['Custom AI Lead Qualifier', 'Automated CRM Integrations', 'AI Content Generation Workflows', '24/7 Smart Customer Chatbot']
    }
  ],
  pricingPackages: [
    {
      id: 'package-starter',
      name: 'Starter',
      tag: 'For Small Businesses & Startups',
      description: 'The essential foundation to build a solid online presence, generate consistent inbound leads, and test paid customer acquisition.',
      pricePKR: 95000,
      priceUSD: 450,
      priceGBP: 360,
      billingPeriod: 'monthly',
      isPopular: false,
      enabled: true,
      displayOrder: 1,
      ctaText: 'Start Growing',
      features: [
        '12 High-Quality Social Media Posts/mo',
        'Meta Ads Management (up to $1.5k ad spend)',
        'Basic SEO & Google Business Profile Setup',
        'Custom Graphic Design & Copywriting',
        'Bi-weekly Performance Reports',
        'Email & WhatsApp Support'
      ]
    },
    {
      id: 'package-growth',
      name: 'Growth',
      tag: 'Most Popular for Scaling Brands',
      description: 'Our flagship full-funnel acceleration plan designed for businesses ready to aggressively expand market share and multiply revenue.',
      pricePKR: 195000,
      priceUSD: 890,
      priceGBP: 720,
      billingPeriod: 'monthly',
      isPopular: true,
      enabled: true,
      displayOrder: 2,
      ctaText: 'Accelerate Growth',
      features: [
        '24 High-Quality Social Posts + 8 Reels/Videos',
        'Meta + Google Ads Multi-Channel Funnel',
        'Complete On-Page & Technical SEO',
        'Email Marketing & Automated Klaviyo Flows',
        'A/B Creative Testing & Ad Copy Iterations',
        'Dedicated Growth Account Manager',
        'Weekly Analytics & Conversion Review'
      ]
    },
    {
      id: 'package-professional',
      name: 'Professional',
      tag: 'For Established Market Leaders',
      description: 'Comprehensive 360-degree digital dominance with multi-platform paid ads, advanced SEO authority building, video marketing, and conversion optimization.',
      pricePKR: 350000,
      priceUSD: 1600,
      priceGBP: 1280,
      billingPeriod: 'monthly',
      isPopular: false,
      enabled: true,
      displayOrder: 3,
      ctaText: 'Scale to #1',
      features: [
        'Daily Social Content & Viral Reels/TikToks',
        'Omnichannel Ads: Meta, Google, TikTok, LinkedIn',
        'Aggressive SEO Backlink & Keyword Takeover',
        'Full Video Production & Motion Graphics',
        'CRO (Conversion Rate Optimization) Audits',
        'Custom AI Lead Routing & CRM Workflows',
        'Real-time Live Analytics Dashboard',
        '24/7 Priority VIP Slack / WhatsApp Channel'
      ]
    },
    {
      id: 'package-enterprise',
      name: 'Enterprise',
      tag: 'Custom Dedicated Growth Team',
      description: 'Custom bespoke growth architecture, dedicated media buyers, full-stack engineers, and executive strategy for enterprise-scale brands.',
      pricePKR: 650000,
      priceUSD: 2950,
      priceGBP: 2350,
      billingPeriod: 'custom',
      isPopular: false,
      enabled: true,
      displayOrder: 4,
      ctaText: 'Talk to Founders',
      features: [
        'Dedicated 5-Person Agency Squad',
        'Unlimited Ad Spend Budget Scaling',
        'Custom Web & Headless E-commerce Development',
        'Bespoke AI Workflows & Proprietary Tooling',
        'Weekly Executive Strategy Sessions',
        'Guaranteed Performance Milestone SLA',
        'Full Global Multi-Market Localization'
      ]
    }
  ],
  portfolio: [
    {
      id: 'aura-luxury-apparel',
      name: 'Aura Luxury Apparel',
      category: 'E-commerce',
      clientType: 'Direct-to-Consumer Fashion',
      description: 'Scaled a high-end luxury fashion brand from $20k to $180k monthly recurring revenue using high-converting Meta UGC ads and a headless Shopify redesign.',
      coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&auto=format&fit=crop&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1000&auto=format&fit=crop&q=80'
      ],
      results: '+420% ROAS, $1.4M Total Sales in 8 Months',
      metrics: [
        { label: 'Return on Ad Spend', value: '4.8x ROAS' },
        { label: 'Revenue Growth', value: '+380%' },
        { label: 'Conversion Rate', value: '3.9%' }
      ],
      technologies: ['Shopify Plus', 'Meta Ads', 'Klaviyo', 'Figma'],
      link: 'https://example.com/aura',
      featured: true,
      clientIndustry: 'Luxury Fashion'
    },
    {
      id: 'zenith-fintech-app',
      name: 'Zenith Pay Global',
      category: 'Advertising',
      clientType: 'FinTech Startup',
      description: 'Launched a multi-channel user acquisition blitz across Google Search, YouTube, and LinkedIn that generated 65,000+ app installs under target CPA.',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1000&auto=format&fit=crop&q=80'
      ],
      results: '65k+ Verified Installs with 42% Lower CAC',
      metrics: [
        { label: 'App Downloads', value: '65,000+' },
        { label: 'Customer Acq. Cost', value: '-42% CAC' },
        { label: 'User Retention (30d)', value: '68%' }
      ],
      technologies: ['Google Ads', 'Branch.io', 'LinkedIn Ads', 'Motion Video'],
      link: 'https://example.com/zenith',
      featured: true,
      clientIndustry: 'FinTech & Banking'
    },
    {
      id: 'lumina-saas-platform',
      name: 'Lumina Cloud AI',
      category: 'SEO',
      clientType: 'B2B Enterprise SaaS',
      description: 'Engineered a 12-month programmatic SEO framework and high-authority link campaign that vaulted Lumina to the #1 Google ranking for 80+ enterprise search terms.',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80'
      ],
      results: '+640% Organic Traffic, $2.1M Pipeline Value',
      metrics: [
        { label: 'Organic Monthly Visits', value: '280,000+' },
        { label: 'Page 1 Keywords', value: '142 terms' },
        { label: 'Qualified Inbound Demos', value: '+310%' }
      ],
      technologies: ['Ahrefs', 'Next.js', 'Schema Markups', 'Clearscope'],
      link: 'https://example.com/lumina',
      featured: true,
      clientIndustry: 'Enterprise Software'
    },
    {
      id: 'prime-skincare-viral',
      name: 'Glow Botanic Beauty',
      category: 'Social Media',
      clientType: 'Organic Cosmetics',
      description: 'Created a viral TikTok and Instagram UGC campaign featuring 40 micro-influencers, generating 14 million views and selling out initial warehouse inventory in 72 hours.',
      coverImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&auto=format&fit=crop&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&auto=format&fit=crop&q=80'
      ],
      results: '14.2M Total Views, 3x Sold Out Product Drop',
      metrics: [
        { label: 'Organic Video Views', value: '14.2M' },
        { label: 'New Instagram Followers', value: '+84,000' },
        { label: 'Launch Day Revenue', value: '$120,000' }
      ],
      technologies: ['TikTok Spark Ads', 'CapCut Pro', 'Influencer CRM', 'Instagram Shop'],
      link: 'https://example.com/glow',
      featured: true,
      clientIndustry: 'Health & Beauty'
    },
    {
      id: 'apex-real-estate',
      name: 'Apex Luxury Estates',
      category: 'Branding',
      clientType: 'Ultra-Luxury Property Group',
      description: 'Rebranded a premier real estate development group with an ultra-sleek minimalist identity, interactive 3D property showroom, and VIP private buyer lead funnels.',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80'
      ],
      results: '$48M in Luxury Property Inquiries in 6 Months',
      metrics: [
        { label: 'Property Inquiries', value: '450+ High Net Worth' },
        { label: 'Avg. Property Value Sold', value: '$3.2M' },
        { label: 'Brand Recognition', value: '+190%' }
      ],
      technologies: ['React WebGL', 'Figma', 'Luxury Branding', 'Google Ads'],
      link: 'https://example.com/apex',
      featured: false,
      clientIndustry: 'Real Estate'
    },
    {
      id: 'nova-coffee-co',
      name: 'Nova Artisan Coffee Roasters',
      category: 'Web Development',
      clientType: 'Specialty Beverage Brand',
      description: 'Engineered a modern React and Tailwind web experience featuring a custom interactive coffee subscription quiz that increased recurring subscription signups by 240%.',
      coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000&auto=format&fit=crop&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000&auto=format&fit=crop&q=80'
      ],
      results: '+240% Subscription Conversions, 99 PageSpeed Score',
      metrics: [
        { label: 'Quiz Completion Rate', value: '78%' },
        { label: 'Monthly Recurring Subscribers', value: '4,200+' },
        { label: 'Page Load Speed', value: '0.8s' }
      ],
      technologies: ['React', 'Tailwind CSS', 'Stripe', 'Framer Motion'],
      link: 'https://example.com/nova',
      featured: false,
      clientIndustry: 'Food & Beverage'
    }
  ],
  caseStudies: [
    {
      id: 'case-aura-fashion',
      title: 'How We Scaled Aura Apparel to $1.4M in 8 Months With Full-Funnel Paid Ads',
      client: 'Aura Luxury Apparel',
      industry: 'E-commerce & Luxury Fashion',
      coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&auto=format&fit=crop&q=80',
      duration: '8 Months',
      challenge: 'Aura had a premium product line but struggled with low ad conversion rates (1.2%) and high customer acquisition costs ($65 CAC) that eroded their profit margins.',
      strategy: 'We rebuilt their entire ad creative pipeline with UGC video hooks, implemented Meta dynamic catalog retargeting, and redesigned their mobile PDP with fast 1-click checkout.',
      solution: 'Deployed 60+ weekly ad creative variations, integrated Klaviyo post-purchase automated flows, and optimized Google Shopping for high-intent brand queries.',
      results: 'Aura saw a 420% increase in total revenue, scaling from $20,000/mo to $180,000/mo while improving return on ad spend to a consistent 4.8x ROAS.',
      metrics: [
        { label: 'Monthly Revenue', value: '$180k/mo', before: '$20k/mo', after: '$180k/mo' },
        { label: 'ROAS', value: '4.8x', before: '1.6x', after: '4.8x' },
        { label: 'Customer Acq. Cost', value: '$22', before: '$65', after: '$22' }
      ],
      testimonial: {
        quote: 'Digital Growth Agency did not just run ads for us—they revolutionized our whole sales machine. We grew faster in 8 months than in our prior 3 years combined.',
        author: 'Elena Rostova',
        role: 'CEO & Founder, Aura Luxury'
      }
    },
    {
      id: 'case-zenith-fintech',
      title: 'Acquiring 65,000+ Verified FinTech Users at a 42% Lower Cost Per Acquisition',
      client: 'Zenith Pay Global',
      industry: 'Financial Technology',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80',
      duration: '6 Months',
      challenge: 'Competing in the fiercely saturated fintech space with sky-high ad bid costs across Google Search and strict financial compliance guidelines.',
      strategy: 'Built educational comparison landing pages, deployed high-impact motion explainers on YouTube, and ran high-intent search campaigns targeting unbanked professionals.',
      solution: 'Implemented conversion tracking via AppsFlyer and Segment, allowing algorithmic bid optimization toward users who completed KYC verification rather than mere app installs.',
      results: 'Generated 65,000+ KYC-verified active users while dropping CAC from $38 to $22 per verified account.',
      metrics: [
        { label: 'Total Verified Users', value: '65,000+', before: '3,200', after: '65,000+' },
        { label: 'KYC Completion Rate', value: '72%', before: '34%', after: '72%' },
        { label: 'CAC Reduction', value: '-42%', before: '$38', after: '$22' }
      ],
      testimonial: {
        quote: 'Their data-driven discipline and creative velocity gave us an undeniable edge against heavily funded competitors.',
        author: 'Tariq Al-Mansoor',
        role: 'VP of Growth, Zenith Pay'
      }
    }
  ],
  team: [
    {
      id: 'sarah-jenkins',
      name: 'Sarah Jenkins',
      position: 'Founder & Chief Growth Officer',
      bio: 'Ex-Google Growth Lead with 11+ years scaling D2C and B2B brands past $100M+ in cumulative client revenue.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      },
      displayOrder: 1
    },
    {
      id: 'hamza-tariq',
      name: 'Hamza Tariq',
      position: 'Head of Performance Media',
      bio: 'Meta & Google Ads strategist managing $15M+ in annual paid media spend with an average 4.2x ROAS portfolio track record.',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      },
      displayOrder: 2
    },
    {
      id: 'maya-chen',
      name: 'Maya Chen',
      position: 'Creative Director & Motion Lead',
      bio: 'Award-winning visual designer and video director obsessed with high-converting hooks, viral TikToks, and luxury brand design.',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com'
      },
      displayOrder: 3
    },
    {
      id: 'david-okonkwo',
      name: 'David Okonkwo',
      position: 'Principal SEO & Data Architect',
      bio: 'Technical SEO master specializing in programmatic content engines, algorithm recovery, and high-intent keyword takeovers.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com'
      },
      displayOrder: 4
    }
  ],
  testimonials: [
    {
      id: 'test-1',
      name: 'Marcus Vance',
      company: 'Nordic Peak Outdoor',
      position: 'Managing Director',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      review: 'Digital Growth Agency is the only agency we have worked with that actually treats our budget like their own. Within 90 days, our e-commerce ROAS shot up from 1.8x to 5.2x.',
      rating: 5,
      enabled: true,
      platform: 'Clutch 5.0'
    },
    {
      id: 'test-2',
      name: 'Amina Sheikh',
      company: 'LuxeLiving Interior',
      position: 'Chief Marketing Officer',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      review: 'Their creative team produces ads that look like high-budget cinema while converting like crazy. They completely transformed our lead pipeline across Pakistan and the GCC.',
      rating: 5,
      enabled: true,
      platform: 'Google Reviews'
    },
    {
      id: 'test-3',
      name: 'Oliver Wright',
      company: 'Syncro Cloud Software',
      position: 'Founder & CEO',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
      review: 'They took us from zero organic traffic to over 150,000 monthly qualified SaaS visitors. The inbound demos we get now pay for their retainer 10x over every single month.',
      rating: 5,
      enabled: true,
      platform: 'Trustpilot'
    },
    {
      id: 'test-4',
      name: 'Sophia Dupont',
      company: 'Atelier Belle Cosmetics',
      position: 'Head of Brand',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
      review: 'From TikTok viral campaigns to our Shopify speed optimization, everything they touched turned into sales. The reporting is crystal clear and super transparent.',
      rating: 5,
      enabled: true,
      platform: 'Clutch 5.0'
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'How quickly will I start seeing measurable results from your campaigns?',
      answer: 'For Paid Advertising (Meta & Google Ads), you will typically see initial traffic and conversions within 48 to 72 hours of campaign launch. For SEO and organic content, sustainable compound growth typically begins showing noticeable rank and traffic improvements between months 2 and 4.',
      category: 'General',
      displayOrder: 1,
      enabled: true
    },
    {
      id: 'faq-2',
      question: 'Do you require long-term restrictive contracts?',
      answer: 'No long-term locks required. Our standard packages run on a flexible month-to-month retainer. We believe in earning your business every 30 days based purely on measurable performance and ROI.',
      category: 'Pricing & Contracts',
      displayOrder: 2,
      enabled: true
    },
    {
      id: 'faq-3',
      question: 'How do you handle multi-currency payments for international clients?',
      answer: 'We cater seamlessly to local and global brands. We accept payments in Pakistani Rupee (PKR), US Dollars (USD), and British Pounds (GBP) via direct bank transfer, Stripe, credit cards, or international wire.',
      category: 'Pricing & Contracts',
      displayOrder: 3,
      enabled: true
    },
    {
      id: 'faq-4',
      question: 'Who owns the ad accounts, creative assets, and code you build?',
      answer: 'You own 100% of everything. All ad accounts, pixel data, custom code, graphic design files, and video assets remain your exclusive intellectual property forever.',
      category: 'Deliverables & Ownership',
      displayOrder: 4,
      enabled: true
    },
    {
      id: 'faq-5',
      question: 'How often do we get reports and communication from the team?',
      answer: 'You get 24/7 access to your live custom analytics dashboard, weekly summary updates on Slack or WhatsApp, and a dedicated monthly video strategy call to review numbers and plan next month’s growth goals.',
      category: 'Support & Reporting',
      displayOrder: 5,
      enabled: true
    },
    {
      id: 'faq-6',
      question: 'Can you work with our existing in-house marketing team?',
      answer: 'Absolutely. We frequently partner with in-house designers, developers, or founders, serving as specialized media buyers, SEO architects, or high-velocity creative engines.',
      category: 'General',
      displayOrder: 6,
      enabled: true
    }
  ],
  blog: [
    {
      id: 'blog-meta-vs-tiktok-2026',
      title: 'Meta Ads vs TikTok Ads in 2026: Where Should You Put Your Ad Spend?',
      slug: 'meta-vs-tiktok-ads-2026',
      excerpt: 'A deep comparative analysis of CPMs, purchase intent, creative fatigue, and ROAS across Meta and TikTok algorithms for modern e-commerce.',
      content: `The paid media landscape in 2026 has evolved beyond simple demographic targeting. With AI-driven discovery engines dominating user feeds, advertisers must understand the fundamental difference in buyer mindset between Meta and TikTok.

### 1. High Intent vs. High Discovery
Meta (Instagram & Facebook) remains the undisputed champion for direct-response conversions with high customer lifetime value (LTV). Users are conditioned to buy directly through Instagram Shop and frictionless checkout links.

TikTok, on the other hand, is the world's most aggressive discovery engine. If your product requires a "show, don't tell" demonstration or solves an acute visual pain point, TikTok Spark Ads can deliver customer acquisition costs up to 35% lower than Meta during initial testing.

### 2. The Creative Hook Framework
The secret to scaling either platform is creative velocity. In 2026, winning brands test at least 15 new video angles every week:
- **0.0s - 2.5s**: The Visual Pattern Interrupt (Hook)
- **2.5s - 7.0s**: Agitating the Pain Point
- **7.0s - 15.0s**: The "Aha!" Demonstration
- **15.0s - 20.0s**: Social Proof + 1-Click Offer

### Summary Recommendation
Allocate 65% of your paid budget to Meta for predictable cash-flow conversions, and 35% to TikTok for rapid audience discovery and viral breakout scale.`,
      coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1000&auto=format&fit=crop&q=80',
      category: 'Paid Advertising',
      author: 'Hamza Tariq',
      authorRole: 'Head of Performance Media',
      authorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      publishDate: '2026-08-20',
      isDraft: false,
      readTime: '6 min read',
      seoTitle: 'Meta Ads vs TikTok Ads 2026 Comparison | Digital Growth Agency',
      seoDescription: 'Discover whether Meta or TikTok ads deliver higher ROAS for your business in 2026 with real ad spend data.',
      tags: ['Paid Media', 'Meta Ads', 'TikTok Marketing', 'E-commerce']
    },
    {
      id: 'blog-ai-marketing-workflows',
      title: 'How High-Growth Agencies Use AI to 10x Content Velocity Without Sacrificing Quality',
      slug: 'ai-marketing-workflows-growth',
      excerpt: 'Learn the exact AI workflows, prompt chains, and automated quality-gates we use to produce 200+ bespoke marketing assets every month.',
      content: `Generative AI is not about replacing creative human genius—it is about removing the operational friction between ideation and distribution.

### The Problem With Generic AI Content
Most brands fail with AI because they use default prompts and publish robotic text that search engines and consumers immediately tune out. True authority requires proprietary brand knowledge injection.

### The 3-Tier AI Growth Stack
1. **Research & Semantic Clustering**: We utilize deep semantic scrapers to identify untapped search intent queries and competitor content gaps in real-time.
2. **First-Draft Generation With Brand Archetypes**: Custom LLM agents primed on your exact tone of voice guidelines generate structured drafts.
3. **Human Editorial Polish & Fact-Verification**: Every piece of copy is curated, fact-checked, and injected with verified case data before going live.

By combining AI speed with human craftsmanship, our clients out-publish competitors 5-to-1 while maintaining industry-leading engagement rates.`,
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1000&auto=format&fit=crop&q=80',
      category: 'AI & Automation',
      author: 'Sarah Jenkins',
      authorRole: 'Chief Growth Officer',
      authorPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      publishDate: '2026-08-14',
      isDraft: false,
      readTime: '5 min read',
      seoTitle: 'AI Marketing Workflows for Growth in 2026',
      seoDescription: 'How modern brands use AI systems to scale content, ad creatives, and lead generation.',
      tags: ['AI Marketing', 'Automation', 'Content Strategy']
    },
    {
      id: 'blog-b2b-seo-playbook',
      title: 'The Modern B2B SEO Playbook: From Zero to 100k Qualified Inbound Search Traffic',
      slug: 'modern-b2b-seo-playbook',
      excerpt: 'Why high-volume keyword chasing is dead, and how high-intent programmatic SEO captures enterprise software buyers ready to sign.',
      content: `If your SEO strategy in 2026 still revolves around vanity keyword volume, you are burning capital on visitors who will never convert into paying customers.

### The High-Intent Value Matrix
Instead of targeting generic keywords like "what is marketing software", modern B2B winners target high-intent buying queries:
- **Comparison Queries**: "Competitor A vs Competitor B for Enterprise"
- **Alternative Queries**: "Best alternatives to [Market Leader] with lower pricing"
- **Integration Queries**: "[Software] integration with Salesforce and HubSpot"

These pages may only get 200 searches per month, but the conversion rate to booked enterprise sales calls is over 8%.

### Core Web Vitals & Speed
Google algorithms now aggressively penalize slow, bloated websites. If your LCP (Largest Contentful Paint) is above 2.5s, you are automatically forfeiting top rankings. Clean modern code and server-side optimization are non-negotiable.`,
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
      category: 'SEO & Search',
      author: 'David Okonkwo',
      authorRole: 'Principal SEO Architect',
      authorPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      publishDate: '2026-07-28',
      isDraft: false,
      readTime: '7 min read',
      seoTitle: 'B2B SEO Playbook: Capturing Enterprise Buying Intent',
      seoDescription: 'A practical framework to rank #1 for high-value enterprise search terms.',
      tags: ['SEO', 'B2B Growth', 'Search Optimization']
    }
  ],
  leads: [
    {
      id: 'lead-1',
      name: 'Kamran Ali',
      email: 'kamran@novatech.pk',
      phone: '+92 321 8899001',
      company: 'NovaTech Solutions',
      service: 'Google Ads & Search PPC',
      budget: 'Rs. 200,000 - 500,000 / mo',
      currency: 'PKR',
      message: 'Looking to scale our B2B SaaS inquiries in Pakistan and UAE. We want to test Google Search ads and LinkedIn sponsored posts.',
      status: 'new',
      notes: 'Initial inquiry received via website hero form. Scheduled follow-up call on Zoom.',
      createdAt: '2026-08-30T14:22:00Z'
    },
    {
      id: 'lead-2',
      name: 'Claire Beauchamp',
      email: 'claire@lumierejewels.co.uk',
      phone: '+44 7700 900123',
      company: 'Lumière Handcrafted Fine Jewelry',
      service: 'E-commerce Solutions',
      budget: '£1,000 - £3,000 / mo',
      currency: 'GBP',
      message: 'Need a complete redesign of our Shopify store plus Meta & Pinterest ads management ahead of the holiday season.',
      status: 'contacted',
      notes: 'Sent proposal deck and pricing breakdown for the Growth Package.',
      createdAt: '2026-08-28T09:15:00Z'
    }
  ],
  media: [
    {
      id: 'med-1',
      filename: 'agency-hero-graphic.png',
      originalname: 'agency-hero-graphic.png',
      mimetype: 'image/png',
      size: 345000,
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
      uploadDate: '2026-08-01',
      type: 'image'
    },
    {
      id: 'med-2',
      filename: 'ecommerce-showcase.jpg',
      originalname: 'ecommerce-showcase.jpg',
      mimetype: 'image/jpeg',
      size: 520000,
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
      uploadDate: '2026-08-05',
      type: 'image'
    }
  ],
  clients: telcaClients,
  projects: telcaProjects,
  tasks: telcaTasks,
  campaigns: telcaCampaigns,
  researchProjects: telcaResearchProjects,
  integrations: telcaIntegrations,
  auditLogs: telcaAuditLogs,
  invoices: telcaInvoices,
  notifications: telcaNotifications
};
