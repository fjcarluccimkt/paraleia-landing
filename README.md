# Paraleia — Landing page

Landing page oficial de Paraleia: la banda, música, videos, discografía, próximos shows (Songkick), feed de Instagram y contacto. Publicada en Vercel: https://paraleia.vercel.app

## Estructura

- `index.html` — toda la página (HTML + CSS + JS en un solo archivo)
- `assets/hero.jpg` — foto principal del hero
- `assets/favicon.svg` — ícono de la pestaña
- `assets/fonts/neutratext-bold.woff2` — tipografía de marca (solo el formato web; no subir los .otf/.ttf, ver abajo)
- `robots.txt` y `sitemap.xml` — para buscadores
- `vercel.json` — cabeceras de seguridad y caché
- `assets/instagram.json` — feed de Instagram (lo genera solo GitHub Actions)
- `assets/ig/` — imágenes del feed descargadas (las genera solo GitHub Actions)
- `scripts/` — scripts que bajan y refrescan el feed de Instagram
- `.github/workflows/instagram-feed.yml` — automatización programada

## Identidad visual

La paleta sale de la marca: crema (`--bg`), rojo (`--accent`), negro (`--text`) y amarillo (`--yellow`, solo como acento). Títulos en Neutra Text Bold; texto corrido en Inter. Todo se cambia desde las variables `:root` al principio del `<style>`.

## Publicación

Vercel publica solo cada vez que hay un commit en `main`. Para probar cambios sin tocar la web en vivo, trabajá en otra rama: Vercel genera una URL de vista previa.

## Tipografías

Neutra Text es una fuente comercial. En el repo (que es público) va solo el `.woff2` que usa la web. Los `.otf` y `.ttf` de escritorio quedan afuera por `.gitignore`; guardalos en tu compu o en Drive.

## Cookies y analítica

Microsoft Clarity solo se carga si el visitante acepta en el aviso de cookies ([CookieConsent v3](https://github.com/orestbida/cookieconsent), licencia MIT). El enlace "Preferencias de cookies" del footer reabre el panel. Si sumás otra herramienta de analítica, agregale `type="text/plain" data-category="analytics"` al `<script>` para que respete el consentimiento.

## Integraciones

- **La banda**: biografía, hitos e integrantes. Se edita directo en la sección `#banda` del `index.html`.

- **Songkick**: widget oficial conectado al perfil de Paraleia (id 9144894). Los shows que cargues en Songkick aparecen solos, en español.
- **Spotify**: embed del perfil de artista con lo más escuchado.
- **Videos**: carrusel con los videoclips oficiales de YouTube.
- **Discografía**: grilla de álbumes con link directo a Spotify.
- **Redes**: Instagram, TikTok, YouTube, Facebook y X en el footer; Spotify, Apple Music, Deezer y Bandcamp en Música y Discografía.
- **SEO**: datos estructurados `MusicGroup` (schema.org) en el `<head>`. Si cambia la formación o sale un disco, actualizalos también ahí.
- **Instagram**: feed propio, automático, sin servicios de terceros (ver abajo). Hasta que lo configures, se muestra una tarjeta que enlaza al perfil.

## Feed de Instagram (GitHub Actions)

El feed lo actualiza solo un workflow de GitHub Actions una vez por día: baja tus últimos 9 posts con la API oficial de Instagram, guarda las imágenes en el repo y arma `assets/instagram.json`, que la web lee. Todo gratis y sin marcas de agua.

El script descarta las miniaturas vacías (reels que arrancan en negro) y los posts casi duplicados (mismo contenido subido dos veces con un caption parecido). Para que un reel aparezca bien, elegí una portada en Instagram al publicarlo.

**Requisito previo:** la cuenta `@paraleia` tiene que ser **Profesional (Business o Creator)**. Se cambia gratis desde la app: Configuración → Cuenta → Cambiar a cuenta profesional. (Instagram no da acceso a cuentas personales desde diciembre 2024.)

### 1. Conseguir el token de Instagram

1. Entrá a [developers.facebook.com](https://developers.facebook.com/) y creá una app (tipo "Business").
2. Agregá el producto **Instagram** → "Instagram API con inicio de sesión de Instagram".
3. Conectá `@paraleia` y generá un **token de larga duración** (dura 60 días). Copialo.
4. Anotá también tu **ID de usuario de Instagram** por si lo necesitás (el script usa `/me`, así que con el token alcanza).

Guía oficial actualizada: https://developers.facebook.com/docs/instagram-platform

### 2. Cargar el token como Secret del repo

En tu repo de GitHub: **Settings → Secrets and variables → Actions → New repository secret**.

- Nombre: `IG_TOKEN` — Valor: el token largo del paso anterior.

### 3. (Opcional pero recomendado) Que el token se renueve solo

El token vence a los 60 días. Para que se refresque solo y nunca se corte el feed:

1. Creá un **Personal Access Token** de GitHub (Settings de tu cuenta → Developer settings → Fine-grained tokens) con permiso de **Secrets: Read and write** sobre este repo.
2. Cargalo como otro Secret llamado `GH_PAT`.

Si no hacés este paso, el feed igual funciona; solo vas a tener que repetir el paso 1–2 cada ~2 meses (2 minutos).

### 4. Probarlo

En el repo: pestaña **Actions → "Actualizar feed de Instagram" → Run workflow**. A los segundos deberías ver un commit nuevo con `assets/instagram.json` y las imágenes. Recargá la web y el feed aparece.

## Dominio propio (opcional)

Si más adelante querés `paraleia.com` o similar: en Vercel, Project → Settings → Domains → Add, y apuntás el DNS como indica Vercel. Después actualizá las URLs de `canonical`, `og:url`, `og:image`, los datos estructurados, `robots.txt` y `sitemap.xml`.
