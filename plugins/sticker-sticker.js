import { sticker, addExif } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'

const handler = async (m, { conn, args }) => {
  // Aseguramos emojis globales
  const emojis = global.emojis || '🖼️';

  // ==========================================
  // 🛡️ ZONA DE PROTECCIÓN ANTI-BAN 🛡️
  // ==========================================
  // 1. Simular "Escribiendo..."
  // Da la sensación de que el bot está procesando y convirtiendo la imagen
  await conn.sendPresenceUpdate('composing', m.chat);

  // 2. Calcular tiempo de espera (2 a 4 segundos)
  const min = 2000;
  const max = 4000;
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;

  // 3. Esperar el tiempo calculado
  await new Promise(resolve => setTimeout(resolve, delay));
  // ==========================================

  let q = m.quoted || m
  let mime = ((q.msg || q).mimetype || q.mediaType || '').toLowerCase()
  let stiker

  try {
    if (mime === 'image/webp') {
      const media = await q.download?.()
      if (!media) return m.reply('*⚠️ Responde a un sticker válido.*')
      stiker = await addExif(media, global.packN, global.authN)
      return await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    }

    if (/^(image|video)\//.test(mime)) {
      const media = await q.download?.()
      if (!media) return m.reply('*⚠️ Responde a una imagen o video.*')

      try {
        stiker = await sticker(media, false, global.packN, global.authN)
      } catch {
        const url = mime.startsWith('image/') 
          ? await uploadImage(media) 
          : await uploadFile(media)
        stiker = await sticker(false, url, global.packN, global.authN)
      }
    } else if (args[0]) {
      stiker = await sticker(false, args[0], global.packN, global.authN)
    } else {
      return m.reply(`*${emojis} Responde a un vídeo o imagen la cual será convertido en sticker, debe responder al archivo multimedia o enviarlo junto al comando.*`)
    }

    await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
  } catch (e) {
    console.error(e)
    m.reply('*⚠️ Ocurrió un error al crear el sticker, inténtalo de nuevo.*')
  }
}

handler.help = ['s', 'sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']

export default handler