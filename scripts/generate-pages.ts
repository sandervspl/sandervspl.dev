import { markdownToHtml } from './markdown-to-html';
import vercelJSON from '../vercel.json';

// Vercel rewrites list
const rewrites: { source: string; destination: string }[] = [];

console.info('🏗️ Generating pages...');

// Transform every markdown file in the given directories to HTML
for await (const dir of ['blog']) {
  const pages = await markdownToHtml(dir);

  for await (const page of pages) {
    const filename = page.pathname.replace(/\.md$/, '.html');

    await Bun.write(filename, page.content);

    rewrites.push({
      source: `/${dir}/${filename.split(`/${dir}/`).at(-1)?.replace('.html', '')}`,
      destination: `/${dir}/${filename.split(`${dir}/`).at(-1)}`,
    });
  }
}

// Update rewrites in vercel.json
await Bun.write(
  'vercel.json',
  JSON.stringify(
    {
      ...vercelJSON,
      rewrites,
    },
    null,
    2,
  ),
);

console.info('✅ Pages generated');
