import { toDataURL } from 'qrcode'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`*⚠️ ¿Qué quieres convertir en QR?*\n\n> *Ejemplo:* ${usedPrefix + command} https://github.com`)

    try {
        m.react('📷')
        // Generamos el QR como base64
        let res = await String(await toDataURL(text, { scale: 8 }))
        let buffer = Buffer.from(res.replace(/^data:image\/png;base64,/, ""), 'base64')
        
        await conn.sendMessage(m.chat, { 
            image: buffer, 
            caption: `*✅ CÓDIGO QR GENERADO*\n\n> *Contenido:* ${text}\n\n*${global.wm}*` 
        }, { quoted: m })

    } catch (e) {
        m.reply('*❌ Error:* No se pudo generar el código QR.')
    }
}

handler.help = ['qr <texto/link>']
handler.tags = ['tools']
handler.command = /^(qr|qrcode)$/i

export default handler