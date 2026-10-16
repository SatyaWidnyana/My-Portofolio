window.SatyaPortfolio.features['navigation'] = function () {
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
    const page = document.documentElement;
    page.classList.add('theme-switching');
    // Commit the suppression before changing theme tokens.
    void page.offsetWidth;
    if (isDark) page.setAttribute('data-theme', 'dark');
    else page.removeAttribute('data-theme');
    page.style.colorScheme = isDark ? 'dark' : 'light';
    page.style.backgroundColor = isDark ? '#121212' : '#fafafa';
    if (isDark) {
      document.body.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('theme', 'dark'); } catch { /* Theme still works when storage is blocked. */ }
    } else {
      document.body.removeAttribute('data-theme');
      try { localStorage.setItem('theme', 'light'); } catch { /* Theme still works when storage is blocked. */ }
    }
    // Resolve final theme colors before restoring ordinary interaction transitions.
    void page.offsetWidth;
    page.classList.remove('theme-switching');
  }

  // Check saved theme or system preference
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('theme'); } catch { /* Use the system preference. */ }
  setTheme(savedTheme === 'dark' || (savedTheme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches));

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.hasAttribute('data-theme');
    setTheme(!isDark);
  });

  // Mobile Menu Logic
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navbar = document.getElementById('navbar');
  
  if (mobileMenuBtn && navbar) {
    let closeTimer;
    const setMenuState = open => {
      mobileMenuBtn.setAttribute('aria-expanded', String(open));
      mobileMenuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    setMenuState(false);
    const closeMenu = () => {
      setMenuState(false);
      navbar.classList.add('menu-closing');
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        navbar.classList.remove('menu-open', 'menu-closing');
      }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220);
    };

    mobileMenuBtn.addEventListener('click', () => {
      if (navbar.classList.contains('menu-open') && !navbar.classList.contains('menu-closing')) {
        closeMenu();
      } else if (!navbar.classList.contains('menu-closing')) {
        navbar.style.setProperty('--nav-collapsed-height', navbar.offsetHeight + 'px');
        navbar.classList.add('menu-open');
        setMenuState(true);
      }
    });
    
    navbar.addEventListener('keydown', event => {
      if (event.key === 'Escape' && navbar.classList.contains('menu-open')) {
        closeMenu();
        mobileMenuBtn.focus();
      }
    });
    window.matchMedia('(min-width: 769px)').addEventListener?.('change', event => {
      if (event.matches) {
        clearTimeout(closeTimer);
        navbar.classList.remove('menu-open', 'menu-closing');
        setMenuState(false);
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

};
