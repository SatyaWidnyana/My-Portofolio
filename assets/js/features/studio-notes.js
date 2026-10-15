window.SatyaPortfolio.features['studio-notes'] = function () {
  const root = document.getElementById('about');
  if (!root || root.dataset.notesReady === 'true') return;
  root.dataset.notesReady = 'true';
  const byId = id => document.getElementById(id);
  // Avoid running the mobile navbar's filter pulse over the moving cabinet.
  window.SatyaPortfolio.observeMotion?.(root, visible => {
    byId('navbar')?.classList.toggle('cabinet-in-view', visible);
  });
  const chapters = [...root.querySelectorAll('[data-note-chapter]')];
  const panels = [...root.querySelectorAll('[data-note-panel]')];
  const skillButtons = [...root.querySelectorAll('[data-note-skill]')];
  const stepButtons = [...root.querySelectorAll('[data-note-step]')];
  const deviceButtons = [...root.querySelectorAll('[data-note-device]')];
  const frames = [...root.querySelectorAll('[data-note-frame]')];
  const drawerButtons = [...root.querySelectorAll('[data-note-drawer]')];
  const drawers = [...root.querySelectorAll('[data-cabinet-drawer]')];
  const cabinetMotion = window.SatyaPortfolio.createCabinetMotion?.(root);
  let drawersInitialized = false;
  const heightMotion = typeof window.ResizeObserver === 'function';
  const measuredHeights = new WeakMap();
  function sizeDrawer(panel) {
    const tray = panel.querySelector('.cabinet-tray');
    const height = Math.ceil(tray.offsetHeight + parseFloat(window.getComputedStyle(tray).marginTop || 0));
    if (height && measuredHeights.get(panel) !== height) {
      measuredHeights.set(panel, height);
      panel.style.setProperty('--cabinet-content-height', `${height}px`);
    }
    if (height && panel.style.height !== `${height}px`) panel.style.height = `${height}px`;
  }
  if (heightMotion) {
    root.classList.add('cabinet-height-motion');
    const panelsByTray = new WeakMap();
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const panel = panelsByTray.get(entry.target);
        if (panel.getAttribute('aria-hidden') === 'false') sizeDrawer(panel);
      });
    });
    drawerButtons.forEach(button => {
      const panel = byId(button.getAttribute('aria-controls'));
      const tray = panel.querySelector('.cabinet-tray');
      panelsByTray.set(tray, panel);
      observer.observe(tray);
    });
  }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const smallScreen = window.matchMedia('(max-width: 768px)');
  const index = root.querySelector('.notes-index');
  let chapter = 'skills';
  let skill = 'design';
  let chapterAnimation = null;
  let copyAnimation = null;
  let demoAnimations = [];
  let drawer = null;
  const skills = {
    design: {
      tools: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript'],
      title: 'Make the page easy to read.',
      description: 'Start with the content, then give it a clear layout. Typography, spacing, and navigation guide visitors through the page.',
      project: 'WGA Dekorasi', href: 'https://wga-dekorasi.vercel.app/', external: true,
      study: 'Composition', caption: 'A hierarchy shaped by type, space, and contrast.'
    },
    build: {
      tools: ['React', 'Next.js', 'Prisma', 'PostgreSQL'],
      title: 'Give the design a working structure.',
      description: 'Build responsive layouts and connect the content, forms, and navigation. Keep the structure clear for people and search engines.',
      project: 'Ketut Gajah Bali', href: 'https://www.ketutgajahbaliadventure.com/', external: true,
      study: 'Responsive layout', caption: 'Switch the width to see the same content adapt.'
    },
    motion: {
      tools: ['Framer Motion', 'CSS & JavaScript Motion'],
      title: 'Let movement explain the interface.',
      description: 'WGA Ocean uses Framer Motion. This portfolio demonstrates motion with native JavaScript and CSS.',
      project: 'Explore the archive', href: '#projects', external: false,
      study: 'Transition study', caption: 'A short, staggered entrance with a clear finish.'
    }
  };
  const stages = [
    { title: 'Understand the brief.', description: 'Understand the goals, audience, and project requirements before shaping the page.', output: 'A clear direction', caption: 'Begin with the people who will use the website.' },
    { title: 'Explore references.', description: 'Collect visual references from Pinterest, TikTok, and existing websites. Explore UI ideas with Google Stitch and shape a direction for the project.', output: 'References and a visual direction', caption: 'Find ideas for the layout, typography, and mood.' },
    { title: 'Build with AI assistance.', description: 'Use Codex and Antigravity to turn the idea into a website. Describe the desired behavior and iterate on the implementation.', output: 'A working draft', caption: 'Connect creative direction with AI-assisted implementation.' },
    { title: 'Review and refine.', description: 'Review the website in the browser, check layouts and interactions, and give specific feedback. Keep improving the result and learning from the changes.', output: 'A reviewed and refined website', caption: 'Refine the details through observation and feedback.' },
    { title: 'Publish the website.', description: 'Deploy the website to hosting, connect the domain when needed, and check the live pages, links, and forms.', output: 'A live, accessible website', caption: 'Take the reviewed website online and check the experience visitors will use.' }
  ];
  function animateCopy(node) {
    if (reducedMotion.matches || !node.animate) return null;
    return node.animate([
      { opacity: .3, transform: 'translateY(10px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)' });
  }
  function stopDemo() {
    demoAnimations.forEach(animation => animation.cancel());
    demoAnimations = [];
  }
  function selectChapter(value, animate = true) {
    if (!chapters.some(button => button.dataset.noteChapter === value)) return;
    const changed = value !== chapter;
    chapter = value;
    stopDemo();
    chapterAnimation?.cancel();
    chapters.forEach(button => {
      const active = button.dataset.noteChapter === value;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => panel.hidden = panel.dataset.notePanel !== value);
    const position = chapters.findIndex(button => button.dataset.noteChapter === value);
    byId('notesPageNumber').textContent = `${String(position + 1).padStart(2, '0')} / ${value.toUpperCase()}`;
    if (changed && animate) chapterAnimation = animateCopy(panels[position]);
  }
  function selectSkill(value, animate = true) {
    const selected = skills[value];
    if (!selected) return;
    const changed = value !== skill;
    skill = value;
    stopDemo();
    copyAnimation?.cancel();
    skillButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.noteSkill === value)));
    const tools = selected.tools.map(name => {
      const item = document.createElement('li');
      item.textContent = name;
      return item;
    });
    byId('notesTools').replaceChildren(...tools);
    byId('notesSkillTitle').textContent = selected.title;
    byId('notesSkillDescription').textContent = selected.description;
    byId('notesSkillProjectName').textContent = selected.project;
    const link = byId('notesSkillProject');
    link.href = selected.href;
    link.target = selected.external ? '_blank' : '_self';
    link.rel = selected.external ? 'noopener noreferrer' : '';
    byId('notesStudyLabel').textContent = selected.study;
    byId('notesStudyCaption').textContent = selected.caption;
    byId('notesSkillStudy').dataset.skill = value;
    byId('notesDeviceControls').hidden = value !== 'build';
    byId('notesMotionReplay').hidden = value !== 'motion';
    if (value !== 'build') selectDevice('desktop');
    if (changed && animate) copyAnimation = animateCopy(byId('notesSkillCopy'));
  }
  function selectDevice(value) {
    if (!['desktop', 'mobile'].includes(value)) return;
    byId('notesSkillStudy').dataset.device = value;
    deviceButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.noteDevice === value)));
  }
  function selectStep(value) {
    const selected = stages[value];
    if (!selected) return;
    stepButtons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.noteStep) === value)));
    byId('notesProcessCounter').textContent = `${String(value + 1).padStart(2, '0')} / ${String(stepButtons.length).padStart(2, '0')}`;
    byId('notesProcessTitle').textContent = selected.title;
    byId('notesProcessDescription').textContent = selected.description;
    byId('notesProcessOutput').textContent = selected.output;
    byId('notesProcessCaption').textContent = selected.caption;
    byId('notesProcessScene').dataset.step = String(value);
    frames.forEach(frame => {
      const active = Number(frame.dataset.noteFrame) === value;
      frame.classList.toggle('is-current', active);
      frame.setAttribute('aria-hidden', String(!active));
      frame.inert = !active;
    });
  }
  function bindChoiceGroup(buttons, choose) {
    buttons.forEach((button, position) => {
      button.addEventListener('click', () => choose(button));
      button.addEventListener('keydown', event => {
        let next;
        if (['ArrowRight', 'ArrowDown'].includes(event.key)) next = (position + 1) % buttons.length;
        else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) next = (position - 1 + buttons.length) % buttons.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = buttons.length - 1;
        else return;
        event.preventDefault();
        choose(buttons[next]);
        buttons[next].focus();
      });
    });
  }
  bindChoiceGroup(chapters, button => selectChapter(button.dataset.noteChapter));
  bindChoiceGroup(skillButtons, button => selectSkill(button.dataset.noteSkill));
  bindChoiceGroup(stepButtons, button => selectStep(Number(button.dataset.noteStep)));
  bindChoiceGroup(deviceButtons, button => selectDevice(button.dataset.noteDevice));
  function replayMotion() {
    stopDemo();
    if (reducedMotion.matches) return;
    const study = byId('notesMiniPage') || root.querySelector('.cabinet-build-field');
    if (!study) return;
    const parts = [...study.querySelectorAll('.notes-mini-nav, .notes-mini-copy, .notes-mini-art, .notes-mini-bottom')];
    parts.forEach((part, position) => {
      if (!part.animate) return;
      demoAnimations.push(part.animate([
        { opacity: 0, transform: 'translateY(14px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 600, delay: position * 80, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }));
    });
  }
  byId('notesMotionReplay')?.addEventListener('click', replayMotion);
  // Keep closed contents out of layout/paint after the closing motion finishes.
  drawerButtons.forEach(button => {
    const panel = byId(button.getAttribute('aria-controls'));
    const finishClosing = event => {
      if (event.target !== panel || !['grid-template-rows', 'height'].includes(event.propertyName)) return;
      if (panel.getAttribute('aria-hidden') === 'true') panel.dataset.collapsed = 'true';
    };
    panel.addEventListener('transitionend', finishClosing);
    panel.addEventListener('transitioncancel', finishClosing);
  });
  function selectDrawer(value) {
    drawer = value;
    stopDemo();
    const update = () => {
    drawers.forEach(item => item.dataset.open = String(item.dataset.cabinetDrawer === value));
    drawerButtons.forEach(button => {
      const open = button.dataset.noteDrawer === value;
      button.setAttribute('aria-expanded', String(open));
      const panel = byId(button.getAttribute('aria-controls'));
      panel.setAttribute('aria-hidden', String(!open));
      panel.inert = !open;
      if (open) panel.dataset.collapsed = 'false';
      else if (panel.dataset.collapsed === undefined || reducedMotion.matches) panel.dataset.collapsed = 'true';
      if (heightMotion) {
        if (open) sizeDrawer(panel);
        else panel.style.height = '0px';
      }
    });
    };
    if (cabinetMotion && drawersInitialized && !reducedMotion.matches) cabinetMotion.change(update);
    else {
      cabinetMotion?.cancel();
      update();
    }
    drawersInitialized = true;
  }
  drawerButtons.forEach((button, position) => {
    button.addEventListener('click', () => selectDrawer(drawer === button.dataset.noteDrawer ? null : button.dataset.noteDrawer));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowDown') next = (position + 1) % drawerButtons.length;
      else if (event.key === 'ArrowUp') next = (position - 1 + drawerButtons.length) % drawerButtons.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = drawerButtons.length - 1;
      else return;
      event.preventDefault();
      drawerButtons[next].focus();
    });
  });
  if (index) {
    const updateOrientation = () => index.setAttribute('aria-orientation', smallScreen.matches ? 'horizontal' : 'vertical');
    updateOrientation();
    smallScreen.addEventListener?.('change', updateOrientation);
  }
  reducedMotion.addEventListener?.('change', () => {
    cabinetMotion?.cancel();
    chapterAnimation?.cancel();
    copyAnimation?.cancel();
    stopDemo();
    if (reducedMotion.matches) drawerButtons.forEach(button => {
      const panel = byId(button.getAttribute('aria-controls'));
      if (panel.inert) panel.dataset.collapsed = 'true';
    });
  });
  if (chapters.length) selectChapter('skills', false);
  if (skillButtons.length) selectSkill('design', false);
  if (stepButtons.length) selectStep(0);
  if (drawerButtons.length) selectDrawer(null);
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    root.classList.add('notes-visible');
  } else {
    root.classList.add('notes-enhanced');
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      root.classList.add('notes-visible');
      observer.disconnect();
    }, { threshold: .12 });
    observer.observe(root);
  }
};
