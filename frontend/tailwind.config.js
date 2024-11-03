/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: { max: '639px' }, // Custom breakpoint for screens under 640px
      },
    },
  },
  plugins: [],
}