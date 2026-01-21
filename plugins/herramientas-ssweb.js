import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`*⚠️ ¿Qué página quieres capturar?*\n\n> *Ejemplo:* ${usedPrefix + command} https://google.com`)
    
    // Limpieza de URL
    let url = text.trim()
    if (!url.startsWith('http')) url = 'https://' + url

    try {
        m.react('📸')
        // Usamos una API estable de captura (gratuita y sin registro para uso moderado)
        let ss = `https://image.thum.io/get/width/1200/noanimate/wait/2/${url}`
        
        await conn.sendMessage(m.chat, { 
            image: { url: ss }, 
            caption: `*📸 CAPTURA REALIZADA*\n\n> *Sitio:* ${url}\n\n*${global.wm}*` 
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        m.reply('*❌ Error:* No se pudo capturar la página. Revisa que el enlace sea válido.')
    }
}

handler.help = ['ssweb']
handler.tags = ['tools']
handler.command = /^(ss|ssweb|screenshot|captura)$/i

export default handler