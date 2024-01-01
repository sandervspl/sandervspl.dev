export async function moveHtmlPages(dir: string) {
  const glob = new Bun.Glob('*.html');

  const pages: { pathname: string; content: string }[] = [];

  for await (const file of glob.scan({ cwd: dir, absolute: true })) {
    const outputPath = file.replace('src', 'dist');
    await Bun.write(outputPath, await Bun.file(file).text());

    pages.push({
      pathname: file,
      content: await Bun.file(file).text(),
    });
  }

  return pages;
}
