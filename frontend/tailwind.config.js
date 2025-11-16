module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF7E6",
        mocha: "#6B4423",
        coffee: "#6F4E37",
        amber: "#D97706",
        latte: "#f5e6d3",
        caramel: "#d8b384",
      },
    },
  },
  daisyui: {
    themes: false,
  },
  plugins: [require("daisyui")],
};
