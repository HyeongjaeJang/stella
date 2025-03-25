import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        xxl: "50%",
      },
      colors: {
        card: "#788fd6",
        button: "#8ea8ff",
      },
    },
  },
  plugins: [],
} satisfies Config;
