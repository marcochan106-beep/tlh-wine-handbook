const wines = window.WINE_DATA;
let current = 1;
const nav = document.getElementById('nav');
const main = document.getElementById('main');
const q = document.getElementById('q');
const esc = s => String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function box(t,c,cls=''){return `<div class="mini ${cls}"><b>${esc(t)}</b>${c}</div>`}
function navRender(){
  const query=q.value.toLowerCase(); nav.innerHTML='';
  [...new Set(wines.map(x=>x.group))].forEach(g=>{
    const arr=wines.map((x,i)=>[x,i]).filter(([x])=>x.group===g&&x.name.toLowerCase().includes(query));
    if(!arr.length)return;
    nav.insertAdjacentHTML('beforeend',`<div class="group">${esc(g)} · ${arr.length}</div>`);
    arr.forEach(([x,i])=>nav.insertAdjacentHTML('beforeend',`<button class="nav ${i===current?'active':''}" onclick="current=${i};render();navRender()">${esc(x.vintage)} · ${esc(x.name)}</button>`));
  });
}
function render(){
  const x=wines[current];
  main.innerHTML=`<section class="hero"><div class="kicker">V12.3 · Tier 1 Core Knowledge</div><h2>${esc(x.name)}</h2><div class="sub">${esc(x.vintage)}</div></section><section class="card"><div class="facts"><div class="fact"><b>Region</b>${esc(x.region)}</div><div class="fact"><b>Grape Variety</b>${esc(x.grape)}</div><div class="fact"><b>Style</b>${esc(x.style)}</div></div><h3>Why It Matters</h3><p>${esc(x.why)}</p><h3>Tasting Profile</h3><div class="taste">${box('Appearance',esc(x.appearance))}${box('Aromas',esc(x.aromas))}${box('Palate',esc(x.palate))}${box('Guest-Friendly Description',esc(x.guest))}</div></section><details><summary>Tier 2 · Tin Lung Heen Pairing Strategy</summary><div class="inside"><div class="progrid">${box('Best With',esc(x.bestwith),'wide')}<div class="mini wide"><b>Recommended Dishes</b><ul class="points">${x.bestdishes.map(d=>`<li>${esc(d)}</li>`).join('')}</ul></div><div class="mini wide"><b>Flagship Pairing</b><div class="pairname">★ ${esc(x.flagship.dish)}</div><p>${esc(x.flagship.why)}</p></div>${box('Why It Wins',esc(x.whywins),'wide')}</div></div></details><details><summary>Tier 3 · Professional Knowledge</summary><div class="inside"><div class="progrid">${box('Producer Story',esc(x.story),'wide')}${box('Why This Wine Matters',esc(x.matters))}${box('Why It Is On The Tin Lung Heen List',esc(x.list))}${box('Guest Profile',esc(x.guestprofile))}${box('Service Strategy',esc(x.strategy))}${box('Ageing Potential',esc(x.age))}<div class="mini"><b>Key Selling Points</b><ul class="points">${x.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul></div></div></div></details>`;
  window.scrollTo({top:0,behavior:'smooth'});
}
q.oninput=navRender; navRender(); render();
