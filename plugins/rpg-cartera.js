let handler = async (m, {conn, usedPrefix}) => {
let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
if (who == conn.user.jid) return m.reply('*⚠️ No puedes consultar el saldo del bot.*')
if (!(who in global.db.data.users)) return conn.reply(m.chat, '*⚠️ El usuario no se encuentra en mi base de Datos.*', m)
let user = global.db.data.users[who]
await m.reply(`${who == m.sender ? `*${emojis} Tienes ${user.coins} ${moneda} en tu Cartera*` : `*${emojis} El usuario @${who.split('@')[0]} tiene ${user.coins} ${moneda} en su Cartera*`}. `, null, { mentions: [who] })}

handler.help = ['coins', 'cartera']
handler.tags = ['rpg']
handler.command = ['wallet', 'cartera', 'shadowcoins', 'coins']
handler.register = true 

export default handler