/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-shadow":
          "-2px 2px 20px 8px rgba(0,0,0,0.04)",
        "custom-nav-shadow": "0px 2px 5px rgba(0, 0, 0, 0.036)",
      },
      fontFamily: {
        lora: ['"Lora"', "serif"],
        cardo: ['"Cardo"', "serif"],
      },
    },
  },
  plugins: [],
}