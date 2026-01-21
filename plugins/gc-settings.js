let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Lógica para detectar si se usa comando directo (.close) o con argumentos (.grupo cerrar)
    let isClose = {
        'open': 'not_announcement',
        'abrir': 'not_announcement',
        'close': 'announcement',
        'cerrar': 'announcement',
    }[command] || {
        'open': 'not_announcement',
        'abrir': 'not_announcement',
        'close': 'announcement',
        'cerrar': 'announcement',
    }[args[0] || '']

    // Si no se entiende el comando, mandar ayuda y detener la función
    if (isClose === undefined) {
        await conn.reply(m.chat, `⚠️ *Por favor, elija una opción válida:*\n\n*${usedPrefix}grupo* abrir\n*${usedPrefix}grupo* cerrar`, m)
        return
    }

    // Ejecutar el cambio de configuración en el grupo
    await conn.groupSettingUpdate(m.chat, isClose)
    
    // REACCIÓN: Reacciona al mensaje del usuario con ✅
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}

handler.help = ['group open', 'group close']
handler.tags = ['group']
handler.command = ['group', 'grupo', 'close', 'open', 'abrir', 'cerrar'] 
handler.admin = true
handler.botAdmin = true

export default handler