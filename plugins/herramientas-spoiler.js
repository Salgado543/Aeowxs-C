let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Si no hay texto, mostramos las instrucciones de uso
    if (!text) return m.reply(`*👻 GENERADOR DE SPOILER (LEER MÁS)*\n\n*¿Cómo usarlo?*\nEscribe el comando seguido del título visible y el texto oculto separados por una barra vertical (|).\n\n*Sintaxis:* \n\`${usedPrefix + command} Título Visible | Texto Oculto\`\n\n*Ejemplo:*\n> ${usedPrefix + command} Alerta de Spoiler | El protagonista era un fantasma todo el tiempo.\n\n_El bot enviará el mensaje sin etiquetarte para mayor discreción._`)

    let [l, r] = text.split('|')
    if (!l) l = "Leer más"
    if (!r) r = ""

    // Caracter invisible (Zero Width Space) repetido para forzar el "Leer más"
    const readMore = String.fromCharCode(8206).repeat(4001)

    // Si el usuario no puso separador |, todo el texto se va al final (oculto)
    // y ponemos "Leer más" por defecto arriba.
    if (!text.includes('|')) {
        l = "Leer más"
        r = text
    }

    let txt = `*${l.trim()}*\n${readMore}\n${r.trim()}`
    
    // Enviamos el mensaje SIN citar al usuario (sin quoted: m)
    await conn.sendMessage(m.chat, { text: txt })
}

handler.help = ['spoiler']
handler.tags = ['tools']
handler.command = /^(readmore|leermas|ocultar|hidetext|spoiler)$/i

export default handler