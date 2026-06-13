# Sitio estático EAFF - versión fiel al formato original

Listo para GitHub Pages.

## Subida rápida
1. Descomprimir el ZIP.
2. Subir todo a la raíz del repositorio.
3. Activar GitHub Pages desde `Settings > Pages`.

## Video de YouTube
Editar:

`assets/js/config.js`

Pegar la URL completa o el ID:

```js
window.SITE_CONFIG = {
  youtubeVideo: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
};
```

## SEO
Editar `robots.txt` y `sitemap.xml` cambiando `https://tudominio.com/` por el dominio real.

## Formulario
El formulario calcula volumen. Para que envíe correos reales hay que conectar Formspree, Netlify Forms o backend propio.
