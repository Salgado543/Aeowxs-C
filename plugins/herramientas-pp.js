let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return m.reply(`*⚠️ Ingresa el enlace del grupo a inspeccionar.*\n\n> *Ejemplo:* ${usedPrefix + command} https://chat.whatsapp.com/xxx`)
    
    let link = args[0].split('https://chat.whatsapp.com/')[1]
    if (!link) return m.reply('*❌ El enlace no es válido.*')

    try {
        m.react('🕵️')
        // Esta función de Baileys obtiene info del grupo sin unirse
        let info = await conn.groupGetInviteInfo(link)
        
        let txt = `*🕵️ INSPECCIÓN DE GRUPO - AEOWXS 🕵️*\n\n`
        txt += `> *Nombre:* ${info.subject}\n`
        txt += `> *ID:* ${info.id}\n`
        txt += `> *Creado el:* ${new Date(info.creation * 1000).toLocaleDateString()}\n`
        txt += `> *Dueño:* @${info.owner?.split('@')[0] || 'Desconocido'}\n`
        txt += `> *Miembros:* ${info.size}\n\n`
        
        txt += `*📝 DESCRIPCIÓN:*\n`
        txt += `> ${info.desc || 'Sin descripción.'}\n\n`
        
        txt += `*${global.wm}*`

        // Intentamos obtener la foto del grupo
        let pp = 'https://telegra.ph/file/2416c30c3393c78da11b7.jpg'
        try {
            pp = await conn.profilePictureUrl(info.id, 'image')
        } catch (e) {}

        await conn.sendMessage(m.chat, { 
            image: { url: pp }, 
            caption: txt,
            mentions: [info.owner] 
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        m.reply('*❌ No pude obtener información de ese enlace. Puede que el link esté vencido o el bot esté baneado de ese grupo.*')
    }
}

handler.help = ['inspect']
handler.tags = ['tools']
handler.command = /^(inspect|inspeccionar|gpinfo)$/i

export default handler