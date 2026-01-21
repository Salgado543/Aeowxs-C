let handler = async (m, { conn, usedPrefix, command }) => {
    conn.scramble = conn.scramble ? conn.scramble : {}
    let id = m.chat

    if (id in conn.scramble) return m.reply('*⚠️ Ya hay una palabra por adivinar en este grupo.*')

    const palabras = ['aeowxs', 'comer', 'pastillas', 'universidad', 'educacion', 'responsabilidad', 'comunicacion' 'besar', 'acampar', 'submarino', 'astronauta', 'escenario', 'electrodomestico',  'whatsapp', 'mexico', 'teclado', 'monitor', 'internet', 'estetico', 'shadow', 'dinero', 'moneda', 'aventura', 'servidor', 'bot', 'programador']
    let original = palabras.getRandom()
    
    // Función para revolver la palabra
    let scrambled = original.split('').sort(() => Math.random() - 0.5).join('')
    
    // Si por azar sale igual, lo intentamos de nuevo una vez
    if (scrambled === original) scrambled = original.split('').sort(() => Math.random() - 0.5).join('')

    let premio = 250
    let tiempo = 60000

    conn.scramble[id] = {
        word: original,
        premio,
        time: setTimeout(() => {
            if (conn.scramble[id]) {
                conn.reply(m.chat, `*⏱️ ¡Se acabó el tiempo!* \nLa palabra era: *${conn.scramble[id].word.toUpperCase()}*`, m)
                delete conn.scramble[id]
            }
        }, tiempo)
    }

    let txt = `*🧩 PALABRA REVUELTA 🧩*\n\n`
    txt += `> Ordena las letras: \`${scrambled.toUpperCase()}\`\n\n`
    txt += `> *Premio:* ${premio} ${global.moneda}\n`
    txt += `*¡Responde rápido!*`

    conn.reply(m.chat, txt, m)
}

handler.before = async (m) => {
    let id = m.chat
    if (!global.conn.scramble || !global.conn.scramble[id]) return 
    
    let scramble = global.conn.scramble[id]
    if (m.isBaileys || !m.text) return

    if (m.text.toLowerCase() === scramble.word) {
        let user = global.db.data.users[m.sender]
        user.coins += scramble.premio
        conn.reply(m.chat, `*🎉 ¡CORRECTO!* @${m.sender.split('@')[0]}\n\n> *Palabra:* ${scramble.word.toUpperCase()}\n> *Ganaste:* ${scramble.premio} ${global.moneda}`, m, { mentions: [m.sender] })
        clearTimeout(scramble.time)
        delete global.conn.scramble[id]
    }
}

handler.help = ['ordenar']
handler.tags = ['game']
handler.command = /^(scramble|ordenar|revuelta)$/i
handler.group = true

export default handler