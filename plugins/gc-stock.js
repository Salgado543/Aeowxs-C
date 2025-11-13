import fs from 'fs'
const shadow = './stock.json'

function loadStocks() {
if (!fs.existsSync(shadow)) return {}
return JSON.parse(fs.readFileSync(shadow))
}

function saveStocks(data) {
fs.writeFileSync(shadow, JSON.stringify(data, null, 2))
}

const handler = async (m, { text, command }) => {
const user = m.sender
const db = loadStocks()
if (!db[user]) db[user] = {}

if (command === 'liststock' || command === 'stocklist') {
const stocks = db[user]
const keys = Object.keys(stocks)
if (keys.length === 0) return m.reply('🤍 *No tienes ningún stock creado.*')

let msg = '📋 *TUS STOCKS CREADOS:*\n\n'
for (const num of keys.sort((a, b) => a - b)) {
msg += `🔹 Stock ${num}: ${stocks[num]}\n`
}
return m.reply(msg.trim())
}

if (command === 'stock') {
const content = text.trim()
const userStocks = db[user]
const keys = Object.keys(userStocks).map(n => Number(n))
if (!content) return m.reply('🤍 *Ingresa un texto para crear el stock.*')
if (keys.length >= 15) return m.reply('⚠️ *Solo puedes tener hasta 15 stocks.*')

let newNumber = 1
while (userStocks[newNumber]) newNumber++
db[user][newNumber] = content
saveStocks(db)
return m.reply(`✅ *Stock ${newNumber} creado correctamente.*`)
}

if (command === 'setstock') {
const args = text.trim().split(/\s+/)
const listNumber = args.shift()
const newContent = args.join(' ').trim()
if (!listNumber || isNaN(listNumber) || Number(listNumber) < 1 || Number(listNumber) > 15)
return m.reply('⚠️ *Usa un número válido entre 1 y 15.*\nEjemplo: *.setstock 2 Nuevo texto*')
if (!newContent) return m.reply('📝 *Ingresa un texto para actualizar el stock.*')

const num = Number(listNumber)
if (!db[user][num]) return m.reply(`⚠️ *El stock ${num} no existe.*`)
db[user][num] = newContent
saveStocks(db)
return m.reply(`✏️ *Stock ${num} actualizado correctamente.*`)
}

if (command === 'delstock') {
const num = Number(text.trim())
if (!text || isNaN(num) || num < 1 || num > 15)
return m.reply('⚠️ *Ingresa un número válido entre 1 y 15.*\nEjemplo: *.delstock 3*')
if (!db[user][num]) return m.reply(`⚠️ *El stock ${num} no existe.*`)
delete db[user][num]
saveStocks(db)
return m.reply(`🗑️ *Stock ${num} eliminado correctamente.*`)
}

if (command === 'removestock') {
delete db[user]
saveStocks(db)
return m.reply('🧹 *Todos tus stocks fueron eliminados completamente.*')
}
}

handler.help = ['stock', 'setstock', 'delstock', 'liststock', 'removestock']
handler.tags = ['tools']
handler.command = ['stock', 'setstock', 'delstock', 'liststock', 'stocklist', 'removestock']

export default handler