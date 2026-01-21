let handler = async (m, { conn, usedPrefix }) => {
    // ==========================================
    // 🛡️ ZONA DE PROTECCIÓN ANTI-BAN 🛡️
    // ==========================================
    
    // 1. Simular "Escribiendo..."
    // Da la sensación de que el bot está activo y redactando la respuesta
    await conn.sendPresenceUpdate('composing', m.chat)

    // 2. Calcular tiempo de espera (2 a 4 segundos)
    // Es un comando simple, así que no necesita tanta espera como un menú o descarga
    const min = 2000
    const max = 4000
    const delay = Math.floor(Math.random() * (max - min + 1)) + min

    // 3. Esperar el tiempo calculado
    await new Promise(resolve => setTimeout(resolve, delay))
    
    // ==========================================
    // 🏁 FIN DE PROTECCIÓN
    // ==========================================

    // 4. Reacción (Ahora ocurre después de "pensar")
    await m.react('🌴')

    // 5. Nombre del usuario
    let user = m.sender.split('@')[0]
    
    // 6. Mensaje Estético
    let txt = ``
    txt += `> Soy *${global.botname || 'Aeowxs Club'}* y estoy 100% operativo.\n\n`
    txt += `*💡 ¿Qué deseas hacer?*\n`
    txt += `> Escribe *${usedPrefix}menu* para ver mis comandos.\n\n`
    txt += `*${global.wm || 'Aeowxs Club'}*`

    // 7. Enviar respuesta mencionando al usuario
    await conn.reply(m.chat, txt, m, { mentions: [m.sender] })
}

handler.help = ['bot']
handler.tags = ['main']
handler.command = /^bot$/i

export default handler