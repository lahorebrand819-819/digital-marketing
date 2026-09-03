import {
  PricingPackage,
  FAQItem,
  ClientProfile,
  ProjectItem,
  TaskItem,
  CampaignItem,
  ResearchProject,
  IntegrationSource,
  AuditLog,
  FinanceInvoice,
  AdminNotification,
  LeadInquiry
} from '../src/types';

// Approximate conversion rates for currency switching: 1 USD = 280 PKR, 0.79 GBP
const toPKR = (usd: number) => usd * 280;
const toGBP = (usd: number) => Math.round(usd * 0.79);

export const telcaPricingPackages: PricingPackage[] = [
  // 1. META ADS ($179, $299, $449 / month)
  {
    id: 'meta-starter',
    serviceId: 'meta-ads',
    serviceName: 'Meta Ads',
    name: 'Starter',
    tag: 'For Small Businesses & Local Brands',
    description: 'Targeted Facebook & Instagram ad setup with custom audience research, conversion tracking, and bi-weekly campaign optimization.',
    priceUSD: 179,
    pricePKR: toPKR(179),
    priceGBP: toGBP(179),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: false,
    enabled: true,
    displayOrder: 1,
    features: [
      'Meta Pixel & CAPI Conversion Setup',
      'Target Audience & Lookalike Mapping',
      '2 Ad Sets & 6 Creative Variations',
      'A/B Copy & Headline Testing',
      'Bi-Weekly Budget & Bid Adjustments',
      'Bi-Weekly Performance Report'
    ],
    ctaText: 'Choose Starter'
  },
  {
    id: 'meta-medium',
    serviceId: 'meta-ads',
    serviceName: 'Meta Ads',
    name: 'Medium',
    tag: 'Most Popular for E-Commerce & Lead Gen',
    description: 'Full-funnel Meta advertising across Feed, Stories, and Reels with advanced retargeting and creative iteration.',
    priceUSD: 299,
    pricePKR: toPKR(299),
    priceGBP: toGBP(299),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: true,
    enabled: true,
    displayOrder: 2,
    features: [
      'Full Top-to-Bottom Conversion Funnel',
      'Dynamic Product Ads (Catalog Integration)',
      'Custom Creative Hook & Video Testing',
      'Weekly ROAS & CPA Scaling Audits',
      'Automated Exclusion & Retargeting Rules',
      'Weekly Strategy & Analytics Review'
    ],
    ctaText: 'Scale With Medium'
  },
  {
    id: 'meta-growth',
    serviceId: 'meta-ads',
    serviceName: 'Meta Ads',
    name: 'Growth',
    tag: 'Aggressive Multi-Campaign Scaling',
    description: 'Aggressive multi-campaign scaling for brands aiming to maximize daily return on ad spend with high-volume creative testing.',
    priceUSD: 449,
    pricePKR: toPKR(449),
    priceGBP: toGBP(449),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: false,
    enabled: true,
    displayOrder: 3,
    features: [
      'Unlimited Ad Sets & Scaling Budgets',
      'Advanced Advantage+ Shopping Campaigns',
      'Rapid-Fire Creative Refresh Cycles',
      'Omni-Angle Hook Iterations & Angles',
      'Dedicated Media Buyer on Slack / WhatsApp',
      'Real-Time Live Dashboard Access'
    ],
    ctaText: 'Maximize Growth'
  },

  // 2. GOOGLE ADS ($249, $349, $549 / month)
  {
    id: 'google-starter',
    serviceId: 'google-ads',
    serviceName: 'Google Ads',
    name: 'Starter',
    tag: 'Capture High-Intent Search Buyers',
    description: 'High-intent Google Search advertising targeting users actively looking for your exact services and products.',
    priceUSD: 249,
    pricePKR: toPKR(249),
    priceGBP: toGBP(249),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: false,
    enabled: true,
    displayOrder: 4,
    features: [
      'High-Intent Keyword Research & Selection',
      'Negative Keyword Shielding List',
      'Ad Extensions & Sitelinks Setup',
      'Google Tag Manager Conversion Tracking',
      'Bi-Weekly Search Term Optimization',
      'Monthly Search Performance Report'
    ],
    ctaText: 'Choose Starter'
  },
  {
    id: 'google-medium',
    serviceId: 'google-ads',
    serviceName: 'Google Ads',
    name: 'Medium',
    tag: 'Search + Performance Max Funnel',
    description: 'Combined Search and Google Performance Max campaigns covering YouTube, Gmail, Maps, and Display networks.',
    priceUSD: 349,
    pricePKR: toPKR(349),
    priceGBP: toGBP(349),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: true,
    enabled: true,
    displayOrder: 5,
    features: [
      'Performance Max (PMax) Architecture',
      'Search + Display Remarketing Setup',
      'Conversion Value / ROAS Bidding Strategy',
      'Ad Copy Testing & Responsive Ad Assets',
      'Weekly Search Query Harvesting',
      'Weekly Performance Review'
    ],
    ctaText: 'Dominate Google'
  },
  {
    id: 'google-growth',
    serviceId: 'google-ads',
    serviceName: 'Google Ads',
    name: 'Growth',
    tag: 'Full Omnichannel Search Domination',
    description: 'Comprehensive multi-tier search, Shopping, YouTube in-stream, and Display network takeover with competitive conquesting.',
    priceUSD: 549,
    pricePKR: toPKR(549),
    priceGBP: toGBP(549),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: false,
    enabled: true,
    displayOrder: 6,
    features: [
      'Multi-Tier Search & Shopping Campaigns',
      'Competitor Brand Keyword Conquesting',
      'YouTube Video Action & Discovery Ads',
      'Advanced Offline / CRM Conversion Sync',
      'Dedicated Google Partner Media Buyer',
      'Weekly Executive Strategy Sessions'
    ],
    ctaText: 'Launch Growth'
  },

  // 3. EMAIL MARKETING ($149, $199, $249 / month)
  {
    id: 'email-starter',
    serviceId: 'email-marketing',
    serviceName: 'Email Marketing',
    name: 'Starter',
    tag: 'Automated Retention Essentials',
    description: 'Essential automated flows to recover lost visitors, welcome new subscribers, and build dependable repeat sales.',
    priceUSD: 149,
    pricePKR: toPKR(149),
    priceGBP: toGBP(149),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: false,
    enabled: true,
    displayOrder: 7,
    features: [
      'Welcome Series Automated Flow',
      'Abandoned Cart Recovery Sequence',
      '2 Monthly Broadcast Campaigns',
      'Custom Responsive HTML Email Design',
      'List Hygiene & Bounce Management',
      'Monthly Deliverability & Open Audit'
    ],
    ctaText: 'Choose Starter'
  },
  {
    id: 'email-medium',
    serviceId: 'email-marketing',
    serviceName: 'Email Marketing',
    name: 'Medium',
    tag: 'Complete Revenue Lifecycle Engine',
    description: 'Full automated email lifecycle system with post-purchase sequences, customer win-backs, and weekly promotional newsletters.',
    priceUSD: 199,
    pricePKR: toPKR(199),
    priceGBP: toGBP(199),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: true,
    enabled: true,
    displayOrder: 8,
    features: [
      'Customer Win-back & Lapsed Sequences',
      'VIP Post-Purchase Upsell Flows',
      '4 Monthly High-Converting Broadcasts',
      'Dynamic Segmentation by Buyer Behavior',
      'A/B Subject Line & Preview Testing',
      'Klaviyo / Mailchimp / Brevo Setup'
    ],
    ctaText: 'Drive Repeat Sales'
  },
  {
    id: 'email-growth',
    serviceId: 'email-marketing',
    serviceName: 'Email Marketing',
    name: 'Growth',
    tag: 'Omnichannel Email + SMS Architecture',
    description: 'Advanced behavioral segmentation, VIP loyalty journeys, SMS integration, and revenue-maximizing cohort optimization.',
    priceUSD: 249,
    pricePKR: toPKR(249),
    priceGBP: toGBP(249),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: false,
    enabled: true,
    displayOrder: 9,
    features: [
      '8 Monthly Custom Designed Broadcasts',
      'Predictive Churn & Replenishment Flows',
      'SMS Automated Trigger Integration',
      'Deliverability Domain Warming (DKIM/DMARC)',
      'Dedicated Copywriter & Email Designer',
      'Bi-Weekly Revenue Cohort Reporting'
    ],
    ctaText: 'Maximize Retention'
  },

  // 4. AI CREATIVE & ADS ($149, $269, $349 / month)
  {
    id: 'ai-creative-starter',
    serviceId: 'ai-creative',
    serviceName: 'AI Creative & Ads',
    name: 'Starter',
    tag: 'Modern AI-Assisted Ad Assets',
    description: 'High-impact AI-enhanced image creatives and compelling ad copy variations tailored to break scroll fatigue.',
    priceUSD: 149,
    pricePKR: toPKR(149),
    priceGBP: toGBP(149),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: false,
    enabled: true,
    displayOrder: 10,
    features: [
      '8 AI-Rendered Static Ad Creatives/mo',
      '3 Compelling Hook Variations per Asset',
      'Visual Product Mockup Staging',
      'Square, Vertical & Story Formats',
      'Copy Iterations (Short & Long Form)',
      'Monthly Creative Performance Review'
    ],
    ctaText: 'Choose Starter'
  },
  {
    id: 'ai-creative-medium',
    serviceId: 'ai-creative',
    serviceName: 'AI Creative & Ads',
    name: 'Medium',
    tag: 'Viral Video Hooks & Motion Assets',
    description: 'Combination of AI motion graphics, talking-head avatar hooks, and dynamic multi-format ad creative packs.',
    priceUSD: 269,
    pricePKR: toPKR(269),
    priceGBP: toGBP(269),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: true,
    enabled: true,
    displayOrder: 11,
    features: [
      '16 High-Res AI Creative Assets/mo',
      '4 AI Motion & Video Hook Variations',
      'Trend-Jacking Meme & Organic Formats',
      'UGC Script Frameworks & Voiceovers',
      'Direct-Response CTA Testing',
      'Bi-Weekly Creative Refresh Pack'
    ],
    ctaText: 'Accelerate Creatives'
  },
  {
    id: 'ai-creative-growth',
    serviceId: 'ai-creative',
    serviceName: 'AI Creative & Ads',
    name: 'Growth',
    tag: 'Enterprise Creative Laboratory',
    description: 'High-volume creative production engine testing hundreds of visual hooks, angles, and sensory cues every month.',
    priceUSD: 349,
    pricePKR: toPKR(349),
    priceGBP: toGBP(349),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: false,
    enabled: true,
    displayOrder: 12,
    features: [
      '30+ Custom AI Ad Assets & Videos/mo',
      'Multi-Language Creative Localization',
      '3D Product Staging & Hyper-Realistic Models',
      'Custom Brand Typography & Style Training',
      'Rapid Turnaround Testing Sprints',
      'Full Commercial IP & Source Assets'
    ],
    ctaText: 'Dominate Feeds'
  },

  // 5. SOCIAL MEDIA MARKETING ($129, $189, $299 / month)
  {
    id: 'smm-starter',
    serviceId: 'social-media',
    serviceName: 'Social Media Marketing',
    name: 'Starter',
    tag: 'Consistent Brand Presence',
    description: 'Clean, professional social presence with curated graphics, strategic caption writing, and active hashtag research.',
    priceUSD: 129,
    pricePKR: toPKR(129),
    priceGBP: toGBP(129),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: false,
    enabled: true,
    displayOrder: 13,
    features: [
      '12 Branded Posts per Month',
      'Custom Graphic Design & Templates',
      'Engaging Captions & Strategic Hashtags',
      'Content Scheduling on 2 Channels',
      'Profile Bio & Link-in-Bio Optimization',
      'Monthly Audience Growth Report'
    ],
    ctaText: 'Choose Starter'
  },
  {
    id: 'smm-medium',
    serviceId: 'social-media',
    serviceName: 'Social Media Marketing',
    name: 'Medium',
    tag: 'Engaging Content & Reels Strategy',
    description: 'Dynamic storytelling with short-form vertical video reels, carousel breakdowns, and targeted community engagement.',
    priceUSD: 189,
    pricePKR: toPKR(189),
    priceGBP: toGBP(189),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: true,
    enabled: true,
    displayOrder: 14,
    features: [
      '20 Branded Posts + 6 Reels per Month',
      'Cross-Posting across 3 Platforms',
      'Story Posts & Interactive Polls',
      'Active Community DM & Comment Engagement',
      'Competitor Benchmarking & Trend Alerts',
      'Bi-Weekly Content Calendar Review'
    ],
    ctaText: 'Boost Social'
  },
  {
    id: 'smm-growth',
    serviceId: 'social-media',
    serviceName: 'Social Media Marketing',
    name: 'Growth',
    tag: 'Omnichannel Viral Growth Engine',
    description: 'Daily multi-platform content distribution, viral video hooks, influencer partnerships, and aggressive audience expansion.',
    priceUSD: 299,
    pricePKR: toPKR(299),
    priceGBP: toGBP(299),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: false,
    enabled: true,
    displayOrder: 15,
    features: [
      'Daily High-Res Posts & 12 Viral Reels/mo',
      'Full Coverage: IG, FB, TikTok & LinkedIn',
      'Influencer Collab Outreach & Sourcing',
      'Dedicated Social Media Manager',
      'Reputation Management & Crisis Response',
      'Weekly Growth & Engagement Sync'
    ],
    ctaText: 'Lead Your Industry'
  },

  // 6. AI AUTOMATION ($299, $399, $699 / project)
  {
    id: 'automation-starter',
    serviceId: 'ai-automation',
    serviceName: 'AI Automation',
    name: 'Starter',
    tag: 'Lead Capture & Notification Flow',
    description: 'Connect your website, ads, and lead forms directly to WhatsApp, email, and Google Sheets with instant auto-replies.',
    priceUSD: 299,
    pricePKR: toPKR(299),
    priceGBP: toGBP(299),
    billingType: 'project',
    billingPeriod: 'project',
    isPopular: false,
    enabled: true,
    displayOrder: 16,
    features: [
      'Instant Lead Alert Flow (WhatsApp/Email/Slack)',
      'Google Sheets / CRM Data Synchronization',
      'Smart Auto-Reply Email Sequence',
      'Make.com / Zapier / n8n Workflow Build',
      '30-Day Post-Launch Bug Warranty',
      'Video Walkthrough & Handover'
    ],
    ctaText: 'Automate Leads'
  },
  {
    id: 'automation-medium',
    serviceId: 'ai-automation',
    serviceName: 'AI Automation',
    name: 'Medium',
    tag: 'AI Qualification & Support Chatbot',
    description: 'Intelligent AI chatbot trained on your company data to qualify inbound leads 24/7 and book appointments automatically.',
    priceUSD: 399,
    pricePKR: toPKR(399),
    priceGBP: toGBP(399),
    billingType: 'project',
    billingPeriod: 'project',
    isPopular: true,
    enabled: true,
    displayOrder: 17,
    features: [
      'Custom Trained AI Support & Sales Agent',
      'Automated Calendly / Booking Integration',
      'Lead Scoring & Qualification Routing',
      'Multi-Step CRM Pipeline Automation',
      'Website & WhatsApp Integration',
      '60-Day Optimization & Maintenance'
    ],
    ctaText: 'Scale Operations'
  },
  {
    id: 'automation-growth',
    serviceId: 'ai-automation',
    serviceName: 'AI Automation',
    name: 'Growth',
    tag: 'End-to-End Business OS Automation',
    description: 'Bespoke multi-system AI automation: inventory alerts, proposal generation, automated onboarding, and financial reconciliation.',
    priceUSD: 699,
    pricePKR: toPKR(699),
    priceGBP: toGBP(699),
    billingType: 'project',
    billingPeriod: 'project',
    isPopular: false,
    enabled: true,
    displayOrder: 18,
    features: [
      'Complete Client Onboarding Automated Pipeline',
      'AI Proposal & Contract Generation Tool',
      'Custom Webhook & API Bridge Development',
      'Database Sync & Error Recovery Shield',
      'Staff Training & Documentation Manual',
      '90-Day VIP Priority Technical Support'
    ],
    ctaText: 'Transform Enterprise'
  },

  // 7. AI WEB DEVELOPMENT ($249, $399, $679 / project)
  {
    id: 'web-starter',
    serviceId: 'ai-web-dev',
    serviceName: 'AI Web Development',
    name: 'Starter',
    tag: 'High-Converting Landing Page',
    description: 'Clean, modern, responsive landing page engineered for fast loading speeds and direct lead conversions.',
    priceUSD: 249,
    pricePKR: toPKR(249),
    priceGBP: toGBP(249),
    billingType: 'project',
    billingPeriod: 'project',
    isPopular: false,
    enabled: true,
    displayOrder: 19,
    features: [
      'Bespoke Responsive Landing Page',
      'Mobile-First Layout & Fast Loading',
      'Direct Lead Inquiry / WhatsApp Integration',
      'Basic On-Page SEO & Meta Tags',
      'Domain & Hosting Setup Support',
      '14-Day Post-Launch Revisions'
    ],
    ctaText: 'Build Landing Page'
  },
  {
    id: 'web-medium',
    serviceId: 'ai-web-dev',
    serviceName: 'AI Web Development',
    name: 'Medium',
    tag: 'Full 5-Page Corporate Website',
    description: 'Complete corporate website with modern animations, services showcase, case study catalog, and CMS integration.',
    priceUSD: 399,
    pricePKR: toPKR(399),
    priceGBP: toGBP(399),
    billingType: 'project',
    billingPeriod: 'project',
    isPopular: true,
    enabled: true,
    displayOrder: 20,
    features: [
      'Up to 5 Custom Tailored Web Pages',
      'Modern Interactive UI & Motion Effects',
      'Content Management System (CMS)',
      'Google Analytics & Pixel Tracking Setup',
      '100/100 Core Web Vitals Optimization',
      '30-Day Support & Maintenance'
    ],
    ctaText: 'Build Full Website'
  },
  {
    id: 'web-growth',
    serviceId: 'ai-web-dev',
    serviceName: 'AI Web Development',
    name: 'Growth',
    tag: 'E-Commerce & Headless Web Application',
    description: 'High-performance e-commerce store or custom web platform with multi-currency checkout, dynamic filtering, and custom API integrations.',
    priceUSD: 679,
    pricePKR: toPKR(679),
    priceGBP: toGBP(679),
    billingType: 'project',
    billingPeriod: 'project',
    isPopular: false,
    enabled: true,
    displayOrder: 21,
    features: [
      'Full E-Commerce / Custom Web App',
      'Multi-Currency Payment Gateway Integration',
      'Advanced Product Catalog & Filtering',
      'AI Search & Personalized Recommendations',
      'Custom Admin Management Dashboard',
      '60-Day Technical Maintenance & Backups'
    ],
    ctaText: 'Build High-Scale Web'
  },

  // 8. CONTENT WRITING ($49, $79, $129 / project)
  {
    id: 'content-starter',
    serviceId: 'content-writing',
    serviceName: 'Content Writing',
    name: 'Starter',
    tag: 'SEO Blog Article Essentials',
    description: 'Well-researched, engaging 1,200-word SEO article optimized with targeted keywords to drive organic search traffic.',
    priceUSD: 49,
    pricePKR: toPKR(49),
    priceGBP: toGBP(49),
    billingType: 'project',
    billingPeriod: 'project',
    isPopular: false,
    enabled: true,
    displayOrder: 22,
    features: [
      '1 In-Depth SEO Article (up to 1,200 words)',
      'Primary & Secondary Keyword Integration',
      'Catchy Titles & Optimized Meta Description',
      'Internal & External Link Recommendations',
      'Grammar & Plagiarism Clean Guarantee',
      '2 Revisions Included'
    ],
    ctaText: 'Order Article'
  },
  {
    id: 'content-medium',
    serviceId: 'content-writing',
    serviceName: 'Content Writing',
    name: 'Medium',
    tag: 'Authority Content & Copy Pack',
    description: '3 comprehensive SEO blog posts or complete website copy overhaul for up to 4 core landing pages.',
    priceUSD: 79,
    pricePKR: toPKR(79),
    priceGBP: toGBP(79),
    billingType: 'project',
    billingPeriod: 'project',
    isPopular: true,
    enabled: true,
    displayOrder: 23,
    features: [
      '3 High-Intent Blog Posts OR 4 Page Web Copy',
      'Competitor Content Gap Research',
      'High-Converting Benefit-Driven Headlines',
      'Featured Snippet & FAQ Schema Optimization',
      'Social Media Teaser Snippets Included',
      'Unlimited Minor Polish Revisions'
    ],
    ctaText: 'Order Content Pack'
  },
  {
    id: 'content-growth',
    serviceId: 'content-writing',
    serviceName: 'Content Writing',
    name: 'Growth',
    tag: 'Lead Magnet & Full Sales Copy',
    description: 'High-converting sales page copy, persuasive email sequence, or comprehensive industry eBook lead magnet designed to generate qualified leads.',
    priceUSD: 129,
    pricePKR: toPKR(129),
    priceGBP: toGBP(129),
    billingType: 'project',
    billingPeriod: 'project',
    isPopular: false,
    enabled: true,
    displayOrder: 24,
    features: [
      'Full Long-Form Sales Letter OR 15-Page eBook',
      '5-Part Nurture Email Autoresponder Copy',
      'Customer Psychology & Objection Inversion',
      'Irresistible Offer Framing & Guarantees',
      'Direct-Response Conversion Specialist Written',
      'Dedicated Polish & Hook Iterations'
    ],
    ctaText: 'Elevate Brand Copy'
  },

  // 9. TIKTOK ADS ($129, $199, $249 / month)
  {
    id: 'tiktok-starter',
    serviceId: 'tiktok-ads',
    serviceName: 'TikTok Ads',
    name: 'Starter',
    tag: 'Fast Viral Audience Acquisition',
    description: 'TikTok Ads Manager account configuration, pixel setup, interest targeting, and campaign launch for young demographic acquisition.',
    priceUSD: 129,
    pricePKR: toPKR(129),
    priceGBP: toGBP(129),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: false,
    enabled: true,
    displayOrder: 25,
    features: [
      'TikTok Pixel & Events API Setup',
      'Target Audience & Hashtag Clustering',
      '2 Active Campaigns with 4 Creative Hooks',
      'Spark Ads Integration with Organic Videos',
      'Bi-Weekly Bid & Budget Optimization',
      'Monthly TikTok Ads Performance Report'
    ],
    ctaText: 'Choose Starter'
  },
  {
    id: 'tiktok-medium',
    serviceId: 'tiktok-ads',
    serviceName: 'TikTok Ads',
    name: 'Medium',
    tag: 'Creator Sourcing & Dynamic Scaling',
    description: 'UGC creative briefing, Spark Ads scaling, custom audience retargeting, and continuous creative testing on TikTok.',
    priceUSD: 199,
    pricePKR: toPKR(199),
    priceGBP: toGBP(199),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: true,
    enabled: true,
    displayOrder: 26,
    features: [
      'UGC Script Writing & Creator Guidelines',
      'Spark Ads Organic Amplification',
      'Retargeting & Lookalike Audience Engine',
      'Fast Sound & Trend Integration',
      'Weekly CPA / ROAS Scaling Audits',
      'Bi-Weekly Creative Strategy Calls'
    ],
    ctaText: 'Scale TikTok'
  },
  {
    id: 'tiktok-growth',
    serviceId: 'tiktok-ads',
    serviceName: 'TikTok Ads',
    name: 'Growth',
    tag: 'High-Velocity TikTok Scaling',
    description: 'High-budget TikTok scaling, rapid hook variations, influencer spark campaigns, and e-commerce shopping ad integration.',
    priceUSD: 249,
    pricePKR: toPKR(249),
    priceGBP: toGBP(249),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: false,
    enabled: true,
    displayOrder: 27,
    features: [
      'TikTok Shop & Catalog Ads Integration',
      'High-Volume Hook & Audio Testing',
      'Daily Bid Adjustments & Pacing Control',
      'Competitor TikTok Creative Surveillance',
      'Dedicated TikTok Specialist Support',
      'Real-Time Performance Dashboard'
    ],
    ctaText: 'Maximize TikTok'
  },

  // 10. LINKEDIN ADS ($199, $399, $599 / month)
  {
    id: 'linkedin-starter',
    serviceId: 'linkedin-ads',
    serviceName: 'LinkedIn Ads',
    name: 'Starter',
    tag: 'B2B Lead Generation Essentials',
    description: 'Precision B2B targeting by job title, company size, and industry with native LinkedIn Lead Gen Forms.',
    priceUSD: 199,
    pricePKR: toPKR(199),
    priceGBP: toGBP(199),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: false,
    enabled: true,
    displayOrder: 28,
    features: [
      'LinkedIn Insight Tag & Conversion Tracking',
      'Job Title, Seniority & Company Size Mapping',
      'Single Image & Document Carousel Ads',
      'Native Lead Gen Form Integration',
      'Bi-Weekly Audience Bid Management',
      'Monthly B2B Pipeline Review'
    ],
    ctaText: 'Choose Starter'
  },
  {
    id: 'linkedin-medium',
    serviceId: 'linkedin-ads',
    serviceName: 'LinkedIn Ads',
    name: 'Medium',
    tag: 'Account-Based Marketing (ABM)',
    description: 'Targeted Account-Based Marketing campaigns focusing on decision-makers at specific target enterprise accounts.',
    priceUSD: 399,
    pricePKR: toPKR(399),
    priceGBP: toGBP(399),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: true,
    enabled: true,
    displayOrder: 29,
    features: [
      'Matched Audience & Target Account (ABM) Upload',
      'Thought Leader Ad Format Amplification',
      'Message / InMail Sponsored Campaigns',
      'Website Retargeting & Engagement Audiences',
      'Weekly Cost-per-Qualified-Lead Optimization',
      'Bi-Weekly Executive Strategy Sync'
    ],
    ctaText: 'Accelerate B2B'
  },
  {
    id: 'linkedin-growth',
    serviceId: 'linkedin-ads',
    serviceName: 'LinkedIn Ads',
    name: 'Growth',
    tag: 'Enterprise ABM & C-Suite Takeover',
    description: 'Comprehensive high-stakes enterprise ABM campaigns targeting C-Suite executives with whitepapers, webinars, and personalized pitches.',
    priceUSD: 599,
    pricePKR: toPKR(599),
    priceGBP: toGBP(599),
    billingType: 'month',
    billingPeriod: 'monthly',
    isPopular: false,
    enabled: true,
    displayOrder: 30,
    features: [
      'C-Suite Enterprise Conquest Campaigns',
      'Webinar & Whitepaper Lead Funnel Setup',
      'Direct CRM Sync (HubSpot / Salesforce / Sheets)',
      'Multi-Format Thought Leadership Funnel',
      'Dedicated Senior B2B Strategist',
      'Weekly Deal-Flow & Pipeline Attribution'
    ],
    ctaText: 'Dominate B2B'
  }
];

