/* @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./assets/presets/**/*", "./src/**/*.{vue,js,ts,jsx,tsx,html}"],
    darkMode: 'false',
    theme: {
      extend: {
          colors: {
              'primary': {
                  '400': 'rgb(var(--primary-400) / <alpha-value>)',
                  '600': 'rgb(var(--primary-600) / <alpha-value>)'
              },
              'surface-0': 'rgb(var(--surface-0))',
              'surface-50': 'rgb(var(--surface-50))',
              'surface-100': 'rgb(var(--surface-100))',
              'surface-200': 'rgb(var(--surface-200))',
              'surface-300': 'rgb(var(--surface-300))',
              'surface-400': 'rgb(var(--surface-400))',
              'surface-500': 'rgb(var(--surface-500))',
              'surface-600': 'rgb(var(--surface-600) / <alpha-value>)',
              'surface-700': 'rgb(var(--surface-700))',
              'surface-800': 'rgb(var(--surface-800))',
              'surface-900': 'rgb(var(--surface-900))',
              'surface-950': 'rgb(var(--surface-950))'
          }
      },
    },
    plugins: [],
  //   daisyui: {
  //     themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"],
  //   },
  };
  