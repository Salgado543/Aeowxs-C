import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let groupSize = participants.length
  if (m.messageStubType == 27) groupSize++
  else if (m.messageStubType == 28 || m.messageStubType == 32) groupSize--

  const userId = m.messageStubParameters[0]
  const username = `@${userId.split('@')[0]}`
  
  // URL de imagen por defecto si falla la del perfil
  const ppUrl = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
  
  // Descargamos el buffer de la imagen
  let img
  try {
      img = await (await fetch(ppUrl)).buffer()
  } catch (e) {
      img = await (await fetch('https://files.catbox.moe/xr2m6u.jpg')).buffer()
  }
  
  const chat = global.db.data.chats[m.chat] || {}
  
  // Títulos simples para concatenar
  let tituloBienvenida = `¡Bienvenid@! ${await conn.getName(userId) || "Usuario"}`
  let tituloAdios = `¡Adiós! ${await conn.getName(userId) || "Usuario"}`
  let tituloSalida = `Se salió ${await conn.getName(userId) || "Usuario"}`
  
  // Variables de reemplazo comunes
  const groupName = groupMetadata.subject
  const groupDesc = groupMetadata.desc || 'sin descripción'

  // ==========================================
  // 🟢 WELCOME (TIPO 27) - Usa 'chat.welcome'
  // ==========================================
  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = chat.sWelcome
      ? chat.sWelcome
          .replace(/@user/g, username)
          .replace(/@group/g, groupName)
          .replace(/@desc/g, groupDesc)
      : `*¡Welcome to group!*\n─୨ ${username}\n\n˚.✿ Disfruta de tu estadía en el grupo. 🙌🏻\n\n> ${global.dev || ''}`

    // Usamos sendMessage estándar para compatibilidad con iPhone
    await conn.sendMessage(m.chat, { 
        image: img, 
        caption: `${tituloBienvenida}\n\n${bienvenida}`, 
        mentions: [userId] 
    }, { quoted: null }) // Puedes poner 'quoted: m' si quieres citar el mensaje de sistema
  }

  // ==========================================
  // 🔴 BYE / DESPEDIDAS - Usa 'chat.bye'
  // ==========================================
  
  // --- KICK / EXPULSIÓN (TIPO 28) ---
  if (chat.bye && m.messageStubType == 28) {
    let ban = chat.sKick
      ? chat.sKick
          .replace(/@user/g, username)
          .replace(/@group/g, groupName)
          .replace(/@desc/g, groupDesc)
      : `*¡Removed from the group!*\n─୨ ${username} \n\n𐙚˚ Expulsado por negrx 😹\n✎ Ojalá la eliminación le haga reflexionar 🙂‍↔️\n\n> ${global.dev || ''}`

    await conn.sendMessage(m.chat, { 
        image: img, 
        caption: `${tituloAdios}\n\n${ban}`, 
        mentions: [userId] 
    }, { quoted: null })
  }

  // --- LEAVE / SALIDA VOLUNTARIA (TIPO 32) ---
  if (chat.bye && m.messageStubType == 32) {
    let bye = chat.sBye
      ? chat.sBye
          .replace(/@user/g, username)
          .replace(/@group/g, groupName)
          .replace(/@desc/g, groupDesc)
      : `*¡Leave the group!*\n─୨ ${username} \n\n˚₊·͟͟͟͟͟͟͞͞͞͞͞͞➳❥  Ojalá le arrolle un tren por alta putita.\n˚✦՞𐦯 No aguantó la fucking vibra 👻\n\n> ${global.dev || ''}`

    await conn.sendMessage(m.chat, { 
        image: img, 
        caption: `${tituloSalida}\n\n${bye}`, 
        mentions: [userId] 
    }, { quoted: null })
  }
}