import db from '../lib/database.js'

let handler = async (m, { args }) => {
  let user = global.db.data.users[m.sender]

  user.bank = user.bank || 0
  user.coins = user.coins || 0

  if (!args[0]) return m.reply(`*${emojis} Ingresa la cantidad de ${moneda} que deseas retirar.*`)

  if (args[0].toLowerCase() === 'all') {
    let count = user.bank
    if (count <= 0) return m.reply(`*✖️ No tienes ${moneda} en el banco para retirar.*`)
    user.bank = 0
    user.coins += count
    await m.reply(`*${emojis} Retiraste ${count} ${moneda} del banco, ahora podrás usarlo pero también podrán robártelo.*`)
    return
  }

  if (isNaN(args[0]) || parseInt(args[0]) <= 0)
    return m.reply(`*⚠️ Debes retirar una cantidad válida mayor que cero.*`)

  let count = parseInt(args[0])
  if (user.bank < count)
    return m.reply(`*🪙 Solo tienes ${user.bank} ${moneda} en el banco.*`)

  user.bank -= count
  user.coins += count

  await m.reply(`*${emojis} Retiraste ${count} ${moneda} del banco, ahora podrás usarlo pero también podrán robártelo.*`)
}

handler.help = ['retirar']
handler.tags = ['rpg']
handler.command = ['withdraw', 'retirar', 'with']
handler.group = true
handler.register = true

export default handler