/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: 'var(--color-background)',
          foreground: 'var(--color-foreground)',
          muted: 'var(--color-muted)',
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
        },
        fontSize: {
          'h1': ['3rem', { lineHeight: '1.2' }],
          'h2': ['2.25rem', { lineHeight: '1.3' }],
          'h3': ['1.875rem', { lineHeight: '1.4' }],
          'body': ['1rem', { lineHeight: '1.6' }],
          'caption': ['0.875rem', { lineHeight: '1.5' }],
        },
        spacing: {
          'section': '5rem',
        },
        fontFamily: {
          heading: 'var(--font-heading)',
          body: 'var(--font-body)'
        }
      },
      screens: {
        sm: '640px',
        md: '991px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    plugins: [],
  }
  