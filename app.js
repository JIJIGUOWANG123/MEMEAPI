(function(){
  const D = window.MEME_DOC;
  if(!D){ document.getElementById('content').innerHTML = '<p class="empty">data.js 加载失败</p>'; return; }
  const nav = document.getElementById('nav');
  const content = document.getElementById('content');
  const empty = document.getElementById('empty');
  const search = document.getElementById('search');
  const countEl = document.getElementById('count');
  const updatedEl = document.getElementById('updated');
  let active = 'all', q = '';

  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function match(it){
    if(!q) return true;
    const hay = [it.cmd, it.kind, it.params, it.usage, it.note, it.key, ...(it.aliases||[])].join(' ').toLowerCase();
    return hay.includes(q);
  }
  function renderNav(){
    const all = D.categories.reduce((n,c)=>n+c.count,0);
    const rows = [{key:'all',label:'全部接口',count:all,desc:'所有可用接口'}].concat(D.categories);
    nav.innerHTML = rows.map(c=>'<button class="'+(active===c.key?'active':'')+'" data-k="'+c.key+'"><span>'+esc(c.label)+'</span><span class="n">'+c.count+'</span></button>').join('');
    nav.querySelectorAll('button').forEach(b=>b.onclick=()=>{active=b.dataset.k; render();});
  }
  function card(it){
    const cmd = esc(it.cmd);
    const alias = (it.aliases||[]).map(a=>'<span class="alias">'+esc(a)+'</span>').join('');
    const img = it.preview
      ? '<img loading="lazy" src="'+esc(it.preview)+'" alt="'+cmd+' 效果图">'
      : '<span class="ph">API</span>';
    return '<article class="card">'+
      '<div class="thumb">'+img+'</div>'+
      '<div class="card-body">'+
        '<div class="card-top"><span class="kind">'+esc(it.kind)+'</span><span class="key">'+esc(it.key||'')+'</span></div>'+
        '<div class="cmds"><span class="cmd">'+cmd+'</span>'+alias+'</div>'+
        '<div class="usage"><code>'+esc(it.usage)+'</code><button class="copy" data-c="'+esc(it.usage)+'">复制</button></div>'+
        '<div class="params">参数：'+esc(it.params)+'</div>'+
        '<div class="note">'+esc(it.note)+'</div>'+
      '</div></article>';
  }
  function render(){
    const qq = q.trim().toLowerCase();
    let total = 0;
    const parts = [];
    for(const c of D.categories){
      if(active!=='all' && active!==c.key) continue;
      const items = c.items.filter(match);
      total += items.length;
      if(!items.length) continue;
      parts.push('<section class="section"><div class="section-head"><h2>'+esc(c.label)+'</h2><span class="desc">'+esc(c.desc)+'</span><span class="badge">'+items.length+' 条</span></div><div class="grid">'+items.map(card).join('')+'</div></section>');
    }
    content.innerHTML = parts.join('');
    empty.hidden = total>0;
    countEl.textContent = '当前显示 '+total+' / '+D.total+' 条接口';
    content.querySelectorAll('.copy').forEach(b=>b.onclick=async()=>{
      try{await navigator.clipboard.writeText(b.dataset.c);b.textContent='已复制';setTimeout(()=>b.textContent='复制',1000);}catch(e){}
    });
    renderNav();
  }
  search.addEventListener('input', ()=>{ q=search.value; render(); });
  updatedEl.textContent = '更新：'+(D.updated||'—');
  document.getElementById('theme').onclick = ()=>{
    const root=document.documentElement;
    const next=root.dataset.theme==='dark'?'light':'dark';
    root.dataset.theme=next; localStorage.setItem('meme-doc-theme',next);
  };
  const saved=localStorage.getItem('meme-doc-theme');
  if(saved) document.documentElement.dataset.theme=saved;
  render();
})();
