const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/js/features/lightbox.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
// Test the renderer's content and interactions without a browser or dependencies.
class Element {
  constructor(tag = 'div') {
    this.tagName = tag;
    this.children = [];
    this.attributes = {};
    this.events = {};
    this.className = '';
    this.classList = { toggle: (name, active) => {
      const names = new Set(this.className.split(/\s+/).filter(Boolean));
      active ? names.add(name) : names.delete(name);
      this.className = [...names].join(' ');
    } };
  }
  set textContent(value) { this.text = String(value); this.children = []; }
  get textContent() { return (this.text || '') + this.children.map(child => child.textContent).join(''); }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.text = ''; this.children = [...nodes]; }
  setAttribute(name, value) { this.attributes[name] = value; }
  addEventListener(name, handler) { this.events[name] = handler; }
  focus() { this.focused = true; }
  animate() { animationCount++; return { cancel() {} }; }
}
const ids = new Map([...html.matchAll(/\bid="([^"]+)"/g)].map(match => [match[1], new Element()]));
let reduceMotion = false;
let animationCount = 0;
const context = {
  document: { createElement: tag => new Element(tag), getElementById: id => ids.get(id), querySelector: () => new Element() },
  window: { matchMedia: () => ({ matches: reduceMotion }) }
};
const renderer = source.slice(source.indexOf('  const projectsData ='), source.indexOf('  const dossierModal ='));
vm.runInNewContext(`${renderer}\nglobalThis.data = projectsData; globalThis.render = renderTechStack;`, context);
const descendants = node => node.children.flatMap(child => [child, ...descendants(child)]);
let selectionChecks = 0;
for (const data of Object.values(context.data)) {
  context.render(data);
  const groups = data.stackGroups || [{ items: data.tech.map(name => ({ name })) }];
  const expected = groups.flatMap(group => group.items);
  const buttons = descendants(ids.get('lbTechChips')).filter(node => node.className === 'stack-component-button');
  assert.equal(buttons.length, expected.length);
  assert.equal(ids.get('stackPrevious').disabled, true);
  buttons.forEach((button, index) => {
    button.events.click();
    assert.equal(ids.get('stackSelectedName').textContent, expected[index].name);
    if (expected[index].description) assert.equal(ids.get('stackSelectedDescription').textContent, expected[index].description);
    assert.equal(buttons.filter(node => node.attributes['aria-pressed'] === 'true').length, 1);
    assert.equal(ids.get('stackPrevious').disabled, index === 0);
    assert.equal(ids.get('stackNext').disabled, index === buttons.length - 1);
    const group = groups.find(group => group.items.some(item => item.name === expected[index].name));
    assert.equal(ids.get('stackSelectedContext').textContent, group.description || data.summary || data.category, 'Inspector must show only the original short context');
    selectionChecks++;
  });
  ids.get('stackPrevious').onclick();
  assert.equal(ids.get('stackSelectedName').textContent, expected.at(-2).name);
  ids.get('stackNext').onclick();
  assert.equal(ids.get('stackSelectedName').textContent, expected.at(-1).name);
  let prevented = false;
  buttons.at(-1).events.keydown({ key: 'ArrowDown', preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(buttons[0].focused, true);
  assert.equal(ids.get('stackSelectedName').textContent, expected[0].name);
  for (const logo of descendants(ids.get('lbTechChips')).filter(node => node.tagName === 'img')) {
    assert(fs.existsSync(path.join(root, logo.src)), `Missing logo: ${logo.src}`);
  }
  reduceMotion = true;
  const before = animationCount;
  buttons[1].events.click();
  assert.equal(animationCount, before, 'Reduced motion must skip the detail animation');
  reduceMotion = false;
}
const idList = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert(!ids.has('stackNotesList'), 'Implementation notes must not appear separately below the inspector');
assert.equal(new Set(idList).size, idList.length, 'Duplicate HTML IDs');
for (const match of html.matchAll(/(?:src|href)="(assets\/[^"?]+)(?:\?[^" ]*)?"/g)) {
  assert(fs.existsSync(path.join(root, match[1])), `Missing asset: ${match[1]}`);
}
console.log(`PASS: 4 projects, ${selectionChecks} component selections, previous/next, keyboard navigation, reduced motion, short descriptions, no separate implementation notes, unique IDs, and local assets.`);
