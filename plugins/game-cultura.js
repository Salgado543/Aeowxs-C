let handler = async (m, { conn, usedPrefix, command }) => {
    conn.trivia = conn.trivia ? conn.trivia : {}
    let id = m.chat

    if (id in conn.trivia) return m.reply('*⚠️ Ya hay una trivia activa en este grupo.*')

    // Banco de preguntas local (Sin APIs)
    const preguntas = [
        { q: "¿Cuál es el país más grande del mundo?", a: "rusia" },
        { q: "¿En qué año terminó la Segunda Guerra Mundial?", a: "1945" },
        { q: "¿Cuál es el elemento químico del oro?", a: "au" },
        { q: "¿Quién pintó la Mona Lisa?", a: "leonardo da vinci" },
        { q: "¿Cuál es el planeta más cercano al sol?", a: "mercurio" },
        { q: "¿Cuántos huesos tiene el cuerpo humano adulto?", a: "206" },
        { q: "¿Cuál es el río más largo del mundo?", a: "amazonas" },
        { q: "¿En qué país se encuentra la Torre Eiffel?", a: "francia" },
        { q: "¿Cuál es la capital de Japón?", a: "tokio" },
        { q: "¿Quién escribió 'Don Quijote de la Mancha'?", a: "miguel de cervantes" }
    ]

    let item = preguntas.getRandom()
    let tiempo = 60000 // 1 minuto
    let premio = 300

    conn.trivia[id] = {
        pregunta: item.q,
        respuesta: item.a,
        premio: premio,
        time: setTimeout(() => {
            if (conn.trivia[id]) {
                conn.reply(m.chat, `*⏱️ ¡Tiempo agotado!*\nLa respuesta era: *${conn.trivia[id].respuesta.toUpperCase()}*`, m)
                delete conn.trivia[id]
            }
        }, tiempo)
    }

    let txt = `*🧠 TRIVIA AEOWXS CLUB 🧠*\n\n`
    txt += `> *Pregunta:* ${item.q}\n\n`
    txt += `> *Tiempo:* 60 segundos\n`
    txt += `> *Premio:* ${premio} ${global.moneda}\n\n`
    txt += `*¡Responde sin prefijos para ganar!*`

    conn.reply(m.chat, txt, m)
}

handler.before = async (m) => {
    let id = m.chat
    if (!global.conn.trivia || !global.conn.trivia[id]) return 
    
    let trivia = global.conn.trivia[id]
    if (m.isBaileys || !m.text) return

    if (m.text.toLowerCase() === trivia.respuesta) {
        let user = global.db.data.users[m.sender]
        user.coins += trivia.premio
        conn.reply(m.chat, `*🎉 ¡RESPUESTA CORRECTA!* @${m.sender.split('@')[0]}\n\n> *Ganaste:* ${trivia.premio} ${global.moneda}`, m, { mentions: [m.sender] })
        clearTimeout(trivia.time)
        delete global.conn.trivia[id]
    }
}

handler.help = ['trivia']
handler.tags = ['game']
handler.command = /^(trivia|preguntados)$/i
handler.group = true

export default handler