
let handler = async (m, { conn, text }) => {

let user = global.db.data.users[m.sender]

user.registered = false
return conn.reply(m.chat, `*${emojis} Registro eliminado.*\n> *Ya no estás en mi base de datos*`, m)

}
handler.help = ['unreg']
handler.tags = ['rg']
handler.command = /^unreg(ister)?$/i
handler.register = true
export default handler