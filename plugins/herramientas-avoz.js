import { exec } from 'child_process'
import { readFileSync, unlinkSync, writeFileSync } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''

    if (!/video|audio/.test(mime)) return m.reply(`*⚠️ Responde a un video o audio para convertirlo en Nota de Voz.*`)

    try {
        m.react('🎙️')
        let media = await q.download()
        if (!media) return m.reply('*❌ Error al descargar el archivo.*')

        let ran = join(process.cwd(), 'tmp', (1 * new Date) + '.mp3')
        let out = ran.replace('.mp3', '.opus')
        
        writeFileSync(ran, media)

        // Comando FFmpeg para convertir a OGG Opus (Formato nativo de Notas de Voz de WA)
        exec(`ffmpeg -i ${ran} -acodec libopus -filter:a "volume=1.0" -vbr on -compression_level 10 ${out}`, async (err) => {
            unlinkSync(ran)
            if (err) return m.reply('*❌ Error al procesar el audio.*')
            
            let buff = readFileSync(out)
            await conn.sendMessage(m.chat, { 
                audio: buff, 
                mimetype: 'audio/mp4', 
                ptt: true // Esto lo manda como nota de voz
            }, { quoted: m })
            
            unlinkSync(out)
        })
    } catch (e) {
        console.error(e)
        m.reply('*❌ Falló la conversión.*')
    }
}

handler.help = ['avoz']
handler.tags = ['tools']
handler.command = /^(tovn|avoz|ptt)$/i

export default handler