window.SatyaPortfolio.features['lanyard'] = function () {
  // Lanyard Interactive Swing & Drop Logic
  const lanyard = document.getElementById('lanyard');
  if (lanyard) {
    let isDragging = false;
    let startY = 0, startX = 0;
    let currentY = -800; // Start lebih rendah agar jatuhnya tidak agresif
    let angle = 0;
    let vy = 0, va = 0;
    let animationFrame = null;
    let targetX = 0, targetY = 0;
    
    // Set initial position out of view
    lanyard.style.transform = `translate(0px, -150vh) rotate(0deg)`;

    const springLoop = () => {
      if (isDragging) {
        // Menggunakan rumus pendulum murni (atan):
        // Kursor menjadi panduan sudut rotasi secara geometris, bukan sekadar nilai linear yang dibatasi.
        // Semakin jauh ditarik, sudutnya akan secara alami mengarah maksimal ke 90 derajat secara mulus.
        const targetAngle = -Math.atan(targetX / 500) * (180 / Math.PI); 
        
        va += (targetAngle - angle) * 0.15; // Tarikan rotasi menuju mouse
        vy += (targetY - currentY) * 0.15;  // Tarikan vertikal menuju mouse
        
        // Damping lebih berat agar tidak bergetar saat dipegang
        va *= 0.65;
        vy *= 0.65;
      } else {
        // Saat dilepas, fisika spring mengembalikannya ke posisi 0
        // Gravitasi sangat kecil agar turunnya perlahan, smooth, dan santai
        const fy = -currentY * 0.003; 
        const fa = -angle * 0.012;    
        
        vy += fy;
        va += fa;
        
        // Batas kecepatan maksimum jatuh (terminal velocity) agar tidak agresif
        if (vy > 14) vy = 14; 
        
        // Damping sedikit lebih licin agar mantulnya lebih floaty/elegan
        vy *= 0.93; 
        va *= 0.94;
      }
      
      currentY += vy;
      angle += va;
      
      // LOGIKA TALI (BUNGEE STRING PHYSICS):
      // Jika lanyard jatuh melewati batas 0, tali menegang secara eksponensial (kuadratik).
      // Ini membuat transisi di titik 0 sangat mulus (tidak kaku/menyentak) tapi tetap 
      // menahan lanyard agar tidak jatuh terlalu dalam.
      if (!isDragging && currentY > 0) {
        vy -= (currentY * currentY) * 0.002; 
      }
      
      // EFEK LETOY: Gunakan SkewX berdasarkan kecepatan sudut (va)
      // Saat berayun cepat, talinya akan terlihat melengkung (bend)
      let bend = -va * 2.5; 
      if (bend > 15) bend = 15;
      if (bend < -15) bend = -15;
      
      // EFEK MERENGGANG KHUSUS TALI (STRAP):
      // Karena gambar strap dan card sudah dipisah via HTML & CSS Clip-path,
      // kita bisa memberikan efek stretch (scaleY) HANYA pada strap,
      // dan menggeser (translateY) card ke bawah agar tetap menempel.
      let stretchY = 1;
      let cardOffset = 0;
      if (currentY > 0) {
        stretchY = 1 + (currentY * 0.005); 
        // Tinggi strap (clip-path atas) sekarang adalah 15%,
        // jadi pergeseran card adalah 15% dikali selisih skala.
        cardOffset = 15 * (stretchY - 1); 
      }
      
      const strap = document.getElementById('lanyard-strap');
      const body = document.getElementById('lanyard-body');
      if (strap && body) {
        strap.style.transform = `scaleY(${stretchY})`;
        body.style.transform = `translateY(${cardOffset}%)`;
      }
      
      // Terapkan transform posisi dan rotasi ke keseluruhan container
      lanyard.style.transform = `translate(0px, ${currentY}px) rotate(${angle}deg) skewX(${bend}deg)`;
      
      // Terus berulang sampai benar-benar diam (threshold mikroskopis agar sisa ayunan benar-benar tuntas alami)
      if (isDragging || Math.abs(currentY) > 0.1 || Math.abs(angle) > 0.02 || Math.abs(vy) > 0.01 || Math.abs(va) > 0.01) {
        animationFrame = requestAnimationFrame(springLoop);
      } else {
        currentY = 0; angle = 0;
        lanyard.style.transform = `translate(0px, 0px) rotate(0deg) skewX(0deg)`;
        animationFrame = null;
      }
    };

    const startDrag = (e) => {
      // Mencegah browser membuat "ghost image" bawaan saat men-drag gambar
      if (e.cancelable) e.preventDefault();
      
      if (isDragging) return;
      isDragging = true;
      
      const clientX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
      const clientY = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;
      
      startX = clientX;
      startY = clientY - currentY;
      targetX = 0;
      targetY = currentY;
      
      lanyard.style.cursor = 'grabbing';
      
      // Pastikan loop berjalan
      if (!animationFrame) {
        animationFrame = requestAnimationFrame(springLoop);
      }
    };

    const doDrag = (e) => {
      if (!isDragging) return;
      e.preventDefault(); // Prevent scroll while dragging lanyard
      
      const clientX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
      const clientY = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;
      
      const rawTargetY = clientY - startY;
      const rawTargetX = clientX - startX;
      
      // SISTEM PENGHALANG NATURAL PENDULUM
      // Y tetap dibatasi agar tidak melorot jauh ke bawah
      targetY = rawTargetY / (1 + Math.abs(rawTargetY) / 60); 
      // X dilepas tanpa batas karena efek natural (dinding maya) sudah ditangani oleh Math.atan di perhitungan targetAngle
      targetX = rawTargetX;
    };

    const stopDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      lanyard.style.cursor = 'grab';
    };

    lanyard.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', stopDrag);

    lanyard.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('touchmove', doDrag, { passive: false });
    window.addEventListener('touchend', stopDrag);
    
    // Expose methods to trigger the initial drop or snap
    window.triggerLanyardDrop = () => {
      currentY = -800;
      vy = 0; va = 0;
      // Jatuh lurus tanpa goyang (angle = 0)
      angle = 0; 
      springLoop();
    };
    
    window.snapLanyardToZero = () => {
      currentY = 0; angle = 0;
      vy = 0; va = 0;
      lanyard.style.transform = `translate(0px, 0px) rotate(0deg)`;
    };
  }

};
