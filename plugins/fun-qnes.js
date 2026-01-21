let handler = async (m, { conn, text, participants, groupMetadata, usedPrefix, command }) => {
    if (!m.isGroup) return m.reply('*⚠️ Este comando solo funciona en grupos.*')
    
    // 1. Instrucciones si no hay texto
    if (!text) return m.reply(`*🤔 JUEGO ¿QUIÉN ES?*\n\n*¿Cómo usarlo?*\nEscribe el comando seguido de la pregunta o situación para que el bot elija a un culpable al azar.\n\n*Sintaxis:* \n\`${usedPrefix + command} <pregunta>\`\n\n*Ejemplos:*\n> ${usedPrefix + command} es el más enojón del grupo\n> ${usedPrefix + command} me debe dinero`)

    try {
        // 2. Obtención de participantes (Método Robusto)
        // Intentamos usar los que vienen en los argumentos
        let members = participants
        
        // Si no vienen o la lista está vacía, forzamos la petición a WhatsApp
        if (!members || members.length === 0) {
            const meta = await conn.groupMetadata(m.chat)
            members = meta.participants
        }

        // Si después de todo eso sigue vacío, cancelamos
        if (!members || members.length === 0) {
            return m.reply('*❌ Error:* No pude leer la lista de miembros. Asegúrate de que el bot esté en el grupo.')
        }

        // 3. Selección Aleatoria
        let randomMember = members[Math.floor(Math.random() * members.length)]
        let user = randomMember.id || randomMember // Manejamos si viene como objeto o string

        // 4. Construcción del Mensaje
        let txt = `*👇 LA RESPUESTA ES... 👇*\n\n`
        txt += `> *Pregunta:* ¿Quién ${text}?\n`
        txt += `> *Estoy seguro q es:* @${user.split('@')[0]}\n\n`
        txt += `*${global.wm || 'Aeowxs Club'}*`

        // 5. Envío
        await conn.reply(m.chat, txt, m, { mentions: [user] })

    } catch (e) {
        console.error('Error en comando QUIEN:', e)
        m.reply('*❌ Ocurrió un error inesperado. Revisa la consola del bot.*')
    }
}

handler.help = ['quien <texto>']
handler.tags = ['fun']
handler.command = /^(quien|whois)$/i
handler.group = true

export default handler