import { generatePages } from './generate-pages';
import { buildTailwind } from './tailwind';

export async function build() {
  await generatePages();
  await buildTailwind();
}

await build();
