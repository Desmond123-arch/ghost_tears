/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add any customizations here
    },
  },
  plugins: [
    require('daisyui'), // Ensure DaisyUI is included as a plugin
  ],
  daisyui: {
    themes: ["cyberpunk"],
  },
}
