let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.ahorcado = conn.ahorcado ? conn.ahorcado : {}
    let id = m.chat

    if (id in conn.ahorcado) return m.reply(`*⚠️ Ya hay un juego activo en este grupo.*\nUsa *${usedPrefix}rendirse* para terminarlo.`)

    const palabras = ['whatsapp', 'computadora', 'aeowxs', 'mexico', 'tecnologia', 'programacion', 'aventura', 'videojuegos', 'comer', 'dormir', 'bot', 'dinero', 'club', 'celular', 'javascript', 'inteligencia']
    let palabra = palabras.getRandom()
    let secreta = palabra.replace(/[a-z]/g, '_')
    let intentos = 6

    conn.ahorcado[id] = {
        palabra,
        secreta: secreta.split(''),
        intentos,
        letras: [],
        emojis: ['💀', '🪑', '👣', '🦾', '💪', '🧠', '👤']
    }

    let txt = `*🎮 JUEGO DEL AHORCADO 🎮*\n\n`
    txt += `> *Palabra:* \`${secreta}\`\n`
    txt += `> *Intentos:* ${intentos} ${conn.ahorcado[id].emojis[intentos]}\n\n`
    txt += `*Para jugar:* Responde a este mensaje con una letra.`
    
    conn.reply(m.chat, txt, m)
}

handler.before = async (m) => {
    let id = m.chat
    if (!global.conn.ahorcado || !global.conn.ahorcado[id]) return 
    let game = global.conn.ahorcado[id]

    if (m.isBaileys || !m.text || m.text.length > 1 || !/[a-z]/i.test(m.text)) return

    let letra = m.text.toLowerCase()
    if (game.letras.includes(letra)) return m.reply(`*⚠️ Ya usaste la letra "${letra}", intenta con otra.*`)
    
    game.letras.push(letra)

    if (game.palabra.includes(letra)) {
        for (let i = 0; i < game.palabra.length; i++) {
            if (game.palabra[i] === letra) game.secreta[i] = letra
        }
        
        if (!game.secreta.includes('_')) {
            let user = global.db.data.users[m.sender]
            let premio = 500
            user.coins += premio
            conn.reply(m.chat, `*🎉 ¡GANASTE! 🎉*\n\n> *Palabra:* \`${game.palabra}\`\n> *Premio:* ${premio} ${global.moneda}`, m)
            delete global.conn.ahorcado[id]
        } else {
            conn.reply(m.chat, `*✅ ¡Acierto!*\n\n> *Palabra:* \`${game.secreta.join('')}\`\n> *Letras usadas:* ${game.letras.join(', ')}`, m)
        }
    } else {
        game.intentos -= 1
        if (game.intentos <= 0) {
            conn.reply(m.chat, `*💀 ¡AHORCADO! 💀*\n\n> *Palabra era:* \`${game.palabra}\`\n> *Perdiste todos tus intentos.*`, m)
            delete global.conn.ahorcado[id]
        } else {
            conn.reply(m.chat, `*❌ Fallaste!*\n\n> *Palabra:* \`${game.secreta.join('')}\`\n> *Intentos restantes:* ${game.intentos} ${game.emojis[game.intentos]}`, m)
        }
    }
}

handler.help = ['ahorcado']
handler.tags = ['game']
handler.command = /^(ahorcado|hangman)$/i
handler.group = true

export default handler