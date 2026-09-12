const cards=document.getElementById('cards');
const rows=document.getElementById('compareRows');
const search=document.getElementById('search');
const resultCount=document.getElementById('resultCount');
let activeFilter='all';
const mark=v=>v==='Yes'?'<span class="yes">✓ Yes</span>':v==='Partial'?'<span class="partial">~ Partial</span>':v==='Reference'||v==='Derived'?'<span class="reference">◆ '+v+'</span>':v;
const matches=(x,q)=>{const hay=[x.name,x.description,x.badge,...x.tags].join(' ').toLowerCase();return !q||hay.includes(q.toLowerCase());};
const filtered=()=>KUNDALI_MAKERS.filter(x=>(activeFilter==='all'||x.tags.includes(activeFilter))&&matches(x,search.value));
function render(){
 const list=filtered(); resultCount.textContent=`${list.length} resource${list.length===1?'':'s'}`; cards.innerHTML=''; rows.innerHTML='';
 list.forEach((x,i)=>{
  cards.insertAdjacentHTML('beforeend',`<article class="card" style="--i:${i}"><div class="card-top"><div class="logo">${x.initial}</div><span class="badge">${x.badge}</span></div><h3>${x.name}</h3><p>${x.description}</p><div class="tags">${x.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div><a class="card-link" href="${x.url}" target="_blank" rel="noopener noreferrer">Open resource <span>↗</span></a></article>`);
  rows.insertAdjacentHTML('beforeend',`<tr><td><strong>${x.name}</strong></td><td>${mark(x.d1)}</td><td>${mark(x.d9)}</td><td>${mark(x.degrees)}</td><td>${mark(x.nakshatra)}</td><td>${mark(x.dasha)}</td><td>${x.transparency}</td></tr>`);
 });
 if(!list.length)cards.innerHTML='<div class="empty"><b>No matching resource</b><span>Try another search or filter.</span></div>';
}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');activeFilter=btn.dataset.filter;render();}));
search.addEventListener('input',render);

const form=document.getElementById('birthForm');
const output=document.getElementById('profileOutput');
const copyBtn=document.getElementById('copyProfile');
const clearBtn=document.getElementById('clearProfile');
const compareLinks=document.getElementById('compareLinks');
const linkButtons=document.getElementById('linkButtons');
let profileText='';
function buildProfile(){
 const name=document.getElementById('birthName').value.trim(),system=document.getElementById('dateSystem').value,date=document.getElementById('birthDate').value.trim(),time=document.getElementById('birthTime').value,place=document.getElementById('birthPlace').value.trim();
 profileText=[name&&`Name: ${name}`,`Date system: ${system}`,`Birth date: ${date}`,`Birth time: ${time}`,`Birth place: ${place}`].filter(Boolean).join('\n');
 output.innerHTML=`<strong>${date} · ${time}</strong><span>${place}${name?` · ${name}`:''}</span><small>${system} date input</small>`;
 copyBtn.disabled=false; compareLinks.hidden=false;
 linkButtons.innerHTML=KUNDALI_MAKERS.filter(x=>x.name!=='Swiss Ephemeris').map(x=>`<a href="${x.url}" target="_blank" rel="noopener noreferrer">${x.initial} ${x.name} ↗</a>`).join('');
}
form.addEventListener('submit',e=>{e.preventDefault();buildProfile();document.getElementById('compare-mode').scrollIntoView({behavior:'smooth',block:'center'});});
copyBtn.addEventListener('click',async()=>{if(!profileText)return;try{await navigator.clipboard.writeText(profileText);copyBtn.textContent='Copied ✓';setTimeout(()=>copyBtn.textContent='Copy birth data',1400);}catch{copyBtn.textContent='Select and copy manually';}});
clearBtn.addEventListener('click',()=>{form.reset();profileText='';output.innerHTML='<strong>No profile yet</strong><span>Fill the form to generate a clean birth-data summary.</span>';copyBtn.disabled=true;copyBtn.textContent='Copy birth data';compareLinks.hidden=true;});
render();
