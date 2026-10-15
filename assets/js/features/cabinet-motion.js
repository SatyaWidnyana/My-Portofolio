// FLIP the already-laid-out cabinet. No animated height or per-frame JS layout.
window.SatyaPortfolio.createCabinetMotion = function (root) {
  const desktop = window.matchMedia('(min-width: 769px)');
  const cabinet = root.querySelector('.cabinet-case');
  if (!cabinet || !root.animate || !window.ResizeObserver) return null;
  const shell = document.createElement('div');
  shell.className = 'cabinet-shell';
  shell.setAttribute('aria-hidden', 'true');
  const feet = document.createElement('div');
  feet.className = 'cabinet-feet';
  feet.setAttribute('aria-hidden', 'true');
  cabinet.prepend(shell, feet);
  root.classList.add('cabinet-composite-motion');
  const panels = [...cabinet.querySelectorAll('.cabinet-panel')];
  const moving = [...cabinet.querySelectorAll('.cabinet-heading, .cabinet-panel, .cabinet-inventory, .cabinet-plinth')];
  const heading = root.querySelector('.notes-header');
  if (heading) moving.push(heading);
  ['.contact', '.footer'].forEach(selector => {
    const element = document.querySelector(selector);
    if (element) moving.push(element);
  });
  const running = new Map();
  let generation = 0;
  const settle = () => panels.forEach(panel => {
    if (panel.getAttribute('aria-hidden') === 'true') panel.dataset.collapsed = 'true';
  });
  function cancel() {
    generation++;
    running.forEach((animation, element) => { animation.cancel(); element.style.willChange = ''; });
    running.clear();
    settle();
  }
  function animate(element, keyframes, done) {
    element.style.willChange = 'clipPath' in keyframes[0] ? 'clip-path' : 'transform';
    const animation = element.animate(keyframes, {
      duration: desktop.matches ? 800 : 600, easing: 'cubic-bezier(.32,0,.2,1)', fill: 'both'
    });
    running.set(element, animation);
    animation.finished.then(() => {
      if (running.get(element) !== animation) return;
      running.delete(element);
      animation.cancel();
      element.style.willChange = '';
      done?.();
    }).catch(() => {});
  }
  function change(update) {
    // Batch all reads, then update the flow once, then read the final geometry.
    const before = moving.map(element => ({ element, top: element.getBoundingClientRect().top }));
    const oldShell = shell.getBoundingClientRect();
    const oldFeet = feet.getBoundingClientRect();
    const clips = panels.map(panel => {
      const interior = panel.querySelector('.cabinet-interior');
      const open = panel.getAttribute('aria-hidden') === 'false';
      const inFlight = running.has(interior);
      const clip = inFlight ? window.getComputedStyle(interior).clipPath : open ? 'inset(0px 0px 0% 0px)' : 'inset(0px 0px 100% 0px)';
      return { panel, interior, open, inFlight, clip };
    });
    generation++;
    const current = generation;
    running.forEach((animation, element) => { animation.cancel(); element.style.willChange = ''; });
    running.clear();
    update();
    const after = before.map(({ element, top }) => ({ element, delta: top - element.getBoundingClientRect().top }));
    const newShell = shell.getBoundingClientRect();
    const newFeet = feet.getBoundingClientRect();
    after.forEach(({ element, delta }) => {
      if (Math.abs(delta) > .5) animate(element, [{ transform: `translateY(${delta}px)` }, { transform: 'translateY(0px)' }]);
    });
    if (newShell.height && (Math.abs(oldShell.height - newShell.height) > .5 || Math.abs(oldShell.top - newShell.top) > .5)) {
      animate(shell, [
        { transform: `translateY(${oldShell.top - newShell.top}px) scaleY(${oldShell.height / newShell.height})` },
        { transform: 'translateY(0px) scaleY(1)' }
      ]);
    }
    if (Math.abs(oldFeet.bottom - newFeet.bottom) > .5) {
      animate(feet, [{ transform: `translateY(${oldFeet.bottom - newFeet.bottom}px)` }, { transform: 'translateY(0px)' }]);
    }
    clips.forEach(({ panel, interior, open, inFlight, clip }) => {
      const nowOpen = panel.getAttribute('aria-hidden') === 'false';
      if (nowOpen === open && !inFlight) return;
      panel.dataset.collapsed = 'false';
      animate(interior, [{ clipPath: clip }, { clipPath: nowOpen ? 'inset(0px 0px 0% 0px)' : 'inset(0px 0px 100% 0px)' }], () => {
        if (generation === current && panel.getAttribute('aria-hidden') === 'true') panel.dataset.collapsed = 'true';
      });
    });
  }
  desktop.addEventListener?.('change', cancel);
  return { change, cancel };
};
