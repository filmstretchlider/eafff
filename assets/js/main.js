const menuBtn = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));
}

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count || 0);
    const duration = 900;
    const start = performance.now();
    function tick(now){
      const p = Math.min((now - start) / duration, 1);
      el.textContent = '+ ' + Math.round(target * p).toLocaleString('es-AR');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
},{threshold:.3});
counters.forEach(el => counterObserver.observe(el));

const form = document.getElementById('quoteForm');
const volumeOut = document.getElementById('volumeOut');
const weightOut = document.getElementById('weightOut');
function calc(){
  if(!form) return;
  const fd = new FormData(form);
  const largo = Number(fd.get('largo')) || 0;
  const ancho = Number(fd.get('ancho')) || 0;
  const alto = Number(fd.get('alto')) || 0;
  const bultos = Math.max(Number(fd.get('bultos')) || 1, 1);
  const m3 = (largo * ancho * alto * bultos) / 1000000;
  const volumetric = Math.ceil((largo * ancho * alto * bultos) / 6000);
  if(volumeOut) volumeOut.textContent = m3.toLocaleString('es-AR',{minimumFractionDigits:3,maximumFractionDigits:3}) + ' m³';
  if(weightOut) weightOut.textContent = 'Peso volumétrico aéreo aprox.: ' + volumetric.toLocaleString('es-AR') + ' kg';
}
form?.addEventListener('input', calc);
calc();

form?.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const fd = new FormData(form);
  const lines = [
    'Solicitud de cotización',
    '',
    `Servicio: ${fd.get('servicio') || ''}`,
    `Nombre: ${fd.get('nombre') || ''}`,
    `Email: ${fd.get('email') || ''}`,
    `Teléfono: ${fd.get('telefono') || ''}`,
    `Mercadería: ${fd.get('mercaderia') || ''}`,
    `Origen: ${fd.get('origen') || ''}`,
    `Destino: ${fd.get('destino') || ''}`,
    `Medidas: ${fd.get('largo') || 0} x ${fd.get('ancho') || 0} x ${fd.get('alto') || 0} cm`,
    `Peso bruto: ${fd.get('peso') || 0} kg`,
    `Bultos: ${fd.get('bultos') || 1}`,
    `Docs: ${fd.get('docs') || ''}`,
    `Comentario: ${fd.get('comentario') || ''}`,
    '',
    `Volumen estimado: ${volumeOut?.textContent || ''}`,
    `${weightOut?.textContent || ''}`
  ];
  const subject = encodeURIComponent('Solicitud de cotización web');
  const body = encodeURIComponent(lines.join('\n'));
  window.location.href = `mailto:eaff@eaff.com.ar?subject=${subject}&body=${body}`;
});

const newsletter = document.getElementById('newsletterForm');
newsletter?.addEventListener('submit', ev => {
  ev.preventDefault();
  alert('Newsletter listo para conectar a Mailchimp, Brevo o formulario propio.');
});

function getYoutubeId(input){
  if(!input) return '';
  const raw = String(input).trim();
  if(/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;
  try{
    const url = new URL(raw);
    if(url.hostname.includes('youtu.be')) return url.pathname.split('/').filter(Boolean)[0] || '';
    if(url.searchParams.get('v')) return url.searchParams.get('v') || '';
    const parts = url.pathname.split('/').filter(Boolean);
    const idx = parts.findIndex(p => ['embed','shorts','live'].includes(p));
    if(idx >= 0 && parts[idx+1]) return parts[idx+1];
  }catch(e){ return ''; }
  return '';
}

const modal = document.getElementById('videoModal');
const frame = document.getElementById('videoFrame');
function openVideo(){
  if(!modal || !frame) return;
  const id = getYoutubeId(window.SITE_CONFIG?.youtubeVideo || '');
  if(id){
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1" title="Video institucional" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
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
  if(getYoutubeId(window.SITE_CONFIG?.youtubeVideo || '')) frame.innerHTML = '';
}
document.querySelectorAll('[data-open-video]').forEach(btn => btn.addEventListener('click', openVideo));
document.querySelectorAll('[data-close-video]').forEach(btn => btn.addEventListener('click', closeVideo));
document.addEventListener('keydown', ev => { if(ev.key === 'Escape') closeVideo(); });
