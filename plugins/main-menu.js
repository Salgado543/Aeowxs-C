import { xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
  // ==========================================
  // 🛡️ ZONA DE PROTECCIÓN ANTI-BAN (MENU) 🛡️
  // ==========================================
  
  // 1. Simular "Escribiendo..."
  // Es vital para el menú porque es un mensaje largo.
  await conn.sendPresenceUpdate('composing', m.chat)

  // 2. Calcular tiempo de espera (3 a 6 segundos)
  // Un menú tarda en generarse y leerse, un delay largo es natural.
  const min = 3000
  const max = 6000
  const delay = Math.floor(Math.random() * (max - min + 1)) + min

  // 3. Esperar el tiempo calculado
  await new Promise(resolve => setTimeout(resolve, delay))
  
  // ==========================================
  // 🏁 FIN DE PROTECCIÓN
  // ==========================================

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

    // Movemos la reacción para después del delay, así confirma que "ya terminó de pensar"
    await m.react('🎆')

    // --- CONFIGURACIÓN DE IMÁGENES ---
    const imgMain = 'https://github.com/Salgado543/Gioqz-Bot-V2-WPP/blob/main/mm.jpeg?raw=true' 
    const imgThumb = 'https://github.com/Salgado543/Gioqz-Bot-V2-WPP/blob/main/8cdf161bc542600cea6399615b54b7c0.jpg?raw=true' 

    // --- CATEGORÍAS ---
    let emojis = {
      main: "🔖",
      info: "🥥",
      config: "🦠",
      dl: "⛄",
      search: "🍫",
      ia: "🪢",
      ff: "🧋",
      frases: "🎭",
      converter: "🫗",
      tools: "🦭",
      gc: "🪨",
      efectos: "🪻",
      fun: "🐚",
      game: "🫘",
      reaction: "🥡",
      anime: "🍭",
      logos: "🧈",
      emox: "🪼",
      sticker: "🍷",
      rpg: "🎩",
      rg: "✒️",
      owner: "☕"
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
      reaction: "Reacciones",
      anime: "Random",
      logos: "Logos",
      emox: "Gifs-Nsfw",
      sticker: "Sticker",
      rpg: "Rpg",
      rg: "Registro",
      owner: "Owner"
    };

    let tags = {};
    for (let key in emojis) {
      tags[key] = `೯.    ᪲    ׄ *${tagTitles[key]}* ׄ    ${emojis[key]}ㅤ ‎ ‎⊹`;
    }

    // --- DISEÑO DE ESTRUCTURA (ACTUALIZADO) ---
    // Usamos global.botname si existe, sino un fallback
    const botNameStr = global.botname || 'Gio Bot';

    let defaultMenu = {
      before: `೯🥥᪲    ׄ ㅤׅ 𝗠𝗲𝗻𝘂 𝗽𝗿𝗶𝗻𝗰𝗶𝗽𝗮𝗹  𓈒    ׄ    ᦡᦡ
೯👒᪲    ׄ ㅤׅ𝗕𝗼𝘁𝗡𝗮𝗺𝗲: ${botNameStr}
೯🌺᪲    ׄ ㅤׅ𝗨𝘀𝗲𝗿𝘀: ${totalreg}

ㅤㅤ *乂̴    𝐋𝐢𝐬𝐭𝐚 𝐝𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬    乂̴*
`,
      header: category => `╭──• ${category}`,
      body: (cmd, emoji) => `│${emoji}° ${cmd}`,
      footer: '╰──•',
      after: `\n> ${global.wm || 'Bot WhatsApp'}`
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

    // Generación del texto del menú
    let menuText = [
      defaultMenu.before,
      ...Object.keys(tags).map(tag => {
        const filteredHelp = groupsByTag[tag]
        if (filteredHelp.length === 0) return null // No mostrar categorías vacías
        
        return [
          defaultMenu.header(tags[tag]),
          filteredHelp.flatMap(plugin => 
            plugin.help.map(cmd => defaultMenu.body(usedPrefix + cmd, emojis[tag]))
          ).join('\n'),
          defaultMenu.footer
        ].join('\n')
      }).filter(v => v !== null),
      defaultMenu.after
    ].join('\n')

    await conn.sendMessage(m.chat, {
      image: { url: imgMain },
      caption: menuText,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: false,
        forwardingScore: 0,
        externalAdReply: {
          title: `${global.usname || 'User'}, Have a great day!!`,
          body: `𝖻𝗒 ${global.ownname || 'Creator'}`,
          thumbnail: await (await fetch(imgThumb)).buffer(),
          sourceUrl: global.channel || 'https://whatsapp.com',
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m }); 

  } catch (e) {
    console.error(e)
    await m.reply('*❌ Hubo un error al generar el menú.*')
  }
}

handler.command = /^(menu|menú|memu|memú|help|info|comandos|ayuda|cmd)$/i;
export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}