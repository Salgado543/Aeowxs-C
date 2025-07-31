import { createHash } from 'crypto'
import fetch from 'node-fetch'

const fkontak = {
  key: { participant: '0@s.whatsapp.net' },
  message: {
    locationMessage: { displayName: `${botname}`, vcard: '' }
  }
}

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  const user = global.db.data.users[m.sender]

  if (user.registered === true) {
    return m.reply(`*✅ Ya estás registrado.*\n*¿Deseas volver a registrarte?*\n> *Usa:* ${usedPrefix}unreg*`)
  }

  if (!Reg.test(text)) {
    return m.reply(`*⚠️ Formato incorrecto. Usa:*\n*${usedPrefix + command} Nombre.edad*\nEjemplo: *${usedPrefix + command} Jotasa.20*`)
  }

  let [_, name, __, age] = text.match(Reg)
  if (!name) return m.reply('*⚠️ El nombre no puede estar vacío.*')
  if (!age) return m.reply('*⚠️ La edad no puede estar vacía.*')
  if (name.length > 30) return m.reply('*⚠️ El nombre es muy largo (máx 30 caracteres).*')

  age = parseInt(age)
  if (isNaN(age)) return m.reply('*⚠️ Edad inválida.*')
  if (age < 5 || age > 100) return m.reply('*⚠️ Edad fuera de rango (5-100 años).*')

  user.name = name.trim()
  user.age = age
  user.regTime = +new Date
  user.registered = true
  user.money += 600
  user.diamantes += 15
  user.exp += 245
  user.joincount += 5

  let perfil = await conn.profilePictureUrl(m.sender, 'image')
    .catch(() => 'https://files.catbox.moe/xr2m6u.jpg')
  let img = await (await fetch(perfil)).buffer()

  const sn = createHash('md5').update(m.sender).digest('hex')

  let shortText = `💚 𝗥𝗲𝗴𝗶𝘀𝘁𝗿𝗼 𝗘𝘅𝗶𝘁𝗼𝘀𝗼 💚`
  let title = dev
  let fullText = `*Registro - ${botname}*

- *Nombre:* ${user.name}
- *Edad:* ${user.age} años

*Recompensas:*

🪙 15 ${moneda}
💫 245 Exp

> ✎ Usa *.profile* para ver tu perfil.`.trim()

  await conn.sendLuffy(m.chat, shortText, title, fullText, img, img, 'https://instagram.com/dev.criss_vx', fkontak)
  await m.react('✅')
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler