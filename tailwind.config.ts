import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1F3A",
          50: "#E8EDF4",
          100: "#C5D1E4",
          200: "#8BA3C5",
          300: "#5175A6",
          400: "#2D4F83",
          500: "#0B1F3A",
          600: "#091930",
          700: "#071326",
          800: "#050D1C",
          900: "#030812",
        },
        gold: {
          DEFAULT: "#C9A84C",
          50: "#FBF5E6",
          100: "#F5E5BD",
          200: "#EBCC7B",
          300: "#DFB23A",
          400: "#C9A84C",
          500: "#B8932A",
          600: "#9A7A22",
          700: "#7C611B",
          800: "#5E4813",
          900: "#40300C",
        },
        cream: {
          DEFAULT: "#FAF7F0",
          50: "#FFFFFF",
          100: "#FAF7F0",
          200: "#F2ECD8",
          300: "#EAE1C0",
          400: "#E0D4A6",
          500: "#D4C48A",
        },
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        syne: ["var(--font-syne)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        card: "0 2px 20px rgba(11, 31, 58, 0.08)",
        "card-hover": "0 8px 40px rgba(11, 31, 58, 0.15)",
        gold: "0 0 20px rgba(201, 168, 76, 0.3)",
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
        "fade-in": "fadeIn 0.2s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
