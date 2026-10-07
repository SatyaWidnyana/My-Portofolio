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
      
      const animateMathFlow = () => {
        const charEl = allChars[flowIndex];
        const randomWidth = (Math.random() * 50 + 20).toFixed(2);
        const randomHeight = (Math.random() * 80 + 40).toFixed(2);
        charEl.setAttribute('data-measure-top', `W:${randomWidth}px`);
        charEl.setAttribute('data-measure-bottom', `W:${randomHeight}px`);
        charEl.classList.add('is-math-hover');
        
        // Ganti ke huruf selanjutnya setelah 400ms (pas mengalir, tidak terlalu cepat)
        setTimeout(() => {
          // Seketika mengembalikan huruf ini ke aslinya
          charEl.classList.remove('is-math-hover');
          
          flowIndex = (flowIndex + 1) % allChars.length;
          
          let nextDelay = 0;
          // Jeda sedikit jika sudah satu putaran
          if (flowIndex === 0) {
             nextDelay = 2000;
          }
          
          setTimeout(animateMathFlow, nextDelay);
        }, 400);
      };
      
      // Mulai animasi mengalir 1 detik setelah teks selesai dimuat
      setTimeout(animateMathFlow, 1000);
    }

    if (subtitle) subtitle.classList.add('glitch-ready');
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
  });

  // Mobile Menu Logic
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navbar = document.getElementById('navbar');
  
  if (mobileMenuBtn && navbar) {
    const closeMenu = () => {
      navbar.classList.add('menu-closing');
      setTimeout(() => {
        navbar.classList.remove('menu-open', 'menu-closing');
      }, 400); // Matches CSS fadeOutMenu animation duration
    };

    mobileMenuBtn.addEventListener('click', () => {
      if (navbar.classList.contains('menu-open') && !navbar.classList.contains('menu-closing')) {
        closeMenu();
      } else if (!navbar.classList.contains('menu-closing')) {
        navbar.classList.add('menu-open');
      }
    });
    
    // Close menu when a link is clicked
    const navLinksList = navbar.querySelectorAll('.nav-links a, .nav-action .btn-primary');
    navLinksList.forEach(link => {
      link.addEventListener('click', () => {
        if (navbar.classList.contains('menu-open') && !navbar.classList.contains('menu-closing')) {
          closeMenu();
        }
      });
    });
  }

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
      
      termLogs.innerHTML = ''; // reset logs
      termFinalText.innerHTML = '';
      
      renderDefaultBio();
      
      function renderDefaultBio() {
        const logs = [
          "> Loading creative_engine.dll... [OK]",
          "> Fetching bio data..."
        ];
        
        let logIndex = 0;
        
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
          const htmlString = "As a <strong>Web Designer & Digital Creator</strong>, I design digital experiences that <em>inspire</em> and <em>connect</em>. I focus on crafting elegant, functional, and user-centered interfaces.";
          let i = 0;
          let currentHTML = "";
          let isTag = false;
          
          termFinalText.innerHTML = '<p class="term-desc" style="margin-top: 15px;"><span class="term-cursor"></span></p>';
          const descElement = termFinalText.querySelector('.term-desc');
          
          const typeInterval = setInterval(() => {
            if (i < htmlString.length) {
              currentHTML += htmlString.charAt(i);
              
              if (htmlString.charAt(i) === '<') isTag = true;
              if (htmlString.charAt(i) === '>') isTag = false;
              
              while (isTag && i < htmlString.length - 1) {
                i++;
                currentHTML += htmlString.charAt(i);
                if (htmlString.charAt(i) === '>') isTag = false;
              }
              
              descElement.innerHTML = currentHTML + '<span class="term-cursor"></span>';
              
              // Scroll to bottom while typing
              const termBody = document.querySelector('.term-body');
              termBody.scrollTop = termBody.scrollHeight;
              
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
      }
    });

    if(termDelBtn) {
      termDelBtn.addEventListener('click', () => {
        if (!isRunning) isRunning = true; // prevent multiple clicks
        termDelBtn.style.display = 'none'; // sembunyikan tombol delete saat ditekan
        
        const rawText = "As a Web Designer & Digital Creator, I design digital experiences that inspire and connect. I focus on crafting elegant, functional, and user-centered interfaces.";
        let i = rawText.length;
        
        termFinalText.innerHTML = '<p class="term-desc" style="margin-top: 15px;">' + rawText + '<span class="term-cursor"></span></p>';
        const descElement = termFinalText.querySelector('.term-desc');
        
        // Animasi hapus paragraf per huruf
        if (descElement) {
          const deleteInterval = setInterval(() => {
            if (i > 0) {
              i -= 1; // samakan kecepatan dengan saat mengetik
              if (i < 0) i = 0;
              descElement.innerHTML = rawText.substring(0, i) + '<span class="term-cursor"></span>';
            } else {
              clearInterval(deleteInterval);
              clearLogs();
            }
          }, 25);
        } else {
          clearLogs();
        }
        
        function clearLogs() {
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
          }, 50); // Jeda hapus log dicepatkan
        }
        // End of clearLogs function
      });
    }
  }

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
  
  async function typeGreeting() {
    const greetingEl = document.querySelector('.script-font');
    if (!greetingEl) return;
    
    // Tunggu sebentar sebelum mulai ngetik pertama kali agar bareng dengan scramble
    await new Promise(r => setTimeout(r, 1000));
    
    while (true) {
      let currentWord = greetings[currentGreetingIndex];
      
      // Tulis maju (efek mengetik)
      greetingEl.innerHTML = '<span class="greeting-cursor">|</span>';
      for (let i = 0; i <= currentWord.length; i++) {
        greetingEl.innerHTML = currentWord.substring(0, i) + '<span class="greeting-cursor">|</span>';
        await new Promise(r => setTimeout(r, 70)); 
      }
      
      // Tunggu 3 detik sebelum ganti bahasa
      await new Promise(r => setTimeout(r, 3000));
      
      // Hapus teks mundur (efek backspace)
      for (let i = currentWord.length; i >= 0; i--) {
        greetingEl.innerHTML = currentWord.substring(0, i) + '<span class="greeting-cursor">|</span>';
        await new Promise(r => setTimeout(r, 40)); 
      }
      
      // Ganti indeks bahasa
      currentGreetingIndex = (currentGreetingIndex + 1) % greetings.length;
    }
  }
  
  // Jalankan animasi ketik
  typeGreeting();
  
  // ==========================================
  // FIX TERMINAL WIDTH MURNI (ANTI MEMANJANG)
  // ==========================================
  const fixHeroSubtitle = document.querySelector('.hero-subtitle');
  const fixTermV2 = document.getElementById('termV2');
  if (fixHeroSubtitle && fixTermV2) {
    const lockTerminalWidth = () => {
      // Pada layar mobile, biarkan CSS yang mengatur (width: 100%, max-width: 550px)
      if (window.innerWidth <= 992) {
        fixTermV2.style.width = '';
        fixTermV2.style.maxWidth = '';
        return;
      }
      
      // Ambil ukuran spesifik HANYA dari teks WIDNYANA
      const widnyanaDummy = document.getElementById('widnyana-dummy');
      if (widnyanaDummy) {
        // Ambil lebar pasti dari teks WIDNYANA tanpa mereset terminal (mencegah bug grid cyclic dependency)
        const exactWidth = widnyanaDummy.getBoundingClientRect().width;
        if (exactWidth > 50) { // Validasi minimal 50px untuk mencegah nilai error/0
          // Kunci permanen ukurannya pakai pixel
          fixTermV2.style.width = exactWidth + 'px';
          fixTermV2.style.maxWidth = exactWidth + 'px';
        }
      }
    };
    
    // Setel awal (mungkin menggunakan font fallback yang lebih lebar)
    lockTerminalWidth();
    
    // Setel ulang SETELAH semua font (termasuk Anton) selesai dimuat!
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        lockTerminalWidth();
      });
    }
    
    // Fallback tambahan saat seluruh halaman benar-benar selesai dimuat
    window.addEventListener('load', lockTerminalWidth);
    
    // Sistem Morph & Auto-Reload saat pindah view (Desktop <-> Mobile)
    let currentView = window.innerWidth <= 992 ? 'mobile' : 'desktop';
    let resizeTimer;
    
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newView = window.innerWidth <= 992 ? 'mobile' : 'desktop';
        
        // Jika user melakukan drag dari desktop ke mobile atau sebaliknya
        if (currentView !== newView) {
          currentView = newView; 
          
          // Memulai transisi blur morphing layar penuh
          document.body.classList.add('view-changing');
          
          // Penuh 100% Reload bersih untuk menjamin layout tidak nyangkut!
          setTimeout(() => {
            window.location.reload();
          }, 450); 
          return;
        }
        
        // Jika resize biasa (masih dalam view yang sama), jalankan kalkulasi seperti biasa
        lockTerminalWidth();
      }, 50);
    });
  }
  // Portfolio folder: pop-up sekali saat section masuk viewport (tanpa scroll-jacking)
  const portfolioSection = document.getElementById('projects');
  if (portfolioSection) {
    if (!('IntersectionObserver' in window)) {
      portfolioSection.classList.add('in-view');
    } else {
      const folderObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            portfolioSection.classList.add('in-view');
            folderObserver.disconnect();
          }
        });
      }, { threshold: 0.45 });
      folderObserver.observe(portfolioSection);
    }
  }

  // Portfolio folder: tilt 3D halus mengikuti mouse (hanya desktop)
  const folderBtn = document.getElementById('portfolio-folder');
  if (folderBtn && window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    folderBtn.addEventListener('pointermove', (e) => {
      if (folderBtn.classList.contains('is-open')) {
        folderBtn.style.setProperty('--ry', '0deg');
        folderBtn.style.setProperty('--rx', '0deg');
        return;
      }
      const r = folderBtn.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width - 0.5) * 2;  // -1..1
      const py = ((e.clientY - r.top) / r.height - 0.5) * 2;  // -1..1
      folderBtn.style.setProperty('--ry', (px * 7).toFixed(2) + 'deg');
      folderBtn.style.setProperty('--rx', (-py * 5).toFixed(2) + 'deg');
    });
    folderBtn.addEventListener('pointerleave', () => {
      folderBtn.style.setProperty('--ry', '0deg');
      folderBtn.style.setProperty('--rx', '0deg');
    });
  }

  // Swipe to open functionality
  const swipeContainer = document.getElementById('swipe-container');
  const swipeThumb = document.getElementById('swipe-thumb');
  
  if (swipeContainer && swipeThumb) {
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    
    const getMaxDist = () => swipeContainer.offsetWidth - swipeThumb.offsetWidth;

    const onMove = (e) => {
      if (!isDragging) return;
      e.preventDefault(); 
      let clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      currentX = clientX - startX;
      let maxDist = getMaxDist();
      
      if (currentX < 0) currentX = 0;
      if (currentX > maxDist) currentX = maxDist;
      
      swipeThumb.style.transform = `translateX(${currentX}px)`;
      
      if (currentX >= maxDist * 0.95) {
        isDragging = false;
        swipeThumb.classList.remove('swiping');
        
        // Action to open portfolio goes here
        console.log('Portfolio Opened!');
        const folderBtn = document.getElementById('portfolio-folder');
        if(folderBtn) folderBtn.classList.add('is-open');
        const projectsSec = document.getElementById('projects');
        if(projectsSec) projectsSec.classList.add('is-open');
        
        swipeThumb.style.transition = 'transform 0.3s ease';
        swipeThumb.style.transform = 'translateX(0px)';
        currentX = 0;
        cleanupListeners();
      }
    };

    const cleanupListeners = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      swipeThumb.classList.remove('swiping');
      let maxDist = getMaxDist();
      
      if (currentX < maxDist * 0.95) {
        swipeThumb.style.transition = 'transform 0.3s ease';
        swipeThumb.style.transform = 'translateX(0px)';
        currentX = 0;
      }
      cleanupListeners();
    };

    const onStart = (e) => {
      if (e.target.closest('#swipe-thumb')) {
        isDragging = true;
        swipeThumb.classList.add('swiping');
        swipeThumb.style.transition = 'none';
        
        let clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        startX = clientX - currentX;
        
        window.addEventListener('mousemove', onMove, { passive: false });
        window.addEventListener('mouseup', onEnd);
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend', onEnd);
      }
    };

    swipeThumb.addEventListener('mousedown', onStart);
    swipeThumb.addEventListener('touchstart', onStart, { passive: false });
  }

  // ==========================================
  // PROJECT DOSSIER CASE STUDY MODAL LOGIC
  // ==========================================
  const projectsData = {
    'ketut-gajah-bali': {
      docId: 'CASE STUDY // #01',
      title: 'Ketut Gajah Bali',
      category: 'Private Tour & Transport',
      year: '2024',
      role: 'UI/UX & Web Dev',
      client: 'Bali, Indonesia',
      url: 'https://satyawidnyana.com/projects/ketut-gajah-bali',
      liveUrl: 'https://ketutgajahbali.com',
      cover: 'image portofolio/BALI ADVENTURE/cover.jpeg',
      description: 'A luxury private tour and personal driver booking platform in Bali, crafted with immersive visual storytelling, elegant tropical color palette, and an intuitive direct WhatsApp booking system.',
      features: [
        'High-Converting Hero Visual Experience',
        'Filterable Tour Packages & Custom Itineraries',
        'Direct WhatsApp & Instant Booking Integration',
        'Multi-language Support Ready Layout',
        'Fast Load Performance & SEO Optimization'
      ],
      tech: ['HTML5 / CSS3', 'JavaScript (ES6+)', 'GSAP Motion', 'Responsive Grid', 'Figma Prototyping']
    },
    'wga-dekorasi': {
      docId: 'CASE STUDY // #02',
      title: 'WGA Dekorasi',
      category: 'Event & Equipment Rental',
      year: '2024',
      role: 'UI/UX & Frontend',
      client: 'Bali, Indonesia',
      url: 'https://satyawidnyana.com/projects/wga-dekorasi',
      liveUrl: 'https://wgadekorasi.com',
      cover: 'image portofolio/WGA DEKORASI/cover.jpeg',
      description: 'A modern event decoration and rental catalog platform. Designed to help clients browse traditional Bali wedding setups, stage tents, and sound systems with transparent pricing and quotation requests.',
      features: [
        'Interactive Decoration & Equipment Catalog',
        'Category Filtering (Tenda, Meja-Kursi, Sound System)',
        'Direct WhatsApp Quotation Request Flow',
        'Lightweight Vanilla CSS Token Architecture',
        'Mobile-First Responsive Layout'
      ],
      tech: ['HTML5', 'Vanilla CSS Tokens', 'JavaScript', 'UI/UX Design', 'SEO Basics']
    },
    'wga-ocean': {
      docId: 'CASE STUDY // #03',
      title: 'WGA Ocean',
      category: 'Water Sports & Transport',
      year: '2024',
      role: 'Web Design & Branding',
      client: 'Lovina, Bali',
      url: 'https://satyawidnyana.com/projects/wga-ocean',
      liveUrl: 'https://wgaocean.com',
      cover: 'image portofolio/WGA OCEAN/cover.jpeg',
      description: 'An inspiring ocean adventure and wild dolphin watching tour website in Lovina. Built with ocean-inspired gradients, fluid scroll dynamics, and high-conversion excursion booking flows.',
      features: [
        'Immersive Ocean Visual Aesthetics',
        'Lovina Dolphin Tour & Water Sports Booking',
        'Interactive Photo & Video Experience Gallery',
        'Optimized Mobile Touch Navigation'
      ],
      tech: ['HTML5 / CSS3', 'JavaScript Micro-animations', 'Flexbox & CSS Grid', 'Custom Branding']
    },
    'satya-portfolio': {
      docId: 'CASE STUDY // #04',
      title: 'Satya Portfolio',
      category: 'Personal Creative Portfolio',
      year: '2024',
      role: 'Creative Direction & Fullstack',
      client: 'Personal Project',
      url: 'https://satyawidnyana.com',
      liveUrl: 'https://satyawidnyana.com',
      cover: 'image portofolio/MY PORTOFOLIO/cover.jpeg',
      description: 'An interactive, high-craft portfolio showcasing 3D origami folder physics, realistic interactive lanyard drag, terminal bio emulator, and retro-modern dark/light mode design tokens.',
      features: [
        '3D Origami Cardboard Folder Physics',
        'Bungee String Interactive Draggable Lanyard',
        'Interactive Terminal Profile Loader & Bio Typist',
        'Confidential Project Dossier Modal Showcase',
        'Fluid Light & Dark Mode Color Palette'
      ],
      tech: ['Vanilla JavaScript', 'Web Animations API', 'CSS 3D Transforms', 'Semantic HTML5', 'Design Tokens']
    }
  };

  const dossierModal = document.getElementById('dossierModal');
  const dossierCloseBtn = document.getElementById('dossierCloseBtn');
  const dossierCloseSecondary = document.getElementById('dossierCloseSecondary');

  function openDossier(projectId) {
    const data = projectsData[projectId];
    if (!data || !dossierModal) return;

    document.getElementById('dossierDocId').textContent = data.docId;
    document.getElementById('dossierTitle').textContent = data.title;
    document.getElementById('dossierCategory').textContent = data.category;
    document.getElementById('dossierYear').textContent = data.year;
    document.getElementById('dossierRole').textContent = data.role;
    document.getElementById('dossierClient').textContent = data.client;
    document.getElementById('dossierBrowserUrl').textContent = data.url;
    document.getElementById('dossierDescription').textContent = data.description;
    
    const coverImg = document.getElementById('dossierCoverImg');
    if (coverImg) {
      coverImg.src = data.cover;
      coverImg.alt = data.title;
    }

    const liveBtn = document.getElementById('dossierLiveBtn');
    const liveBtnImg = document.getElementById('dossierLiveBtnImg');
    if (liveBtn) liveBtn.href = data.liveUrl || '#';
    if (liveBtnImg) liveBtnImg.href = data.liveUrl || '#';

    // Render Features
    const featuresList = document.getElementById('dossierFeatures');
    if (featuresList) {
      featuresList.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
    }

    // Render Tech Stack
    const techBox = document.getElementById('dossierTech');
    if (techBox) {
      techBox.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');
    }

    // Populate Option 2 (Studio Lightbox) fields
    const lbCategory = document.getElementById('lbCategory');
    const lbTitle = document.getElementById('lbTitle');
    const lbTagline = document.getElementById('lbTagline');
    const lbDescription = document.getElementById('lbDescription');
    const lbClient = document.getElementById('lbClient');
    const lbRole = document.getElementById('lbRole');
    const lbYear = document.getElementById('lbYear');
    const lbHeroImg = document.getElementById('lbHeroImg');
    const lbMockupImg = document.getElementById('lbMockupImg');
    const lbLiveBtn = document.getElementById('lbLiveBtn');
    const lbMockupUrl = document.getElementById('lbMockupUrl');

    if (lbCategory) lbCategory.textContent = data.category;
    if (lbTitle) lbTitle.textContent = data.title;
    if (lbTagline) lbTagline.textContent = `${data.category} • ${data.year}`;
    if (lbDescription) lbDescription.textContent = data.description;
    if (lbClient) lbClient.textContent = data.client;
    if (lbRole) lbRole.textContent = data.role;
    if (lbYear) lbYear.textContent = data.year;
    if (lbHeroImg) lbHeroImg.src = data.cover;
    if (lbMockupImg) lbMockupImg.src = data.cover;
    if (lbLiveBtn) lbLiveBtn.href = data.liveUrl || '#';
    if (lbMockupUrl) lbMockupUrl.textContent = data.url;

    const lbFeaturesGrid = document.getElementById('lbFeaturesGrid');
    if (lbFeaturesGrid) {
      lbFeaturesGrid.innerHTML = data.features.map(f => `
        <div class="lb-feature-card">
          <span class="feat-icon">✦</span>
          <span>${f}</span>
        </div>
      `).join('');
    }

    const lbTechChips = document.getElementById('lbTechChips');
    if (lbTechChips) {
      lbTechChips.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');
    }

    // Show modal
    dossierModal.classList.add('active');
    dossierModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDossier() {
    if (!dossierModal) return;
    dossierModal.classList.remove('active');
    dossierModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Lightbox Tabs Navigation
  document.querySelectorAll('.lb-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lb-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-lb-tab');

      document.querySelectorAll('.lb-tab-pane').forEach(pane => {
        pane.style.display = 'none';
      });

      if (target === 'overview') document.getElementById('lbTabOverview').style.display = 'block';
      if (target === 'gallery') document.getElementById('lbTabGallery').style.display = 'block';
      if (target === 'specs') document.getElementById('lbTabSpecs').style.display = 'block';
    });
  });

  // Device View Selector (Desktop vs Mobile View)
  const btnDeviceDesktop = document.getElementById('btnDeviceDesktop');
  const btnDeviceMobile = document.getElementById('btnDeviceMobile');
  const lbMockupWrapper = document.getElementById('lbMockupWrapper');

  function setDeviceMode(mode) {
    if (!lbMockupWrapper) return;
    const isMobile = mode === 'mobile';
    const activeButton = isMobile ? btnDeviceMobile : btnDeviceDesktop;
    const inactiveButton = isMobile ? btnDeviceDesktop : btnDeviceMobile;

    // Batch the class changes into the next paint so the image is not forced
    // through two layout passes during the viewport switch.
    requestAnimationFrame(() => {
      lbMockupWrapper.classList.toggle('mobile-mode', isMobile);
      lbMockupWrapper.classList.toggle('desktop-mode', !isMobile);
      if (activeButton) {
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-pressed', 'true');
      }
      if (inactiveButton) {
        inactiveButton.classList.remove('active');
        inactiveButton.setAttribute('aria-pressed', 'false');
      }
    });
  }

  if (btnDeviceDesktop && lbMockupWrapper) {
    btnDeviceDesktop.setAttribute('aria-pressed', 'true');
    btnDeviceMobile?.setAttribute('aria-pressed', 'false');
    btnDeviceDesktop.addEventListener('click', () => setDeviceMode('desktop'));
  }

  if (btnDeviceMobile && lbMockupWrapper) {
    btnDeviceMobile.addEventListener('click', () => setDeviceMode('mobile'));
  }

  // Attach click events to folder papers
  document.querySelectorAll('.folder-paper[data-project-id]').forEach(paper => {
    paper.addEventListener('click', (e) => {
      const projectId = paper.getAttribute('data-project-id');
      openDossier(projectId);
    });

    paper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projectId = paper.getAttribute('data-project-id');
        openDossier(projectId);
      }
    });
  });

  if (dossierCloseBtn) dossierCloseBtn.addEventListener('click', closeDossier);
  document.querySelectorAll('.dossier-close-trigger').forEach(btn => {
    btn.addEventListener('click', closeDossier);
  });

  if (dossierModal) {
    dossierModal.addEventListener('click', (e) => {
      if (e.target === dossierModal) {
        closeDossier();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dossierModal && dossierModal.classList.contains('active')) {
      closeDossier();
    }
  });

})();
