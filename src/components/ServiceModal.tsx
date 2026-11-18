import { useEffect } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import { ServiceItem, ServiceId } from '../data/portfolioData';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectForInquiry: (serviceId: ServiceId) => void;
}

export function ServiceModal({
  service,
  onClose,
  onSelectForInquiry,
}: ServiceModalProps) {
  useEffect(() => {
    if (!service) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 p-6 sm:p-8 border-b border-slate-200">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">
              <span>{service.number}</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span>{service.categoryLabel}</span>
            </p>
            <h3
              id="service-modal-title"
              className="text-2xl font-semibold tracking-tight text-[#0B1120]"
            >
              {service.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close service details"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <p className="text-base leading-relaxed text-slate-600">{service.summary}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-slate-200">
            <div>
              <p className="text-xs text-slate-500 mb-1">Starter Entry Rate</p>
              <p className="font-mono text-lg font-semibold text-[#0B1120] tabular-nums">
                From {service.startingPrice}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Standard Pack</p>
              <p className="font-mono text-sm font-semibold text-[#1D4ED8] tabular-nums">
                {service.standardPrice}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Turnaround</p>
              <p className="text-sm font-medium text-slate-700">{service.timeline}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#0B1120] mb-3">
              Exact Deliverables Included
            </h4>
            <ul className="space-y-2.5">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                  <Check
                    className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h4 className="text-sm font-semibold text-[#0B1120] mb-2">
                Initial Audit Checks
              </h4>
              <ul className="space-y-1.5 text-sm text-slate-600">
                {service.auditChecklist.map((check) => (
                  <li key={check}>• {check}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#0B1120] mb-2">
                Platforms &amp; Tooling
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {service.tools.join(' · ')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:px-8 border-t border-slate-200 bg-slate-50">
          <p className="text-xs text-slate-500">
            Includes free 15-minute baseline audit before commitment.
          </p>
          <button
            type="button"
            onClick={() => {
              onSelectForInquiry(service.id);
              onClose();
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            <span>Request Quote for {service.shortTitle}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
