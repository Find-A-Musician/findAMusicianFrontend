module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        asap: ['Asap', 'sans-serif'],
      },
      colors: {
        purple: {
          1000: '#58335E',
        },
      },
      boxShadow: {
        complete: '0 0 25px rgba(0,0,0,0.25)',
      },
      keyframes: {
        'enter-right': {
          '0%': { transform: 'translateX(100vw)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'enter-right': 'enter-right 300ms ease-in-out',
      },
    },
  },
  postcssOptions: {},
};
