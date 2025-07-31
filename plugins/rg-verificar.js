import { createHash } from 'crypto'

const fkontak = {
  key: { participant: '0@s.whatsapp.net' },
  message: {
    contactMessage: { displayName: 'Shadow Ultra', vcard: '' }
  }
}

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  const user = global.db.data.users[m.sender]

  if (user.registered === true) {
    return m.reply(`✅ Ya estás registrado.\n\n¿Deseas volver a registrarte?\nUsa: *${usedPrefix}unreg*`)
  }

  if (!Reg.test(text)) {
    return m.reply(`⚠️ Formato incorrecto. Usa:\n*${usedPrefix + command} Nombre.edad*\nEjemplo: *${usedPrefix + command} Juan.20*`)
  }

  let [_, name, __, age] = text.match(Reg)
  if (!name) return m.reply('⚠️ El nombre no puede estar vacío.')
  if (!age) return m.reply('⚠️ La edad no puede estar vacía.')
  if (name.length > 30) return m.reply('⚠️ El nombre es muy largo (máx 30 caracteres).')

  age = parseInt(age)
  if (isNaN(age)) return m.reply('⚠️ Edad inválida.')
  if (age < 5 || age > 100) return m.reply('⚠️ Edad fuera de rango (5-100 años).')

  user.name = name.trim()
  user.age = age
  user.regTime = +new Date
  user.registered = true

  user.money += 600
  user.diamantes += 15
  user.exp += 245
  user.joincount += 5

  const sn = createHash('md5').update(m.sender).digest('hex')
  const perfil = await conn.profilePictureUrl(m.sender, 'image')
    .catch(() => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')

  const mensaje = `
🎉 *Registro completado*

📌 *Nombre:* ${user.name}
📆 *Edad:* ${user.age} años
🆔 *Serie:* ${sn}

🎁 Bonificaciones:
💎 15 Diamantes
💰 600 Coins
✨ 245 Exp

Escribe *.profile* para ver tu perfil.
`.trim()

  await sendLuffy(conn, m.chat, mensaje, null, perfil, 'https://github.com/Cristiantermidor/ShadowBot-MDv3', '✅ Registro exitoso', 'Bienvenido a Shadow Bot', m)
  await m.react('✅')
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler