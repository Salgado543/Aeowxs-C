let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.carrera = conn.carrera ? conn.carrera : {}
    if (m.chat in conn.carrera) return m.reply('*⚠️ Ya hay una carrera en curso. Espera a que termine.*')

    if (!args[0] || isNaN(args[0]) || args[0] < 1 || args[0] > 5) {
        return m.reply(`*🏇 CARRERA DE CABALLOS 🏇*\n\nElige un caballo para apostar (1 al 5):\n> *Uso:* ${usedPrefix + command} <caballo> <apuesta>\n\n*Ejemplo:* ${usedPrefix + command} 3 100`)
    }

    let user = global.db.data.users[m.sender]
    let caballoElegido = parseInt(args[0])
    let apuesta = parseInt(args[1])

    if (!apuesta || apuesta <= 0) return m.reply('*⚠️ Ingresa una cantidad válida para apostar.*')
    if (user.coins < apuesta) return m.reply(`*❌ No tienes suficientes ${global.moneda}.*`)

    conn.carrera[m.chat] = true
    user.coins -= apuesta

    let caballos = ['🏇1', '🏇2', '🏇3', '🏇4', '🏇5']
    let meta = 15
    let posiciones = [0, 0, 0, 0, 0]

    let mensaje = await m.reply(`*🏁 LA CARRERA ESTÁ POR EMPEZAR 🏁*\n\n> Apostaste ${apuesta} al Caballo ${caballoElegido}.\n\n*¡SUERTE!*`)

    let interval = setInterval(async () => {
        // Avanzar caballos al azar
        for (let i = 0; i < 5; i++) {
            posiciones[i] += Math.floor(Math.random() * 3)
        }

        // Dibujar pista
        let pista = `*🐎 HIPÓDROMO AEOWXS 🐎*\n\n`
        for (let i = 0; i < 5; i++) {
            let carril = "—".repeat(posiciones[i]) + caballos[i] + "—".repeat(Math.max(0, meta - posiciones[i]))
            pista += `> ${carril} ${posiciones[i] >= meta ? '🚩' : ''}\n`
        }

        await conn.sendMessage(m.chat, { text: pista, edit: mensaje.key })

        // Verificar si alguien ganó
        let ganador = posiciones.findIndex(p => p >= meta)
        if (ganador !== -1) {
            clearInterval(interval)
            let caballoGanador = ganador + 1
            let finalMsg = `*🏁 ¡FINAL DE LA CARRERA! 🏁*\n\n`
            finalMsg += `> *Ganador:* Caballo ${caballoGanador}\n\n`

            if (caballoElegido === caballoGanador) {
                let premio = apuesta * 5
                user.coins += premio
                finalMsg += `*🎊 ¡FELICIDADES!* Tu caballo ganó. \n> *Recibes:* ${premio} ${global.moneda}`
            } else {
                finalMsg += `*💀 PERDISTE.* Mejor suerte la próxima vez.`
            }

            await conn.reply(m.chat, finalMsg, m)
            delete conn.carrera[m.chat]
        }
    }, 2500)
}

handler.help = ['carrera <caballo> <apuesta>']
handler.tags = ['game']
handler.command = /^(carrera|horse)$/i
handler.group = true

export default handler