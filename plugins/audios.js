let handler = async (m, { conn, command }) => {
    // 🎵 LISTA DE AUDIOS 🎵
    // Formato: 'comando': 'enlace_del_audio'
    // Puedes subir tus propios audios a sitios como qu.ax o catbox.moe y pegar el link aquí.
    
    const audios = {
        // Clásicos
        'fino': 'https://qu.ax/Ocxm.mp3',
        'bañate': 'https://qu.ax/PyhL.mp3',
        'admin': 'https://qu.ax/jXgJ.mp3',
        'viernes': 'https://qu.ax/YfY.mp3',
        'buenosdias': 'https://qu.ax/MhMv.mp3',
        
        // Memes
        'tilin': 'https://qu.ax/sTJ.mp3',
        'elpepe': 'https://qu.ax/hYal.mp3',
        'etesech': 'https://qu.ax/QpQ.mp3',
        'potaxio': 'https://qu.ax/Zgqz.mp3', // Añañin / Potaxio mix
        'maau': 'https://qu.ax/XwX.mp3',
        'yamete': 'https://qu.ax/YwY.mp3',
        'uwu': 'https://qu.ax/UwU.mp3',
        
        // Reacciones
        'triste': 'https://qu.ax/SaD.mp3', // Violín triste
        'sorpresa': 'https://qu.ax/WoW.mp3',
        'no': 'https://qu.ax/nO.mp3', // Bugs Bunny No
        'si': 'https://qu.ax/sI.mp3',
        'risa': 'https://qu.ax/HaHa.mp3',
        
        // Tóxicos
        'callate': 'https://qu.ax/Shh.mp3',
        'vete': 'https://qu.ax/GtO.mp3',
        'basura': 'https://qu.ax/Trsh.mp3'
    }

    const audioUrl = audios[command]

    if (!audioUrl) return

    try {
        // Reacción para confirmar
        await m.react('🎵')
        
        await conn.sendMessage(m.chat, { 
            audio: { url: audioUrl }, 
            mimetype: 'audio/mp4', 
            ptt: true // true = Nota de voz, false = Archivo de audio
        }, { quoted: m })
        
    } catch (e) {
        console.error(e)
        m.reply('*❌ Error:* No se pudo enviar el audio. El enlace puede estar caído.')
    }
}

// Aquí registramos todos los comandos de la lista para que el bot los reconozca
handler.help = ['fino', 'bañate', 'admin', 'tilin', 'elpepe', 'yamete', 'triste', 'callate']
handler.tags = ['audios']
handler.command = /^(fino|bañate|admin|viernes|buenosdias|tilin|elpepe|etesech|potaxio|maau|yamete|uwu|triste|sorpresa|no|si|risa|callate|vete|basura)$/i

export default handler