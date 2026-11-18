import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Mail,
  Menu,
  MessageCircle,
  X,
} from 'lucide-react';
import {
  CASE_STUDIES,
  CaseStudy,
  CONTACT_INFO,
  HERO_KPI_ITEMS,
  PORTRAIT_AVATAR_IMAGE,
  PORTRAIT_DESK_IMAGE,
  PROCESS_STEPS,
  SERVICES,
  ServiceId,
  ServiceItem,
  SkillTier,
  TRUST_PILLARS,
} from './data/portfolioData';
import { ResilientImage } from './components/ResilientImage';
import { ServiceModal } from './components/ServiceModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { PerformanceCharts } from './components/PerformanceCharts';
import { SkillPricingSection } from './components/SkillPricingSection';
import { SocialLinks } from './components/SocialLinks';
import { BrandLogo } from './components/BrandLogo';

type FilterOption = 'all' | ServiceId;

interface FormState {
  name: string;
  email: string;
  websiteUrl: string;
  budget: string;
  goals: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  services?: string;
  goals?: string;
}

const CONTACT_EMAIL = CONTACT_INFO.email;

const CASE_FILTERS: { id: FilterOption; label: string }[] = [
  { id: 'all', label: 'All Portfolio' },
  { id: 'seo', label: 'SEO' },
  { id: 'youtube-seo', label: 'YouTube SEO' },
  { id: 'facebook-ads', label: 'Facebook Ads' },
  { id: 'google-ads', label: 'Google Ads' },
  { id: 'email-marketing', label: 'Email Marketing' },
  { id: 'ai-automation', label: 'AI Automation' },
];

const BUDGET_OPTIONS = [
  '$25 – $60 (Starter Audit / Quick Setup)',
  '$75 – $180 (Single-Channel Growth Pack)',
  '$200 – $350 / month (Multi-Channel Retainer)',
  'Custom Scope (Let’s Discuss)',
];

