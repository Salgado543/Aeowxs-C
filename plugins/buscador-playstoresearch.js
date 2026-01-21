import gplay from "google-play-scraper";

let handler = async (m, { conn, text }) => {
  // Aseguramos emojis globales por si acaso
  const emojis = global.emojis || '🔎';

  // 1. VALIDACIÓN RÁPIDA
  if (!text) {
    return conn.reply(m.chat, `*${emojis} Ingresa el nombre de la app que quieras buscar.*\n> *Ejemplo:* WhatsApp`, m);
  }

  // ==========================================
  // 🛡️ ZONA DE PROTECCIÓN ANTI-BAN 🛡️
  // ==========================================
  
  // 2. Simular "Escribiendo..."
  await conn.sendPresenceUpdate('composing', m.chat);

  // 3. Calcular tiempo de espera (3 a 5 segundos)
  // Como busca en Google Play, la demora está justificada
  const min = 3000;
  const max = 5000;
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;

  // 4. Esperar el tiempo calculado
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // ==========================================
  // 🏁 FIN DE PROTECCIÓN
  // ==========================================

  try {
    let res = await gplay.search({ term: text });
    
    if (!res.length) {
      return conn.reply(m.chat, "*⚠️ No se encontraron resultados, intenta con otra búsqueda*", m); 
    }

    // Preparar la miniatura con seguridad
    let thumbData = null;
    try {
        thumbData = (await conn.getFile(res[0].icon)).data;
    } catch (e) {
        // Si falla la descarga de la imagen, no rompemos el comando
        console.warn('No se pudo descargar el icono de la app');
    }

    let opt = {
      contextInfo: {
        externalAdReply: {
          title: res[0].title,
          body: res[0].summary,
          thumbnail: thumbData,
          sourceUrl: res[0].url,
          mediaType: 1, // Añadido para asegurar compatibilidad
          renderLargerThumbnail: true // Hace que se vea mejor
        },
      },
    };

    // Formatear el texto
    const listaApps = res.map(
      (v) =>
        `*🏷️ Resultado:* ${v.title}
*🫧 Desarrollador:* ${v.developer}
*💸 Precio:* ${v.priceText || "Gratis"}
*📈 Puntuación:* ${v.scoreText || "Sin Puntuación"}
*⛓️ Link:* ${v.url}`
    ).join("\n\n");

    // Enviar respuesta
    await conn.reply(m.chat, listaApps, m, opt); 

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, "*⚠️ Ocurrió un error al buscar en la Play Store.*", m);
  }
};

handler.help = ['playstoresearch']; 
handler.tags = ['search'];
handler.command = /^(playstoresearch|pssearch)$/i; 

export default handler;