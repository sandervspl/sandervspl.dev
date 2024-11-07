/**
 * @TODO Update for Cloudflare
 */

import { markdownToHtml } from './markdown-to-html';
import { moveHtmlPages } from './move-html-pages';

const rewrites: { source: string; destination: string }[] = [];

console.info('🏗️ Generating pages...');

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

console.info('✅ Pages generated');
