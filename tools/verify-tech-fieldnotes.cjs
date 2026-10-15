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
    this.style = { setProperty: (name, value) => { this.style[name] = value; } };
    this.classList = { toggle: (name, active) => {
      const names = new Set(this.className.split(/\s+/).filter(Boolean));
      active ? names.add(name) : names.delete(name);
      this.className = [...names].join(' ');
    }, add: (...names) => names.forEach(name => this.classList.toggle(name, true)),
    remove: (...names) => names.forEach(name => this.classList.toggle(name, false)),
    contains: name => this.className.split(/\s+/).includes(name) };
  }
  set textContent(value) { this.text = String(value); this.children = []; }
  get textContent() { return (this.text || '') + this.children.map(child => child.textContent).join(''); }
  append(...nodes) { this.children.push(...nodes); }
  appendChild(node) { this.append(node); return node; }
  replaceChildren(...nodes) { this.text = ''; this.children = [...nodes]; }
  setAttribute(name, value) { this.attributes[name] = value; }
  removeAttribute(name) { delete this.attributes[name]; }
  getAttribute(name) { return this.attributes[name]; }
  querySelector(selector) {
    return descendants(this).find(node => selector.startsWith('.') ? node.classList.contains(selector.slice(1)) : node.tagName === selector);
  }
  addEventListener(name, handler) { this.events[name] = handler; }
  focus() { this.focused = true; }
  animate() { animationCount++; return { cancel() {} }; }
}
const ids = new Map([...html.matchAll(/\bid="([^"]+)"/g)].map(match => [match[1], new Element()]));
let reduceMotion = false;
let animationCount = 0;
let lastObserver = null;
const previewContainers = { desktop: new Element(), mobile: new Element() };
const context = {
  document: {
    createElement: tag => new Element(tag), createElementNS: (_, tag) => new Element(tag),
    getElementById: id => ids.get(id),
    querySelector: selector => selector === '#lbMockupWrapper .mockup-img-container' ? previewContainers.desktop : selector === '#lbMockupMobile .mockup-img-container' ? previewContainers.mobile : new Element()
  },
  IntersectionObserver: class {
    constructor(callback) { this.callback = callback; this.disconnected = false; lastObserver = this; }
    observe(node) { this.node = node; }
    disconnect() { this.disconnected = true; }
    intersect(visible) { this.callback([{ isIntersecting: visible }]); }
  },
  window: { matchMedia: () => ({ matches: reduceMotion }) }
};
const renderer = source.slice(source.indexOf('  const projectsData ='), source.indexOf('  const dossierModal ='));
vm.runInNewContext(`${renderer}\nglobalThis.data = projectsData; globalThis.render = renderTechStack; globalThis.updateLiveLink = updateLiveLink;`, context);
const descendants = node => node.children.flatMap(child => [child, ...descendants(child)]);
const liveLink = new Element('a');
const liveLabel = new Element('span');
liveLink.append(liveLabel);
context.updateLiveLink(liveLink, context.data['wga-ocean'], 'Explore Live Website ↗');
assert.equal(liveLabel.textContent, 'In Development');
assert.equal(liveLink.getAttribute('href'), undefined);
assert.equal(liveLink.getAttribute('aria-disabled'), 'true');
context.updateLiveLink(liveLink, context.data['ketut-gajah-bali'], 'Explore Live Website ↗');
assert.equal(liveLabel.textContent, 'Explore Live Website ↗', 'Switching project restores the live action');
assert.equal(liveLink.href, context.data['ketut-gajah-bali'].liveUrl);
assert.equal(liveLink.getAttribute('aria-disabled'), undefined);
assert(!liveLink.classList.contains('project-in-development'));
const geometry = source.slice(source.indexOf('  const featureIcons ='), source.indexOf('  function openDossier('));
const journey = source.slice(source.indexOf('    const lbFeaturesGrid ='), source.indexOf('    // Every project opens'));
vm.runInNewContext(`let journeyObserver = null; ${geometry}\nfunction renderJourney(data) { ${journey} }\nglobalThis.renderJourney = renderJourney; globalThis.renderPreview = renderDevicePreview;`, context);
let selectionChecks = 0;
let journeyChecks = 0;
for (const data of Object.values(context.data)) {
  assert.equal(data.overviewLayout, 'journey', 'All projects must use the finalized five-stop layout');
  assert(data.stackGroups?.length, 'All projects must use grouped Tech-Stack');
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

  context.renderJourney(data);
  const grid = ids.get('lbFeaturesGrid');
  const cards = grid.children.filter(node => node.classList.contains('lb-feature-card'));
  assert.equal(cards.length, 5);
  assert.equal(grid.children.length, 7, 'Project switching must replace old cards and artwork');
  assert(grid.classList.contains('is-journey') && grid.classList.contains('has-five-features'));
  assert(!grid.classList.contains('is-visible'));
  lastObserver.intersect(false);
  assert(!grid.classList.contains('is-visible'));
  lastObserver.intersect(true);
  assert(grid.classList.contains('is-visible') && lastObserver.disconnected);
  cards.forEach((card, index) => {
    assert.equal(card.attributes.role, 'button');
    assert.equal(card.tabIndex, 0);
    assert.equal(card.querySelector('.lb-feature-location').textContent, data.overviewFeatures[index].label);
    assert.equal(card.querySelector('h4').textContent, data.overviewFeatures[index].title);
    assert.equal(card.querySelector('p').textContent, data.overviewFeatures[index].text);
    assert.equal(card.attributes['aria-controls'], card.querySelector('p').id);
    card.events.click();
    assert.equal(card.attributes['aria-expanded'], 'true');
    assert.equal(card.querySelector('p').attributes['aria-hidden'], 'false');
    assert.equal(cards.filter(item => item.classList.contains('is-active')).length, 1);
    card.events.click();
    assert.equal(card.attributes['aria-expanded'], 'false');
    for (const key of ['Enter', ' ']) card.events.keydown({ key, preventDefault() {} });
    assert.equal(card.attributes['aria-expanded'], 'false');
    journeyChecks++;
  });
  reduceMotion = true;
  context.renderJourney(data);
  assert(grid.classList.contains('is-visible'), 'Reduced motion must show journey stops immediately');
  reduceMotion = false;
  for (const mode of ['desktop', 'mobile']) {
    previewContainers[mode].scrollTop = 120;
    context.renderPreview(data, mode);
    const images = previewContainers[mode].children;
    const expectedCounts = { 'Ketut Gajah Bali': 8, 'WGA Dekorasi': 9, 'WGA Ocean': 1, 'My Portofolio': 1 };
    assert.equal(images.length, expectedCounts[data.title]);
    assert.equal(previewContainers[mode].scrollTop, 0);
    for (const [index, image] of images.entries()) {
      assert(fs.existsSync(path.join(root, image.src)));
      assert(image.alt.startsWith(data.title));
      if (data.title === 'WGA Dekorasi') {
        const folder = mode === 'desktop' ? 'Dekstop' : 'Mobile';
        assert.equal(image.src, `image portofolio/WGA DEKORASI/${folder}/${index === 0 ? 'cover' : index}.png`);
        const png = fs.readFileSync(path.join(root, image.src));
        assert.equal(image.width, png.readUInt32BE(16), 'Preview width must match the supplied PNG');
        assert.equal(image.height, png.readUInt32BE(20), 'Preview height must match the supplied PNG');
      } else if (data.title !== 'Ketut Gajah Bali') {
        assert.equal(image.src, data.cover, 'Cover-only projects must use their own available cover');
      }
    }
  }
}
const wga = context.data['wga-dekorasi'];
assert.equal(wga.cover, 'image portofolio/WGA DEKORASI/Dekstop/cover.png');
assert.deepEqual(Array.from(wga.stackGroups.flatMap(group => group.items.map(item => item.name))), [
  'HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Vercel Functions', 'Supabase Database',
  'Supabase Storage', 'Cloudflare Turnstile', 'WhatsApp', 'Google Maps', 'Google Fonts', 'Sharp', 'PGlite'
]);
assert(!JSON.stringify(wga).includes('Firebase'), 'WGA uses Supabase, not Firebase');
assert.match(wga.stackGroups.at(-1).items.at(-1).description, /locally for database tests/);
context.render(wga);
for (const logo of descendants(ids.get('lbTechChips')).filter(node => node.tagName === 'img')) {
  assert(logo.src.startsWith('image portofolio/WGA DEKORASI/Stack/'), 'WGA must use its own logo folder');
}
const idList = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert(!ids.has('stackNotesList'), 'Implementation notes must not appear separately below the inspector');
assert.equal(new Set(idList).size, idList.length, 'Duplicate HTML IDs');
for (const match of html.matchAll(/(?:src|href)="(assets\/[^"?]+)(?:\?[^" ]*)?"/g)) {
  assert(fs.existsSync(path.join(root, match[1])), `Missing asset: ${match[1]}`);
}
console.log(`PASS: 4 projects, ${selectionChecks} tech selections, ${journeyChecks} journey stops, keyboard interaction, reveal animations, reduced motion, project switching, desktop/mobile previews, PNG dimensions, and local assets.`);
