import heroWorkspaceImg from '../assets/images/hero_digital_strategist_1794798022754.jpg';
import caseSeoImg from '../assets/images/case_seo_growth_1794798023021.jpg';
import caseEmailImg from '../assets/images/case_email_lifestyle_1794798023746.jpg';
import moksedulDeskImg from '../assets/images/moksedul_laptop_desk_1794799185965.jpg';

export type ServiceId =
  | 'seo'
  | 'youtube-seo'
  | 'facebook-ads'
  | 'google-ads'
  | 'email-marketing'
  | 'ai-automation';

export interface ServiceItem {
  id: ServiceId;
  number: string;
  title: string;
  shortTitle: string;
  categoryLabel: string;
  summary: string;
  outcome: string;
  startingPrice: string;
  standardPrice: string;
  timeline: string;
  featured?: boolean;
  deliverables: string[];
  tools: string[];
  auditChecklist: string[];
}

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  channel: ServiceId;
  channelName: string;
  client: string;
  industry: string;
  timeframe: string;
  headline: string;
  metricHighlight: string;
  imageSrc: string;
  imageAlt: string;
  isScreenshot?: boolean;
  secondaryImageSrc?: string;
  secondaryImageAlt?: string;
  beforeState: string;
  strategy: string;
  outcome: string;
  metrics: CaseStudyMetric[];
  toolsUsed: string[];
}

export interface SkillTier {
  tierName: 'Basic' | 'Standard' | 'Monthly' | 'On-Page SEO' | 'Off-Page SEO' | 'Technical SEO';
  title: string;
  price: string;
  billingCycle: string;
  turnaround: string;
  recommended?: boolean;
  summary: string;
  deliverables: string[];
}

export interface SkillPricingGroup {
  serviceId: ServiceId;
  serviceLabel: string;
  headline: string;
  subheadline: string;
  tiers: SkillTier[];
}

export interface ProcessStep {
  number: string;
  title: string;
  duration: string;
  description: string;
}

export interface TrustPillar {
  id: string;
  number: string;
  title: string;
  highlight: string;
  description: string;
}

export interface SocialProfile {
  id: 'facebook' | 'instagram' | 'linkedin' | 'x';
  label: string;
  handle: string;
  url: string;
}

export const CONTACT_INFO = {
  email: 'moksedulislamdmt@gmail.com',
  whatsappDisplay: '+8801776827908',
  whatsappDigits: '8801776827908',
  portfolioDomain: 'moksedul-dm.com',
};

export const SOCIAL_LINKS: SocialProfile[] = [
  {
    id: 'facebook',
    label: 'Facebook',
    handle: '/moksedul-dm',
    url: 'https://www.facebook.com/moksedul-dm',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@moksedul-dm',
    url: 'https://www.instagram.com/moksedul-dm',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/moksedul-dm',
    url: 'https://www.linkedin.com/in/moksedul-dm',
  },
  {
    id: 'x',
    label: 'X (Twitter)',
    handle: '@moksedul-dm',
    url: 'https://x.com/moksedul-dm',
  },
];

export const PORTRAIT_DESK_IMAGE = {
  src: moksedulDeskImg,
  alt: 'Moksedul Islam DM seated at a modern oak desk with an open laptop',
};

export const PORTRAIT_AVATAR_IMAGE = {
  src: '/assets/aistudio/Pic_2701cbf6.jpg',
  alt: 'Moksedul Islam DM portrait headshot',
};

