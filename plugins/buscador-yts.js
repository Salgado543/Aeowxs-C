import yts from 'yt-search'


let handler = async(m, { conn, text, usedPrefix, command }) => {

  if (!text) return conn.reply(m.chat, `*${xsearch} Por favor, ingresa un texto para buscar en Youtube.*\n> *\`Ejemplo:\`* .${command} Amorfoda`, m);

 await m.react('🔎');
  let results = await yts(text)
  let tes = results.videos

  if (!tes.length) throw '```⚠️ No se encontraron resultados.```'

  let ms = tes.map(v => `
° ${v.title}

⏰ *Duración:* ${v.timestamp}
☁️ *\`Publicado:* ${v.ago}
👀 *Vistas:* ${v.views.toLocaleString()}
⛓️ *Enlace`* ${v.url}
`.trim()).join('\n________________________\n\n')

  let teks = `*Search - Youtube*\n\n${ms}`
  teks += `\n\n> ${club}`

  conn.sendFile(m.chat, tes[0].image, 'yts.jpeg', teks, m)
}

handler.help = ['yts2'] 
handler.tags = ['search']
handler.command = ['ytsearch2', 'yts2']

export default handler
