let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users[m.sender]

  let tiempoEspera = 10

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    conn.reply(m.chat, `*⏰ Espera ${tiempoRestante} para apostar nuevamente.*`, m)
    return
  }

  cooldowns[m.sender] = Date.now()

  if (!text) return conn.reply(m.chat, `*${emojis} Debes ingresar una cantidad de coins y apostar a un color*\n> *Ejemplo:* ${usedPrefix + command} 20 black`, m)

  let args = text.trim().split(" ")
  if (args.length !== 2) return conn.reply(m.chat, `*${emojis} Debes ingresar una cantidad de coins y apostar a un color*\n> *\`Ejemplo:\`* ${usedPrefix + command} 20 red`, m)

  let coins = parseInt(args[0])
  let color = args[1].toLowerCase()

  if (isNaN(coins) || coins <= 0) return conn.reply(m.chat, `*⚠️ Ingresa una cantidad válida para la apuesta.*`, m)

  if (coins > 50) return conn.reply(m.chat, '*⚠️ La cantidad máxima de apuesta es de `50` coins', m)

  if (!(color === 'black' || color === 'red')) return conn.reply(m.chat, '*⚠️ Debes apostar a un color válido: black o red.*', m)

  if (coins > users.coins) return conn.reply(m.chat, "*⚠️ No tienes suficientes coins para realizar esta apuesta.*", m)

  await conn.reply(m.chat, `*${emojis} Apostaste \`${coins}\` coins al color \`\`\`${color}\`\`\`\n*Espera \`10\` segundos para conocer el resultado.`, m)

  setTimeout(() => {
    let result = Math.random()
    let win = false

    if (result < 0.5) {
      win = color === 'black'
    } else {
      win = color === 'red'
    }

    if (win) {
      users.coins += coins
      conn.reply(m.chat, `*🎉 ¡Ganaste! Obtuviste \`${coins}\` coins.*\n*Total:* ${users.coins} ${moneda}*`, m)
    } else {
      users.coins -= coins
      conn.reply(m.chat, `*😹 Perdiste. Se te restaron \`${coins}\` coins*\n*Total:* \`${users.coins}\` ${moneda}.`, m)
    }


  }, 10000)
}
handler.tags = ['rpg']
handler.help =['ruleta']
handler.command = ['ruleta', 'roulette', 'rt']
handler.register = true
export default handler

function segundosAHMS(segundos) {
  let segundosRestantes = segundos % 60
  return `${segundosRestantes} segundos`
}