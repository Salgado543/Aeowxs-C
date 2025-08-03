/*
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

export default handler*/

let handler = async (m, { conn, text, participants, command }) => {
  global.siderList = global.siderList || {}

  if (command === 'fantasmas' || command === 'sider') {
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

    if (total === 0) return conn.reply(m.chat, `*⚠️ En este grupo no hay fantasmas xd.*`, m)

    let mensaje = `𝗙𝗔𝗡𝗧𝗔𝗦𝗠𝗔𝗦 𝗘𝗡𝗖𝗢𝗡𝗧𝗥𝗔𝗗𝗢𝗦 👻\n*INTEGRANTES:* ${sum}\n*INACTIVOS:* ${total}\n\nෆ *ETIQUETAS*\n${sider.map(v => '🤍👻 @' + v.replace(/@.+/, '')).join('\n')}`

    await conn.sendMessage(m.chat, {
      text: mensaje,
      mentions: sider,
      footer: '☕ Este mensaje puede no ser 100% preciso. El bot empieza a monitorear la inactividad desde que los usuarios se unen.',
      buttons: [
        {
          buttonId: '.kickfantasmas',
          buttonText: { displayText: '🚮 Eliminar fantasmas' },
          type: 1
        }
      ],
      headerType: 1
    }, { quoted: m })

    global.siderList[m.chat] = sider
  }

  if (command === 'kickfantasmas') {
    let sider = global.siderList[m.chat]
    if (!sider || !sider.length) return conn.reply(m.chat, '*⚠️ No hay fantasmas registrados o ya fueron expulsados.*', m)

    for (let user of sider) {
      try {
        await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
        await new Promise(resolve => setTimeout(resolve, 3000)) // ⏱ Espera de 3 segundos
      } catch (e) {
        await conn.reply(m.chat, `❌ No pude eliminar a: @${user.replace(/@.+/, '')}`, m, { mentions: [user] })
      }
    }

    conn.reply(m.chat, `✅ *Se eliminaron ${sider.length} fantasmas del grupo con 3 segundos de intervalo.*`, m)
    delete global.siderList[m.chat]
  }
}

handler.help = ['fantasmas', 'kickfantasmas']
handler.tags = ['gc']
handler.command = /^(fantasmas|sider|kickfantasmas)$/i
handler.admin = true
handler.botAdmin = true

export default handler
