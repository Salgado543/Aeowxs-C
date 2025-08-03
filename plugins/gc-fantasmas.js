
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
