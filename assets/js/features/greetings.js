window.SatyaPortfolio.features['greetings'] = function () {
  // Animasi Mengetik Multi-Bahasa
  const greetings = [
    "HELLO, MY NAME IS...", 
    "HOLA, MI NOMBRE ES...", 
    "BONJOUR, MON NOM EST...", 
    "HALO, NAMA SAYA...", 
    "CIAO, IL MIO NOME È...", 
    "HALLO, MEIN NAME IST...",
    "こんにちは、わたしのなまえは..."
  ];
  let currentGreetingIndex = 0;
  
  async function typeGreeting() {
    const greetingEl = document.querySelector('.script-font');
    if (!greetingEl) return;
    
    // Tunggu sebentar sebelum mulai ngetik pertama kali agar bareng dengan scramble
    await new Promise(r => setTimeout(r, 1000));
    
    while (true) {
      let currentWord = greetings[currentGreetingIndex];
      
      // Tulis maju (efek mengetik)
      greetingEl.innerHTML = '<span class="greeting-cursor">|</span>';
      for (let i = 0; i <= currentWord.length; i++) {
        greetingEl.innerHTML = currentWord.substring(0, i) + '<span class="greeting-cursor">|</span>';
        await new Promise(r => setTimeout(r, 70)); 
      }
      
      // Tunggu 3 detik sebelum ganti bahasa
      await new Promise(r => setTimeout(r, 3000));
      
      // Hapus teks mundur (efek backspace)
      for (let i = currentWord.length; i >= 0; i--) {
        greetingEl.innerHTML = currentWord.substring(0, i) + '<span class="greeting-cursor">|</span>';
        await new Promise(r => setTimeout(r, 40)); 
      }
      
      // Ganti indeks bahasa
      currentGreetingIndex = (currentGreetingIndex + 1) % greetings.length;
    }
  }
  
  // Jalankan animasi ketik
  typeGreeting();
  
};
