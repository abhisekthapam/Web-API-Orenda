/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2C3033",
        secondary: "#555555",
        neutral: "#FEFBF6",
        accent: "#FF6426",
      },
      fontFamily: {
        lora: ['"Lora"', "serif"],
        cardo: ['"Cardo"', "serif"],
      },
    },
  },
  plugins: [
  ],
}


