import yts from 'yt-search'

let handler = async(m, { conn, text, usedPrefix, command }) => {
  // Variables globales de seguridad
  const emojis = global.emojis || '🔎';
  const dev = global.dev || '';

  // 1. VALIDACIÓN RÁPIDA
  if (!text) return conn.reply(m.chat, `*${emojis} Ingresa un texto para buscar en Youtube.*\n> *Ejemplo:* ${usedPrefix + command} Cumbias`, m);

  // ==========================================
  // 🛡️ ZONA DE PROTECCIÓN ANTI-BAN 🛡️
  // ==========================================
  
  // 2. Simular "Escribiendo..."
  // Mantiene el estado activo mientras "busca"
  await conn.sendPresenceUpdate('composing', m.chat);

  // 3. Calcular tiempo de espera (3 a 5 segundos)
  // Las búsquedas de YT suelen tardar, así que este delay es muy seguro
  const min = 3000;
  const max = 5000;
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;

  // 4. Esperar el tiempo calculado
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // ==========================================
  // 🏁 FIN DE PROTECCIÓN
  // ==========================================

  try {
    // Reacción visual AHORA, después de "pensar"
    await m.react('🔎');

    let results = await yts(text)
    let tes = results.videos

    if (!tes.length) throw '⚠️ No se encontraron resultados.'

    let ms = tes.map(v => `
° ${v.title}

⏰ *\`Duración:\`* ${v.timestamp}
☁️ *\`Publicado:\`* ${v.ago}
👀 *\`Vistas:\`* ${v.views.toLocaleString()}
⛓️ *\`Enlace:\`* ${v.url}
`.trim()).join('\n________________________\n\n')

    let teks = `*Search - Youtube*\n\n${ms}`
    teks += `\n\n> ${dev}`

    // Usamos await para asegurar que el mensaje se envíe antes de terminar la función
    await conn.sendFile(m.chat, tes[0].image, 'yts.jpeg', teks, m)

  } catch (e) {
    console.error(e)
    m.reply('⚠️ Ocurrió un error al buscar en YouTube.')
  }
}

handler.help = ['yts'] 
handler.tags = ['search']
handler.command = ['ytsearch', 'yts']

export default handler