(function(){
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));

  const toggle = $('.menu-toggle');
  const menu = $('#menuPrincipal');
  if(toggle && menu){
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    $$('#menuPrincipal a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded','false');
    }));
  }

  function youtubeId(value){
    if(!value) return '';
    value = String(value).trim();
    if(/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;
    try{
      const url = new URL(value);
      if(url.hostname.includes('youtu.be')) return url.pathname.replace('/','').slice(0,11);
      if(url.searchParams.get('v')) return url.searchParams.get('v').slice(0,11);
      const match = url.pathname.match(/\/(embed|shorts)\/([a-zA-Z0-9_-]{11})/);
      if(match) return match[2];
    }catch(e){return ''}
    return '';
  }

  const modal = $('#videoModal');
  const frame = $('#videoFrame');
  function openVideo(){
    if(!modal || !frame) return;
    const id = youtubeId(window.SITE_CONFIG && window.SITE_CONFIG.youtubeVideo);
    if(id){
      frame.innerHTML = '<iframe src="https://www.youtube.com/embed/'+id+'?rel=0&modestbranding=1&autoplay=1" title="Video institucional" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeVideo(){
    if(!modal || !frame) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    const id = youtubeId(window.SITE_CONFIG && window.SITE_CONFIG.youtubeVideo);
    if(id) frame.innerHTML = '';
  }
  $$('[data-open-video]').forEach(btn => btn.addEventListener('click', openVideo));
  $$('[data-close-video]').forEach(btn => btn.addEventListener('click', closeVideo));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeVideo(); });

  const quoteForm = $('#quoteForm');
  const volumeOut = $('#volumeOut');
  if(quoteForm && volumeOut){
    function calc(){
      const fd = new FormData(quoteForm);
      const l = parseFloat(fd.get('largo')) || 0;
      const a = parseFloat(fd.get('ancho')) || 0;
      const h = parseFloat(fd.get('alto')) || 0;
      const b = parseFloat(fd.get('bultos')) || 1;
      const m3 = (l*a*h*b)/1000000;
      volumeOut.textContent = m3.toLocaleString('es-AR',{minimumFractionDigits:3,maximumFractionDigits:3}) + ' m³';
    }
    quoteForm.addEventListener('input', calc);
    quoteForm.addEventListener('submit', function(e){
      e.preventDefault();
      alert('Formulario listo. Falta conectar el envío real.');
    });
  }

  $$('.newsletter-form').forEach(form => form.addEventListener('submit', function(e){
    e.preventDefault();
    alert('Newsletter listo. Falta conectar el envío real.');
  }));
})();
