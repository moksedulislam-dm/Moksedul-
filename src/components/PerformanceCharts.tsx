import { useState } from 'react';

interface MetaWeekPoint {
  week: string;
  roas: number;
  cpa: number;
  action: string;
}

const META_ADS_SERIES: MetaWeekPoint[] = [
  { week: 'Wk 1', roas: 1.6, cpa: 29, action: 'Baseline pixel audit & CAPI setup' },
  { week: 'Wk 2', roas: 2.1, cpa: 24, action: 'Broad vs. interest split launch' },
  { week: 'Wk 3', roas: 2.6, cpa: 20, action: 'Cut 3 high-CPA ad sets early' },
  { week: 'Wk 4', roas: 2.9, cpa: 18, action: 'Creative hook A/B winner scaled' },
  { week: 'Wk 5', roas: 3.3, cpa: 16, action: 'Warm DPA retargeting added' },
  { week: 'Wk 6', roas: 3.6, cpa: 15, action: 'Fresh UGC variation rotated in' },
  { week: 'Wk 7', roas: 3.8, cpa: 14, action: 'Budget shifted +20% to top ad set' },
  { week: 'Wk 8', roas: 4.1, cpa: 13, action: 'Stable scaling at target CPA' },
];

interface GoogleSearchBar {
  stage: string;
  intentPct: number;
  wastedPct: number;
  cpl: number;
  note: string;
}

const GOOGLE_ADS_AUDIT: GoogleSearchBar[] = [
  {
    stage: 'Unoptimized Broad Match',
    intentPct: 62,
    wastedPct: 38,
    cpl: 68,
    note: '38% of budget lost to DIY & informational search queries',
  },
  {
    stage: 'Week 2: Negative List Applied',
    intentPct: 83,
    wastedPct: 17,
    cpl: 44,
    note: 'Blocked 320+ non-buying terms & tightened phrase match',
  },
  {
    stage: 'Week 4: Exact Match + GTM',
    intentPct: 95,
    wastedPct: 5,
    cpl: 32,
    note: '95% spend concentrated on high-intent buyer searches',
  },
];

interface SearchDiscoveryPoint {
  month: string;
  seoClicks: number;
  ytViewsK: number;
  ctr: number;
}

const ORGANIC_DISCOVERY_SERIES: SearchDiscoveryPoint[] = [
  { month: 'Baseline', seoClicks: 420, ytViewsK: 2.4, ctr: 2.9 },
  { month: 'Month 1', seoClicks: 640, ytViewsK: 5.8, ctr: 4.3 },
  { month: 'Month 2', seoClicks: 980, ytViewsK: 11.4, ctr: 5.8 },
  { month: 'Month 3', seoClicks: 1460, ytViewsK: 19.6, ctr: 7.1 },
];

