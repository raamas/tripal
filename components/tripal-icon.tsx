interface TripalIconProps {
    size?: number
    className?: string
  }
  
  export function TripalIcon({ size = 32, className = "" }: TripalIconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id="tripal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id="plane-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E0E7FF" />
          </linearGradient>
        </defs>
  
        {/* Main circle background */}
        <circle cx="16" cy="16" r="15" fill="url(#tripal-gradient)" stroke="#1E40AF" strokeWidth="2" />
  
        {/* Airplane icon */}
        <g transform="translate(8, 8)">
          {/* Airplane body */}
          <path d="M8 2L14 8H11L8 11L5 8H2L8 2Z" fill="url(#plane-gradient)" stroke="#DBEAFE" strokeWidth="0.5" />
          {/* Airplane wings */}
          <path d="M3 6L1 4L2 3L4 5L3 6Z" fill="url(#plane-gradient)" />
          <path d="M13 6L15 4L14 3L12 5L13 6Z" fill="url(#plane-gradient)" />
          {/* Airplane tail */}
          <path d="M8 12L6 14L7 15L9 13L8 12Z" fill="url(#plane-gradient)" />
        </g>
  
        {/* Travel path dots */}
        <circle cx="6" cy="10" r="1" fill="#BFDBFE" opacity="0.8" />
        <circle cx="26" cy="22" r="1" fill="#BFDBFE" opacity="0.6" />
        <circle cx="24" cy="8" r="0.8" fill="#BFDBFE" opacity="0.4" />
      </svg>
    )
  }
  