import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { securityHeaders } from './deployment/security-headers.mjs';

const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.wav': 'audio/wav', '.m4a': 'audio/mp4',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8', '.json': 'application/json'
};
const publicFolders = new Set(['assets', 'image', 'image portofolio']);


export function createStaticServer(directory = process.cwd()) {
  const root = fs.realpathSync(directory);
  const isPublic = relative => relative === 'index.html' || publicFolders.has(relative.split(path.sep)[0]);
  const server = http.createServer(async (req, res) => {
    for (const [name, value] of Object.entries(securityHeaders)) res.setHeader(name, value);
    const fail = (status, message) => { res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(message); };
    const port = server.address()?.port;
    if (!['127.0.0.1:' + port, 'localhost:' + port].includes(req.headers.host?.toLowerCase())) return fail(403, 'Forbidden host');
    if (!['GET', 'HEAD'].includes(req.method)) { res.setHeader('Allow', 'GET, HEAD'); return fail(405, 'Method not allowed'); }
    let requestPath;
    try { requestPath = decodeURIComponent((req.url || '/').split('?')[0]); }
    catch { return fail(400, 'Invalid URL encoding'); }
    if (!requestPath.startsWith('/') || /[\\\x00-\x1f]/.test(requestPath)) return fail(400, 'Invalid path');
    if (requestPath === '/') requestPath = '/index.html';
    if (requestPath.split('/').some(segment => segment.startsWith('.'))) return fail(403, 'Forbidden path');
    const filePath = path.resolve(root, '.' + requestPath);
    const relative = path.relative(root, filePath);
    if (!relative || relative.startsWith('..') || path.isAbsolute(relative) || !isPublic(relative)) return fail(403, 'Forbidden path');
    const contentType = mime[path.extname(filePath).toLowerCase()];
    if (!contentType) return fail(403, 'Unsupported file type');
    try {
      const realPath = await fs.promises.realpath(filePath);
      const realRelative = path.relative(root, realPath);
      if (realRelative.startsWith('..') || path.isAbsolute(realRelative) || !isPublic(realRelative) || realRelative.split(path.sep).some(segment => segment.startsWith('.'))) return fail(403, 'Forbidden path');
      const stat = await fs.promises.stat(realPath);
      if (!stat.isFile()) return fail(404, 'Not found');
      let start = 0, end = stat.size - 1, status = 200;
      // Byte ranges make audio seeking efficient without loading the entire MP3 into memory.
      if (req.headers.range && req.method === 'GET') {
        const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
        if (!range || (!range[1] && !range[2])) { res.setHeader('Content-Range', 'bytes */' + stat.size); return fail(416, 'Invalid range'); }
        if (!range[1]) start = Math.max(0, stat.size - Number(range[2]));
        else { start = Number(range[1]); if (range[2]) end = Math.min(end, Number(range[2])); }
        if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start > end || start >= stat.size) { res.setHeader('Content-Range', 'bytes */' + stat.size); return fail(416, 'Invalid range'); }
        status = 206;
        res.setHeader('Content-Range', 'bytes ' + start + '-' + end + '/' + stat.size);
      }
      res.setHeader('Content-Type', contentType);
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Content-Length', Math.max(0, end - start + 1));
      res.setHeader('Cache-Control', 'no-cache');
      res.writeHead(status);
      if (req.method === 'HEAD' || !stat.size) return res.end();
      const stream = fs.createReadStream(realPath, { start, end });
      stream.on('error', () => res.destroy());
      res.on('close', () => stream.destroy());
      stream.pipe(res);
    } catch (error) {
      if (!res.headersSent) fail(error.code === 'ENOENT' || error.code === 'ENOTDIR' ? 404 : 500, 'Not found');
      else res.destroy();
    }
  });
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  createStaticServer().listen(8000, '127.0.0.1', () => console.log('http://127.0.0.1:8000'));
}
