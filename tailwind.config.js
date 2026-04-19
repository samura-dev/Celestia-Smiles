/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'zub-glass': 'rgba(255, 255, 255, 0.05)',
      }
    },
  },
  plugins: [],
}
