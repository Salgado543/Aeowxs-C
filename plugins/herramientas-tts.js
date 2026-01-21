import gtts from 'node-gtts'
import { readFileSync, unlinkSync } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let lang = 'es' // Idioma por defecto
    if (!text && m.quoted?.text) text = m.quoted.text
    if (!text) return m.reply(`*⚠️ Escribe el texto que quieres convertir a voz.*\n\n> *Ejemplo:* ${usedPrefix + command} Hola gio, ¿cómo estás?`)

    try {
        m.react('🗣️')
        let res = await tts(text, lang)
        
        // Enviamos como nota de voz (PTT)
        await conn.sendMessage(m.chat, { 
            audio: res, 
            mimetype: 'audio/mp4', 
            ptt: true 
        }, { quoted: m })

    } catch (e) {
        m.reply('*❌ Error:* No se pudo generar el audio.')
    }
}

handler.help = ['tts <texto>']
handler.tags = ['tools']
handler.command = /^(tts|voz|decir)$/i

export default handler

function tts(text, lang = 'es') {
    return new Promise((resolve, reject) => {
        try {
            let t = gtts(lang)
            let filePath = join(process.cwd(), 'tmp', (1 * new Date) + '.wav')
            t.save(filePath, text, () => {
                let res = readFileSync(filePath)
                unlinkSync(filePath)
                resolve(res)
            })
        } catch (e) { reject(e) }
    })
}