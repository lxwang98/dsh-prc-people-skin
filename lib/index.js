// dsh-prc-people-skin — host half.
// Serves the self-drawn banner, the faint Beijing skyline and the Dream Skin
// theme pack. The browser half does all styling and the workbench UI.
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const assets = join(root, 'assets');

const ROUTES = [
  { path: '/dsh-prc-people-skin/banner.svg', file: join(assets, 'banner.svg'), type: 'image/svg+xml; charset=utf-8' },
  { path: '/dsh-prc-people-skin/skyline.svg', file: join(assets, 'skyline.svg'), type: 'image/svg+xml; charset=utf-8' },
  { path: '/dsh-prc-people-skin/icon.svg', file: join(assets, 'icon.svg'), type: 'image/svg+xml; charset=utf-8' },
  { path: '/dsh-prc-people-skin/prc-people.dsh-theme.json', file: join(root, 'themes', 'prc-people.dsh-theme.json'), type: 'application/json; charset=utf-8' },
];

export default {
  inject: ['webServer'],
  apply(ctx) {
    let registered = 0;
    for (const route of ROUTES) {
      let dispose;
      try {
        dispose = ctx.webServer.register({
          kind: 'exact',
          path: route.path,
          handler: async (req, res) => {
            try {
              const bytes = await readFile(route.file);
              res.writeHead(200, {
                'Content-Type': route.type,
                'Content-Length': bytes.length,
                'Cache-Control': 'public, max-age=3600',
              });
              res.end(bytes);
            } catch (err) {
              console.error(`[prc-people-skin] asset route failed: ${route.path}`, err);
              res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
              res.end('dsh-prc-people-skin asset not found');
            }
          },
        });
        registered += 1;
      } catch (err) {
        console.warn(`[prc-people-skin] route ${route.path} already served elsewhere, skipping:`, err?.message ?? err);
        continue;
      }
      ctx.effect(() => dispose);
    }
    console.log(`[prc-people-skin] host half active (${registered}/${ROUTES.length} asset routes)`);
  },
};
