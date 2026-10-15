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
const output = path.join(root, 'tmp', `${folderMode ? 'folder' : 'cabinet'}-${label}`);
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
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
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
async function metrics() {
  const result = await command('Performance.getMetrics');
  return Object.fromEntries(result.metrics.map(item => [item.name, item.value]));
}
async function scenario(name, expression) {
  trace = [];
  const before = await metrics();
  await command('Tracing.start', { categories: '-*,devtools.timeline,blink.user_timing' + (diagnostic ? ',disabled-by-default-devtools.timeline' : ''), transferMode: 'ReportEvents' }, false);
  const frames = await evaluate(expression);
  const after = await metrics();
  const finished = new Promise(resolve => { traceDone = resolve; });
  await command('Tracing.end', {}, false); await finished;
  if (folderMode && diagnostic) fs.writeFileSync(`${output}-trace.json`,JSON.stringify(trace));
  const report = { frames, counts: {}, durationMs: {} };
  for (const key of ['TaskDuration', 'ScriptDuration', 'LayoutDuration', 'RecalcStyleDuration']) report.durationMs[key] = +(1000 * (after[key] - before[key])).toFixed(2);
  for (const key of ['LayoutCount', 'RecalcStyleCount']) report.counts[key] = after[key] - before[key];
  for (const name of ['Paint', 'Layout', 'UpdateLayoutTree', 'PrePaint']) {
    const events = trace.filter(event => event.name === name && event.ph === 'X');
    report.counts[name] = events.length;
    report.durationMs[name] = +(events.reduce((sum, event) => sum + (event.dur || 0), 0) / 1000).toFixed(2);
  }
  return report;
}
async function profileFolder() {
  if (process.argv[6] === 'images-check') {
    const report=await evaluate(`(()=>{
      const images=[...document.querySelectorAll('#about .cabinet-case img')];
      const delayed=images.filter(image=>!image.complete||!image.naturalWidth).map(image=>image.getAttribute('src'));
      if(!images.length||delayed.length)throw Error('Cabinet images unavailable before opening: '+delayed.join(', '));
      if(images.some(image=>image.loading!=='eager'))throw Error('A cabinet image still waits for visibility');
      if([...document.querySelectorAll('.cabinet-panel')].some(panel=>panel.getAttribute('aria-hidden')!=='true'))throw Error('Drawers should still be closed');
      return {count:images.length,readyBeforeOpening:true,delayed,errors:[]};
    })()`);
    await evaluate(`document.getElementById('cabinet-education-label').click()`);await wait(1100);
    const screenshot=await command('Page.captureScreenshot',{format:'png'});
    fs.writeFileSync(`${output}.png`,Buffer.from(screenshot.data,'base64'));
    await evaluate(`document.getElementById('cabinet-process-label').click()`);await wait(1100);
    await evaluate(`const card=[...document.querySelectorAll('.cabinet-tech-item')].find(item=>item.querySelector('h5').textContent==='Lucide React');if(!card)throw Error('Lucide card missing');card.scrollIntoView({behavior:'instant',block:'center'});`);
    const lucideScreenshot=await command('Page.captureScreenshot',{format:'png'});
    fs.writeFileSync(`${output}-lucide.png`,Buffer.from(lucideScreenshot.data,'base64'));
    fs.writeFileSync(`${output}.json`,JSON.stringify({...report,errors},null,2));
    console.log(JSON.stringify({...report,errors},null,2));
    return;
  }
  if (process.argv[6] === 'images') {
    const assets = [
      ['image portofolio/BALI ADVENTURE/Stack/Integrations/google-maps.svg','google-maps',96],
      ['assets/svg/tech/google-stitch.png','google-stitch',96],
      ['assets/images/education/jb-school.png','jb-school',160],
      ['assets/images/education/stikom-bali.png','stikom-bali',160]
    ];
    const destination=path.join(root,'assets/images/cabinet');
    fs.mkdirSync(destination,{recursive:true});
    for (const [source,name,size] of assets) {
      const data=await evaluate(`(async()=>{
        const image=new Image();image.src=${JSON.stringify(source)};await image.decode();
        const canvas=document.createElement('canvas');canvas.width=canvas.height=${size};
        const scale=Math.min(canvas.width/image.naturalWidth,canvas.height/image.naturalHeight);
        const width=image.naturalWidth*scale,height=image.naturalHeight*scale;
        if (${JSON.stringify(name)}==='jb-school') {
          // Match the existing object-fit: cover / object-position: left crop.
          canvas.getContext('2d').drawImage(image,0,0,image.naturalHeight,image.naturalHeight,0,0,canvas.width,canvas.height);
        } else canvas.getContext('2d').drawImage(image,(canvas.width-width)/2,(canvas.height-height)/2,width,height);
        return canvas.toDataURL('image/webp',.92).split(',')[1];
      })()`);
      const buffer=Buffer.from(data,'base64');fs.writeFileSync(path.join(destination,`${name}.webp`),buffer);
      console.log(`${name}.webp: ${buffer.length} bytes`);
    }
    return;
  }
  if (process.argv[6] === 'texture') {
    for (const textureTheme of ['light','dark']) {
      const data = await evaluate(`(async()=>{
        const css=await (await fetch('assets/css/08-portfolio.css')).text();
        const values=css.split('--folder-noise: url("').slice(1).map(value=>value.split('");')[0]);
        const image=new Image();image.src=values[${textureTheme === 'dark' ? 1 : 0}];await image.decode();
        const canvas=document.createElement('canvas');canvas.width=canvas.height=180;canvas.getContext('2d').drawImage(image,0,0);
        return canvas.toDataURL('image/png').split(',')[1];
      })()`);
      fs.writeFileSync(path.join(root,'assets/images',`folder-grain-${textureTheme}.png`),Buffer.from(data,'base64'));
    }
    console.log('Rasterized the existing light/dark SVG grain into 180px PNG tiles.');
    return;
  }
  await evaluate(`document.getElementById('projects').classList.add('in-view');document.getElementById('projects').scrollIntoView({behavior:'instant',block:'start'})`);
  await wait(1200);
  const geometry = `({section:document.getElementById('projects').getBoundingClientRect().toJSON(),folder:document.getElementById('portfolio-folder').getBoundingClientRect().toJSON(),minHeight:getComputedStyle(document.getElementById('projects')).minHeight,margin:getComputedStyle(document.getElementById('about')).marginTop,scrollY})`;
  const before = await evaluate(geometry);
  const closed = await command('Page.captureScreenshot', {format:'png'});
  fs.writeFileSync(`${output}-closed.png`,Buffer.from(closed.data,'base64'));
  const opening = await scenario('opening', `(async()=>{
    const folder=document.getElementById('portfolio-folder'),thumb=document.getElementById('swipe-thumb'),track=document.getElementById('swipe-container');
    const r=thumb.getBoundingClientRect(),deltas=[];let last,start;
    const samples=new Promise(resolve=>{function tick(t){if(last)deltas.push(t-last);last=t;start??=t;if(t-start<1200)requestAnimationFrame(tick);else resolve({samples:deltas.length,over25ms:deltas.filter(d=>d>25).length,maxMs:Math.max(...deltas)});}requestAnimationFrame(tick);});
    thumb.dispatchEvent(new MouseEvent('mousedown',{bubbles:true,clientX:r.left+5}));
    window.dispatchEvent(new MouseEvent('mousemove',{cancelable:true,clientX:r.left+5+track.offsetWidth-thumb.offsetWidth}));
    window.__folderAnimations=document.getAnimations().map(a=>({name:a.animationName||'transition',target:a.effect?.target?.className,frames:a.effect?.getKeyframes()}));
    if(!folder.classList.contains('is-open'))throw Error('Swipe did not open folder');
    return await samples;
  })()`);
  const animationStarts = new Map(trace.filter(event=>event.name==='Animation'&&event.ph==='b').map(event=>[event.id2?.local,event.args?.data]));
  const compositorFailures = trace.filter(event=>event.name==='Animation'&&event.args?.data?.compositeFailed).map(event=>({target:animationStarts.get(event.id2?.local)?.nodeName,reason:event.args.data.compositeFailed}));
  if (width>768 && compositorFailures.some(failure=>failure.reason & 262144)) throw Error('An important property still blocks desktop animation compositing');
  const moving = await command('Page.captureScreenshot', {format:'png'});
  fs.writeFileSync(`${output}-moving.png`,Buffer.from(moving.data,'base64'));
  await wait(4400);
  const after = await evaluate(geometry);
  const qa = await evaluate(`(()=>{
    const folder=document.getElementById('portfolio-folder'),about=document.getElementById('about');
    const papers=[...folder.querySelectorAll('.folder-paper')].map(p=>({id:p.dataset.projectId,rect:p.getBoundingClientRect().toJSON(),inert:p.inert}));
    const bottom=Math.max(...[...folder.querySelectorAll('.folder-back,.folder-front,.folder-back-right,.folder-back-left')].map(p=>p.getBoundingClientRect().bottom));
    if(papers.some(p=>p.inert))throw Error('Papers still inert');
    if(about.getBoundingClientRect().top<bottom-2)throw Error('Archive overlaps studio');
    if(document.documentElement.scrollWidth>innerWidth)throw Error('Horizontal overflow');
    return {papers,clearance:about.getBoundingClientRect().top-bottom,overflow:false,activeAnimations:folder.getAnimations({subtree:true}).filter(a=>a.playState==='running').length};
  })()`);
  const opened = await command('Page.captureScreenshot', {format:'png'});
  fs.writeFileSync(`${output}-opened.png`,Buffer.from(opened.data,'base64'));
  const report={label,width,height,theme,cpuThrottle:4,before,opening,after,qa,compositorFailures,errors,animations:await evaluate('window.__folderAnimations')};
  fs.writeFileSync(`${output}.json`,JSON.stringify(report,null,2));
  console.log(JSON.stringify({...report,animations:undefined},null,2));
}
(async () => {
  try {
    const target = await command('Target.createTarget', { url: 'about:blank' }, false);
    session = (await command('Target.attachToTarget', { targetId: target.targetId, flatten: true }, false)).sessionId;
    await command('Page.enable'); await command('Runtime.enable'); await command('Performance.enable');
    await command('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width <= 768 });
    await command('Emulation.setCPUThrottlingRate', { rate: 4 });
    await command('Page.navigate', { url: 'http://127.0.0.1:8000/' });
    for (let i = 0; i < 200; i++) {
      if (await evaluate(`Boolean(document.getElementById('about')?.dataset.notesReady)`)) break;
      await wait(50);
    }
    await evaluate(`localStorage.setItem('theme',${JSON.stringify(theme)});${theme === 'dark' ? "document.body.setAttribute('data-theme','dark')" : "document.body.removeAttribute('data-theme')"};document.getElementById('intro-overlay').click();document.getElementById('about').scrollIntoView({behavior:'instant',block:'start'});`);
    await wait(9500);
    if (folderMode) { await profileFolder(); return; }
    await evaluate(`document.getElementById('about').scrollIntoView({behavior:'instant',block:'start'});`);
    await wait(1200);
    const environment = await evaluate(`({width:innerWidth,height:innerHeight,ready:document.getElementById('about').dataset.notesReady,closed:[...document.querySelectorAll('.cabinet-panel')].map(p=>({id:p.id,height:p.getBoundingClientRect().height,hidden:p.hidden,visibility:getComputedStyle(p).contentVisibility})),animations:document.getAnimations().filter(a=>a.playState==='running').map(a=>({name:a.animationName||'WAAPI',target:a.effect?.target?.className})),overflow:document.documentElement.scrollWidth>innerWidth})`);
    const idle = await scenario('idle', `new Promise(resolve=>{const deltas=[];let last,start;function tick(t){if(last)deltas.push(t-last);last=t;start??=t;if(t-start<2000)requestAnimationFrame(tick);else resolve({samples:deltas.length,over25ms:deltas.filter(d=>d>25).length,maxMs:Math.max(...deltas)});}requestAnimationFrame(tick);})`);
    const drawers = await scenario('drawers', `new Promise(resolve=>{const deltas=[];let last,start,step=-1;const ids=['design','development','process',null];function tick(t){if(last)deltas.push(t-last);last=t;start??=t;const next=Math.floor((t-start)/850);if(next!==step&&next<ids.length){step=next;const id=ids[step];document.querySelector('[data-note-drawer="'+(id||'process')+'"]').click();}if(t-start<3500)requestAnimationFrame(tick);else resolve({samples:deltas.length,over25ms:deltas.filter(d=>d>25).length,maxMs:Math.max(...deltas)});}requestAnimationFrame(tick);})`);
    const warmDrawers = await scenario('warmDrawers', `new Promise(resolve=>{const deltas=[];let last,start,step=-1;const ids=['design','development','process',null];function tick(t){if(last)deltas.push(t-last);last=t;start??=t;const next=Math.floor((t-start)/850);if(next!==step&&next<ids.length){step=next;document.querySelector('[data-note-drawer="'+(ids[step]||'process')+'"]').click();}if(t-start<3500)requestAnimationFrame(tick);else resolve({samples:deltas.length,over25ms:deltas.filter(d=>d>25).length,maxMs:Math.max(...deltas)});}requestAnimationFrame(tick);})`);
    const scroll = await scenario('scroll', `new Promise(resolve=>{const base=scrollY,deltas=[];let last,start;function tick(t){if(last)deltas.push(t-last);last=t;start??=t;window.scrollTo({top:base+200*Math.sin((t-start)/300),behavior:'instant'});if(t-start<1800)requestAnimationFrame(tick);else {window.scrollTo({top:base,behavior:'instant'});resolve({samples:deltas.length,over25ms:deltas.filter(d=>d>25).length,maxMs:Math.max(...deltas)});}}requestAnimationFrame(tick);})`);
    const qa = await evaluate(`(async()=>{
      const pause=ms=>new Promise(r=>setTimeout(r,ms));
      const button=document.getElementById('cabinet-design-label'),panel=document.getElementById('cabinet-design'),tray=panel.querySelector('.cabinet-tray');
      button.click();await pause(900);
      const composite=document.getElementById('about').classList.contains('cabinet-composite-motion');
      if(composite&&getComputedStyle(panel).transitionDuration!=='0s')throw Error('Composited cabinet still animates panel height');
      const openHeight=panel.getBoundingClientRect().height;
      if(openHeight<100||panel.inert||panel.dataset.collapsed==='true')throw Error('Drawer did not open');
      const sheet=document.querySelector('#about .notes-sheet');sheet.style.maxWidth=Math.max(240,sheet.offsetWidth-70)+'px';await pause(700);
      const resizedHeight=panel.getBoundingClientRect().height,expectedHeight=tray.offsetHeight+parseFloat(getComputedStyle(tray).marginTop);
      if(Math.abs(resizedHeight-expectedHeight)>2)throw Error('Drawer clips content after resize');
      sheet.style.maxWidth='';await pause(700);
      button.click();await pause(60);button.click();await pause(1000);
      if(panel.dataset.collapsed==='true'||panel.getBoundingClientRect().height<100)throw Error('Rapid reopen hid the content');
      button.click();await pause(1000);
      if(panel.getBoundingClientRect().height>1||panel.dataset.collapsed!=='true')throw Error('Drawer did not finish closing');
      if(document.documentElement.scrollWidth>innerWidth)throw Error('Horizontal overflow');
      return {composite,openHeight,resizedHeight,expectedHeight,rapidReopen:true,closedHeight:panel.getBoundingClientRect().height,overflow:false};
    })()`);
    const themeQA = await evaluate(`(async()=>{
      const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
      const pull=document.querySelector('.cabinet-pull'),label=pull.querySelector('.cabinet-label');
      const sample=()=>({background:getComputedStyle(pull).backgroundColor,text:getComputedStyle(label).color,properties:getComputedStyle(pull).transitionProperty,durations:getComputedStyle(pull).transitionDuration});
      const before=sample();document.getElementById('theme-toggle').click();await pause(70);const during=sample();await pause(250);const after=sample();
      if(after.background===before.background||after.text===before.text)throw Error('Theme did not update the drawer palette');
      if(!after.durations.split(',').every(value=>value.trim()==='0.16s'))throw Error('Cabinet theme timing is inconsistent');
      document.getElementById('theme-toggle').click();await pause(250);
      const lucide=[...document.querySelectorAll('.cabinet-tech-item')].find(item=>item.querySelector('h5').textContent==='Lucide React');
      if(!lucide||!lucide.querySelector('img').complete||!lucide.querySelector('img').naturalWidth)throw Error('Lucide logo is missing');
      const text=document.querySelector('.cabinet-case').textContent;
      if(/WGA Ocean|WGA Dekorasi|Bali Adventure/.test(text))throw Error('Cabinet still mentions project names');
      return {before,during,after,lucideReady:true,noProjectMentions:true};
    })()`);
    const screenshot = await command('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${output}.png`, Buffer.from(screenshot.data, 'base64'));
    await evaluate(`document.getElementById('cabinet-education-label').click()`);
    await wait(130);
    const opening = await command('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${output}-opening.png`, Buffer.from(opening.data, 'base64'));
    await wait(900);
    const opened = await command('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${output}-open.png`, Buffer.from(opened.data, 'base64'));
    const report = { label, theme, viewport: { width, height }, cpuThrottle: 4, environment, idle, drawers, warmDrawers, scroll, qa, themeQA, errors };
    fs.writeFileSync(`${output}.json`, JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally {
    await command('Browser.close', {}, false).catch(() => {});
    browser.kill();
    await wait(500);
    try { fs.rmSync(profilePath, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch { console.error('Temporary browser profile is still locked:', profilePath); }
  }
})().catch(error => { console.error(error); browser.kill(); process.exitCode = 1; });