// ALL 19 EXACT FAQs FROM TELCA MARKETING
export const telcaFaqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What services does your agency provide?',
    answer: 'We provide digital marketing, paid advertising, social media marketing, AI solutions, web development, creative design, content writing and more.',
    category: 'Services',
    displayOrder: 1,
    enabled: true
  },
  {
    id: 'faq-2',
    question: 'Do you work with businesses outside your country?',
    answer: 'Yes. We work with businesses worldwide and tailor our strategies according to each market and target audience.',
    category: 'General',
    displayOrder: 2,
    enabled: true
  },
  {
    id: 'faq-3',
    question: 'Do you work with all types of businesses?',
    answer: 'Yes. We work across different industries. We first understand your business, goals and audience before recommending the right solution.',
    category: 'General',
    displayOrder: 3,
    enabled: true
  },
  {
    id: 'faq-4',
    question: 'How do you start working with a new client?',
    answer: 'We first understand your business, current challenges, goals and target audience. Then we recommend a strategy based on your specific needs.',
    category: 'Process',
    displayOrder: 4,
    enabled: true
  },
  {
    id: 'faq-5',
    question: 'Do you guarantee results?',
    answer: 'No reliable agency can guarantee specific results. We focus on research, strategy, testing, optimization and continuous improvement to achieve the best possible outcome.',
    category: 'Strategy & Results',
    displayOrder: 5,
    enabled: true
  },
  {
    id: 'faq-6',
    question: 'Is advertising budget included in your pricing?',
    answer: 'No. Our service fee is separate from the advertising budget paid to platforms such as Meta, Google, TikTok or LinkedIn.',
    category: 'Pricing & Contracts',
    displayOrder: 6,
    enabled: true
  },
  {
    id: 'faq-7',
    question: 'Can I choose a custom package?',
    answer: "Yes. If our standard packages don't fit your needs, we can create a customized solution based on your business requirements.",
    category: 'Pricing & Contracts',
    displayOrder: 7,
    enabled: true
  },
  {
    id: 'faq-8',
    question: 'How do you know which advertising platform is right for my business?',
    answer: 'We look at your business, target audience, goals, market and customer behavior to determine which platforms are most suitable.',
    category: 'Strategy & Results',
    displayOrder: 8,
    enabled: true
  },
  {
    id: 'faq-9',
    question: 'Do you only run ads, or do you help with the overall strategy?',
    answer: 'We go beyond running ads. We study your business, audience, competitors and customer journey to identify opportunities and create a more effective strategy.',
    category: 'Strategy & Results',
    displayOrder: 9,
    enabled: true
  },
  {
    id: 'faq-10',
    question: 'Can you help increase my sales or revenue?',
    answer: 'Our strategies are designed to attract the right audience, improve the customer journey, increase conversions and create opportunities for business growth.',
    category: 'Strategy & Results',
    displayOrder: 10,
    enabled: true
  },
  {
    id: 'faq-11',
    question: 'Do you provide AI automation for existing businesses?',
    answer: 'Yes. We can identify repetitive or time-consuming processes and recommend AI automation solutions that improve efficiency and save valuable time.',
    category: 'Services',
    displayOrder: 11,
    enabled: true
  },
  {
    id: 'faq-12',
    question: 'Can you build a website for my business?',
    answer: 'Yes. We create modern, professional websites designed around your business goals, audience and customer experience.',
    category: 'Services',
    displayOrder: 12,
    enabled: true
  },
  {
    id: 'faq-13',
    question: 'Do you provide ongoing support?',
    answer: 'Yes. We can provide ongoing support and optimization depending on the service and package you choose.',
    category: 'Process',
    displayOrder: 13,
    enabled: true
  },
  {
    id: 'faq-14',
    question: 'How long does it take to see results?',
    answer: 'It depends on the service, industry, market and starting point. Some improvements can happen quickly, while sustainable results usually require consistent optimization over time.',
    category: 'Strategy & Results',
    displayOrder: 14,
    enabled: true
  },
  {
    id: 'faq-15',
    question: 'Do I need technical knowledge to work with you?',
    answer: 'Not at all. We handle the technical and strategic side and keep you informed in simple, clear terms.',
    category: 'Process',
    displayOrder: 15,
    enabled: true
  },
  {
    id: 'faq-16',
    question: 'What makes your agency different?',
    answer: "We don't believe in one-size-fits-all solutions. We understand your business first, identify the real challenges and build a strategy around your specific goals.",
    category: 'General',
    displayOrder: 16,
    enabled: true
  },
  {
    id: 'faq-17',
    question: 'Can you work with a small or new business?',
    answer: 'Absolutely. Our solutions can be tailored to businesses at different stages, from new startups to established companies.',
    category: 'General',
    displayOrder: 17,
    enabled: true
  },
  {
    id: 'faq-18',
    question: 'How can I get started?',
    answer: "Simply contact us and tell us about your business and goals. We'll help you identify the right next step.",
    category: 'Process',
    displayOrder: 18,
    enabled: true
  },
  {
    id: 'faq-19',
    question: 'How long does it take to see results?',
    answer: 'Some early results may appear within weeks, while consistent growth takes time and depends on your goals, market, budget and strategy.',
    category: 'Strategy & Results',
    displayOrder: 19,
    enabled: true
  }
];

