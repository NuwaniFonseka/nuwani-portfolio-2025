// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#60f5ff", 
        cyan: "#60f5ff",
        cyanLight: "#9aa4d6",
        accent: "#A78BFA",
        darkBlue: "#0f172a",
        navy: "#1e1b4b",
        slate: "#301934",
        purple: "#5f3df7",
        purplePink: "#ff4fd8",
        teal: "#2be4dc",
        galaxy: "#050816",
        galaxySoft: "#0f172a",
        white: "#F8FAFC",
        cardBorder: "rgba(255, 255, 255, 0.18)",
      },
      backgroundImage: {
        galaxy: "url('/galaxy-bg.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'Nunito', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(6, 214, 160, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(6, 214, 160, 0.8), 0 0 40px rgba(6, 214, 160, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
