import { downloadContentFromMessage } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
  const quoted = m.quoted?.message?.imageMessage
  const direct = m.message?.imageMessage

  if (!quoted && !direct) {
    return await conn.reply(
      m.chat,
      `*${emojis} Envia una imagen más el comando para actualizar la foto de perfil del bot.*`,
      m, rcanal
    )
  }

  const msg = quoted ? m.quoted : m
  const media = msg.message.imageMessage
  const stream = await downloadContentFromMessage(media, 'image')

  await conn.updateProfilePicture(conn.user.jid, { stream })
  await conn.sendMessage(
    m.chat,
    { text: '✅ Imagen de perfil del bot actualizada correctamente.' },
    { quoted: m }
  )
}

handler.tags = ['owner']
handler.help = ['setppbot']
handler.command = ['setppbot', 'cambiarfotobot']
handler.owner = true

export default handler