import db from '../lib/database.js'

const img = 'https://files.catbox.moe/zggh6y.jpg'

const fkontak2 = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo"
    },
    message: {
      locationMessage: {
        name: `Banco - ${botname}`,
        jpegThumbnail: await (await fetch('https://files.catbox.moe/a4a2yz.png')).buffer(),
        vcard:
          "BEGIN:VCARD\n" +
          "VERSION:3.0\n" +
          "N:;Unlimited;;;\n" +
          "FN:Unlimited\n" +
          "ORG:Unlimited\n" +
          "TITLE:\n" +
          "item1.TEL;waid=19709001746:+1 (970) 900-1746\n" +
          "item1.X-ABLabel:Unlimited\n" +
          "X-WA-BIZ-DESCRIPTION:ofc\n" +
          "X-WA-BIZ-NAME:Unlimited\n" +
          "END:VCARD"
      }
    },
    participant: "0@s.whatsapp.net"
  };

let handler = async (m, { conn, usedPrefix }) => {
  const who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
if (!who || who === conn.user.jid)
  return m.reply(`*${emojis} Debes mencionar o responder a un usuario válido.*`)

  if (!(who in global.db.data.users)) return m.reply(`*⚠️ El usuario no está registrado en la base de datos.*`)

  const user = global.db.data.users[who]
  const name = await conn.getName(who)
  const fecha = new Date().toLocaleString('es-PE')

  const txt = `🏦 *Bienvenido al Banco de Coins*
> Cuenta vinculada a: ${who === m.sender ? name : `@${who.split('@')[0]}`}

*💼 Detalles actuales:*
🪙 *Cartera:* ${user.coins}
🏦 *Banco:* ${user.bank}
💫 *Experiencia:* ${user.exp}
🆙 *Nivel:* ${user.level}
⚜️ *Role:* ${user.role}

> Consulta tus finanzas, sube de nivel y gana recompensas.`.trim()

  const buttons = [
    { buttonId: `${usedPrefix}retirar all`, buttonText: { displayText: '💰 Retirar Todo' }, type: 1 },
    { buttonId: `${usedPrefix}d all`, buttonText: { displayText: '🏦 Depositar Todo' }, type: 1 }
  ]

  await conn.sendMessage(m.chat, {
    image: { url: img },
    caption: txt,
    footer: dev,
    buttons,
    mentions: [who],
    headerType: 4
  }, { quoted: m })
}

/*
  await conn.sendFile(m.chat, img, 'perfil.jpg', txt, m, null, {
    mentions: [who]
  })
}*/

handler.help = ['bank']
handler.tags = ['rpg']
handler.command = ['bank', 'banco']
handler.register = true
handler.group = true

export default handler