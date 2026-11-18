// Production server for the Amp Box: serves the built site from dist/ and the
// /api/acuity/* proxy, mirroring server/worker.ts on Cloudflare.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { handleAcuity } from './acuity.ts';

const root = join(import.meta.dirname, '..', 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon', '.json': 'application/json', '.txt': 'text/plain' };

async function file(pathname) {
  const path = join(root, normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, ''));
  try {
    if ((await stat(path)).isFile()) return path;
  } catch {}
  return null;
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const api = await handleAcuity(url).catch((error) => new Response(String(error), { status: 502 }));
  if (api) {
    res.statusCode = api.status;
    api.headers.forEach((value, key) => res.setHeader(key, value));
    return res.end(new Uint8Array(await api.arrayBuffer()));
  }
  const path = (await file(url.pathname)) ?? join(root, 'index.html');
  res.setHeader('content-type', types[extname(path)] ?? 'application/octet-stream');
  res.setHeader('cache-control', url.pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache');
  res.end(await readFile(path));
}).listen(Number(process.env.PORT ?? 3000), '0.0.0.0');
