/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors:{
        black: "#000000",
        orange:{
          50: "#CF6900", 
          100:"#F57C00"
        },
        blue: "#1267FC",
        white:"#FFFFFF",
        gray: {
          50: "#D9D9D9",
          100:"#6C757D",
          150:"#343A40",
        },
        "success": {
          50: "#1FD636",
          100:"#3F943E"
        },
        "failure": {
          50: "#8B2A2D",
          100:"#8D0606"
        },
      }
    },
  },
  plugins: [],
}

