/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        buttercream: {
          DEFAULT: '#FFE0AF',
          50: '#FFFDF9',
          100: '#FFF8EE',
          200: '#FFEECB',
          300: '#FFE0AF',
          400: '#F6CD88',
          500: '#EBB45B',
        },
        dustyrose: {
          DEFAULT: '#F1B4B1',
          50: '#FDF7F7',
          100: '#FAEDED',
          200: '#F7D7D5',
          300: '#F1B4B1',
          400: '#E78E89',
          500: '#DC6C66',
        },
        softmauve: {
          DEFAULT: '#C6A8CE',
          50: '#FAF7FB',
          100: '#F4EDF6',
          200: '#E5D3E9',
          300: '#C6A8CE',
          400: '#AC80B6',
          500: '#925B9E',
        },
        mistylavender: {
          DEFAULT: '#C1BECE',
          50: '#F7F7FA',
          100: '#EFEEF4',
          200: '#DEDDE7',
          300: '#C1BECE',
          400: '#A49FB5',
          500: '#87819C',
        },
        warmtaupe: {
          DEFAULT: '#C6BEA7',
          50: '#F9F8F5',
          100: '#F2F0EB',
          200: '#E2DED4',
          300: '#C6BEA7',
          400: '#A89E84',
          500: '#8A8066',
        },
        sagegreen: {
          DEFAULT: '#939F7F',
          50: '#F5F7F3',
          100: '#E9EDE5',
          200: '#D1DACB',
          300: '#939F7F',
          400: '#7B8866',
          500: '#64714F',
        },
        garden: {
          bg: '#B8D5B6',
          darkbg: '#121914',
          card: '#E8F2E6',
          darkcard: '#1C251F',
          cardborder: '#A0C29D',
          darkcardborder: '#2E3A32',
          text: '#1B2B1D',
          darktext: '#F0F5EE',
          secondary: '#3D553F',
          darksecondary: '#9EB0A1',
          hover: '#A9CCA6',
          darkhover: '#28332B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        mono: ['Fira Code', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'garden': '0 8px 30px rgba(193, 190, 206, 0.25)',
        'garden-lg': '0 14px 45px rgba(198, 168, 206, 0.28)',
        'garden-glow': '0 0 25px rgba(241, 180, 177, 0.45)',
        'sage-glow': '0 0 25px rgba(147, 159, 127, 0.4)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'petal-fall': 'petalFall 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