// CLIENT PROFILES WITH HEALTH STATUS
export const telcaClients: ClientProfile[] = [
  {
    id: 'cli_1',
    businessName: 'Luxe Aura Fashion',
    contactPerson: 'Sophia Reynolds',
    email: 'sophia@luxeaura.com',
    phone: '+1 (415) 890-1234',
    website: 'https://luxeaura.com',
    country: 'United States',
    industry: 'Fashion & Lifestyle',
    services: ['Meta Ads', 'Email Marketing', 'AI Creative & Ads'],
    package: 'Growth ($449/mo)',
    startDate: '2025-10-15',
    renewalDate: '2026-10-15',
    monthlyValueUSD: 897,
    paymentStatus: 'Paid',
    assignedTeamMember: 'Hamza Tariq (Senior Media Buyer)',
    health: 'Healthy',
    healthReason: 'Consistent 4.2x ROAS, low CPA, active weekly communication.',
    projectsCount: 2,
    activeCampaignsCount: 3,
    notes: 'Premium sustainable apparel brand scaling in North America.'
  },
  {
    id: 'cli_2',
    businessName: 'NexaHealth Diagnostics',
    contactPerson: 'Dr. Zeeshan Malik',
    email: 'z.malik@nexahealth.co',
    phone: '+92 301 8847291',
    website: 'https://nexahealth.co',
    country: 'Pakistan',
    industry: 'Healthcare & Clinics',
    services: ['Google Ads', 'AI Automation', 'SEO'],
    package: 'Medium ($349/mo)',
    startDate: '2026-01-10',
    renewalDate: '2026-07-10',
    monthlyValueUSD: 748,
    paymentStatus: 'Paid',
    assignedTeamMember: 'Ayesha Khan (Health Strategist)',
    health: 'Healthy',
    healthReason: 'Google Ads delivering 120+ monthly qualified doctor appointments.',
    projectsCount: 1,
    activeCampaignsCount: 2,
    notes: 'Private medical diagnostic network across 3 major metropolitan hubs.'
  },
  {
    id: 'cli_3',
    businessName: 'Apex Prime Realty',
    contactPerson: 'Marcus Vance',
    email: 'marcus@apexprimerealty.co.uk',
    phone: '+44 20 7946 0912',
    website: 'https://apexprimerealty.co.uk',
    country: 'United Kingdom',
    industry: 'Real Estate',
    services: ['Meta Ads', 'LinkedIn Ads', 'AI Web Development'],
    package: 'Medium ($399/mo)',
    startDate: '2025-11-01',
    renewalDate: '2026-11-01',
    monthlyValueUSD: 1097,
    paymentStatus: 'Active Retainer',
    assignedTeamMember: 'Bilal Ahmed (Real Estate Lead Gen)',
    health: 'Needs Attention',
    healthReason: 'CPL spiked 18% last week due to new London zoning ad competition. Creative refresh scheduled.',
    projectsCount: 1,
    activeCampaignsCount: 2,
    notes: 'Luxury high-end residential listings in Central London and Manchester.'
  },
  {
    id: 'cli_4',
    businessName: 'CloudScale SaaS Engine',
    contactPerson: 'Elena Rostova',
    email: 'elena@cloudscale.io',
    phone: '+1 (206) 555-0199',
    website: 'https://cloudscale.io',
    country: 'United States',
    industry: 'Technology & SaaS',
    services: ['LinkedIn Ads', 'Google Ads', 'Content Writing'],
    package: 'Growth ($599/mo)',
    startDate: '2026-02-01',
    renewalDate: '2026-08-01',
    monthlyValueUSD: 1277,
    paymentStatus: 'Pending',
    assignedTeamMember: 'Danial Sheikh (B2B Lead)',
    health: 'At Risk',
    healthReason: 'Overdue invoice for 9 days. Need confirmation on pending payment and scheduled review.',
    projectsCount: 2,
    activeCampaignsCount: 1,
    notes: 'Cloud cost optimization SaaS for enterprise DevOps teams.'
  },
  {
    id: 'cli_5',
    businessName: 'Artisan Roast & Bakery',
    contactPerson: 'Tariq Mehmood',
    email: 'contact@artisanroast.pk',
    phone: '+92 321 4455667',
    website: 'https://artisanroast.pk',
    country: 'Pakistan',
    industry: 'Restaurants, Cafés & Bakeries',
    services: ['Social Media Marketing', 'TikTok Ads'],
    package: 'Starter ($129/mo)',
    startDate: '2026-03-01',
    renewalDate: '2026-09-01',
    monthlyValueUSD: 258,
    paymentStatus: 'Paid',
    assignedTeamMember: 'Zainab Noor (Content Creator)',
    health: 'Healthy',
    healthReason: 'Viral TikTok videos generated 340k organic views and 25% foot traffic increase.',
    projectsCount: 1,
    activeCampaignsCount: 1,
    notes: 'Specialty coffee roastery and artisan sourdough bakery with 2 branches.'
  }
];

