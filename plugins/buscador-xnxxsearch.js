import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply(hotw);
    }

  if (!text) conn reply(m.chat, `*${emojis} Ingresa el texto de lo que quieres buscar en Xnxx*`, m, rcanal)

  let response = await fetch(`https://api.agatz.xyz/api/xnxx?message=${text}`)
  let res = await response.json()

  if (res.status !== 200) throw m.reply(`API Error: ${res.creator}`)

  let resultText = ''
  for (let i = 0; i < res.data.result.length; i++) {
    let result = res.data.result[i]
    let hasil = `• *Titulo:* ${result.title}\n• *Info:* ${result.info}\n• *Link:* ${result.link}\n`
    resultText += hasil + '\n'
  }

  await conn.reply(m.chat, '*⏳ Espere un momento...*', m)

  conn.sendMessage(m.chat, {
    text: resultText,
    contextInfo: {
      externalAdReply: {
        title: `Xnxx Videos`,
        body: `Jota Bot`,
        thumbnailUrl: "https://pomf2.lain.la/f/kro5qrjk.jpg",
        sourceUrl: "https://xxnx.com",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  })
}

handler.command = ['xnxxsearch', 'xnxxs']
handler.help = ['xnxxsearch']
handler.tags = ['buscador']
//handler.register = true

export default handler