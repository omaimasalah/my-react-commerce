/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      screens: {
  xs: "320px",
  sm: "375px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
},
    extend: {},
  },
  plugins: [],
}