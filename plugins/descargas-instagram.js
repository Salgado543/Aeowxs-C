import { igdl } from "ruhend-scraper"

let handler = async (m, { args, conn }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `*${emojis} Ingresa un link de Instagram*`, m, rcanal)
  }
  try {
    await m.react('⏳️')
    let res = await igdl(args[0])
    let data = res.data
    for (let media of data) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      await conn.sendFile(m.chat, media.url, 'instagram.mp4', '*_DESCARGAS - INSTAGRAM_*\n\n> ${dev}')
    }
  } catch {
    await m.react('❌')
    conn.reply(m.chat, '*Ocurrió un error.*')
  }
}

handler.command = ['instagram', 'ig', 'instagram2', 'ig2', 'igdl']
handler.tags = ['dl']
handler.help = ['instagram']

export default handler