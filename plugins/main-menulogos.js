let handler = async (m, { conn, usedPrefix: _p }) => {

  let usertag = '@' + m.sender.split('@')[0]
  const img = 'https://files.catbox.moe/povyqs.jpg'

  let tags = {
    "logos": "「 *Logos* 」🏝️"

  }

  let emojis = {
    "logos": "🏝️"
  }

  let defaultMenu = {
    before: `*👋🏻 ¡Hola!* *${usertag}*
*Bienvenido al Menú Logos 🏝️*

> \`\`\`${fechaHora}\`\`\`
`,

    header: category => `╭──• ${category}`,
    body: (cmd, emoji) => `│${emoji}° ${cmd}`,
    footer: '╰──•',
    after: `> ${dev}`
  }

// ---[ AGRUPACIÓN CMDS X TAGS ]---
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

// ---[ CONTRUCCIÓN DEL TXT ]---
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

  await m.react('🏝️')
  await conn.sendMessage(m.chat, {
    video: { url: vid },
    caption: text,
    mentions: [m.sender],
    gifPlayback: false
  }, { quoted: fkontak })
}

handler.tags = ['main']
handler.help = ['menulogos']
handler.command = ['menulogos', 'logosmenu', 'logos'];
handler.fail = null;

export default handler




import fetch from 'node-fetch';

const handler = async (m, {conn, usedPrefix, text}) => {

  try {
    await m.react ('🖼️');
    const videoUrl = 'https://files.catbox.moe/g4yv7k.mp4'
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const str = `*Hola ${taguser} este es el Menú Logos*

╭──•「 *Logos* 」📑
│🖼️ ${usedPrefix}balogo *texto*
│🖼️ ${usedPrefix}logocorazon *texto*
│🖼️ ${usedPrefix}logochristmas  *texto*
│🖼️ ${usedPrefix}logopareja *texto*
│🖼️ ${usedPrefix}logoglitch *texto*
│🖼️ ${usedPrefix}logosad *texto*
│🖼️ ${usedPrefix}logogaming *texto*
│🖼️ ${usedPrefix}logosolitario *texto*
│🖼️ ${usedPrefix}logodragonball *texto*
│🖼️ ${usedPrefix}logoneon *texto*
│🖼️ ${usedPrefix}logogatito *texto*
│🖼️ ${usedPrefix}logochicagamer *texto*
│🖼️ ${usedPrefix}logonaruto *texto*
│🖼️ ${usedPrefix}logofuturista *texto*
│🖼️ ${usedPrefix}logonube *texto*
│🖼️ ${usedPrefix}logoangel *texto*
│🖼️ ${usedPrefix}logomurcielago *texto*
│🖼️ ${usedPrefix}logocielo *texto*
│🖼️ ${usedPrefix}logograffiti3d *texto*
│🖼️ ${usedPrefix}logomatrix *texto*
│🖼️ ${usedPrefix}logohorror *texto*
│🖼️ ${usedPrefix}logoalas *texto*
│🖼️ ${usedPrefix}logoarmy *texto*
│🖼️ ${usedPrefix}logopubg *texto*
│🖼️ ${usedPrefix}logopubgfem *texto*
│🖼️ ${usedPrefix}logolol *texto*
│🖼️ ${usedPrefix}logoamon *texto*gus
│🖼️ ${usedPrefix}logovideopubg *texto*
│🖼️ ${usedPrefix}logovideotiger *texto*
│🖼️ ${usedPrefix}logovideointro *texto*
│🖼️ ${usedPrefix}logovideogaming *texto*
│🖼️ ${usedPrefix}logoguerrero *texto*
│🖼️ ${usedPrefix}logoportadaplayer *texto*
│🖼️ ${usedPrefix}logoportadaff *texto*
│🖼️ ${usedPrefix}logoportadapubg *texto*
│🖼️ ${usedPrefix}logoportadacounter *texto*
╰──•
`.trim();

      await conn.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: str,
            mentions: [m.sender],
            gifPlayback: true
        }, { quoted: fkontak })

  } catch (e) {
    conn.reply(m.chat,`*❌ Error al enviar el menú.*\n${e}`, m);
  }
};

handler.command = /^(menulogos|menu2)$/i;
handler.fail = null;

export default handler;

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}