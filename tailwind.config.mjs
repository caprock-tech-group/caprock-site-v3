/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1020",
        fog: "#E2E8F0",
        steel: "#94A3B8"
      },
      boxShadow: { soft: "0 18px 60px rgba(0,0,0,0.25)" },
      maxWidth: { container: "1200px" },
      fontFamily: {
        sans: ["ui-sans-serif","system-ui","Inter","Segoe UI","Roboto","Helvetica","Arial","sans-serif"],
        mono: ["ui-monospace","SFMono-Regular","Menlo","Monaco","Consolas","Liberation Mono","Courier New","monospace"],
      }
    },
  },
  plugins: [],
};
