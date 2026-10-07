window.SatyaPortfolio.features['terminal'] = function () {
  // Terminal V3 Interaction
  const termRunBtn = document.getElementById('termRunBtn');
  const termDelBtn = document.getElementById('termDelBtn');
  const termV2 = document.getElementById('termV2');
  const termLogs = document.getElementById('termLogs');
  const termFinalText = document.getElementById('termFinalText');
  const termSourceHtml = document.getElementById('termSourceHtml');

  if (termRunBtn && termV2) {
    let isRunning = false;

    termRunBtn.addEventListener('click', () => {
      if (isRunning) return;
      isRunning = true;
      
      termRunBtn.style.display = 'none';
      if(termDelBtn) termDelBtn.style.display = 'none';
      
      document.getElementById('mainCursor').style.display = 'none';
      
      termLogs.innerHTML = ''; // reset logs
      termFinalText.innerHTML = '';
      
      renderDefaultBio();
      
      function renderDefaultBio() {
        const logs = [
          "> Loading creative_engine.dll... [OK]",
          "> Fetching bio data..."
        ];
        
        let logIndex = 0;
        
        const logInterval = setInterval(() => {
          if (logIndex < logs.length) {
            const div = document.createElement('div');
            div.className = 'term-log-line';
            div.textContent = logs[logIndex];
            termLogs.appendChild(div);
            logIndex++;
          } else {
            clearInterval(logInterval);
            setTimeout(startTypingBio, 300);
          }
        }, 500); 
        
        function startTypingBio() {
          const htmlString = "As a <strong>Web Designer & Digital Creator</strong>, I design digital experiences that <em>inspire</em> and <em>connect</em>. I focus on crafting elegant, functional, and user-centered interfaces.";
          let i = 0;
          let currentHTML = "";
          let isTag = false;
          
          termFinalText.innerHTML = '<p class="term-desc" style="margin-top: 15px;"><span class="term-cursor"></span></p>';
          const descElement = termFinalText.querySelector('.term-desc');
          
          const typeInterval = setInterval(() => {
            if (i < htmlString.length) {
              currentHTML += htmlString.charAt(i);
              
              if (htmlString.charAt(i) === '<') isTag = true;
              if (htmlString.charAt(i) === '>') isTag = false;
              
              while (isTag && i < htmlString.length - 1) {
                i++;
                currentHTML += htmlString.charAt(i);
                if (htmlString.charAt(i) === '>') isTag = false;
              }
              
              descElement.innerHTML = currentHTML + '<span class="term-cursor"></span>';
              
              // Scroll to bottom while typing
              const termBody = document.querySelector('.term-body');
              termBody.scrollTop = termBody.scrollHeight;
              
              i++;
            } else {
              clearInterval(typeInterval);
              setTimeout(() => {
                termFinalText.innerHTML = termSourceHtml.innerHTML;
                if(termDelBtn) termDelBtn.style.display = 'block';
              }, 600);
            }
          }, 25);
        }
      }
    });

    if(termDelBtn) {
      termDelBtn.addEventListener('click', () => {
        if (!isRunning) isRunning = true; // prevent multiple clicks
        termDelBtn.style.display = 'none'; // sembunyikan tombol delete saat ditekan
        
        const rawText = "As a Web Designer & Digital Creator, I design digital experiences that inspire and connect. I focus on crafting elegant, functional, and user-centered interfaces.";
        let i = rawText.length;
        
        termFinalText.innerHTML = '<p class="term-desc" style="margin-top: 15px;">' + rawText + '<span class="term-cursor"></span></p>';
        const descElement = termFinalText.querySelector('.term-desc');
        
        // Animasi hapus paragraf per huruf
        if (descElement) {
          const deleteInterval = setInterval(() => {
            if (i > 0) {
              i -= 1; // samakan kecepatan dengan saat mengetik
              if (i < 0) i = 0;
              descElement.innerHTML = rawText.substring(0, i) + '<span class="term-cursor"></span>';
            } else {
              clearInterval(deleteInterval);
              clearLogs();
            }
          }, 25);
        } else {
          clearLogs();
        }
        
        function clearLogs() {
          termFinalText.innerHTML = '';
          
          // Setelah paragraf terhapus, hapus log satu per satu
          let logLines = Array.from(termLogs.children);
          let logIndex = logLines.length - 1;
          
          const logDelInterval = setInterval(() => {
            if (logIndex >= 0) {
              logLines[logIndex].remove();
              logIndex--;
            } else {
              clearInterval(logDelInterval);
              termRunBtn.style.display = 'block'; // tampilkan kembali tombol enter
              document.getElementById('mainCursor').style.display = 'inline-block';
              isRunning = false;
            }
          }, 50); // Jeda hapus log dicepatkan
        }
        // End of clearLogs function
      });
    }
  }

};
