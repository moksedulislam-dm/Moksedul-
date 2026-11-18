import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ServiceId } from '../data/portfolioData';

interface ChannelModel {
  id: ServiceId;
  label: string;
  inputLabel: string;
  min: number;
  max: number;
  step: number;
  defaultVal: number;
  unitPrefix: string;
  unitSuffix: string;
  timeline: string;
  recommendedPackage: string;
  compute: (val: number) => {
    primaryLabel: string;
    primaryValue: string;
    secondaryLabel: string;
    secondaryValue: string;
    tertiaryLabel: string;
    tertiaryValue: string;
    note: string;
  };
}

const CHANNEL_MODELS: ChannelModel[] = [
  {
    id: 'facebook-ads',
    label: 'Facebook Ads',
    inputLabel: 'Monthly Ad Spend Budget',
    min: 300,
    max: 5000,
    step: 100,
    defaultVal: 600,
    unitPrefix: '$',
    unitSuffix: '/mo',
    timeline: 'Recommended: $60 Setup or $150 Pack',
    recommendedPackage: 'Single-Channel Growth Pack ($120–$150)',
    compute: (spend) => {
      const clicksLow = Math.round(spend / 1.35);
      const clicksHigh = Math.round(spend / 0.85);
      const revLow = Math.round(spend * 2.5);
      const revHigh = Math.round(spend * 4.2);
      return {
        primaryLabel: 'Realistic Revenue Target',
        primaryValue: `$${revLow.toLocaleString()}–$${revHigh.toLocaleString()}`,
        secondaryLabel: 'Target ROAS Range',
        secondaryValue: '2.5x – 4.2x',
        tertiaryLabel: 'Est. Monthly Clicks',
        tertiaryValue: `${clicksLow.toLocaleString()}–${clicksHigh.toLocaleString()}`,
        note: 'Starter budget projection assuming verified Pixel/CAPI tracking and 3–5 ad creative tests.',
      };
    },
  },
  {
    id: 'google-ads',
    label: 'Google Ads',
    inputLabel: 'Monthly Search Ad Spend',
    min: 300,
    max: 5000,
    step: 100,
    defaultVal: 700,
    unitPrefix: '$',
    unitSuffix: '/mo',
    timeline: 'Recommended: $75 Setup or $180 Full Build',
    recommendedPackage: 'Google Ads Setup + GTM Tracking ($75–$180)',
    compute: (spend) => {
      const clicks = Math.round(spend / 1.6);
      const leadsLow = Math.max(4, Math.round(clicks * 0.05));
      const leadsHigh = Math.max(8, Math.round(clicks * 0.09));
      const cplLow = Math.round(spend / leadsHigh);
      const cplHigh = Math.round(spend / leadsLow);
      return {
        primaryLabel: 'Est. High-Intent Leads',
        primaryValue: `${leadsLow}–${leadsHigh} / mo`,
        secondaryLabel: 'Projected Cost Per Lead',
        secondaryValue: `$${cplLow} – $${cplHigh}`,
        tertiaryLabel: 'Exact-Match Clicks',
        tertiaryValue: `~${clicks.toLocaleString()}`,
        note: 'Built around exact/phrase match buyer intent with negative keywords to protect small budgets.',
      };
    },
  },
  {
    id: 'seo',
    label: 'SEO',
    inputLabel: 'Current Monthly Organic Visits',
    min: 100,
    max: 10000,
    step: 100,
    defaultVal: 500,
    unitPrefix: '',
    unitSuffix: ' visits',
    timeline: 'Recommended: $45 Audit or $120 On-Page Sprint',
    recommendedPackage: 'SEO Technical + On-Page Sprint ($45–$120)',
    compute: (visits) => {
      const targetLow = Math.round(visits * 1.8);
      const targetHigh = Math.round(visits * 2.6);
      const keywords = Math.max(15, Math.round(visits / 40) + 12);
      return {
        primaryLabel: '90-to-150 Day Traffic Target',
        primaryValue: `${targetLow.toLocaleString()}–${targetHigh.toLocaleString()}`,
        secondaryLabel: 'Keywords Targeted',
        secondaryValue: `${keywords}–${keywords + 20} terms`,
        tertiaryLabel: 'Projected Lift',
        tertiaryValue: '+80% – +160%',
        note: 'Combines technical fixes, commercial page optimization, and internal linking structure.',
      };
    },
  },
  {
    id: 'youtube-seo',
    label: 'YouTube SEO',
    inputLabel: 'Videos Uploaded Per Month',
    min: 2,
    max: 16,
    step: 1,
    defaultVal: 4,
    unitPrefix: '',
    unitSuffix: ' videos/mo',
    timeline: 'Recommended: $25 Starter or $75 Channel Pack',
    recommendedPackage: 'YouTube SEO Optimization Pack ($25–$75)',
    compute: (videos) => {
      const viewsLow = videos * 3500;
      const viewsHigh = videos * 12000;
      const subsLow = Math.round(viewsLow * 0.015);
      const subsHigh = Math.round(viewsHigh * 0.022);
      return {
        primaryLabel: '90-Day Search & Browse Views',
        primaryValue: `${(viewsLow / 1000).toFixed(1)}K–${(viewsHigh / 1000).toFixed(0)}K`,
        secondaryLabel: 'Target Search CTR',
        secondaryValue: '6.0% – 8.2%',
        tertiaryLabel: 'Est. New Subscribers',
        tertiaryValue: `+${subsLow.toLocaleString()}–${subsHigh.toLocaleString()}`,
        note: 'Driven by search-volume keyword titles, structured tags, chapters, and playlist silos.',
      };
    },
  },
  {
    id: 'email-marketing',
    label: 'Email Marketing',
    inputLabel: 'Current Monthly Store Sales',
    min: 1000,
    max: 30000,
    step: 500,
    defaultVal: 5000,
    unitPrefix: '$',
    unitSuffix: '/mo',
    timeline: 'Recommended: $45 Template or $140 3-Flow Build',
    recommendedPackage: 'Email Marketing 3-Flow Build ($45–$140)',
    compute: (rev) => {
      const addLow = Math.round(rev * 0.18);
      const addHigh = Math.round(rev * 0.30);
      return {
        primaryLabel: 'Added Automated Email Sales',
        primaryValue: `+$${addLow.toLocaleString()}–$${addHigh.toLocaleString()}/mo`,
        secondaryLabel: 'Target Email Attribution',
        secondaryValue: '18% – 30%',
        tertiaryLabel: 'Core Flows Built',
        tertiaryValue: '3 Automations',
        note: 'Includes domain authentication (SPF/DKIM), Welcome Series, Abandoned Cart, and Post-Purchase.',
      };
    },
  },
  {
    id: 'ai-automation',
    label: 'AI Automation',
    inputLabel: 'Weekly Manual Marketing Hours',
    min: 2,
    max: 25,
    step: 1,
    defaultVal: 6,
    unitPrefix: '',
    unitSuffix: ' hrs/wk',
    timeline: 'Recommended: $50 Basic or $160 AI System',
    recommendedPackage: 'Multi-Step AI Lead & Follow-Up System ($50–$160)',
    compute: (hours) => {
      const savedLow = Math.round(hours * 3.0);
      const savedHigh = Math.round(hours * 3.6);
      return {
        primaryLabel: 'Monthly Hours Automated',
        primaryValue: `${savedLow}–${savedHigh} hrs / mo`,
        secondaryLabel: 'Lead Response Speed',
        secondaryValue: '< 60 Seconds',
        tertiaryLabel: 'Workflows Deployed',
        tertiaryValue: '1–4 Systems',
        note: 'Built with Make.com, Zapier, or n8n for lead routing, AI follow-ups, and automated reporting.',
      };
    },
  },
];

