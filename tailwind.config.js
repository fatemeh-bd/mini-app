/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        white: "var(--boxColor)",
        purple: "var(--purple)",
        success: "#16a34a",
        error: "#f43f5e",
        secondary: {
          100: "var(--gray50)",
          200: "var(--gray200)",
          500: "var(--gray500)",
          600: "var(--gray600)",
          800: "var(--gray800)",
        },
      },
      keyframes: {
        spinOnce: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        spinOnce: "spinOnce 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
