(() => {
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
          if (index < Math.floor(iterations)) return targetText[index];
          return letters[Math.floor(Math.random() * 26)];
        }).join("");
        
        if (iterations >= targetText.length) {
          clearInterval(interval);
          el.innerHTML = targetText;
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

    // Trigger efek stabilo highlight pada teks "Hello, I'm"
    const scriptFont = document.querySelector('.script-font');
    if (scriptFont) scriptFont.classList.add('highlight-active');

    const els = document.querySelectorAll('.name-solid, .name-outline');
    
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) subtitle.classList.remove('glitch-ready');

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
    
    // Tampilkan terminal setelah nama muncul
    setTimeout(() => {
      const termBox = document.getElementById('termV2');
      if (termBox) termBox.classList.add('is-visible');
    }, 400);
    
    // Setelah selesai, pasang efek tracing menggunakan SVG Path secara berurutan
    let traceTspans = [];
    els.forEach(el => {
      const text = el.getAttribute('data-text');
      
      // Interaksi mouse hover untuk efek blueprint/matematika pada tiap huruf SATYA
      if (el.classList.contains('name-solid')) {
        let spannedText = text.split('').map(char => `<span class="glitch-char" style="display:inline-block; transition: all 0.2s;">${char}</span>`).join('');
        el.innerHTML = spannedText;
        
        const chars = el.querySelectorAll('.glitch-char');
        chars.forEach(charEl => {
          charEl.addEventListener('mouseenter', () => {
            const randomWidth = (Math.random() * 50 + 20).toFixed(2);
            const randomHeight = (Math.random() * 80 + 40).toFixed(2);
            charEl.setAttribute('data-measure-top', `W:${randomWidth}px`);
            charEl.setAttribute('data-measure-bottom', `W:${randomHeight}px`);
            charEl.classList.add('is-math-hover');
          });
          
          charEl.addEventListener('mouseleave', () => {
            charEl.classList.remove('is-math-hover');
          });
        });
        
        return;
      }
      
      // Khusus WIDNYANA, kita render ke dalam format SVG dan HTML secara bersamaan
      let tspanBase = "";
      let tspanTrace = "";
      let spannedHtml = "";
      
      // Estimasi panjang path untuk tiap huruf
      const estLengths = { 'W': 1300, 'I': 450, 'D': 550, 'N': 850, 'Y': 650, 'A': 750 };
      
      for(let i = 0; i < text.length; i++) {
        tspanBase += `<tspan id="svg-base-${i}">${text[i]}</tspan>`;
        const char = text[i].toUpperCase();
        const len = estLengths[char] || 850;
        
        let dur = Math.floor(len * 4.5);
        let nextDelay = Math.floor(dur * 0.9);
        
        tspanTrace += `<tspan class="trace-tspan" id="svg-trace-${i}" style="--path-len: -${len}; --anim-dur: ${dur}ms; --next-delay: ${nextDelay}ms">${text[i]}</tspan>`;
        
        // HTML Invisible Span untuk mendeteksi Hover
        spannedHtml += `<span class="glitch-char widnyana-char" data-index="${i}" style="visibility: hidden; pointer-events: auto; display: inline-block; transition: all 0.2s;">${text[i]}</span>`;
      }
      
      el.innerHTML = `
        <span style="position: relative; z-index: 30; display: block;">${spannedHtml}</span>
        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none;">
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" class="base-svg-text">${tspanBase}</text>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" class="trace-svg-text">${tspanTrace}</text>
        </svg>
      `;
      
      // Terapkan efek hover pada WIDNYANA
      const wChars = el.querySelectorAll('.widnyana-char');
      wChars.forEach(charEl => {
        charEl.addEventListener('mouseenter', () => {
          const index = charEl.getAttribute('data-index');
          const svgBase = el.querySelector(`#svg-base-${index}`);
          const svgTrace = el.querySelector(`#svg-trace-${index}`);
          
          if (svgBase) svgBase.style.opacity = '0';
          if (svgTrace) svgTrace.style.opacity = '0';
          
          // Paksa HTML span menjadi terlihat sebagai efek matematika
          charEl.style.visibility = 'visible';
          
          const randomWidth = (Math.random() * 50 + 20).toFixed(2);
          const randomHeight = (Math.random() * 80 + 40).toFixed(2);
          charEl.setAttribute('data-measure-top', `W:${randomWidth}px`);
          charEl.setAttribute('data-measure-bottom', `W:${randomHeight}px`);
          charEl.classList.add('is-math-hover');
        });
        
        charEl.addEventListener('mouseleave', () => {
          const index = charEl.getAttribute('data-index');
          const svgBase = el.querySelector(`#svg-base-${index}`);
          const svgTrace = el.querySelector(`#svg-trace-${index}`);
          
          if (svgBase) svgBase.style.opacity = '1';
          if (svgTrace) svgTrace.style.opacity = '1';
          
          charEl.style.visibility = 'hidden';
          charEl.classList.remove('is-math-hover');
        });
      });
      
      // Ambil tspan yang baru dibuat untuk di-animasi secara berurutan
      const tspans = el.querySelectorAll('.trace-tspan');
      tspans.forEach(t => traceTspans.push(t));
    });

    if (subtitle) subtitle.classList.add('glitch-ready');

    // Interval sequencing per huruf menggunakan durasi dinamis
    if (traceTspans.length > 0) {
      let tIndex = 0;
      
      const playNextTrace = () => {
        let currentDelay = 1000;
        
        if (traceTspans[tIndex]) {
          // Hanya hapus animasi dari huruf yang saat ini agar yang sebelumnya bisa selesai dengan mulus
          traceTspans[tIndex].classList.remove('is-tracing');
          // Force reflow agar animasi me-restart dari awal path
          void traceTspans[tIndex].getBoundingClientRect();
          traceTspans[tIndex].classList.add('is-tracing');
          
          const delayStr = traceTspans[tIndex].style.getPropertyValue('--next-delay');
          if (delayStr) currentDelay = parseInt(delayStr);
        }
        
        // Maju ke huruf berikutnya
        tIndex = (tIndex + 1) % traceTspans.length;
        
        // Panggil huruf berikutnya sesuai delay aslinya tanpa menunggu animasi lambat selesai
        setTimeout(playNextTrace, currentDelay);
      };

      // Panggil segera huruf pertama
      playNextTrace();
    }
  }

  function animate(el, frames, options) {
    const a = el.animate(frames, { easing, fill: 'both', ...options });
    animations.add(a);
    return a.finished.catch(() => {}).then(() => { animations.delete(a); a.cancel(); });
  }

  async function playIntro() {
    if (reduced.matches) {
      overlay.style.display = 'none';
      wrapper.removeAttribute('inert');
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
  }

  // Handle skip if user clicks on overlay
  overlay.addEventListener('click', () => {
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

  // Start the animation
  playIntro();

  // Sliding Glass Pill Logic
  const navLinksContainer = document.getElementById('nav-links');
  const pillBg = document.getElementById('glass-pill-bg');
  const links = navLinksContainer.querySelectorAll('a');

  links.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
      const rect = e.target.getBoundingClientRect();
      const containerRect = navLinksContainer.getBoundingClientRect();
      
      pillBg.style.width = `${rect.width}px`;
      pillBg.style.left = `${rect.left - containerRect.left}px`;
      pillBg.classList.add('active');
    });
  });

  navLinksContainer.addEventListener('mouseleave', () => {
    pillBg.classList.remove('active');
  });

  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = themeToggle.querySelector('.sun-icon');
  const moonIcon = themeToggle.querySelector('.moon-icon');

  function setTheme(isDark) {
    if (isDark) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme(true);
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.hasAttribute('data-theme');
    setTheme(!isDark);
    
    // Ulangi animasi stabilo pada teks "Hello, I'm" setiap ganti tema
    const scriptFont = document.querySelector('.script-font');
    if (scriptFont && scriptFont.classList.contains('highlight-active')) {
      // Hapus class agar warnanya bisa langsung berubah tanpa delay 0.3s
      scriptFont.classList.remove('highlight-active');
      
      // Beri jeda sangat singkat agar browser merender penghapusan class, lalu putar ulang animasi
      setTimeout(() => {
        scriptFont.classList.add('highlight-active');
      }, 50);
    }
  });

  // Lanyard Interactive Swing & Drop Logic
  const lanyard = document.getElementById('lanyard');
  if (lanyard) {
    let isDragging = false;
    let startY = 0, startX = 0;
    let currentY = -800; // Start lebih rendah agar jatuhnya tidak agresif
    let angle = 0;
    let vy = 0, va = 0;
    let animationFrame = null;
    let targetX = 0, targetY = 0;
    
    // Set initial position out of view
    lanyard.style.transform = `translate(0px, -150vh) rotate(0deg)`;

    const springLoop = () => {
      if (isDragging) {
        // Menggunakan rumus pendulum murni (atan):
        // Kursor menjadi panduan sudut rotasi secara geometris, bukan sekadar nilai linear yang dibatasi.
        // Semakin jauh ditarik, sudutnya akan secara alami mengarah maksimal ke 90 derajat secara mulus.
        const targetAngle = -Math.atan(targetX / 500) * (180 / Math.PI); 
        
        va += (targetAngle - angle) * 0.15; // Tarikan rotasi menuju mouse
        vy += (targetY - currentY) * 0.15;  // Tarikan vertikal menuju mouse
        
        // Damping lebih berat agar tidak bergetar saat dipegang
        va *= 0.65;
        vy *= 0.65;
      } else {
        // Saat dilepas, fisika spring mengembalikannya ke posisi 0
        // Gravitasi sangat kecil agar turunnya perlahan, smooth, dan santai
        const fy = -currentY * 0.003; 
        const fa = -angle * 0.012;    
        
        vy += fy;
        va += fa;
        
        // Batas kecepatan maksimum jatuh (terminal velocity) agar tidak agresif
        if (vy > 14) vy = 14; 
        
        // Damping sedikit lebih licin agar mantulnya lebih floaty/elegan
        vy *= 0.93; 
        va *= 0.94;
      }
      
      currentY += vy;
      angle += va;
      
      // LOGIKA TALI (BUNGEE STRING PHYSICS):
      // Jika lanyard jatuh melewati batas 0, tali menegang secara eksponensial (kuadratik).
      // Ini membuat transisi di titik 0 sangat mulus (tidak kaku/menyentak) tapi tetap 
      // menahan lanyard agar tidak jatuh terlalu dalam.
      if (!isDragging && currentY > 0) {
        vy -= (currentY * currentY) * 0.002; 
      }
      
      // EFEK LETOY: Gunakan SkewX berdasarkan kecepatan sudut (va)
      // Saat berayun cepat, talinya akan terlihat melengkung (bend)
      let bend = -va * 2.5; 
      if (bend > 15) bend = 15;
      if (bend < -15) bend = -15;
      
      // EFEK MERENGGANG KHUSUS TALI (STRAP):
      // Karena gambar strap dan card sudah dipisah via HTML & CSS Clip-path,
      // kita bisa memberikan efek stretch (scaleY) HANYA pada strap,
      // dan menggeser (translateY) card ke bawah agar tetap menempel.
      let stretchY = 1;
      let cardOffset = 0;
      if (currentY > 0) {
        stretchY = 1 + (currentY * 0.005); 
        // Tinggi strap (clip-path atas) sekarang adalah 15%,
        // jadi pergeseran card adalah 15% dikali selisih skala.
        cardOffset = 15 * (stretchY - 1); 
      }
      
      const strap = document.getElementById('lanyard-strap');
      const body = document.getElementById('lanyard-body');
      if (strap && body) {
        strap.style.transform = `scaleY(${stretchY})`;
        body.style.transform = `translateY(${cardOffset}%)`;
      }
      
      // Terapkan transform posisi dan rotasi ke keseluruhan container
      lanyard.style.transform = `translate(0px, ${currentY}px) rotate(${angle}deg) skewX(${bend}deg)`;
      
      // Terus berulang sampai benar-benar diam (threshold mikroskopis agar sisa ayunan benar-benar tuntas alami)
      if (isDragging || Math.abs(currentY) > 0.1 || Math.abs(angle) > 0.02 || Math.abs(vy) > 0.01 || Math.abs(va) > 0.01) {
        animationFrame = requestAnimationFrame(springLoop);
      } else {
        currentY = 0; angle = 0;
        lanyard.style.transform = `translate(0px, 0px) rotate(0deg) skewX(0deg)`;
        animationFrame = null;
      }
    };

    const startDrag = (e) => {
      // Mencegah browser membuat "ghost image" bawaan saat men-drag gambar
      if (e.cancelable) e.preventDefault();
      
      if (isDragging) return;
      isDragging = true;
      
      const clientX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
      const clientY = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;
      
      startX = clientX;
      startY = clientY - currentY;
      targetX = 0;
      targetY = currentY;
      
      lanyard.style.cursor = 'grabbing';
      
      // Pastikan loop berjalan
      if (!animationFrame) {
        animationFrame = requestAnimationFrame(springLoop);
      }
    };

    const doDrag = (e) => {
      if (!isDragging) return;
      e.preventDefault(); // Prevent scroll while dragging lanyard
      
      const clientX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
      const clientY = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;
      
      const rawTargetY = clientY - startY;
      const rawTargetX = clientX - startX;
      
      // SISTEM PENGHALANG NATURAL PENDULUM
      // Y tetap dibatasi agar tidak melorot jauh ke bawah
      targetY = rawTargetY / (1 + Math.abs(rawTargetY) / 60); 
      // X dilepas tanpa batas karena efek natural (dinding maya) sudah ditangani oleh Math.atan di perhitungan targetAngle
      targetX = rawTargetX;
    };

    const stopDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      lanyard.style.cursor = 'grab';
    };

    lanyard.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', stopDrag);

    lanyard.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('touchmove', doDrag, { passive: false });
    window.addEventListener('touchend', stopDrag);
    
    // Expose methods to trigger the initial drop or snap
    window.triggerLanyardDrop = () => {
      currentY = -800;
      vy = 0; va = 0;
      // Jatuh lurus tanpa goyang (angle = 0)
      angle = 0; 
      springLoop();
    };
    
    window.snapLanyardToZero = () => {
      currentY = 0; angle = 0;
      vy = 0; va = 0;
      lanyard.style.transform = `translate(0px, 0px) rotate(0deg)`;
    };
  }

  // Terminal V3 Interaction
  const termRunBtn = document.getElementById('termRunBtn');
  const termDelBtn = document.getElementById('termDelBtn');
  const termV2 = document.getElementById('termV2');
  const termLogs = document.getElementById('termLogs');
  const termFinalText = document.getElementById('termFinalText');
  const termSourceHtml = document.getElementById('termSourceHtml');

  if (termRunBtn && termV2) {
    let isRunning = false;
    termRunBtn.addEventListener('click', () => {
      if (isRunning) return;
      isRunning = true;
      
      termRunBtn.style.display = 'none';
      if(termDelBtn) termDelBtn.style.display = 'none';
      
      document.getElementById('mainCursor').style.display = 'none';
      
      const logs = [
        "> Loading creative_engine.dll... [OK]",
        "> Fetching bio data..."
      ];
      
      let logIndex = 0;
      termLogs.innerHTML = ''; // reset logs
      
      const logInterval = setInterval(() => {
        if (logIndex < logs.length) {
          const div = document.createElement('div');
          div.className = 'term-log-line';
          div.textContent = logs[logIndex];
          termLogs.appendChild(div);
          logIndex++;
        } else {
          clearInterval(logInterval);
          setTimeout(startTypingBio, 300);
        }
      }, 500); 
      
      function startTypingBio() {
        const rawText = "As a Web Designer & Digital Creator, I design digital experiences that inspire and connect. I focus on crafting elegant, functional, and user-centered interfaces.";
        let i = 0;
        termFinalText.innerHTML = '<p class="term-desc" style="margin-top: 15px;"><span class="term-cursor"></span></p>';
        const descElement = termFinalText.querySelector('.term-desc');
        
        const typeInterval = setInterval(() => {
          if (i < rawText.length) {
            descElement.innerHTML = rawText.substring(0, i + 1) + '<span class="term-cursor"></span>';
            i++;
          } else {
            clearInterval(typeInterval);
            setTimeout(() => {
              termFinalText.innerHTML = termSourceHtml.innerHTML;
              if(termDelBtn) termDelBtn.style.display = 'block';
            }, 600);
          }
        }, 25);
      }
    });

    if(termDelBtn) {
      termDelBtn.addEventListener('click', () => {
        if (!isRunning) isRunning = true; // prevent multiple clicks
        termDelBtn.style.display = 'none'; // sembunyikan tombol delete saat ditekan
        
        const rawText = "As a Web Designer & Digital Creator, I design digital experiences that inspire and connect. I focus on crafting elegant, functional, and user-centered interfaces.";
        let i = rawText.length;
        
        // Kembalikan ke rawText agar mudah dihapus per karakter
        termFinalText.innerHTML = '<p class="term-desc" style="margin-top: 15px;">' + rawText + '<span class="term-cursor"></span></p>';
        const descElement = termFinalText.querySelector('.term-desc');
        
        // Animasi hapus paragraf per huruf
        const deleteInterval = setInterval(() => {
          if (i > 0) {
            i -= 1; // samakan kecepatan dengan saat mengetik (1 huruf per interval)
            if (i < 0) i = 0;
            descElement.innerHTML = rawText.substring(0, i) + '<span class="term-cursor"></span>';
          } else {
            clearInterval(deleteInterval);
            termFinalText.innerHTML = '';
            
            // Setelah paragraf terhapus, hapus log satu per satu
            let logLines = Array.from(termLogs.children);
            let logIndex = logLines.length - 1;
            
            const logDelInterval = setInterval(() => {
              if (logIndex >= 0) {
                logLines[logIndex].remove();
                logIndex--;
              } else {
                clearInterval(logDelInterval);
                termRunBtn.style.display = 'block'; // tampilkan kembali tombol enter
                document.getElementById('mainCursor').style.display = 'inline-block';
                isRunning = false;
              }
            }, 300); // Jeda hapus log juga diperlambat (300ms)
          }
        }, 25); // Kecepatan disamakan dengan saat ngetik (25ms per huruf)
      });
    }
  }

})();
