
import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args }) => {
  let stiker = false
  let q = m.quoted || m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  const mensajeError = `*${emojis} La conversión a fallado, responde a un vídeo o imagen la cual será convertido en sticker, debe responder al archivo multimedia o enviarlo junto al comando.*`

  try {
    if (mime.startsWith('image/') || mime.startsWith('video/') || mime === 'image/webp') {
      let media = await q.download?.()
      if (!media) return conn.reply(m.chat, mensajeError, m, rcanal)

      try {
        stiker = await sticker(media, false, global.packname, global.author)
      } catch (e) {
        console.error('❌ Error al generar sticker directo:', e)
        let url

        if (mime === 'image/webp') url = await webp2png(media)
        else if (mime.startsWith('image/')) url = await uploadImage(media)
        else if (mime.startsWith('video/')) url = await uploadFile(media)

        if (!url || typeof url !== 'string' || !isValidUrl(url)) {
          return conn.reply(m.chat, '❌ No se pudo obtener una URL válida del archivo.', m)
        }

        stiker = await sticker(false, url, global.packname, global.author)
      }

    } else if (args[0]) {
      if (!isValidUrl(args[0])) return conn.reply(m.chat, '❌ La *URL* es inválida.', m)
      stiker = await sticker(false, args[0], global.packname, global.author)
    } else {
      return conn.reply(m.chat, mensajeError, m, rcanal)
    }

  } catch (e) {
    console.error('❌ Error general:', e)
    stiker = false
  }

  if (stiker && Buffer.isBuffer(stiker)) {
    await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
  } else {
    conn.reply(m.chat, '❌ No se pudo generar el sticker. Asegúrate de que el archivo sea válido.', m)
  }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']

export default handler

function isValidUrl(text) {
  return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|mp4)$/i.test(text)
}