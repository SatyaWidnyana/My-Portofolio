// Register features first; main.js initializes them in the original execution order.
window.SatyaPortfolio = { features: {} };

// Share viewport/tab/reduced-motion state so offscreen sections stop doing work.
(() => {
  const gates = new WeakMap();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  window.SatyaPortfolio.observeMotion = (element, callback) => {
    if (!element) return () => {};
    let gate = gates.get(element);
    if (!gate) {
      const listeners = new Set();
      let inView = !('IntersectionObserver' in window);
      let active;
      const update = () => {
        const next = inView && !document.hidden && !reduced.matches;
        if (active === next) return;
        active = next;
        element.dataset.motionPaused = String(!active);
        listeners.forEach(listener => listener(active));
      };
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
          inView = entries.some(entry => entry.isIntersecting);
          update();
        }, { rootMargin: '120px 0px' });
        observer.observe(element);
      }
      document.addEventListener('visibilitychange', update);
      reduced.addEventListener?.('change', update);
      gate = { listeners, active: () => active };
      gates.set(element, gate);
      update();
    }
    gate.listeners.add(callback);
    callback(gate.active());
    return () => gate.listeners.delete(callback);
  };
})();
