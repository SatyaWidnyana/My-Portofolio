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
      client: 'Ketut Gajah Bali Adventure',
      location: 'Bali, Indonesia',
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
      summary: 'Explore Bali tours and transport, then send trip details through a simple WhatsApp booking flow.',
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
      overviewFeatures: [
        { icon: 'compass', title: 'Island experiences', text: 'Private tours across Bali’s coast and highlands.' },
        { icon: 'route', title: 'Private transport', text: 'Flexible transfers with convenient pickup.' },
        { icon: 'sun', title: 'Sunrise & ocean', text: 'From Mount Batur to snorkeling and diving.' },
        { icon: 'chat', title: 'Simple booking', text: 'Share dates, group size, and trip details.' },
        { icon: 'profile', title: 'Local guidance', text: 'Plan your trip with a Bali-based team.' }
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
      client: 'WGA Dekorasi',
      location: 'Bali, Indonesia',
      url: 'https://satyawidnyana.com/projects/wga-dekorasi',
      liveUrl: 'https://wgadekorasi.com',
      cover: 'image portofolio/WGA DEKORASI/cover.jpeg',
      description: 'A modern event decoration and rental catalog platform. Designed to help clients browse traditional Bali wedding setups, stage tents, and sound systems with transparent pricing and quotation requests.',
      summary: 'Browse Bali event décor and rentals, compare setups, and request a quote.',
      features: [
        'Interactive Decoration & Equipment Catalog',
        'Category Filtering (Tenda, Meja-Kursi, Sound System)',
        'Direct WhatsApp Quotation Request Flow',
        'Lightweight Vanilla CSS Token Architecture',
        'Mobile-First Responsive Layout'
      ],
      overviewFeatures: [
        { icon: 'catalog', title: 'Curated catalog', text: 'Décor, tents, and event essentials in one place.' },
        { icon: 'filter', title: 'Clear categories', text: 'Narrow choices by rental type.' },
        { icon: 'layers', title: 'Rental collections', text: 'Compare coordinated setups and equipment.' },
        { icon: 'chat', title: 'Personal quote', text: 'Send an enquiry with your event details.' },
        { icon: 'globe', title: 'Ready on mobile', text: 'Browse the collection from any screen.' }
      ],
      tech: ['HTML5', 'Vanilla CSS Tokens', 'JavaScript', 'UI/UX Design', 'SEO Basics']
    },
    'wga-ocean': {
      docId: 'CASE STUDY // #03',
      title: 'WGA Ocean',
      category: 'Water Sports & Transport',
      year: '2024',
      role: 'Web Design & Branding',
      client: 'WGA Ocean',
      location: 'Lovina, Bali',
      url: 'https://satyawidnyana.com/projects/wga-ocean',
      liveUrl: 'https://wgaocean.com',
      cover: 'image portofolio/WGA OCEAN/cover.jpeg',
      description: 'An inspiring ocean adventure and wild dolphin watching tour website in Lovina. Built with ocean-inspired gradients, fluid scroll dynamics, and high-conversion excursion booking flows.',
      summary: 'Discover Lovina dolphin tours, water sports, and ocean adventures in one visual guide.',
      features: [
        'Immersive Ocean Visual Aesthetics',
        'Lovina Dolphin Tour & Water Sports Booking',
        'Interactive Photo & Video Experience Gallery',
        'Optimized Mobile Touch Navigation'
      ],
      overviewFeatures: [
        { icon: 'compass', title: 'Dolphin encounters', text: 'Discover the waters around Lovina.' },
        { icon: 'waves', title: 'Ocean activities', text: 'Explore water sports and sea adventures.' },
        { icon: 'camera', title: 'Visual previews', text: 'See the experience through photos and video.' },
        { icon: 'chat', title: 'Easy enquiries', text: 'Find a tour and ask about availability.' },
        { icon: 'globe', title: 'Made for mobile', text: 'Plan comfortably while on the go.' }
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
      location: 'Bali, Indonesia',
      url: 'https://satyawidnyana.com',
      liveUrl: 'https://satyawidnyana.com',
      cover: 'image portofolio/MY PORTOFOLIO/cover.jpeg',
      description: 'An interactive, high-craft portfolio showcasing 3D origami folder physics, realistic interactive lanyard drag, terminal bio emulator, and retro-modern dark/light mode design tokens.',
      summary: 'Selected web projects presented through an interactive archive and focused case studies.',
      features: [
        '3D Origami Cardboard Folder Physics',
        'Bungee String Interactive Draggable Lanyard',
        'Interactive Terminal Profile Loader & Bio Typist',
        'Confidential Project Dossier Modal Showcase',
        'Fluid Light & Dark Mode Color Palette'
      ],
      overviewFeatures: [
        { icon: 'layers', title: 'Project archive', text: 'A curated collection of selected work.' },
        { icon: 'folder', title: '3D folder motion', text: 'Open projects through a paper-inspired folder.' },
        { icon: 'layout', title: 'Case studies', text: 'Explore the thinking behind each project.' },
        { icon: 'spark', title: 'Theme system', text: 'Shift between warm light and dark palettes.' },
        { icon: 'globe', title: 'Responsive build', text: 'A considered experience across screens.' }
      ],
      tech: ['Vanilla JavaScript', 'Web Animations API', 'CSS 3D Transforms', 'Semantic HTML5', 'Design Tokens']
    }
  };

  const dossierModal = document.getElementById('dossierModal');
  const dossierCloseBtn = document.getElementById('dossierCloseBtn');
  const dossierCloseSecondary = document.getElementById('dossierCloseSecondary');
  let activeProjectData = null;
  let catExtensionEnabled = false;
  let catRoutineTimeout = null;
  let catCycleToken = 0;
  let catMotion = null;

  // Lucide icon geometry is embedded inline so the overview does not fetch an icon font or runtime.
  const featureIcons = {
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22l5.9-2Z"/>',
    profile: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    catalog: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    filter: '<path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M2 14h4m4-6h4m4 8h4"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>',
    camera: '<path d="M14 4h-4L8 7H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2-3Z"/><circle cx="12" cy="13" r="3"/>',
    terminal: '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="m7 9 3 3-3 3m6 0h4"/>',
    layers: '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5m-18 5 9 5 9-5"/>',
    route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7H8.5a3.5 3.5 0 0 1 0-7H15"/><path d="m12 8 3-3-3-3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m17.07 7.07-1.42-1.42M6.35 6.35 4.93 4.93m14.14 0-1.42 1.42M6.35 17.65l-1.42 1.42"/>',
    waves: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5 12 5 12 7 14.5 7 17 7 17 5 19.5 5c1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1C7 13 7 11 9.5 11c2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1C7 19 7 17 9.5 17c2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-9L9 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"/><path d="M2 10h20"/>',
    spark: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z"/>'
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
      image.loading = 'lazy';
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
    activeProjectData = data;

    document.getElementById('dossierDocId').textContent = data.docId;
    const editorProjectName = document.getElementById('editorProjectName');
    if (editorProjectName) editorProjectName.textContent = data.docId;
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
    const lbOverviewCategory = document.getElementById('lbOverviewCategory');
    const lbOverviewTitle = document.getElementById('lbOverviewTitle');
    const lbTitle = document.getElementById('lbTitle');
    const lbTagline = document.getElementById('lbTagline');
    const lbDescription = document.getElementById('lbDescription');
    const lbClient = document.getElementById('lbClient');
    const lbLocation = document.getElementById('lbLocation');
    const lbRole = document.getElementById('lbRole');
    const lbYear = document.getElementById('lbYear');
    const lbHeroImg = document.getElementById('lbHeroImg');
    const lbLiveBtn = document.getElementById('lbLiveBtn');
    const lbMockupUrl = document.getElementById('lbMockupUrl');

    if (lbCategory) lbCategory.textContent = data.category;
    if (lbOverviewCategory) lbOverviewCategory.textContent = data.category;
    if (lbOverviewTitle) lbOverviewTitle.textContent = data.title;
    if (lbTitle) lbTitle.textContent = data.title;
    if (lbTagline) lbTagline.textContent = `${data.category} • ${data.year}`;
    if (lbDescription) lbDescription.textContent = data.summary || data.description;
    if (lbClient) lbClient.textContent = data.client;
    if (lbLocation) lbLocation.textContent = data.location || '—';
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
      const features = data.overviewFeatures || data.featureDetails || data.features.map(text => ({
        icon: featureIconFor(text), title: text
      }));
      lbFeaturesGrid.classList.toggle('has-five-features', features.length === 5);
      lbFeaturesGrid.replaceChildren(...features.map(feature => {
        const card = document.createElement('div');
        card.className = 'lb-feature-card';
        const icon = document.createElement('div');
        icon.className = 'lb-feature-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${featureIcons[feature.icon] || featureIcons.layout}</svg>`;
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

    // Every project opens as a tidy workspace, with the Explorer and overview ready.
    document.querySelectorAll('.lb-tab-btn').forEach(tab => { tab.hidden = false; });
    document.querySelectorAll('[data-close-tab]').forEach(button => { button.hidden = false; });
    activateLightboxTab('overview');
    if (editorWorkspace && editorExplorer) {
      editorWorkspace.classList.remove('is-sidebar-collapsed');
      editorWorkspace.classList.add('is-sidebar-open');
      editorExplorer.hidden = false;
      document.querySelectorAll('[data-editor-panel]').forEach(button => {
        const active = button.getAttribute('data-editor-panel') === 'explorer';
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      document.querySelectorAll('[data-editor-view]').forEach(view => {
        view.hidden = view.getAttribute('data-editor-view') !== 'explorer';
      });
    }
    document.querySelectorAll('.editor-fold-toggle').forEach(button => {
      button.setAttribute('aria-expanded', 'true');
      const content = document.getElementById(button.getAttribute('aria-controls'));
      if (content) content.hidden = false;
      const chevron = button.querySelector('.editor-chevron');
      if (chevron) chevron.textContent = '⌄';
    });
    const editorSearchInput = document.getElementById('editorSearchInput');
    if (editorSearchInput) editorSearchInput.value = '';
    const editorExtensionSearch = document.getElementById('editorExtensionSearch');
    if (editorExtensionSearch) editorExtensionSearch.value = '';
    document.querySelectorAll('[data-extension-card]').forEach(card => { card.hidden = false; });
    renderProjectSearch('');

    // Show modal
    dossierModal.classList.remove('overview-opening');
    dossierModal.classList.add('active');
    dossierModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    void dossierModal.offsetWidth;
    dossierModal.classList.add('overview-opening');
    if (catExtensionEnabled) startCatCompanion();
  }

  function closeDossier() {
    if (!dossierModal) return;
    dossierModal.classList.remove('active');
    dossierModal.classList.remove('overview-opening');
    dossierModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    stopCatCompanion();
  }

  // Workbench file tabs and Explorer entries share one navigation state.
  const tabFileNames = {
    overview: 'overview.md',
    gallery: 'mockup.png',
    specs: 'tech-stack.json'
  };

  function activateLightboxTab(target) {
    const tab = document.querySelector(`.lb-tab-btn[data-lb-tab="${target}"]`);
    if (!tab) return;
    tab.hidden = false;
    const closeButton = document.querySelector(`[data-close-tab="${target}"]`);
    if (closeButton) closeButton.hidden = false;
    document.querySelectorAll('[data-lb-tab]').forEach(button => {
      const isActive = button.getAttribute('data-lb-tab') === target;
      button.classList.toggle('active', isActive);
      if (button.hasAttribute('aria-selected')) {
        button.setAttribute('aria-selected', String(isActive));
      }
    });

    const panes = {
      overview: document.getElementById('lbTabOverview'),
      gallery: document.getElementById('lbTabGallery'),
      specs: document.getElementById('lbTabSpecs')
    };
    Object.entries(panes).forEach(([name, pane]) => {
      if (pane) pane.style.display = name === target ? 'block' : 'none';
    });

    const emptyState = document.getElementById('editorEmptyState');
    if (emptyState) emptyState.hidden = true;
    const fileName = document.getElementById('editorProjectSlug');
    if (fileName) fileName.textContent = tabFileNames[target] || tabFileNames.overview;
  }

  function openEditorFile(target) {
    const tab = document.querySelector(`.lb-tab-btn[data-lb-tab="${target}"]`);
    if (tab) tab.hidden = false;
    activateLightboxTab(target);
  }

  function closeEditorFile(target) {
    const tab = document.querySelector(`.lb-tab-btn[data-lb-tab="${target}"]`);
    if (!tab) return;
    const wasActive = tab.classList.contains('active');
    tab.hidden = true;
    const closeButton = document.querySelector(`[data-close-tab="${target}"]`);
    if (closeButton) closeButton.hidden = true;
    if (!wasActive) return;

    const nextTab = [...document.querySelectorAll('.lb-tab-btn')].find(item => !item.hidden);
    if (nextTab) {
      activateLightboxTab(nextTab.getAttribute('data-lb-tab'));
      return;
    }

    document.querySelectorAll('[data-lb-tab]').forEach(button => {
      button.classList.remove('active');
      if (button.hasAttribute('aria-selected')) button.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.lb-tab-pane').forEach(pane => { pane.style.display = 'none'; });
    const emptyState = document.getElementById('editorEmptyState');
    if (emptyState) emptyState.hidden = false;
    const fileName = document.getElementById('editorProjectSlug');
    if (fileName) fileName.textContent = 'No file open';
  }

  document.querySelectorAll('[data-lb-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      activateLightboxTab(btn.getAttribute('data-lb-tab'));
    });
  });

  document.querySelectorAll('[data-close-tab]').forEach(btn => {
    btn.addEventListener('click', () => closeEditorFile(btn.getAttribute('data-close-tab')));
  });

  document.querySelectorAll('[data-open-file]').forEach(btn => {
    btn.addEventListener('click', () => openEditorFile(btn.getAttribute('data-open-file')));
  });

  document.querySelectorAll('.editor-fold-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const content = document.getElementById(button.getAttribute('aria-controls'));
      if (!content) return;
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      content.hidden = expanded;
      const chevron = button.querySelector('.editor-chevron');
      if (chevron) chevron.textContent = expanded ? '›' : '⌄';
    });
  });

  const editorWorkspace = document.querySelector('.editor-workspace');
  const editorExplorer = document.getElementById('editorExplorer');
  document.querySelectorAll('[data-editor-panel]').forEach(button => {
    button.addEventListener('click', () => {
      const panel = button.getAttribute('data-editor-panel');
      const wasActive = button.classList.contains('active');
      const sidebarIsVisible = editorExplorer && !editorExplorer.hidden;
      const shouldClose = wasActive && sidebarIsVisible;

      document.querySelectorAll('[data-editor-panel]').forEach(item => {
        item.classList.toggle('active', !shouldClose && item === button);
        item.setAttribute('aria-pressed', String(!shouldClose && item === button));
      });
      if (!editorWorkspace || !editorExplorer) return;
      editorWorkspace.classList.toggle('is-sidebar-collapsed', shouldClose);
      editorWorkspace.classList.toggle('is-sidebar-open', !shouldClose);
      editorExplorer.hidden = shouldClose;
      if (!shouldClose) {
        document.querySelectorAll('[data-editor-view]').forEach(view => {
          view.hidden = view.getAttribute('data-editor-view') !== panel;
        });
        if (panel === 'search') document.getElementById('editorSearchInput')?.focus();
      }
    });
  });

  const searchInput = document.getElementById('editorSearchInput');
  const searchSummary = document.getElementById('editorSearchSummary');
  const searchResults = document.getElementById('editorSearchResults');
  function renderProjectSearch(query = '') {
    if (!searchResults || !activeProjectData) return;
    const data = activeProjectData;
    const searchable = [
      { file: 'overview', title: 'overview.md', icon: 'M', type: 'markdown', content: [data.title, data.category, data.description, data.client, data.role, data.year, ...data.features].join(' ') },
      { file: 'gallery', title: 'mockup.png', icon: '▧', type: 'image', content: 'desktop mobile responsive preview mockup website screenshots' },
      { file: 'specs', title: 'tech-stack.json', icon: '{ }', type: 'json', content: [...data.tech, ...(data.specs || []), ...(data.stackGroups || []).flatMap(group => [group.title, group.description, ...group.items.map(item => `${item.name} ${item.description}`)])].join(' ') }
    ];
    const term = query.trim().toLowerCase();
    const matches = term ? searchable.filter(item => `${item.title} ${item.content}`.toLowerCase().includes(term)) : [];
    if (searchSummary) searchSummary.textContent = term ? `${matches.length} result${matches.length === 1 ? '' : 's'} in this case study` : 'Enter a word to search this case study.';
    searchResults.replaceChildren(...matches.map(item => {
      const result = document.createElement('button');
      result.className = 'editor-search-result';
      result.setAttribute('data-open-file', item.file);
      const icon = document.createElement('span');
      icon.className = `file-icon ${item.type}`;
      icon.textContent = item.icon;
      const name = document.createElement('strong');
      name.textContent = item.title;
      const context = document.createElement('small');
      context.textContent = data.title;
      result.append(icon, name, context);
      result.addEventListener('click', () => openEditorFile(item.file));
      return result;
    }));
  }
  searchInput?.addEventListener('input', () => renderProjectSearch(searchInput.value));

  const extensionSearch = document.getElementById('editorExtensionSearch');
  extensionSearch?.addEventListener('input', () => {
    const term = extensionSearch.value.trim().toLowerCase();
    document.querySelectorAll('[data-extension-card]').forEach(card => {
      card.hidden = !card.textContent.toLowerCase().includes(term);
    });
  });

  const catExtensionToggle = document.getElementById('catExtensionToggle');
  const editorCatTrack = document.getElementById('editorCatTrack');
  const editorCat = document.getElementById('editorCat');
  const editorCatSpeech = document.getElementById('editorCatSpeech');
  const catPoseMessages = { walk: '', sit: '…', sleep: 'z z', eat: 'nom' };

  function catRouteIsCurrent(token) {
    return catExtensionEnabled && token === catCycleToken && dossierModal?.classList.contains('active');
  }

  function catMaxX() {
    return Math.max(0, editorCatTrack.clientWidth - editorCat.offsetWidth);
  }

  function setCatPose(pose) {
    editorCat.dataset.pose = pose;
    if (editorCatSpeech) editorCatSpeech.textContent = catPoseMessages[pose] || '';
  }

  function setCatLane(lane) {
    editorCatTrack.classList.toggle('cat-lane-upper', lane === 'upper');
    editorCatTrack.classList.toggle('cat-lane-lower', lane === 'lower');
  }

  function cancelCatMotion() {
    if (!catMotion) return;
    catMotion.onfinish = null;
    catMotion.cancel();
    catMotion = null;
  }

  function moveCatTo(targetX, facing, token, onDone) {
    if (!catRouteIsCurrent(token)) return;
    window.clearTimeout(catRoutineTimeout);
    catRoutineTimeout = null;
    cancelCatMotion();
    setCatPose('walk');
    editorCat.classList.toggle('cat-facing-left', facing === 'left');
    editorCat.classList.toggle('cat-facing-right', facing === 'right');
    const fromX = Number.parseFloat(editorCat.style.left) || 0;
    const duration = Math.max(1200, Math.abs(targetX - fromX) / 34 * 1000);
    catMotion = editorCat.animate(
      [{ left: `${fromX}px` }, { left: `${targetX}px` }],
      { duration, easing: 'linear', fill: 'forwards' }
    );
    const motion = catMotion;
    motion.onfinish = () => {
      if (!catRouteIsCurrent(token) || catMotion !== motion) return;
      editorCat.style.left = `${targetX}px`;
      cancelCatMotion();
      onDone?.();
    };
  }

  function catEnterRight(token, onDone) {
    if (!catRouteIsCurrent(token)) return;
    window.clearTimeout(catRoutineTimeout);
    catRoutineTimeout = null;
    cancelCatMotion();
    setCatPose('walk');
    editorCat.classList.remove('cat-facing-left');
    editorCat.classList.add('cat-facing-right', 'cat-entering');
    const maxX = catMaxX();
    const targetX = maxX + editorCat.offsetWidth + 1;
    const halfwayIntoEdge = maxX + editorCat.offsetWidth * 0.55;
    catMotion = editorCat.animate(
      [{ left: `${Number.parseFloat(editorCat.style.left) || 0}px` },
        { left: `${halfwayIntoEdge}px`, offset: 0.55 },
        { left: `${targetX}px` }],
      { duration: 1900, easing: 'linear', fill: 'forwards' }
    );
    const motion = catMotion;
    motion.onfinish = () => {
      if (!catRouteIsCurrent(token) || catMotion !== motion) return;
      cancelCatMotion();
      editorCat.style.left = `${targetX}px`;
      editorCat.style.opacity = '0';
      editorCat.classList.remove('cat-entering');
      onDone?.();
    };
  }

  function catEmerge(token, side, onDone) {
    if (!catRouteIsCurrent(token)) return;
    window.clearTimeout(catRoutineTimeout);
    catRoutineTimeout = null;
    cancelCatMotion();
    editorCat.style.opacity = '0';
    setCatPose('walk');
    const fromX = side === 'right'
      ? catMaxX() + editorCat.offsetWidth + 12
      : side === 'left' ? -editorCat.offsetWidth - 12 : 0;
    const targetX = side === 'right' ? catMaxX() - 2 : 4;
    editorCat.style.left = `${fromX}px`;
    editorCat.classList.toggle('cat-facing-left', side === 'right');
    editorCat.classList.toggle('cat-facing-right', side !== 'right');
    editorCat.classList.toggle('cat-emerging-from-below', side === 'below');
    const enterFrom = side === 'left' ? -15 : side === 'below' ? 18 : 16;
    catMotion = editorCat.animate(
      [{ left: `${fromX}px`, opacity: 0, transform: side === 'below' ? 'translateY(18px) scale(.94)' : `translateX(${enterFrom}px) scale(.96)` },
        { left: `${targetX}px`, opacity: 1, transform: 'translate(0,0) scale(1)' }],
      { duration: side === 'left' || side === 'right' ? 1900 : 1250, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
    );
    const motion = catMotion;
    motion.onfinish = () => {
      if (!catRouteIsCurrent(token) || catMotion !== motion) return;
      editorCat.style.left = `${targetX}px`;
      editorCat.style.opacity = '1';
      editorCat.classList.remove('cat-emerging-from-below');
      cancelCatMotion();
      onDone?.();
    };
  }

  function startCatRoute(token, lane) {
    if (!catRouteIsCurrent(token)) return;
    setCatLane(lane);
    const maxX = catMaxX();
    if (lane === 'lower') {
      catEmerge(token, 'left', () => moveCatTo(maxX, 'right', token, () =>
        catEnterRight(token, () => startCatRoute(token, 'upper'))));
      return;
    }
    catEmerge(token, 'right', () => moveCatTo(Math.min(136, maxX * 0.15), 'left', token, () => {
      editorCat.classList.add('cat-turning');
      catRoutineTimeout = window.setTimeout(() => {
        if (!catRouteIsCurrent(token)) return;
        editorCat.classList.remove('cat-turning');
        moveCatTo(catMaxX(), 'right', token, () =>
          catEnterRight(token, () => startCatRoute(token, 'lower')));
      }, 260);
    }));
  }

  function startCatCompanion() {
    if (!catExtensionEnabled || !editorCatTrack || !dossierModal?.classList.contains('active')) return;
    window.clearTimeout(catRoutineTimeout);
    cancelCatMotion();
    catCycleToken += 1;
    const token = catCycleToken;
    editorCatTrack.hidden = false;
    editorCatTrack.classList.remove('cat-lane-upper', 'cat-lane-lower');
    editorCat.classList.remove('cat-turning', 'cat-entering', 'cat-emerging-from-below');
    editorCat.style.left = '4px';
    editorCat.style.opacity = '1';
    setCatPose('walk');
    dossierModal.classList.remove('cat-extension-enabled');
    void editorCatTrack.offsetWidth;
    dossierModal.classList.add('cat-extension-enabled');
    const catParts = [...editorCat.querySelectorAll('.cat-part')];
    Promise.all(catParts.map(part => part.decode?.().catch(() => null) || Promise.resolve()))
      .then(() => {
        if (!catRouteIsCurrent(token)) return;
        if (editorCat.classList.contains('cat-part-preview')) {
          setCatLane('lower');
          return;
        }
        startCatRoute(token, 'lower');
      });
  }

  function stopCatCompanion() {
    window.clearTimeout(catRoutineTimeout);
    catRoutineTimeout = null;
    catCycleToken += 1;
    cancelCatMotion();
    dossierModal?.classList.remove('cat-extension-enabled');
    if (editorCatTrack) {
      editorCatTrack.hidden = true;
      editorCatTrack.classList.remove('cat-lane-upper', 'cat-lane-lower');
    }
  }

  catExtensionToggle?.addEventListener('click', () => {
    catExtensionEnabled = !catExtensionEnabled;
    catExtensionToggle.setAttribute('aria-pressed', String(catExtensionEnabled));
    catExtensionToggle.textContent = catExtensionEnabled ? 'Enabled' : 'Enable';
    if (catExtensionEnabled) startCatCompanion();
    else stopCatCompanion();
  });

  document.querySelector('[data-editor-outline]')?.addEventListener('click', () => {
    const folderToggle = document.querySelector('.editor-folder-row.editor-fold-toggle');
    const fileList = document.getElementById('editorFileList');
    if (folderToggle && fileList?.hidden) folderToggle.click();
    openEditorFile('overview');
    document.getElementById('lbFeaturesGrid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
