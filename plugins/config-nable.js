let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  const isEnable = /true|enable|(turn)?on|1/i.test(command)
  const chat = global.db.data.chats[m.chat]
  const user = global.db.data.users[m.sender]
  const bot = global.db.data.settings[conn.user.jid] || {}

  const type = (args[0] || '').toLowerCase()
  let isAll = false, isUser = false
  
  switch (type) {
    case 'welcome':
    case 'bv':
    case 'bienvenida':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break

    // --- NUEVO: OPCIÓN PARA DESPEDIDAS ---
    case 'bye':
    case 'despedida':
    case 'salida':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.bye = isEnable
      break
    // -------------------------------------

    case 'detect':
    case 'autodetect':
    case 'avisos':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.detect = isEnable
      chat.detect2 = isEnable
      break

    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLink = isEnable
      break

    case 'antiarabes':
    case 'arabes':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiArabes = isEnable
      break
      
    case 'delete':
    case 'antidelete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.delete = isEnable
      break

    case 'antiver':
    case 'antiviewonce':
      if (m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antiver = isEnable
      break

    case 'modoadmin':
    case 'soloadmin':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.modoadmin = isEnable
      break

    case 'nsfw':
    case 'modohorny':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.nsfw = isEnable
      break
      
    case 'audios':
      if (m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.audios = isEnable
      break
      
    case 'reaction':
    case 'reacciones':
      if (m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.reaction = isEnable
      break
      
    case 'autoaceptar':
      if (m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.autoAceptar = isEnable
      break

    case 'document':
    case 'documento':
      isUser = true
      user.useDocument = isEnable
      break
      
    case 'autoread':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['autoread'] = isEnable
      break
      
    case 'restrict':
      isAll = true
      if (!isOwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.restrict = isEnable
      break
      
    case 'antiprivado':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.antiPrivate = isEnable
      break

    default:
      if (!/[01]/.test(command)) return m.reply(`
⚙️ *OPCIONES DE CONFIGURACIÓN*

👤 *Privacidad y Bot*
⪼ document | autoread | restrict | antiprivado

👥 *Grupos y Seguridad*
⪼ welcome | bye | antilink | antiarabes
⪼ nsfw | modoadmin | autodetect

*💡 Ejemplo:* ${usedPrefix + command} bye`.trim())
      throw false
  }
  
  // Mensaje de confirmación estético corto
  m.reply(`> *⚙️ Configuración:* ${type} ⪼ *${isEnable ? 'ACTIVADO ✅' : 'DESACTIVADO ❌'}* ⪼ *Aplicado en:* ${isAll ? 'Bot Global' : isUser ? 'Tu Usuario' : 'Este Chat'}`.trim())
}

handler.help = ['enable', 'disable', 'on', 'off']
handler.tags = ['config']
handler.command = /^(enable|disable|on|off|1|0)$/i

export default handler