import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';
import { handleAcuity } from './server/acuity';

/** Serves /api/acuity/* in dev the same way the Cloudflare Worker does in production. */
const acuityDevProxy: Plugin = {
  name: 'acuity-dev-proxy',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const response = await handleAcuity(new URL((req as { url?: string }).url ?? '/', 'http://localhost')).catch((error) => new Response(String(error), { status: 502 }));
      if (!response) return next();
      res.statusCode = response.status;
      response.headers.forEach((value, key) => res.setHeader(key, value));
      res.end(new Uint8Array(await response.arrayBuffer()));
    });
  },
};

export default defineConfig({ plugins: [react(), tailwindcss(), acuityDevProxy] });
