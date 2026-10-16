const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
const scripts = [...html.matchAll(/<script src="([^"?]+)(?:\?[^" ]*)?" defer>/g)].map(m => m[1]);
const styles = [...html.matchAll(/<link rel="stylesheet" href="(assets\/css\/[^"?]+)/g)].map(m => m[1]);
let references = 0;
function check(url, relativeTo = root) {
  if (/^(?:[a-z]+:|#|\/\/)/i.test(url)) return;
  const file = decodeURIComponent(url.split(/[?#]/)[0]);
  if (!file) return;
  assert(fs.existsSync(path.resolve(relativeTo, file)), 'Missing asset: ' + url);
  references++;
}
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) check(match[1]);
for (const file of scripts) new vm.Script(fs.readFileSync(path.join(root, file), 'utf8'), { filename: file });
for (const file of styles) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of source.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\)'"\s]+))\s*\)/g)) check(match[1] || match[2] || match[3], path.dirname(path.join(root, file)));
}
const registered = scripts.map(file => fs.readFileSync(path.join(root, file), 'utf8').match(/features\['([^']+)'\] = function/)).filter(Boolean).map(m => m[1]);
const main = fs.readFileSync(path.join(root, 'assets/js/main.js'), 'utf8');
assert.deepEqual([...main.matchAll(/features\['([^']+)'\]\(\)/g)].map(m => m[1]), registered, 'Initialization order differs from registrations');
assert.equal(scripts[0], 'assets/js/app.js');
assert.equal(scripts.at(-1), 'assets/js/main.js');
for (const match of html.matchAll(/<a\b([^>]*\btarget="_blank"[^>]*)>/g)) assert(/\brel="[^"]*noopener/.test(match[1]), 'External tab is missing noopener');
assert(!/\bon(?:click|load|error)\s*=/i.test(html), 'Inline script event handler');
console.log('PASS: ' + scripts.length + ' scripts parse; ' + styles.length + ' styles; ' + ids.length + ' unique IDs; ' + references + ' local references; initialization order and external-link guards.');
