// shop/tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primarygray: "#f8f8f8",
        qblack: "#222222",
        qyellow: "#FFBB38",
        qred: "#EF262C",
        qgray: "#797979",
        qblacktext: "#1D1D1D",
        qgraytwo: "#8E8E8E",
        "qgray-border": "#EFEFEF",
        "qblue-white": "#CBECFF",
        "qh2-green": "#2D6F6D",
        "qh4-pink": "#FDB2BB",
        "qh5-bwhite": "#95D7DE",
        "qh3-blue": "#1868D5",
      },
      scale: {
        60: "0.6",
      },
    },
  },
  plugins: [],
}
