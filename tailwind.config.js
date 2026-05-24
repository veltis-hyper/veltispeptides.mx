/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#53BCB0",
          dark: "#3A9A8F",
          light: "#A8DED9",
        },
        pdp: {
          canvas: "#f9f8f9",
          panel: "#efedee",
          green: "#3A9A8F",
        },
        "text-primary": "#262626",
        "text-muted": "#808080",
        "bg-primary": "#efedee",
        "bg-alt": "#efedee",
        "bg-warm": "#f9f8f9",
        "border-primary": "#e8e6e7",
      },
      fontFamily: {
        neuton: ['var(--font-neuton)', 'serif'],
        manrope: ['var(--font-manrope)', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
