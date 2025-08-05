import fs from 'fs'
import { xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let { exp, coins, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)

    exp = exp || '0'
    role = role || 'Novato'

    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0]
    const _uptime = process.uptime() * 1000
    const uptime = clockString(_uptime)

    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered).length
    const readMore = '\u200b'.repeat(850)

    await m.react('👑')

    const vid = 'https://files.catbox.moe/js58k4.mp4'

let tags = {};
let emojis = {
  main: "🌴",
  info: "🍮",
  config: "⚙️",
  dl: "🥡",
  search: "🧋",
  ia: "🤖",
  ff: "🍡",
  frases: "💞",
  converter: "🪾",
  tools: "🛠️",
  gc: "☕",
  efectos: "🪻",
  fun: "🪸",
  game: "🍭",
  anime: "🍬",
  logos: "🏝️",
  emox: "🪼",
  nsfw: "🍒",
  sticker: "⚡",
  rpg: "💸",
  rg: "🪴",
  owner: "👑"
};

const tagTitles = {
  main: "Menus",
  info: "Info",
  config: "Ajustes",
  dl: "Download",
  search: "Search",
  ia: "Inteligencias",
  ff: "Free Fire",
  frases: "Frases",
  converter: "Converters",
  tools: "Herramientas",
  gc: "Grupos",
  efectos: "Efectos",
  fun: "Diversión",
  game: "Juegos",
  anime: "Random",
  logos: "Logos",
  emox: "Gifs-Nsfw",
  nsfw: "Nsfw",
  sticker: "Sticker",
  rpg: "Rpg",
  rg: "Registro",
  owner: "Owner"
};

for (let key in emojis) {
  tags[key] = `「 *${tagTitles[key]}* 」 ${emojis[key]}`;
}

    let defaultMenu = {


    before: `୧ ‧₊˚ 🍮 ¡𝖧𝗈𝗅𝖺!, ${saludo} ‧₊𓏲 ๋࣭ ࣪ ˖
⋆｡˚${taguser}  ೀ
── .✦ 𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝗂𝖽𝗈 𝖺𝗅 𝖬𝖾𝗇𝗎́  જ⁀➴
ㅤㅤㅤ   𐙚⋆°  𝖽𝖾 𝖪𝖺𝗂𝗌𝖾𝗋  ࣪⛅˖ 𓂃

> ꒰꛱ ͜Desarrollado por *Dev.Criss 🇦🇱*
@${creadorN}

🥞 \`𝖡𝗈𝗍𝖭𝖺𝗆𝖾:\` ${botname}
🌴 \`𝖵𝖾𝗋𝗌𝗂𝗈𝗇:\` ${vs}
🍃 \`𝖴𝗉𝗍𝗂𝗆𝖾:\` ${uptime}
👥 \`𝖴𝗌𝖾𝗋𝗌:\` ${totalreg}

🪙°⤷ 𝖢𝗈𝗂𝗇𝗌: ${coins}
💫°⤷ 𝖤𝗑𝗉: ${exp}
🆙°⤷ 𝖭𝗂𝗏𝖾𝗅: ${level}
🛡️°⤷ 𝖱𝗈𝗅𝖾: ${role}

> 👑 𝖲𝗂 𝖾𝗇𝖼𝗎𝖾𝗇𝗍𝗋𝖺 𝗎𝗇 𝖼𝗈𝗆𝖺𝗇𝖽𝗈 𝖼𝗈𝗇 𝖾𝗋𝗋𝗈𝗋𝖾𝗌 𝗇𝗈 𝖽𝗎𝖽𝖾𝗌 𝖾𝗇 𝗋𝖾𝗉𝗈𝗋𝗍𝖺𝗋𝗅𝗈 𝖼𝗈𝗇 𝖾𝗅 𝖢𝗋𝖾𝖺𝖽𝗈𝗋
${readMore}
ㅤㅤ *乂 ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs 乂*
`,

      header: category => `╭──•${category}`,
      body: (cmd, emoji) => `│${emoji} ${cmd}`,
      footer: '╰──•',
      after: `> ${dev}`
  }

    let help = Object.values(global.plugins)
      .filter(plugin => !plugin.disabled)
      .map(plugin => ({
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags]
      }))

    let groupsByTag = {}
    for (let tag in emojis) {
      groupsByTag[tag] = help.filter(plugin => plugin.tags.includes(tag))
    }

    let menuText = [
      defaultMenu.before,
      ...Object.keys(tags).map(tag =>
        [
          defaultMenu.header(tags[tag]),
          groupsByTag[tag].flatMap(plugin => plugin.help.map(cmd => defaultMenu.body(usedPrefix + cmd, emojis[tag]))).join('\n'),
          defaultMenu.footer
        ].join('\n')
      ),
      defaultMenu.after
    ].join('\n')


   await conn.sendMessage(m.chat, {
    video: { url: vid },
    caption: menuText,
    mentions: [m.sender, creadorM],
    gifPlayback: true
  }, { quoted: fkontak })

  } catch (e) {
    console.error(e)
    await m.reply('*❌ Hubo un error al generar el menú.*')
  }
}


handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|cmd)$/i;
export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}