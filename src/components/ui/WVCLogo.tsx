export function WVCLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="20,2 35,10.5 35,27.5 20,36 5,27.5 5,10.5"
        fill="#C9A84C"
        stroke="#C9A84C"
        strokeWidth="0.5"
      />
      <polygon
        points="20,4.5 33,12 33,25 20,32.5 7,25 7,12"
        fill="none"
        stroke="#0B1F3A"
        strokeWidth="0.8"
        opacity="0.3"
      />
      <text
        x="20"
        y="23.5"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="11"
        fontWeight="700"
        fill="#0B1F3A"
        letterSpacing="0.5"
      >
        WVC
      </text>
    </svg>
  );
}
