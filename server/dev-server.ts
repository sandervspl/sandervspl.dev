import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import watch from 'glob-watcher';

import { build } from '../scripts/build';

watch(['src/**/*.html', 'src/**/*.md'], async (done) => {
  await build();
  done();
});

const app = new Hono();

app.use('/dist/*', serveStatic({ root: './' }));

export default app;
