const crypto = require('crypto');

const SITE_URL = 'https://paraleia.vercel.app';
const SINGLE_URL = `${SITE_URL}/figuras-perfectas/`;
const DEFAULT_SENDER_EMAIL = 'infoparaleia@gmail.com';
const DEFAULT_SENDER_NAME = 'PARALEIA';
const FALLBACK_WEB3FORMS_KEY = '127d739e-74e6-4476-b8c0-5b7bc81ee5d2';

const ALLOWED_ORIGINS = new Set([
  'https://paraleia.vercel.app',
  'https://figuras-perfectas.vercel.app',
]);

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function cleanName(raw) {
  return String(raw || '')
    .replace(/[\r\n\t]+/g, ' ')
    .trim()
    .slice(0, 80);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function buildWelcomeHtml(name) {
  const year = new Date().getFullYear();
  const safeName = escapeHtml(name);
  const greeting = safeName ? `Hola ${safeName},` : 'Hola,';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Ya estás en la lista — PARALEIA</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    html, body { margin:0 !important; padding:0 !important; width:100% !important; height:100% !important; background-color:#141414 !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { border-collapse:collapse !important; mso-table-lspace:0pt !important; mso-table-rspace:0pt !important; }
    img { border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; display:block; }
    a { text-decoration:none; }
    a[x-apple-data-detectors], .unstyle-auto-detected-links a, .aBn { border-bottom:0 !important; cursor:default !important; color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; }
    @media only screen and (max-width: 620px) {
      .email-container { width:100% !important; max-width:100% !important; }
      .mobile-pad { padding-left:22px !important; padding-right:22px !important; }
      .mobile-stack-col { display:block !important; width:100% !important; max-width:100% !important; padding-left:0 !important; padding-right:0 !important; }
      .mobile-cover-wrap { padding-bottom:20px !important; }
      .mobile-cover-img { width:160px !important; height:auto !important; }
      .mobile-h1 { font-size:28px !important; line-height:1.15 !important; }
      .mobile-btn { width:100% !important; display:block !important; box-sizing:border-box !important; text-align:center !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#141414; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; color:#141414;">
  <div style="display:none; font-size:1px; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; mso-hide:all;">
    Próximos singles, fechas de shows y novedades del próximo disco, sin relleno. Empezá por Figuras Perfectas.
    &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#141414;">
    <tr>
      <td align="center" style="padding:24px 12px 42px 12px;">
        <!--[if mso]>
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center">
        <tr><td>
        <![endif]-->

        <table role="presentation" class="email-container" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; margin:0 auto;">
          <tr>
            <td style="background-color:#fbf8f1; border:1px solid #2b2926; border-radius:18px; overflow:hidden;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

                <!-- 1. Cabecera de marca -->
                <tr>
                  <td class="mobile-pad" align="center" style="background-color:#141414; padding:22px 36px;">
                    <a href="${SITE_URL}/" target="_blank" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; font-weight:700; letter-spacing:5px; text-transform:uppercase; color:#f4eee2; text-decoration:none;">
                      PARALEIA
                    </a>
                  </td>
                </tr>

                <!-- 2. Foto Hero oficial -->
                <tr>
                  <td style="background-color:#141414; padding:0;">
                    <a href="${SITE_URL}/" target="_blank" style="text-decoration:none;">
                      <img src="${SITE_URL}/assets/hero.jpg"
                           alt="PARALEIA — Indie rock y pop alternativo"
                           width="600"
                           style="width:100%; max-width:600px; height:auto; display:block;" />
                    </a>
                  </td>
                </tr>

                <!-- Filete rojo acento -->
                <tr>
                  <td height="4" style="height:4px; line-height:4px; font-size:0; background-color:#c8322b;">&nbsp;</td>
                </tr>

                <!-- 3. Cuerpo de bienvenida -->
                <tr>
                  <td class="mobile-pad" style="background-color:#fbf8f1; padding:38px 40px 34px 40px;">
                    <p style="margin:0 0 10px 0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:11px; font-weight:700; letter-spacing:2.4px; text-transform:uppercase; color:#c8322b;">
                      Ya estás en la lista
                    </p>

                    <h1 class="mobile-h1" style="margin:0 0 18px 0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:32px; font-weight:700; line-height:1.15; letter-spacing:-0.4px; color:#141414;">
                      ${greeting}
                    </h1>

                    <p style="margin:0 0 16px 0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:1.65; color:#201e1b;">
                      Qué bueno que te sumaste. Gracias por dejar tu mail en nuestra web.
                    </p>

                    <p style="margin:0 0 16px 0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:1.65; color:#201e1b;">
                      Desde acá te vamos a avisar antes que nadie cada vez que salga un nuevo single, cuando haya novedades del próximo disco y apenas se confirme una fecha en vivo, sea en Argentina o en España.
                    </p>

                    <p style="margin:0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:15px; line-height:1.65; color:#585249;">
                      No vamos a llenar tu casilla con correos de relleno. Te escribimos solo cuando haya música nueva o una fecha concreta para compartir.
                    </p>
                  </td>
                </tr>

                <!-- 4. Bloque destacado: Figuras Perfectas -->
                <tr>
                  <td class="mobile-pad" style="background-color:#141414; padding:34px 40px;">
                    <p style="margin:0 0 18px 0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:10px; font-weight:700; letter-spacing:2.4px; text-transform:uppercase; color:#e9b72f;">
                      &#9679;&nbsp;&nbsp;PARA EMPEZAR HOY
                    </p>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td class="mobile-stack-col mobile-cover-wrap" width="156" valign="top" style="width:156px; padding-right:24px;">
                          <a href="${SINGLE_URL}" target="_blank" style="text-decoration:none;">
                            <img class="mobile-cover-img"
                                 src="${SITE_URL}/figuras-perfectas/portada.jpg"
                                 alt="Portada de Figuras Perfectas — PARALEIA"
                                 width="148"
                                 style="width:148px; max-width:100%; height:auto; border-radius:12px; border:1px solid #302d28;" />
                          </a>
                        </td>

                        <td class="mobile-stack-col" valign="middle">
                          <h2 style="margin:0 0 8px 0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:24px; font-weight:700; line-height:1.18; color:#f4eee2;">
                            Figuras Perfectas
                          </h2>
                          <p style="margin:0 0 20px 0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; line-height:1.6; color:#d6cfc2;">
                            Nuestro nuevo single y el primer adelanto del próximo disco. Podés escucharlo en tu plataforma favorita y armar tu propia story con una frase de la canción.
                          </p>

                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td align="center" style="border-radius:999px; background-color:#e9b72f;">
                                <!--[if mso]>
                                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${SINGLE_URL}" style="height:46px;v-text-anchor:middle;width:248px;" arcsize="50%" stroke="f" fillcolor="#e9b72f">
                                  <w:anchorlock/>
                                  <center style="color:#141414;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;">
                                    Escuchar Figuras Perfectas &rarr;
                                  </center>
                                </v:roundrect>
                                <![endif]-->
                                <!--[if !mso]><!-->
                                <a class="mobile-btn"
                                   href="${SINGLE_URL}"
                                   target="_blank"
                                   style="display:inline-block; padding:13px 24px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; font-weight:700; color:#141414; text-decoration:none; border-radius:999px;">
                                  Escuchar Figuras Perfectas &rarr;
                                </a>
                                <!--<![endif]-->
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- 5. Iconos + Cierre conversacional + Firma -->
                <tr>
                  <td class="mobile-pad" style="background-color:#f4eee2; padding:32px 40px 36px 40px;">
                    <p style="margin:0 0 14px 0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:11px; font-weight:700; letter-spacing:2.2px; text-transform:uppercase; color:#585249;">
                      También nos encontrás acá
                    </p>

                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 26px 0;">
                      <tr>
                        <td style="padding-right:12px;">
                          <a href="https://open.spotify.com/artist/737T198kjU3hbvxpc2wnhC" target="_blank" title="Spotify" style="display:block; text-decoration:none;">
                            <img src="${SITE_URL}/assets/icons/spotify.png" alt="Spotify" width="44" height="44" style="width:44px; height:44px; display:block; border:0;" />
                          </a>
                        </td>
                        <td style="padding-right:12px;">
                          <a href="https://www.youtube.com/@paraleiaoficial" target="_blank" title="YouTube" style="display:block; text-decoration:none;">
                            <img src="${SITE_URL}/assets/icons/youtube.png" alt="YouTube" width="44" height="44" style="width:44px; height:44px; display:block; border:0;" />
                          </a>
                        </td>
                        <td style="padding-right:12px;">
                          <a href="https://instagram.com/paraleia" target="_blank" title="Instagram" style="display:block; text-decoration:none;">
                            <img src="${SITE_URL}/assets/icons/instagram.png" alt="Instagram" width="44" height="44" style="width:44px; height:44px; display:block; border:0;" />
                          </a>
                        </td>
                        <td style="padding-right:12px;">
                          <a href="https://facebook.com/paraleiaok" target="_blank" title="Facebook" style="display:block; text-decoration:none;">
                            <img src="${SITE_URL}/assets/icons/facebook.png" alt="Facebook" width="44" height="44" style="width:44px; height:44px; display:block; border:0;" />
                          </a>
                        </td>
                        <td>
                          <a href="https://www.tiktok.com/@paraleia" target="_blank" title="TikTok" style="display:block; text-decoration:none;">
                            <img src="${SITE_URL}/assets/icons/tiktok.png" alt="TikTok" width="44" height="44" style="width:44px; height:44px; display:block; border:0;" />
                          </a>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 26px 0;">
                      <tr>
                        <td style="background-color:#fbf8f1; border-left:3px solid #c8322b; border-radius:0 10px 10px 0; padding:16px 20px;">
                          <p style="margin:0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; line-height:1.6; color:#201e1b;">
                            Si tenés un minuto, <strong>respondé este mail</strong> y contanos desde dónde nos escuchás o qué canción te trajo hasta acá. Leemos todos los mensajes.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0 0 4px 0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:15px; line-height:1.5; color:#585249;">
                      Nos leemos pronto,
                    </p>
                    <p style="margin:0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:15px; font-weight:700; letter-spacing:2.4px; text-transform:uppercase; color:#141414;">
                      PARALEIA
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="mobile-pad" align="center" style="padding:26px 20px 10px 20px;">
              <p style="margin:0 0 14px 0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:12px; line-height:1.8;">
                <a href="${SITE_URL}/" target="_blank" style="color:#e9b72f; font-weight:700; text-decoration:none;">Web oficial de PARALEIA</a>
              </p>

              <p style="margin:0 0 8px 0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:11px; line-height:1.6; color:#8d867b;">
                Recibís este correo porque te suscribiste en paraleia.vercel.app.
              </p>

              <p style="margin:0 0 10px 0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:11px; line-height:1.6; color:#8d867b;">
                &copy; ${year} PARALEIA
              </p>

              <p style="margin:0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:11px; line-height:1.6; color:#8d867b;">
                Si preferís no recibir más novedades, respondé este mail pidiendo la baja.
              </p>
            </td>
          </tr>
        </table>

        <!--[if mso]>
        </td></tr>
        </table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildWelcomeText(name) {
  const greeting = name ? `Hola ${name},` : 'Hola,';
  return `${greeting}

Qué bueno que te sumaste. Gracias por dejar tu mail en nuestra web.

Desde acá te vamos a avisar antes que nadie cada vez que salga un nuevo single, cuando haya novedades del próximo disco y apenas se confirme una fecha en vivo, sea en Argentina o en España.

No vamos a llenar tu casilla con correos de relleno. Te escribimos solo cuando haya música nueva o una fecha concreta para compartir.

---
PARA EMPEZAR HOY: FIGURAS PERFECTAS

Nuestro nuevo single y el primer adelanto del próximo disco. Podés escucharlo en tu plataforma favorita y armar tu propia story con una frase de la canción:
${SINGLE_URL}

---
También nos encontrás acá:
- Spotify: https://open.spotify.com/artist/737T198kjU3hbvxpc2wnhC
- YouTube: https://www.youtube.com/@paraleiaoficial
- Instagram: https://instagram.com/paraleia
- Facebook: https://facebook.com/paraleiaok
- TikTok: https://www.tiktok.com/@paraleia

Si tenés un minuto, respondé este mail y contanos desde dónde nos escuchás o qué canción te trajo hasta acá. Leemos todos los mensajes.

Nos leemos pronto,
PARALEIA

Web oficial de PARALEIA: ${SITE_URL}/`;
}

async function addToMailchimp({ email, name, source }) {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  if (!apiKey || !listId) return { skipped: true };

  const dc = apiKey.split('-')[1];
  if (!dc) throw new Error('MAILCHIMP_API_KEY inválida (falta datacenter ej. -us21)');

  const subscriberHash = crypto.createHash('md5').update(email).digest('hex');
  const auth = 'Basic ' + Buffer.from(`anystring:${apiKey}`).toString('base64');
  const memberUrl = `https://${dc}.api.mailchimp.com/3.0/lists/${encodeURIComponent(listId)}/members/${subscriberHash}`;

  const payload = {
    email_address: email,
    status_if_new: 'subscribed',
  };
  if (name) {
    payload.merge_fields = { FNAME: name };
  }

  const res = await fetch(memberUrl, {
    method: 'PUT',
    headers: {
      Authorization: auth,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Mailchimp error (${res.status}): ${body}`);
  }

  // Etiqueta opcional de origen (no bloquea el registro si falla)
  const tagName = source === 'figuras-perfectas' ? 'figuras-perfectas' : 'web-paraleia';
  try {
    await fetch(`${memberUrl}/tags`, {
      method: 'POST',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags: [{ name: tagName, status: 'active' }],
      }),
    });
  } catch (_) {}

  return { ok: true };
}

async function sendWelcomeViaBrevo({ email, name }) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return { skipped: true };

  const senderEmail = process.env.SENDER_EMAIL || DEFAULT_SENDER_EMAIL;
  const senderName = process.env.SENDER_NAME || DEFAULT_SENDER_NAME;
  const replyToEmail = process.env.REPLY_TO_EMAIL || senderEmail;

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      replyTo: { name: senderName, email: replyToEmail },
      to: [name ? { email, name } : { email }],
      subject: 'Ya estás en la lista — PARALEIA',
      htmlContent: buildWelcomeHtml(name),
      textContent: buildWelcomeText(name),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo error (${res.status}): ${body}`);
  }

  return { ok: true };
}

async function forwardToWeb3Forms({ email, name, source }) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY || FALLBACK_WEB3FORMS_KEY;
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject:
        source === 'figuras-perfectas'
          ? 'Nuevo registro de novedades — Figuras Perfectas (PARALEIA)'
          : 'Nuevo registro de novedades — Web PARALEIA',
      from_name: 'Web PARALEIA · Novedades',
      name: name || '(sin nombre)',
      email,
      message: `Nuevo suscriptor desde ${source || 'web-paraleia'}.`,
    }),
  });
  const data = await res.json();
  if (!data || !data.success) {
    throw new Error('Web3Forms fallback failed');
  }
  return { ok: true };
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (_) {
      body = {};
    }
  }
  body = body || {};

  // Honeypot antispam
  if (body.botcheck) {
    return res.status(200).json({ ok: true });
  }

  const email = String(body.email || '').trim().toLowerCase();
  const name = cleanName(body.name);
  const source = String(body.source || 'web-paraleia').slice(0, 40);

  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }

  const hasMailchimp = Boolean(process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID);
  const hasBrevo = Boolean(process.env.BREVO_API_KEY);

  // Si todavía no cargaste las API keys en Vercel, no perdemos el registro: cae a Web3Forms
  if (!hasMailchimp && !hasBrevo) {
    try {
      await forwardToWeb3Forms({ email, name, source });
      return res.status(200).json({ ok: true, mode: 'fallback_web3forms' });
    } catch (err) {
      console.error('Fallback Web3Forms error:', err);
      return res.status(502).json({ ok: false, error: 'delivery_failed' });
    }
  }

  const results = { mailchimp: false, welcomeEmail: false };
  const errors = [];

  await Promise.all([
    addToMailchimp({ email, name, source })
      .then((r) => {
        if (r.ok) results.mailchimp = true;
      })
      .catch((err) => {
        console.error(err);
        errors.push('mailchimp');
      }),
    sendWelcomeViaBrevo({ email, name })
      .then((r) => {
        if (r.ok) results.welcomeEmail = true;
      })
      .catch((err) => {
        console.error(err);
        errors.push('brevo');
      }),
  ]);

  if (!results.mailchimp && !results.welcomeEmail) {
    return res.status(502).json({ ok: false, error: 'upstream_failed' });
  }

  return res.status(200).json({
    ok: true,
    mailchimp: results.mailchimp,
    welcomeEmail: results.welcomeEmail,
  });
};
