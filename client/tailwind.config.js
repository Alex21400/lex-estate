/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#F9832B",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#0E0E16",
        "black-200": "#1E1D23",
        "white-100": "#f3f3f3",
        "white-200": "#d8d8d8"
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
