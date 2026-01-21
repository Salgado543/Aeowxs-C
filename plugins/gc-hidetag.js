import MessageType from '@whiskeysockets/baileys'
import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, participants }) => {
  // ==========================================
  // 🛡️ ZONA DE PROTECCIÓN ANTI-BAN (HIDETAG) 🛡️
  // ==========================================
  
  // 1. Simular "Escribiendo..."
  // Simula que estás escribiendo el aviso manualmente.
  await conn.sendPresenceUpdate('composing', m.chat);

  // 2. Calcular tiempo de espera (3 a 6 segundos)
  // Al ser una mención oculta para todos, un delay ayuda a evitar detección de spam instantáneo.
  const min = 3000;
  const max = 6000;
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;

  // 3. Esperar el tiempo calculado
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // ==========================================
  // 🏁 FIN DE PROTECCIÓN
  // ==========================================

  let users = participants.map(u => conn.decodeJid(u.id))
  let q = m.quoted ? m.quoted : m
  let c = m.quoted ? m.quoted : m.msg
  
  const msg = conn.cMod(m.chat,
    generateWAMessageFromContent(m.chat, {
      [c.toJSON ? q.mtype : 'extendedTextMessage']: c.toJSON ? c.toJSON() : {
        text: c || ''
      }
    }, {
      userJid: conn.user.id
    }),
    text || q.text, conn.user.jid, { mentions: users }
  )
  
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}

handler.help = ['notify']
handler.tags = ['gc']
handler.command = /^(hidetag|notify|notificar|notifi|noti|n|hidet|aviso|tag)$/i;
handler.group = true
handler.admin = true

export default handler