let handler = async (m, { conn, args, usedPrefix, command }) => {
    let chat = global.db.data.chats[m.chat]
    
    // Lógica para activar/desactivar el comando
    if (args.length < 1) return conn.reply(m.chat, `*⚠️ Seleccione una opción:*\n\n*${usedPrefix + command} on* (Activar)\n*${usedPrefix + command} off* (Desactivar)`, m)
    
    if (args[0] === 'on') {
        if (chat.antiArabes) return conn.reply(m.chat, `*⚠️ El Anti-Arabes ya está activado en este grupo.*`, m)
        chat.antiArabes = true
        conn.reply(m.chat, `*✅ Anti-Arabes activado con éxito.*\n\n> El bot eliminará automáticamente a números con prefijos raros (+212, +265, +92, etc.) cuando escriban.`, m)
    } else if (args[0] === 'off') {
        if (!chat.antiArabes) return conn.reply(m.chat, `*⚠️ El Anti-Arabes ya está desactivado.*`, m)
        chat.antiArabes = false
        conn.reply(m.chat, `*🚫 Anti-Arabes desactivado.*`, m)
    } else {
        conn.reply(m.chat, `*⚠️ Opción no válida.* Use "on" o "off".`, m)
    }
}

// Esta parte se ejecuta cada vez que alguien envía un mensaje
handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner }) {
    if (!m.isGroup) return
    let chat = global.db.data.chats[m.chat]
    
    // Si la función está desactivada o el bot no es admin, no hacemos nada
    if (!chat.antiArabes || !isBotAdmin) return

    let sender = m.sender
    
    // --- LISTA DE PREFIJOS PROHIBIDOS ---
    // 212: Marruecos, 265: Malawi, 92: Pakistán, 90: Turquía, 91: India (opcional)
    // Puedes agregar más códigos aquí separados por comas
    let prefijosProhibidos = ['212', '265', '92', '213', '234', '447', '371'] 
    
    // Verificamos si el número empieza con alguno de los prohibidos
    let esProhibido = prefijosProhibidos.some(prefijo => sender.startsWith(prefijo))

    // Si es prohibido y NO es admin ni dueño del bot
    if (esProhibido && !isAdmin && !isOwner) {
        
        // 1. Advertencia (Opcional, se puede quitar para que sea silencioso)
        // await conn.reply(m.chat, `*🚫 ¡Anti-Arabes detectado!* \n\n@${sender.split('@')[0]} tu prefijo está prohibido en este grupo.`, m, { mentions: [sender] })

        // 2. Eliminar el mensaje del intruso
        try {
            await conn.sendMessage(m.chat, { delete: m.key })
        } catch (e) {
            console.error('Error al borrar mensaje antiarabes:', e)
        }

        // 3. Expulsar al usuario
        try {
            await conn.groupParticipantsUpdate(m.chat, [sender], 'remove')
        } catch (e) {
            console.error('Error al expulsar usuario antiarabes:', e)
        }
    }
}

handler.help = ['antiarabes <on/off>']
handler.tags = ['group']
handler.command = /^antiarabes$/i
handler.group = true
handler.admin = true      // Solo admins pueden usar el comando
handler.botAdmin = true   // El bot necesita ser admin para expulsar

export default handler