// PROJECTS
export const telcaProjects: ProjectItem[] = [
  {
    id: 'proj_1',
    projectName: 'Q3 Omni-Channel Scaling Sprint',
    client: 'Luxe Aura Fashion',
    clientId: 'cli_1',
    service: 'Meta Ads & Email',
    package: 'Growth',
    startDate: '2026-07-01',
    deadline: '2026-09-30',
    budgetUSD: 4500,
    assignedTeam: ['Hamza Tariq', 'Zainab Noor'],
    status: 'In Progress',
    priority: 'High',
    description: 'Scaling fall winter collection across Meta Advantage+ and Klaviyo automated segmentation.',
    deliverables: ['12 Creative Ad Packs', '3 Abandoned Cart Flows', 'Advantage+ Shopping Setup', 'Weekly ROAS Audits'],
    progressPercent: 75
  },
  {
    id: 'proj_2',
    projectName: 'Clinic Appointment AI Chatbot & Landing Page',
    client: 'NexaHealth Diagnostics',
    clientId: 'cli_2',
    service: 'AI Web Development & Automation',
    package: 'Medium',
    startDate: '2026-08-10',
    deadline: '2026-09-15',
    budgetUSD: 2200,
    assignedTeam: ['Ayesha Khan', 'Bilal Ahmed'],
    status: 'Review',
    priority: 'Medium',
    description: 'Bespoke diagnostic test booking system with WhatsApp auto-confirmation and instant PDF receipts.',
    deliverables: ['Landing Page', 'AI Appointment Bot', 'Google Sheets Integration', 'WhatsApp Notification Flow'],
    progressPercent: 90
  },
  {
    id: 'proj_3',
    projectName: 'High-Net-Worth Buyer ABM Campaign',
    client: 'Apex Prime Realty',
    clientId: 'cli_3',
    service: 'LinkedIn Ads & Meta Ads',
    package: 'Medium',
    startDate: '2026-08-01',
    deadline: '2026-10-01',
    budgetUSD: 3600,
    assignedTeam: ['Bilal Ahmed'],
    status: 'In Progress',
    priority: 'Critical',
    description: 'Precision targeting of investors and family offices for off-market central London penthouse developments.',
    deliverables: ['Executive Whitepaper', 'LinkedIn InMail Copy', 'VIP Lead Gen Form', 'Video Carousel Ads'],
    progressPercent: 55
  },
  {
    id: 'proj_4',
    projectName: 'B2B Demo Request Funnel Overhaul',
    client: 'CloudScale SaaS Engine',
    clientId: 'cli_4',
    service: 'Google Ads & Content',
    package: 'Growth',
    startDate: '2026-08-15',
    deadline: '2026-09-20',
    budgetUSD: 1800,
    assignedTeam: ['Danial Sheikh'],
    status: 'Waiting for Client',
    priority: 'High',
    description: 'Waiting for client to approve updated landing page copy and authorize Google Ads budget increase.',
    deliverables: ['Keyword Intent Matrix', '3 Comparison Blog Posts', 'Search Campaign Structure'],
    progressPercent: 40
  },
  {
    id: 'proj_5',
    projectName: 'Local Viral TikTok Bakery Launch',
    client: 'Artisan Roast & Bakery',
    clientId: 'cli_5',
    service: 'TikTok Ads & Social Media',
    package: 'Starter',
    startDate: '2026-08-01',
    deadline: '2026-08-31',
    budgetUSD: 850,
    assignedTeam: ['Zainab Noor'],
    status: 'Completed',
    priority: 'Medium',
    description: 'Launch of seasonal pastry line with behind-the-scenes bakery reels and TikTok geo-targeted ads.',
    deliverables: ['8 Viral Reels', 'Local Radius Ad Setup', 'Influencer Tasting Box Outreach'],
    progressPercent: 100
  }
];

