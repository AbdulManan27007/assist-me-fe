import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: { mob: { max: '1024px' }, desk: { min: '1025px' } },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        accent: {
          DEFAULT: '#FF7125',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#DC3545',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        'black-1': '#202125',
        'black-2': '#252E36',
        'black-3': '#303940',
        'black-4': '#3D454C',
        'black-5': '#495057',
        'white-1': '#FFFFFF',
        'white-2': '#F3F3F3',
        'white-3': '#E7E8E9',
        'white-4': '#D3D4D5',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        manrope: 'var(--font-manrope)',
      },
      boxShadow: {
        'custom-soft': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({
      addUtilities,
    }: {
      addUtilities: (utilities: Record<string, Record<string, string>>) => void;
    }) {
      addUtilities({
        '.truncate-lines-3': {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
          '-webkit-line-clamp': '3',
          'line-clamp': '3',
        },
        '.truncate': {
          overflow: 'hidden',
          maxHeight: 'var(--truncate-height, auto)',
        },
        '.truncate--line-clamped': {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
        },
        '.truncate--expanded': {
          maxHeight: 'var(--truncate-height-expanded, auto)',
        },
      });
    },
  ],
};
export default config;
