const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
let expanded = false;
const animations = [];
class Element {
  constructor(kind) { this.kind = kind; this.style = {}; this.dataset = {}; this.attributes = {}; }
  setAttribute(key, value) { this.attributes[key] = value; }
  getAttribute(key) { return this.attributes[key]; }
  getBoundingClientRect() {
    const top = this.kind === 'heading' ? expanded ? 500 : 100 : 0;
    const height = ['cabinet-shell', 'cabinet-feet'].includes(this.className) ? expanded ? 800 : 400 : 100;
    return { top, height, bottom: top + height };
  }
  animate(keyframes, options) {
    let resolve, reject;
    const finished = new Promise((yes, no) => { resolve = yes; reject = no; });
    const animation = { element: this, keyframes, options, finished, resolve, cancelled: false, cancel() { this.cancelled = true; reject(new Error('cancelled')); } };
    animations.push(animation);
    return animation;
  }
}
const panel = new Element('panel'), interior = new Element('interior'), heading = new Element('heading');
panel.attributes['aria-hidden'] = 'true'; panel.dataset.collapsed = 'true';
panel.querySelector = () => interior;
const cabinet = new Element('cabinet');
cabinet.prepend = (...elements) => { cabinet.decorations = elements; };
cabinet.querySelectorAll = selector => selector === '.cabinet-panel' ? [panel] : [heading, panel];
const root = new Element('root');
root.classList = { add() {} };
root.querySelector = selector => selector === '.cabinet-case' ? cabinet : null;
const media = { matches: true, addEventListener(_, callback) { this.change = callback; } };
const window = {
  SatyaPortfolio: {}, matchMedia: () => media, ResizeObserver() {},
  getComputedStyle: () => ({ clipPath: 'inset(0px 0px 40% 0px)' })
};
const document = { createElement: () => new Element('decoration'), querySelector: () => null };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../assets/js/features/cabinet-motion.js'), 'utf8'), { window, document });
(async () => {
  const motion = window.SatyaPortfolio.createCabinetMotion(root);
  const update = open => () => { expanded = open; panel.attributes['aria-hidden'] = String(!open); panel.dataset.collapsed = 'false'; };
  motion.change(update(true));
  assert(animations.some(animation => animation.element === interior));
  assert.equal(animations.find(animation => animation.element.className === 'cabinet-feet').keyframes[0].transform,
    'translateY(-400px)', 'Feet follow the bottom edge as the cabinet grows');
  for (const animation of animations) {
    assert(animation.keyframes.every(frame => !('height' in frame) && !('width' in frame)), 'Do not animate layout dimensions');
  }
  const first = [...animations];
  motion.change(update(false));
  assert(first.every(animation => animation.cancelled), 'Rapid clicks cancel superseded animations');
  const closing = animations.filter(animation => !first.includes(animation));
  const clip = closing.find(animation => animation.element === interior);
  assert.equal(clip.keyframes[0].clipPath, 'inset(0px 0px 40% 0px)', 'Reverse from the displayed clip instead of restarting');
  motion.change(update(true));
  closing.forEach(animation => animation.resolve());
  await Promise.resolve();
  assert.equal(panel.dataset.collapsed, 'false', 'Stale completion cannot hide a reopened panel');
  motion.change(update(false));
  motion.cancel();
  assert.equal(panel.dataset.collapsed, 'true', 'Cancellation settles closed panels');
  assert(animations.every(animation => animation.cancelled));
  assert(animations.every(animation => animation.element.style.willChange === ''), 'Temporary layer hints are released');
  media.matches = false;
  const count = animations.length;
  motion.change(update(true));
  assert(animations.length > count, 'Mobile uses transform/clip instead of animated layout height');
  assert(animations.slice(count).every(animation => animation.options.duration === 600), 'Mobile keeps a shorter, coordinated motion');
  motion.cancel();
  assert(animations.every(animation => animation.element.style.willChange === ''), 'Mobile releases temporary layers too');
  delete window.ResizeObserver;
  assert.equal(window.SatyaPortfolio.createCabinetMotion(root), null, 'Unsupported browsers retain the CSS fallback');
  console.log('PASS: transform/clip-only desktop and mobile motion, rapid reversal continuity, stale completion guards, cancellation, and layer cleanup.');
})().catch(error => { console.error(error); process.exitCode = 1; });
