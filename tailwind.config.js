/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '16px',
    },
    extend: {
      colors: {
        primary: '#FFEC9E',
        secondary: '#C9B6E4',
        dark: '#637A9F',
      },
      screens: {
        '2xl': '1320px',
      },
      fontFamily: {
        'serif': ['"Libre Baskerville"', 'serif'],
       },
       backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
};