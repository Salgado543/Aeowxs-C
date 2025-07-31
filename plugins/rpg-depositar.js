import db from '../lib/database.js'

let handler = async (m, { args }) => {
let user = global.db.data.users[m.sender]
if (!args[0]) return m.reply(`*${emojis} Ingresa la cantidad de coins que deseas depositar en el banco.*`)
if ((args[0]) < 1) return m.reply('*⚠️ Ingresa una cantidad válida de coins que tienes.*')
if (args[0] == 'all') {
let count = parseInt(user.coins)
user.coins -= count * 1
user.bank += count * 1
await m.reply(`*🏦 Depositaste \`${count}\` ${moneda} al Banco.*`)
return !0
}
if (!Number(args[0])) return m.reply('*⚠️ La cantidad deve ser un número.*')
let count = parseInt(args[0])
if (!user.coins) return m.reply('*✖️ No tienes ${moneda} en tu Cartera.*')
if (user.coins < count) return m.reply(`*🪙 Solo tienes ${user.coins} ${moneda} en tu Cartera.*`)
user.coins -= count * 1
user.bank += count * 1
await m.reply(`*🏦 Depositaste \`${count}\` ${moneda} al Banco.*`)}

handler.help = ['depositar']
handler.tags = ['rpg']
handler.command = ['d', 'depositar', 'dep', 'aguardar']
handler.register = true 
handler.group = true
export default handler 