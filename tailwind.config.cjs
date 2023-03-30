/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d',
        grey: '#70707d',
        bodyColor: '#f5f5f5',
        bgContentRegister: '#f9f0eb'
      }
    }
  },
  plugins: []
}
