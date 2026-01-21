let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.wordle = conn.wordle ? conn.wordle : {}
    let id = m.chat

    if (id in conn.wordle) return m.reply(`*⚠️ Ya hay un Wordle activo en este grupo.*\nUsa *${usedPrefix}rendirse* para terminarlo.`)

    // Lista de palabras de 5 letras (puedes agregar más)
    const palabras = ['casas', 'perro', 'gatos', 'libro', 'clima', 'fuego', 'playa', 'mundo', 'noche', 'verde', 'bravo', 'piano', 'queso', 'tigre', 'vocal', 'fruta']
    let palabra = palabras.getRandom().toLowerCase()
    let intentos = 6

    conn.wordle[id] = {
        palabra,
        intentos,
        historial: [],
        ganado: false
    }

    let txt = `*🧩 WORDLE - AEOWXS CLUB 🧩*\n\n`
    txt += `> Adivina la palabra de *5 letras*.\n`
    txt += `> Tienes *6 intentos*.\n\n`
    txt += `🟩: Letra correcta en lugar correcto.\n`
    txt += `🟨: Letra correcta en lugar incorrecto.\n`
    txt += `⬜: Letra no existe en la palabra.\n\n`
    txt += `*Para jugar:* Escribe una palabra de 5 letras.`
    
    conn.reply(m.chat, txt, m)
}

handler.before = async (m) => {
    let id = m.chat
    if (!global.conn.wordle || !global.conn.wordle[id]) return 
    let game = global.conn.wordle[id]

    if (m.isBaileys || !m.text || m.text.length !== 5 || !/[a-z]/i.test(m.text)) return

    let guess = m.text.toLowerCase()
    let target = game.palabra
    let result = ''

    // Lógica de comparación
    for (let i = 0; i < 5; i++) {
        if (guess[i] === target[i]) result += '🟩'
        else if (target.includes(guess[i])) result += '🟨'
        else result += '⬜'
    }

    game.historial.push(`${guess.toUpperCase()} -> ${result}`)
    game.intentos -= 1

    if (guess === target) {
        let user = global.db.data.users[m.sender]
        let premio = 500
        user.coins += premio
        conn.reply(m.chat, `*🎉 ¡FELICIDADES! 🎉*\n\n> *Palabra:* ${target.toUpperCase()}\n> *Intentos:* ${6 - game.intentos}\n> *Premio:* ${premio} ${global.moneda}\n\n${game.historial.join('\n')}`, m)
        delete global.conn.wordle[id]
    } else if (game.intentos <= 0) {
        conn.reply(m.chat, `*💀 PERDISTE 💀*\n\n> *La palabra era:* ${target.toUpperCase()}\n\n${game.historial.join('\n')}`, m)
        delete global.conn.wordle[id]
    } else {
        conn.reply(m.chat, `*🎮 WORDLE - INTENTO ${6 - game.intentos}/6*\n\n${game.historial.join('\n')}\n\n> Te quedan ${game.intentos} intentos.`, m)
    }
}

handler.help = ['wordle']
handler.tags = ['game']
handler.command = /^(wordle)$/i
handler.group = true

export default handler