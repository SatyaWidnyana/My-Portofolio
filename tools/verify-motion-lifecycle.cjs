const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const timers = new Map(), frames = new Map(), observers = [], events = new Map();
let nextId = 0;
class Element {
  constructor() { this.dataset = {}; this.style = {}; this.events = {}; this.children = []; }
  addEventListener(type, callback) { this.events[type] = callback; }
  replaceChildren(...children) { this.children = children; }
}
const hero = new Element(), greeting = new Element();
const ids = Object.fromEntries(['lanyard', 'lanyard-strap', 'lanyard-body'].map(id => [id, new Element()]));
const reduced = { matches: false, listeners: [], addEventListener(_, callback) { this.listeners.push(callback); } };
const document = {
  hidden: false,
  getElementById: id => ids[id],
  querySelector: selector => selector === '.hero' ? hero : selector === '.script-font' ? greeting : null,
  createTextNode: textContent => ({ textContent }),
  createElement: () => new Element(),
  addEventListener: (type, callback) => { if (!events.has(type)) events.set(type, []); events.get(type).push(callback); }
};
class Observer {
  constructor(callback) { this.callback = callback; observers.push(this); }
  observe(node) { this.node = node; }
  intersect(isIntersecting) { this.callback([{ isIntersecting }]); }
}
const window = { matchMedia: () => reduced, IntersectionObserver: Observer, addEventListener() {} };
const context = {
  window, document, IntersectionObserver: Observer,
  setTimeout: callback => { const id = ++nextId; timers.set(id, callback); return id; },
  clearTimeout: id => timers.delete(id),
  requestAnimationFrame: callback => { const id = ++nextId; frames.set(id, callback); return id; },
  cancelAnimationFrame: id => frames.delete(id)
};
function load(file) { vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/js', file), 'utf8'), context); }
load('app.js'); load('features/greetings.js'); load('features/lanyard.js');
window.SatyaPortfolio.features.greetings(); window.SatyaPortfolio.features.lanyard();
assert.equal(observers.length, 2, 'Typing observes its own text independently of the hero tail');
const greetingObserver = observers.find(observer => observer.node === greeting);
const heroObserver = observers.find(observer => observer.node === hero);
assert.equal(timers.size, 0, 'No typing timer before the hero enters view');
assert.equal(frames.size, 0);
greetingObserver.intersect(true); heroObserver.intersect(true);
assert.equal(hero.dataset.motionPaused, 'false');
assert.equal(timers.size, 1);
assert.equal(frames.size, 1);
window.triggerLanyardDrop(); window.triggerLanyardDrop();
assert.equal(frames.size, 1, 'Repeated intro triggers must not create duplicate physics loops');
const textNode = greeting.children[0];
for (let i = 0; i < 8; i++) {
  const [id, callback] = timers.entries().next().value; timers.delete(id); callback();
}
assert.equal(greeting.children[0], textNode, 'Typing reuses its text node and cursor');
assert(textNode.textContent.length > 0);
greetingObserver.intersect(false);
assert.equal(timers.size, 0, 'Offscreen typing must stop scheduling callbacks');
assert.equal(frames.size, 1, 'Typing can stop while the hero is still visible');
heroObserver.intersect(false);
assert.equal(frames.size, 0, 'Offscreen physics must stop scheduling frames');
assert.equal(hero.dataset.motionPaused, 'true');
greetingObserver.intersect(true); heroObserver.intersect(true);
assert.equal(timers.size, 1); assert.equal(frames.size, 1);
document.hidden = true; events.get('visibilitychange').forEach(callback => callback());
assert.equal(timers.size, 0); assert.equal(frames.size, 0);
document.hidden = false; events.get('visibilitychange').forEach(callback => callback());
assert.equal(timers.size, 1); assert.equal(frames.size, 1);
window.snapLanyardToZero();
assert.equal(frames.size, 0, 'Snap cancels a previously scheduled frame');
assert.equal(ids['lanyard-strap'].style.transform, 'scaleY(1)');
assert.equal(ids['lanyard-body'].style.transform, 'translateY(0%)');
reduced.matches = true; reduced.listeners.forEach(callback => callback());
assert.equal(timers.size, 0); assert.equal(frames.size, 0);
window.triggerLanyardDrop(); assert.equal(frames.size, 0, 'Reduced motion does not restart the spring');
console.log('PASS: shared visibility observer, offscreen/hidden-tab pause, resume, stable typing nodes, single physics loop, snap cancellation, and reduced motion.');
