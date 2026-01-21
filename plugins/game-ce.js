let handler = async (m, { conn, usedPrefix, command }) => {
  conn.speedtype = conn.speedtype ? conn.speedtype : {}
  let id = m.chat

  if (id in conn.speedtype) return m.reply('*⚠️ Ya hay una carrera de escritura activa.*')

  const frases = [
    "El veloz murciélago hindú comía feliz cardillo y kiwi.",
    "Aeowxs Club es el mejor grupo de WhatsApp de todo el mundo.",
    "La inteligencia artificial transformará el futuro de la humanidad pronto.",
    "Tres tristes tigres tragaban trigo en un trigal en medio del campo.",
    "Programar bots en JavaScript es una habilidad muy valiosa hoy en día."
  ]

  let frase = frases.getRandom()
  let premio = 600

  conn.speedtype[id] = {
    frase,
    premio,
    startTime: Date.now(),
    time: setTimeout(() => {
      if (conn.speedtype[id]) {
        conn.reply(m.chat, `*⏱️ ¡Tiempo agotado!* Nadie pudo escribir la frase a tiempo.`, m)
        delete conn.speedtype[id]
      }
    }, 45000)
  }

  let txt = `*⌨️ CARRERA DE ESCRITURA ⌨️*\n\n`
  txt += `> El primero en escribir la frase exacta gana.\n\n`
  txt += `*FRASE:* \`\`\`${frase}\`\`\`\n\n`
  txt += `> *Premio:* ${premio} ${global.moneda}`

  conn.reply(m.chat, txt, m)
}

handler.before = async (m) => {
  let id = m.chat
  if (!global.conn.speedtype || !global.conn.speedtype[id]) return 
  
  let game = global.conn.speedtype[id]
  if (m.isBaileys || !m.text) return

  if (m.text === game.frase) {
    let user = global.db.data.users[m.sender]
    let timeTaken = (Date.now() - game.startTime) / 1000
    user.coins += game.premio
    conn.reply(m.chat, `*🏆 ¡TENEMOS UN VELOCISTA!* @${m.sender.split('@')[0]}\n\n> *Tiempo:* ${timeTaken.toFixed(2)} segundos\n> *Premio:* ${game.premio} ${global.moneda}`, m, { mentions: [m.sender] })
    clearTimeout(game.time)
    delete global.conn.speedtype[id]
  }
}

handler.help = ['speedtype']
handler.tags = ['game']
handler.command = /^(speedtype|escritura|escribir)$/i
handler.group = true

export default handler