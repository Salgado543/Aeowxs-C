let handler = m => m

handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
    if (m.isBaileys || m.fromMe) return
    if (!m.text) return
    
    // --- 1. ANTI-PRIVADO ---
    let bot = global.db.data.settings[conn.user.jid] || {}
    
    if (bot.antiPrivate && !m.isGroup && !isOwner && !isROwner) {
        const allowList = ['serbot', 'jadibot', 'code', 'creador', 'ping']
        const isAllowed = allowList.some(cmd => m.text.includes(cmd))

        if (!isAllowed) {
            return true 
        }
    }

    // --- 2. HUMANIZADOR (TIEMPO EXTENDIDO) ---
    
    // Detectamos si el mensaje empieza con un símbolo de comando
    const isCommand = /^[/.!#$]/.test(m.text)

    if (isCommand) {
        try {
            // 1. Enviamos la señal
            await conn.sendPresenceUpdate('composing', m.chat)
            
            // 2. FORZAMOS 4 SEGUNDOS DE ESPERA
            // Esto asegura que veas el "Escribiendo..." incluso si el comando es rápido
            await new Promise(resolve => setTimeout(resolve, 4000)) 
            
        } catch (e) {
            console.log('Error en presence update')
        }
    }
}

export default handler