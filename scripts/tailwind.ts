import { execSync } from 'node:child_process';

export async function buildTailwind() {
  execSync('tailwindcss -i ./src/styles.css -o ./dist/styles.css', { stdio: 'inherit' });
}
