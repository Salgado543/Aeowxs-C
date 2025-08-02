import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, __dirname, command }) => {
  try {
    let { exp, coins, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)

    exp = exp || '0'
    role = role || 'Novato'

    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0]
    const _uptime = process.uptime() * 1000
    const uptime = clockString(_uptime)

    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered).length
    const readMore = '\u200b'.repeat(850)

    await m.react(emojis)

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

    const vid = 'https://files.catbox.moe/39rx3n.mp4'

let tags = {};
let emojis = {
  main: "🤍",
  info: "☁️",
  config: "⚙️",
  download: "🫧",
  search: "🧋",
  ia: "🤖",
  ff: "👾",
  frases: "💞",
  converter: "🪾",
  tools: "🛠️",
  gc: "🌲",
  efectos: "🪻",
  fun: "🍿",
  game: "🕹️",
  anime: "🍬",
  logos: "🏝️",
  emox: "🪼",
  nsfw: "🍒",
  sticker: "⚡",
  rpg: "💸",
  rg: "🪴",
  owner: "☕"
};

const tagTitles = {
  main: "Menus",
  info: "Info",
  config: "Ajustes",
  download: "Download",
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


    before: `ㅤㅤ   ⩁꯭ ͡  ͡ᩚ꯭ ꯭⩁ㅤㅤ𑁯🤍ᰍㅤㅤ⩁꯭ ͡  ͡ᩚ꯭ ꯭⩁
೯ ׅ 👤 ¡Hᴏʟᴀ! ¿Cᴏᴍᴏ Esᴛᴀ́s? ׄ ᦡᦡ
ㅤ꒰͜͡${taguser}
ㅤㅤ♡𑂳ᩙㅤ ּ ${saludo} ׄ ㅤタス

🥞 𝖠𝖼𝗍𝗂𝗏𝗈: ${uptime}
👥 𝖴𝗌𝗎𝖺𝗋𝗂𝗈𝗌: ${totalreg}
🥧 𝖵𝖾𝗋𝗌𝗂𝗈́𝗇: 3.0.0
☕ 𝖢𝗋𝖾𝖺𝖽𝗈𝗋: @${creadorN}

💎 𝖣𝗂𝖺𝗆𝖺𝗇𝗍𝖾𝗌: ${diamantes}
🥮 𝖤𝗑𝗉: ${exp}
🥠 𝖭𝗂𝗏𝖾𝗅: ${level}
🍙 𝖱𝖺𝗇𝗀𝗈: ${role}

ㅤ ㅤ   乂 *ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs* 乂
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
    caption: text,
    mentions: [m.sender, creadorM],
    gifPlayback: true
  }, { quoted: fkontak })
}

handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|cmd)$/i;
export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}