import React from "react";

// Official-looking circular seal for the Rave And Warehouse DJ Association.
export const RawdjaSeal = ({ size = 120, className = "" }) => {
  const id = React.useId().replace(/:/g, "");
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Rave And Warehouse DJ Association seal"
    >
      <defs>
        <path
          id={`circle-${id}`}
          d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
        />
      </defs>
      <circle cx="100" cy="100" r="94" fill="none" stroke="#39FF14" strokeWidth="2" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="#FF5E00" strokeWidth="1" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="#00F0FF" strokeWidth="1.5" />
      <text fontFamily="Unbounded, sans-serif" fontSize="11.5" fontWeight="800" fill="#F2F5FF" letterSpacing="2">
        <textPath href={`#circle-${id}`} startOffset="0%">
          ★ RAVE AND WAREHOUSE DJ ASSOCIATION ★ CERTIFIED ★
        </textPath>
      </text>
      {/* center turntable mark */}
      <circle cx="100" cy="100" r="40" fill="none" stroke="#39FF14" strokeWidth="2" />
      <circle cx="100" cy="100" r="22" fill="none" stroke="#FF5E00" strokeWidth="2" />
      <circle cx="100" cy="100" r="5" fill="#00F0FF" />
      <line x1="100" y1="100" x2="132" y2="80" stroke="#FF5E00" strokeWidth="3" strokeLinecap="round" />
      <text x="100" y="150" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="9" fill="#A594FD" letterSpacing="2">
        EST. 2026
      </text>
    </svg>
  );
};

export default RawdjaSeal;