// TASKS
export const telcaTasks: TaskItem[] = [
  {
    id: 'task_1',
    task: 'Deliver 6 new UGC hook video ads for Fall campaign',
    project: 'Q3 Omni-Channel Scaling Sprint',
    projectId: 'proj_1',
    client: 'Luxe Aura Fashion',
    assignedTo: 'Zainab Noor',
    priority: 'High',
    dueDate: '2026-09-05',
    status: 'In Progress',
    notes: 'Focus on cold weather outdoor aesthetic and unboxing angles.'
  },
  {
    id: 'task_2',
    task: 'Resolve London zoning CPC spike & restructure ad groups',
    project: 'High-Net-Worth Buyer ABM Campaign',
    projectId: 'proj_3',
    client: 'Apex Prime Realty',
    assignedTo: 'Bilal Ahmed',
    priority: 'Urgent',
    dueDate: '2026-09-02',
    status: 'Todo',
    isOverdue: true,
    notes: 'Exceeding target CPL of £45. Negative keyword scrub needed.'
  },
  {
    id: 'task_3',
    task: 'Connect WhatsApp Business API webhook to Nexa appointment database',
    project: 'Clinic Appointment AI Chatbot',
    projectId: 'proj_2',
    client: 'NexaHealth Diagnostics',
    assignedTo: 'Bilal Ahmed',
    priority: 'Medium',
    dueDate: '2026-09-07',
    status: 'Review',
    notes: 'Testing end-to-end webhook delivery in staging.'
  },
  {
    id: 'task_4',
    task: 'Follow up with Elena regarding pending August invoice',
    project: 'B2B Demo Request Funnel Overhaul',
    projectId: 'proj_4',
    client: 'CloudScale SaaS Engine',
    assignedTo: 'Danial Sheikh',
    priority: 'High',
    dueDate: '2026-09-03',
    status: 'Todo',
    isOverdue: true,
    notes: 'Send friendly payment link and account statement.'
  },
  {
    id: 'task_5',
    task: 'Finalize monthly client ROI report & executive summary',
    project: 'Q3 Omni-Channel Scaling Sprint',
    projectId: 'proj_1',
    client: 'Luxe Aura Fashion',
    assignedTo: 'Hamza Tariq',
    priority: 'Medium',
    dueDate: '2026-09-08',
    status: 'Todo',
    notes: 'Include Blended ROAS vs Meta reported figures.'
  }
];

