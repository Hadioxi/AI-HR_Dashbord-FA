/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'sans-serif'],
      },
      colors: {
        primary: '#3C4EFE',
        secondary: '#6366F1',
        accent: '#EC4899',
        background: '#F8FAFC',
        surface: '#FFFFFF',
      }
    }
  },
  plugins: [],
}