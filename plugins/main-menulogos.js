import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix: _p }) => {

  const txt = `${emoji2}ㅤִ    Menu Logos    `
  const sun = '𝐀𝐞𝐨𝐰𝐱𝐬 𝐂𝐥𝐮𝐛'
  let usertag = '@' + m.sender.split('@')[0]
  const img = await (await fetch('https://files.catbox.moe/3fypzn.jpg')).buffer()

  let tags = {
    "logos": "「 Logos 」🏕️"
  }

  let emojis = {
    "logos": "🏕️"
  }

  let defaultMenu = {
    before: `*Bienvenido al Menú Logos 🫟*
`,

    header: category => `╭──• ${category}`,
    body: (cmd, emoji) => `│${emoji}° ${cmd}`,
    footer: '╰──•',
    after: `> ${wm}`
  }

  let help = Object.values(global.plugins)
    .filter(plugin => !plugin.disabled)
    .map(plugin => ({
      help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags]
    }))

  let groups = {}
  for (let tag in emojis) {
    groups[tag] = help.filter(plugin => plugin.tags.includes(tag))
  }
  let text = [
    defaultMenu.before,
    ...Object.keys(tags).map(tag =>
      [
        defaultMenu.header(tags[tag]),
        groups[tag].flatMap(plugin => plugin.help.map(cmd => defaultMenu.body(_p + cmd, emojis[tag]))).join('\n'),
        defaultMenu.footer
      ].join('\n')
    ),
    defaultMenu.after
  ].join('\n')

await m.react('🫟')
await conn.sendShadow(m.chat, txt, sun, text, img, img, redes, fkontak, true, [m.sender])}

handler.tags = ['main']
handler.help = ['menulogos']
handler.command = ['menulogos', 'logosmenu', 'logos'];
handler.fail = null;

export default handler
