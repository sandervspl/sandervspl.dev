import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default ({
  content: ['./**/*.html'],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  plugins: [typography],
} satisfies Config);
