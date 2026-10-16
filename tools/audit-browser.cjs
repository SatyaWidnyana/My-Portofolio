// Local, isolated headless Chrome check. Does not attach to the user's browser.
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const label = process.argv[2] || 'check';
if (!/^[a-z0-9-]+$/i.test(label)) throw new Error('Use a simple alphanumeric report label.');
const width = Number(process.argv[3] || 1920);
const theme = process.argv[4] === 'dark' ? 'dark' : 'light';
const folderMode = process.argv[5] === 'folder';
const diagnostic = process.argv[6] === 'diagnostic';
const height = width <= 768 ? 844 : 1080;
const output = path.join(root, 'tmp', `audit-${label}`);
const profilePath = path.resolve(`${output}-profile`);
const allowedTempRoot = path.resolve(root, 'tmp') + path.sep;
if (!profilePath.startsWith(allowedTempRoot)) throw new Error('Browser profile must stay inside the workspace tmp folder.');
fs.mkdirSync(path.dirname(output), { recursive: true });
const chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
if (!chrome) throw new Error('Chrome or Edge is required for this local check.');
const browser = spawn(chrome, ['--headless=new', '--remote-debugging-pipe', '--no-first-run', '--no-default-browser-check', '--disable-extensions', '--disable-background-networking', '--disable-component-update', `--user-data-dir=${profilePath}`], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe', 'pipe', 'pipe'] });
let nextId = 0, buffer = '', session, trace = [], traceDone;
const pending = new Map();
const errors = [];
const auditUrl = process.env.SATYA_AUDIT_URL || 'http://127.0.0.1:8000/';
if (!['127.0.0.1','localhost'].includes(new URL(auditUrl).hostname)) throw new Error('Browser audit must target a local preview');
browser.stderr.on('data', () => {});
browser.on('error', error => { console.error(error); process.exitCode = 1; });
browser.stdio[4].on('data', chunk => {
  buffer += chunk.toString();
  let split;
  while ((split = buffer.indexOf('\0')) >= 0) {
    const message = JSON.parse(buffer.slice(0, split)); buffer = buffer.slice(split + 1);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject, timer } = pending.get(message.id); pending.delete(message.id); clearTimeout(timer);
      message.error ? reject(new Error(message.error.message)) : resolve(message.result);
    }
    if (message.method === 'Tracing.dataCollected') trace.push(...message.params.value);
    if (message.method === 'Tracing.tracingComplete') traceDone?.();
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    if (message.method === 'Network.responseReceived' && message.params.response.status >= 400 && message.params.response.url.startsWith(new URL(auditUrl).origin + '/') && !message.params.response.url.endsWith('/favicon.ico')) errors.push('HTTP '+message.params.response.status+': '+message.params.response.url);
    if (message.method === 'Log.entryAdded' && message.params.entry.source === 'security') errors.push(message.params.entry.text);
  }
});
function command(method, params = {}, attached = true) {
  return new Promise((resolve, reject) => {
    const id = ++nextId;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 30000);
    pending.set(id, { resolve, reject, timer });
    browser.stdio[3].write(JSON.stringify({ id, method, params, ...(attached && session ? { sessionId: session } : {}) }) + '\0');
  });
}
async function evaluate(expression) {
  const result = await command('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
(async()=>{
try {
 const target=await command('Target.createTarget',{url:'about:blank'},false);
 const attached=await command('Target.attachToTarget',{targetId:target.targetId,flatten:true},false);session=attached.sessionId;
 for(const domain of ['Page','Runtime','Network','Log'])await command(domain+'.enable');
 await command('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<=768});
 await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 const script=await command('Page.addScriptToEvaluateOnNewDocument',{source:"Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Storage blocked','SecurityError');}});"});
 await command('Page.navigate',{url:auditUrl});await wait(2500);
 const report={width};
 report.initialization=await evaluate("(()=>{const nav=document.querySelector('#navbar');if(nav.classList.contains('hidden-on-load'))throw Error('Reduced-motion navbar hidden');if(document.querySelector('#main-wrapper').inert)throw Error('Page remains inert');if(document.querySelector('#about').dataset.notesReady!=='true'||document.querySelector('.contact-letter-toggle').hidden)throw Error('Feature initialization stopped by blocked storage');document.querySelector('#theme-toggle').click();document.querySelector('#theme-toggle').click();return {reducedMotion:true,blockedStorage:true,themeToggle:true};})()");
 if(width<=768){
  await evaluate("document.querySelector('#mobile-menu-btn').click()");await wait(650);
  await evaluate("if(document.querySelector('#mobile-menu-btn').getAttribute('aria-expanded')!=='true')throw Error('Menu ARIA');document.querySelector('#navbar').dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));");await wait(500);
  report.menu=await evaluate("document.querySelector('#mobile-menu-btn').getAttribute('aria-expanded')==='false'&&!document.querySelector('#navbar').classList.contains('menu-open')");
 }
 await evaluate("document.querySelector('#projects').scrollIntoView({behavior:'instant'});document.querySelector('#swipe-thumb').focus();document.querySelector('#swipe-thumb').dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));");await wait(300);
 report.folder=await evaluate("document.querySelector('#portfolio-folder').classList.contains('is-open')&&[...document.querySelectorAll('.folder-paper')].every(p=>!p.inert&&p.tabIndex===0)");
 if(!report.folder)throw Error('Keyboard folder failed');
 report.projects=[];
 for(const project of ['wga-ocean','wga-dekorasi','satya-portfolio','ketut-gajah-bali']){
  await evaluate("document.querySelector('[data-project-id=\""+project+"\"]').focus();document.querySelector('[data-project-id=\""+project+"\"]').click()");await wait(300);
  const result=await evaluate("(()=>{const m=document.querySelector('#dossierModal');if(!m.classList.contains('active')||!m.contains(document.activeElement))throw Error('Modal focus missing');if(!document.querySelector('#main-wrapper').inert||!document.querySelector('#navbar').inert)throw Error('Background focus not blocked');if(getComputedStyle(document.querySelector('#main-wrapper')).transform!=='none')throw Error('Modal replayed intro transform');return {name:document.querySelector('#lbTitle').textContent};})()");
  for(const tab of ['gallery','specs','overview']){await evaluate("document.querySelector('.lb-tab-btn[data-lb-tab=\""+tab+"\"]').click()");await wait(80);}
  for(let i=0;i<18;i++){await command('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});await command('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});}
  result.focusContained=await evaluate("document.querySelector('#dossierModal').contains(document.activeElement)");if(!result.focusContained)throw Error('Tab escaped modal');
  await evaluate("window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))");
  result.focusRestored=await evaluate("!document.querySelector('#main-wrapper').inert && !document.querySelector('#navbar').inert && document.activeElement.classList.contains('folder-paper')");if(!result.focusRestored)throw Error('Modal failed to restore focus');report.projects.push(result);
 }
 await evaluate("document.querySelector('[data-project-id=\"wga-ocean\"]').focus();document.querySelector('[data-project-id=\"wga-ocean\"]').click();document.querySelector('[data-editor-panel=\"extensions\"]').click();document.querySelector('#catExtensionToggle').click();document.querySelector('#musicExtensionToggle').click();document.querySelector('#editorMusicAudio').muted=true;document.querySelector('#musicPlayPause').click()");
 await wait(1500);
 report.extensions=await evaluate("(()=>{const a=document.querySelector('#editorMusicAudio');if(document.querySelector('#editorCatTrack').hidden||document.querySelector('#editorCat').dataset.pose!=='sleep')throw Error('Companion ignores reduced motion');if(a.error||!a.duration||!Number.isFinite(a.duration))throw Error('Audio failed to load');const tracks=[];for(let i=0;i<3;i++){document.querySelector('#musicNext').click();tracks.push(document.querySelector('#musicTrackTitle').textContent);}window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));if(a.getAttribute('src')||!a.paused||!document.querySelector('#editorCatTrack').hidden)throw Error('Extensions did not release on close');return {reducedMotionCompanion:true,audioDecoded:true,tracks,cleanup:true};})()");
 await evaluate("document.querySelector('#contact').scrollIntoView({behavior:'instant'});document.querySelector('.contact-letter-toggle').click()");await wait(100);
 report.contact=await evaluate("(()=>{const f=document.querySelector('.contact-letter-form');if(f.inert)throw Error('Form not interactive');if(f.checkValidity())throw Error('Empty form accepted');f.elements.name.value='Audit & QA';f.elements.email.value='bad';f.elements.message.value='A project <script> is text, not executable.';if(f.checkValidity())throw Error('Bad email accepted');f.elements.email.value='audit@example.com';let opened;window.open=(url,target,features)=>{opened={url,target,features};};f.requestSubmit();const u=new URL(opened.url);if(u.origin!=='https://mail.google.com'||u.searchParams.get('to')!=='satyawidnyana55@gmail.com'||!u.searchParams.get('body').includes('<script>'))throw Error('Gmail content mismatch');if(!f.querySelector('.contact-mail-hint a'))throw Error('Draft fallback missing');return {validations:true,gmailDraft:true,newTab:opened.target==='_blank'};})()");
 let previousWidth=width;
 for(const testWidth of [320,768,1024,width]){
  await evaluate("window.__auditResizeToken='same-page'");
  await command('Emulation.setDeviceMetricsOverride',{width:testWidth,height,deviceScaleFactor:1,mobile:testWidth<=768});
  await wait(1800);
  const reloaded=await evaluate("window.__auditResizeToken!=='same-page'");
  if(reloaded!==((previousWidth<=992)!==(testWidth<=992)))throw Error('Breakpoint reload does not match requested behavior');
  if(await evaluate("document.documentElement.scrollWidth>innerWidth"))throw Error('Resize overflow');
  previousWidth=testWidth;
 }
 report.breakpointReload=true;
 await evaluate("document.querySelector('#contact').scrollIntoView({behavior:'instant'});if(document.querySelector('.contact-letter-tray').dataset.open!=='true')document.querySelector('.contact-letter-toggle').click()");
 const shot=await command('Page.captureScreenshot',{format:'png'});fs.writeFileSync(output+'-contact.png',Buffer.from(shot.data,'base64'));
 report.assets=await evaluate("({duplicateIds:[...document.querySelectorAll('[id]')].map(x=>x.id).filter((id,i,a)=>a.indexOf(id)!==i),overflow:document.documentElement.scrollWidth>innerWidth,failedImages:[...document.images].filter(i=>i.getAttribute('src')&&i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src'))})");
 if(report.assets.duplicateIds.length||report.assets.overflow||report.assets.failedImages.length)throw Error('Asset/overflow check failed: '+JSON.stringify(report.assets));
 await command('Page.removeScriptToEvaluateOnNewDocument',{identifier:script.identifier});
 await command('Emulation.setEmulatedMedia',{features:[]});await command('Page.navigate',{url:auditUrl});await wait(2000);
 await evaluate("document.querySelector('#intro-overlay').click()");await wait(9000);
 report.normalIntro=await evaluate("!document.querySelector('#navbar').classList.contains('hidden-on-load')&&!document.querySelector('#main-wrapper').inert");
 await evaluate("document.querySelector('#termV2').scrollIntoView({behavior:'instant',block:'center'});document.querySelector('#termRunBtn').click()");await wait(10000);
 report.terminal=await evaluate("(()=>{if(!document.querySelector('#termFinalText').textContent.includes('20 years old')||document.querySelector('#termDelBtn').style.display==='none')throw Error('Terminal did not complete');document.querySelector('#termDelBtn').click();return {run:true};})()");await wait(6500);
 report.terminal.reset=await evaluate("document.querySelector('#termRunBtn').style.display==='block'&&!document.querySelector('#termFinalText').textContent.trim()");if(!report.terminal.reset)throw Error('Terminal reset failed');
 await evaluate("document.querySelector('.cabinet-cat').scrollIntoView({behavior:'instant',block:'center'})");await wait(250);
 report.cat=await evaluate("({parts:document.querySelectorAll('.cabinet-cat-breath, .cabinet-cat-tail, .cabinet-cat-tail-middle, .cabinet-cat-tail-tip').length,htmlLayers:[...document.querySelectorAll('.cabinet-cat-breath, .cabinet-cat-tail, .cabinet-cat-tail-middle, .cabinet-cat-tail-tip')].every(e=>e.namespaceURI==='http://www.w3.org/1999/xhtml'),breathing:getComputedStyle(document.querySelector('.cabinet-cat-breath')).animationPlayState})");
 const catShot=await command('Page.captureScreenshot',{format:'png'});fs.writeFileSync(output+'-cat.png',Buffer.from(catShot.data,'base64'));
 await evaluate("document.querySelector('#contact').scrollIntoView({behavior:'instant'})");await wait(500);
 report.cat.pausedOffscreen=await evaluate("getComputedStyle(document.querySelector('.cabinet-cat-breath')).animationPlayState==='paused'");
 if(!report.cat.htmlLayers||!report.cat.pausedOffscreen||!report.normalIntro)throw Error('Motion lifecycle regression: '+JSON.stringify({cat:report.cat,normalIntro:report.normalIntro}));
 report.errors=errors;if(errors.length)throw Error('Browser errors: '+JSON.stringify(errors));
 fs.writeFileSync(output+'.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await command('Browser.close',{},false).catch(()=>{});browser.kill();}
})().catch(e=>{console.error(e);browser.kill();process.exitCode=1;});
