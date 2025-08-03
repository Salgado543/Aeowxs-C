
let handler = async (m, { conn, text, participants }) => {
  const member = participants.map(u => u.id)
  let sum = text ? parseInt(text) : member.length
  if (isNaN(sum) || sum <= 0) sum = member.length
  if (sum > member.length) sum = member.length

  let total = 0
  let sider = []

  for (let i = 0; i < sum; i++) {
    const id = member[i]
    const users = m.isGroup ? participants.find(u => u.id === id) : {}
    const user = global.db.data.users[id]
    const isInactive = !user || user.chat === 0
    const isNotAdmin = !users?.admin && !users?.superAdmin
    const isNotWhitelisted = user ? user.whitelist === false : true

    if (isInactive && isNotAdmin && isNotWhitelisted) {
      total++
      sider.push(id)
    }
  }

  if (total === 0) return conn.reply(m.chat, `*⚠️ En este grupo no hay fantasmas.*`, m)

  let mensaje = `𝗙𝗔𝗡𝗧𝗔𝗦𝗠𝗔𝗦 𝗘𝗡𝗖𝗢𝗡𝗧𝗥𝗔𝗗𝗢𝗦 👻\n*INTEGRANTES:* ${sum}\n*INACTIVOS:* ${total}\n\nෆ *ETIQUETAS*\n${sider.map(v => 'യ ׄ👻 @' + v.replace(/@.+/, '')).join('\n')}\n`
/*
  await conn.sendMessage(m.chat, {
    text: mensaje,
    mentions: sider,
    footer: '☕ 𝖤𝗌𝗍𝖾 𝗆𝖾𝗇𝗌𝖺𝗃𝖾 𝗉𝗎𝖾𝖽𝖾 𝗇𝗈 𝗌𝖾𝗋 𝖼𝗈𝗆𝗉𝗅𝖾𝗍𝖺𝗆𝖾𝗇𝗍𝖾 𝗉𝗋𝖾𝖼𝗂𝗌𝗈, 𝖾𝗅 𝖻𝗈𝗍 𝖼𝗈𝗆𝗂𝖾𝗇𝗓𝖺 𝖺 𝗆𝗈𝗇𝗂𝗍𝗈𝗋𝖾𝖺𝗋 𝗅𝖺 𝗂𝗇𝖺𝖼𝗍𝗂𝗏𝗂𝖽𝖺𝖽 𝖽𝖾𝗌𝖽𝖾 𝖾𝗅 𝗆𝗈𝗆𝖾𝗇𝗍𝗈 𝖾𝗇 𝗊𝗎𝖾 𝗌𝖾 𝗎𝗇𝗂ó.',
    buttons: [
      {
        buttonId: `.kickfantasmas`,
        buttonText: { displayText: '🚮 𝖤𝗅𝗂𝗆𝗂𝗇𝖺𝗋 𝖿𝖺𝗇𝗍𝖺𝗌𝗆𝖺𝗌' },
        type: 1
      }
    ],
    headerType: 1
  }, { quoted: m })
*/

  await conn.sendMessage(m.chat, {
    text: mensaje,
    mentions: sider
  }, { quoted: m })


global.siderList = global.siderList || {}
global.siderList[m.chat] = sider

}

handler.help = ['fantasmas']
handler.tags = ['gc']
handler.command = /^(fantasmas|sider)$/i
handler.admin = true
handler.botAdmin = true

export default handler

/* 
- Código Mejorado Por WillZek 🗿🍷
- Etiqueta A Los Inactivos En Los Grupos De WhatsApp💫
- https://whatsapp.com/channel/0029Vb1AFK6HbFV9kaB3b13W
*/
let handler = async (m, { conn, text, participants }) => {
let member = participants.map(u => u.id)
if(!text) {
var sum = member.length
} else {
var sum = text} 
var total = 0
var sider = []
for(let i = 0; i < sum; i++) {
let users = m.isGroup ? participants.find(u => u.id == member[i]) : {}
if((typeof global.db.data.users[member[i]] == 'undefined' || global.db.data.users[member[i]].chat == 0) && !users.isAdmin && !users.isSuperAdmin) { 
if (typeof global.db.data.users[member[i]] !== 'undefined'){
if(global.db.data.users[member[i]].whitelist == false){
total++
sider.push(member[i])}
}else {
total++
sider.push(member[i])}}}
if(total == 0) return conn.reply(m.chat, `*${emojis} En Este Grupo No Hay Fantasmas*`, m, rcanal)

 const stickerUrl = 'https://files.catbox.moe/agx2sc.webp'; 
m.react('💫')
    await conn.sendFile(m.chat, stickerUrl, 'sticker.webp', '', m, null);

m.reply(`⚠ *FANTASMAS - INACTIVOS* ⚠\n\n𝙶𝚁𝚄𝙿𝙾: ${await conn.getName(m.chat)} & 𝙼𝙸𝙴𝙼𝙱𝚁𝙾𝚂: \n${sum}\n\n[ ⇲ 𝙻𝙸𝚂𝚃𝙰 𝙳𝙴 𝙵𝙰𝙽𝚃𝙰𝚂𝙼𝙰𝚂 ⇱ ]\n${sider.map(v => '  👻 @' + v.replace(/@.+/, '')).join('\n')}\n\n𝙽𝙾𝚃𝙰: 𝙴𝚂𝚃𝙾 𝙽𝙾 𝙿𝚄𝙴𝙳𝙴 𝚂𝙴𝚁 𝟷𝟶𝟶% 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙾, 𝙴𝙻 𝙱𝙾𝚃 𝙸𝙽𝙸𝙲𝙸𝙰 𝙴𝙻 𝙲𝙾𝙽𝚃𝙴𝙾 𝙳𝙴 𝙼𝙴𝙽𝚂𝙰𝙹𝙴𝚂 𝙳𝙴𝚂𝙳𝙴 𝙻𝙰 𝙰𝙲𝚃𝙸𝚅𝙰𝙲𝙸Ó𝙽 𝙴𝙽 𝙴𝚂𝚃𝙴 𝙶𝚁𝚄𝙿𝙾`, null, { mentions: sider })}
handler.help = ['fantasmas']
handler.tags = ['gc']
handler.command = /^(fantasmas|sider)$/i
handler.admin = true
handler.botAdmin = true
export default handler