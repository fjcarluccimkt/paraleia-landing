// Baja los últimos posts de Instagram y los guarda en assets/instagram.json
// + descarga cada imagen a assets/ig/<id>.jpg (así no dependen de URLs que expiran).
// Requiere la variable de entorno IG_TOKEN (token largo de la Instagram Graph API).

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const TOKEN = process.env.IG_TOKEN;
const HOW_MANY = 9;                 // cuántos posts mostrar en la web
const FIELDS = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';
const OUT_JSON = 'assets/instagram.json';
const IMG_DIR = 'assets/ig';
// Una miniatura negra o lisa pesa ~3 KB; una foto real, más de 15 KB.
const MIN_IMAGE_BYTES = 8000;

// Palabras significativas del caption, sin hashtags, menciones, emojis ni signos.
function captionWords(caption) {
  const clean = (caption || '')
    .toLowerCase()
    .replace(/[#@][\p{L}\p{N}_.]+/gu, ' ')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9ñ\s]/g, ' ');
  return new Set(clean.split(/\s+/).filter((w) => w.length > 2));
}

// Dos captions son "el mismo post" si casi todas las palabras del más corto están en el otro.
function isNearDuplicate(words, seenList) {
  if (words.size < 3) return false;
  return seenList.some((other) => {
    let shared = 0;
    for (const w of words) if (other.has(w)) shared++;
    return shared / Math.min(words.size, other.size) >= 0.7;
  });
}

if (!TOKEN) {
  console.error('Falta IG_TOKEN. Configuralo como Secret del repo.');
  process.exit(1);
}

async function main() {
  const api = `https://graph.instagram.com/me/media?fields=${FIELDS}&limit=25&access_token=${TOKEN}`;
  const res = await fetch(api);
  if (!res.ok) {
    console.error('Error de la API de Instagram:', res.status, await res.text());
    process.exit(1);
  }
  const data = await res.json();
  const raw = Array.isArray(data.data) ? data.data : [];

  fs.mkdirSync(IMG_DIR, { recursive: true });

  const posts = [];
  const keepFiles = new Set();
  const seenImages = new Set();   // hash del contenido de la imagen
  const seenCaptions = [];        // palabras de cada caption ya incluido

  for (const p of raw) {
    if (posts.length >= HOW_MANY) break;
    const imgUrl = p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url;
    if (!imgUrl) continue;

    // Evitar duplicados por texto (mismo contenido subido dos veces con captions parecidos)
    const words = captionWords(p.caption);
    if (isNearDuplicate(words, seenCaptions)) continue;

    let buf;
    try {
      const r = await fetch(imgUrl);
      if (!r.ok) continue;
      buf = Buffer.from(await r.arrayBuffer());
    } catch (e) {
      console.error('No se pudo bajar la imagen', p.id, e.message);
      continue;
    }

    // Descartar miniaturas vacías (reels que arrancan en negro): pesan muy poco
    if (buf.length < MIN_IMAGE_BYTES) {
      console.log('Miniatura descartada por estar vacía:', p.permalink);
      continue;
    }

    // Evitar duplicados por imagen idéntica
    const imgHash = crypto.createHash('md5').update(buf).digest('hex');
    if (seenImages.has(imgHash)) continue;

    const file = `${p.id}.jpg`;
    fs.writeFileSync(path.join(IMG_DIR, file), buf);

    seenImages.add(imgHash);
    if (words.size) seenCaptions.push(words);
    keepFiles.add(file);
    posts.push({
      id: p.id,
      caption: (p.caption || '').replace(/\s+/g, ' ').trim().slice(0, 140),
      permalink: p.permalink,
      image: `${IMG_DIR}/${file}`,
      timestamp: p.timestamp,
    });
  }

  // Limpieza: borra imágenes viejas que ya no están en el feed
  for (const f of fs.readdirSync(IMG_DIR)) {
    if (f.endsWith('.jpg') && !keepFiles.has(f)) {
      fs.unlinkSync(path.join(IMG_DIR, f));
    }
  }

  fs.writeFileSync(OUT_JSON, JSON.stringify(posts, null, 2));
  console.log(`Guardados ${posts.length} posts en ${OUT_JSON}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