// REAL CAMPAIGNS ACROSS PLATFORMS
export const telcaCampaigns: CampaignItem[] = [
  {
    id: 'camp_1',
    name: 'Advantage+ Fall Apparel Scaling',
    platform: 'Meta Ads',
    client: 'Luxe Aura Fashion',
    budgetUSD: 3200,
    spendUSD: 2840,
    status: 'Active',
    impressions: 486200,
    reach: 294000,
    clicks: 9724,
    ctr: 2.0,
    cpc: 0.29,
    cpm: 5.84,
    conversions: 412,
    conversionRate: 4.24,
    cpl: 0,
    cpa: 6.89,
    revenueUSD: 12450,
    roas: 4.38,
    traffic: 9400,
    sessions: 11200,
    engagementRate: 6.8,
    leads: 0,
    purchases: 412,
    targetRoas: 3.5,
    targetCpa: 8.5
  },
  {
    id: 'camp_2',
    name: 'Diagnostic Blood Test & Health Check Search',
    platform: 'Google Ads',
    client: 'NexaHealth Diagnostics',
    budgetUSD: 1500,
    spendUSD: 1420,
    status: 'Active',
    impressions: 89400,
    reach: 64200,
    clicks: 4120,
    ctr: 4.61,
    cpc: 0.34,
    cpm: 15.88,
    conversions: 248,
    conversionRate: 6.02,
    cpl: 5.73,
    cpa: 5.73,
    revenueUSD: 6940,
    roas: 4.89,
    traffic: 4050,
    sessions: 4300,
    engagementRate: 9.2,
    leads: 248,
    purchases: 180,
    targetRoas: 4.0,
    targetCpa: 6.5
  },
  {
    id: 'camp_3',
    name: 'London Luxury Penthouses - High Net Worth',
    platform: 'LinkedIn Ads',
    client: 'Apex Prime Realty',
    budgetUSD: 2000,
    spendUSD: 1890,
    status: 'Optimizing',
    impressions: 42100,
    reach: 28900,
    clicks: 684,
    ctr: 1.62,
    cpc: 2.76,
    cpm: 44.89,
    conversions: 32,
    conversionRate: 4.68,
    cpl: 59.06,
    cpa: 59.06,
    revenueUSD: 8500,
    roas: 4.5,
    traffic: 650,
    sessions: 720,
    engagementRate: 5.4,
    leads: 32,
    purchases: 4,
    targetRoas: 4.0,
    targetCpa: 45.0,
    alert: 'CPL currently $59.06 vs target $45.00 due to audience saturation.',
    isUnderperforming: true
  },
  {
    id: 'camp_4',
    name: 'DevOps Cloud Spend Audit InMail & Search',
    platform: 'Google Ads',
    client: 'CloudScale SaaS Engine',
    budgetUSD: 2400,
    spendUSD: 1950,
    status: 'Paused',
    impressions: 54200,
    reach: 38400,
    clicks: 1420,
    ctr: 2.62,
    cpc: 1.37,
    cpm: 35.98,
    conversions: 28,
    conversionRate: 1.97,
    cpl: 69.64,
    cpa: 69.64,
    revenueUSD: 3600,
    roas: 1.85,
    traffic: 1380,
    sessions: 1540,
    engagementRate: 3.2,
    leads: 28,
    purchases: 6,
    targetRoas: 3.0,
    targetCpa: 40.0,
    alert: 'Paused pending client approval and invoice settlement.',
    isUnderperforming: true
  },
  {
    id: 'camp_5',
    name: 'Viral Croissant & Iced Matcha Geo Spark',
    platform: 'TikTok Ads',
    client: 'Artisan Roast & Bakery',
    budgetUSD: 600,
    spendUSD: 580,
    status: 'Active',
    impressions: 215400,
    reach: 162000,
    clicks: 7420,
    ctr: 3.44,
    cpc: 0.08,
    cpm: 2.69,
    conversions: 620,
    conversionRate: 8.36,
    cpl: 0.94,
    cpa: 0.94,
    revenueUSD: 3420,
    roas: 5.9,
    traffic: 7100,
    sessions: 7800,
    engagementRate: 12.4,
    leads: 0,
    purchases: 620,
    targetRoas: 4.5,
    targetCpa: 1.5
  }
];

// RESEARCH CENTER PROJECTS
export const telcaResearchProjects: ResearchProject[] = [
  {
    id: 'res_1',
    researchName: 'North American Sustainable Athleisure Market & Competitors',
    client: 'Luxe Aura Fashion',
    researchType: 'Competitor Research',
    industry: 'Fashion & Lifestyle',
    country: 'United States & Canada',
    targetAudience: 'Affluent urban professionals aged 24-42 interested in fitness, ethical fashion, and premium comfort.',
    competitors: ['Vuori Clothing', 'Alo Yoga', 'Lululemon Athletica', 'Gymshark'],
    date: '2026-08-18',
    findings: 'Competitors are heavily investing in TikTok Spark Ads featuring real athletes rather than glossy studio photos. Discounting is minimal (max 15% first order); value proposition leans on longevity and recycled fiber technology.',
    opportunities: 'Untapped demand for corporate-friendly commuter athleisure with subtle branding and water-resistant finishes.',
    risks: 'Rising CPMs on Meta Advantage+ during Q4 holiday rush requiring early list-building through VIP early access.',
    recommendations: 'Deploy 5 high-hook UGC creator tests focused on office-to-gym transitions; launch automated VIP SMS waitlist.',
    sources: [
      'Meta Ad Library Public Data 2026',
      'SimilarWeb Traffic Report (July 2026)',
      'Semrush Organic Keyword Overlap Analysis'
    ],
    attachments: [],
    status: 'Completed',
    createdBy: 'Hamza Tariq (Senior Strategist)',
    dataClassification: {
      verifiedData: [
        'Vuori estimated monthly Meta ad spend: $250k-$380k (Source: Meta Ad Library frequency)',
        'Top organic non-brand traffic driver: "odor resistant workout hoodie" (8,400 monthly volume)',
        'Average competitor cart checkout conversion rate: 2.9% (Source: TripleWhale Index)'
      ],
      estimatedData: [
        'Competitor customer acquisition cost estimated at $42-$54 per new customer',
        'Projected market growth rate: 8.4% CAGR through 2028'
      ],
      aiInsights: [
        'Audience engagement drops 44% on static product shots but spikes on real-life rain / sweat durability demonstrations.',
        'High purchase correlation among customers who view 2 or more reviews before adding to cart.'
      ],
      recommendationsList: [
        'Shift 35% of creative budget into video stress-test hooks.',
        'Implement sticky customer reviews directly on mobile checkout preview.'
      ]
    }
  },
  {
    id: 'res_2',
    researchName: 'Central London Prime Residential SEO & Search Intent Audit',
    client: 'Apex Prime Realty',
    researchType: 'SEO / Keyword Research',
    industry: 'Real Estate',
    country: 'United Kingdom',
    targetAudience: 'International investors, expatriates, and high-net-worth buyers looking for luxury apartments in Mayfair and Kensington.',
    competitors: ['Savills London', 'Knight Frank', 'Chestertons'],
    date: '2026-08-22',
    findings: 'Major portals dominate generic terms like "London flats", but hyper-local long-tail terms ("off market penthouse Mayfair", "Kensington garden square apartments") have high commercial intent with weak technical competition.',
    opportunities: 'Create curated neighborhood investment guide pages targeting international buyers with tax and yields breakdowns.',
    risks: 'Competitors bid aggressively on high-intent search keywords up to £8.50 per click.',
    recommendations: 'Publish 4 deep-dive district investment dossiers with programmatic local schema markup and virtual video tours.',
    sources: [
      'Google Search Console Search Insights',
      'HM Land Registry Public Price Paid Dataset',
      'Ahrefs SERP Keyword Difficulty Explorer'
    ],
    attachments: [],
    status: 'In Progress',
    createdBy: 'Bilal Ahmed',
    dataClassification: {
      verifiedData: [
        'Search term "Mayfair penthouse for sale" carries 1,900 monthly searches with £6.20 average CPC',
        'Apex Prime currently ranks #14 on Google for "luxury real estate agent Central London"'
      ],
      estimatedData: [
        'Organic traffic potential if ranked Top 3: 4,500 monthly qualified visits',
        'Estimated lead-to-viewing conversion rate: 12%'
      ],
      aiInsights: [
        'Users searching for luxury London real estate on mobile drop off if page load speed exceeds 2.8 seconds.',
        'High conversion rates on pages featuring floor plans with downloadable PDF brochures.'
      ],
      recommendationsList: [
        'Compress architectural gallery photos to WebP format to drop mobile page load to under 1.4s.',
        'Gate high-resolution floor plans behind a verified email / phone number lead modal.'
      ]
    }
  },
  {
    id: 'res_3',
    researchName: 'Full Technical SEO & CRO Audit for CloudScale.io',
    client: 'CloudScale SaaS Engine',
    researchType: 'Website Audit',
    industry: 'Technology & SaaS',
    country: 'United States',
    targetAudience: 'DevOps Leaders, VP Engineering, CTOs',
    competitors: ['Cast.ai', 'Vantage.sh', 'Kubecost'],
    date: '2026-08-25',
    findings: 'Website experiences severe Cumulative Layout Shift (CLS: 0.38) due to unconstrained pricing table widgets. Mobile navigation breaks on iOS Safari. Primary CTA button says "Submit Query" instead of value-driven action.',
    opportunities: 'Switch CTA to "Calculate My Cloud Savings (Free 2-Min Audit)" to multiply lead capture rate by an estimated 2.4x.',
    risks: 'Current high bounce rate (68%) negatively impacts Google Ads Quality Score, inflating CPCs by 35%.',
    recommendations: 'Fix Core Web Vitals, implement dynamic pricing comparison calculator, and add social proof customer logos above the fold.',
    sources: [
      'Google Lighthouse Audit (Score: 54/100 Mobile)',
      'PageSpeed Insights Real User Experience (CrUX)',
      'Hotjar Heatmap Recording Data'
    ],
    attachments: [],
    status: 'Completed',
    createdBy: 'Danial Sheikh',
    dataClassification: {
      verifiedData: [
        'Mobile PageSpeed score: 54/100 (Core Web Vitals failing CLS and LCP)',
        'Desktop Bounce Rate: 42%, Mobile Bounce Rate: 68%',
        'Conversion rate on "Schedule Demo" form: 1.2%'
      ],
      estimatedData: [
        'Estimated potential lift from simplified 2-step form: +40% to +65% demo requests'
      ],
      aiInsights: [
        'Engineers reject sales jargon; technical credibility increases when code snippets or AWS architecture diagrams are displayed.'
      ],
      recommendationsList: [
        'Replace "Submit Query" with "Get Free Cloud Cost Audit".',
        'Add live architecture diagram demonstrating read-only IAM role security.'
      ]
    },
    auditDetails: {
      technicalSeoScore: 68,
      pageStructureScore: 72,
      mobileScore: 54,
      performanceScore: 58,
      criticalIssues: [
        'Cumulative Layout Shift (CLS 0.38) fails Google Core Web Vitals',
        'Missing OpenGraph image tags on 4 product pages',
        'Uncached font assets causing text flicker on initial load'
      ],
      highPriority: [
        'Primary hero CTA button below mobile screen fold',
        'Missing Alt text on 14 technical diagram illustrations',
        'Broken anchor links on FAQ accordion'
      ],
      mediumPriority: [
        'No breadcrumb schema markup implemented on blog articles',
        'H1 and H2 hierarchy skipped on pricing page'
      ],
      quickWins: [
        'Enable Brotli compression on cloud server for instant 25% payload reduction',
        'Add customer company logos directly under hero headline',
        'Change submit button color to high-contrast emerald'
      ]
    }
  }
];

