/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#242565',
        secondaryColor: '#ed4690',
        ChryslerBlue: "#5522CC",
        DarkTextPurple: "#7778B0",
        LightText: "#E2E0FF",
        LightGrayText: "DFDEF1",
        BackgroundLight: "#F0F0FF",
        BackgroundDark: "#0D0A2C",
        HeadingsBlack: "#0D0A2C",
        Color1000: "#5F5C7F",
        Color900: "#7F7CA2",
        Color800: "#A4A2C4",
        Color700: "#B4B2CD",
        Color600: "#CCCAE3",
        Color400: "#EFEEFB",
        Color300: "#F9F9FF",
        Color200: "#F9F9FF",
        White: "#FFFFFF",
        
        // Colores de Tremor
        'tremor-brand-faint': "#eff6ff",
        'tremor-brand-muted': "#bfdbfe",
        'tremor-brand-subtle': "#60a5fa",
        'tremor-brand': "#3b82f6",
        'tremor-brand-emphasis': "#1d4ed8",
        'tremor-brand-inverted': "#ffffff",

        'tremor-background-muted': "#f9fafb",
        'tremor-background-subtle': "#f3f4f6",
        'tremor-background': "#ffffff",
        'tremor-background-emphasis': "#374151",

        'tremor-border': "#e5e7eb",

        'tremor-ring': "#e5e7eb",

        'tremor-content-subtle': "#9ca3af",
        'tremor-content': "#6b7280",
        'tremor-content-emphasis': "#374151",
        'tremor-content-strong': "#111827",
        'tremor-content-inverted': "#ffffff",
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem"],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    require('@headlessui/tailwindcss'),
    require('tailwind-scrollbar-hide')
  ],
};