window.SatyaPortfolio.features['terminal-layout'] = function () {
  // ==========================================
  // FIX TERMINAL WIDTH MURNI (ANTI MEMANJANG)
  // ==========================================
  const fixHeroSubtitle = document.querySelector('.hero-subtitle');
  const fixTermV2 = document.getElementById('termV2');
  if (fixHeroSubtitle && fixTermV2) {
    const lockTerminalWidth = () => {
      // Pada layar mobile, biarkan CSS yang mengatur (width: 100%, max-width: 550px)
      if (window.innerWidth <= 992) {
        fixTermV2.style.width = '';
        fixTermV2.style.maxWidth = '';
        return;
      }

      // Ambil ukuran spesifik HANYA dari teks WIDNYANA
      const widnyanaDummy = document.getElementById('widnyana-dummy');
      if (widnyanaDummy) {
        // Ambil lebar pasti dari teks WIDNYANA tanpa mereset terminal (mencegah bug grid cyclic dependency)
        const exactWidth = widnyanaDummy.getBoundingClientRect().width;
        if (exactWidth > 50) { // Validasi minimal 50px untuk mencegah nilai error/0
          // Kunci permanen ukurannya pakai pixel
          fixTermV2.style.width = exactWidth + 'px';
          fixTermV2.style.maxWidth = exactWidth + 'px';
        }
      }
    };

    // Setel awal (mungkin menggunakan font fallback yang lebih lebar)
    lockTerminalWidth();

    // Setel ulang SETELAH semua font (termasuk Anton) selesai dimuat!
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        lockTerminalWidth();
      });
    }

    // Fallback tambahan saat seluruh halaman benar-benar selesai dimuat
    window.addEventListener('load', lockTerminalWidth);

    // Sistem Morph & Auto-Reload saat pindah view (Desktop <-> Mobile)
    let currentView = window.innerWidth <= 992 ? 'mobile' : 'desktop';
    let resizeTimer;
    let reloadPending = false;

    window.addEventListener('resize', () => {
      if (reloadPending) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newView = window.innerWidth <= 992 ? 'mobile' : 'desktop';

        // Jika user melakukan drag dari desktop ke mobile atau sebaliknya
        if (currentView !== newView && !reloadPending) {
          reloadPending = true;
          currentView = newView;

          // Memulai transisi blur morphing layar penuh
          document.body.classList.add('view-changing');

          // Penuh 100% Reload bersih untuk menjamin layout tidak nyangkut!
          setTimeout(() => {
            window.location.reload();
          }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 450);
          return;
        }

        // Jika resize biasa (masih dalam view yang sama), jalankan kalkulasi seperti biasa
        lockTerminalWidth();
      }, 50);
    });
  }
};
