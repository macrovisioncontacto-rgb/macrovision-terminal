# macrovision-terminal
Página web de Macrovisión
# MacroVision Terminal

Página web profesional de MacroVision para seguimiento de mercados, análisis financiero, noticias macroeconómicas, artículos de actualidad y acceso al canal de YouTube Noticias MacroVision.

## Archivos principales

- `index.html`: estructura principal de la web.
- `style.css`: diseño visual y responsive.
- `script.js`: interacción, noticias, artículos, vídeos y datos simulados.
- `robots.txt`: configuración básica para indexación SEO.

## Publicación en Cloudflare Pages

Este proyecto es una web estática, sin framework ni proceso de compilación.

Configuración recomendada en Cloudflare Pages:

- Framework preset: `None` o `No framework`
- Production branch: `main`
- Build command: vacío o `exit 0`
- Build output directory: `/` o `.`
- Root directory: vacío

Cloudflare Pages necesita que exista un archivo `index.html` en la raíz para servir la página principal correctamente. La propia documentación de Cloudflare indica que, para sitios HTML estáticos, Pages puede desplegar directamente desde un repositorio GitHub y que `index.html` debe estar en el nivel superior para evitar errores 404: [Cloudflare Pages Static HTML](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/).

## Canal oficial

YouTube: https://www.youtube.com/@NoticiasMacroVision
