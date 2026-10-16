import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { productionHeaders } from '../deployment/security-headers.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
const allowed = ['assets', 'image', 'image portofolio', 'index.html', 'vercel.json'];
const entries = await fs.readdir(output);
assert(entries.every(entry => allowed.includes(entry)), 'Unexpected top-level output file');
assert(allowed.every(entry => entries.includes(entry)), 'Missing public entry');
const all = new Set();
async function walk(directory, prefix = '') {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    assert(!entry.isSymbolicLink(), 'Output symlink');
    assert(!entry.name.startsWith('.') && !entry.name.endsWith('.map'), 'Private/debug output: ' + entry.name);
    const relative = prefix ? prefix + '/' + entry.name : entry.name;
    if (entry.isDirectory()) await walk(path.join(directory, entry.name), relative);
    else all.add(relative);
  }
}
await walk(output);
let checked = 0;
function check(reference, base = '') {
  if (/^(?:[a-z]+:|#|\/\/)/i.test(reference)) return;
  const decoded = decodeURIComponent(reference.split('?')[0].split('#')[0]);
  if (!decoded) return;
  const normalized = path.posix.normalize(path.posix.join(base, decoded));
  assert(all.has(normalized), 'Missing asset or case mismatch: ' + normalized);
  checked++;
}
for (const file of all) {
  if (!/\.(html|css|js)$/.test(file)) continue;
  const source = await fs.readFile(path.join(output, file), 'utf8');
  if (file.endsWith('.html')) for (const m of source.matchAll(/(?:src|href)="([^"]+)"/g)) check(m[1]);
  if (file.endsWith('.css')) for (const m of source.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\)'"\s]+))\s*\)/g)) check(m[1] || m[2] || m[3], path.posix.dirname(file));
  if (file.endsWith('.js')) for (const m of source.matchAll(/["']((?:assets|image|image portofolio)\/[^"'<>]+?\.(?:png|jpe?g|webp|svg|ico|mp3))(?:\?[^"']*)?["']/g)) check(m[1]);
}
const source = await fs.readFile(path.join(output, 'index.html'), 'utf8');
assert(source.includes('href="https://www.instagram.com/syllvstone/"'), 'Instagram URL missing');
for (const name of ['LinkedIn', 'Dribbble']) assert(source.includes('class="contact-social-static" role="img" aria-label="' + name + '"'), 'Unlinked icon should be static: ' + name);
const config = JSON.parse(await fs.readFile(path.join(root, 'vercel.json'), 'utf8'));
const prebuilt = JSON.parse(await fs.readFile(path.join(output, 'vercel.json'), 'utf8'));
for (const [key, value] of Object.entries(productionHeaders)) {
  assert(config.headers[0].headers.some(header => header.key === key && header.value === value), 'Missing Vercel security header ' + key);
}
assert.deepEqual(config.headers, prebuilt.headers);
console.log('PASS: deploy allowlist, ' + all.size + ' files, ' + checked + ' case-sensitive asset references, social links, and Vercel security headers.');
