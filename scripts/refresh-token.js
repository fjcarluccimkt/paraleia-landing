// Refresca el token de Instagram (válido 60 días) y guarda el nuevo como Secret del repo.
// Solo corre si configuraste el Secret GH_PAT (un token de GitHub con permiso de escribir Secrets).
// Si no lo configurás, no pasa nada: simplemente tendrás que renovar el token a mano cada ~2 meses.

const { execSync } = require('child_process');

const TOKEN = process.env.IG_TOKEN;
if (!TOKEN) {
  console.error('Falta IG_TOKEN.');
  process.exit(0); // no frenamos el resto del workflow
}

async function main() {
  const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${TOKEN}`;
  const res = await fetch(url);
  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data.access_token) {
    // El token debe tener al menos 24 h de vida para poder refrescarse; los primeros días puede fallar.
    console.error('No se pudo refrescar el token (normal en las primeras 24 h):', res.status, JSON.stringify(data));
    process.exit(0);
  }

  execSync('gh secret set IG_TOKEN', { input: data.access_token, stdio: ['pipe', 'inherit', 'inherit'] });
  console.log('Token refrescado. Vence en', data.expires_in, 'segundos.');
}

main().catch((e) => {
  console.error(e);
  process.exit(0);
});
