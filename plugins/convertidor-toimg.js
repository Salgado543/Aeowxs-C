import { webp2png } from '../lib/webp2mp4.js';

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    if (!m.quoted) return await conn.reply(m.chat, `*${emojis} Responda a un sticker con el comando ${usedPrefix + command} para convertirlo en imagen.*`, m, rcanal);

    const q = m.quoted;
    const mime = q.mimetype || '';

    if (!mime.includes('webp')) throw '*El archivo adjunto no es un sticker.*';

    const media = await q.download();
    if (!media) throw '*No se pudo descargar el sticker.*';

    const out = await webp2png(media).catch(() => null);
    if (!out || out.length === 0) throw '*No se pudo convertir el sticker en imagen.*';

    await conn.sendFile(m.chat, out, 'sticker.png', '*Aquí tienes tu imagen!*', m);
  } catch (error) {
    m.reply(error);
  }
};

handler.help = ['toimg'];
handler.tags = ['converter'];
handler.command = ['toimg', 'jpg', 'img'];

export default handler;