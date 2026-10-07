window.SatyaPortfolio.features['lightbox'] = function () {
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

};
