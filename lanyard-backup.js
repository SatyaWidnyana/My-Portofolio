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
        // Saat ditarik, lanyard mengikuti kursor seperti karet (rubber-band)
        // Dikalikan minus (-) agar ayunannya tidak terbalik
        const targetAngle = targetX * -0.12; 
        
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
      
      // Target tarikan Y
      targetY = clientY - startY;
      if (targetY > 40) targetY = 40; // Batas bawah
      
      // Target tarikan horizontal
      targetX = clientX - startX;
      // Batasi geseran kanan kiri agar tidak terlalu jauh
      if (targetX > 150) targetX = 150;
      if (targetX < -150) targetX = -150;
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
