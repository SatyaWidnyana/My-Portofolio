import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const mime = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon'
};

http.createServer((req, res) => {
  let requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
  if (requestPath === '/') requestPath = '/index.html';
  const filePath = path.join(root, requestPath);
  if (!filePath.startsWith(root)) return res.writeHead(403).end();
  fs.readFile(filePath, (error, data) => {
    if (error) return res.writeHead(404).end('Not found');
    res.writeHead(200, { 'Content-Type': mime[path.extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(8000, '127.0.0.1', () => console.log('http://127.0.0.1:8000'));
