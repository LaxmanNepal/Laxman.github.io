const cards=document.getElementById('cards');
const rows=document.getElementById('compareRows');
const search=document.getElementById('search');
const resultCount=document.getElementById('resultCount');
let activeFilter='all';

const mark=v=>v==='Yes'?'<span class="yes">✓ Yes</span>':v==='Partial'?'<span class="partial">~ Partial</span>':v==='Reference'||v==='Derived'?'<span class="reference">◆ '+v+'</span>':v;
const matches=(x,q)=>{const hay=[x.name,x.description,x.badge,...x.tags].join(' ').toLowerCase();return !q||hay.includes(q.toLowerCase());};
const filtered=()=>KUNDALI_MAKERS.filter(x=>(activeFilter==='all'||x.tags.includes(activeFilter))&&matches(x,search.value));
function render(){
 const list=filtered(); resultCount.textContent=`${list.length} resource${list.length===1?'':'s'}`;
 cards.innerHTML=''; rows.innerHTML='';
 list.forEach((x,i)=>{
  cards.insertAdjacentHTML('beforeend',`<article class="card" style="--i:${i}"><div class="card-top"><div class="logo">${x.initial}</div><span class="badge">${x.badge}</span></div><h3>${x.name}</h3><p>${x.description}</p><div class="tags">${x.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div><a class="card-link" href="${x.url}" target="_blank" rel="noopener noreferrer">Open resource <span>↗</span></a></article>`);
  rows.insertAdjacentHTML('beforeend',`<tr><td><strong>${x.name}</strong></td><td>${mark(x.d1)}</td><td>${mark(x.d9)}</td><td>${mark(x.degrees)}</td><td>${mark(x.nakshatra)}</td><td>${mark(x.dasha)}</td><td>${x.transparency}</td></tr>`);
 });
 if(!list.length)cards.innerHTML='<div class="empty"><b>No matching resource</b><span>Try another search or filter.</span></div>';
}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');activeFilter=btn.dataset.filter;render();}));
search.addEventListener('input',render); render();
