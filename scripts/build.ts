import { execSync } from 'node:child_process';

import { generatePages } from './generate-pages';

export async function build() {
  await generatePages();
  execSync('tailwindcss -i ./src/styles.css -o ./dist/styles.css', { stdio: 'inherit' });
}

await build();
