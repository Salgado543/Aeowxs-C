
let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

export async function before(m, { isAdmin, isBotAdmin, conn }) {
  if (m.isBaileys && m.fromMe) return !0
  if (!m.isGroup) return !1

  // Ignorar mensajes enviados por el mismo bot
  if (m.sender === conn.user.jid) return !0

  let chat = global.db.data.chats[m.chat]
  let delet = m.key.participant
  let bang = m.key.id
  let bot = global.db.data.settings[this.user.jid] || {}
  const isGroupLink = linkRegex.exec(m.text)
  const grupo = `https://chat.whatsapp.com`

  if (chat.antiLink && isGroupLink && !isAdmin) {
    if (isBotAdmin) {
      const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
      if (m.text.includes(linkThisGroup)) return !0
    }
    await conn.reply(m.chat, `*⚠️ ${await this.getName(m.sender)} Los enlaces de WhatsApp no están permitidos en este chat por lo cual serás eliminado*`, rcanal)

    if (!isBotAdmin)
      return conn.reply(m.chat, `*${emojis} No soy admin, no puedo eliminar intrusos*`, m, rcanal)
    if (isBotAdmin) {
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    } else if (!bot.restrict) {
      return conn.reply(m.chat, `*${emoji} Esta característica está desactivada*`, m, rcanal)
    }
  }

  return !0
}