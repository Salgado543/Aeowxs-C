let handler = async (m, { text, usedPrefix, command }) => {
    let [count, ...msg] = text.split(' ')
    msg = msg.join(' ')

    if (!count || !msg || isNaN(count)) return m.reply(`*⚠️ Uso correcto:* ${usedPrefix + command} <cantidad> <texto>\n\n> *Ejemplo:* ${usedPrefix + command} 10 Hola grupo`)

    let num = parseInt(count)
    if (num > 500) return m.reply('*⚠️ El límite máximo es de 500 repeticiones para evitar lag.*')
    if (num <= 0) return m.reply('*❌ Cantidad inválida.*')

    try {
        m.react('🚀')
        // Generamos el texto repetido localmente
        let spam = Array(num).fill(msg).join('\n')
        
        // Si el texto es muy largo, lo mandamos como archivo o con readmore
        if (spam.length > 4000) {
            await conn.reply(m.chat, `*🚀 REPETICIÓN TURBO:*\n\n${spam.slice(0, 1000)}...\n\n*Texto demasiado largo, se cortó la previsualización.*`, m)
        } else {
            await m.reply(spam)
        }
    } catch (e) {
        m.reply('*❌ Error al generar la repetición.*')
    }
}

handler.help = ['spam']
handler.tags = ['tools']
handler.command = /^(spam|repetir|repite)$/i

export default handler