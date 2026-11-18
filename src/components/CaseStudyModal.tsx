import { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { CaseStudy, ServiceId } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onRequestSimilar: (channel: ServiceId) => void;
}

export function CaseStudyModal({
  caseStudy,
  onClose,
  onRequestSimilar,
}: CaseStudyModalProps) {
  useEffect(() => {
    if (!caseStudy) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 p-6 sm:px-8 border-b border-slate-200">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1.5">
              <span>{caseStudy.client}</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span>{caseStudy.industry}</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span>{caseStudy.channelName}</span>
            </p>
            <h3
              id="case-modal-title"
              className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0B1120] text-balance"
            >
              {caseStudy.headline}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {caseStudy.secondaryImageSrc ? (
            <div className="w-full rounded-lg border border-slate-200 bg-slate-50 p-6 flex flex-wrap items-center justify-center gap-6">
              <ResilientImage
                src={caseStudy.imageSrc}
                alt={caseStudy.imageAlt}
                fallbackTitle={caseStudy.client}
                className="max-h-[240px] w-auto object-contain rounded-lg border border-slate-200 bg-white shadow-xs"
              />
              <ResilientImage
                src={caseStudy.secondaryImageSrc}
                alt={caseStudy.secondaryImageAlt ?? caseStudy.imageAlt}
                fallbackTitle={caseStudy.client}
                className="max-h-[240px] w-auto object-contain rounded-lg border border-slate-200 bg-white shadow-xs"
              />
            </div>
          ) : (
            <div
              className={`w-full overflow-hidden rounded-lg border border-slate-200 ${
                caseStudy.isScreenshot
                  ? 'bg-white p-2 max-h-[460px] flex items-center justify-center'
                  : 'aspect-[16/9] bg-slate-100'
              }`}
            >
              <ResilientImage
                src={caseStudy.imageSrc}
                alt={caseStudy.imageAlt}
                fallbackTitle={caseStudy.client}
                className={
                  caseStudy.isScreenshot
                    ? 'max-h-[436px] w-auto mx-auto object-contain'
                    : 'w-full h-full object-cover'
                }
              />
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-200">
            {caseStudy.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="font-mono text-xl font-semibold text-[#0B1120] tabular-nums">
                  {metric.value}
                </p>
                <p className="text-xs text-slate-500 mt-1">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-xs font-semibold text-slate-900 mb-2">
                01. Starting Bottleneck
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {caseStudy.beforeState}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-900 mb-2">
                02. Execution Strategy
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {caseStudy.strategy}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-900 mb-2">
                03. Verified Outcome
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {caseStudy.outcome}
              </p>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-500">
            <span className="font-medium text-slate-700">Stack used: </span>
            <span>{caseStudy.toolsUsed.join(' · ')}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:px-8 border-t border-slate-200 bg-slate-50">
          <p className="text-xs text-slate-500">
            Want a similar roadmap built for your brand or channel?
          </p>
          <button
            type="button"
            onClick={() => {
              onRequestSimilar(caseStudy.channel);
              onClose();
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            <span>Request {caseStudy.channelName} Audit</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
