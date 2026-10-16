// Apply the saved theme before styles and the first body paint, including reloads.
(() => {
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch { /* System preference works without storage. */ }
  const dark = saved === 'dark' || (saved !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const page = document.documentElement;
  if (dark) page.setAttribute('data-theme', 'dark');
  else page.removeAttribute('data-theme');
  page.style.colorScheme = dark ? 'dark' : 'light';
  page.style.backgroundColor = dark ? '#121212' : '#fafafa';
})();