export const HERO_KPI_ITEMS = [
  {
    value: '$25',
    label: 'Entry Gig Pricing',
    context: 'Low-risk starter packages by skill',
  },
  {
    value: '6 Channels',
    label: 'Full-Funnel Skillset',
    context: 'SEO · YouTube · Meta · Google · Email · AI',
  },
  {
    value: '24–48h',
    label: 'Fast Initial Delivery',
    context: 'Quick turnaround on audits & setups',
  },
  {
    value: '1-on-1',
    label: 'Direct Execution',
    context: 'Zero outsourcing or agency markups',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'seo',
    number: '01.',
    title: 'Search Engine Optimization (SEO)',
    shortTitle: 'SEO',
    categoryLabel: 'Organic Search · Technical & On-Page',
    summary:
      'Fix crawl bottlenecks, research buyer-intent keywords, and optimize your core pages so your site ranks on Google without overpaying an agency.',
    outcome: 'Clean technical foundation & page-1 commercial keyword targeting',
    startingPrice: '$45',
    standardPrice: '$120 (5-Page Sprint)',
    timeline: '3–5 Day Setup',
    featured: true,
    deliverables: [
      'Complete website technical audit (Core Web Vitals, broken links, indexation fixes)',
      '50+ low-competition, buyer-intent keyword research sheet mapped to URLs',
      'On-page optimization for titles, meta descriptions, H1/H2 structure, and internal links',
      'Schema markup & Google Search Console / GA4 sitemap verification',
      'Prioritized 90-day content & backlink roadmap you can execute right away',
    ],
    tools: ['Ahrefs', 'Semrush', 'Google Search Console', 'Screaming Frog', 'GA4'],
    auditChecklist: [
      'Crawl errors & canonical duplicate check',
      'Top 10 commercial keyword gap audit',
      'Page speed & mobile usability inspection',
    ],
  },
  {
    id: 'youtube-seo',
    number: '02.',
    title: 'YouTube SEO & Channel Growth',
    shortTitle: 'YouTube SEO',
    categoryLabel: 'Video Discovery · Search & CTR',
    summary:
      'Get your videos discovered in YouTube and Google search results with keyword-backed titles, structured descriptions, tags, and CTR packaging.',
    outcome: 'Higher search impressions, better CTR, and steady organic subscribers',
    startingPrice: '$25',
    standardPrice: '$75 (8-Video Pack)',
    timeline: '48-Hour Delivery',
    deliverables: [
      'Low-competition, high-search-volume video topic & keyword research',
      'SEO-optimized titles, keyword-rich descriptions, timestamps, and tag clusters',
      'Thumbnail & hook improvement notes designed to push CTR above 6%',
      'Channel-wide playlist silo structuring and end-screen linking loops',
      'YouTube Studio CTR, retention, and search traffic diagnostic sheet',
    ],
    tools: ['vidIQ', 'TubeBuddy', 'YouTube Studio Analytics', 'Google Trends'],
    auditChecklist: [
      'Channel CTR vs. niche benchmark check',
      'First-30-second viewer drop-off check',
      'Search vs. Suggested traffic balance review',
    ],
  },
  {
    id: 'facebook-ads',
    number: '03.',
    title: 'Facebook & Instagram Ads (Meta)',
    shortTitle: 'Facebook Ads',
    categoryLabel: 'Paid Social · Setup & Testing',
    summary:
      'Launch clean Meta acquisition and retargeting campaigns with verified Pixel & Conversion API tracking—built for small-business ad budgets.',
    outcome: 'Accurate conversion tracking & structured audience/creative testing',
    startingPrice: '$60',
    standardPrice: '$150 (Setup + 14-Day Mgmt)',
    timeline: '2–3 Day Launch',
    featured: true,
    deliverables: [
      'Business Manager, Meta Pixel & Conversion API (CAPI) event verification',
      'Prospecting + retargeting campaign architecture tailored to your budget',
      'Detailed interest, lookalike & broad audience research without overlap',
      'Ad copy variations (primary text, headlines, CTAs) + creative testing plan',
      '7-to-14 day optimization monitoring to cut wasted spend early',
    ],
    tools: ['Meta Ads Manager', 'Meta Events Manager', 'Google Tag Manager'],
    auditChecklist: [
      'Pixel purchase/lead event match quality check',
      'Audience overlap & ad fatigue check',
      'Offer & landing page conversion check',
    ],
  },
  {
    id: 'google-ads',
    number: '04.',
    title: 'Google Ads (Search, Shopping & PMax)',
    shortTitle: 'Google Ads',
    categoryLabel: 'Paid Search · High-Intent Capture',
    summary:
      'Capture buyers actively searching on Google right now while blocking irrelevant clicks with tightly themed ad groups and negative keyword lists.',
    outcome: 'Lower cost per click & verified lead/purchase conversion tracking',
    startingPrice: '$75',
    standardPrice: '$180 (Full Build + Tracking)',
    timeline: '3-Day Launch',
    deliverables: [
      'Exact & phrase match Search campaign build with tightly themed ad groups',
      'Master negative keyword list to stop budget leaks on non-buying searches',
      'Google Tag Manager & GA4 Enhanced Conversion tracking configuration',
      'Responsive Search Ads copywriting with sitelink, callout & snippet extensions',
      'Google Merchant Center feed check & bidding calibration for Shopping/PMax',
    ],
    tools: ['Google Ads', 'Google Tag Manager', 'GA4', 'Google Merchant Center'],
    auditChecklist: [
      'Search terms wasted-spend leak check',
      'Quality Score & ad relevance diagnostic',
      'Conversion tag firing verification',
    ],
  },
  {
    id: 'email-marketing',
    number: '05.',
    title: 'Email Marketing & Lifecycle Flows',
    shortTitle: 'Email Marketing',
    categoryLabel: 'Retention · Klaviyo & Mailchimp',
    summary:
      'Stop leaving store revenue on the table. Set up clean mobile-friendly templates, inbox authentication, and automated welcome or cart-recovery flows.',
    outcome: 'Automated follow-up sequences that convert subscribers on autopilot',
    startingPrice: '$45',
    standardPrice: '$140 (3 Core Flows)',
    timeline: '3–4 Day Build',
    deliverables: [
      'Domain authentication (SPF, DKIM, DMARC) & list hygiene to avoid spam folders',
      'Core automation setup: Welcome Series, Abandoned Cart, and Post-Purchase flows',
      'High-converting signup popup form & lead-magnet integration',
      'Clean, responsive branded email templates in Klaviyo or Mailchimp',
      'Buyer segmentation & A/B subject-line testing recommendations',
    ],
    tools: ['Klaviyo', 'Mailchimp', 'ActiveCampaign', 'Brevo'],
    auditChecklist: [
      'Inbox placement & domain authentication check',
      'Missing revenue automation flow audit',
      'Unsubscribe & bounce rate hygiene check',
    ],
  },
  {
    id: 'ai-automation',
    number: '06.',
    title: 'AI Marketing & Workflow Automation',
    shortTitle: 'AI Automation',
    categoryLabel: 'AI Workflows · Zapier, Make & n8n',
    summary:
      'Connect your ads, CRM, WhatsApp, and email tools with AI-powered workflows that reply to leads in under 60 seconds and eliminate manual data entry.',
    outcome: 'Faster lead response times and 15+ hours saved monthly on repetitive tasks',
    startingPrice: '$50',
    standardPrice: '$160 (Full AI Workflow)',
    timeline: '2–4 Day Build',
    deliverables: [
      'Meta Lead Ads & website form instant sync to Google Sheets, HubSpot, or GoHighLevel',
      'AI-powered email/WhatsApp lead qualification & instant follow-up automation',
      'Automated weekly ad spend & conversion summary reports sent to Slack or email',
      'Custom multi-step workflows built cleanly in Make.com, Zapier, or n8n',
      'YouTube/blog content repurposing & AI drafting pipelines with error alerts',
    ],
    tools: ['Make.com', 'Zapier', 'n8n', 'OpenAI / Gemini API', 'GoHighLevel'],
    auditChecklist: [
      'Manual lead handoff bottleneck audit',
      'CRM & webhook trigger reliability check',
      'Automated follow-up speed diagnostic',
    ],
  },
];

