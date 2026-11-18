import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import {
  ServiceId,
  SKILL_PRICING_GROUPS,
  SkillTier,
} from '../data/portfolioData';

interface SkillPricingSectionProps {
  onSelectTier: (serviceId: ServiceId, tier: SkillTier) => void;
}

export function SkillPricingSection({ onSelectTier }: SkillPricingSectionProps) {
  const [activeSkillId, setActiveSkillId] = useState<ServiceId>('seo');

  const activeGroup =
    SKILL_PRICING_GROUPS.find((g) => g.serviceId === activeSkillId) ??
    SKILL_PRICING_GROUPS[0];

  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#1D4ED8] mb-2">
            Skill-by-Skill Service Pricing
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0B1120] text-balance">
            Dedicated Packages for Each Marketing Skill
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Select any of my 6 core skills below to compare starter packages, standard builds, and monthly management rates.
          </p>
        </div>

        <div
          className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl"
          role="tablist"
          aria-label="Select skill to view pricing tiers"
        >
          {SKILL_PRICING_GROUPS.map((group) => {
            const isSelected = group.serviceId === activeGroup.serviceId;
            return (
              <button
                key={group.serviceId}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveSkillId(group.serviceId)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1D4ED8] ${
                  isSelected
                    ? 'bg-[#0B1120] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B1120]'
                }`}
              >
                {group.serviceLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Skill Title Banner */}
      <div className="pb-2 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#0B1120]">
            {activeGroup.headline}
          </h3>
          <p className="text-sm text-slate-600 mt-1">{activeGroup.subheadline}</p>
        </div>
      </div>

      {/* 3 Tiers for the Selected Skill */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {activeGroup.tiers.map((tier) => (
          <article
            key={`${activeGroup.serviceId}-${tier.tierName}`}
            className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between border ${
              tier.recommended
                ? 'bg-[#0B1120] text-white border-[#0B1120]'
                : 'bg-[#F8F9FA] text-[#0B1120] border-slate-200'
            }`}
          >
            <div>
              <p
                className={`text-xs font-medium mb-2 ${
                  tier.recommended ? 'text-blue-400' : 'text-slate-500'
                }`}
              >
                <span>
                  {tier.tierName.includes('SEO')
                    ? tier.tierName
                    : `${tier.tierName} Tier`}
                </span>
                <span aria-hidden="true" className="mx-2">·</span>
                <span>{tier.turnaround}</span>
              </p>

              <h4 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
                {tier.title}
              </h4>

              <p
                className={`text-sm mt-2 leading-relaxed ${
                  tier.recommended ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {tier.summary}
              </p>

              <div
                className={`my-6 py-5 border-y ${
                  tier.recommended ? 'border-slate-800' : 'border-slate-200'
                }`}
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-3xl font-semibold tabular-nums">
                    {tier.price}
                  </span>
                  <span
                    className={`text-xs ${
                      tier.recommended ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {tier.billingCycle}
                  </span>
                </div>
              </div>

              <ul className="space-y-3">
                {tier.deliverables.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-2.5 text-sm ${
                      tier.recommended ? 'text-slate-200' : 'text-slate-600'
                    }`}
                  >
                    <Check
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        tier.recommended ? 'text-blue-400' : 'text-[#1D4ED8]'
                      }`}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectTier(activeGroup.serviceId, tier)}
              className={`mt-8 w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                tier.recommended
                  ? 'bg-[#1D4ED8] hover:bg-[#2563EB] text-white focus-visible:outline-blue-400'
                  : 'bg-[#0B1120] hover:bg-[#1D4ED8] text-white focus-visible:outline-[#1D4ED8]'
              }`}
            >
              <span>
                Order{' '}
                {tier.tierName.includes('SEO')
                  ? tier.tierName
                  : `${activeGroup.serviceLabel} ${tier.tierName}`}{' '}
                ({tier.price})
              </span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>

      {/* All-5-Skills Quick Rate Matrix Table */}
      <div className="bg-[#F8F9FA] border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white">
          <h4 className="font-display text-base font-semibold text-[#0B1120]">
            All 6 Skills — Quick Price Comparison
          </h4>
          <p className="text-xs text-slate-500">
            Click any skill row to inspect its deliverables above
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-600">
                <th className="py-3.5 px-6">Service Skill</th>
                <th className="py-3.5 px-4">Basic Starter</th>
                <th className="py-3.5 px-4">Standard Growth</th>
                <th className="py-3.5 px-4">Monthly Retainer</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {SKILL_PRICING_GROUPS.map((group) => {
                const tier1 = group.tiers[0];
                const tier2 = group.tiers[1];
                const tier3 = group.tiers[2];
                const isActive = group.serviceId === activeGroup.serviceId;
                const isSeo = group.serviceId === 'seo';
                return (
                  <tr
                    key={group.serviceId}
                    className={`transition-colors ${
                      isActive ? 'bg-blue-50/50' : 'hover:bg-white'
                    }`}
                  >
                    <td className="py-4 px-6 font-semibold text-[#0B1120] whitespace-nowrap">
                      {group.serviceLabel}
                      {isSeo && (
                        <span className="block text-[11px] font-normal text-slate-500 mt-0.5">
                          On-Page · Off-Page · Technical
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-mono font-semibold text-[#0B1120] tabular-nums">
                        {tier1.price}
                      </span>
                      {isSeo && (
                        <span className="ml-1.5 text-xs font-semibold text-[#0B1120]">
                          · {tier1.tierName}
                        </span>
                      )}
                      <span className="block text-xs text-slate-500">
                        {tier1.title}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-mono font-semibold text-[#1D4ED8] tabular-nums">
                        {tier2.price}
                      </span>
                      {isSeo && (
                        <span className="ml-1.5 text-xs font-semibold text-[#1D4ED8]">
                          · {tier2.tierName}
                        </span>
                      )}
                      <span className="block text-xs text-slate-500">
                        {tier2.title}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-mono font-semibold text-[#0B1120] tabular-nums">
                        {isSeo ? tier3.price : `${tier3.price}/mo`}
                      </span>
                      {isSeo && (
                        <span className="ml-1.5 text-xs font-semibold text-[#0B1120]">
                          · {tier3.tierName}
                        </span>
                      )}
                      <span className="block text-xs text-slate-500">
                        {tier3.title}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onSelectTier(group.serviceId, tier2)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
                      >
                        <span>Book {group.serviceLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
