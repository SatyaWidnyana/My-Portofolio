window.SatyaPortfolio.features['contact-letter'] = function () {
  const tray = document.querySelector('#contact .contact-letter-tray');
  const toggle = tray?.querySelector('.contact-letter-toggle');
  if (!toggle) return;
  const paper = tray.querySelector('.contact-letter');
  const invitation = tray.querySelector('.contact-letter-invitation');
  const form = tray.querySelector('form');
  const label = toggle.querySelector('.contact-toggle-label');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let settleTimer;
  toggle.hidden = false;

  function settle(open) {
    clearTimeout(settleTimer);
    tray.dataset.state = open ? 'open' : 'closed';
    toggle.disabled = false;
    if (open) {
      form.inert = false;
      form.elements.name.focus({ preventScroll: true });
      const bounds = paper.getBoundingClientRect();
      if (bounds.top < 100 || bounds.bottom > window.innerHeight - 30) {
        paper.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' });
      }
    }
  }
  function setOpen(open) {
    if (toggle.disabled || open === (tray.dataset.open === 'true')) return;
    toggle.disabled = true;
    tray.dataset.open = String(open);
    tray.dataset.state = open ? 'opening' : 'closing';
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Close letter' : 'Open a conversation';
    form.inert = true;
    form.setAttribute('aria-hidden', String(!open));
    invitation.setAttribute('aria-hidden', String(open));
    if (!open) toggle.focus({ preventScroll: true });
    if (reducedMotion.matches) settle(open);
    else settleTimer = setTimeout(() => settle(open), open ? 1150 : 1050);
  }
  paper.addEventListener('animationend', event => {
    if (event.target === paper) settle(tray.dataset.open === 'true');
  });
  toggle.addEventListener('click', () => setOpen(tray.dataset.open !== 'true'));
  tray.addEventListener('keydown', event => {
    if (event.key === 'Escape' && tray.dataset.open === 'true') {
      event.preventDefault();
      setOpen(false);
    }
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    if (!name || !message) {
      (name ? form.elements.message : form.elements.name).focus();
      return;
    }
    const recipient = document.querySelector('.contact-email').getAttribute('href').slice('mailto:'.length);
    const composeUrl = new URL('https://mail.google.com/mail/');
    composeUrl.search = new URLSearchParams({
      view: 'cm', fs: '1', to: recipient,
      su: 'Let’s collaborate — ' + name,
      body: 'Hi Satya,\n\n' + message + '\n\nFrom: ' + name + '\nEmail: ' + email
    }).toString();
    window.open(composeUrl.href, '_blank', 'noopener,noreferrer');
    const hint = form.querySelector('.contact-mail-hint');
    hint.textContent = 'Send your note from Gmail. If the tab didn’t open, ';
    const retry = document.createElement('a');
    retry.href = composeUrl.href;
    retry.target = '_blank';
    retry.rel = 'noopener noreferrer';
    retry.textContent = 'open your draft here.';
    hint.append(retry);
  });
};
