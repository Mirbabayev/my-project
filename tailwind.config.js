/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Didot', 'serif'],
        serif: ['Didot', 'serif'],
        didot: ['Didot', 'serif'],
        bvlgari: ['Didot', 'serif'],
      },
      colors: {
        primary: '#B3945E', // Bulgari-nin qızılı rəngi
        secondary: '#8A7552', // Bulgari-nin ikinci qızılı rəngi
        accent: '#F7F3E9', // Bulgari-nin açıq kremli rəngi
        dark: '#1A1A1A', // Bulgari-nin tünd rəngi
        light: '#FFFFFF', // Ağ rəng
        gold: {
          100: '#F7F3E9',
          200: '#EEEBD8',
          300: '#DED8B8',
          400: '#CAC0A1',
          500: '#B3945E',
          600: '#8A7552',
          700: '#6B5A43',
          800: '#4B3E2F',
          900: '#2D2419',
        },
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'gold': '0 4px 15px rgba(179, 148, 94, 0.15)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};