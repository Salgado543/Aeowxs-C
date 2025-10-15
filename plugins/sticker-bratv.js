
import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    return conn.reply(m.chat, `*${emojis} Ingresa un texto para realizar tu sticker animado de Brat.*\n> *Ejemplo:* ${usedPrefix + command} Hello World`, m)
  }

  m.react('⏳')

  try {
    let url = `https://apizell.web.id/tools/bratanimate?q=${encodeURIComponent(text)}`
    let res = await axios.get(url, { responseType: 'arraybuffer' })

    let contentType = res.headers['content-type'] || ''

    if (!['image/gif', 'video/mp4', 'application/octet-stream'].includes(contentType)) {
      throw new Error(`Contenido inesperado: ${contentType}`)
    }

    let bratSticker = await sticker(res.data, null, global.packN, global.authN)

    await conn.sendMessage(m.chat, { sticker: bratSticker }, { quoted: m })
    m.react('✅')
  } catch (err) {
    console.error(err)
    m.react('✖️')
    m.reply(`*✖️ Error:* ${err.message}`)
  }
}

handler.help = ['bratvid']
handler.command = ['bratvid', 'bratv']
handler.tags = ['sticker']

export default handler