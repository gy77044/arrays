/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          'primary': {
            /* default: '#113f4a',
            dark: '#05808f', */
            default: '#069FB1',
            dark: '#05808f',
          },         
        },
      },
    },
  },
};