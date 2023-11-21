// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colosr: {},
    extend: {
      fontFamily: {
        sans: ['pretendard', 'Helvetica', 'Arial', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
