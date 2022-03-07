module.exports = {
  mode: 'jit',

  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
  ],

  purge: [
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
        complete: '2px 3px 20px 6px rgba(86,86,86,0.3)',
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
      grayscale: {
        50: '50%',
      },
      width: {
        128: '32rem',
      },
    },
  },
  postcssOptions: {},
};