interface GrowthEstimatorProps {
  onApplyEstimate: (channel: ServiceId, summaryNote: string) => void;
}

export function GrowthEstimator({ onApplyEstimate }: GrowthEstimatorProps) {
  const [activeChannelId, setActiveChannelId] = useState<ServiceId>('facebook-ads');
  const [sliderValues, setSliderValues] = useState<Record<ServiceId, number>>({
    'facebook-ads': 600,
    'google-ads': 700,
    seo: 500,
    'youtube-seo': 4,
    'email-marketing': 5000,
    'ai-automation': 6,
  });

  const activeModel = useMemo(
    () => CHANNEL_MODELS.find((m) => m.id === activeChannelId) ?? CHANNEL_MODELS[0],
    [activeChannelId]
  );

  const currentVal = sliderValues[activeModel.id];
  const projection = useMemo(() => activeModel.compute(currentVal), [activeModel, currentVal]);

  const formattedInput = `${activeModel.unitPrefix}${currentVal.toLocaleString()}${activeModel.unitSuffix}`;

  const handleLockEstimate = () => {
    const summary = `Estimator brief (${activeModel.label}): ${formattedInput} → ${projection.primaryLabel}: ${projection.primaryValue}. Suggested option: ${activeModel.recommendedPackage}.`;
    onApplyEstimate(activeModel.id, summary);
  };

  return (
    <div className="bg-[#0F172A] text-slate-100 rounded-2xl border border-slate-800 p-6 sm:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div>
            <p className="text-xs font-medium text-blue-400 mb-2">
              Starter Budget &amp; ROI Planner
            </p>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white text-balance">
              Plan Your Realistic Growth &amp; Service Budget
            </h3>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              Select a channel and set your starter monthly budget or volume to preview realistic targets and the best entry package.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400 mb-2.5">Select Channel</p>
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Marketing channel estimator selector"
            >
              {CHANNEL_MODELS.map((model) => {
                const isSelected = model.id === activeModel.id;
                return (
                  <button
                    key={model.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveChannelId(model.id)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-400 ${
                      isSelected
                        ? 'bg-[#1D4ED8] text-white'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700'
                    }`}
                  >
                    {model.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between gap-4 mb-2.5">
              <label
                htmlFor="estimator-slider"
                className="text-sm font-medium text-slate-200"
              >
                {activeModel.inputLabel}
              </label>
              <span className="font-mono text-base font-semibold text-white tabular-nums">
                {formattedInput}
              </span>
            </div>
            <input
              id="estimator-slider"
              type="range"
              min={activeModel.min}
              max={activeModel.max}
              step={activeModel.step}
              value={currentVal}
              onChange={(e) =>
                setSliderValues((prev) => ({
                  ...prev,
                  [activeModel.id]: Number(e.target.value),
                }))
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
            />
            <div className="flex justify-between text-xs font-mono text-slate-400 mt-2 tabular-nums">
              <span>
                {activeModel.unitPrefix}
                {activeModel.min.toLocaleString()}
              </span>
              <span>
                {activeModel.unitPrefix}
                {activeModel.max.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <span className="text-sm font-medium text-slate-200">
              {activeModel.label} Benchmark Output
            </span>
            <span className="text-xs font-mono text-blue-400">
              {activeModel.timeline}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-3 pb-5 border-b border-slate-800/80">
              <p className="text-xs text-slate-400 mb-1">{projection.primaryLabel}</p>
              <p className="font-mono text-3xl sm:text-4xl font-semibold text-white tabular-nums tracking-tight">
                {projection.primaryValue}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">{projection.secondaryLabel}</p>
              <p className="font-mono text-xl font-semibold text-blue-400 tabular-nums">
                {projection.secondaryValue}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">{projection.tertiaryLabel}</p>
              <p className="font-mono text-xl font-semibold text-white tabular-nums">
                {projection.tertiaryValue}
              </p>
            </div>
            <div className="flex items-end sm:justify-end">
              <button
                type="button"
                onClick={handleLockEstimate}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-400"
              >
                <span>Include in Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            {projection.note}
          </p>
        </div>
      </div>
    </div>
  );
}
