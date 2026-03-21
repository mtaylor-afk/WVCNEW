"use client";

export function HouseIllustration() {
  return (
    <svg
      viewBox="0 0 420 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[420px] mx-auto"
      aria-label="Rooftop inspection illustration"
      role="img"
    >
      <defs>
        <pattern
          id="slate-pattern"
          x="0"
          y="0"
          width="40"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect width="40" height="20" fill="#8A9BA8" />
          <rect x="0" y="0" width="38" height="17" fill="#8FA8B5" rx="0.5" />
          <rect x="20" y="18" width="38" height="17" fill="#8A9BA8" rx="0.5" />
          <rect x="-20" y="18" width="38" height="17" fill="#8FA8B5" rx="0.5" />
        </pattern>
      </defs>

      {/* Sky */}
      <rect width="420" height="280" fill="#F0F2F4" />

      {/* Distant rooftops */}
      <rect x="0" y="200" width="420" height="80" fill="#E0E5E8" />
      <polygon points="0,200 60,160 120,200" fill="#C8D0D8" />
      <polygon points="80,200 140,165 200,200" fill="#D0D8E0" />
      <polygon points="300,200 360,155 420,200" fill="#C8D0D8" />
      <rect x="45" y="140" width="15" height="30" fill="#B0B8C0" />
      <rect x="350" y="135" width="18" height="32" fill="#B0B8C0" />

      {/* Main roof surface */}
      <polygon points="30,210 210,100 390,210" fill="url(#slate-pattern)" />

      {/* Roof ridge */}
      <line x1="210" y1="100" x2="210" y2="100" stroke="#5A6B78" strokeWidth="4" />
      <rect x="200" y="97" width="20" height="8" fill="#4A5A68" rx="2" />

      {/* Roof edge / fascia */}
      <line x1="28" y1="211" x2="392" y2="211" stroke="#5A6B78" strokeWidth="3" />

      {/* Chimney stack */}
      <rect x="285" y="110" width="45" height="65" fill="#C4BAA8" />
      <rect x="283" y="106" width="49" height="8" fill="#B5AB9A" rx="1" />
      {/* Chimney courses */}
      <rect x="285" y="118" width="45" height="2" fill="rgba(0,0,0,0.1)" />
      <rect x="285" y="132" width="45" height="2" fill="rgba(0,0,0,0.1)" />
      <rect x="285" y="146" width="45" height="2" fill="rgba(0,0,0,0.1)" />
      {/* Pots */}
      <rect x="293" y="90" width="10" height="20" fill="#8A6A58" rx="1" />
      <rect x="313" y="90" width="10" height="20" fill="#8A6A58" rx="1" />
      <rect x="291" y="87" width="14" height="5" fill="#7A5A4A" rx="1" />
      <rect x="311" y="87" width="14" height="5" fill="#7A5A4A" rx="1" />

      {/* Skylight / roof window */}
      <rect x="130" y="148" width="50" height="38" fill="#2A2A2A" rx="1" />
      <rect x="133" y="151" width="44" height="32" fill="rgba(180,210,220,0.6)" rx="0.5" />
      <rect x="155" y="151" width="2" height="32" fill="#2A2A2A" opacity="0.5" />
      <rect x="133" y="167" width="44" height="2" fill="#2A2A2A" opacity="0.5" />

      {/* ===== BUILDER FIGURE (inspecting ridge) ===== */}
      {/* Hard hat */}
      <ellipse cx="210" cy="92" rx="13" ry="6" fill="#F5A623" />
      <rect x="199" y="89" width="22" height="4" fill="#F5A623" rx="1" />
      {/* Head */}
      <circle cx="210" cy="100" r="9" fill="#C8956A" />
      {/* Torso */}
      <rect x="200" y="109" width="20" height="26" fill="#F5A623" rx="2" />
      {/* Safety stripes */}
      <rect x="200" y="116" width="20" height="2" fill="rgba(0,0,0,0.2)" />
      <rect x="200" y="122" width="20" height="2" fill="rgba(0,0,0,0.2)" />
      {/* Left arm (inspecting) */}
      <rect x="182" y="112" width="20" height="5" fill="#C8956A" rx="2" />
      <circle cx="180" cy="114" r="4" fill="#C8956A" />
      {/* Right arm (holding clipboard) */}
      <rect x="219" y="112" width="20" height="5" fill="#C8956A" rx="2" />
      <rect x="236" y="105" width="14" height="18" fill="#E8E0D0" rx="1" />
      <rect x="238" y="107" width="10" height="2" fill="#6E6E73" />
      <rect x="238" y="111" width="10" height="2" fill="#6E6E73" />
      <rect x="238" y="115" width="7" height="2" fill="#6E6E73" />
      {/* Legs */}
      <rect x="202" y="134" width="7" height="20" fill="#2C3E50" rx="2" />
      <rect x="213" y="134" width="7" height="20" fill="#2C3E50" rx="2" />
      {/* Boots on roof */}
      <rect x="200" y="152" width="11" height="6" fill="#1A1A1A" rx="1" />
      <rect x="211" y="152" width="11" height="6" fill="#1A1A1A" rx="1" />

      {/* Inspection tool / gauge */}
      <rect x="168" y="110" width="16" height="8" fill="#6B7C8A" rx="1" />
      <circle cx="176" cy="114" r="3" fill="#B8975A" />

      {/* Gold accent lines */}
      <line x1="210" y1="100" x2="285" y2="110" stroke="#B8975A" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
      <line x1="30" y1="211" x2="390" y2="211" stroke="#B8975A" strokeWidth="1" opacity="0.3" />

      {/* Measurement arrow */}
      <line x1="380" y1="140" x2="380" y2="210" stroke="#86868B" strokeWidth="1" />
      <polygon points="376,145 380,135 384,145" fill="#86868B" />
      <polygon points="376,205 380,215 384,205" fill="#86868B" />
    </svg>
  );
}
