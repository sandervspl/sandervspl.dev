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
  return html`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    ${meta.title ? `<title>${meta.title}</title>` : ''}
  </head>
  <body class="prose">
    ${content}
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
