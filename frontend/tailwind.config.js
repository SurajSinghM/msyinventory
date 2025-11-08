/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#E10600',
          gold: '#FFC72C',
          jade: '#00A878',
          navy: '#0B2747',
          rice: '#FFF8F0',
        },
        chinese: {
          red: '#DC143C',
          gold: '#FFD700',
          vermillion: '#E34234',
          cinnabar: '#E44D2E',
        },
      },
      backgroundImage: {
        'chinese-gradient': 'linear-gradient(135deg, #FFC72C 0%, #E10600 50%, #DC143C 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #FFC72C 100%)',
        'red-gradient': 'linear-gradient(135deg, #E10600 0%, #DC143C 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

