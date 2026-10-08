window.SatyaPortfolio.features['lightbox'] = function () {
  // ==========================================
  // PROJECT DOSSIER CASE STUDY MODAL LOGIC
  // ==========================================
  const projectsData = {
    'ketut-gajah-bali': {
      docId: 'CASE STUDY // #01',
      title: 'Ketut Gajah Bali',
      category: 'Private Tour & Transport',
      year: '2026',
      role: 'UI/UX & Web Developer',
      client: 'Ketut Gajah Bali Adventure · Bali, Indonesia',
      url: 'https://www.ketutgajahbaliadventure.com/',
      liveUrl: 'https://www.ketutgajahbaliadventure.com/',
      cover: 'image portofolio/BALI ADVENTURE/Dekstop/cover.jpeg',
      previews: {
        desktop: ['cover.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg', '7.jpeg', '8.jpeg'].map((file, index) => ({
          src: `image portofolio/BALI ADVENTURE/Dekstop/${file}`,
          width: 1600,
          height: [759, 769, 767, 768, 769, 770, 767, 775][index]
        })),
        mobile: ['cover.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg', '7.jpeg', '8.jpeg'].map((file, index) => ({
          src: `image portofolio/BALI ADVENTURE/Mobile/${file}`,
          width: [605, 605, 606, 598, 606, 606, 603, 606][index],
          height: [911, 906, 912, 908, 911, 908, 907, 908][index]
        }))
      },
      description: 'A website for Ketut Gajah Bali Adventure, a local tour and transport business founded by Ketut Widiana Yasa. Visitors can explore private tours, transport services, Mount Batur sunrise trekking, snorkeling, and diving, then send their activity, travel date, group size, and pickup location through a WhatsApp booking form.',
      features: [
        'Private tours, transport, and outdoor activities',
        'WhatsApp booking form with pickup and travel details',
        'Company profile and local founder story',
        'Language switcher and mobile navigation',
        'Contact links, location map, and Google reviews'
      ],
      featureDetails: [
        { icon: 'compass', title: 'Tours & Transport', text: 'Explore private tours, transfers, and outdoor activities across Bali.' },
        { icon: 'chat', title: 'WhatsApp Booking', text: 'Send your travel date, group size, activity, and pickup details in one enquiry.' },
        { icon: 'profile', title: 'Meet the Local Team', text: 'Get to know the business and the founder behind each journey.' },
        { icon: 'globe', title: 'Language & Navigation', text: 'Switch languages and browse with navigation adapted for mobile screens.' },
        { icon: 'pin', title: 'Contact & Location', text: 'Find contact channels, the location map, and a link to Google reviews.' }
      ],
      tech: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Cloud Firestore', 'Firebase Authentication'],
      stackGroups: [
        {
          title: 'Frontend',
          description: 'The public website and the admin interface.',
          items: [
            { name: 'HTML5', logo: 'FE/html5.svg', description: 'Page structure, forms, and content sections.' },
            { name: 'CSS3', logo: 'FE/css3.svg', description: 'Custom styling, responsive layouts, and CSS animations.' },
            { name: 'JavaScript', logo: 'FE/javascript.svg', description: 'Native ES modules, DOM interactions, and language switching.' }
          ]
        },
        {
          title: 'Backend · Firebase',
          description: 'Managed database and authentication, connected through the Firebase JavaScript SDK.',
          items: [
            { name: 'Cloud Firestore', logo: 'BE/cloud-firestore.svg', description: 'Stores services, promotions, and Moments content.' },
            { name: 'Firebase Authentication', logo: 'BE/firebase-authentication.svg', description: 'Email/password sign-in and session handling for the admin panel.' }
          ]
        },
        {
          title: 'Integrations & UI assets',
          description: 'Supporting services and libraries used by the website.',
          items: [
            { name: 'WhatsApp', logo: 'Integrations/whatsapp.svg', description: 'Booking enquiries open a pre-filled message through a wa.me link.' },
            { name: 'Google Maps', logo: 'Integrations/google-maps.svg', description: 'An embedded location map; no custom Maps API implementation.' },
            { name: 'Google Fonts', logo: 'Integrations/google-fonts.png', description: 'Web fonts loaded from the Google Fonts stylesheet service.' },
            { name: 'Font Awesome', logo: 'Integrations/font-awesome.svg', description: 'Interface icons from Font Awesome 6.4.0.' }
          ]
        }
      ],
      specTitles: ['Frontend', 'Backend & Admin', 'Integrations & Booking', 'Performance & SEO'],
      specLogos: ['FE/javascript.svg', 'BE/firebase.svg', 'Integrations/whatsapp.svg', null],
      specs: [
        'HTML5, custom responsive CSS, and native JavaScript modules. Scroll reveals use IntersectionObserver; the activity marquee uses requestAnimationFrame.',
        'Firebase Authentication handles admin login. Firestore supports adding, editing, and deleting services, plus adding and deleting promo and Moments entries. Photos are compressed in the browser and saved as Base64 in Firestore.',
        'The booking form prepares a WhatsApp message with travel details. The site also embeds Google Maps and loads Google Fonts and Font Awesome icons.',
        'Hero image preload, lazy-loaded images, and localStorage content caching are implemented. SEO includes a canonical URL, Open Graph tags, sitemap, and TravelAgency structured data. No Lighthouse score is claimed.'
      ]
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

  // Inline vector icons stay crisp and do not require an external icon font.
  const featureIcons = {
    compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5Z"/>',
    chat: '<path d="M21 11.5a9 9 0 0 1-13 8L3 21l1.5-5a9 9 0 1 1 16.5-4.5Z"/><path d="M9 7.5c-1 0-1.5 1-1 2.5a9 9 0 0 0 5.5 5.5c1.5.5 2.5 0 2.5-1l-2-1.5-1 1a7 7 0 0 1-3.5-3.5l1-1Z"/>',
    profile: '<circle cx="12" cy="8" r="3"/><path d="M5 21v-2a7 7 0 0 1 14 0v2M4 4h2M18 4h2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
    pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    catalog: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    filter: '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>',
    layout: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/>',
    camera: '<rect x="3" y="6" width="18" height="15" rx="2"/><path d="m8 6 1-3h6l1 3"/><circle cx="12" cy="13" r="4"/>',
    terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/>',
    layers: '<path d="m12 3 10 6-10 6L2 9Zm-10 12 10 6 10-6M2 15l10 6 10-6"/>'
  };

  function featureIconFor(text) {
    if (/whatsapp|booking|quotation/i.test(text)) return 'chat';
    if (/filter/i.test(text)) return 'filter';
    if (/catalog/i.test(text)) return 'catalog';
    if (/photo|video|gallery/i.test(text)) return 'camera';
    if (/terminal/i.test(text)) return 'terminal';
    if (/tour|ocean|dolphin/i.test(text)) return 'compass';
    if (/mobile|navigation/i.test(text)) return 'globe';
    if (/folder|3d|lanyard/i.test(text)) return 'layers';
    return 'layout';
  }

  function renderDevicePreview(data, mode) {
    const panelId = mode === 'mobile' ? 'lbMockupMobile' : 'lbMockupWrapper';
    const imageId = mode === 'mobile' ? 'lbMockupMobileImg' : 'lbMockupImg';
    const container = document.querySelector(`#${panelId} .mockup-img-container`);
    if (!container) return;
    const screenshots = data.previews?.[mode] || [{ src: data.cover }];
    container.replaceChildren(...screenshots.map((screenshot, index) => {
      const image = document.createElement('img');
      if (index === 0) image.id = imageId;
      image.src = screenshot.src;
      image.alt = `${data.title} ${mode} preview, screen ${index + 1} of ${screenshots.length}`;
      image.decoding = 'async';
      image.loading = index === 0 ? 'eager' : 'lazy';
      if (screenshot.width && screenshot.height) {
        image.width = screenshot.width;
        image.height = screenshot.height;
      }
      return image;
    }));
    container.scrollTop = 0;
  }

  function openDossier(projectId) {
    const folder = document.getElementById('portfolio-folder');
    if (!folder || !folder.classList.contains('is-open')) return;
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
    const mobileUrl = document.getElementById('lbMockupMobileUrl');
    if (mobileUrl) mobileUrl.textContent = data.url;
    renderDevicePreview(data, 'desktop');
    renderDevicePreview(data, 'mobile');
    setDeviceMode('desktop');
    if (lbLiveBtn) lbLiveBtn.href = data.liveUrl || '#';
    if (lbMockupUrl) lbMockupUrl.textContent = data.url;

    const specCopy = data.specs || [
      'See the listed technology stack for this project.',
      'Project layout and visual styling.',
      'Performance scores have not been independently measured.',
      'See the project overview for its available features.'
    ];
    document.querySelectorAll('#lbTabSpecs .lb-spec-card').forEach((card, index) => {
      card.querySelector('p').textContent = specCopy[index];
      const title = card.querySelector('h4');
      if (!title.dataset.defaultTitle) title.dataset.defaultTitle = title.textContent;
      title.textContent = data.specTitles?.[index] || title.dataset.defaultTitle;
      const icon = card.querySelector('.spec-icon');
      icon.replaceChildren();
      if (data.specLogos?.[index]) {
        const image = document.createElement('img');
        image.src = `image portofolio/BALI ADVENTURE/Stack/${data.specLogos[index]}`;
        image.alt = '';
        image.width = 32;
        image.height = 32;
        icon.appendChild(image);
      } else {
        icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5M7.5 11.5l2-2 2 2 2-3"/></svg>';
      }
    });

    const lbFeaturesGrid = document.getElementById('lbFeaturesGrid');
    if (lbFeaturesGrid) {
      const features = data.featureDetails || data.features.map(text => ({
        icon: featureIconFor(text), title: text
      }));
      lbFeaturesGrid.classList.toggle('has-five-features', features.length === 5);
      lbFeaturesGrid.replaceChildren(...features.map(feature => {
        const card = document.createElement('div');
        card.className = 'lb-feature-card';
        const icon = document.createElement('div');
        icon.className = 'lb-feature-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${featureIcons[feature.icon] || featureIcons.layout}</svg>`;
        const copy = document.createElement('div');
        copy.className = 'lb-feature-copy';
        const title = document.createElement('h4');
        title.textContent = feature.title;
        copy.appendChild(title);
        if (feature.text) {
          const description = document.createElement('p');
          description.textContent = feature.text;
          copy.appendChild(description);
        }
        card.append(icon, copy);
        return card;
      }));
    }

    const lbTechChips = document.getElementById('lbTechChips');
    if (lbTechChips) {
      lbTechChips.replaceChildren();
      lbTechChips.classList.toggle('has-stack-groups', Boolean(data.stackGroups));
      if (data.stackGroups) {
        data.stackGroups.forEach(group => {
          const section = document.createElement('section');
          section.className = 'lb-stack-group';
          const heading = document.createElement('h4');
          heading.className = 'lb-stack-heading';
          heading.textContent = group.title;
          const introduction = document.createElement('p');
          introduction.className = 'lb-stack-intro';
          introduction.textContent = group.description;
          const list = document.createElement('ul');
          list.className = 'lb-stack-list';
          group.items.forEach(technology => {
            const item = document.createElement('li');
            item.className = 'lb-stack-item';
            const image = document.createElement('img');
            image.className = 'lb-stack-logo';
            image.src = `image portofolio/BALI ADVENTURE/Stack/${technology.logo}`;
            image.alt = '';
            image.width = 36;
            image.height = 36;
            image.decoding = 'async';
            const copy = document.createElement('div');
            const name = document.createElement('h5');
            name.textContent = technology.name;
            const description = document.createElement('p');
            description.textContent = technology.description;
            copy.append(name, description);
            item.append(image, copy);
            list.appendChild(item);
          });
          section.append(heading, introduction, list);
          lbTechChips.appendChild(section);
        });
      } else {
        data.tech.forEach(technology => {
          const label = document.createElement('span');
          label.textContent = technology;
          lbTechChips.appendChild(label);
        });
      }
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
  const lbMockupMobile = document.getElementById('lbMockupMobile');

  function setDeviceMode(mode) {
    if (!lbMockupWrapper || !lbMockupMobile) return;
    const isMobile = mode === 'mobile';
    const activeButton = isMobile ? btnDeviceMobile : btnDeviceDesktop;
    const inactiveButton = isMobile ? btnDeviceDesktop : btnDeviceMobile;

    // Two fixed-size panels switch instantly and keep independent scroll positions.
    lbMockupWrapper.hidden = isMobile;
    lbMockupMobile.hidden = !isMobile;
    if (activeButton) {
      activeButton.classList.add('active');
      activeButton.setAttribute('aria-pressed', 'true');
    }
    if (inactiveButton) {
      inactiveButton.classList.remove('active');
      inactiveButton.setAttribute('aria-pressed', 'false');
    }
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
