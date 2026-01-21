import axios from 'axios'

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) return m.reply(`*⚠️ Ingresa el enlace que quieres acortar.*\n\n> *Ejemplo:* ${usedPrefix + command} https://github.com/Salgado543/Aeowxs-Club`)
  
  // Validamos si es un link
  if (!text.includes('http')) return m.reply('*❌ El enlace no es válido. Debe empezar con http o https.*')

  try {
    m.react('🔗')
    // Usamos TinyURL que es de las APIs más estables y gratuitas
    let res = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(text)}`)
    let shortUrl = res.data

    let txt = `*🔗 ENLACE ACORTADO - AEOWXS 🔗*\n\n`
    txt += `> *Original:* ${text}\n`
    txt += `> *Acortado:* ${shortUrl}\n\n`
    txt += `*${global.wm}*`

    await m.reply(txt)
  } catch (e) {
    console.error(e)
    m.reply('*❌ Error:* No se pudo acortar el enlace en este momento.')
  }
}

handler.help = ['acortar']
handler.tags = ['tools']
handler.command = /^(short|acortar|tinyurl)$/i

export default handler