import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ugg": "#06061a",
        "bg-ugg": "#181a1b",
        "text-ugg":"#4e5866",
        "text-ugg-white": "#92b3cd"
      },
      backgroundColor: {
        "ugg": "#06061a"
      },
      boxShadow: {
        "text-shadow-blue" : "0 0 3px #0000FF, 0 0 5px #0000FF"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-to-center": "radial-gradient(circle at center, transparent 0%, #06061a 85%)",
      },
    },
  },
  plugins: [],
};

export default config;