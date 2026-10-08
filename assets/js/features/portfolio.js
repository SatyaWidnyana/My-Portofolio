window.SatyaPortfolio.features['portfolio'] = function () {
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
  const folderPapers = document.querySelectorAll('.folder-paper[data-project-id]');

  function syncPaperAccess() {
    const unlocked = Boolean(folderBtn && folderBtn.classList.contains('is-open'));
    folderPapers.forEach(paper => {
      paper.inert = !unlocked;
      paper.tabIndex = unlocked ? 0 : -1;
      paper.setAttribute('aria-disabled', String(!unlocked));
    });
  }

  syncPaperAccess();
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
        syncPaperAccess();
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

};
