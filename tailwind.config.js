/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false, // Evita que Tailwind sobrescriba los estilos base de PrimeReact
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
