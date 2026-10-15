const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const css = fs.readFileSync(path.join(__dirname, '../assets/css/08-portfolio.css'), 'utf8').replaceAll('\r\n', '\n');
const marker = '/* Mobile archive:';
const mobile = css.slice(css.indexOf(marker));
assert(mobile.startsWith(marker));
assert.match(css.slice(0, css.indexOf(marker)), /\.projects\s*\{\s*min-height: 100vh;/, 'Desktop keeps its original vertical position');
assert.match(mobile, /\.projects\s*\{\s*min-height: 80vh;/, 'The raised position belongs only to mobile');
assert.match(mobile, /@media \(max-width: 768px\)/);
assert.match(mobile, /transform: translate\(0, -15%\) scale\([\d.]+\) !important/);
assert.match(css.slice(0, css.indexOf(marker)), /translate\(-42%, -15%\) scale\(0\.8\)/);
assert.doesNotMatch(css.slice(0, css.indexOf(marker)), /transform:\s*translate\(-42%, -15%\) scale\(0\.8\)\s*!important/, 'Desktop movement must remain eligible for compositing');

function block(source, selector) {
  const start = source.indexOf(selector);
  assert(start >= 0, `Missing CSS: ${selector}`);
  let depth = 0;
  const opening = source.indexOf('{', start);
  for (let i = opening; i < source.length; i++) {
    if (source[i] === '{') depth++;
    if (source[i] === '}' && --depth === 0) return source.slice(opening + 1, i);
  }
  throw new Error(`Unclosed CSS: ${selector}`);
}
function keyframes(name) {
  const body = block(css, `@keyframes ${name} {`);
  const frames = [];
  for (const match of body.matchAll(/([\d%,\s]+)\{([^{}]+)\}/g)) {
    const transform = match[2].match(/transform:\s*([^;]+);/)[1];
    for (const percent of match[1].split(',')) frames.push({ time: parseFloat(percent) / 100, transform });
  }
  return frames.sort((a, b) => a.time - b.time);
}
const numbers = new Map();
function functions(transform, width, ownHeight) {
  const panelHeight = width * 0.6265;
  const list = [];
  const regex = /([a-zA-Z]+)\(/g;
  let match;
  while ((match = regex.exec(transform))) {
    let end = regex.lastIndex, depth = 1;
    for (; depth && end < transform.length; end++) {
      if (transform[end] === '(') depth++;
      if (transform[end] === ')') depth--;
    }
    let expression = transform.slice(regex.lastIndex, end - 1)
      .replaceAll('var(--mobile-panel-height)', String(panelHeight))
      .replaceAll('var(--w)', String(width)).replaceAll('calc(', '(')
      .replace(/(-?[\d.]+)%/g, (_, number) => String(Number(number) * ownHeight / 100))
      .replace(/px|deg/g, '');
    assert(/^[\d.\s()+*/-]+$/.test(expression), `Unsupported value: ${expression}`);
    if (!numbers.has(expression)) numbers.set(expression, vm.runInNewContext(expression));
    list.push({ name: match[1], value: numbers.get(expression) });
    regex.lastIndex = end;
  }
  return list;
}
function easing(progress, x1, y1, x2, y2) {
  if (progress >= 1) return 1;
  const cubic = (t, a, b) => 3 * (1 - t) ** 2 * t * a + 3 * (1 - t) * t ** 2 * b + t ** 3;
  let low = 0, high = 1;
  for (let i = 0; i < 24; i++) {
    const t = (low + high) / 2;
    cubic(t, x1, x2) < progress ? low = t : high = t;
  }
  return cubic((low + high) / 2, y1, y2);
}
function transformsAt(frames, time, width, height) {
  const after = frames.find(frame => frame.time >= time) || frames.at(-1);
  const before = frames.filter(frame => frame.time <= time).at(-1) || frames[0];
  const a = functions(before.transform, width, height), b = functions(after.transform, width, height);
  const fraction = after.time === before.time ? 1 : easing((time - before.time) / (after.time - before.time), 0.25, 1, 0.5, 1);
  return b.map((target, index) => {
    const start = a[index] || { name: target.name, value: 0 };
    assert.equal(start.name, target.name, 'Folds must interpolate the same transform functions');
    return { name: target.name, value: start.value + (target.value - start.value) * fraction };
  });
}
function point(x, y, transforms) {
  let z = 0;
  for (const { name, value } of [...transforms].reverse()) {
    const radians = value * Math.PI / 180;
    if (name === 'translateY') y += value;
    else if (name === 'translateZ') z += value;
    else if (name === 'rotateX') [y, z] = [y * Math.cos(radians) - z * Math.sin(radians), y * Math.sin(radians) + z * Math.cos(radians)];
    else if (name === 'rotate') [x, y] = [x * Math.cos(radians) - y * Math.sin(radians), x * Math.sin(radians) + y * Math.cos(radians)];
    else throw new Error(`Unexpected lateral transform: ${name}`);
  }
  return { x, y, z };
}
function panelBounds(transforms, width, height) {
  const corners = [-width / 2, width / 2].flatMap(x => [-height, 0].map(y => point(x, y, transforms)));
  return { top: Math.min(...corners.map(p => p.y)) + width * 0.7, bottom: Math.max(...corners.map(p => p.y)) + width * 0.7, corners };
}
const names = ['cardboard-down', 'mobile-cardboard-second', 'mobile-cardboard-third'];
const frames = names.map(keyframes);
const front = block(css, '.folder-front {');
const rear = block(mobile, '.folder-back-right,\n  .folder-back-left {');
const frontHover = block(css, '.portfolio-folder:hover:not(.is-open) .folder-front {');
const rearHover = block(mobile, '.portfolio-folder:hover:not(.is-open) .folder-back-right,');
const transformOf = rule => rule.match(/(?:^|\n)\s*transform:\s*([^;]+);/)[1];
const hoverTransition = rule => rule.match(/transform\s+[\d.]+s\s+cubic-bezier\([^)]+\)/)[0];
assert.equal(hoverTransition(rear), hoverTransition(front), 'Rear flaps must follow the front cover throughout hover and mouse leave');
const hoverFrames = rule => [
  { time: 0, transform: transformOf(rule[0]) },
  { time: 1, transform: transformOf(rule[1]) }
];
const frontMotion = hoverFrames([front, frontHover]);
const rearMotion = hoverFrames([rear, rearHover]);
const dimensions = mobile.match(/--w: min\((\d+)px, calc\(100vw - (\d+)px\)\)/);
assert(dimensions, 'Mobile folder must fit the viewport');
const openScale = Number(block(mobile, '.portfolio-folder.is-open {').match(/scale\(([\d.]+)\)/)[1]);
assert(openScale > 0 && openScale <= 1);
let samples = 0;
for (const viewport of [320, 360, 375, 390, 414, 480, 600, 768]) {
  const width = Math.min(Number(dimensions[1]), viewport - Number(dimensions[2])), height = width * 0.6265;
  const step = height + 30, folderHeight = width * 0.7;
  const closedHeight = folderHeight * 0.72;
  for (let sample = 0; sample <= 100; sample++) {
    const before = transformsAt(frontMotion, sample / 100, width, closedHeight);
    const behind = transformsAt(rearMotion, sample / 100, width, closedHeight);
    for (const y of [-closedHeight, -closedHeight / 2, 0]) {
      const a = point(0, y, before), b = point(0, y, behind);
      assert(Math.abs(a.y - b.y) < 0.001, 'Rear cardboard must stay parallel to the cover while hovering');
      assert(a.z - b.z >= 1.99, 'Rear cardboard must stay behind the cover without crossing its text');
    }
  }
  const panels = frames.map(list => panelBounds(transformsAt(list, 1, width, height), width, height));
  panels.forEach((panel, index) => {
    assert(Math.abs(panel.top - (folderHeight + index * step + 30)) < 0.001, 'Panels must land in the next vertical slot');
    assert(Math.abs(panel.bottom - panel.top - height) < 0.001, 'Panel height must stay consistent');
    if (index) assert(Math.abs(panel.top - panels[index - 1].bottom - 30) < 0.001, 'Connector gap must remain 30px');
  });
  // The second and third panels ride with the first, then separate at the original milestones.
  for (const time of [0.35, 0.65]) {
    const before = panelBounds(transformsAt(frames[time === 0.35 ? 0 : 1], time, width, height), width, height);
    const carried = panelBounds(transformsAt(frames[time === 0.35 ? 1 : 2], time, width, height), width, height);
    assert(Math.abs(before.top - carried.top) < 0.001, 'Folded panels must travel together');
  }
  const papers = ['mobile-paper-first', 'mobile-paper-second', 'mobile-paper-third'];
  papers.forEach((name, index) => {
    const transforms = functions(keyframes(name).at(-1).transform, width, folderHeight * 0.78);
    const offset = point(0, 0, transforms).y;
    const top = folderHeight * 0.135 - width * 0.01 + offset;
    assert(top > panels[index].top && top + folderHeight * 0.78 < panels[index].bottom, 'Photos must fit inside their own panel');
  });
  const padding = block(mobile, '.projects.is-open {').match(/padding-bottom:\s*([^;]+);/)[1];
  const reserve = functions(`translateY(${padding})`, width, folderHeight)[0].value - 100;
  const finalBottom = (0.35 + openScale / 2) * folderHeight + 3 * openScale * step;
  assert(Math.abs(folderHeight + reserve - finalBottom) < 0.001, 'Reserved scroll space must reach the last panel');
  panels.forEach((panel, index) => {
    // Connector rectangles are on each flap's attachment edge, not on its sides.
    const parent = transformsAt(frames[index], 1, width, height);
    const localEdge = index === 1 ? [-30, 0] : [height, height + 30];
    const ends = localEdge.map(y => point(0, y - height, parent).y + folderHeight);
    const previousBottom = index ? panels[index - 1].bottom : folderHeight;
    assert(Math.abs(Math.min(...ends) - previousBottom) < 0.001, 'Connector must touch the preceding panel');
    assert(Math.abs(Math.max(...ends) - panel.top) < 0.001, 'Connector must reach its own panel');
  });
  // Check perspective projection throughout the fold, including folded and half-open states.
  for (let sample = 0; sample <= 700; sample++) {
    const time = sample / 700;
    const seconds = time * 3.5;
    const scale = 1 - (1 - openScale) * easing(seconds, 0.25, 1, 0.5, 1);
    const initialHeight = width * 0.7 * 0.72;
    const currentHeight = initialHeight + (height - initialHeight) * easing(seconds, 0.25, 0.1, 0.25, 1);
    for (const list of frames) {
      for (const corner of panelBounds(transformsAt(list, time, width, currentHeight), width, currentHeight).corners) {
        const projectedX = viewport / 2 + corner.x * 1600 / (1600 - corner.z) * scale;
        assert(projectedX >= 0 && projectedX <= viewport, `Fold clipped at ${viewport}px, time ${time}`);
        samples++;
      }
    }
  }
}
for (const paper of ['folder-paper-1', 'folder-paper-2', 'folder-paper-3']) {
  assert.match(block(mobile, `.portfolio-folder.is-open .${paper} {`), /1\.5s cubic-bezier\(0\.25, 1, 0\.5, 1\) 3\.5s both/);
}
assert.match(mobile, /animation-duration: 0\.001s !important/);
assert.match(mobile, /animation-delay: 0s !important/);
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
assert.equal([...html.matchAll(/class="folder-fold-shadow" aria-hidden="true"/g)].length, 3);
assert.match(css.slice(0, css.indexOf(marker)), /\.folder-fold-shadow \{ display: none; \}/, 'Shadow layers must be absent from desktop layout');
assert.match(block(mobile, '.portfolio-folder .folder-front,'), /box-shadow: none !important/, 'Moving panels must not repaint interpolated blur');
assert.match(block(mobile, '.folder-fold-shadow::before {'), /box-shadow: var\(--shadow-3d-base\); opacity: 1/, 'Closed and upright shadows must preserve the original appearance');
assert.match(block(mobile, '.folder-fold-shadow::after { box-shadow:'), /box-shadow: var\(--shadow-3d-invY\); opacity: 0/, 'Flipped shadows must preserve the original appearance');
for (const [name, end] of [['mobile-shadow-leave', 0], ['mobile-shadow-first', 1], ['mobile-shadow-second', 1], ['mobile-shadow-third', 1]]) {
  const body = block(mobile, `@keyframes ${name} {`);
  assert(!/transform:|box-shadow:/.test(body), 'Shadow animations must change opacity only');
  const frames = [...body.matchAll(/([\d%,\s]+)\{\s*opacity:\s*([\d.]+);\s*\}/g)]
    .flatMap(match => match[1].split(',').map(percent => ({ time: parseFloat(percent) / 100, value: Number(match[2]) })))
    .sort((a, b) => a.time - b.time);
  assert.equal(frames[0].time, 0);
  assert.equal(frames.at(-1).time, 1);
  assert.equal(frames.at(-1).value, end, 'Finished shadows must be fully restored or hidden');
  let previous = frames[0].value;
  for (let sample = 1; sample <= 10000; sample++) {
    const time = sample / 10000;
    const a = frames.filter(frame => frame.time <= time).at(-1);
    const b = frames.find(frame => frame.time >= time);
    const fraction = a.time === b.time ? 1 : easing((time - a.time) / (b.time - a.time), 0.42, 0, 0.58, 1);
    const opacity = a.value + (b.value - a.value) * fraction;
    assert(opacity >= 0 && opacity <= 1);
    assert(Math.abs(opacity - previous) < 0.002, 'Shadow intensity must not jump at fold milestones');
    previous = opacity;
  }
}
for (const name of ['mobile-hinge-first', 'mobile-hinge-second', 'mobile-hinge-third']) {
  assert(mobile.includes(`${name} 3.5s cubic-bezier(0.25, 1, 0.5, 1) forwards`), 'Hinges must follow the panel easing and duration');
  assert.match(block(mobile, `@keyframes ${name} {`), /opacity: 0/);
  assert.match(block(mobile, `@keyframes ${name} {`), /opacity: 1/);
}
console.log(`PASS: eight mobile widths, closed hover layer separation, ${samples} projected fold corners, sequential vertical folds, photo destinations, hinge gaps, scroll space, original timing, continuous shadow fades, final shadow appearance, and reduced motion.`);
