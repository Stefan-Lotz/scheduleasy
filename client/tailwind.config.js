/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        slate: "#264653",
        mint: "#2A9D8F",
        saffron: "#E9C46A",
        pumpkin: "#F4A261",
        salmon: "#E76F51",
        222: "#222222",
      },
      fontFamily: {
        shrikhand: "Shrikhand, serif",
        monda: "Monda, sans-serif",
        syne: "Syne, sans-serif",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
