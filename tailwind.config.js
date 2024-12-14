/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD700',
        secondary: '#1A1A1A',
        accent: '#FFF1A1',
        dark: {
          100: '#000000',
          200: '#1A1A1A',
          300: '#2D2D2D'
        },
        yellow: {
          light: '#FFF7CC',
          DEFAULT: '#FFD700',
          dark: '#B39700'
        }
      }
    },
  },
  plugins: [],
}
