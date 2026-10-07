const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const manifest = JSON.parse(read('tools/structure-manifest.json'));
const baselineJs = read('archive/baseline/script.js');
const baselineHtml = read('archive/baseline/index.html');
const html = read('index.html');
assert.equal(manifest.css.map(read).join(''), read('archive/baseline/styles.css'), 'CSS content or order changed');
let joinedJs = '';
for (const { name, file } of manifest.js) {
  const text = read(file);
  new vm.Script(text, { filename: file });
  const prefix = `window.SatyaPortfolio.features['${name}'] = function () {\n`;
  assert(text.startsWith(prefix) && text.endsWith('};\n'), `Unexpected feature wrapper: ${file}`);
  joinedJs += text.slice(prefix.length, -3);
}
assert.equal(joinedJs, baselineJs.slice(baselineJs.indexOf('  // Prevent browser'), baselineJs.lastIndexOf('})();')), 'Feature logic or order changed');
const assetTags = /[ \t]*<(?:link rel="stylesheet" href="(?:styles\.css|assets\/css\/[^\"]+)\?v=\d+"|script src="(?:script\.js|assets\/js\/[^\"]+)\?v=\d+" defer)>(?:<\/script>)?\r?\n/g;
assert.equal(html.replace(assetTags, ''), baselineHtml.replace(assetTags, ''), 'Page markup changed');
const styles = [...html.matchAll(/href="(assets\/css\/[^?]+)\?/g)].map(m => m[1]);
assert.deepEqual(styles, manifest.css, 'Stylesheet load order changed');
const scripts = [...html.matchAll(/<script src="([^?]+)\?[^\"]+" defer>/g)].map(m => m[1]);
assert.deepEqual(scripts, ['assets/js/app.js', ...manifest.js.map(p => p.file), 'assets/js/main.js'], 'Script load order changed');
scripts.forEach(file => new vm.Script(read(file), { filename: file }));
const calls = [];
const context = vm.createContext({ window: {} });
vm.runInContext(read('assets/js/app.js'), context);
for (const { name } of manifest.js) context.window.SatyaPortfolio.features[name] = () => calls.push(name);
vm.runInContext(read('assets/js/main.js'), context);
assert.deepEqual(calls, manifest.js.map(p => p.name));
let assetCount = 0;
for (const match of html.matchAll(/(?:src|href)="([^\"]+)"/g)) {
  const url = match[1];
  if (/^(?:[a-z]+:|#|\/\/)/i.test(url)) continue;
  const file = decodeURIComponent(url.split(/[?#]/)[0]);
  if (!file) continue;
  assert(fs.existsSync(path.join(root, file)), `Missing asset: ${file}`);
  assetCount++;
}
for (const match of joinedJs.matchAll(/cover: '([^']+)'/g)) {
  assert(fs.existsSync(path.join(root, match[1])), `Missing project cover: ${match[1]}`);
  assetCount++;
}
console.log(`PASS: ${manifest.css.length} CSS files match baseline exactly; ${manifest.js.length} JS features preserve source and initialization order; markup unchanged; ${assetCount} local asset references valid.`);