export const SKILL_PRICING_GROUPS: SkillPricingGroup[] = [
  {
    serviceId: 'seo',
    serviceLabel: 'SEO',
    headline: 'Search Engine Optimization (On-Page · Off-Page · Technical SEO)',
    subheadline:
      'Choose a dedicated budget for On-Page SEO, Off-Page backlink building, or Technical SEO fixes.',
    tiers: [
      {
        tierName: 'On-Page SEO',
        title: 'On-Page SEO & Keyword Setup',
        price: '$50',
        billingCycle: '/ project',
        turnaround: '3-Day Delivery',
        summary: 'Optimize your content, headings, and metadata for buyer-intent keywords.',
        deliverables: [
          'Commercial & long-tail keyword research (50+ terms)',
          'SEO titles, meta descriptions & H1–H3 structure (up to 8 pages)',
          'URL slug cleanup, image alt text & internal linking',
          'Content optimization brief to boost page relevance',
        ],
      },
      {
        tierName: 'Off-Page SEO',
        title: 'Off-Page SEO & Backlink Growth',
        price: '$85',
        billingCycle: '/ project',
        turnaround: '5-Day Delivery · Authority',
        recommended: true,
        summary: 'Build domain trust and referral signals with clean white-hat backlinks.',
        deliverables: [
          'Competitor backlink gap & toxic link audit',
          'High-authority niche citations & profile placements',
          'White-hat guest post / contextual link outreach',
          'Safe anchor-text distribution & live link sheet',
        ],
      },
      {
        tierName: 'Technical SEO',
        title: 'Technical SEO & Speed Audit',
        price: '$70',
        billingCycle: '/ project',
        turnaround: '3-Day Delivery',
        summary: 'Fix crawl errors, slow pages, and indexing bottlenecks holding rankings back.',
        deliverables: [
          'Full Screaming Frog crawl & broken link / 404 cleanup',
          'XML sitemap, robots.txt & canonical tag configuration',
          'JSON-LD Schema markup & Core Web Vitals speed fixes',
          'Google Search Console & GA4 indexation verification',
        ],
      },
    ],
  },
  {
    serviceId: 'youtube-seo',
    serviceLabel: 'YouTube SEO',
    headline: 'YouTube SEO & Channel Growth Pricing',
    subheadline:
      'Rank your videos in YouTube Search and Suggested feeds with research-backed titles, tags, and CTR notes.',
    tiers: [
      {
        tierName: 'Basic',
        title: '3-Video SEO Starter Pack',
        price: '$25',
        billingCycle: '/ one-time',
        turnaround: '48-Hour Delivery',
        summary: 'Low-risk starter gig to optimize your next or top 3 uploads.',
        deliverables: [
          'Keyword research for 3 video topics',
          'SEO-friendly titles & 200+ word descriptions',
          'High-ranking tags, hashtags & timestamps',
          'End-screen & card linking checklist',
        ],
      },
      {
        tierName: 'Standard',
        title: '8-Video Growth & CTR Pack',
        price: '$75',
        billingCycle: '/ project',
        turnaround: '3-Day Delivery · Popular',
        recommended: true,
        summary: 'Full search optimization + thumbnail CTR feedback for 8 videos.',
        deliverables: [
          'Complete keyword & metadata optimization (8 videos)',
          'Channel-level tag, About & playlist silo setup',
          'Thumbnail hook & text hierarchy audit (CTR > 6%)',
          '15 future viral/search video topic ideas',
        ],
      },
      {
        tierName: 'Monthly',
        title: 'Monthly Channel SEO Manager',
        price: '$160',
        billingCycle: '/ month',
        turnaround: 'Per-Upload Turnaround',
        summary: 'Hands-on SEO packaging for every video you publish each month.',
        deliverables: [
          'Full optimization for up to 16 videos/month',
          'Competitor retention & outlier topic tracking',
          'YouTube Studio CTR & audience retention review',
          'Priority 24-hour pre-publish metadata delivery',
        ],
      },
    ],
  },
  {
    serviceId: 'facebook-ads',
    serviceLabel: 'Facebook Ads',
    headline: 'Facebook & Instagram Ads (Meta) Pricing',
    subheadline:
      'Protect your daily ad spend with verified Pixel/CAPI tracking, clean campaign structure, and creative testing.',
    tiers: [
      {
        tierName: 'Basic',
        title: 'Pixel, CAPI & Campaign Setup',
        price: '$60',
        billingCycle: '/ one-time',
        turnaround: '2-Day Delivery',
        summary: 'Everything built properly so you can launch ads without tracking leaks.',
        deliverables: [
          'Meta Business Manager, Pixel & CAPI check',
          'Target audience & lookalike research',
          '1 prospecting campaign + 3 ad variations setup',
          'Ad copy & headline variations written for you',
        ],
      },
      {
        tierName: 'Standard',
        title: 'Full-Funnel Launch + 14-Day Mgmt',
        price: '$150',
        billingCycle: '/ project',
        turnaround: '14 Days Management · Popular',
        recommended: true,
        summary: 'Cold acquisition + warm retargeting setup with 2 weeks of live tuning.',
        deliverables: [
          'Full-funnel setup (Prospecting + DPA Retargeting)',
          '4–6 ad copy/creative test variations',
          '14 days of daily bid, CPA & fatigue monitoring',
          'End-of-sprint ROAS & scaling recommendations',
        ],
      },
      {
        tierName: 'Monthly',
        title: 'Monthly Meta Ads Manager',
        price: '$250',
        billingCycle: '/ month',
        turnaround: 'Weekly Creative & Bid Sprints',
        summary: 'Ongoing daily optimization and creative testing for consistent ROAS.',
        deliverables: [
          'Full account management (Cold + Warm + Retargeting)',
          'Weekly ad fatigue rotation & new hook briefs',
          'Server-side CAPI & event match quality monitoring',
          'Weekly plain-English CPA, ROAS & MER reports',
        ],
      },
    ],
  },
  {
    serviceId: 'google-ads',
    serviceLabel: 'Google Ads',
    headline: 'Google Ads (Search, Shopping & PMax) Pricing',
    subheadline:
      'Capture high-intent search buyers and stop wasting money on irrelevant broad-match clicks.',
    tiers: [
      {
        tierName: 'Basic',
        title: 'Keyword Plan & 1 Campaign Setup',
        price: '$75',
        billingCycle: '/ one-time',
        turnaround: '3-Day Delivery',
        summary: 'Clean exact & phrase match Search campaign ready to run.',
        deliverables: [
          'High-intent Search keyword research',
          '100+ negative keywords to prevent wasted clicks',
          '1 structured Search campaign with 2–3 ad groups',
          'Responsive Search Ads + sitelink extensions',
        ],
      },
      {
        tierName: 'Standard',
        title: 'Full Search/Shopping + GTM Tracking',
        price: '$180',
        billingCycle: '/ project',
        turnaround: '14 Days Tuning · Popular',
        recommended: true,
        summary: 'Complete Google Ads build with verified GA4/GTM conversion tracking.',
        deliverables: [
          'Multi-ad-group Search or Shopping/PMax setup',
          'Google Tag Manager & GA4 conversion tracking',
          'Master negative keyword list & bid calibration',
          '14 days of search-term pruning & optimization',
        ],
      },
      {
        tierName: 'Monthly',
        title: 'Monthly Google Ads Partner',
        price: '$280',
        billingCycle: '/ month',
        turnaround: 'Weekly Search Term Audits',
        summary: 'Continuous CPL/ROAS optimization across Search, Shopping & PMax.',
        deliverables: [
          'Ongoing bid strategy & Quality Score tuning',
          'Weekly search terms report & negative pruning',
          'Merchant Center feed optimization (for e-commerce)',
          'Monthly conversion & ROI breakdown call/report',
        ],
      },
    ],
  },
  {
    serviceId: 'email-marketing',
    serviceLabel: 'Email Marketing',
    headline: 'Email Marketing & Automation Flows Pricing',
    subheadline:
      'Turn website visitors and past buyers into repeat revenue via Klaviyo, Mailchimp, or ActiveCampaign.',
    tiers: [
      {
        tierName: 'Basic',
        title: 'Inbox Auth & Welcome Setup',
        price: '$45',
        billingCycle: '/ one-time',
        turnaround: '2-Day Delivery',
        summary: 'Make sure your emails land in the Primary inbox with a branded design.',
        deliverables: [
          'SPF, DKIM & DMARC deliverability check',
          '1 responsive branded email template',
          'Signup popup form + Welcome email setup',
          'Basic subscriber list cleaning & tags',
        ],
      },
      {
        tierName: 'Standard',
        title: '3 Core Revenue Automation Flows',
        price: '$140',
        billingCycle: '/ project',
        turnaround: '4-Day Delivery · Popular',
        recommended: true,
        summary: 'Automated sequences that capture leads and recover abandoned carts.',
        deliverables: [
          'Welcome Series (3 emails) + Cart Recovery (3 emails)',
          'Post-Purchase thank-you & upsell flow (2 emails)',
          'Copywriting, clean design & trigger testing',
          'VIP & engaged buyer segmentation setup',
        ],
      },
      {
        tierName: 'Monthly',
        title: 'Monthly Email Retention Manager',
        price: '$240',
        billingCycle: '/ month',
        turnaround: 'Weekly Campaigns + Flow Tuning',
        summary: 'Full Klaviyo/Mailchimp management with weekly promotional broadcasts.',
        deliverables: [
          '4–6 custom-designed promotional campaigns/month',
          'Ongoing A/B subject line & send-time testing',
          'Flow split-testing (Browse, Cart, Win-Back)',
          'Monthly email-attributed revenue & list health report',
        ],
      },
    ],
  },
  {
    serviceId: 'ai-automation',
    serviceLabel: 'AI Automation',
    headline: 'AI Marketing & Workflow Automation Pricing',
    subheadline:
      'Automate lead capture, AI follow-ups, CRM sync, and marketing reports using Make.com, Zapier, or n8n.',
    tiers: [
      {
        tierName: 'Basic',
        title: 'Single Lead-to-CRM Workflow',
        price: '$50',
        billingCycle: '/ one-time',
        turnaround: '48-Hour Delivery',
        summary: 'Connect your ad or website form directly to CRM, Sheets, and instant alerts.',
        deliverables: [
          '1 automated workflow (Make.com, Zapier, or n8n)',
          'Meta Lead Ads / web form to Google Sheets or CRM sync',
          'Instant email or WhatsApp/Slack lead notification',
          'Error handling & live webhook test',
        ],
      },
      {
        tierName: 'Standard',
        title: 'Multi-Step AI Lead & Follow-Up System',
        price: '$160',
        billingCycle: '/ project',
        turnaround: '4-Day Delivery · Popular',
        recommended: true,
        summary: 'End-to-end AI qualification, auto-reply, and automated reporting pipeline.',
        deliverables: [
          'Up to 4 connected multi-step AI automation workflows',
          'AI-personalized email/WhatsApp lead reply in < 60 seconds',
          'Automated weekly Meta/Google Ads & GA4 report digest',
          'Full documentation & Loom walkthrough video',
        ],
      },
      {
        tierName: 'Monthly',
        title: 'Monthly AI Automation Partner',
        price: '$260',
        billingCycle: '/ month',
        turnaround: 'Ongoing Builds & Monitoring',
        summary: 'Continuous workflow expansion, AI prompt tuning, and API maintenance.',
        deliverables: [
          'Up to 6 new automations or upgrades per month',
          '24/7 error monitoring & webhook reliability fixes',
          'AI content repurposing & lead-scoring optimization',
          'Priority WhatsApp & Slack engineering support',
        ],
      },
    ],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'yt-street-humanity-seo',
    channel: 'youtube-seo',
    channelName: 'YouTube SEO',
    client: 'YouTube Documentary Channel',
    industry: 'Before & After SEO Proof',
    timeframe: 'VidIQ 100/100',
    headline: 'VidIQ SEO Score Lifted From 0/100 to a Full 100/100 Score With 5/5 Ranked Tags',
    metricHighlight: '0 → 100/100 SEO Score',
    imageSrc: '/assets/aistudio/unnamed_6070257b.jpg',
    imageAlt: 'Before and after VidIQ YouTube SEO score jump from 0/100 to 100/100 on Street Humanity video',
    isScreenshot: true,
    beforeState:
      'Video launched with a 0/100 VidIQ SEO score, 0/50 Actionable score, and 0/50 Performance score—preventing YouTube Search from indexing the topic.',
    strategy:
      'Researched high-intent storytelling keywords, rewrote the title and description with triple-matched phrases, and replaced missing tags with ranked long-tail terms.',
    outcome:
      'Achieved a 100/100 VidIQ SEO score (50/50 Actionable and 50/50 Performance) with 5/5 ranked tags and 5/5 high-volume ranked keywords.',
    metrics: [
      { label: 'VidIQ Score', value: '100 / 100' },
      { label: 'Actionable', value: '50 / 50' },
      { label: 'Performance', value: '50 / 50' },
      { label: 'Ranked Tags', value: '5 / 5' },
    ],
    toolsUsed: ['YouTube Studio', 'vidIQ', 'Keyword Research'],
  },
  {
    id: 'yt-austin-realestate-seo',
    channel: 'youtube-seo',
    channelName: 'YouTube SEO',
    client: 'Millennium Realty Group',
    industry: 'Real Estate · YouTube Growth',
    timeframe: '30-Day Growth',
    headline: 'Real Estate Video Scaled From 113 Views to 184K Views (+100x Channel Average)',
    metricHighlight: '113 → 184K Views',
    imageSrc: '/assets/aistudio/16c5627f-3b73-42f0-b8f3-a1df3f93a265__1__dee9e0a0.jpg',
    imageAlt: 'Before and after YouTube search growth from 113 views to 184K views and 10.8K subscribers',
    isScreenshot: true,
    beforeState:
      'At 8 days post-upload, the Austin home tour had stalled at just 113 views while the channel sat at 6.72K subscribers with low search visibility.',
    strategy:
      'Repackaged the title for local buyer intent ("Affordable New Construction Homes For Sale In Austin Texas"), optimized metadata, and targeted long-tail relocation tags.',
    outcome:
      'Surged to 184K views within 1 month (53 VPH, >100x channel outlier lift) and helped grow the channel from 6.72K to 10.8K subscribers.',
    metrics: [
      { label: 'Before SEO', value: '113 Views' },
      { label: 'After SEO', value: '184K Views' },
      { label: 'Velocity', value: '53 VPH (>100x)' },
      { label: 'Subscribers', value: '6.72K → 10.8K' },
    ],
    toolsUsed: ['YouTube Studio', 'vidIQ', 'TubeBuddy'],
  },
  {
    id: 'yt-music-beat-seo',
    channel: 'youtube-seo',
    channelName: 'YouTube SEO',
    client: 'Music Producer Channel',
    industry: 'Beats & Audio · VidIQ Proof',
    timeframe: 'Studio Optimization',
    headline: 'Music Video Metadata Overhaul Reaching 98.1/100 VidIQ Score & 50/50 Performance',
    metricHighlight: '0 → 98.1/100 Score',
    imageSrc: '/assets/aistudio/unnamed__1__34879bf2.jpg',
    imageAlt: 'YouTube Studio before and after optimization showing VidIQ score increase from 0/100 to 98.1/100',
    isScreenshot: true,
    beforeState:
      'Uploaded beat video had 0/100 VidIQ SEO score, unoptimized description formatting, and 0 ranked tags in a highly competitive music niche.',
    strategy:
      'Added structured Beatstore/licensing description copy, tripled high-intent artist type-beat keywords across title, description, and tags, and verified tag volume.',
    outcome:
      'Lifted the VidIQ SEO score from 0/100 to 98.1/100 with 48.1/50 Actionable score, 50/50 Performance score, and 5/5 high-volume ranked tags.',
    metrics: [
      { label: 'VidIQ Score', value: '98.1 / 100' },
      { label: 'Actionable', value: '48.1 / 50' },
      { label: 'Performance', value: '50 / 50' },
      { label: 'Ranked Tags', value: '5 / 5' },
    ],
    toolsUsed: ['YouTube Studio', 'vidIQ', 'Tag Optimization'],
  },
  {
    id: 'yt-home-investing-seo',
    channel: 'youtube-seo',
    channelName: 'YouTube SEO',
    client: 'Everyday Home Repairs',
    industry: 'Home & Property Investing',
    timeframe: '3-Week Growth',
    headline: 'Property Investing Upload Lifted From 15 Views to 17K Views & 11.9K Subscribers',
    metricHighlight: '15 → 17K Views (8.4x)',
    imageSrc: '/assets/aistudio/6edb133f-0bd2-45b2-825b-cce50cdbe02a__1__1a9eea1f.jpg',
    imageAlt: 'Before and after YouTube SEO result from 15 views to 17K views and 3.8K to 11.9K subscribers',
    isScreenshot: true,
    beforeState:
      'Video sat at 15 views after 2 days on a 3.8K-subscriber channel with no chapters or search-aligned metadata.',
    strategy:
      'Optimized title phrasing ("Buying Cheap Houses | Rural Small Town Investing"), added timestamp moments ("Basement | Termite Damage"), and clustered niche tags.',
    outcome:
      'Reached 17K views within 3 weeks (8.4x performance multiplier) while the channel grew from 3.8K to 11.9K subscribers.',
    metrics: [
      { label: 'Before SEO', value: '15 Views' },
      { label: 'After SEO', value: '17K Views' },
      { label: 'Multiplier', value: '8.4x Lift' },
      { label: 'Subscribers', value: '3.8K → 11.9K' },
    ],
    toolsUsed: ['YouTube Studio', 'vidIQ', 'Chapter Structuring'],
  },
  {
    id: 'yt-bathbomb-product-seo',
    channel: 'youtube-seo',
    channelName: 'YouTube SEO',
    client: 'Kids DIY & Craft Product Video',
    industry: 'Product Review · Ranked Tags',
    timeframe: 'Metadata Sprint',
    headline: 'Replaced Off-Topic Tags & Lifted VidIQ SEO Score From 10.9/100 to 100/100 (#2 Rank)',
    metricHighlight: '10.9 → 100/100 · #2 Tag',
    imageSrc: '/assets/aistudio/a1cc2843-a0fa-492b-bdb2-9cfa12243e6c_a1669144.jpg',
    imageAlt: 'VidIQ before and after comparison moving from 10.9/100 to 100/100 with #2, #3, and #4 ranked tags',
    isScreenshot: true,
    beforeState:
      'Product video suffered from a 10.9/100 VidIQ score because its tags contained unrelated drawing/painting keywords that confused YouTube’s algorithm.',
    strategy:
      'Cleaned out irrelevant tags and rebuilt the tag set around exact product queries ("bath bomb and soap making kit", "making bath bombs at home") paired with a 726-word SEO description.',
    outcome:
      'Reached 100/100 VidIQ SEO score with multiple top-4 search tag rankings (#2, #3, and #4) for buyer-intent product terms.',
    metrics: [
      { label: 'Before Score', value: '10.9 / 100' },
      { label: 'After Score', value: '100 / 100' },
      { label: 'Top Tag Ranks', value: '#2 · #3 · #4' },
      { label: 'Desc. Length', value: '726 Words' },
    ],
    toolsUsed: ['vidIQ', 'YouTube Studio', 'Keyword Clustering'],
  },
  {
    id: 'gads-pmax-scaling',
    channel: 'google-ads',
    channelName: 'Google Ads',
    client: 'Performance Max Campaign Results',
    industry: 'Multi-Asset E-Commerce',
    timeframe: 'Live Campaign Data',
    headline: 'Performance Max Scaled to 921K+ Impressions & 2,756 Conversions at $3.00 CPA',
    metricHighlight: '2,756 Conv. · $3.00 CPA',
    imageSrc: '/assets/aistudio/unnamed__6__8fb96fed.jpg',
    imageAlt: 'Google Ads Performance Max reporting table showing 921,013 impressions, 4,380 clicks, and 2,756.93 conversions at $3.00 cost per conversion',
    isScreenshot: true,
    beforeState:
      'Scaling Google Performance Max without segmented asset groups causes rising cost per acquisition and poor conversion efficiency.',
    strategy:
      'Structured 8 tightly segmented asset groups with clean conversion tracking, bid caps, and ongoing cost-per-conversion optimization ($2.41–$3.00 range).',
    outcome:
      'Generated 921,013 impressions (+426.57%), 4,380 clicks (+323.60%), and 2,756.93 verified conversions at an efficient $3.00 average cost per conversion.',
    metrics: [
      { label: 'Impressions', value: '921,013' },
      { label: 'Clicks', value: '4,380' },
      { label: 'Conversions', value: '2,756.93' },
      { label: 'Cost / Conv.', value: '$3.00' },
    ],
    toolsUsed: ['Google Ads', 'Performance Max', 'Conversion Tracking'],
  },
  {
    id: 'gads-overview-cpc',
    channel: 'google-ads',
    channelName: 'Google Ads',
    client: 'Google Ads Account Launch',
    industry: 'Search & Click Control',
    timeframe: '7-Day Snapshot',
    headline: 'Controlled Starter Google Ads Launch With $1.43 Avg. CPC & Clean Conversion Setup',
    metricHighlight: '775 Impr. · $1.43 CPC',
    imageSrc: '/assets/aistudio/unnamed__5__cf87c522.jpg',
    imageAlt: 'Google Ads Overview dashboard showing 42 clicks, 775 impressions, and $1.43 average CPC',
    isScreenshot: true,
    beforeState:
      'New ad accounts risk overspending on high-CPC broad terms if campaign filters and daily budget caps are left on default settings.',
    strategy:
      'Configured targeted campaign status filters, bid guardrails, and conversion assets to validate click-through efficiency during the initial 7-day test window.',
    outcome:
      'Delivered 775 targeted impressions and 42 qualified clicks at a disciplined $1.43 average CPC (5.42% CTR) ready for keyword scaling.',
    metrics: [
      { label: 'Impressions', value: '775' },
      { label: 'Clicks', value: '42' },
      { label: 'Avg. CPC', value: '$1.43' },
      { label: 'CTR', value: '5.42%' },
    ],
    toolsUsed: ['Google Ads', 'Keyword Planner', 'GA4'],
  },
  {
    id: 'meta-ads-campaign-setup',
    channel: 'facebook-ads',
    channelName: 'Facebook Ads',
    client: 'Meta Ads Manager Campaign Build',
    industry: 'Meta Business Suite & Targeting',
    timeframe: 'Campaign Setup',
    headline: 'Meta Ads Manager Conversion Campaign, Audience & Placement Architecture',
    metricHighlight: 'Ads Manager & Suite',
    imageSrc: '/assets/aistudio/unnamed__3__e07e3180.jpg',
    imageAlt: 'Meta Ads Manager ad set audience and performance breakdown',
    secondaryImageSrc: '/assets/aistudio/unnamed__4__bfd72448.jpg',
    secondaryImageAlt: 'Facebook Meta Business Suite and Ads Manager navigation view',
    isScreenshot: true,
    beforeState:
      'Boosting posts directly from a Facebook Page lacks conversion event optimization, detailed audience layering, and placement controls.',
    strategy:
      'Configured campaigns directly inside Meta Ads Manager and Meta Business Suite—setting conversion objectives, daily budget rules, and demographic/placement reporting.',
    outcome:
      'Established a clean, accountable Meta Ads Manager structure with tracked performance charts across age, placement, and conversion events.',
    metrics: [
      { label: 'Platform', value: 'Ads Manager' },
      { label: 'Business Tools', value: 'Meta Suite' },
      { label: 'Tracking', value: 'Pixel + Events' },
      { label: 'Basic Setup', value: '$60' },
    ],
    toolsUsed: ['Meta Ads Manager', 'Meta Business Suite', 'Events Manager'],
  },
  {
    id: 'botanical-skincare-seo',
    channel: 'seo',
    channelName: 'SEO',
    client: 'Website SEO Playbook',
    industry: 'On-Page · Off-Page · Technical',
    timeframe: '3–5 Day Sprints',
    headline: 'Complete Website SEO Architecture: On-Page, Off-Page & Technical Optimization',
    metricHighlight: 'On-Page · Off-Page · Tech',
    imageSrc: caseSeoImg,
    imageAlt: 'E-commerce Website SEO strategy and technical audit workspace',
    beforeState:
      'Typical websites lose 60%+ of organic search potential due to duplicate URLs, missing schema markup, slow pages, and weak backlink authority.',
    strategy:
      'Execute dedicated sprints for On-Page SEO ($50), Technical SEO ($70), and white-hat Off-Page backlink outreach ($85) verified in Search Console.',
    outcome:
      'Delivers a crawl-clean, fast-loading website targeting 50+ commercial keywords with safe authority backlinks.',
    metrics: [
      { label: 'On-Page SEO', value: '$50' },
      { label: 'Technical SEO', value: '$70' },
      { label: 'Off-Page SEO', value: '$85' },
      { label: 'Keywords', value: '50+ Terms' },
    ],
    toolsUsed: ['Ahrefs', 'Google Search Console', 'Screaming Frog', 'GA4'],
  },
  {
    id: 'specialty-coffee-email',
    channel: 'email-marketing',
    channelName: 'Email Marketing',
    client: 'Retention Automation Blueprint',
    industry: 'Klaviyo & Mailchimp Flows',
    timeframe: '3–4 Day Build',
    headline: 'Automated Welcome, Cart Recovery & Post-Purchase Flows in Klaviyo',
    metricHighlight: '3 Core Flows Live',
    imageSrc: caseEmailImg,
    imageAlt: 'Email marketing retention automation blueprint workspace',
    beforeState:
      'Stores relying only on one-off newsletters lose 65%+ of abandoned checkouts and miss easy repeat orders from first-time buyers.',
    strategy:
      'Configure SPF/DKIM domain authentication, design clean mobile-first templates, and launch 3 automated lifecycle sequences triggered by subscriber and cart behavior.',
    outcome:
      'Builds an always-on retention engine that welcomes new leads, recovers abandoned carts automatically, and lifts customer repeat purchase rates.',
    metrics: [
      { label: 'Automations Built', value: '3 Core Flows' },
      { label: 'Inbox Auth', value: 'SPF · DKIM' },
      { label: 'Basic Setup', value: '$45' },
      { label: 'Standard Flows', value: '$140' },
    ],
    toolsUsed: ['Klaviyo', 'Mailchimp', 'Shopify'],
  },
  {
    id: 'ai-lead-crm-automation',
    channel: 'ai-automation',
    channelName: 'AI Automation',
    client: 'AI Lead & CRM Workflow Blueprint',
    industry: 'Make.com · Zapier · n8n',
    timeframe: '2–4 Day Build',
    headline: 'Instant AI Lead Qualification & CRM Routing Under 60 Seconds',
    metricHighlight: '< 60s Lead Response',
    imageSrc: heroWorkspaceImg,
    imageAlt: 'Automated marketing analytics and AI workflow dashboard',
    beforeState:
      'Businesses running Meta or Google Lead Ads lose up to 50% of leads when someone takes hours to manually check spreadsheets and send a first reply.',
    strategy:
      'Connect Meta/Google Lead Forms via Make.com or n8n to an AI response router that qualifies prospects, updates the CRM, and sends personalized follow-ups immediately.',
    outcome:
      'Cuts manual copy-paste work by 15+ hours a month and ensures every paid ad lead gets an instant, tailored response.',
    metrics: [
      { label: 'Lead Reply Speed', value: '< 60 Seconds' },
      { label: 'Platforms', value: 'Make · n8n · Zapier' },
      { label: 'Basic Workflow', value: '$50' },
      { label: 'Full AI System', value: '$160' },
    ],
    toolsUsed: ['Make.com', 'n8n', 'Zapier', 'OpenAI / Gemini API'],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01.',
    title: 'Free 15-Minute Diagnostic Audit',
    duration: 'Before You Pay',
    description:
      'Send your website, YouTube channel, or ad goal via WhatsApp or email. I share 3 immediate fixes—with zero obligation.',
  },
  {
    number: '02.',
    title: 'Pick Your Skill & Tier',
    duration: 'Day 1',
    description:
      'Start with a $25–$75 Basic starter gig or a Standard package tailored to the exact channel you want to grow first.',
  },
  {
    number: '03.',
    title: 'Tracking & Hands-On Execution',
    duration: 'Day 2–5',
    description:
      'I verify your tracking (GA4, GTM, Pixel/CAPI, or Search Console) and build your SEO fixes, ad campaigns, or email flows directly.',
  },
  {
    number: '04.',
    title: 'Walkthrough & Ongoing Support',
    duration: 'Post-Delivery',
    description:
      'You receive a clear report of everything completed plus direct WhatsApp & email support so you can scale with confidence.',
  },
];

export const TRUST_PILLARS: TrustPillar[] = [
  {
    id: 'p1',
    number: '01.',
    title: 'Skill-Specific, Transparent Pricing',
    highlight: 'Starting at $25',
    description:
      'You only pay for the exact channel you need—no inflated agency retainers. Start with a small audit or 3-video YouTube pack and expand when you see the quality.',
  },
  {
    id: 'p2',
    number: '02.',
    title: 'Direct WhatsApp & Email Communication',
    highlight: 'Fast 12h Response',
    description:
      'No middlemen or account managers. Message me directly on WhatsApp (+8801776827908) or email anytime during your project.',
  },
  {
    id: 'p3',
    number: '03.',
    title: 'Preview Value Before Placing an Order',
    highlight: 'Free Pre-Order Audit',
    description:
      'Unsure which package fits best? Send your URL or channel below and receive a free 15-minute diagnostic breakdown first.',
  },
];
