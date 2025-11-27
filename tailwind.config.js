// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9c77f1",
        accent: "#a78bfa",
        galaxy: "#1e1b2e",
        galaxySoft: "#2a213a",
        white: "#f8f8ff",
        cardBorder: "#4b445c",
      },
      backgroundImage: {
        galaxy: "url('/galaxy-bg.png')",
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
