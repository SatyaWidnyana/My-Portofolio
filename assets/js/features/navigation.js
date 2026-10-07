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

};
