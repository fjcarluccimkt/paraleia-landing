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
  const seenCaptions = new Set(); // inicio del caption normalizado

  for (const p of raw) {
    if (posts.length >= HOW_MANY) break;
    const imgUrl = p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url;
    if (!imgUrl) continue;

    // Evitar duplicados por texto (mismo contenido subido como reel y como posteo)
    const capKey = (p.caption || '').toLowerCase().replace(/\s+/g, ' ').trim().slice(0, 25);
    if (capKey && seenCaptions.has(capKey)) continue;

    let buf;
    try {
      const r = await fetch(imgUrl);
      if (!r.ok) continue;
      buf = Buffer.from(await r.arrayBuffer());
    } catch (e) {
      console.error('No se pudo bajar la imagen', p.id, e.message);
      continue;
    }

    // Evitar duplicados por imagen idéntica
    const imgHash = crypto.createHash('md5').update(buf).digest('hex');
    if (seenImages.has(imgHash)) continue;

    const file = `${p.id}.jpg`;
    fs.writeFileSync(path.join(IMG_DIR, file), buf);

    seenImages.add(imgHash);
    if (capKey) seenCaptions.add(capKey);
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
