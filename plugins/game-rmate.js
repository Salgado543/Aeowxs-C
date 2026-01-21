let handler = async (m, { conn, usedPrefix, command }) => {
    conn.math = conn.math ? conn.math : {}
    let id = m.chat

    if (id in conn.math) return m.reply('*⚠️ Ya hay un reto matemático activo en este grupo.*')

    // Generar números y operación al azar
    let n1 = Math.floor(Math.random() * 30) + 1
    let n2 = Math.floor(Math.random() * 20) + 1
    let ops = ['+', '-', '*']
    let op = ops.getRandom()
    
    let resultado = 0
    if (op === '+') resultado = n1 + n2
    if (op === '-') resultado = n1 - n2
    if (op === '*') resultado = n1 * n2

    let tiempo = 30000 // 30 segundos
    let premio = Math.floor(Math.random() * 150) + 100

    conn.math[id] = {
        resultado,
        premio,
        time: setTimeout(() => {
            if (conn.math[id]) {
                conn.reply(m.chat, `*⏱️ ¡Tiempo agotado!*\nLa respuesta era: *${conn.math[id].resultado}*`, m)
                delete conn.math[id]
            }
        }, tiempo)
    }

    let txt = `*🧮 RETO MATEMÁTICO 🧮*\n\n`
    txt += `> *¿Cuánto es:* \`${n1} ${op} ${n2}\` ?\n\n`
    txt += `> *Tiempo:* 30 segundos\n`
    txt += `> *Premio:* ${premio} ${global.moneda}\n\n`
    txt += `*¡Responde rápido para ganar!*`

    conn.reply(m.chat, txt, m)
}

handler.before = async (m) => {
    let id = m.chat
    if (!global.conn.math || !global.conn.math[id]) return 
    
    let math = global.conn.math[id]
    if (m.isBaileys || !m.text) return

    if (parseInt(m.text) === math.resultado) {
        let user = global.db.data.users[m.sender]
        user.coins += math.premio
        conn.reply(m.chat, `*🎉 ¡RESPUESTA CORRECTA!* @${m.sender.split('@')[0]}\n\n> *Ganaste:* ${math.premio} ${global.moneda}`, m, { mentions: [m.sender] })
        clearTimeout(math.time)
        delete global.conn.math[id]
    }
}

handler.help = ['mate']
handler.tags = ['game']
handler.command = /^(math|mate|matematicas)$/i
handler.group = true

export default handler