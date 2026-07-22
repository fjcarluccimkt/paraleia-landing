# Paraleia — Landing page

Landing page oficial de Paraleia: último lanzamiento, próximos shows (Bandsintown) y redes.

## Estructura

- `index.html` — toda la página (HTML + CSS + JS en un solo archivo)
- `assets/hero.jpg` — foto principal del hero (agregala vos: la foto de la banda en la terraza)
- `assets/instagram.json` — feed de Instagram (lo genera solo GitHub Actions)
- `assets/ig/` — imágenes del feed descargadas (las genera solo GitHub Actions)
- `scripts/` — scripts que bajan y refrescan el feed de Instagram
- `.github/workflows/instagram-feed.yml` — automatización programada

## Foto del hero

Guardá la foto como `assets/hero.jpg`. Si no está, la página muestra un degradé celeste/cálido como fallback, así que nada se rompe.

## Cómo publicar en GitHub Pages

1. Creá un repo nuevo en GitHub (por ejemplo `paraleia-landing`).
2. Subí estos archivos (podés arrastrarlos directo en la web de GitHub con "Add file → Upload files").
3. En el repo: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `/ (root)` → Save**.
4. En un par de minutos la página queda en `https://TU-USUARIO.github.io/paraleia-landing/`.

O por terminal:

```bash
cd paraleia-landing
git init
git add .
git commit -m "Landing page Paraleia"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/paraleia-landing.git
git push -u origin main
```

## Integraciones

- **Songkick**: widget oficial conectado al perfil de Paraleia (id 9144894). Los shows que cargues en Songkick aparecen solos, en español.
- **Spotify**: embed del perfil de artista con lo más escuchado.
- **Videos**: carrusel con los videoclips oficiales de YouTube.
- **Discografía**: grilla de álbumes con link directo a Spotify.
- **Redes**: Instagram, TikTok, YouTube, Facebook, X y Bandcamp, más iconos a Spotify, Apple Music y Deezer.
- **Instagram**: feed propio, automático, sin servicios de terceros (ver abajo). Hasta que lo configures, se muestra una tarjeta que enlaza al perfil.

## Feed de Instagram (GitHub Actions)

El feed lo actualiza solo un workflow de GitHub Actions una vez por día: baja tus últimos 9 posts con la API oficial de Instagram, guarda las imágenes en el repo y arma `assets/instagram.json`, que la web lee. Todo gratis y sin marcas de agua.

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

Si más adelante querés `paraleia.com` o similar: Settings → Pages → Custom domain, y apuntás el DNS del dominio a GitHub Pages.
