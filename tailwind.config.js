/** @type {import('tailwindcss').Config} */

if (!Object.hasOwn) {
  Object.hasOwn = (obj, key) => {
    return typeof obj === 'object' && obj.hasOwnProperty(key)
  }
}

export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        karla: ['Karla', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'halloween', 'synthwave'],
  },
}
