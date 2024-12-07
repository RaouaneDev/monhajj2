/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD700',    // Jaune or vif
        secondary: '#1A1A1A',  // Noir profond
        accent: '#FFF1A1',     // Jaune clair
        dark: {
          100: '#000000',      // Noir pur
          200: '#1A1A1A',      // Noir profond
          300: '#2D2D2D'       // Noir grisé
        },
        yellow: {
          light: '#FFF7CC',    // Jaune très clair
          DEFAULT: '#FFD700',  // Jaune or
          dark: '#B39700'      // Jaune foncé
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
      },
    },
  },
  plugins: [],
}
