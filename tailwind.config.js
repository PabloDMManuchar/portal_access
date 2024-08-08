/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#253C59",
        // "custom-blue": "#253C59",
      },
    },
  },
  plugins: [],
};
