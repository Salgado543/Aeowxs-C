import db from '../lib/database.js'

let handler = async (m, { args }) => {
let user = global.db.data.users[m.sender]
if (!args[0]) return m.reply(`*${emoji} Ingresa la cantidad de coins que deseas retirar.*`)
if (args[0] == 'all') {
let count = parseInt(user.bank)
user.bank -= count * 1
user.coins += count * 1
await m.reply(`*${emoji} Retiraste ${count} ${moneda} del banco, ahora podras usarlo pero también podrán robartelo.*`)
return !0
}
if (!Number(args[0])) return m.reply(`*⚠️ Debes retirar una cantidad válida.*`)
let count = parseInt(args[0])
if (!user.bank) return m.reply(`*✖️ No tienes suficientes ${moneda} en el Banco.*`)
if (user.bank < count) return m.reply(`*🪙 Solo tienes ${user.bank} ${moneda} en el Banco.*`)
user.bank -= count * 1
user.coins += count * 1
await m.reply(`*${emojis} Retiraste ${count} ${moneda} del banco, ahora podras usarlo pero también podrán robartelo.*`)}

handler.help = ['retirar']
handler.tags = ['rpg']
handler.command = ['withdraw', 'retirar', 'with']
handler.group = true
handler.register = true

export default handler