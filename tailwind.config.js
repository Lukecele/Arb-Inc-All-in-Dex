/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/zap-widget/**/*.{js,ts,jsx,tsx}",
    "./hooks/zap/**/*.{js,ts,jsx,tsx}",
    "./lib/zap/**/*.{js,ts,jsx,tsx}",
    "./app/zap/**/*.{js,ts,jsx,tsx}", // in case we keep the page there
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
