/*
import yts from 'yt-search'


let handler = async(m, { conn, text, usedPrefix, command }) => {

  if (!text) return conn.reply(m.chat, `*${emojis} Ingresa un texto para buscar en Youtube.*\n> *Ejemplo:* .${command} Coqueta - Grupo Frontera`, m, rcanal);

 await m.react('🔎');
  let results = await yts(text)
  let tes = results.videos

  if (!tes.length) throw '⚠️ No se encontraron resultados.'

  let ms = tes.map(v => `
° ${v.title}

⏰ *Duración:* ${v.timestamp}
☁️ *Publicado:* ${v.ago}
👀 *Vistas:* ${v.views.toLocaleString()}
⛓️ *Enlace* ${v.url}
`.trim()).join('\n________________________\n\n')

  let teks = `*Search - Youtube*\n\n${ms}`
  teks += `\n\n> ${club}`

  conn.sendFile(m.chat, tes[0].image, 'yts.jpeg', teks, m)
}

handler.help = ['yts2'] 
handler.tags = ['search']
handler.command = ['ytsearch', 'yts']

export default handler*/

import yts from 'yt-search'

const emojis = '🎵';
const club = 'Shadow Bot';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `*${emojis} Ingresa un texto para buscar en Youtube.*\n> *Ejemplo:* .${command} Coqueta - Grupo Frontera`, m);
  }

  try { await m.react('🔎') } catch (e) {}

  let results
  try {
    results = await yts(text)
  } catch (e) {
    console.error(e)
    return conn.reply(m.chat, '❌ Error al buscar en YouTube.', m)
  }

  let tes = results.videos
  if (!tes.length) return conn.reply(m.chat, '⚠️ No se encontraron resultados.', m)

  let ms = tes.map(v => `
° ${v.title}
⏰ *Duración:* ${v.timestamp}
☁️ *Publicado:* ${v.ago}
👀 *Vistas:* ${v.views.toLocaleString()}
⛓️ *Enlace:* ${v.url}
`.trim()).join('\n________________________\n\n')

  let teks = `*🔎 Resultados de búsqueda en YouTube:*\n\n${ms}`
  teks += `\n\n> ${club}`

  conn.sendFile(m.chat, tes[0].image, 'yts.jpeg', teks, m)
}

handler.help = ['ytsearch']
handler.tags = ['search']
handler.command = ['ytsearch', 'yts']

export default handler
