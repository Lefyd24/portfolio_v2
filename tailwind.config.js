/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './el/index.html',
    './js/**/*.js',
    './templates/**/*.html',
    './feed/**/*.html',
    './el/feed/**/*.html',
  ],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Instrument Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#050B14',
        },
        navy: {
          400: '#3399ff',
          500: '#1e3a5f',
          600: '#152a45',
          700: '#0f1f35',
        },
      },
    },
  },
}