export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);
  const [selectedCaseModal, setSelectedCaseModal] = useState<CaseStudy | null>(null);

  const [selectedServices, setSelectedServices] = useState<ServiceId[]>(['seo']);
  const [selectedPackageName, setSelectedPackageName] = useState<string>('');
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    websiteUrl: '',
    budget: BUDGET_OPTIONS[1],
    goals: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  useEffect(() => {
    const syncHash = () => {
      setShowDownloadModal(window.location.hash === '#download');
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  const filteredCases = useMemo(() => {
    if (activeFilter === 'all') return CASE_STUDIES;
    return CASE_STUDIES.filter((item) => item.channel === activeFilter);
  }, [activeFilter]);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectServiceForInquiry = (serviceId: ServiceId) => {
    setSubmittedSummary(null);
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev : [...prev, serviceId]
    );
    setFormErrors((prev) => ({ ...prev, services: undefined }));
    scrollToContact();
  };

  const handleSelectSkillTier = (serviceId: ServiceId, tier: SkillTier) => {
    const serviceLabel =
      SERVICES.find((s) => s.id === serviceId)?.shortTitle ?? serviceId;
    setSubmittedSummary(null);
    setSelectedServices([serviceId]);
    setSelectedPackageName(`${serviceLabel} — ${tier.title}`);
    setFormErrors((prev) => ({ ...prev, services: undefined }));
    setFormState((prev) => ({
      ...prev,
      budget: `${tier.price} ${tier.billingCycle} (${serviceLabel} ${tier.tierName})`,
    }));
    scrollToContact();
  };

  const toggleInquiryService = (serviceId: ServiceId) => {
    setSelectedServices((prev) => {
      const next = prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId];
      if (next.length > 0) {
        setFormErrors((err) => ({ ...err, services: undefined }));
      }
      return next;
    });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleCopyWhatsapp = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.whatsappDisplay);
      setCopiedWhatsapp(true);
      window.setTimeout(() => setCopiedWhatsapp(false), 2200);
    } catch {
      setCopiedWhatsapp(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: FormErrors = {};

    if (!formState.name.trim() || formState.name.trim().length < 2) {
      errors.name = 'Please enter your name or company name.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formState.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (selectedServices.length === 0) {
      errors.services = 'Select at least one service you would like to discuss.';
    }
    if (!formState.goals.trim() || formState.goals.trim().length < 10) {
      errors.goals = 'Share a short summary of your goals (at least 10 characters).';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const serviceTitles = selectedServices
      .map((id) => SERVICES.find((s) => s.id === id)?.shortTitle ?? id)
      .join(', ');

    const brief = [
      `Client: ${formState.name.trim()} (${formState.email.trim()})`,
      formState.websiteUrl.trim()
        ? `Website / Channel: ${formState.websiteUrl.trim()}`
        : null,
      selectedPackageName ? `Package Interest: ${selectedPackageName}` : null,
      `Services Requested: ${serviceTitles}`,
      `Budget Range: ${formState.budget}`,
      `Goals: ${formState.goals.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');

    setFormErrors({});
    setSubmittedSummary(brief);
  };

  const handleCopyBrief = async () => {
    if (!submittedSummary) return;
    try {
      await navigator.clipboard.writeText(submittedSummary);
      setCopiedBrief(true);
      window.setTimeout(() => setCopiedBrief(false), 2200);
    } catch {
      setCopiedBrief(false);
    }
  };

  return (
    <div id="moksedul-dm" className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#0B1120]">
      {/* Top Bar Contract: 3 zones, single row, clean wordmark, 5 concise links, 1 primary CTA */}
      <header className="sticky top-0 z-40 bg-[#F8F9FA]/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-8">
          <a
            href="#home"
            className="whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1D4ED8] rounded-sm"
            aria-label="Moksedul Islam DM — Home"
          >
            <BrandLogo />
          </a>

          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            <a
              href="#home"
              className="hover:text-[#0B1120] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:text-[#0B1120] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#services"
              className="hover:text-[#0B1120] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="hover:text-[#0B1120] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Portfolio
            </a>
            <a
              href="#packages"
              className="hover:text-[#0B1120] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="hover:text-[#0B1120] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={scrollToContact}
              className="hidden sm:inline-flex px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
            >
              Get Free Audit
            </button>
            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-expanded={mobileNavOpen}
              aria-label="Toggle navigation menu"
              className="md:hidden min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-white transition-colors"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="md:hidden border-t border-slate-200 bg-white px-4 py-3 flex flex-col gap-1"
          >
            {[
              { href: '#home', label: 'Home' },
              { href: '#about', label: 'About' },
              { href: '#services', label: 'Services' },
              { href: '#portfolio', label: 'Portfolio' },
              { href: '#packages', label: 'Pricing' },
              { href: '#contact', label: 'Contact' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className="py-2.5 px-2 text-sm font-medium text-slate-700 hover:text-[#1D4ED8] rounded-md"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileNavOpen(false);
                scrollToContact();
              }}
              className="mt-2 w-full px-4 py-2.5 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors text-center"
            >
              Get Free Audit
            </button>
          </nav>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Split (#home) with Bold Specialist Headline & Laptop Desk Portrait */}
        <section
          id="home"
          className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-16 lg:pb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-sm font-semibold text-[#1D4ED8] mb-3">
                Performance Marketing &amp; Search Growth
              </p>
              <h1
                className="font-display font-bold tracking-tight text-[#0B1120] leading-[1.06] text-balance"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.6rem)' }}
              >
                Moksedul Islam DM — Digital Marketing Specialist
              </h1>
              <p className="mt-3 font-display font-bold text-lg sm:text-xl text-[#1D4ED8] leading-snug text-balance">
                Meta Ads, Google Ads, YouTube Video SEO, Website SEO &amp; AI Automation Expert
              </p>
              <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-[60ch]">
                I help e-commerce stores, YouTube creators, and service businesses acquire qualified traffic, automate lead workflows, and scale sales across Paid Ads, Website &amp; YouTube SEO, Email Marketing, and AI Automation—with honest starter pricing from $25.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                >
                  <span>Request Free 15-Min Audit</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#15803D] hover:bg-[#166534] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#15803D]"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp Chat</span>
                </a>
                <a
                  href="#packages"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-3 text-sm font-medium text-[#0B1120] bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
                >
                  <span>See Starter Pricing ($25+)</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-1.5 font-medium hover:text-[#1D4ED8] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#1D4ED8]" aria-hidden="true" />
                  <span>{CONTACT_EMAIL}</span>
                </a>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono font-medium hover:text-[#15803D] transition-colors tabular-nums"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#15803D]" aria-hidden="true" />
                  <span>{CONTACT_INFO.whatsappDisplay}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="max-w-[500px] w-full mx-auto lg:ml-auto rounded-2xl overflow-hidden border border-slate-200 bg-white">
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <ResilientImage
                    src={PORTRAIT_DESK_IMAGE.src}
                    alt={PORTRAIT_DESK_IMAGE.alt}
                    fallbackTitle="Moksedul Islam DM — Digital Marketer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="px-5 py-4 border-t border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-base font-bold text-[#0B1120]">
                      Moksedul Islam DM
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Meta Ads · Google Ads · SEO · AI Automation
                    </p>
                  </div>
                  <p className="font-mono text-xs font-semibold text-[#1D4ED8] tabular-nums whitespace-nowrap shrink-0">
                    From $25
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width 4-column KPI strip below hero split */}
          <div className="mt-12 lg:mt-16 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {HERO_KPI_ITEMS.map((kpi) => (
              <div key={kpi.label}>
                <p className="font-mono text-2xl sm:text-3xl font-semibold text-[#0B1120] tabular-nums tracking-tight">
                  {kpi.value}
                </p>
                <p className="text-sm font-semibold text-slate-800 mt-1.5">
                  {kpi.label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{kpi.context}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dedicated About Section (#about) */}
        <section
          id="about"
          className="border-t border-slate-200 bg-white py-16 lg:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-5">
                <div className="max-w-[380px] mx-auto lg:mx-0 aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                  <ResilientImage
                    src={PORTRAIT_AVATAR_IMAGE.src}
                    alt={PORTRAIT_AVATAR_IMAGE.alt}
                    fallbackTitle="Moksedul Islam DM"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div>
                  <p className="text-sm font-medium text-[#1D4ED8] mb-2">
                    About Me
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1120] text-balance">
                    A Hands-On Digital Marketing Specialist Focused on Real Business Growth
                  </h2>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  <p>
                    I’m <strong className="font-semibold text-[#0B1120]">Moksedul Islam DM</strong>, a dedicated Digital Marketing Specialist trained across paid advertising, search optimization, email retention, and <strong className="font-semibold text-[#0B1120]">AI Automation</strong>. Whether you need profitable <strong className="font-semibold text-[#0B1120]">Meta Ads &amp; Google Ads</strong> campaigns, higher rankings as a <strong className="font-semibold text-[#0B1120]">YouTube Video SEO &amp; Website SEO Expert</strong>, or smart <strong className="font-semibold text-[#0B1120]">AI Marketing Workflows</strong> (Make.com, Zapier, n8n &amp; AI lead agents), I handle every technical step personally.
                  </p>
                  <p>
                    Unlike agencies that charge high retainers and hand work off to juniors, I work 1-on-1 with founders, online stores, and creators—connecting clean conversion tracking (GA4, GTM, Pixel &amp; CAPI) with AI-powered CRM follow-ups and transparent deliverables inside your own accounts.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-6 border-t border-slate-200">
                  <div>
                    <p className="text-xs text-slate-500">Paid Media</p>
                    <p className="text-sm font-semibold text-[#0B1120] mt-1">
                      Meta &amp; Google Ads
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Organic Search</p>
                    <p className="text-sm font-semibold text-[#0B1120] mt-1">
                      Website &amp; YouTube SEO
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">AI &amp; Retention</p>
                    <p className="text-sm font-semibold text-[#0B1120] mt-1">
                      AI Workflows &amp; Email
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Working Style</p>
                    <p className="text-sm font-semibold text-[#1D4ED8] mt-1">
                      1-on-1 · 12h Reply
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#0B1120] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Work With Me</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <a
                    href="#services"
                    className="text-sm font-medium text-[#1D4ED8] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                  >
                    Explore All 6 Services
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Core Services — Asymmetric Bento Grid with New-Seller Entry Pricing */}
        <section
          id="services"
          className="border-t border-slate-200 bg-[#F8F9FA] py-16 lg:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-[#1D4ED8] mb-2">
                  Core Services &amp; Rates
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0B1120] text-balance">
                  Six Specialized Services Priced for Small-Business Budgets
                </h2>
              </div>
              <p className="text-sm text-slate-600 max-w-md leading-relaxed">
                Start small with a low-risk audit or single campaign setup, verify the quality of my work, and scale from there. Click any card to inspect full deliverables.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {SERVICES.map((service, index) => {
                const isWide = index === 0 || index === 3 || index === 5;
                const colClass = isWide ? 'lg:col-span-2' : 'lg:col-span-1';

                return (
                  <article
                    key={service.id}
                    className={`${colClass} bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-colors hover:border-slate-300`}
                  >
                    <div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 mb-3">
                          <span>{service.number}</span>
                          <span aria-hidden="true" className="mx-2">·</span>
                          <span>{service.categoryLabel}</span>
                        </p>
                        <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#0B1120]">
                          {service.title}
                        </h3>
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                          {service.summary}
                        </p>
                      </div>

                      <div className="mt-6">
                        <p className="text-xs font-semibold text-slate-700 mb-2.5">
                          Included Deliverables
                        </p>
                        <ul className="space-y-2">
                          {service.deliverables.slice(0, 3).map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm text-slate-600"
                            >
                              <Check
                                className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                      <div className="text-xs text-slate-500">
                        <span>Starter </span>
                        <span className="font-mono font-semibold text-[#0B1120] tabular-nums">
                          {service.startingPrice}
                        </span>
                        <span aria-hidden="true" className="mx-2">·</span>
                        <span className="font-mono text-slate-700 tabular-nums">
                          {service.standardPrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedServiceModal(service)}
                          className="text-sm font-medium text-[#0B1120] hover:text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1D4ED8] rounded-sm"
                        >
                          View Scope
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectServiceForInquiry(service.id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-[#0B1120] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
                        >
                          <span>Order {service.shortTitle}</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 2: Real Work Samples, Proof & Execution Playbooks */}
        <section
          id="portfolio"
          className="border-t border-slate-200 bg-[#F8F9FA] py-16 lg:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-[#1D4ED8] mb-2">
                  Work Portfolio &amp; Verified Proof
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0B1120] text-balance">
                  Real Work Samples &amp; Playbooks Across All 6 Channels
                </h2>
              </div>

              <div
                className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-xl"
                role="tablist"
                aria-label="Filter work samples by marketing channel"
              >
                {CASE_FILTERS.map((filter) => {
                  const isActive = activeFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1D4ED8] ${
                        isActive
                          ? 'bg-white text-[#0B1120] shadow-xs'
                          : 'text-slate-600 hover:text-[#0B1120]'
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCases.map((study) => (
                <article
                  key={study.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between transition-colors hover:border-slate-300"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => setSelectedCaseModal(study)}
                      aria-label={`Inspect ${study.headline}`}
                      className={`aspect-[4/3] w-full overflow-hidden border-b border-slate-200 block text-left focus-visible:outline-2 focus-visible:outline-[#1D4ED8] ${
                        study.secondaryImageSrc
                          ? 'bg-slate-50 flex items-center justify-center gap-3 p-4'
                          : study.isScreenshot
                            ? 'bg-white p-2 flex items-center justify-center'
                            : 'bg-slate-100'
                      }`}
                    >
                      {study.secondaryImageSrc ? (
                        <>
                          <ResilientImage
                            src={study.imageSrc}
                            alt={study.imageAlt}
                            fallbackTitle={study.client}
                            className="max-h-[185px] w-auto object-contain rounded-lg border border-slate-200 bg-white"
                          />
                          <ResilientImage
                            src={study.secondaryImageSrc}
                            alt={study.secondaryImageAlt ?? study.imageAlt}
                            fallbackTitle={study.client}
                            className="max-h-[185px] w-auto object-contain rounded-lg border border-slate-200 bg-white"
                          />
                        </>
                      ) : (
                        <ResilientImage
                          src={study.imageSrc}
                          alt={study.imageAlt}
                          fallbackTitle={study.client}
                          className={
                            study.isScreenshot
                              ? 'w-full h-full object-contain'
                              : 'w-full h-full object-cover'
                          }
                        />
                      )}
                    </button>
                    <div className="p-6">
                      <p className="text-xs font-medium text-slate-500 mb-2">
                        <span>{study.channelName}</span>
                        <span aria-hidden="true" className="mx-2">·</span>
                        <span>{study.client}</span>
                        <span aria-hidden="true" className="mx-2">·</span>
                        <span>{study.timeframe}</span>
                      </p>
                      <h3 className="font-display text-lg font-semibold tracking-tight text-[#0B1120] leading-snug">
                        {study.headline}
                      </h3>
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {study.outcome}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-500">Verified Result</p>
                      <p className="font-mono text-sm font-semibold text-[#1D4ED8] tabular-nums">
                        {study.metricHighlight}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedCaseModal(study)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#0B1120] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
                    >
                      <span>{study.isScreenshot ? 'Inspect Proof' : 'View Blueprint'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 pt-14 border-t border-slate-200">
              <PerformanceCharts />
            </div>
          </div>
        </section>

        {/* Section 3: Skill-by-Skill Service Pricing & Direct Contact Strip */}
        <section
          id="packages"
          className="border-t border-slate-200 bg-white py-16 lg:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
            <SkillPricingSection onSelectTier={handleSelectSkillTier} />

            <div className="bg-[#F8F9FA] border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-xl">
                <p className="text-xs font-semibold text-[#1D4ED8] mb-1.5">
                  Direct Buyer Contact · 12h Response
                </p>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-[#0B1120]">
                  Need a Custom Package or Quick Answers Before Ordering?
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Message me directly on WhatsApp or Email to discuss your project scope, budget, or custom multi-channel bundle.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#15803D] hover:bg-[#166534] rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp ({CONTACT_INFO.whatsappDisplay})</span>
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-[#0B1120] bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Mail className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                  <span>Email Me</span>
                </a>
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Project Brief Form</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Working Process & New-Seller Trust Guarantee */}
        <section
          id="process"
          className="border-t border-slate-200 bg-[#F8F9FA] py-16 lg:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-20">
            <div>
              <div className="max-w-2xl mb-10">
                <p className="text-sm font-medium text-[#1D4ED8] mb-2">
                  Simple 4-Step Workflow
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0B1120] text-balance">
                  Fast Onboarding With Clear Deliverables From Day One
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PROCESS_STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-3">
                        <span>{step.number}</span>
                        <span aria-hidden="true" className="mx-2">·</span>
                        <span>{step.duration}</span>
                      </p>
                      <h3 className="font-display text-lg font-semibold text-[#0B1120]">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200">
              <div className="max-w-2xl mb-10">
                <p className="text-sm font-medium text-[#1D4ED8] mb-2">
                  Direct Seller Commitment
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0B1120]">
                  Why Early Clients Get Exceptional Value Working With Me
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {TRUST_PILLARS.map((pillar) => (
                  <article
                    key={pillar.id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-2">
                        <span>{pillar.number}</span>
                        <span aria-hidden="true" className="mx-2">·</span>
                        <span className="font-mono font-semibold text-[#1D4ED8]">
                          {pillar.highlight}
                        </span>
                      </p>
                      <h3 className="font-display text-lg font-semibold text-[#0B1120]">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Interactive Lead Capture & Free Growth Audit Request */}
        <section
          id="contact"
          className="border-t border-slate-200 bg-white py-16 lg:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                    <ResilientImage
                      src={PORTRAIT_AVATAR_IMAGE.src}
                      alt={PORTRAIT_AVATAR_IMAGE.alt}
                      fallbackTitle="Moksedul Islam DM"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0B1120]">
                      Moksedul Islam DM
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Digital Marketing Specialist · Direct Response
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-[#1D4ED8] mb-2">
                    Start With a Free Audit
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0B1120] text-balance">
                    Request Your Free 15-Minute Marketing Audit
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                    Share your website, YouTube channel, or ad goals. I will review it and send you 3 actionable recommendations plus a custom starter quote—no commitment required.
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-200 space-y-5">
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-1.5">
                      Direct Email
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1120] hover:text-[#1D4ED8] transition-colors"
                      >
                        <Mail className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                        <span>{CONTACT_EMAIL}</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-1.5">
                      WhatsApp Direct Chat
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`https://wa.me/${CONTACT_INFO.whatsappDigits}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1120] hover:text-[#1D4ED8] transition-colors font-mono tabular-nums"
                      >
                        <MessageCircle className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                        <span>{CONTACT_INFO.whatsappDisplay}</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyWhatsapp}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{copiedWhatsapp ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-2.5">
                      Connect on Social Media
                    </p>
                    <SocialLinks variant="cards" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-500">Response Time</p>
                      <p className="text-sm font-semibold text-[#0B1120] mt-0.5">
                        Within 12 Hours
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Hire Via</p>
                      <p className="text-sm font-semibold text-[#0B1120] mt-0.5">
                        WhatsApp · Fiverr · Upwork
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#F8F9FA] border border-slate-200 rounded-2xl p-6 sm:p-8">
                {submittedSummary ? (
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-semibold text-emerald-700 mb-1.5">
                        Audit Request Prepared
                      </p>
                      <h3 className="font-display text-2xl font-semibold text-[#0B1120]">
                        Thank you, {formState.name}. Your brief is ready.
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                        Send this structured brief directly to my WhatsApp or Email—I respond within 12 hours.
                      </p>
                    </div>

                    <pre className="bg-white border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {submittedSummary}
                    </pre>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`https://wa.me/${CONTACT_INFO.whatsappDigits}?text=${encodeURIComponent(
                          submittedSummary
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>Send via WhatsApp</span>
                      </a>
                      <a
                        href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                          `Marketing Growth Audit Request — ${formState.name}`
                        )}&body=${encodeURIComponent(submittedSummary)}`}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#0B1120] hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        <Mail className="w-4 h-4" aria-hidden="true" />
                        <span>Send via Email</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyBrief}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#0B1120] bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        <span>{copiedBrief ? 'Brief Copied' : 'Copy Brief'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubmittedSummary(null)}
                        className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-[#0B1120] transition-colors whitespace-nowrap shrink-0"
                      >
                        Edit Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1120] mb-2.5">
                        Which services do you need?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SERVICES.map((service) => {
                          const active = selectedServices.includes(service.id);
                          return (
                            <button
                              key={service.id}
                              type="button"
                              aria-pressed={active}
                              onClick={() => toggleInquiryService(service.id)}
                              className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1D4ED8] ${
                                active
                                  ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {service.shortTitle}
                            </button>
                          );
                        })}
                      </div>
                      {formErrors.services && (
                        <p className="mt-2 text-xs font-medium text-rose-600">
                          {formErrors.services}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="buyer-name"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Your Name / Brand
                        </label>
                        <input
                          id="buyer-name"
                          type="text"
                          value={formState.name}
                          onChange={(e) => {
                            setFormState((p) => ({ ...p, name: e.target.value }));
                            setFormErrors((err) => ({ ...err, name: undefined }));
                          }}
                          placeholder="e.g. Alex Morgan — Acme Store"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-[#0B1120] placeholder:text-slate-400 focus:outline-none focus:border-[#1D4ED8]"
                        />
                        {formErrors.name && (
                          <p className="mt-1.5 text-xs font-medium text-rose-600">
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="buyer-email"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Work Email
                        </label>
                        <input
                          id="buyer-email"
                          type="email"
                          value={formState.email}
                          onChange={(e) => {
                            setFormState((p) => ({ ...p, email: e.target.value }));
                            setFormErrors((err) => ({ ...err, email: undefined }));
                          }}
                          placeholder="you@company.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-[#0B1120] placeholder:text-slate-400 focus:outline-none focus:border-[#1D4ED8]"
                        />
                        {formErrors.email && (
                          <p className="mt-1.5 text-xs font-medium text-rose-600">
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="buyer-url"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Website or YouTube Channel URL
                        </label>
                        <input
                          id="buyer-url"
                          type="url"
                          value={formState.websiteUrl}
                          onChange={(e) =>
                            setFormState((p) => ({ ...p, websiteUrl: e.target.value }))
                          }
                          placeholder="https://yourstore.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-[#0B1120] placeholder:text-slate-400 focus:outline-none focus:border-[#1D4ED8]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="buyer-budget"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Project Budget
                        </label>
                        <select
                          id="buyer-budget"
                          value={formState.budget}
                          onChange={(e) =>
                            setFormState((p) => ({ ...p, budget: e.target.value }))
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-[#0B1120] focus:outline-none focus:border-[#1D4ED8]"
                        >
                          {BUDGET_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                          {!BUDGET_OPTIONS.includes(formState.budget) && (
                            <option value={formState.budget}>{formState.budget}</option>
                          )}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="buyer-goals"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        What would you like help with first?
                      </label>
                      <textarea
                        id="buyer-goals"
                        rows={4}
                        value={formState.goals}
                        onChange={(e) => {
                          setFormState((p) => ({ ...p, goals: e.target.value }));
                          setFormErrors((err) => ({ ...err, goals: undefined }));
                        }}
                        placeholder="Share your store/channel link, what goal you want to hit, and whether you want a starter audit or full campaign setup..."
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-[#0B1120] placeholder:text-slate-400 focus:outline-none focus:border-[#1D4ED8]"
                      />
                      {formErrors.goals && (
                        <p className="mt-1.5 text-xs font-medium text-rose-600">
                          {formErrors.goals}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <p className="text-xs text-slate-500">
                        Zero obligation. Includes a free 15-minute Loom or PDF audit.
                      </p>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                      >
                        <span>Request Free Audit</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 bg-[#F8F9FA] py-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <BrandLogo size="sm" showTagline={false} />
              <p className="text-xs text-slate-500 mt-2">
                SEO · YouTube SEO · Facebook Ads · Google Ads · Email Marketing · AI Automation
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-600">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="hover:text-[#0B1120] transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0B1120] transition-colors font-mono tabular-nums"
              >
                WhatsApp: {CONTACT_INFO.whatsappDisplay}
              </a>
            </div>

            <SocialLinks variant="compact" />
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex flex-wrap items-center gap-6 font-medium text-slate-600">
              <a href="#home" className="hover:text-[#0B1120] transition-colors">
                Home
              </a>
              <a href="#about" className="hover:text-[#0B1120] transition-colors">
                About
              </a>
              <a href="#services" className="hover:text-[#0B1120] transition-colors">
                Services
              </a>
              <a href="#portfolio" className="hover:text-[#0B1120] transition-colors">
                Portfolio
              </a>
              <a href="#packages" className="hover:text-[#0B1120] transition-colors">
                Pricing
              </a>
              <a href="#contact" className="hover:text-[#0B1120] transition-colors">
                Contact
              </a>
            </div>
            <p>© {new Date().getFullYear()} Moksedul Islam DM. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Always-accessible Quick Contact Bar */}
      <div
        aria-label="Quick contact options"
        className="fixed bottom-4 right-4 z-30 flex items-center gap-2"
      >
        <a
          href={`https://wa.me/${CONTACT_INFO.whatsappDigits}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#15803D] hover:bg-[#166534] rounded-xl shadow-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803D]"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
        <button
          type="button"
          onClick={scrollToContact}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#0B1120] hover:bg-[#1D4ED8] rounded-xl shadow-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
        >
          <Mail className="w-4 h-4" aria-hidden="true" />
          <span>Contact</span>
        </button>
      </div>

      <ServiceModal
        service={selectedServiceModal}
        onClose={() => setSelectedServiceModal(null)}
        onSelectForInquiry={handleSelectServiceForInquiry}
      />

      <CaseStudyModal
        caseStudy={selectedCaseModal}
        onClose={() => setSelectedCaseModal(null)}
        onRequestSimilar={handleSelectServiceForInquiry}
      />

      {showDownloadModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="download-modal-title"
        >
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#1D4ED8] mb-1">
                  Single-File Website Export
                </p>
                <h3
                  id="download-modal-title"
                  className="font-display text-xl font-semibold text-[#0B1120]"
                >
                  Download Complete Portfolio (index.html)
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close download modal"
                onClick={() => {
                  window.location.hash = 'moksedul-dm';
                }}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-slate-500 hover:text-[#0B1120] hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              This single <span className="font-mono text-xs text-[#0B1120]">index.html</span> file bundles your entire website, styles, interactive charts, and all images inside one file ready for hosting.
            </p>

            <a
              href="/moksedul-dm-portfolio.html"
              download="index.html"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Download index.html (5.8 MB)</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
