window.SatyaPortfolio.features['greetings'] = function () {
  // Animasi Mengetik Multi-Bahasa
  const greetings = [
    "HELLO, MY NAME IS...", 
    "HOLA, MI NOMBRE ES...", 
    "BONJOUR, MON NOM EST...", 
    "HALO, NAMA SAYA...", 
    "CIAO, IL MIO NOME È...", 
    "HALLO, MEIN NAME IST...",
    "こんにちは、わたしのなまえは..."
  ];
  let currentGreetingIndex = 0;
  
  const greetingEl = document.querySelector('.script-font');
  if (!greetingEl) return;
  const text = document.createTextNode('');
  const cursor = document.createElement('span');
  cursor.className = 'greeting-cursor';
  cursor.textContent = '|';
  greetingEl.replaceChildren(text, cursor);
  let timer = null, active = false, position = 0, deleting = false;
  function tick() {
    timer = null;
    if (!active) return;
    const word = greetings[currentGreetingIndex];
    text.textContent = word.slice(0, position);
    let delay = deleting ? 40 : 70;
    if (!deleting && position === word.length) {
      deleting = true;
      delay = 3000;
    } else if (deleting && position === 0) {
      deleting = false;
      currentGreetingIndex = (currentGreetingIndex + 1) % greetings.length;
      delay = 70;
    } else {
      position += deleting ? -1 : 1;
    }
    timer = setTimeout(tick, delay);
  }
  window.SatyaPortfolio.observeMotion(greetingEl, visible => {
    active = visible;
    clearTimeout(timer);
    timer = null;
    if (active) timer = setTimeout(tick, 1000);
    else if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) text.textContent = greetings[0];
  });
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    text.textContent = greetings[0];
  }
  
};
