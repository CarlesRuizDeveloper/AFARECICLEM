/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkRed: '#980531',
        softRed: '#e20042',
        mediumRed: '#ad687c',
        purple: "#92258e",
        orange: "#f8931f"
      },
    },
  },
  plugins: [require('daisyui')],
}
