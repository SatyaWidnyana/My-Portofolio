window.SatyaPortfolio.features['studio-notes'] = function () {
  const root = document.getElementById('about');
  if (!root || root.dataset.notesReady === 'true') return;
  root.dataset.notesReady = 'true';
  const byId = id => document.getElementById(id);
  const chapters = [...root.querySelectorAll('[data-note-chapter]')];
  const panels = [...root.querySelectorAll('[data-note-panel]')];
  const skillButtons = [...root.querySelectorAll('[data-note-skill]')];
  const stepButtons = [...root.querySelectorAll('[data-note-step]')];
  const deviceButtons = [...root.querySelectorAll('[data-note-device]')];
  const frames = [...root.querySelectorAll('[data-note-frame]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const smallScreen = window.matchMedia('(max-width: 768px)');
  const index = root.querySelector('.notes-index');
  let chapter = 'skills';
  let skill = 'design';
  let chapterAnimation = null;
  let copyAnimation = null;
  let demoAnimations = [];
  const skills = {
    design: {
      tools: ['Web Design', 'UI/UX Design', 'Figma', 'Framer'],
      title: 'Make the page easy to read.',
      description: 'Start with the content, then give it a clear layout. Typography, spacing, and navigation guide visitors through the page.',
      project: 'WGA Dekorasi', href: 'https://wga-dekorasi.vercel.app/', external: true,
      study: 'Composition', caption: 'A hierarchy shaped by type, space, and contrast.'
    },
    build: {
      tools: ['HTML / CSS', 'JavaScript', 'SEO Basics'],
      title: 'Give the design a working structure.',
      description: 'Build responsive layouts and connect the content, forms, and navigation. Keep the structure clear for people and search engines.',
      project: 'Ketut Gajah Bali', href: 'https://www.ketutgajahbaliadventure.com/', external: true,
      study: 'Responsive layout', caption: 'Switch the width to see the same content adapt.'
    },
    motion: {
      tools: ['GSAP Animation'],
      title: 'Let movement explain the interface.',
      description: 'Use transitions to connect one state to the next. This portfolio demonstrates motion with native JavaScript and CSS.',
      project: 'Explore the archive', href: '#projects', external: false,
      study: 'Transition study', caption: 'A short, staggered entrance with a clear finish.'
    }
  };
  const stages = [
    { title: 'Understand the brief.', description: 'Understand the goals, audience, and project requirements before shaping the page.', output: 'A clear direction', caption: 'Begin with the people who will use the website.' },
    { title: 'Give the content a place.', description: 'Plan the flow, sketch the layout, and explore a concept before committing to the visual details.', output: 'A wireframe and content flow', caption: 'Organize the page before refining its appearance.' },
    { title: 'Shape the experience.', description: 'Refine the visual hierarchy, typography, color, and interactive states around the user experience.', output: 'A visual direction and interface', caption: 'Turn the structure into a consistent visual language.' },
    { title: 'Bring it into the browser.', description: 'Build a responsive website, connect its interactions, and check the experience across different screen sizes.', output: 'A working, responsive website', caption: 'Connect the implementation with the finished interface.' }
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
    byId('notesProcessCounter').textContent = `${String(value + 1).padStart(2, '0')} / 04`;
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
  byId('notesMotionReplay').addEventListener('click', () => {
    stopDemo();
    if (reducedMotion.matches) return;
    const parts = [...byId('notesMiniPage').querySelectorAll('.notes-mini-nav, .notes-mini-copy, .notes-mini-art, .notes-mini-bottom')];
    parts.forEach((part, position) => {
      if (!part.animate) return;
      demoAnimations.push(part.animate([
        { opacity: 0, transform: 'translateY(14px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 600, delay: position * 80, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }));
    });
  });
  const updateOrientation = () => index.setAttribute('aria-orientation', smallScreen.matches ? 'horizontal' : 'vertical');
  updateOrientation();
  smallScreen.addEventListener?.('change', updateOrientation);
  reducedMotion.addEventListener?.('change', () => {
    chapterAnimation?.cancel();
    copyAnimation?.cancel();
    stopDemo();
  });
  selectChapter('skills', false);
  selectSkill('design', false);
  selectStep(0);
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
