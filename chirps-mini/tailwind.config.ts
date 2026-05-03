import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000212",
        foreground: "#ffffff",
        primary: "#5e6ad2",
        muted: "#8a8f98",
        border: "rgba(255, 255, 255, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;