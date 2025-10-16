import fs from 'fs'

let mutedUsers = new Set()

try {
  const data = fs.readFileSync('./mute.json', 'utf-8')
  mutedUsers = new Set(JSON.parse(data))
} catch (e) {
  mutedUsers = new Set()
}

let handler = async (m, { conn, command }) => {
  if (!m.quoted) {
    const msgError = command === 'mute'
      ? `*${emojis} Responde al mensaje del usuario que deseas mutear.*`
      : `*${emojis} Responde al mensaje del usuario que deseas desmutear.*`
    return conn.reply(m.chat, msgError, m)
  }

  let user = m.quoted.sender
  const ownerBot = global.owner.flatMap(o => {
    let id = o[0]
    // si ya trae @, lo dejamos tal cual
    if (id.includes('@')) return [id]
    // si es un número, lo convertimos a ambos formatos posibles
    return [id + '@s.whatsapp.net', id + '@lid']
  })

  if (ownerBot.includes(user)) {
    return conn.reply(m.chat, `*☁️ No puedo mutear a mi propietario.*`, m)
  }

  if (user === conn.user.jid) {
    return conn.reply(m.chat, `*🤖 No puedo mutearme a mí mismo.*`, m)
  }

  if (command === "mute") {
    if (mutedUsers.has(user)) {
      return conn.reply(m.chat, `*🔇 El usuario @${user.split('@')[0]} ya está muteado.*`, m, { mentions: [user] })
    }
    mutedUsers.add(user)
    guardarMuteos()
    conn.reply(m.chat, `*🔇 El usuario @${user.split('@')[0]} fue muteado.*\n> *Sus mensajes serán eliminados.*`, fkontak, { mentions: [user] })
  } 

  if (command === "unmute") {
    if (!mutedUsers.has(user)) {
      return conn.reply(m.chat, `*🔊 El usuario @${user.split('@')[0]} no está muteado.*`, m, { mentions: [user] })
    }
    mutedUsers.delete(user)
    guardarMuteos()
    conn.reply(m.chat, `*🔊 El usuario @${user.split('@')[0]} fue desmuteado.*\n> *Sus mensajes ya no serán eliminados.*`, fkontak, { mentions: [user] })
  }
}

function guardarMuteos() {
  fs.writeFileSync('./mute.json', JSON.stringify([...mutedUsers]))
}

handler.before = async (m, { conn }) => {
  if (mutedUsers.has(m.sender)) {
    try {
      await conn.sendMessage(m.chat, { delete: m.key })
    } catch (e) {
      console.error('Error eliminando mensaje de usuario muteado:', e)
    }
  }
}

handler.help = ['mute', 'unmute']
handler.tags = ['gc']
handler.command = /^(mute|unmute)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler