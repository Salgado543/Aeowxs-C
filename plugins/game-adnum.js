let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.guess = conn.guess ? conn.guess : {}
    let id = m.chat

    if (id in conn.guess) return m.reply('*⚠️ Ya hay un juego activo en este grupo. ¡Adivina el número!*')

    // Generar número entre 1 y 50
    let num = Math.floor(Math.random() * 50) + 1
    let premio = 200 // Recompensa fija

    conn.guess[id] = {
        number: num,
        bonus: premio,
        tries: 0,
        time: setTimeout(() => {
            if (conn.guess[id]) {
                conn.reply(m.chat, `*⏱️ ¡Tiempo agotado!* \nEl número era: *${conn.guess[id].number}*`, m)
                delete conn.guess[id]
            }
        }, 60000) // 1 minuto para adivinar
    }

    m.reply(`*🔢 ADIVINA EL NÚMERO 🔢*\n\nHe pensado un número del *1 al 50*.\n> Tienes 60 segundos para adivinarlo.\n> *Premio:* ${premio} ${global.moneda || 'Coins'}\n\n¡Escribe el número directamente!`)
}

handler.before = async (m) => {
    let id = m.chat
    if (!global.conn.guess || !global.conn.guess[id]) return 
    
    let game = global.conn.guess[id]
    if (m.isBaileys || !m.text) return

    if (!isNaN(m.text)) {
        let userGuess = parseInt(m.text)
        game.tries++

        if (userGuess === game.number) {
            let user = global.db.data.users[m.sender]
            user.coins += game.bonus
            conn.reply(m.chat, `*🎉 ¡FELICIDADES!* @${m.sender.split('@')[0]}\n\n> *Adivinaste el número:* ${game.number}\n> *Intentos:* ${game.tries}\n> *Premio:* ${game.bonus} ${global.moneda}`, m, { mentions: [m.sender] })
            clearTimeout(game.time)
            delete global.conn.guess[id]
        } else if (userGuess > game.number) {
            m.reply(`*📉 Más bajo...*`)
        } else {
            m.reply(`*📈 Más alto...*`)
        }
    }
}

handler.help = ['adnumero']
handler.tags = ['game']
handler.command = /^(adnumero|guess)$/i
handler.group = true

export default handler