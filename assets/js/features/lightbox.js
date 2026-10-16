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
      summary: 'Explore Bali tours, outdoor activities, and private transport in one place, then send trip details through a simple WhatsApp booking flow. The experience helps travelers connect with a local guide quickly and easily.',
      overviewLayout: 'journey',
      featuresOverline: 'TRIP FLOW // 05 STOPS',
      featuresTitle: 'How the booking journey works',
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
        { icon: 'compass', label: 'ISLAND', title: 'Discover Bali', text: 'Browse private tours, transport, and outdoor experiences.' },
        { icon: 'sun', label: 'EXPERIENCE', title: 'Choose your trip', text: 'Pick Mount Batur, ocean activities, or a custom day out.' },
        { icon: 'pin', label: 'DETAILS', title: 'Set the plan', text: 'Add your date, group size, and pickup location.' },
        { icon: 'chat', label: 'WHATSAPP', title: 'Send the enquiry', text: 'Review the details and send them directly to the local team.' },
        { icon: 'profile', label: 'BALI TEAM', title: 'Meet your guide', text: 'Continue planning with someone who knows the island.' }
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
            { name: 'Google Maps', logo: 'Integrations/google-maps.svg', description: 'Displays an embedded location map. It does not use a custom Maps API integration.' },
            { name: 'Google Fonts', logo: 'Integrations/google-fonts.png', description: 'Web fonts loaded from the Google Fonts stylesheet service.' },
            { name: 'Font Awesome', logo: 'Integrations/font-awesome.svg', description: 'Interface icons from Font Awesome 6.4.0.' }
          ]
        }
      ],
      specTitles: ['Frontend', 'Backend & Admin', 'Integrations & Booking', 'Performance & SEO'],
      specLogos: ['FE/javascript.svg', 'BE/firebase.svg', 'Integrations/whatsapp.svg', null],
      specs: [
        'HTML5, custom responsive CSS, and native JavaScript modules. Scroll reveals use IntersectionObserver. The activity marquee uses requestAnimationFrame.',
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
      role: 'UI/UX & Web Developer',
      client: 'WGA Dekorasi',
      location: 'Bali, Indonesia',
      url: 'https://wga-dekorasi.vercel.app/',
      liveUrl: 'https://wga-dekorasi.vercel.app/',
      cover: 'image portofolio/WGA DEKORASI/Dekstop/cover.png',
      previews: {
        desktop: ['cover.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png'].map((file, index) => ({
          src: `image portofolio/WGA DEKORASI/Dekstop/${file}`,
          width: [1896, 1896, 1896, 1896, 1896, 1897, 1893, 1900, 1897][index],
          height: [905, 907, 902, 903, 902, 905, 903, 905, 902][index]
        })),
        mobile: ['cover.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png'].map((file, index) => ({
          src: `image portofolio/WGA DEKORASI/Mobile/${file}`,
          width: [610, 605, 610, 610, 610, 608, 608, 610, 607][index],
          height: [907, 901, 905, 905, 907, 905, 902, 902, 901][index]
        }))
      },
      description: 'A website for event decoration and equipment rentals in Bali. Visitors can search the catalog, filter rental categories, view event photos, and read or submit client reviews. Quotes are arranged through WhatsApp. An admin interface manages catalog images, event photos, and reviews.',
      summary: 'Find decorations and equipment for your event, explore past setups, and read client reviews. Contact the team through WhatsApp to discuss availability and a quote.',
      overviewLayout: 'journey',
      featuresOverline: 'SITE GUIDE // 05 PARTS',
      featuresTitle: 'Explore the event essentials',
      features: [
        'Searchable rental catalog with category filters',
        'Event photo gallery with image previews',
        'Client reviews, ratings, and review submission',
        'WhatsApp consultation and quotation links',
        'Admin tools for catalog, event photos, and reviews'
      ],
      overviewFeatures: [
        { icon: 'catalog', label: 'COLLECTION', title: 'Browse the catalog', text: 'Explore decorations, tents, and event equipment in one collection.' },
        { icon: 'camera', label: 'MOMENTS', title: 'See past events', text: 'Filter the event gallery and open photos for a closer look at each setup.' },
        { icon: 'spark', label: 'REVIEWS', title: 'Hear from clients', text: 'Read client ratings and comments, or share your own event experience.' },
        { icon: 'chat', label: 'WHATSAPP', title: 'Ask for a quote', text: 'Contact the team to discuss your event, availability, and rental needs.' },
        { icon: 'folder', label: 'ADMIN', title: 'Manage the content', text: 'Upload and remove catalog or event photos, and manage client reviews.' }
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Vercel Functions', 'Supabase Database', 'Supabase Storage', 'Cloudflare Turnstile', 'WhatsApp', 'Google Maps', 'Google Fonts', 'Sharp', 'PGlite'],
      stackAssetRoot: 'image portofolio/WGA DEKORASI/Stack',
      stackGroups: [
        {
          title: 'Frontend',
          description: 'The public pages and admin interface use HTML, CSS design tokens, and vanilla JavaScript.',
          items: [
            { name: 'HTML5', logo: 'FE/html5.svg', description: 'Structures the homepage, catalog, event gallery, review forms, and admin pages.' },
            { name: 'CSS3', logo: 'FE/css3.svg', description: 'Uses shared design tokens for color, spacing, and responsive layouts. Animations respect reduced motion preferences.' },
            { name: 'JavaScript', logo: 'FE/javascript.svg', description: 'Handles search, category filters, photo lightboxes, and cursor pagination. IntersectionObserver triggers scroll reveals and loading. Browser Canvas compresses uploaded photos.' }
          ]
        },
        {
          title: 'Backend & Data',
          description: 'Node.js API handlers run as Vercel Functions. Supabase holds content and uploaded photos.',
          items: [
            { name: 'Node.js', logo: 'BE/nodejs.svg', description: 'The project targets Node.js 24.x. CommonJS API handlers serve catalog, event gallery, and review data.' },
            { name: 'Vercel Functions', logo: 'BE/vercel.svg', logoSurface: 'paper', description: 'Provides the serverless runtime for the project’s API routes.' },
            { name: 'Supabase Database', logo: 'BE/supabase.svg', description: 'Stores catalog entries, categories, event photos, and client reviews in PostgreSQL.' },
            { name: 'Supabase Storage', logo: 'BE/supabase.svg', description: 'Stores uploaded photos and thumbnails. Photos are compressed in the browser before upload, with WebP and a JPEG fallback.' }
          ]
        },
        {
          title: 'Integrations',
          description: 'Supporting services for form verification, enquiries, location information, and typography.',
          items: [
            { name: 'Cloudflare Turnstile', logo: 'Integrations/cloudflare.png', logoSurface: 'paper', description: 'Adds verification to review submissions and admin login.' },
            { name: 'WhatsApp', logo: 'Integrations/whatsapp.svg', description: 'Opens a conversation with the team for consultation and rental quotes. Confirmation, deposit, and installation are arranged outside the website.' },
            { name: 'Google Maps', logo: 'Integrations/google-maps.svg', description: 'Shows the business location through an embedded map.' },
            { name: 'Google Fonts', logo: 'Integrations/google-fonts.png', description: 'Loads the project’s web fonts through Google Fonts stylesheets.' }
          ]
        },
        {
          title: 'Media & Testing',
          description: 'Image processing during the build and local automated tests for database behavior.',
          items: [
            { name: 'Sharp', logo: 'Tools/sharp.svg', description: 'Creates responsive WebP hero images at 640px and 1280px during the build.' },
            { name: 'PGlite', logo: 'Tools/pglite.svg', logoSurface: 'paper', description: 'Runs PostgreSQL locally for database tests with the Node.js test runner. Production data uses Supabase.' }
          ]
        }
      ]
    },
    'wga-ocean': {
      docId: 'CASE STUDY // #03',
      status: 'development',
      title: 'WGA Ocean',
      category: 'Water Sports & Transport',
      year: '2024',
      role: 'Web Design & Branding',
      client: 'WGA Ocean',
      location: 'Lovina, Bali',
      url: 'https://wgaocean.com',
      liveUrl: 'https://wgaocean.com',
      cover: 'image portofolio/WGA OCEAN/cover.jpeg',
      description: 'A website for dolphin tours and water activities in Lovina. Visitors can explore tour options, preview experiences through photos and video, and send a booking enquiry.',
      summary: 'Discover Lovina dolphin tours, water sports, and ocean adventures in one visual guide.',
      overviewLayout: 'journey',
      featuresOverline: 'OCEAN FLOW // 05 STOPS',
      featuresTitle: 'From the shoreline to your next trip',
      features: [
        'Immersive Ocean Visual Aesthetics',
        'Lovina Dolphin Tour & Water Sports Booking',
        'Interactive Photo & Video Experience Gallery',
        'Optimized Mobile Touch Navigation'
      ],
      overviewFeatures: [
        { icon: 'compass', label: 'LOVINA', title: 'Discover Lovina', text: 'Explore dolphin encounters and the waters around Lovina.' },
        { icon: 'waves', label: 'ACTIVITIES', title: 'Choose your trip', text: 'Browse water sports and ocean adventures that fit your plans.' },
        { icon: 'camera', label: 'GALLERY', title: 'Preview the trip', text: 'See the experience through photos and video before making an enquiry.' },
        { icon: 'chat', label: 'ENQUIRY', title: 'Ask about a tour', text: 'Find a tour and contact the team about availability and booking.' },
        { icon: 'globe', label: 'ON THE GO', title: 'Plan on mobile', text: 'Explore activities and prepare your plans while on the go.' }
      ],
      tech: ['TypeScript', 'React', 'Next.js', 'CSS Modules', 'Framer Motion', 'Prisma', 'PostgreSQL'],
      stackGroups: [
        {
          title: 'Frontend',
          description: 'A typed React application using the Next.js App Router, custom CSS, and animated UI components.',
          items: [
            { name: 'TypeScript', logoSrc: 'assets/svg/tech/typescript.svg', description: 'Types the React components, page data, and API route handlers.' },
            { name: 'React', logoSrc: 'assets/svg/tech/react.svg', description: 'Builds the interactive home page, activity details, booking form, and photo gallery.' },
            { name: 'Next.js', logoSrc: 'assets/svg/tech/nextjs.svg', description: 'Provides the App Router, server-rendered pages, image components, and application routes.' },
            { name: 'CSS Modules', logo: 'FE/css3.svg', description: 'Component and page styles use .module.css files alongside shared CSS variables.' },
            { name: 'Framer Motion', logoSrc: 'assets/svg/tech/framermotion.svg', description: 'Animates the home page and the Moments photo gallery. This is the React animation library.' }
          ]
        },
        {
          title: 'Backend & Data',
          description: 'Next.js Route Handlers access relational project data through Prisma. The schema declares PostgreSQL.',
          items: [
            { name: 'Next.js Route Handlers', logoSrc: 'assets/svg/tech/nextjs.svg', description: 'Implements API endpoints for activities, Moments, bookings, and uploads.' },
            { name: 'Prisma', logoSrc: 'assets/svg/tech/prisma.svg', description: 'Queries Activity, Moment, and Booking records from server-side pages and API handlers.' },
            { name: 'PostgreSQL', logoSrc: 'assets/svg/tech/postgresql.svg', description: 'The relational database provider used by the Prisma schema for activities, Moments, and bookings.' }
          ]
        },
        {
          title: 'Integrations & UI assets',
          description: 'Supporting services used in the checked source.',
          items: [
            { name: 'WhatsApp', logo: 'Integrations/whatsapp.svg', description: 'The booking flow posts to the booking API and prepares a WhatsApp enquiry.' },
            { name: 'Google Fonts', logo: 'Integrations/google-fonts.png', description: 'Loads the typography through next/font/google.' },
            { name: 'Lucide React', logoSrc: 'assets/svg/tech/lucide.svg', description: 'Provides interface icons in React components.' }
          ]
        }
      ]
    },
    'satya-portfolio': {
      docId: 'CASE STUDY // #04',
      title: 'My Portofolio',
      status: 'current',
      category: 'Personal Creative Portfolio',
      year: '2024',
      role: 'Creative Direction & Fullstack',
      client: 'Personal Project',
      location: 'Bali, Indonesia',
      url: 'https://satyawidnyana.com',
      liveUrl: 'https://satyawidnyana.com',
      cover: 'image portofolio/MY PORTOFOLIO/cover.jpeg',
      description: 'A personal portfolio with an interactive project archive, 3D folder motion, a draggable lanyard, and a terminal profile. Visitors can open case studies and switch between light and dark themes.',
      summary: 'Selected web projects presented through an interactive archive and focused case studies.',
      overviewLayout: 'journey',
      featuresOverline: 'SITE FLOW // 05 STOPS',
      featuresTitle: 'From the archive to each project story',
      features: [
        '3D Origami Cardboard Folder Physics',
        'Bungee String Interactive Draggable Lanyard',
        'Interactive Terminal Profile Loader & Bio Typist',
        'Confidential Project Dossier Modal Showcase',
        'Fluid Light & Dark Mode Color Palette'
      ],
      overviewFeatures: [
        { icon: 'layers', label: 'ARCHIVE', title: 'Explore the work', text: 'Browse the project archive and choose a case study to explore.' },
        { icon: 'folder', label: 'FOLDERS', title: 'Open a project', text: 'Use the animated folder to open the story behind each piece of work.' },
        { icon: 'layout', label: 'CASE STUDY', title: 'Read the story', text: 'Explore the overview, visual preview, and technology stack for each project.' },
        { icon: 'spark', label: 'APPEARANCE', title: 'Switch the theme', text: 'Change between light and dark palettes as you browse the portfolio.' },
        { icon: 'globe', label: 'ANY DEVICE', title: 'Browse anywhere', text: 'Explore the archive and case studies across different screen sizes.' }
      ],
      tech: ['Vanilla JavaScript', 'Web Animations API', 'CSS 3D Transforms', 'Semantic HTML5', 'Design Tokens'],
      stackGroups: [
        {
          title: 'Frontend',
          description: 'The portfolio pages, interactive archive, and case study workspace.',
          items: [
            { name: 'Semantic HTML5', logo: 'FE/html5.svg', description: 'Structures the profile, project archive, and case study content.' },
            { name: 'Vanilla JavaScript', logo: 'FE/javascript.svg', description: 'Coordinates the terminal, project selection, themes, and lightbox interactions.' }
          ]
        },
        {
          title: 'Motion',
          description: 'Movement in the folders, interface transitions, and interactive details.',
          items: [
            { name: 'Web Animations API', logo: 'FE/javascript.svg', description: 'The browser’s JavaScript API for timed animations and controlled transition sequences.' },
            { name: 'CSS 3D Transforms', logo: 'FE/css3.svg', description: 'Adds perspective and depth to the folder and paper interactions using CSS.' }
          ]
        },
        {
          title: 'Theme system',
          description: 'Shared visual values for the light and dark palettes.',
          items: [
            { name: 'Design Tokens', logo: 'FE/css3.svg', description: 'Uses CSS custom properties to keep colors, borders, surfaces, and spacing consistent across themes.' }
          ]
        }
      ]
    }
  };

  function renderTechStack(data) {
    const layers = document.getElementById('lbTechChips');
    if (!layers) return;
    const element = (tag, className, text) => {
      const node = document.createElement(tag);
      node.className = className;
      if (text !== undefined) node.textContent = text;
      return node;
    };
    const logo = technology => {
      if (!technology.logo && !technology.logoSrc) {
        const monogram = element('span', 'stack-monogram', technology.name.replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase());
        monogram.setAttribute('aria-hidden', 'true');
        return monogram;
      }
      const image = element('img', technology.logoSurface === 'paper' ? 'stack-logo stack-logo--paper' : 'stack-logo');
      image.src = technology.logoSrc || `${data.stackAssetRoot || 'image portofolio/BALI ADVENTURE/Stack'}/${technology.logo}`;
      image.alt = '';
      image.width = 28;
      image.height = 28;
      image.decoding = 'async';
      return image;
    };
    const groups = data.stackGroups || [{
      title: 'Project stack',
      description: data.summary || data.category,
      items: data.tech.map(name => ({ name, description: 'Listed as part of this project’s technology stack.' }))
    }];
    const components = [];
    layers.replaceChildren();
    groups.forEach(group => {
      const section = element('section', 'stack-layer');
      const heading = element('div', 'stack-layer-heading');
      heading.append(element('h4', '', group.title));
      const list = element('ul', 'stack-component-list');
      list.classList.toggle('has-two-components', group.items.length === 2);
      group.items.forEach(technology => {
        const item = element('li', 'stack-component');
        const button = element('button', 'stack-component-button');
        button.type = 'button';
        button.setAttribute('aria-pressed', 'false');
        button.append(logo(technology), element('span', 'stack-component-name', technology.name));
        const marker = element('span', 'stack-component-marker', '↓');
        marker.setAttribute('aria-hidden', 'true');
        button.append(marker);
        item.append(button);
        list.append(item);
        components.push({ technology, group, item, button });
      });
      section.append(heading, list);
      layers.append(section);
    });

    document.getElementById('stackProjectCaption').textContent = data.title;
    const previous = document.getElementById('stackPrevious');
    const next = document.getElementById('stackNext');
    let selectedIndex = -1;
    let inspectorMotion = null;
    const select = index => {
      const selected = components[index];
      if (!selected) return;
      const animateChange = selectedIndex >= 0 && selectedIndex !== index;
      selectedIndex = index;
      components.forEach((component, componentIndex) => {
        const active = componentIndex === index;
        component.item.classList.toggle('is-selected', active);
        component.button.setAttribute('aria-pressed', String(active));
      });
      document.getElementById('stackSelectedGroup').textContent = selected.group.title;
      document.getElementById('stackSelectedLogo').replaceChildren(logo(selected.technology));
      document.getElementById('stackSelectedName').textContent = selected.technology.name;
      document.getElementById('stackSelectedDescription').textContent = selected.technology.description;
      document.getElementById('stackSelectedContext').textContent = selected.group.description;
      inspectorMotion?.cancel();
      if (animateChange && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        inspectorMotion = document.querySelector('.stack-inspector-copy').animate([
          { opacity: .25, transform: 'translateY(5px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 200, easing: 'ease-out' });
      }
      previous.disabled = index === 0;
      next.disabled = index === components.length - 1;
    };
    components.forEach((component, index) => {
      component.button.addEventListener('click', () => select(index));
      component.button.addEventListener('keydown', event => {
        const movement = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
        if (!movement) return;
        event.preventDefault();
        const target = (index + movement + components.length) % components.length;
        select(target);
        components[target].button.focus();
      });
    });
    previous.onclick = () => select(selectedIndex - 1);
    next.onclick = () => select(selectedIndex + 1);
    select(0);
  }

  function updateLiveLink(link, data, liveLabel) {
    if (!link) return;
    const developing = data.status === 'development';
    const currentSite = data.status === 'current';
    (link.querySelector('span') || link).textContent = currentSite ? 'You are viewing this website' : developing ? 'In Development' : liveLabel;
    link.classList.toggle('project-in-development', developing);
    if (developing || currentSite) {
      link.removeAttribute('href');
      link.setAttribute('aria-disabled', 'true');
      link.setAttribute('role', 'status');
      link.setAttribute('tabindex', '-1');
    } else {
      link.href = data.liveUrl || '#';
      link.removeAttribute('aria-disabled');
      link.removeAttribute('role');
      link.removeAttribute('tabindex');
    }
  }

  const dossierModal = document.getElementById('dossierModal');
  const dossierModalContainer = document.getElementById('dossierModalContainer');
  const dossierCloseBtn = document.getElementById('dossierCloseBtn');
  const dossierCloseSecondary = document.getElementById('dossierCloseSecondary');
  let activeProjectData = null;
  let catExtensionEnabled = false;
  let musicExtensionEnabled = false;
  let currentMusicTrackIndex = 0;
  let catRoutineTimeout = null;
  let catCycleToken = 0;
  let catMotion = null;
  let journeyObserver = null;
  const musicTracks = [
    { title: 'Blue Skies', src: 'assets/audio/holizna/blue-skies.mp3' },
    { title: 'Windows Down', src: 'assets/audio/holizna/windows-down.mp3' },
    { title: 'Waves', src: 'assets/audio/holizna/waves.mp3' }
  ];

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

  let dossierReturnFocus = null;
  let dossierBackgroundState = [];
  let dossierBodyOverflow = '';
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
    updateLiveLink(liveBtn, data, 'Visit Live Project ↗');
    updateLiveLink(liveBtnImg, data, 'Explore Live Site ↗');

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
    updateLiveLink(lbLiveBtn, data, 'Explore Live Website ↗');
    if (lbMockupUrl) lbMockupUrl.textContent = data.url;

    renderTechStack(data);

    const lbFeaturesGrid = document.getElementById('lbFeaturesGrid');
    if (lbFeaturesGrid) {
      const lbFeaturesOverline = document.getElementById('lbFeaturesOverline');
      const lbFeaturesTitle = document.getElementById('lbFeaturesTitle');
      const lbFeaturesHint = document.getElementById('lbFeaturesHint');
      const usesJourneyLayout = data.overviewLayout === 'journey';
      const features = data.overviewFeatures || data.featureDetails || data.features.map(text => ({
        icon: featureIconFor(text), title: text
      }));
      if (lbFeaturesOverline) lbFeaturesOverline.textContent = data.featuresOverline || 'SELECTED DETAILS';
      if (lbFeaturesTitle) lbFeaturesTitle.textContent = data.featuresTitle || 'Project highlights';
      if (lbFeaturesHint) lbFeaturesHint.hidden = !usesJourneyLayout;
      lbFeaturesGrid.classList.toggle('has-five-features', features.length === 5);
      lbFeaturesGrid.classList.toggle('is-journey', usesJourneyLayout);
      lbFeaturesGrid.classList.remove('is-visible');
      const featureCards = features.map((feature, index) => {
        const card = document.createElement('div');
        card.className = 'lb-feature-card';
        card.style.setProperty('--feature-delay', `${170 + index * 90}ms`);
        if (usesJourneyLayout) {
          card.tabIndex = 0;
          card.setAttribute('role', 'button');
          card.setAttribute('aria-expanded', 'false');
          card.setAttribute('aria-label', `${feature.title}. Select to reveal details.`);
        }
        const icon = document.createElement('div');
        icon.className = 'lb-feature-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${featureIcons[feature.icon] || featureIcons.layout}</svg>`;
        const copy = document.createElement('div');
        copy.className = 'lb-feature-copy';
        if (feature.label) {
          const label = document.createElement('span');
          label.className = 'lb-feature-location';
          label.textContent = feature.label;
          copy.appendChild(label);
        }
        const title = document.createElement('h4');
        title.textContent = feature.title;
        copy.appendChild(title);
        if (feature.text) {
          const description = document.createElement('p');
          if (usesJourneyLayout) {
            description.id = `lbJourneyDetail${index + 1}`;
            description.setAttribute('aria-hidden', 'true');
            card.setAttribute('aria-controls', description.id);
          }
          description.textContent = feature.text;
          copy.appendChild(description);
        }
        card.append(icon, copy);
        return card;
      });
      lbFeaturesGrid.replaceChildren(...featureCards);
      if (lbFeaturesGrid.classList.contains('is-journey')) {
        const stopAnimations = new Map();
        const setActiveJourneyStop = selectedCard => {
          const mobileMotion = window.matchMedia('(max-width: 900px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          const before = mobileMotion ? featureCards.map(card => card.getBoundingClientRect().top) : [];
          stopAnimations.forEach(animation => animation.cancel());
          stopAnimations.clear();
          featureCards.forEach(card => {
            const isActive = card === selectedCard;
            const title = card.querySelector('h4')?.textContent || 'Journey stop';
            card.classList.toggle('is-active', isActive);
            card.setAttribute('aria-expanded', String(isActive));
            card.setAttribute('aria-label', `${title}. Select to ${isActive ? 'hide' : 'reveal'} details.`);
            card.querySelector('p')?.setAttribute('aria-hidden', String(!isActive));
          });
          if (mobileMotion) {
            const after = featureCards.map(card => card.getBoundingClientRect().top);
            featureCards.forEach((card, index) => {
              const offset = before[index] - after[index];
              if (Math.abs(offset) < .5 || !card.animate) return;
              const animation = card.animate([{ transform: 'translateY(' + offset + 'px)' }, { transform: 'translateY(0)' }], { duration: 180, easing: 'cubic-bezier(.2,.72,.2,1)' });
              stopAnimations.set(card, animation);
              animation.finished.then(() => { if (stopAnimations.get(card) === animation) stopAnimations.delete(card); }).catch(() => {});
            });
            const detail = selectedCard?.querySelector('p');
            if (detail?.animate) {
              const animation = detail.animate([{ opacity: 0, transform: 'translateY(-4px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 160, easing: 'ease-out' });
              stopAnimations.set(detail, animation);
              animation.finished.then(() => { if (stopAnimations.get(detail) === animation) stopAnimations.delete(detail); }).catch(() => {});
            }
          }
        };
        featureCards.forEach(card => {
          const toggleStop = () => setActiveJourneyStop(card.classList.contains('is-active') ? null : card);
          card.addEventListener('click', toggleStop);
          card.addEventListener('keydown', event => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            toggleStop();
          });
        });

        const mapArt = document.createElement('div');
        mapArt.className = 'lb-journey-map-art';
        mapArt.setAttribute('aria-hidden', 'true');

        const route = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        route.classList.add('lb-journey-route');
        route.setAttribute('viewBox', '0 0 1000 380');
        route.setAttribute('preserveAspectRatio', 'none');
        route.setAttribute('aria-hidden', 'true');
        route.innerHTML = `
          <defs>
            <filter id="journeyRouteGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path class="lb-journey-route-shadow" pathLength="1" d="M100 58 C170 58 190 207 300 207 S390 58 500 58 S590 207 700 207 S800 58 900 58" />
          <path class="lb-journey-route-line" pathLength="1" d="M100 58 C170 58 190 207 300 207 S390 58 500 58 S590 207 700 207 S800 58 900 58" />
          <path class="lb-journey-route-arrow" d="m895 50 16 8-16 8 4-8-4-8Z" />`;
        lbFeaturesGrid.append(mapArt, route);
      }
      journeyObserver?.disconnect();
      journeyObserver = null;
      if (lbFeaturesGrid.classList.contains('is-journey')) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          lbFeaturesGrid.classList.add('is-visible');
        } else {
          journeyObserver = new IntersectionObserver(entries => {
            if (!entries.some(entry => entry.isIntersecting)) return;
            lbFeaturesGrid.classList.add('is-visible');
            journeyObserver?.disconnect();
            journeyObserver = null;
          }, { threshold: 0.22 });
          journeyObserver.observe(lbFeaturesGrid);
        }
      }
    }

    // Every project opens as a tidy workspace, with the Explorer and overview ready.
    document.querySelectorAll('.lb-tab-btn').forEach(tab => { tab.hidden = false; });
    document.querySelectorAll('[data-close-tab]').forEach(button => { button.hidden = false; });
    activateLightboxTab('overview');
    if (editorWorkspace && editorExplorer) {
      setEditorSidebarOpen(true);
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

    // Preserve keyboard position and keep background controls out of the modal focus order.
    if (!dossierModal.classList.contains('active')) {
      dossierReturnFocus = document.activeElement;
      dossierBodyOverflow = document.body.style.overflow;
      dossierBackgroundState = [document.getElementById('main-wrapper'), document.getElementById('navbar')]
        .filter(Boolean).map(element => ({ element, inert: element.inert }));
      document.getElementById('main-wrapper')?.classList.add('modal-background');
      dossierBackgroundState.forEach(({ element }) => { element.inert = true; });
    }
    // Show modal
    dossierModal.classList.remove('overview-opening');
    dossierModal.classList.add('active');
    dossierModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    void dossierModal.offsetWidth;
    dossierModal.classList.add('overview-opening');
    (dossierCloseBtn || dossierModal).focus({ preventScroll: true });
    if (catExtensionEnabled) startCatCompanion();
  }

  function closeDossier() {
    if (!dossierModal?.classList.contains('active')) return;
    dossierModal.classList.remove('active');
    dossierModal.classList.remove('overview-opening');
    dossierModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = dossierBodyOverflow;
    dossierBackgroundState.forEach(({ element, inert }) => { element.inert = inert; });
    dossierBackgroundState = [];
    document.getElementById('main-wrapper')?.classList.remove('modal-background');
    if (dossierReturnFocus?.isConnected) dossierReturnFocus.focus({ preventScroll: true });
    stopCatCompanion();
    releaseMusicAudio();
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
    document.querySelector('.lightbox-content-area')?.classList.toggle('is-tech-stack-open', target === 'specs');

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
    document.querySelector('.lightbox-content-area')?.classList.remove('is-tech-stack-open');
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
  function setEditorSidebarOpen(isOpen) {
    if (!editorWorkspace || !editorExplorer) return;
    // Keep the panel rendered so CSS can animate both opening and closing.
    editorExplorer.hidden = false;
    editorExplorer.inert = !isOpen;
    editorExplorer.setAttribute('aria-hidden', String(!isOpen));
    editorWorkspace.classList.toggle('is-sidebar-collapsed', !isOpen);
    editorWorkspace.classList.toggle('is-sidebar-open', isOpen);
  }

  document.querySelectorAll('[data-editor-panel]').forEach(button => {
    button.addEventListener('click', () => {
      const panel = button.getAttribute('data-editor-panel');
      const wasActive = button.classList.contains('active');
      const sidebarIsVisible = editorWorkspace?.classList.contains('is-sidebar-open');
      const shouldClose = wasActive && sidebarIsVisible;

      document.querySelectorAll('[data-editor-panel]').forEach(item => {
        item.classList.toggle('active', !shouldClose && item === button);
        item.setAttribute('aria-pressed', String(!shouldClose && item === button));
      });
      if (!editorWorkspace || !editorExplorer) return;
      setEditorSidebarOpen(!shouldClose);
      if (!shouldClose) {
        document.querySelectorAll('[data-editor-view]').forEach(view => {
          view.hidden = view.getAttribute('data-editor-view') !== panel;
        });
        if (panel === 'search') document.getElementById('editorSearchInput')?.focus();
      }
    });
  });

  document.querySelectorAll('[data-editor-hide]').forEach(button => {
    button.addEventListener('click', () => {
      if (!editorWorkspace || !editorExplorer) return;
      const panel = button.closest('[data-editor-view]')?.getAttribute('data-editor-view') || 'explorer';
      setEditorSidebarOpen(false);
      document.querySelectorAll('[data-editor-panel]').forEach(item => {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
      });
      document.querySelector(`[data-editor-panel="${panel}"]`)?.focus();
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

  const musicExtensionToggle = document.getElementById('musicExtensionToggle');
  const musicPlayer = document.getElementById('editorMusicPlayer');
  const musicAudio = document.getElementById('editorMusicAudio');
  const musicPrevious = document.getElementById('musicPrevious');
  const musicPlayPause = document.getElementById('musicPlayPause');
  const musicNext = document.getElementById('musicNext');
  const musicTrackTitle = document.getElementById('musicTrackTitle');
  const musicTrackCopy = musicPlayer?.querySelector('.music-track-copy');
  const musicProgress = document.getElementById('musicProgress');
  const musicTime = document.getElementById('musicTime');
  const musicMute = document.getElementById('musicMute');
  const musicVolume = document.getElementById('musicVolume');

  function formatMusicTime(seconds) {
    if (!Number.isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  }

  function updateMusicPlayState(isPlaying) {
    if (!musicPlayPause) return;
    const track = musicTracks[currentMusicTrackIndex];
    musicPlayPause.textContent = isPlaying ? 'Ⅱ' : '▶';
    musicPlayPause.setAttribute('aria-pressed', String(isPlaying));
    musicPlayPause.setAttribute('aria-label', `${isPlaying ? 'Pause' : 'Play'} ${track.title}`);
    musicPlayPause.title = isPlaying ? 'Pause' : 'Play';
  }

  function updateMusicTrackDisplay() {
    const track = musicTracks[currentMusicTrackIndex];
    if (musicTrackTitle) musicTrackTitle.textContent = track.title;
    if (musicTrackCopy) musicTrackCopy.title = `${track.title} — HoliznaCC0`;
    if (musicProgress) {
      musicProgress.max = '100';
      musicProgress.value = '0';
    }
    if (musicTime) musicTime.textContent = '0:00';
    updateMusicPlayState(false);
  }

  async function loadAndPlayMusic() {
    if (!musicAudio) return;
    const track = musicTracks[currentMusicTrackIndex];
    if (musicAudio.dataset.trackIndex !== String(currentMusicTrackIndex)) {
      musicAudio.src = track.src;
      musicAudio.dataset.trackIndex = String(currentMusicTrackIndex);
      musicAudio.load();
    }
    try {
      await musicAudio.play();
    } catch (error) {
      updateMusicPlayState(false);
    }
  }

  function pauseMusicPlayback() {
    musicAudio?.pause();
    updateMusicPlayState(false);
  }

  function releaseMusicAudio() {
    pauseMusicPlayback();
    if (!musicAudio) return;
    musicAudio.removeAttribute('src');
    musicAudio.removeAttribute('data-track-index');
    musicAudio.load();
  }

  function selectMusicTrack(offset, forcePlay = false) {
    if (!musicAudio) return;
    const wasPlaying = forcePlay || (!musicAudio.paused && Boolean(musicAudio.getAttribute('src')));
    releaseMusicAudio();
    currentMusicTrackIndex = (currentMusicTrackIndex + offset + musicTracks.length) % musicTracks.length;
    updateMusicTrackDisplay();
    if (wasPlaying) loadAndPlayMusic();
  }

  musicExtensionToggle?.addEventListener('click', () => {
    musicExtensionEnabled = !musicExtensionEnabled;
    musicExtensionToggle.setAttribute('aria-pressed', String(musicExtensionEnabled));
    musicExtensionToggle.textContent = musicExtensionEnabled ? 'Enabled' : 'Enable';
    if (musicPlayer) musicPlayer.hidden = !musicExtensionEnabled;
    dossierModalContainer?.classList.toggle('music-extension-enabled', musicExtensionEnabled);
    if (musicExtensionEnabled) {
      updateMusicTrackDisplay();
      return;
    }
    releaseMusicAudio();
  });

  musicPlayPause?.addEventListener('click', () => {
    if (!musicAudio) return;
    if (musicAudio.paused) loadAndPlayMusic();
    else pauseMusicPlayback();
  });
  musicPrevious?.addEventListener('click', () => selectMusicTrack(-1));
  musicNext?.addEventListener('click', () => selectMusicTrack(1));
  musicAudio?.addEventListener('play', () => updateMusicPlayState(true));
  musicAudio?.addEventListener('pause', () => updateMusicPlayState(false));
  musicAudio?.addEventListener('ended', () => selectMusicTrack(1, true));
  musicAudio?.addEventListener('loadedmetadata', () => {
    if (musicProgress) musicProgress.max = String(musicAudio.duration || 100);
  });
  musicAudio?.addEventListener('timeupdate', () => {
    if (musicProgress && !musicProgress.matches(':active')) musicProgress.value = String(musicAudio.currentTime || 0);
    if (musicTime) musicTime.textContent = formatMusicTime(musicAudio.currentTime);
  });
  musicProgress?.addEventListener('input', () => {
    if (musicAudio && Number.isFinite(musicAudio.duration)) musicAudio.currentTime = Number(musicProgress.value);
  });
  musicVolume?.addEventListener('input', () => {
    if (!musicAudio) return;
    musicAudio.volume = Number(musicVolume.value);
    musicAudio.muted = false;
    if (musicMute) {
      musicMute.textContent = '◖';
      musicMute.setAttribute('aria-pressed', 'false');
      musicMute.setAttribute('aria-label', 'Mute music');
    }
  });
  musicMute?.addEventListener('click', () => {
    if (!musicAudio) return;
    musicAudio.muted = !musicAudio.muted;
    musicMute.textContent = musicAudio.muted ? '×' : '◖';
    musicMute.setAttribute('aria-pressed', String(musicAudio.muted));
    musicMute.setAttribute('aria-label', musicAudio.muted ? 'Unmute music' : 'Mute music');
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && musicAudio && !musicAudio.paused) pauseMusicPlayback();
  });
  if (musicAudio && musicVolume) musicAudio.volume = Number(musicVolume.value);
  updateMusicTrackDisplay();

  const catExtensionToggle = document.getElementById('catExtensionToggle');
  const editorCatTrack = document.getElementById('editorCatTrack');
  const editorCat = document.getElementById('editorCat');
  const editorCatSpeech = document.getElementById('editorCatSpeech');
  const editorReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const catPoseMessages = { walk: '', sit: '…', sleep: 'z z', eat: 'nom' };

  function catRouteIsCurrent(token) {
    return catExtensionEnabled && !document.hidden && !editorReducedMotion.matches && token === catCycleToken && dossierModal?.classList.contains('active');
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
    if (!catExtensionEnabled || !editorCatTrack || document.hidden || !dossierModal?.classList.contains('active')) return;
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
    if (editorReducedMotion.matches) {
      setCatPose('sleep');
      return;
    }
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

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopCatCompanion();
    else if (catExtensionEnabled) startCatCompanion();
  });
  editorReducedMotion.addEventListener?.('change', () => {
    stopCatCompanion();
    if (catExtensionEnabled) startCatCompanion();
  });

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
    if (e.key === 'Tab' && dossierModal?.classList.contains('active')) {
      const focusable = [...dossierModal.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')]
        .filter(element => !element.disabled && element.tabIndex >= 0 && !element.closest('[inert]') && element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden');
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (!first) { e.preventDefault(); dossierModal.focus(); }
      else if (e.shiftKey && (document.activeElement === first || !dossierModal.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (document.activeElement === last || !dossierModal.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
    }
    if (e.key === 'Escape' && dossierModal && dossierModal.classList.contains('active')) {
      closeDossier();
    }
  });

};
