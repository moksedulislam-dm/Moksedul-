interface BrandLogoProps {
  size?: 'sm' | 'md';
  showTagline?: boolean;
}

export function BrandLogo({ size = 'md', showTagline = true }: BrandLogoProps) {
  const iconSize = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSize} shrink-0`}
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="10" fill="#1D4ED8" />
        <rect
          x="0.75"
          y="0.75"
          width="38.5"
          height="38.5"
          rx="9.25"
          stroke="#1E40AF"
          strokeWidth="1.5"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 12H13C16.9 12 19 15 19 20C19 25 16.9 28 13 28H7V12ZM10.1 14.9V25.1H12.7C14.7 25.1 15.8 23.3 15.8 20C15.8 16.7 14.7 14.9 12.7 14.9H10.1Z"
          fill="#FFFFFF"
        />
        <path
          d="M21 12H24.2L27 18.2L29.8 12H33V28H30.1V17.6L27 23.8L23.9 17.6V28H21V12Z"
          fill="#FFFFFF"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-base sm:text-lg font-bold tracking-tight text-[#0B1120]">
          Moksedul Islam{' '}
          <span className="text-[#1D4ED8]">DM</span>
        </span>
        {showTagline && (
          <span className="text-[10px] font-medium tracking-wide text-slate-500 uppercase mt-0.5">
            Growth &amp; AI Marketing
          </span>
        )}
      </span>
    </span>
  );
}
