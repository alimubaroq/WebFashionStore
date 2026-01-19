import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#eb8b47",
        "primary-dark": "#d97a3a",
        "background-light": "#fcfaf8",
        "background-dark": "#211811",
        "surface-light": "#ffffff",
        "surface-dark": "#2d241d",
        "text-primary": "#1b130e",
        "text-secondary": "#976d4e",
        "border-light": "#f3ece7",
        "neutral-dark": "#1b130e",
        "neutral-light": "#fcfaf8",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"],
        "sans": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    containerQueries,
    forms,
  ],
}
