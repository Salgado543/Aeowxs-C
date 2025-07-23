let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

export async function before(m, { isAdmin, isBotAdmin }) {
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
let delet = m.key.participant
let bang = m.key.id
let taguser = '@' + m.sender.split('@')[0]

let bot = global.db.data.settings[this.user.jid] || {}
const isGroupLink = linkRegex.exec(m.text)
const grupo = `https://chat.whatsapp.com`

if (isAdmin && chat.antiLink && m.text.includes(grupo)) return !0

if (chat.antiLink && isGroupLink && !isAdmin) {
if (isBotAdmin) {
const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
if (m.text.includes(linkThisGroup)) return !0
}

await conn.sendMessage(m.chat, {
  text: `*${emojis} ${taguser} los enlaces de WhatsApp no están permitidos en este chat, por lo cual serás eliminado.*`,
  mentions: [m.sender]
})

if (!isBotAdmin) return conn.reply(m.chat, `*${emojis} No soy admin, no puedo eliminar intrusos*`)
if (isBotAdmin) {
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
} else if (!bot.restrict) return conn.reply(m.chat, `*${emojis} Esta característica esta desactivada*`, m, rcanal, )
}
return !0

}