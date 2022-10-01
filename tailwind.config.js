/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '360px',
      'sm': '425px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px'
    },
    extend: {
      colors: {
        'gray1': '#effaf0',
        'gray2': '#777',
        'green': '#008000'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
