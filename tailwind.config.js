/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "press-start": ['"Press Start 2P"', "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },

    extend: {
      height: {
        nav: "50px",
      },
      backgroundImage: {
        "background-1": `url("/src/assets/background1.jpg")`,
      },
    },
  },
  plugins: [],
};
