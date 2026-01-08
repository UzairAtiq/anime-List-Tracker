/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          red: '#ef4444',
          blue: '#3b82f6',
          purple: '#a855f7',
          green: '#10b981',
        },
      },
    },
  },
  plugins: [],
}

