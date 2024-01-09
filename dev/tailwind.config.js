/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar"), require("tailwind-scrollbar-hide")],
};