export function PerformanceCharts() {
  const [metaMode, setMetaMode] = useState<'roas' | 'cpa'>('roas');
  const [activeMetaIdx, setActiveMetaIdx] = useState<number>(7);
  const [activeGoogleIdx, setActiveGoogleIdx] = useState<number>(2);

  const selectedMetaPoint = META_ADS_SERIES[activeMetaIdx];
  const selectedGoogleStage = GOOGLE_ADS_AUDIT[activeGoogleIdx];

  // SVG coordinate helper for Meta Ads line chart (width 480, height 180)
  const chartW = 480;
  const chartH = 170;
  const padX = 28;
  const padY = 20;
  const plotW = chartW - padX * 2;
  const plotH = chartH - padY * 2;

  const points = META_ADS_SERIES.map((pt, idx) => {
    const x = padX + (idx / (META_ADS_SERIES.length - 1)) * plotW;
    const norm =
      metaMode === 'roas'
        ? (pt.roas - 1.0) / (4.5 - 1.0)
        : (pt.cpa - 10) / (32 - 10);
    const y = padY + plotH - norm * plotH;
    return { x, y, pt, idx };
  });

  const polylineStr = points.map((p) => `${p.x},${p.y}`).join(' ');
  const areaStr = `${points[0].x},${padY + plotH} ${polylineStr} ${points[points.length - 1].x},${padY + plotH}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#1D4ED8] mb-2">
            Research-Backed Performance Models
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0B1120] text-balance">
            Meta Ads, Google Ads &amp; Search Growth Benchmarks
          </h3>
        </div>
        <p className="text-xs text-slate-500 max-w-md leading-relaxed">
          Interactive channel models illustrating how CAPI tracking, negative keyword sculpting, and search packaging improve efficiency across 8–12 weeks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card 1: Meta Ads ROAS / CPA Curve */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Meta Ads (Facebook &amp; Instagram) · 8-Week Model
                </p>
                <h4 className="font-display text-lg font-semibold text-[#0B1120] mt-0.5">
                  {metaMode === 'roas'
                    ? 'Blended ROAS Scaling Curve (1.6x → 4.1x)'
                    : 'Cost Per Acquisition Reduction ($29 → $13)'}
                </h4>
              </div>

              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setMetaMode('roas')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    metaMode === 'roas'
                      ? 'bg-white text-[#0B1120] shadow-xs'
                      : 'text-slate-600 hover:text-[#0B1120]'
                  }`}
                >
                  ROAS Curve
                </button>
                <button
                  type="button"
                  onClick={() => setMetaMode('cpa')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    metaMode === 'cpa'
                      ? 'bg-white text-[#0B1120] shadow-xs'
                      : 'text-slate-600 hover:text-[#0B1120]'
                  }`}
                >
                  CPA Drop
                </button>
              </div>
            </div>

            <div className="w-full overflow-hidden">
              <svg
                viewBox={`0 0 ${chartW} ${chartH + 26}`}
                className="w-full h-auto"
                role="img"
                aria-label="Meta Ads 8-week optimization chart"
              >
                <defs>
                  <linearGradient id="metaAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={metaMode === 'roas' ? '#1D4ED8' : '#0F766E'}
                      stopOpacity="0.18"
                    />
                    <stop
                      offset="100%"
                      stopColor={metaMode === 'roas' ? '#1D4ED8' : '#0F766E'}
                      stopOpacity="0.01"
                    />
                  </linearGradient>
                </defs>

                {[0, 0.33, 0.66, 1].map((t) => {
                  const yPos = padY + plotH * t;
                  return (
                    <line
                      key={t}
                      x1={padX}
                      y1={yPos}
                      x2={chartW - padX}
                      y2={yPos}
                      stroke="#E2E8F0"
                      strokeDasharray="3 3"
                    />
                  );
                })}

                <polygon points={areaStr} fill="url(#metaAreaGrad)" />
                <polyline
                  fill="none"
                  stroke={metaMode === 'roas' ? '#1D4ED8' : '#0F766E'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={polylineStr}
                />

                {points.map(({ x, y, pt, idx }) => {
                  const isActive = idx === activeMetaIdx;
                  const strokeColor = metaMode === 'roas' ? '#1D4ED8' : '#0F766E';
                  return (
                    <g
                      key={pt.week}
                      className="cursor-pointer"
                      onClick={() => setActiveMetaIdx(idx)}
                      onMouseEnter={() => setActiveMetaIdx(idx)}
                    >
                      <circle cx={x} cy={y} r={16} fill="transparent" />
                      <circle
                        cx={x}
                        cy={y}
                        r={isActive ? 5.5 : 3.5}
                        fill={isActive ? strokeColor : '#FFFFFF'}
                        stroke={strokeColor}
                        strokeWidth="2"
                      />
                      <text
                        x={x}
                        y={chartH + 16}
                        textAnchor="middle"
                        className="fill-slate-500 text-[10px] font-mono"
                      >
                        {pt.week}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-slate-500">{selectedMetaPoint.week} ROAS</p>
                <p className="font-mono text-base font-semibold text-[#1D4ED8] tabular-nums">
                  {selectedMetaPoint.roas.toFixed(1)}x
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Est. CPA</p>
                <p className="font-mono text-base font-semibold text-[#0B1120] tabular-nums">
                  ${selectedMetaPoint.cpa}
                </p>
              </div>
            </div>
            <p className="text-xs font-medium text-slate-700">
              Action: {selectedMetaPoint.action}
            </p>
          </div>
        </div>

        {/* Card 2: Google Ads Wasted Spend vs High-Intent Capture */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Google Ads · Search Intent Audit
            </p>
            <h4 className="font-display text-lg font-semibold text-[#0B1120] mt-0.5">
              Eliminating Wasted Search Spend
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Click a stage to inspect how negative keywords and exact-match ad groups shift budget away from non-converting clicks.
            </p>

            <div className="mt-6 space-y-4">
              {GOOGLE_ADS_AUDIT.map((bar, idx) => {
                const isSelected = idx === activeGoogleIdx;
                return (
                  <button
                    key={bar.stage}
                    type="button"
                    onClick={() => setActiveGoogleIdx(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-colors ${
                      isSelected
                        ? 'border-[#1D4ED8] bg-blue-50/40'
                        : 'border-slate-200 hover:border-slate-300 bg-[#F8F9FA]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold text-[#0B1120]">
                        {bar.stage}
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#1D4ED8] tabular-nums">
                        ${bar.cpl} CPL
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-md overflow-hidden flex">
                      <div
                        style={{ width: `${bar.intentPct}%` }}
                        className="bg-[#1D4ED8] h-full"
                      />
                      <div
                        style={{ width: `${bar.wastedPct}%` }}
                        className="bg-rose-400 h-full"
                      />
                    </div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1.5 tabular-nums">
                      <span>{bar.intentPct}% Buyer Intent</span>
                      <span>{bar.wastedPct}% Wasted</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-5 pt-4 border-t border-slate-200 text-xs text-slate-600">
            {selectedGoogleStage.note}
          </p>
        </div>
      </div>

      {/* Row 2: Organic SEO & YouTube Search Discovery Trajectory */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-medium text-slate-500">
              SEO &amp; YouTube SEO · 90-Day Discovery Trajectory
            </p>
            <h4 className="font-display text-lg font-semibold text-[#0B1120] mt-0.5">
              Compounding Search Clicks, Video Views &amp; CTR Lift
            </h4>
          </div>
          <p className="font-mono text-xs font-medium text-[#1D4ED8] tabular-nums">
            Target CTR: 2.9% → 7.1% · +247% Organic Clicks
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ORGANIC_DISCOVERY_SERIES.map((step) => {
            const clickWidth = Math.round((step.seoClicks / 1500) * 100);
            const ytWidth = Math.round((step.ytViewsK / 20) * 100);
            return (
              <div
                key={step.month}
                className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0B1120]">
                    {step.month}
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#1D4ED8] tabular-nums">
                    {step.ctr}% CTR
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                    <span>Google SEO Clicks</span>
                    <span className="font-mono font-semibold tabular-nums">
                      {step.seoClicks.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${clickWidth}%` }}
                      className="h-full bg-[#0B1120]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                    <span>YouTube Search Views</span>
                    <span className="font-mono font-semibold tabular-nums">
                      {step.ytViewsK}K
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${ytWidth}%` }}
                      className="h-full bg-[#1D4ED8]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
