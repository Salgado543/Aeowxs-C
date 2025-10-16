import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let groupSize = participants.length
  if (m.messageStubType == 27) groupSize++
  else if (m.messageStubType == 28 || m.messageStubType == 32) groupSize--

  const userId = m.messageStubParameters[0]
  const username = `@${userId.split('@')[0]}`
  const ppUrl = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
  const img = await (await fetch(ppUrl)).buffer()
  const chat = global.db.data.chats[m.chat]

  let txt = `¡Bienvenid@! ${await conn.getName(userId) || "𝖴𝗌𝗎𝖺𝗋𝗂𝗈"}`
  let txt1 = `¡Adiós! ${await conn.getName(userId) || "𝖴𝗌𝗎𝖺𝗋𝗂𝗈"}`
  let txt2 = `Se salió ${await conn.getName(userId) || "𝖴𝗌𝗎𝖺𝗋𝗂𝗈"}`
  let sunflare = author

  if (chat.welcome && m.messageStubType == 27) {
    const groupName = groupMetadata.subject
    const groupDesc = groupMetadata.desc || 'sin descripción'

    let bienvenida = chat.sWelcome
      ? chat.sWelcome
          .replace(/@user/g, username)
          .replace(/@group/g, groupName)
          .replace(/@desc/g, groupDesc)
      : `*¡Welcome to group!*\n─୨ ${username}\n\n˚.✿ 𝖣𝗂𝗌𝖿𝗋𝗎𝗍𝖺 𝖽𝖾 𝗍𝗎 𝖾𝗌𝗍𝖺𝖽𝗂́𝖺 𝖾𝗇 𝖾𝗅 𝗀𝗋𝗎𝗉𝗈. 🙌🏻\n\n> ${dev}`

    await conn.sendShadow(m.chat, txt, sunflare, bienvenida, img, img, ig, estilo, true, [userId])
  }

  if (chat.welcome && m.messageStubType == 28) {
    const groupName = groupMetadata.subject
    const groupDesc = groupMetadata.desc || 'sin descripción'

    let ban = chat.sKick
      ? chat.sKick
          .replace(/@user/g, username)
          .replace(/@group/g, groupName)
          .replace(/@desc/g, groupDesc)
      : `*¡Removed from the group!*\n─୨ ${username} \n\n𐙚˚ 𝖤𝗑𝗉𝗎𝗅𝗌𝖺𝖽𝗈 𝗉𝗈𝗋 𝗇𝖾𝗀𝗋𝗑 😹\n✎ 𝖮𝗃𝖺𝗅𝖺́ 𝗅𝖺 𝖾𝗅𝗂𝗆𝗂𝗇𝖺𝖼𝗂𝗈́𝗇 𝗅𝖾 𝗁𝖺𝗀𝖺 𝗋𝖾𝖿𝗅𝖾𝗑𝗂𝗈𝗇𝖺𝗋 🙂‍↔️\n\n> ${dev}`

    await conn.sendShadow(m.chat, txt1,
      sunflare, ban, img, img, ig, estilo, true, [userId])
  }

  if (chat.welcome && m.messageStubType == 32) {
    const groupName = groupMetadata.subject
    const groupDesc = groupMetadata.desc || 'sin descripción'

    let bye = chat.sBye
      ? chat.sBye
          .replace(/@user/g, username)
          .replace(/@group/g, groupName)
          .replace(/@desc/g, groupDesc)
      : `*¡Leave the group!*\n─୨ ${username} \n\n˚₊·͟͟͟͟͟͟͞͞͞͞͞͞➳❥  𝖮𝗃𝖺𝗅𝖺́ 𝗅𝖾 𝖺𝗋𝗋𝗈𝗅𝗅𝖾 𝗎𝗇 𝗍𝗋𝖾𝗇 𝗉𝗈𝗋 𝖺𝗅𝗍𝖺 𝗉𝗎𝗍𝗂𝗍𝖺.\n˚✦՞𐦯 𝖭𝗈 𝖺𝗀𝗎𝖺𝗇𝗍𝗈́ 𝗅𝖺 𝖿𝗎𝖼𝗄𝗂𝗇𝗀 𝗏𝗂𝖻𝗋𝖺 👻\n\n> ${dev}`

    await conn.sendShadow(m.chat, txt2, sunflare, bye, img, img, ig, estilo, true, [userId])
  }
}