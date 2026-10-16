import assert from 'node:assert/strict';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStaticServer } from '../server.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const server = createStaticServer(root);
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
function request(url, { method = 'GET', headers = {} } = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: '127.0.0.1', port, path: url, method, headers }, res => {
      const chunks = []; res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) }));
    }); req.on('error', reject); req.end();
  });
}
try {
  let cases = 0;
  for (const [url, status] of [
    ['/', 200], ['/index.html?test=1', 200], ['/assets/js/main.js', 200],
    ['/.git/config', 403], ['/.env', 403], ['/docs/TECH_STACK.md', 403],
    ['/tools/verify-server.mjs', 403], ['/server.mjs', 403], ['/archive/baseline/index.html', 403],
    ['/tmp/contact-qa.cjs', 403], ['/assets/../.git/config', 403],
    ['/assets/%2e%2e/.git/config', 403], ['/assets/%2e%2e%5c.git%5cconfig', 400],
    ['/assets/%00.css', 400], ['/%ZZ', 400], ['/%E0%A4%A', 400],
    ['/assets/not-present.png', 404], ['/assets/no.exe', 403]
  ]) { assert.equal((await request(url)).status, status, url); cases++; }
  const page = await request('/');
  assert.equal(page.headers['x-content-type-options'], 'nosniff');
  assert.equal(page.headers['x-frame-options'], 'DENY');
  assert(page.headers['content-security-policy'].includes("script-src 'self'"));
  assert.equal((await request('/', { headers: { Host: 'untrusted.example' } })).status, 403);
  assert.equal((await request('/', { method: 'POST' })).status, 405);
  const head = await request('/', { method: 'HEAD' });
  assert.equal(head.status, 200); assert.equal(head.body.length, 0);
  assert.equal(Number(head.headers['content-length']), page.body.length);
  const audio = '/assets/audio/holizna/blue-skies.mp3';
  const range = await request(audio, { headers: { Range: 'bytes=0-127' } });
  assert.equal(range.status, 206); assert.equal(range.body.length, 128);
  assert.equal(range.headers['content-type'], 'audio/mpeg');
  assert.match(range.headers['content-range'], /^bytes 0-127\//);
  const suffix = await request(audio, { headers: { Range: 'bytes=-64' } });
  assert.equal(suffix.status, 206); assert.equal(suffix.body.length, 64);
  for (const bad of ['bytes=5-2', 'bytes=99999999999-', 'bytes=0-1,4-5', 'bytes=-0']) {
    assert.equal((await request(audio, { headers: { Range: bad } })).status, 416, bad);
  }
  assert.equal((await request('/')).status, 200, 'Server survives malformed requests');
  console.log('PASS: ' + cases + ' path cases, invalid host/method, security headers, HEAD, audio MIME/ranges, and survival after malformed requests.');
} finally { await new Promise(resolve => server.close(resolve)); }
