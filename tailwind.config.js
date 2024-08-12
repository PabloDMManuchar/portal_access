/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#253C59",
        "custom-white": "#F7F9F2",
        // "custom-blue": "#253C59",
      },
    },
  },
  plugins: [],
};
