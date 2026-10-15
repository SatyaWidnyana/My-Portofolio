window.SatyaPortfolio.features['contact-letter'] = function () {
  const tray = document.querySelector('#contact .contact-letter-tray');
  const toggle = tray?.querySelector('.contact-letter-toggle');
  if (!toggle) return;

  const label = toggle.querySelector('.contact-toggle-label');
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const open = tray.dataset.open !== 'true';
    tray.dataset.open = String(open);
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Close letter' : 'Open letter';
  });
};
