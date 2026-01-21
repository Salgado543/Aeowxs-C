let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.sender
    else who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat

    try {
        m.react('📸')
        // Intentamos obtener la foto en alta calidad ('image')
        // Si falla (porque tiene privacidad), usamos la de baja calidad o una por defecto
        let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/2416c30c3393c78da11b7.jpg')
        
        await conn.sendMessage(m.chat, { 
            image: { url: pp }, 
            caption: `*📸 FOTO DE PERFIL 📸*\n\n> *Usuario:* @${who.split('@')[0]}\n> *Link:* ${pp}`,
            mentions: [who]
        }, { quoted: m })

    } catch (e) {
        m.reply('*❌ Error:* No pude obtener la foto. Puede que el usuario la tenga privada.')
    }
}

handler.help = ['foto']
handler.tags = ['tools']
handler.command = /^(getpp|pp|foto|fotoperfil)$/i

export default handler