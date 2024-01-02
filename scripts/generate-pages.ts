import fs from 'node:fs';

import { markdownToHtml } from './markdown-to-html';
import vercelJSON from '../vercel.json';
import { moveHtmlPages } from './move-html-pages';

export async function generatePages() {
  // Vercel rewrites list
  const rewrites: { source: string; destination: string }[] = [];

  console.info('🏗️ Generating pages...');

  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }

  // Transform every markdown file in the given directories to HTML
  for await (const dir of ['blog']) {
    const pages = await markdownToHtml(`src/${dir}`);

    for await (const page of pages) {
      const filename = page.pathname.replace(/\.md$/, '.html');
      const outputPath = filename.replace('src', 'dist');
      await Bun.write(outputPath, page.content);

      rewrites.push({
        source: `/${dir}/${outputPath.split(`/${dir}/`).at(-1)?.replace('.html', '')}`,
        destination: `/dist/${dir}/${outputPath.split(`${dir}/`).at(-1)}`,
      });
    }

    for await (const page of await moveHtmlPages('src')) {
      rewrites.push({
        source: `/${page.pathname.split('/').at(-1)?.replace('.html', '').replace('index', '')}`,
        destination: `/dist/${page.pathname.split('/').at(-1)}`,
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
}
