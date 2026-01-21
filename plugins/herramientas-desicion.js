let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply(`*⚠️ ¿Entre qué debo elegir?*\n\n> *Ejemplo:* ${usedPrefix + command} Pizza o Tacos?\n> *Ejemplo:* ${usedPrefix + command} Ir al cine, Dormir o Estudiar`)

    // 1. Limpiamos los signos de interrogación al final
    let cleanText = text.replace(/[?]+$/g, '').trim()

    // 2. Separamos por " o " (con espacios para evitar cortar palabras) o por comas
    // La expresión regular /\s+o\s+|,\s*/i busca " o " (sin importar mayúsculas) o comas
    let choices = cleanText.split(/\s+o\s+|,\s*/i).map(v => v.trim()).filter(v => v.length > 0)

    if (choices.length < 2) return m.reply('*❌ Necesito al menos dos opciones para poder elegir.*')

    let pick = choices.getRandom()

    // 3. Nuevo diseño de mensaje
    let txt = `*🔮 DECISIÓN FINAL 🔮*\n\n`
    txt += `> *Opciones:* ${choices.join(' | ')}\n\n`
    txt += `*👉 ELEGÍ:* \n> *${pick.toUpperCase()}*`

    m.reply(txt)
}

handler.help = ['elige']
handler.tags = ['tools']
handler.command = /^(elige|pick|decide|eleccion)$/i

export default handler