let handler = async (m, { conn, text, command }) => {
    if (!text) return m.reply(`*❌ Faltó el enlace.*\n\nUso correcto:\n.${command} https://whatsapp.com/channel/CODIGO`)

    // Extraemos el código del enlace (lo que está después de 'channel/')
    let code = text.match(/channel\/([A-Za-z0-9]+)/)
    
    if (!code) return m.reply('❌ Enlace inválido. Asegúrate de que sea un enlace de canal de WhatsApp.')
    
    try {
        m.reply('🔎 Buscando ID en los servidores de WhatsApp...')
        
        // Usamos la función nativa de Baileys para buscar por código de invitación
        // El "type: 'invite'" es crucial aquí
        let res = await conn.newsletterMetadata("invite", code[1])

        if (!res) return m.reply('❌ No se encontró el canal. Verifica el enlace.')

        let texto = `✅ *CANAL ENCONTRADO* ✅\n\n`
        texto += `📛 *Nombre:* ${res.name}\n`
        texto += `🆔 *ID (JID):* \`${res.id}\`\n`
        texto += `👥 *Suscriptores:* ${res.subscribers}\n\n`
        texto += `> Copia el ID para tu config.js`

        await m.reply(texto)

    } catch (e) {
        console.error(e)
        // Error común: La versión de Baileys es vieja y no tiene newsletterMetadata
        if (String(e).includes('newsletterMetadata is not a function')) {
            m.reply('❌ *Error Crítico:* La librería de tu bot (Baileys) es antigua y no soporta búsqueda de canales.\n\n*Solución Manual:* Abre WhatsApp Web en PC -> Entra al canal -> Clic en el nombre -> Inspeccionar Elemento -> Busca "jid".')
        } else {
            m.reply(`❌ Error al buscar: ${e}`)
        }
    }
}

handler.help = ['idcanal <link>']
handler.tags = ['tools']
handler.command = /^idcanal|channelid$/i

export default handler