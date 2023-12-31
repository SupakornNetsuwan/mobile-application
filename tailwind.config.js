/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple": {
          "primary": "#B146C2",
          "secondary": "#F8F1F9",
        },
        "pink": {
          "primary": "#f6dffc"
        }
      },
      fontFamily: {
        "noto": "noto",
        "noto-semibold": "noto-semibold",
        "noto-medium": "noto-medium",
        "noto-bold": "noto-bold",
        "noto-extrabold": "noto-extrabold"
      }
    },
  },
  plugins: [],
}

