/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kawaii: {
          pink: '#FFB6C1',
          rose: '#FF69B4',
          purple: '#DDA0DD',
          peach: '#FFDAB9',
          mint: '#E0FFE0',
          sky: '#E6F3FF',
          cream: '#FFF5EE',
        }
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
      },
      boxShadow: {
        'kawaii': '0 4px 20px rgba(255, 105, 180, 0.3)',
        'kawaii-lg': '0 10px 40px rgba(255, 105, 180, 0.4)',
      }
    },
  },
  plugins: [],
}

