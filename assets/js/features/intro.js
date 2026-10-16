window.SatyaPortfolio.features['intro'] = function () {
  // Prevent browser from restoring previous scroll position after reload
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  const overlay = document.getElementById('intro-overlay');
  const greeting = document.getElementById('intro-greeting');
  const welcome = document.getElementById('intro-welcome');
  const wrapper = document.getElementById('main-wrapper');
  
  const easing = 'cubic-bezier(0.25, 1, 0.5, 1)';
  const timers = new Map();
  const animations = new Set();
  
  // Clean up if user prefers reduced motion
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  
  function pause(ms) {
    return new Promise(resolve => {
      const id = setTimeout(() => { timers.delete(id); resolve(); }, ms);
      timers.set(id, resolve);
    });
  }

  let scrambleHasRun = false;
  
  function scrambleSingleElement(el, speed = 50) {
    return new Promise(resolve => {
      const targetText = el.getAttribute('data-text') || el.innerText.trim();
      el.setAttribute('data-text', targetText);
      el.innerHTML = "";
      
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let iterations = 0;
      let interval = setInterval(() => {
        const currentLength = Math.min(Math.floor(iterations) + 1, targetText.length);
        
        const textContent = targetText.substring(0, currentLength).split("").map((letter, index) => {
          if (letter === " ") return " ";
          let char = (index < Math.floor(iterations)) ? targetText[index] : letters[Math.floor(Math.random() * 26)];
          return `<span class="glitch-char" style="display:inline-block; transition: all 0.4s ease;">${char}</span>`;
        }).join("");
        
        if (iterations >= targetText.length) {
          clearInterval(interval);
          const finalContent = targetText.split("").map(letter => {
            if (letter === " ") return " ";
            return `<span class="glitch-char" style="display:inline-block; transition: all 0.4s ease;">${letter}</span>`;
          }).join("");
          el.innerHTML = finalContent + '<span class="typing-cursor" style="opacity: 0;"></span>';
          resolve();
        } else {
          el.innerHTML = textContent + '<span class="typing-cursor"></span>';
        }
        
        // Diperlambat dari 1/4 menjadi 1/6 (membutuhkan 6 frame per huruf)
        iterations += 1 / 6; 
      }, speed);
    });
  }

  async function runScrambleAnimation() {
    if (scrambleHasRun) return;
    scrambleHasRun = true;
    
    if (reduced.matches) return;
    // Referensi teks Hello I'm
    const scriptFont = document.querySelector('.script-font');

    const els = document.querySelectorAll('.name-solid, .name-outline');
    
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
      subtitle.classList.remove('glitch-ready');
    }

    // Kosongkan semua teks di awal agar baris kedua tidak muncul sebelum waktunya
    els.forEach(el => {
      const targetText = el.innerText.trim();
      el.setAttribute('data-text', targetText);
      el.innerHTML = "";
    });

    // Jatuhkan lanyard dari atas sesegera mungkin saat animasi dimulai!
    if (window.triggerLanyardDrop) window.triggerLanyardDrop();
    
    // Jalankan secara berurutan (SATYA dulu, baru WIDNYANA)
    for (let i = 0; i < els.length; i++) {
      await scrambleSingleElement(els[i], 50);
    }
    


    const allChars = document.querySelectorAll('.glitch-char');
    if (allChars.length > 0) {
      let flowIndex = 0;
      let mathTimer = null;
      let mathActive = false;
      
      const animateMathFlow = () => {
        if (!mathActive) return;
        const charEl = allChars[flowIndex];
        const randomWidth = (Math.random() * 50 + 20).toFixed(2);
        const randomHeight = (Math.random() * 80 + 40).toFixed(2);
        charEl.setAttribute('data-measure-top', `W:${randomWidth}px`);
        charEl.setAttribute('data-measure-bottom', `W:${randomHeight}px`);
        charEl.classList.add('is-math-hover');
        
        // Ganti ke huruf selanjutnya setelah 400ms (pas mengalir, tidak terlalu cepat)
        mathTimer = setTimeout(() => {
          // Seketika mengembalikan huruf ini ke aslinya
          charEl.classList.remove('is-math-hover');
          
          flowIndex = (flowIndex + 1) % allChars.length;
          
          let nextDelay = 0;
          // Jeda sedikit jika sudah satu putaran
          if (flowIndex === 0) {
             nextDelay = 2000;
          }
          
          if (mathActive) mathTimer = setTimeout(animateMathFlow, nextDelay);
        }, 400);
      };
      
      // Mulai animasi mengalir 1 detik setelah teks selesai dimuat
      window.SatyaPortfolio.observeMotion(subtitle || document.querySelector('.hero'), visible => {
        mathActive = visible;
        clearTimeout(mathTimer);
        allChars.forEach(char => char.classList.remove('is-math-hover'));
        if (mathActive) mathTimer = setTimeout(animateMathFlow, 1000);
      });
    }

    if (subtitle) subtitle.classList.add('glitch-ready');
  }

  function animate(el, frames, options) {
    // Animated blur repeatedly rasterizes text on mobile GPUs.
    if (matchMedia('(max-width: 992px)').matches) frames = frames.map(({ filter, ...frame }) => frame);
    const a = el.animate(frames, { easing, fill: 'both', ...options });
    animations.add(a);
    return a.finished.catch(() => {}).then(() => { animations.delete(a); a.cancel(); });
  }

  async function playIntro() {
    if (reduced.matches) {
      document.getElementById('transition-grid').hidden = true;
      overlay.style.display = 'none';
      wrapper.removeAttribute('inert');
      document.getElementById('navbar')?.classList.remove('hidden-on-load');
      if (window.snapLanyardToZero) {
        window.snapLanyardToZero();
      }
      return;
    }

    // iPhone-style greetings (Smooth pacing)
    const greetings = [
      { text: 'Hello', delay: 850 },
      { text: '你好', delay: 850 },
      { text: 'こんにちは', delay: 850 },
      { text: 'Bonjour', delay: 850 },
      { text: 'Halo', delay: 1000 }
    ];

    const progressEl = document.getElementById('intro-progress');
    const loadingWrapper = document.getElementById('intro-loading-wrapper');
    const percentEl = document.getElementById('intro-percent');

    // Start loading bar animation
    const totalDuration = greetings.reduce((sum, item) => sum + item.delay, 0) + 500;
    if (progressEl) {
      progressEl.style.transition = `width ${totalDuration}ms linear`;
      // Trigger reflow
      void progressEl.offsetWidth; 
      progressEl.style.width = '100%';

      if (percentEl) {
        let startTime = null;
        function updatePercent(timestamp) {
          if (overlay.style.display === 'none') return; // Stop if skipped
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / totalDuration, 1);
          percentEl.textContent = Math.floor(progress * 100) + '%';
          if (progress < 1) {
            requestAnimationFrame(updatePercent);
          }
        }
        requestAnimationFrame(updatePercent);
      }
    }

    for (const item of greetings) {
      greeting.textContent = item.text;
      await animate(greeting, [
        { opacity: 0, filter: 'blur(5px)', transform: 'translateY(-50%) scale(0.98)', offset: 0 },
        { opacity: 1, filter: 'blur(0)', transform: 'translateY(-50%) scale(1)', offset: 0.25 },
        { opacity: 1, filter: 'blur(0)', transform: 'translateY(-50%) scale(1.02)', offset: 0.75 },
        { opacity: 0, filter: 'blur(5px)', transform: 'translateY(-50%) scale(1.04)', offset: 1 }
      ], { duration: item.delay, easing: 'ease-in-out' });
    }

    // Hide loading bar smoothly
    if (loadingWrapper) {
      loadingWrapper.style.opacity = '0';
    }
    
    greeting.hidden = true;
    welcome.hidden = false;

    // Fade in the welcome text (don't await it so columns can start immediately)
    animate(welcome, [
      { opacity: 0, filter: 'blur(12px)', transform: 'translateY(-40%)' },
      { opacity: 1, filter: 'blur(0)', transform: 'translateY(-50%)' }
    ], { duration: 1200 });

    // Wait just a tiny bit for text to become slightly visible
    await pause(300);

    const cols = document.querySelectorAll('.transition-col');
    
    // Start staggered sweep up
    cols.forEach((col, i) => {
      setTimeout(() => col.classList.add('sweep'), i * 100);
    });
    
    // Hide overlay when the screen is fully covered in black (approx 900ms for 300vh height)
    setTimeout(() => {
      overlay.style.display = 'none';
      // Reveal main site seamlessly behind the sweep
      wrapper.removeAttribute('inert');
      runScrambleAnimation();
      const navbar = document.getElementById('navbar');
      if (navbar) navbar.classList.remove('hidden-on-load');
    }, 900);

    // Wait for the full 1.5s transition to finish before cleaning up
    await pause(1500 + (cols.length - 1) * 100);
    document.getElementById('transition-grid').hidden = true;
  }

  // Handle skip if user clicks on overlay
  overlay.addEventListener('click', () => {
    document.getElementById('transition-grid').hidden = true;
    overlay.style.display = 'none';
    wrapper.removeAttribute('inert');
    runScrambleAnimation();
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.remove('hidden-on-load');
    document.querySelectorAll('.transition-col').forEach(col => {
       col.style.display = 'none';
    });
    timers.forEach((resolve, id) => { clearTimeout(id); resolve(); });
    animations.forEach(a => a.cancel());
  });

  // Pause the mobile ticker when it is outside the viewport or tab is hidden.
  const marquee = document.querySelector('.marquee-container');
  if (marquee && matchMedia('(max-width: 992px)').matches) {
    window.SatyaPortfolio.observeMotion(marquee, visible => {
      marquee.classList.toggle('motion-paused', !visible);
    });
  }

  // Start the animation
  playIntro();

};
