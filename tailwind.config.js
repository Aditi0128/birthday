export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        slideGradient: "slideGradient 15s ease infinite",
      },
      keyframes: {
        slideGradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      backgroundSize: {
        400: "400% 400%",
      },
    },
  },
  plugins: [],
};
