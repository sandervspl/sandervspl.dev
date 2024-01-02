import rehypeSanitize from 'rehype-sanitize';
import remarkRehype from 'remark-rehype';
import remarkStringify from 'remark-stringify';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import { unified } from 'unified';
import { matter } from 'vfile-matter';
import { Glob } from 'bun';
import { read } from 'to-vfile';

type Node = import('unist').Node;
type VFile = import('vfile').VFile;

type Meta = {
  title?: string;
};

const html = String.raw;

function template(content: string, meta: Meta) {
  return html`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="/dist/styles.css" rel="stylesheet" />
    ${meta.title ? `<title>${meta.title}</title>` : ''}
    <meta
      name="description"
      content="Sander Vispoel is a fullstack developer from The Netherlands."
    />
    <link
      rel="icon"
      href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐠</text></svg>"
    />
    <script>
      window.va =
        window.va ||
        function () {
          (window.vaq = window.vaq || []).push(arguments);
        };
    </script>
    <script defer src="/_vercel/insights/script.js"></script>
  </head>
  <body class="prose text-neutral-700 bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-200 transition-colors">
    <main class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 my-20">
      ${content}
    </main>
  </body>
</html>`;
}

export async function markdownToHtml(dir: string) {
  const glob = new Glob('*.md');

  const pages: { pathname: string; content: string }[] = [];

  for await (const file of glob.scan({ cwd: dir, absolute: true })) {
    const matterOutput = await unified()
      .use(remarkParse)
      .use(remarkStringify)
      .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
      .use(() => (tree: Node, file: VFile) => {
        matter(file);
      })
      .process(await read(file));

    const output = await unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(await Bun.file(file).text());

    // console.log(matterOutput.data.matter);
    // console.log(template(String(output), matterOutput.data.matter as Meta));

    pages.push({
      pathname: file,
      content: template(String(output), matterOutput.data.matter as Meta),
    });
  }

  return pages;
}
