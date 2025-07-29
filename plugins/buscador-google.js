import { downloadContentFromMessage } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  const quoted = m.quoted && m.quoted.message && m.quoted.message.imageMessage
  const direct = m.message && m.message.imageMessage
  if (!quoted && !direct) 
    return await conn.reply(m.chat`${emojis} Envia la imágen junto al comando para cambiar la imagen de perfil del bot.*`, m, rcanal)

  const msg = quoted ? m.quoted : m
  const media = msg.message.imageMessage
  const stream = await downloadContentFromMessage(media, 'image')

  await conn.updateProfilePicture(conn.user.jid, { stream })
  await conn.sendMessage(
    m.chat,
    { text: '✅ La imágen de bot fue actualizada exitosamente?*' },
    { quoted: fkontak }
  )
}

handler.tags = ['owner']
handler.help = ['setppbot']
handler.command = ['setppbot','cambiarfotobot']
handler.owner = true