let handler = async (m, { conn, text, isROwner, isOwner }) => {

if (text) {
global.db.data.chats[m.chat].sBye = text
conn.reply(m.chat, `*✅ La Despedida del grupo ha sido configurada*`, m, rcanal)  

} else {
    conn.reply(m.chat, `*${emojis} ¡Escribe el mensaje de despedida!*\n✎ *Puedes usar:*\n\n- *\`@user\`* (Mención al Usuario)\n- *\`@group\`* (Nombre del Grupo)\n- *\`@desc\`* (Descripción del Grupo)\n\n> ${emojis} Los @ son opcionales`, m)
}
}

handler.help = ['setbye @user + texto']
handler.tags = ['group']
handler.command = ['setbye', 'despedida'] 
handler.botAdmin = true
handler.admin = true
handler.group = true
export default handler