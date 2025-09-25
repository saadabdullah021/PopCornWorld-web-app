/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // 🌙 Dark mode support (use `class="dark"`)
  theme: {
    extend: {
      colors: {
        // 🎨 Root colors mapped to Tailwind
        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: "var(--primary-color)",      // text / heading
        secondary: "var(--secondary-color)",  // accent
        button: {
          bg: "var(--button-bg-color)",
          text: "var(--button-text-color)",
        },

        // ✅ Extra modern palette (backup for usage)
        emerald: {
          400: "#34d399",
          500: "#10b981",
        },
        brand: {
          yellow: "#ffc222",
          green: "#8BC34A",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // ✍️ Default font
      },
    },
  },
  plugins: [],
};
