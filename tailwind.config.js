/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#07182f",
        "navy-soft": "#0c2545",
        teal: "#16b8a6",
        "teal-dark": "#087f7c",
        gold: "#f6c453"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 80px rgba(22, 184, 166, 0.22)"
      }
    }
  },
  plugins: []
};
