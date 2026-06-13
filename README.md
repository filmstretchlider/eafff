# EAFF landing estática para GitHub Pages

Archivos listos para subir al repositorio:

- `index.html`
- `assets/css/styles.css`
- `assets/js/config.js`
- `assets/js/main.js`
- `robots.txt`
- `sitemap.xml`
- `404.html`

## Video de YouTube

Editar `assets/js/config.js` y pegar la URL o el ID:

```js
window.SITE_CONFIG = {
  youtubeVideo: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
};
```

Sin ese dato, el botón abre el modal pero muestra aviso. No usé el MP4 bajado.

## Formulario

El formulario usa `mailto:eaff@eaff.com.ar`, porque GitHub Pages no ejecuta backend. Para producción se puede conectar con Formspree, Netlify Forms, Brevo, Make, Zapier o backend propio.

## Subida a GitHub

Subir todo el contenido del ZIP a la raíz del repo. En GitHub Pages, publicar desde `main / root`.
