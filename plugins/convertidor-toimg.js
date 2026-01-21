import { webp2png } from '../lib/webp2mp4.js';

const handler = async (m, { conn, usedPrefix, command }) => {
  // Aseguramos emojis por si no están definidos globalmente
  const emojis = global.emojis || '🖼️';

  try {
    // 1. VALIDACIÓN RÁPIDA
    // Si no cumple las condiciones básicas, respondemos rápido sin delay
    if (!m.quoted) return await conn.reply(m.chat, `*${emojis} Responda a un sticker para convertir en imagen.*`, m);

    const q = m.quoted;
    const mime = q.mimetype || '';

    if (!mime.includes('webp')) throw '*⚠️ El archivo adjunto no es un sticker.*';

    // ==========================================
    // 🛡️ ZONA DE PROTECCIÓN ANTI-BAN 🛡️
    // ==========================================
    
    // 2. Simular "Escribiendo..."
    // Esto es muy útil aquí porque la conversión de imagen se siente como un proceso que toma tiempo.
    await conn.sendPresenceUpdate('composing', m.chat);

    // 3. Calcular tiempo de espera (2 a 4 segundos)
    const min = 2000;
    const max = 4000;
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;

    // 4. Esperar el tiempo calculado
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // ==========================================
    // 🏁 FIN DE PROTECCIÓN
    // ==========================================

    const media = await q.download();
    if (!media) throw '*✖️ No se pudo descargar el sticker.*';

    // La conversión real ocurre aquí
    const out = await webp2png(media).catch(() => null);
    if (!out || out.length === 0) throw '*✖️ No se pudo convertir el sticker en imagen.*';

    await conn.sendFile(m.chat, out, 'sticker.png', '*☁️ Aquí tienes*', m);
    
  } catch (error) {
    console.error(error);
    m.reply(typeof error === 'string' ? error : '*✖️ Ocurrió un error inesperado.*');
  }
};

handler.help = ['toimg'];
handler.tags = ['converter'];
handler.command = ['toimg', 'jpg', 'img'];

export default handler;