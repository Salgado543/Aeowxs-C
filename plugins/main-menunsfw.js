let handler = async (m, { conn, usedPrefix: _p }) => {

  const txt = 'Tes'
  const sun = 'Tes2'
  let usertag = '@' + m.sender.split('@')[0]
  const img = 'https://files.catbox.moe/xzy0tf.jpg'

  let tags = {
    "xsearch": "「 *Search* 」🔎",
    "xdl": "「 *Download* 」🥟",
    "emox": "「 *Gifs* 」🪼",
    "nsfw": "「 *Contenido* 」🍒"
  }

  let emojis = {
    "xsearch": "🔎",
    "xdl": "🥟",
    "emox": "🪼",
    "nsfw": "🍒"
  }

  let defaultMenu = {
    before: `*👋🏻 ¡Hola!* *${usertag}*
*Bienvenido al Menú Nsfw* 🔞

> \`\`\`${fechaHora}\`\`\`
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

  await m.react('🔥')
 /* await conn.sendMessage(m.chat, {
    image: { url: img },
    caption: text,
    mentions: [m.sender],
    gifPlayback: false
  }, { quoted: fkontak })*/
 await conn.sendShadow(
m.chat,
txt,
sun,
text,
img,
img,
ig,
fkontak,
true,
[m.sender]
)}

}

handler.tags = ['main']
handler.help = ['menu18']
handler.command = /^(menunsfw|comandosnsfw|menuhorny|hornymenu|labiblia|menu18|menu\+18|menucaliente|menuporno|pornomenu|menuxxx)$/i;
handler.fail = null;

export default handler
