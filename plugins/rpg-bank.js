import db from '../lib/database.js'

const img = 'https://files.catbox.moe/zggh6y.jpg'

let handler = async (m, { conn, usedPrefix }) => {
  const who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
  if (!who || who === conn.user.jid) return m.react('✖️')

  if (!(who in global.db.data.users)) return m.reply(`*⚠️ El usuario no está registrado en la base de datos.*`)

  const user = global.db.data.users[who]
  const name = await conn.getName(who)
  const fecha = new Date().toLocaleString('es-PE')

  const txt = `🏦 *Bienvenido al Banco de Coins*  
> Cuenta vinculada a: {who === m.sender ? name : `@${who.split('@')[0]}`}

*💼 Detalles actuales:*
🪙 *Cartera:* ${user.coins}
🏦 *Banco:* ${user.bank}
💫 *Experiencia:* ${user.exp}
🆙 *Nivel:* ${user.level}
⚜️ *Role:* ${user.role}

> ${fecha}
>Consulta tus finanzas, sube de nivel y gana recompensas.`.trim()

  const buttons = [
    { buttonId: `${usedPrefix}retirar all`, buttonText: { displayText: '💰 Retirar Todo' }, type: 1 },
    { buttonId: `${usedPrefix}d all`, buttonText: { displayText: '🏦 Depositar Todo' }, type: 1 }
  ]

  await conn.sendMessage(m.chat, {
    image: { url: img },
    caption: txt,
    footer: botname,
    buttons,
    mentions: [who],
    headerType: 4
  }, { quoted: m })
}

handler.help = ['bank']
handler.tags = ['rpg']
handler.command = ['bank', 'banco']
handler.register = true
handler.group = true

export default handler