// INTEGRATIONS
export const telcaIntegrations: IntegrationSource[] = [
  {
    id: 'int_1',
    name: 'Google Analytics 4',
    platform: 'Google Analytics',
    status: 'connected',
    lastSync: '2026-09-03 10:45 AM',
    accountName: 'Telca Master GA4 Property (G-772849102)',
    autoSync: true
  },
  {
    id: 'int_2',
    name: 'Meta Ads Manager & CAPI',
    platform: 'Meta Ads',
    status: 'connected',
    lastSync: '2026-09-03 11:02 AM',
    accountName: 'Telca Agency BM (act_9918237190)',
    autoSync: true
  },
  {
    id: 'int_3',
    name: 'Google Ads API',
    platform: 'Google Ads',
    status: 'connected',
    lastSync: '2026-09-03 11:15 AM',
    accountName: 'Telca MCC Ad Manager (883-910-2341)',
    autoSync: true
  },
  {
    id: 'int_4',
    name: 'TikTok Ads Manager',
    platform: 'TikTok Ads',
    status: 'connected',
    lastSync: '2026-09-03 09:30 AM',
    accountName: 'Telca TikTok Partner Center',
    autoSync: true
  },
  {
    id: 'int_5',
    name: 'LinkedIn Campaign Manager',
    platform: 'LinkedIn Ads',
    status: 'connected',
    lastSync: '2026-09-03 10:00 AM',
    accountName: 'Telca B2B Agency Partner ID: 5049182',
    autoSync: true
  },
  {
    id: 'int_6',
    name: 'Google Search Console',
    platform: 'Google Search Console',
    status: 'connected',
    lastSync: '2026-09-03 08:00 AM',
    accountName: 'telcamarketing.com Verified Domain',
    autoSync: true
  },
  {
    id: 'int_7',
    name: 'Shopify Partners API',
    platform: 'Shopify',
    status: 'connected',
    lastSync: '2026-09-03 10:20 AM',
    accountName: 'Shopify App Bridge & Webhooks',
    autoSync: true
  },
  {
    id: 'int_8',
    name: 'Klaviyo & Email Marketing',
    platform: 'Email platforms',
    status: 'connected',
    lastSync: '2026-09-03 11:30 AM',
    accountName: 'Klaviyo Agency Master Account',
    autoSync: true
  },
  {
    id: 'int_9',
    name: 'Custom Webhook API / CRM Bridge',
    platform: 'CRM/API/Webhooks',
    status: 'connected',
    lastSync: '2026-09-03 11:42 AM',
    accountName: 'Zapier / n8n Production Webhook',
    autoSync: true,
    webhookUrl: 'https://api.telcamarketing.com/v1/webhooks/incoming-leads'
  }
];

// AUDIT LOGS
export const telcaAuditLogs: AuditLog[] = [
  {
    id: 'aud_1',
    user: 'marketing (Admin)',
    action: 'Updated Pricing Package',
    date: '2026-09-03',
    time: '04:02 AM',
    record: 'Meta Ads Growth Package',
    changesMade: 'Adjusted monthly retainer price to $449 and refreshed deliverable checklist.',
    ipAddress: '192.168.1.1'
  },
  {
    id: 'aud_2',
    user: 'marketing (Admin)',
    action: 'Modified Lead Status',
    date: '2026-09-03',
    time: '03:45 AM',
    record: 'Lead: Tariq Foods (lead_1788291)',
    changesMade: 'Changed status from "First Approach" to "Interested". Next follow-up set for 2026-09-05.',
    ipAddress: '192.168.1.1'
  },
  {
    id: 'aud_3',
    user: 'marketing (Admin)',
    action: 'Created Research Dossier',
    date: '2026-09-02',
    time: '11:20 PM',
    record: 'Research: Luxe Aura Athleisure Competitors',
    changesMade: 'Added verified competitor ad spend benchmarks and TripleWhale conversion data.',
    ipAddress: '192.168.1.1'
  },
  {
    id: 'aud_4',
    user: 'marketing (Admin)',
    action: 'Updated Client Health Note',
    date: '2026-09-02',
    time: '08:15 PM',
    record: 'Client: Apex Prime Realty',
    changesMade: 'Flagged client as "Needs Attention" due to London zoning CPC inflation.',
    ipAddress: '192.168.1.1'
  },
  {
    id: 'aud_5',
    user: 'marketing (Admin)',
    action: 'Synchronized GA4 & Meta Ads Data',
    date: '2026-09-02',
    time: '06:00 PM',
    record: 'Integrations Engine',
    changesMade: 'Manual sync triggered for GA4 and Meta Ads Manager properties. 412 conversion events verified.',
    ipAddress: '192.168.1.1'
  }
];

// INVOICES
export const telcaInvoices: FinanceInvoice[] = [
  {
    id: 'inv_101',
    invoiceNumber: 'TEL-2026-081',
    client: 'Luxe Aura Fashion',
    service: 'Meta Ads & Email Marketing Retainer',
    amountUSD: 897,
    issueDate: '2026-08-15',
    dueDate: '2026-08-25',
    status: 'Paid'
  },
  {
    id: 'inv_102',
    invoiceNumber: 'TEL-2026-082',
    client: 'NexaHealth Diagnostics',
    service: 'Google Ads & AI Automation Retainer',
    amountUSD: 748,
    issueDate: '2026-08-10',
    dueDate: '2026-08-20',
    status: 'Paid'
  },
  {
    id: 'inv_103',
    invoiceNumber: 'TEL-2026-083',
    client: 'Apex Prime Realty',
    service: 'LinkedIn ABM & Meta Retainer',
    amountUSD: 1097,
    issueDate: '2026-08-01',
    dueDate: '2026-08-15',
    status: 'Paid'
  },
  {
    id: 'inv_104',
    invoiceNumber: 'TEL-2026-084',
    client: 'CloudScale SaaS Engine',
    service: 'Google Ads & Technical SEO Retainer',
    amountUSD: 1277,
    issueDate: '2026-08-15',
    dueDate: '2026-08-25',
    status: 'Overdue'
  },
  {
    id: 'inv_105',
    invoiceNumber: 'TEL-2026-085',
    client: 'Artisan Roast & Bakery',
    service: 'TikTok Viral Marketing Retainer',
    amountUSD: 258,
    issueDate: '2026-08-01',
    dueDate: '2026-08-10',
    status: 'Paid'
  }
];

