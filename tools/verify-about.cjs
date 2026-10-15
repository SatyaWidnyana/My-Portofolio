const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const rootPath = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(rootPath, 'index.html'), 'utf8');
const source = fs.readFileSync(path.join(rootPath, 'assets/js/features/studio-notes.js'), 'utf8');
const css = fs.readFileSync(path.join(rootPath, 'assets/css/09-sections.css'), 'utf8');
const aboutMarkup = html.slice(html.indexOf('<section class="studio-notes'), html.indexOf('      <!-- Contact Section -->'));
const studioFixture = fs.readFileSync(path.join(rootPath, 'work/design-variants/studio-notes/section.html'), 'utf8');
const blueprintFixture = fs.readFileSync(path.join(rootPath, 'work/design-variants/blueprint/section.html'), 'utf8');
let animations = [];
let observers = [];
class Element {
  constructor(tag, attributes = {}) {
    this.tagName = tag; this.attributes = attributes; this.children = []; this.events = {};
    this.style = { setProperty(name, value) { this[name] = value; } };
    this.offsetHeight = 100;
    this.hidden = 'hidden' in attributes; this.inert = 'inert' in attributes;
    this.className = attributes.class || '';
    this.dataset = Object.fromEntries(Object.entries(attributes).filter(([name]) => name.startsWith('data-')).map(([name, value]) => [name.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()), value]));
    this.classList = { contains: name => this.className.split(/\s+/).includes(name), add: name => this.classList.toggle(name, true), toggle: (name, active) => {
      const names = new Set(this.className.split(/\s+/).filter(Boolean)); active ? names.add(name) : names.delete(name); this.className = [...names].join(' ');
    } };
  }
  get textContent() { return (this.text || '') + this.children.map(node => node.textContent).join(''); }
  set textContent(value) { this.text = String(value); this.children = []; }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  getAttribute(name) { return this.attributes[name]; }
  set href(value) { this.attributes.href = value; }
  get href() { return this.attributes.href; }
  set target(value) { this.attributes.target = value; }
  get target() { return this.attributes.target; }
  set rel(value) { this.attributes.rel = value; }
  get rel() { return this.attributes.rel; }
  appendChild(node) { this.children.push(node); }
  replaceChildren(...nodes) { this.text = ''; this.children = nodes; }
  querySelectorAll(selector) {
    const selectors = selector.split(',').map(part => part.trim());
    return descendants(this).filter(node => selectors.some(part => part.startsWith('.') ? node.classList.contains(part.slice(1)) : part.startsWith('#') ? node.attributes.id === part.slice(1) : part.startsWith('[') ? node.attributes[part.slice(1, -1)] !== undefined : node.tagName === part));
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0]; }
  addEventListener(name, callback) { (this.events[name] ||= []).push(callback); }
  fire(name, event = {}) { for (const callback of this.events[name] || []) callback(event); }
  focus() { this.focused = true; }
  animate(keyframes, options) { const animation = { node: this, keyframes, options, cancelled: false, cancel() { this.cancelled = true; } }; animations.push(animation); return animation; }
}
const descendants = node => node.children.flatMap(child => [child, ...descendants(child)]);
function parse(markup = aboutMarkup) {
  const document = new Element('document'), stack = [document];
  for (const token of markup.match(/<[^>]+>|[^<]+/g)) {
    if (token.startsWith('<!--')) continue;
    if (token.startsWith('</')) { stack.pop(); continue; }
    if (token.startsWith('<')) {
      const tag = token.match(/^<([a-z0-9]+)/i)[1];
      const attributes = Object.fromEntries([...token.matchAll(/([a-z-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]));
      for (const flag of ['hidden', 'inert']) if (new RegExp(`\\s${flag}(?:\\s|>)`).test(token)) attributes[flag] = '';
      const node = new Element(tag, attributes); stack.at(-1).appendChild(node);
      if (!['br', 'img', 'input', 'hr'].includes(tag)) stack.push(node);
    } else stack.at(-1).text = (stack.at(-1).text || '') + token;
  }
  return document;
}
function initialize(reduce = false, observerSupport = true, markup = aboutMarkup, measuredLayout = false) {
  const tree = parse(markup);
  const get = id => tree.querySelector('#' + id);
  const media = new Map();
  const matchMedia = query => {
    if (!media.has(query)) media.set(query, { matches: query.includes('reduced-motion') ? reduce : false, listeners: [], addEventListener(_, callback) { this.listeners.push(callback); }, change(value) { this.matches = value; this.listeners.forEach(callback => callback()); } });
    return media.get(query);
  };
  class Observer {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe(node) { this.node = node; }
    disconnect() { this.disconnected = true; }
    intersect(isIntersecting) { this.callback([{ isIntersecting }]); }
  }
  const window = { SatyaPortfolio: { features: {} }, matchMedia };
  const resizeObservers = [];
  class ResizeObserver {
    constructor(callback) { this.callback = callback; resizeObservers.push(this); }
    observe() {}
  }
  if (measuredLayout) {
    window.ResizeObserver = ResizeObserver;
    window.getComputedStyle = () => ({ marginTop: '5px' });
  }
  if (observerSupport) window.IntersectionObserver = Observer;
  const context = { window, document: { getElementById: get, createElement: tag => new Element(tag) }, IntersectionObserver: Observer, ResizeObserver };
  vm.runInNewContext(source, context);
  window.SatyaPortfolio.features['studio-notes']();
  return { tree, get, media, resizeObservers, init: window.SatyaPortfolio.features['studio-notes'] };
}
const app = initialize(false, true, studioFixture), { get } = app;
const about = get('about');
const chapters = about.querySelectorAll('[data-note-chapter]');
const panels = about.querySelectorAll('[data-note-panel]');
const skills = about.querySelectorAll('[data-note-skill]');
const steps = about.querySelectorAll('[data-note-step]');
assert.equal(chapters.length, 3); assert.equal(panels.length, 3);
assert.deepEqual(panels.filter(panel => !panel.hidden).map(panel => panel.dataset.notePanel), ['skills']);
assert.equal(chapters.filter(button => button.tabIndex === 0).length, 1);
assert.equal(about.querySelector('.notes-index').attributes['aria-orientation'], 'vertical');
const observer = observers.at(-1);
observer.intersect(false); assert(!about.classList.contains('notes-visible'));
observer.intersect(true); assert(about.classList.contains('notes-visible') && observer.disconnected);
for (const [position, button] of chapters.entries()) {
  button.fire('click');
  assert.equal(panels.filter(panel => !panel.hidden).length, 1);
  assert.equal(panels[position].hidden, false);
  assert.equal(button.attributes['aria-selected'], 'true');
  assert.equal(button.tabIndex, 0);
  assert.equal(get('notesPageNumber').textContent, `${String(position + 1).padStart(2, '0')} / ${button.dataset.noteChapter.toUpperCase()}`);
}
let prevented = false;
chapters[2].fire('keydown', { key: 'ArrowRight', preventDefault() { prevented = true; } });
assert(prevented && chapters[0].focused && !panels[0].hidden);
app.media.get('(max-width: 768px)').change(true);
assert.equal(about.querySelector('.notes-index').attributes['aria-orientation'], 'horizontal');
const allTools = [];
for (const button of skills) {
  button.fire('click');
  assert.equal(skills.filter(item => item.attributes['aria-pressed'] === 'true').length, 1);
  assert.equal(get('notesSkillStudy').dataset.skill, button.dataset.noteSkill);
  allTools.push(...get('notesTools').children.map(node => node.textContent));
  assert.equal(get('notesDeviceControls').hidden, button.dataset.noteSkill !== 'build');
  assert.equal(get('notesMotionReplay').hidden, button.dataset.noteSkill !== 'motion');
}
assert.deepEqual(allTools, ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Prisma', 'PostgreSQL', 'Framer Motion', 'CSS & JavaScript Motion']);
assert.equal(get('notesSkillProject').href, '#projects');
assert.equal(get('notesSkillProject').target, '_self');
skills[0].fire('click'); assert.equal(get('notesSkillProject').href, 'https://wga-dekorasi.vercel.app/');
skills[1].fire('click'); assert.equal(get('notesSkillProject').target, '_blank'); assert.equal(get('notesSkillProject').rel, 'noopener noreferrer');
const devices = about.querySelectorAll('[data-note-device]');
devices[1].fire('click'); assert.equal(get('notesSkillStudy').dataset.device, 'mobile');
devices[0].fire('click'); assert.equal(get('notesSkillStudy').dataset.device, 'desktop');
for (const [position, button] of steps.entries()) {
  button.fire('click');
  assert.equal(steps.filter(item => item.attributes['aria-pressed'] === 'true').length, 1);
  assert.equal(get('notesProcessScene').dataset.step, String(position));
  const frames = about.querySelectorAll('[data-note-frame]');
  assert.equal(frames.filter(frame => frame.classList.contains('is-current')).length, 1);
  assert.equal(frames[position].attributes['aria-hidden'], 'false');
  assert.equal(frames[position].inert, false);
  assert(frames.filter((_, i) => i !== position).every(frame => frame.inert));
}
skills[2].fire('click');
const before = animations.length;
get('notesMotionReplay').fire('click'); assert.equal(animations.length, before + 4);
const firstReplay = animations.slice(-4);
get('notesMotionReplay').fire('click'); assert(firstReplay.every(animation => animation.cancelled));
app.media.get('(prefers-reduced-motion: reduce)').change(true);
const reducedCount = animations.length;
get('notesMotionReplay').fire('click'); chapters[1].fire('click'); skills[0].fire('click');
assert.equal(animations.length, reducedCount, 'Reduced motion must skip all interactive animations');
const listenerCount = chapters[0].events.click.length;
app.init(); assert.equal(chapters[0].events.click.length, listenerCount, 'Reinitialization must not duplicate handlers');
assert.equal(initialize(true).get('about').classList.contains('notes-visible'), true);
assert.equal(initialize(false, false).get('about').classList.contains('notes-visible'), true);
assert(about.textContent.includes('B.Sc. in Visual Communication Design'));
assert(about.textContent.includes('Binus University'));
assert(about.textContent.includes('Google Career Certificates'));
assert(!aboutMarkup.includes('class="icon"'));
assert(css.includes('@media (max-width: 768px)') && css.includes('@media (prefers-reduced-motion: reduce)'));
const blueprint = initialize(false, true, blueprintFixture);
const live = blueprint.get('about');
assert(live.classList.contains('about-blueprint'));
assert.equal(live.querySelectorAll('[data-note-chapter]').length, 0, 'Blueprint must not hide Education and Skills behind chapter tabs');
assert.equal(blueprint.get('noteEducation').hidden, false);
assert.equal(blueprint.get('noteSkills').hidden, false);
assert.equal(blueprint.get('noteSkills').querySelectorAll('dd').flatMap(group => group.querySelectorAll('span')).length, 8, 'Historical Blueprint fixture retains its eight original skills');
const blueprintSteps = live.querySelectorAll('[data-note-step]');
assert.equal(blueprintSteps.length, 4);
for (const [position, button] of blueprintSteps.entries()) {
  button.fire('click');
  assert.equal(blueprint.get('notesProcessScene').dataset.step, String(position));
  assert.equal(blueprintSteps.filter(item => item.attributes['aria-pressed'] === 'true').length, 1);
  const current = live.querySelectorAll('[data-note-frame]').filter(frame => frame.classList.contains('is-current'));
  assert.equal(current.length, 1);
  assert.equal(current[0].dataset.noteFrame, String(position));
  assert.equal(current[0].inert, false);
}
blueprintSteps[3].fire('keydown', { key: 'Home', preventDefault() {} });
assert.equal(blueprint.get('notesProcessScene').dataset.step, '0');
assert(blueprintSteps[0].focused);
blueprint.media.get('(prefers-reduced-motion: reduce)').change(true);
const beforeBlueprint = animations.length;
blueprintSteps[2].fire('click');
assert.equal(animations.length, beforeBlueprint);
const blueprintHandlers = blueprintSteps[0].events.click.length;
blueprint.init(); assert.equal(blueprintSteps[0].events.click.length, blueprintHandlers);
assert(css.includes('#about.about-blueprint .blueprint-workbench'));
assert(css.includes('#about.about-blueprint .blueprint-reference'));
const cabinet = initialize();
const cabinetRoot = cabinet.get('about');
assert(cabinetRoot.classList.contains('about-cabinet'));
const drawerButtons = cabinetRoot.querySelectorAll('[data-note-drawer]');
const drawers = cabinetRoot.querySelectorAll('[data-cabinet-drawer]');
assert.deepEqual(drawerButtons.map(button => button.dataset.noteDrawer), ['education', 'design', 'development', 'process']);
function checkDrawer(selected) {
  assert.equal(drawerButtons.filter(button => button.attributes['aria-expanded'] === 'true').length, selected ? 1 : 0);
  for (const [position, button] of drawerButtons.entries()) {
    const open = button.dataset.noteDrawer === selected;
    const panel = cabinet.get(button.attributes['aria-controls']);
    assert.equal(button.attributes['aria-expanded'], String(open));
    assert.equal(drawers[position].dataset.open, String(open));
    assert.equal(panel.attributes['aria-hidden'], String(!open));
    assert.equal(panel.inert, !open);
    assert.equal(panel.hidden, false, 'Panels stay in flow for animated closing');
    assert.equal(panel.attributes['aria-labelledby'], button.attributes.id);
  }
}
checkDrawer(null);
const frontendPanel = cabinet.get('cabinet-design');
assert.equal(frontendPanel.dataset.collapsed, 'true');
drawerButtons[1].fire('click');
assert.equal(frontendPanel.dataset.collapsed, 'false', 'Opening restores content before expansion');
drawerButtons[1].fire('click');
assert.equal(frontendPanel.dataset.collapsed, 'false', 'Closing keeps content available until the transition finishes');
frontendPanel.fire('transitionend', { target: frontendPanel, propertyName: 'grid-template-rows' });
assert.equal(frontendPanel.dataset.collapsed, 'true', 'Settled closed panels skip their content rendering');
drawerButtons[1].fire('click'); drawerButtons[1].fire('click'); drawerButtons[1].fire('click');
frontendPanel.fire('transitionend', { target: frontendPanel, propertyName: 'grid-template-rows' });
assert.equal(frontendPanel.dataset.collapsed, 'false', 'A stale closing event cannot hide a reopened panel');
drawerButtons[1].fire('click');
frontendPanel.fire('transitionend', { target: frontendPanel, propertyName: 'grid-template-rows' });
const cabinetTech = cabinetRoot.querySelectorAll('.cabinet-tech-item');
for (const name of ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Framer Motion', 'Node.js', 'Prisma', 'PostgreSQL', 'Supabase', 'Cloud Firestore', 'Firebase Authentication', 'Vercel Functions', 'Lucide React']) {
  assert(cabinetTech.some(item => item.querySelector('h5').textContent === name), `Missing verified project technology: ${name}`);
}
assert(!cabinetRoot.textContent.includes('Figma') && !cabinetRoot.textContent.includes('GSAP'));
assert(!/WGA Ocean|WGA Dekorasi|Bali Adventure/.test(cabinetRoot.textContent), 'Cabinet cards and descriptions omit project names');
assert(cabinetRoot.textContent.includes('AI assistance') && cabinetRoot.textContent.includes('Google Stitch'));
for (const item of cabinetTech) {
  assert(!item.querySelector('.cabinet-tech-project'), 'Technology cards omit the project labels');
  const logo = item.querySelector('img');
  assert(logo && fs.existsSync(path.join(rootPath, logo.attributes.src)), 'Each technology needs an existing local logo');
}
for (const name of ['SMA JB SCHOOL', '2021', '2024', 'GRADUATED', 'ITB STIKOM BALI', 'Present', 'semester 6', 'IN PROGRESS']) assert(cabinet.get('noteEducation').textContent.includes(name));
for (const button of drawerButtons) {
  button.fire('click'); checkDrawer(button.dataset.noteDrawer);
  button.fire('click'); checkDrawer(null);
}
for (let i = 0; i < 20; i++) drawerButtons[i % 4].fire('click');
checkDrawer('process');
drawerButtons[3].fire('keydown', { key: 'Home', preventDefault() {} });
assert(drawerButtons[0].focused); checkDrawer('process');
drawerButtons[0].fire('keydown', { key: 'ArrowUp', preventDefault() {} });
assert(drawerButtons[3].focused); checkDrawer('process');
drawerButtons[0].fire('keydown', { key: 'End', preventDefault() {} });
assert(drawerButtons[3].focused);
const cabinetSteps = cabinetRoot.querySelectorAll('[data-note-step]');
assert.equal(cabinetSteps.length, 5);
for (const [position, button] of cabinetSteps.entries()) {
  button.fire('click');
  assert.equal(cabinet.get('notesProcessScene').dataset.step, String(position));
  assert.equal(cabinetSteps.filter(step => step.attributes['aria-pressed'] === 'true').length, 1);
  assert.equal(cabinet.get('notesProcessCounter').textContent, `${String(position + 1).padStart(2, '0')} / 05`);
}
drawerButtons[1].fire('click'); checkDrawer('design');
const cabinetBeforeReplay = animations.length;
cabinet.get('notesMotionReplay').fire('click');
assert.equal(animations.length, cabinetBeforeReplay + 4);
const cabinetReplay = animations.slice(-4);
drawerButtons[2].fire('click'); checkDrawer('development');
assert(cabinetReplay.every(animation => animation.cancelled), 'Switching drawers cancels the motion study');
drawerButtons[1].fire('click');
cabinet.get('notesMotionReplay').fire('click');
const reduceReplay = animations.slice(-4);
cabinet.media.get('(prefers-reduced-motion: reduce)').change(true);
assert(reduceReplay.every(animation => animation.cancelled));
const cabinetBeforeReduced = animations.length;
cabinet.get('notesMotionReplay').fire('click'); drawerButtons[0].fire('click');
assert.equal(animations.length, cabinetBeforeReduced);
checkDrawer('education');
const cabinetListeners = drawerButtons[0].events.click.length;
cabinet.init(); assert.equal(drawerButtons[0].events.click.length, cabinetListeners);
assert(css.includes('grid-template-rows: 0fr') && css.includes('grid-template-rows: 1fr'));
assert(css.includes('#about.about-cabinet .cabinet-panel, #about.about-cabinet .cabinet-tray,'));
for (const width of [420, 614.4, 780]) for (const viewportHeight of [300, 600, 900, 1200]) {
  const height = width * .7, sectionHeight = Math.max(viewportHeight, height);
  const bottom = (sectionHeight - height) / 2 + height * .75 + (width * .6265 + 30) * .8;
  const clearance = Math.max(-48, width * .6762 + 24 - sectionHeight * .5);
  assert(bottom <= sectionHeight + clearance + .001, 'Desktop folder must not overlap Studio Notes');
}
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
const measured = initialize(false, true, aboutMarkup, true);
const measuredPanel = measured.get('cabinet-design');
const measuredButton = measured.get('cabinet-design-label');
const measuredTray = measuredPanel.querySelector('.cabinet-tray');
measuredTray.offsetHeight = 150;
measuredButton.fire('click');
assert.equal(measuredPanel.style.height, '155px');
assert.equal(measuredPanel.style['--cabinet-content-height'], '155px');
measuredTray.offsetHeight = 200;
measured.resizeObservers[0].callback([{ target: measuredTray }]);
assert.equal(measuredPanel.style.height, '205px', 'Open drawers adjust to font or viewport changes');
measuredButton.fire('click');
assert.equal(measuredPanel.style.height, '0px');
assert.equal(measuredPanel.dataset.collapsed, 'false');
measuredPanel.fire('transitionend', { target: measuredPanel, propertyName: 'height' });
assert.equal(measuredPanel.dataset.collapsed, 'true');
measuredTray.offsetHeight = 90;
measured.resizeObservers[0].callback([{ target: measuredTray }]);
assert.equal(measuredPanel.style.height, '0px', 'Resize notifications do not reopen a closed drawer');
assert.equal(new Set(ids).size, ids.length);
for (const match of html.matchAll(/(?:src|href)="(assets\/[^"?]+)(?:\?[^" ]*)?"/g)) assert(fs.existsSync(path.join(rootPath, match[1])), match[1]);
console.log('PASS: Tool Cabinet single-open drawers, collapse and rapid switching, keyboard and ARIA states, education, verified technology logos without project labels, AI workflow, process stages, replay/cancellation, reduced motion, reveal, safe initialization, historical fixtures, desktop folder clearance, and local assets.');
