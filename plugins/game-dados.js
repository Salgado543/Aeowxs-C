let handler = async (m, { conn, args, usedPrefix, command }) => {
    let user = global.db.data.users[m.sender]
    let apuesta = parseInt(args[0])

    if (!apuesta || isNaN(apuesta) || apuesta <= 0) return m.reply(`*⚠️ Ingresa la cantidad a apostar.*\n\n> *Ejemplo:* ${usedPrefix + command} 200`)
    if (user.coins < apuesta) return m.reply(`*❌ No tienes suficientes ${global.moneda}.*`)

    m.react('🔫')

    // 1 de 6 probabilidades de que se dispare
    let bala = 1
    let tambor = Math.floor(Math.random() * 6) + 1

    let txt = `*💀 RULETA RUSA EXTREMA 💀*\n\n`
    txt += `> *Apuesta:* ${apuesta} ${global.moneda}\n`
    txt += `> *Acción:* Pones la pistola en tu sien y aprietas el gatillo...\n\n`

    if (bala === tambor) {
        user.coins -= apuesta
        txt += `*💥 ¡¡¡BOOM!!! 💥*\n\n`
        txt += `> La bala estaba en la recámara. Has perdido ${apuesta} ${global.moneda} y tu dignidad.`
        // Opcional: Podrías agregar un banchat temporal aquí
    } else {
        let premio = Math.ceil(apuesta * 0.5) // Gana el 50% de lo apostado por sobrevivir
        user.coins += premio
        txt += `*¡CLIC!* 💨\n\n`
        txt += `> La recámara estaba vacía. Has sobrevivido.\n`
        txt += `> *Premio:* ${premio} ${global.moneda}`
    }

    txt += `\n\n*SALDO ACTUAL:* ${user.coins} ${global.moneda}`
    m.reply(txt)
}

handler.help = ['ruletarusa']
handler.tags = ['game']
handler.command = /^(ruletarusa|rr)$/i

export default handler