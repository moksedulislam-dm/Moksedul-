import { SOCIAL_LINKS, SocialProfile } from '../data/portfolioData';

function SocialIcon({ id }: { id: SocialProfile['id'] }) {
  switch (id) {
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
          <path d="M13.5 22v-8.2h2.7l.4-3.2h-3.1V8.6c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.4v3.2h2.7V22h3.4z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 stroke-current fill-none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
          <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.39 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.39 6.35 3.5 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.21 16.16 8.21C14.37 8.21 13.48 9.2 13.02 9.93V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.06 11.09C16.41 11.09 17.07 12.12 17.07 13.63V19.5H20.44V13.02Z" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
  }
}

interface SocialLinksProps {
  variant?: 'cards' | 'compact';
}

export function SocialLinks({ variant = 'cards' }: SocialLinksProps) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2" aria-label="Social Media Profiles">
        {SOCIAL_LINKS.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.label} — ${item.handle}`}
            title={item.label}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-[#1D4ED8] hover:border-slate-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
          >
            <SocialIcon id={item.id} />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2.5" aria-label="Social Media Accounts">
      {SOCIAL_LINKS.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F8F9FA] hover:bg-white hover:border-[#1D4ED8]/50 text-[#0B1120] transition-colors focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
        >
          <span className="text-[#1D4ED8] shrink-0">
            <SocialIcon id={item.id} />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#0B1120] truncate">
              {item.label}
            </p>
            <p className="text-[11px] text-slate-500 truncate">{item.handle}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
