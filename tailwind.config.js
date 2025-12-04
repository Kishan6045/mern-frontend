// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };




/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "380px",   // extra small phones
      sm: "480px",   // small phones
      md: "768px",   // tablets
      lg: "1024px",  // laptops
      xl: "1280px",  // big screens
    },
    extend: {
      colors: {
        primary: "#F5C542",
        dark: "#0A0A0A",
        dark2: "#121212",
        card: "#1A1A1A",
        border: "#2A2A2A",
      },

      fontFamily: {
        pop: ["Poppins", "sans-serif"],
      },

      boxShadow: {
        soft: "0 0 15px rgba(255, 204, 0, 0.15)",
        card: "0 8px 20px rgba(0,0,0,0.3)",
      },

      spacing: {
        safe: "max(env(safe-area-inset-bottom), 16px)", // iPhone safe area
      },
    },
  },
  plugins: [],
};
