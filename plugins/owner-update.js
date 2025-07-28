
import { execSync } from 'child_process'

let handler = async (m, { conn, text }) => {
  await m.react('👨🏻‍💻')

  try {
    let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : '')).toString().trim() // Ejecuta git pull y limpia espacios
    let mensaje = stdout.includes('Already up to date') 
      ? '*⚪ El repositorio del bot está actualizado.*' 
      : '*Owner - Update*\n\n' + stdout

    await conn.reply(m.chat, mensaje, m) // Envía el mensaje con el resultado
    await m.react('☕')
  } catch (err) {
    await conn.reply(m.chat, `❌ Error al actualizar:\n${err.message}`, m)
  }
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'actualizar', 'fix', 'fixed'] 
handler.rowner = true

export default handler