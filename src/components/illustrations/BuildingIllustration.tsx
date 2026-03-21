"use client";

export function BuildingIllustration() {
  return (
    <svg
      viewBox="0 0 900 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[900px] mx-auto"
      aria-label="Isometric cutaway illustration of a Victorian terraced house mid-renovation"
      role="img"
    >
      <defs>
        {/* Brick pattern for structural left side */}
        <pattern
          id="brick-pattern"
          x="0"
          y="0"
          width="66"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <rect width="66" height="18" fill="#E0D8CF" />
          <rect x="1" y="1" width="60" height="13" fill="#C4BAA8" rx="0.5" />
          <rect x="34" y="15" width="60" height="13" fill="#D4C9B5" rx="0.5" />
          <rect x="-30" y="15" width="60" height="13" fill="#C4BAA8" rx="0.5" />
        </pattern>

        {/* Structural wall clip path */}
        <clipPath id="left-wall-clip">
          <rect x="110" y="100" width="345" height="350" />
        </clipPath>

        {/* Finished wall clip path */}
        <clipPath id="right-wall-clip">
          <rect x="455" y="100" width="385" height="350" />
        </clipPath>

        {/* Scaffold clip path */}
        <clipPath id="scaffold-clip">
          <rect x="15" y="95" width="95" height="360" />
        </clipPath>

        {/* Left roof clip */}
        <clipPath id="left-roof-clip">
          <polygon points="90,170 455,30 455,170" />
        </clipPath>

        {/* Right roof clip */}
        <clipPath id="right-roof-clip">
          <polygon points="455,30 850,170 455,170" />
        </clipPath>
      </defs>

      {/* ===== SKY / BACKGROUND ===== */}
      <rect x="0" y="0" width="900" height="500" fill="#F8F8F8" />
      <rect x="0" y="440" width="900" height="60" fill="#E8E4DF" />

      {/* ===== FOUNDATION ===== */}
      {/* Foundation shadow */}
      <rect x="108" y="455" width="736" height="8" rx="2" fill="rgba(0,0,0,0.08)" />
      {/* Foundation main body */}
      <rect x="110" y="440" width="732" height="45" fill="#3D3530" />
      {/* Foundation highlight */}
      <rect x="110" y="440" width="732" height="3" fill="#4A4340" />
      {/* Foundation stone courses */}
      <rect x="110" y="458" width="732" height="2" fill="rgba(255,255,255,0.06)" />
      {/* Foundation left detail */}
      <rect x="110" y="463" width="732" height="2" fill="rgba(0,0,0,0.15)" />
      {/* Foundation plinth step */}
      <rect x="108" y="438" width="736" height="4" fill="#2E2826" />
      {/* DPC (damp proof course) */}
      <rect x="110" y="436" width="732" height="4" fill="#B8975A" opacity="0.4" />
      {/* Ground shadow beneath foundation */}
      <ellipse cx="476" cy="490" rx="340" ry="8" fill="rgba(0,0,0,0.12)" />

      {/* ===== STRUCTURAL LEFT WALL (brick) ===== */}
      {/* Main brick wall fill */}
      <rect
        x="110"
        y="100"
        width="345"
        height="340"
        fill="url(#brick-pattern)"
        clipPath="url(#left-wall-clip)"
      />
      {/* Window openings cut into brick — white rectangles to "remove" brickwork */}
      {/* GF Window 1 opening */}
      <rect x="130" y="348" width="92" height="90" fill="#E0D8CF" />
      {/* GF Window 2 opening */}
      <rect x="278" y="348" width="92" height="90" fill="#E0D8CF" />
      {/* FF Window 1 opening */}
      <rect x="130" y="205" width="92" height="82" fill="#E0D8CF" />
      {/* FF Window 2 opening */}
      <rect x="278" y="205" width="92" height="82" fill="#E0D8CF" />

      {/* Concrete floor bands */}
      <rect x="110" y="300" width="345" height="8" fill="#9BA8A0" />
      <rect x="110" y="160" width="345" height="8" fill="#9BA8A0" />

      {/* Cutaway edge highlight */}
      <rect x="452" y="100" width="4" height="340" fill="#B8975A" opacity="0.5" />

      {/* ===== STRUCTURAL WINDOW FRAMES (Left) ===== */}
      {/* GF Window 1 — timber frame */}
      <rect x="128" y="346" width="96" height="3" fill="#8B6F47" />
      {/* lintel */}
      <rect x="128" y="437" width="96" height="3" fill="#8B6F47" />
      {/* sill */}
      <rect x="128" y="346" width="3" height="94" fill="#8B6F47" />
      {/* left jamb */}
      <rect x="221" y="346" width="3" height="94" fill="#8B6F47" />
      {/* right jamb */}
      <rect x="128" y="389" width="96" height="2" fill="#7A5E39" />
      {/* mid rail */}
      {/* GF Window 1 glazing */}
      <rect x="131" y="349" width="90" height="38" fill="rgba(160,195,210,0.25)" />
      <rect x="131" y="391" width="90" height="44" fill="rgba(160,195,210,0.2)" />
      {/* GF Window 1 glazing bar */}
      <rect x="175" y="349" width="1.5" height="38" fill="rgba(139,111,71,0.6)" />
      <rect x="175" y="391" width="1.5" height="44" fill="rgba(139,111,71,0.6)" />

      {/* GF Window 2 — timber frame */}
      <rect x="276" y="346" width="96" height="3" fill="#8B6F47" />
      <rect x="276" y="437" width="96" height="3" fill="#8B6F47" />
      <rect x="276" y="346" width="3" height="94" fill="#8B6F47" />
      <rect x="369" y="346" width="3" height="94" fill="#8B6F47" />
      <rect x="276" y="389" width="96" height="2" fill="#7A5E39" />
      <rect x="279" y="349" width="88" height="38" fill="rgba(160,195,210,0.25)" />
      <rect x="279" y="391" width="88" height="44" fill="rgba(160,195,210,0.2)" />
      <rect x="323" y="349" width="1.5" height="38" fill="rgba(139,111,71,0.6)" />
      <rect x="323" y="391" width="1.5" height="44" fill="rgba(139,111,71,0.6)" />

      {/* FF Window 1 — timber frame */}
      <rect x="128" y="203" width="96" height="3" fill="#8B6F47" />
      <rect x="128" y="286" width="96" height="3" fill="#8B6F47" />
      <rect x="128" y="203" width="3" height="86" fill="#8B6F47" />
      <rect x="221" y="203" width="3" height="86" fill="#8B6F47" />
      <rect x="128" y="244" width="96" height="2" fill="#7A5E39" />
      <rect x="131" y="206" width="88" height="36" fill="rgba(160,195,210,0.25)" />
      <rect x="131" y="246" width="88" height="40" fill="rgba(160,195,210,0.2)" />
      <rect x="175" y="206" width="1.5" height="36" fill="rgba(139,111,71,0.6)" />
      <rect x="175" y="246" width="1.5" height="40" fill="rgba(139,111,71,0.6)" />

      {/* FF Window 2 — timber frame */}
      <rect x="276" y="203" width="96" height="3" fill="#8B6F47" />
      <rect x="276" y="286" width="96" height="3" fill="#8B6F47" />
      <rect x="276" y="203" width="3" height="86" fill="#8B6F47" />
      <rect x="369" y="203" width="3" height="86" fill="#8B6F47" />
      <rect x="276" y="244" width="96" height="2" fill="#7A5E39" />
      <rect x="279" y="206" width="88" height="36" fill="rgba(160,195,210,0.25)" />
      <rect x="279" y="246" width="88" height="40" fill="rgba(160,195,210,0.2)" />
      <rect x="323" y="206" width="1.5" height="36" fill="rgba(139,111,71,0.6)" />
      <rect x="323" y="246" width="1.5" height="40" fill="rgba(139,111,71,0.6)" />

      {/* ===== FLOOR JOISTS (visible in structural cutaway) ===== */}
      {/* First floor level joists (ground floor ceiling) */}
      <rect x="110" y="297" width="345" height="10" fill="#6E5C40" />
      {/* Individual joist ends at the cut face */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <rect
          key={`gf-joist-${i}`}
          x={115 + i * 38}
          y={285}
          width={16}
          height={18}
          fill="#8B6F47"
          rx="1"
        />
      ))}
      {/* Second floor / attic level joists */}
      <rect x="110" y="157" width="345" height="10" fill="#6E5C40" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <rect
          key={`ff-joist-${i}`}
          x={115 + i * 38}
          y={145}
          width={16}
          height={18}
          fill="#8B6F47"
          rx="1"
        />
      ))}

      {/* ===== FINISHED RIGHT WALL ===== */}
      {/* Main render wall */}
      <rect x="455" y="100" width="385" height="340" fill="#EDEAE4" />
      {/* Render texture subtle gradient */}
      <rect
        x="455"
        y="100"
        width="385"
        height="340"
        fill="url(#render-texture)"
        opacity="0.3"
      />
      {/* String course at first floor level */}
      <rect x="455" y="298" width="385" height="8" fill="#D8D0C4" />
      <rect x="455" y="298" width="385" height="2" fill="#C8BFB3" />
      {/* Plinth render (darker at base) */}
      <rect x="455" y="410" width="385" height="30" fill="#DDD8D0" />
      {/* Quoin stones at corner (right edge) */}
      <rect x="836" y="100" width="4" height="340" fill="#D0C8BC" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <rect
          key={`quoin-${i}`}
          x={834}
          y={108 + i * 26}
          width={6}
          height={14}
          fill="#C8C0B4"
          rx="0.5"
        />
      ))}

      {/* ===== FINISHED SASH WINDOWS (Right) ===== */}
      {/* GF Window Right (x=655-760) */}
      {/* Window reveal */}
      <rect x="653" y="346" width="110" height="94" fill="#D8D0C8" rx="2" />
      {/* Window frame outer */}
      <rect x="657" y="349" width="102" height="88" fill="#2A2A2A" rx="1" />
      {/* Top sash */}
      <rect x="660" y="352" width="96" height="40" fill="rgba(180,210,220,0.5)" />
      {/* Bottom sash */}
      <rect x="660" y="394" width="96" height="40" fill="rgba(180,210,220,0.45)" />
      {/* Sash meeting rail */}
      <rect x="657" y="391" width="102" height="5" fill="#2A2A2A" />
      {/* Glazing bars top sash */}
      <rect x="706" y="352" width="2" height="40" fill="#2A2A2A" opacity="0.6" />
      <rect x="660" y="372" width="96" height="2" fill="#2A2A2A" opacity="0.6" />
      {/* Glazing bars bottom sash */}
      <rect x="706" y="394" width="2" height="40" fill="#2A2A2A" opacity="0.6" />
      <rect x="660" y="414" width="96" height="2" fill="#2A2A2A" opacity="0.6" />
      {/* Window sill */}
      <rect x="650" y="435" width="116" height="5" fill="#C8C0B4" rx="1" />
      {/* Window lintel */}
      <rect x="650" y="346" width="116" height="4" fill="#D0C8BC" rx="0.5" />

      {/* FF Window Right 1 (x=468-590) */}
      <rect x="466" y="200" width="126" height="96" fill="#D8D0C8" rx="2" />
      <rect x="470" y="203" width="118" height="90" fill="#2A2A2A" rx="1" />
      <rect x="473" y="206" width="110" height="40" fill="rgba(180,210,220,0.5)" />
      <rect x="473" y="248" width="110" height="40" fill="rgba(180,210,220,0.45)" />
      <rect x="470" y="244" width="118" height="6" fill="#2A2A2A" />
      <rect x="527" y="206" width="2" height="40" fill="#2A2A2A" opacity="0.6" />
      <rect x="473" y="226" width="110" height="2" fill="#2A2A2A" opacity="0.6" />
      <rect x="527" y="248" width="2" height="40" fill="#2A2A2A" opacity="0.6" />
      <rect x="473" y="268" width="110" height="2" fill="#2A2A2A" opacity="0.6" />
      <rect x="463" y="293" width="132" height="5" fill="#C8C0B4" rx="1" />
      <rect x="463" y="200" width="132" height="4" fill="#D0C8BC" rx="0.5" />

      {/* FF Window Right 2 (x=652-778) */}
      <rect x="650" y="200" width="126" height="96" fill="#D8D0C8" rx="2" />
      <rect x="654" y="203" width="118" height="90" fill="#2A2A2A" rx="1" />
      <rect x="657" y="206" width="110" height="40" fill="rgba(180,210,220,0.5)" />
      <rect x="657" y="248" width="110" height="40" fill="rgba(180,210,220,0.45)" />
      <rect x="654" y="244" width="118" height="6" fill="#2A2A2A" />
      <rect x="711" y="206" width="2" height="40" fill="#2A2A2A" opacity="0.6" />
      <rect x="657" y="226" width="110" height="2" fill="#2A2A2A" opacity="0.6" />
      <rect x="711" y="248" width="2" height="40" fill="#2A2A2A" opacity="0.6" />
      <rect x="657" y="268" width="110" height="2" fill="#2A2A2A" opacity="0.6" />
      <rect x="647" y="293" width="132" height="5" fill="#C8C0B4" rx="1" />
      <rect x="647" y="200" width="132" height="4" fill="#D0C8BC" rx="0.5" />

      {/* ===== FRONT DOOR ===== */}
      {/* Door opening recess */}
      <rect x="488" y="338" width="118" height="102" fill="#D0C8BC" rx="2" />
      {/* Door frame */}
      <rect x="494" y="342" width="106" height="98" fill="#1C1C1C" rx="1" />
      {/* Door panels - 4 panel Victorian */}
      <rect x="498" y="346" width="46" height="38" fill="#243828" rx="1" />
      <rect x="550" y="346" width="46" height="38" fill="#243828" rx="1" />
      <rect x="498" y="390" width="46" height="46" fill="#1E3220" rx="1" />
      <rect x="550" y="390" width="46" height="46" fill="#1E3220" rx="1" />
      {/* Panel highlights */}
      <rect x="498" y="346" width="46" height="2" fill="rgba(255,255,255,0.08)" />
      <rect x="550" y="346" width="46" height="2" fill="rgba(255,255,255,0.08)" />
      {/* Door knocker */}
      <rect x="521" y="370" width="6" height="8" fill="#B8975A" rx="1" />
      <circle cx="524" cy="370" r="4" fill="#B8975A" />
      {/* Letterbox */}
      <rect x="515" y="408" width="18" height="5" fill="#B8975A" rx="1" />
      {/* Door handle */}
      <circle cx="547" cy="415" r="4" fill="#B8975A" />
      <rect x="545" y="415" width="8" height="2" fill="#B8975A" rx="1" />
      {/* Fanlight above door */}
      <rect x="494" y="338" width="106" height="2" fill="#1C1C1C" />
      <rect x="496" y="326" width="102" height="14" fill="rgba(180,210,220,0.45)" rx="1" />
      {/* Door step */}
      <rect x="484" y="438" width="126" height="6" fill="#B8A898" rx="1" />
      <rect x="480" y="443" width="134" height="4" fill="#A89888" rx="1" />

      {/* Guttering right side */}
      <rect x="455" y="166" width="385" height="5" fill="#5A6060" />
      {/* Downpipe */}
      <rect x="828" y="171" width="8" height="270" fill="#6B7070" rx="2" />
      {/* Downpipe brackets */}
      <rect x="826" y="230" width="12" height="4" fill="#5A6060" rx="1" />
      <rect x="826" y="320" width="12" height="4" fill="#5A6060" rx="1" />
      <rect x="826" y="390" width="12" height="4" fill="#5A6060" rx="1" />
      {/* Downpipe shoe */}
      <rect x="826" y="437" width="12" height="8" fill="#5A6060" rx="2" />

      {/* ===== ROOF ===== */}
      {/* Left slope — structural (exposed rafters) */}
      <polygon points="90,170 455,30 455,170" fill="#7A8A8A" />
      {/* Rafter lines on structural left roof */}
      <line x1="200" y1="170" x2="300" y2="72" stroke="#6B7C8A" strokeWidth="2" />
      <line x1="240" y1="170" x2="320" y2="87" stroke="#6B7C8A" strokeWidth="2" />
      <line x1="280" y1="170" x2="345" y2="100" stroke="#6B7C8A" strokeWidth="2" />
      <line x1="320" y1="170" x2="375" y2="114" stroke="#6B7C8A" strokeWidth="2" />
      <line x1="360" y1="170" x2="408" y2="129" stroke="#6B7C8A" strokeWidth="2" />
      <line x1="400" y1="170" x2="430" y2="143" stroke="#6B7C8A" strokeWidth="2" />
      <line x1="150" y1="170" x2="280" y2="57" stroke="#6B7C8A" strokeWidth="2" />
      <line x1="110" y1="170" x2="255" y2="42" stroke="#6B7C8A" strokeWidth="2" />
      {/* Roof deck/sarking on structural side */}
      <polygon points="90,170 455,30 455,170" fill="none" stroke="#5A6B78" strokeWidth="1" />

      {/* Right slope — finished (slates) */}
      <polygon points="455,30 850,170 455,170" fill="#8A9BA8" />
      {/* Slate courses on finished right roof */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const y = 170 - i * 15;
        const ratio = i / 9;
        const rightX = 850 - (850 - 455) * ratio;
        return (
          <line
            key={`slate-${i}`}
            x1={455}
            y1={y}
            x2={rightX}
            y2={y}
            stroke="#6B7C8A"
            strokeWidth="1.5"
            opacity="0.6"
          />
        );
      })}
      {/* Ridge board */}
      <rect x="450" y="27" width="10" height="8" fill="#5A4A3A" rx="1" />
      {/* Fascia boards */}
      <rect x="87" y="167" width="5" height="6" fill="#D4C9B5" />
      <rect x="848" y="167" width="5" height="6" fill="#D4C9B5" />
      {/* Roof eave detail left */}
      <line x1="90" y1="170" x2="455" y2="30" stroke="#5A6B78" strokeWidth="2" />
      {/* Roof eave detail right */}
      <line x1="850" y1="170" x2="455" y2="30" stroke="#7A8A95" strokeWidth="2" />

      {/* ===== CHIMNEY ===== */}
      {/* Chimney shaft */}
      <rect x="728" y="0" width="68" height="88" fill="#B0A898" />
      {/* Chimney shaft left face (darker) */}
      <rect x="728" y="0" width="68" height="88" fill="#A8A098" />
      {/* Chimney brick courses */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={`chimney-brick-${i}`}
          x={728}
          y={i * 14 + 2}
          width={68}
          height={2}
          fill="rgba(0,0,0,0.08)"
        />
      ))}
      {/* Chimney corbelling / cap */}
      <rect x="722" y="68" width="80" height="8" fill="#C8C0B4" rx="1" />
      <rect x="725" y="63" width="74" height="8" fill="#B8B0A4" rx="1" />
      {/* DPC */}
      <rect x="728" y="48" width="68" height="3" fill="#8A9BA8" opacity="0.4" />
      {/* Chimney flaunching */}
      <rect x="726" y="72" width="12" height="16" fill="#B8B0A4" />
      <rect x="782" y="72" width="12" height="16" fill="#B8B0A4" />
      {/* Chimney pots */}
      <rect x="739" y="44" width="14" height="28" fill="#8A6A58" rx="2" />
      <rect x="770" y="44" width="14" height="28" fill="#8A6A58" rx="2" />
      {/* Pot rims */}
      <rect x="737" y="42" width="18" height="5" fill="#7A5A4A" rx="1" />
      <rect x="768" y="42" width="18" height="5" fill="#7A5A4A" rx="1" />
      {/* Smoke hint */}
      <ellipse cx="746" cy="38" rx="5" ry="8" fill="rgba(180,180,180,0.2)" />
      <ellipse cx="777" cy="35" rx="4" ry="10" fill="rgba(180,180,180,0.15)" />

      {/* ===== SCAFFOLD (left of house) ===== */}
      {/* Vertical poles */}
      <rect x="28" y="98" width="6" height="358" fill="#8A9BA8" rx="1" />
      <rect x="48" y="98" width="6" height="358" fill="#8A9BA8" rx="1" />
      <rect x="68" y="98" width="6" height="358" fill="#8A9BA8" rx="1" />
      <rect x="88" y="98" width="6" height="358" fill="#8A9BA8" rx="1" />
      {/* Pole caps */}
      <rect x="26" y="95" width="10" height="5" fill="#6B7C8A" rx="1" />
      <rect x="46" y="95" width="10" height="5" fill="#6B7C8A" rx="1" />
      <rect x="66" y="95" width="10" height="5" fill="#6B7C8A" rx="1" />
      <rect x="86" y="95" width="10" height="5" fill="#6B7C8A" rx="1" />
      {/* Base plates */}
      <rect x="24" y="450" width="14" height="5" fill="#6B7C8A" rx="1" />
      <rect x="44" y="450" width="14" height="5" fill="#6B7C8A" rx="1" />
      <rect x="64" y="450" width="14" height="5" fill="#6B7C8A" rx="1" />
      <rect x="84" y="450" width="14" height="5" fill="#6B7C8A" rx="1" />
      {/* Horizontal scaffold tubes */}
      <rect x="22" y="148" width="80" height="5" fill="#6B7C8A" rx="1" />
      <rect x="22" y="288" width="80" height="5" fill="#6B7C8A" rx="1" />
      <rect x="22" y="415" width="80" height="5" fill="#6B7C8A" rx="1" />
      {/* Scaffold planks / platform boards */}
      <rect x="22" y="153" width="80" height="8" fill="#8B6F47" rx="1" />
      <rect x="22" y="293" width="80" height="8" fill="#8B6F47" rx="1" />
      <rect x="22" y="420" width="80" height="8" fill="#8B6F47" rx="1" />
      {/* Platform plank details */}
      <rect x="22" y="154" width="80" height="1" fill="rgba(255,255,255,0.15)" />
      <rect x="22" y="294" width="80" height="1" fill="rgba(255,255,255,0.15)" />
      {/* Toe boards */}
      <rect x="20" y="157" width="4" height="30" fill="#7A5E39" />
      <rect x="20" y="297" width="4" height="30" fill="#7A5E39" />
      {/* Cross bracing diagonal */}
      <line x1="28" y1="155" x2="94" y2="293" stroke="#6B7C8A" strokeWidth="2" opacity="0.5" />
      <line x1="94" y1="155" x2="28" y2="293" stroke="#6B7C8A" strokeWidth="2" opacity="0.5" />
      {/* Putlogs (connecting scaffold to wall) */}
      <rect x="88" y="151" width="25" height="4" fill="#8A9BA8" rx="1" />
      <rect x="88" y="291" width="25" height="4" fill="#8A9BA8" rx="1" />
      <rect x="88" y="416" width="25" height="4" fill="#8A9BA8" rx="1" />

      {/* ===== BUILDER SILHOUETTE (on scaffold at 1st floor level) ===== */}
      {/* Hard hat */}
      <ellipse cx="60" cy="258" rx="10" ry="5" fill="#F5A623" />
      <rect x="52" y="255" width="16" height="3" fill="#F5A623" rx="1" />
      {/* Head */}
      <circle cx="60" cy="265" r="7" fill="#C8956A" />
      {/* Torso / Hi-vis jacket */}
      <rect x="52" y="272" width="16" height="22" fill="#F5A623" rx="2" />
      {/* Safety vest stripes */}
      <rect x="52" y="277" width="16" height="2" fill="#1D1D1F" opacity="0.3" />
      <rect x="52" y="283" width="16" height="2" fill="#1D1D1F" opacity="0.3" />
      {/* Left arm (raised) */}
      <rect x="36" y="272" width="16" height="5" fill="#C8956A" rx="2" />
      <rect x="34" y="264" width="5" height="12" fill="#C8956A" rx="2" />
      {/* Right arm (holding tool) */}
      <rect x="68" y="275" width="20" height="5" fill="#C8956A" rx="2" />
      {/* Tool / spirit level */}
      <rect x="82" y="268" width="3" height="18" fill="#4A4A4A" rx="1" />
      <rect x="80" y="266" width="7" height="3" fill="#6B7C8A" rx="0.5" />
      {/* Legs */}
      <rect x="53" y="293" width="6" height="18" fill="#2C3E50" rx="2" />
      <rect x="62" y="293" width="6" height="18" fill="#2C3E50" rx="2" />
      {/* Boots */}
      <rect x="51" y="309" width="10" height="5" fill="#1A1A1A" rx="1" />
      <rect x="60" y="309" width="10" height="5" fill="#1A1A1A" rx="1" />

      {/* ===== GOLD ACCENT LINES ===== */}
      {/* Cutaway split line (gold) */}
      <line
        x1="455"
        y1="30"
        x2="455"
        y2="440"
        stroke="#B8975A"
        strokeWidth="2"
        strokeDasharray="8,4"
        opacity="0.7"
      />
      {/* Floor level indicators */}
      <line
        x1="100"
        y1="305"
        x2="455"
        y2="305"
        stroke="#B8975A"
        strokeWidth="1"
        strokeDasharray="4,4"
        opacity="0.4"
      />
      <line
        x1="100"
        y1="165"
        x2="455"
        y2="165"
        stroke="#B8975A"
        strokeWidth="1"
        strokeDasharray="4,4"
        opacity="0.4"
      />
      {/* House outline accent */}
      <rect
        x="110"
        y="100"
        width="730"
        height="340"
        fill="none"
        stroke="#B8975A"
        strokeWidth="0.5"
        opacity="0.2"
      />

      {/* ===== DIMENSION LABELS ===== */}
      {/* Ground floor height bracket */}
      <line x1="870" y1="308" x2="870" y2="440" stroke="#86868B" strokeWidth="1" />
      <line x1="866" y1="308" x2="874" y2="308" stroke="#86868B" strokeWidth="1" />
      <line x1="866" y1="440" x2="874" y2="440" stroke="#86868B" strokeWidth="1" />

      {/* First floor height bracket */}
      <line x1="870" y1="168" x2="870" y2="300" stroke="#86868B" strokeWidth="1" />
      <line x1="866" y1="168" x2="874" y2="168" stroke="#86868B" strokeWidth="1" />
      <line x1="866" y1="300" x2="874" y2="300" stroke="#86868B" strokeWidth="1" />

      {/* Label: STRUCTURAL */}
      <text
        x="282"
        y="490"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="11"
        fill="#B8975A"
        letterSpacing="0.1em"
        fontWeight="500"
      >
        STRUCTURAL
      </text>

      {/* Label: FINISHED */}
      <text
        x="638"
        y="490"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="11"
        fill="#B8975A"
        letterSpacing="0.1em"
        fontWeight="500"
      >
        FINISHED
      </text>

      {/* Divider line between labels */}
      <line x1="455" y1="478" x2="455" y2="498" stroke="#B8975A" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
