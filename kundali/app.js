const cards=document.getElementById('cards');
const rows=document.getElementById('compareRows');
const mark=v=>v==='Yes'?'<span class="yes">✓ Yes</span>':v==='Partial'?'<span class="partial">~ Partial</span>':v==='Reference'||v==='Derived'?'<span class="reference">◆ '+v+'</span>':v;
KUNDALI_MAKERS.forEach(x=>{
 cards.insertAdjacentHTML('beforeend',`<article class="card"><div class="card-top"><div class="logo">${x.initial}</div><span class="badge">${x.badge}</span></div><h3>${x.name}</h3><p>${x.description}</p><div class="tags">${x.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div><a class="card-link" href="${x.url}" target="_blank" rel="noopener">Open website <span>↗</span></a></article>`);
 rows.insertAdjacentHTML('beforeend',`<tr><td><strong>${x.name}</strong></td><td>${mark(x.d1)}</td><td>${mark(x.d9)}</td><td>${mark(x.degrees)}</td><td>${mark(x.nakshatra)}</td><td>${mark(x.dasha)}</td><td>${x.transparency}</td></tr>`);
});
