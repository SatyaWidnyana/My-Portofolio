// Keep initialization synchronous and ordered, including intro/lanyard coordination.
(() => {
  const { features } = window.SatyaPortfolio;
  features['intro']();
  features['navigation']();
  features['lanyard']();
  features['terminal']();
  features['greetings']();
  features['terminal-layout']();
  features['portfolio']();
  features['lightbox']();
  features['studio-notes']();
  features['contact-letter']();
})();
