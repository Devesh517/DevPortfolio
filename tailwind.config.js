/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./JS/**/*.js"],
  corePlugins: {
    preflight: false, // critical: prevents Tailwind's base reset from touching your existing CSS
  },
  theme: {
    extend: {},
  },
  plugins: [],
};