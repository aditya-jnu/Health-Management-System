/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
        lato: ["Lato"],
        poppins: ["Poppins"],
        garamond: ["Garamond"],
      },
      colors: {
        "primary-blue": "#1B374C",
        "secondary-blue": "#0C5C97",
        "navbg": "#E4E4E7",
        "logocolor": "#32acff",
        "primary-gray": "#7B827E",
        "secondary-white": "#E8EBED",
        "white-text-secondary": "#B8C1C8",
        "navWhite": "#FFFFFF",
        "stone": "#6B7280",
        
        whitesmoke: "#F1F1E6",
        Black1: "#000000",
        Red: "#ff0000",
        formLable: "#555555",
        formLabl: "#b9b9b9",
      },
    },
  },
  plugins: [],
}