// SYSTEM NOTIFICATIONS
export const telcaNotifications: AdminNotification[] = [
  {
    id: 'notif_1',
    type: 'alert',
    title: 'High CPA Alert: Apex Prime Realty',
    message: 'LinkedIn Ads CPL reached $59.06 (£46.80) exceeding the target threshold of $45.00. Creative rotation recommended.',
    timestamp: '2 hours ago',
    read: false,
    linkTab: 'analytics'
  },
  {
    id: 'notif_2',
    type: 'warning',
    title: 'Overdue Invoice Alert: CloudScale SaaS',
    message: 'Invoice TEL-2026-084 for $1,277 is 9 days overdue. Automated reminder sent to elena@cloudscale.io.',
    timestamp: '5 hours ago',
    read: false,
    linkTab: 'finance'
  },
  {
    id: 'notif_3',
    type: 'success',
    title: 'ROAS Milestone: Luxe Aura Fashion',
    message: 'Advantage+ Fall Apparel campaign achieved 4.38x ROAS with $12,450 reported revenue in the last 7 days.',
    timestamp: '1 day ago',
    read: true,
    linkTab: 'analytics'
  },
  {
    id: 'notif_4',
    type: 'info',
    title: 'New High-Score Lead Inbound',
    message: 'Zubair Textiles submitted enterprise proposal inquiry ($5,000+ budget). Lead Score: 92/100.',
    timestamp: '1 day ago',
    read: true,
    linkTab: 'leads'
  }
];

// INITIAL LEADS PIPELINE
export const telcaLeads: LeadInquiry[] = [
  {
    id: 'lead_1',
    name: 'Zubair Ahmed',
    businessName: 'Zubair Premium Textiles',
    company: 'Zubair Premium Textiles',
    email: 'zubair@zubairtextiles.pk',
    phone: '+92 300 8472910',
    website: 'https://zubairtextiles.pk',
    country: 'Pakistan',
    industry: 'Fashion & Lifestyle',
    service: 'Meta Ads & E-commerce',
    serviceInterested: 'Meta Ads',
    budget: '$3,000 - $5,000 / month',
    currency: 'USD',
    leadScore: 92,
    status: 'Qualified',
    priority: 'High',
    assignedTeamMember: 'Hamza Tariq',
    tags: ['E-Commerce', 'High Budget', 'Immediate Start'],
    message: "We're launching a new direct-to-consumer lawn and luxury pret collection. Need full Meta Ads scaling and Shopify conversion rate optimization.",
    notes: 'Had introductory call on Zoom. High purchasing intent. Proposal sent with Medium & Growth package options.',
    lastContacted: '2026-09-02',
    nextFollowUp: '2026-09-05',
    createdAt: '2026-08-30T14:22:10.000Z',
    timeline: [
      {
        id: 'ev_1',
        date: '2026-08-30 14:22',
        action: 'Lead Submitted Inquiry',
        note: 'Submitted through website proposal form with $3k-$5k budget.'
      },
      {
        id: 'ev_2',
        date: '2026-08-31 11:00',
        action: 'First Approach',
        note: 'Connected on WhatsApp and sent calendar booking link.'
      },
      {
        id: 'ev_3',
        date: '2026-09-01 16:30',
        action: 'Discovery Call Completed',
        note: 'Audited existing Meta ad account; detected 2.1x historical ROAS with severe creative fatigue.'
      },
      {
        id: 'ev_4',
        date: '2026-09-02 10:15',
        action: 'Moved to Qualified',
        note: 'Client verified budget and authorized growth proposal draft.'
      }
    ]
  },
  {
    id: 'lead_2',
    name: 'Sarah Jenkins',
    businessName: 'Holistic Skin Lab',
    company: 'Holistic Skin Lab',
    email: 'sarah@holisticskinlab.com',
    phone: '+1 (310) 902-3841',
    website: 'https://holisticskinlab.com',
    country: 'United States',
    industry: 'Beauty & Wellness',
    service: 'TikTok Ads & Creative',
    serviceInterested: 'TikTok Ads',
    budget: '$1,500 - $3,000 / month',
    currency: 'USD',
    leadScore: 84,
    status: 'Proposal Sent',
    priority: 'High',
    assignedTeamMember: 'Zainab Noor',
    tags: ['TikTok Ads', 'UGC', 'Beauty'],
    message: 'Need help scaling our organic skincare line through TikTok Spark Ads and creator partnerships. Looking for an agency that knows video hooks.',
    notes: 'Customized proposal sent on Sept 1st. Awaiting founder review before Friday.',
    lastContacted: '2026-09-01',
    nextFollowUp: '2026-09-04',
    createdAt: '2026-08-28T19:10:00.000Z',
    timeline: [
      {
        id: 'ev_5',
        date: '2026-08-28 19:10',
        action: 'Lead Submitted Inquiry'
      },
      {
        id: 'ev_6',
        date: '2026-08-29 14:00',
        action: 'Discovery Call Scheduled'
      },
      {
        id: 'ev_7',
        date: '2026-09-01 12:00',
        action: 'Proposal Sent',
        note: 'Sent TikTok Growth Plan with 8 UGC creative hooks included.'
      }
    ]
  },
  {
    id: 'lead_3',
    name: 'Khurram Shehzad',
    businessName: 'Prime Logistics Hub',
    company: 'Prime Logistics Hub',
    email: 'khurram@primelogistics.com.pk',
    phone: '+92 333 4901928',
    website: 'https://primelogistics.com.pk',
    country: 'Pakistan',
    industry: 'B2B & Manufacturing',
    service: 'Google Ads & Web Dev',
    serviceInterested: 'Google Ads',
    budget: '$1,000 - $2,000 / month',
    currency: 'PKR',
    leadScore: 71,
    status: 'First Approach',
    priority: 'Medium',
    assignedTeamMember: 'Bilal Ahmed',
    tags: ['B2B', 'Logistics', 'Local'],
    message: 'We provide nationwide freight and cold storage transportation. Need more commercial corporate accounts.',
    notes: 'Sent introductory email with B2B case study PDF.',
    lastContacted: '2026-09-02',
    nextFollowUp: '2026-09-06',
    createdAt: '2026-09-01T09:45:00.000Z',
    timeline: [
      {
        id: 'ev_8',
        date: '2026-09-01 09:45',
        action: 'Inquiry Received'
      },
      {
        id: 'ev_9',
        date: '2026-09-02 11:30',
        action: 'Sent First Approach Email'
      }
    ]
  },
  {
    id: 'lead_4',
    name: 'Oliver Davies',
    businessName: 'Finova Wealth Management',
    company: 'Finova Wealth Management',
    email: 'oliver@finovawealth.co.uk',
    phone: '+44 20 8123 4567',
    website: 'https://finovawealth.co.uk',
    country: 'United Kingdom',
    industry: 'Finance & Business Services',
    service: 'LinkedIn Ads & Strategy',
    serviceInterested: 'LinkedIn Ads',
    budget: '$4,000+ / month',
    currency: 'GBP',
    leadScore: 88,
    status: 'Negotiation',
    priority: 'Urgent',
    assignedTeamMember: 'Hamza Tariq',
    tags: ['Finance', 'High Ticket', 'UK Client'],
    message: 'Seeking a performance agency to manage LinkedIn Ads targeting business owners looking for pension transfers and tax planning.',
    notes: 'Reviewing retainer terms and mutual NDA. Target contract start date: October 1st.',
    lastContacted: '2026-09-02',
    nextFollowUp: '2026-09-04',
    createdAt: '2026-08-25T11:00:00.000Z',
    timeline: [
      {
        id: 'ev_10',
        date: '2026-08-25 11:00',
        action: 'Lead Submitted Inquiry'
      },
      {
        id: 'ev_11',
        date: '2026-08-27 15:00',
        action: 'Audit Call Completed'
      },
      {
        id: 'ev_12',
        date: '2026-09-02 14:00',
        action: 'Contract Draft Sent (Negotiation Stage)'
      }
    ]
  },
  {
    id: 'lead_5',
    name: 'Anum Jahangir',
    businessName: 'Little Sprout Montessori',
    company: 'Little Sprout Montessori',
    email: 'admissions@littlesprout.edu.pk',
    phone: '+92 345 6789012',
    website: 'https://littlesprout.edu.pk',
    country: 'Pakistan',
    industry: 'Education & Training',
    service: 'Social Media Marketing',
    serviceInterested: 'Social Media Marketing',
    budget: 'Under $1,000',
    currency: 'PKR',
    leadScore: 65,
    status: 'Interested',
    priority: 'Low',
    assignedTeamMember: 'Ayesha Khan',
    tags: ['Education', 'Local'],
    message: 'Need help with admissions open campaign for 2026-2027 preschool intake.',
    notes: 'Interested in Social Media Starter plan ($129/mo).',
    lastContacted: '2026-09-01',
    nextFollowUp: '2026-09-07',
    createdAt: '2026-08-29T08:15:00.000Z',
    timeline: []
  }
];
