let handler = async (m, { conn }) => {
    // --- TUS DATOS ---
    let name = 'Gio'
    let waid = '5217341011505'
    let instagram = 'https://www.instagram.com/ltegio.sdo'
    let whatsappLink = `https://wa.me/${waid}?text=Hola`
    
    // 👇👇👇 AQUÍ PEGA EL LINK DE TU VIDEO O GIF 👇👇👇
    // Debe ser un enlace directo a un archivo .mp4
    let media = 'https://files.catbox.moe/98dj00.mp4' 

    await m.react('🪢')

    let texto = `*PERFIL DEL CREADOR* 

Aquí tienes mis enlaces de contacto oficiales:

📸 *Instagram:*
${instagram}

💬 *WhatsApp:*
${whatsappLink}

> *Dueño del bot: Gio Dev*
`

    try {
        // Enviar como GIF (Video en bucle)
        await conn.sendMessage(m.chat, { 
            video: { url: media }, 
            gifPlayback: true, // ⬅️ TRUE = Se envía como GIF. Pon FALSE si quieres video normal con audio.
            caption: texto 
        }, { quoted: m })

    } catch (e) {
        // Si el link falla (Error 429 o 404), envía solo el texto para no fallar.
        console.log(e)
        await conn.sendMessage(m.chat, { text: texto }, { quoted: m })
    }
}

handler.help = ['creador', 'dueño']
handler.tags = ['info']
handler.command = /^(owner|creador|creator|dueño|desarrollador)$/i

export default handler