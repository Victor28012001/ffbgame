/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: 
    {colors: {
      bodyBg: "#101018",
      navBg: "#0f161b",
      myBlack: "#201f2a",
      myGreen: "#58105a",
      myYellow: "#ffbe18",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      barlow: ["Barlow", "sans-serif"],
      belanosima: ["Belanosima", "sans-serif"],
    },
    screens: {
      "2xl": {
        min: "1500px",
        max: "1800px",
      },
      xxl: {
        min: "1400px",
        max: "1500px",
      },
    },
    keyframes: {
      textRotate1: {
        '0%, 40%': { transform: 'translate3d(0, 0%, 0) rotateX(0deg)' },
        '60%, 100%': { transform: 'translate3d(0, -100%, 0) rotateX(-90deg)' },
      },
      textRotate2: {
        '0%, 40%': { transform: 'translate3d(0, 100%, 0) rotateX(-90deg)' },
        '60%, 100%': { transform: 'translate3d(0, 0%, 0) rotateX(0deg)' },
      },
      
    },
    animation: {
      textRotate1: 'textRotate1 2.4s infinite alternate',
      textRotate2: 'textRotate2 2.4s infinite alternate',
    },
    fontSize: {
      title: '2rem',
      subtitle: '1.5rem',
    },
  },
  },
  plugins: [],
}

