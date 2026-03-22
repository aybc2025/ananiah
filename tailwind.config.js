/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: {
          deep: '#0d0d2b',
          mid: '#1a1a3e',
          twilight: '#2d2b55',
          glow: '#4a3f6b',
        },
        cloud: {
          white: '#f0eef5',
          pink: '#f5d5e0',
          lavender: '#d8cfe8',
          peach: '#fce4d6',
        },
        accent: {
          gold: '#ffd166',
          'gold-warm': '#f4a261',
          rose: '#e76f8b',
          teal: '#56c4b5',
          violet: '#8b5cf6',
        },
        stat: {
          body: '#e76f51',
          brain: '#5e9fe0',
          heart: '#e05e9f',
        },
        result: {
          oops: '#f4a261',
          tough: '#e9c46a',
          success: '#56c4b5',
          great: '#8b5cf6',
          triumph: '#ffd166',
        },
      },
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        twinkle: 'twinkle 2s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'bounce-in': 'bounceIn 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'spin-3d': 'spin3d 1.5s ease-out forwards',
        'stamp-in': 'stampIn 0.5s ease-out forwards',
        'cloud-drift': 'cloudDrift 40s linear infinite',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        twinkle: { '0%, 100%': { opacity: '0.3' }, '50%': { opacity: '1' } },
        glowPulse: { '0%, 100%': { boxShadow: '0 0 20px rgba(255,209,102,0.3)' }, '50%': { boxShadow: '0 0 40px rgba(255,209,102,0.6)' } },
        bounceIn: { '0%': { transform: 'scale(0)' }, '60%': { transform: 'scale(1.15)' }, '80%': { transform: 'scale(0.95)' }, '100%': { transform: 'scale(1)' } },
        fadeIn: { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeInUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(40px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        spin3d: { from: { transform: 'rotateX(0) rotateY(0) rotateZ(0)' }, to: { transform: 'rotateX(720deg) rotateY(540deg) rotateZ(360deg)' } },
        stampIn: { '0%': { transform: 'scale(3)', opacity: '0' }, '60%': { transform: 'scale(0.9)', opacity: '1' }, '80%': { transform: 'scale(1.05)' }, '100%': { transform: 'scale(1)' } },
        cloudDrift: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
      },
    },
  },
  plugins: [],
};
