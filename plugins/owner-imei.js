import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.tempmail = conn.tempmail ? conn.tempmail : {}
  
  if (command === 'tempmail') {
    try {
      m.react('📧')
      // Generamos un correo aleatorio usando la API de 1secmail (muy estable)
      const login = Math.random().toString(36).substring(2, 10)
      const domain = '1secmail.com'
      const email = `${login}@${domain}`
      
      conn.tempmail[m.sender] = email
      
      let txt = `*📧 CORREO TEMPORAL GENERADO 📧*\n\n`
      txt += `> *Email:* \`${email}\`\n\n`
      txt += `*INSTRUCCIONES:*\n`
      txt += `> Usa este correo para lo que necesites. Para revisar si recibiste mensajes, escribe: *${usedPrefix}checkmail*`
      
      await m.reply(txt)
    } catch (e) {
      m.reply('*❌ Error al generar el correo.*')
    }
  }

  if (command === 'checkmail') {
    let email = conn.tempmail[m.sender]
    if (!email) return m.reply(`*⚠️ No tienes un correo activo.* Genera uno con *${usedPrefix}tempmail*`)
    
    try {
      m.react('📥')
      const [login, domain] = email.split('@')
      const res = await axios.get(`https://www.1secmail.com/api/v1/action=getMessages&login=${login}&domain=${domain}`)
      
      if (res.data.length === 0) return m.reply('*📭 Bandeja vacía.* No has recibido mensajes aún.')
      
      let txt = `*📥 MENSAJES RECIBIDOS (${res.data.length}) 📥*\n\n`
      for (let msg of res.data) {
        txt += `> *De:* ${msg.from}\n`
        txt += `> *Asunto:* ${msg.subject}\n`
        txt += `> *Fecha:* ${msg.date}\n`
        txt += `> *ID:* ${msg.id} (Usa ${usedPrefix}readmail ${msg.id})\n`
        txt += `__________________________\n\n`
      }
      m.reply(txt)
    } catch (e) {
      m.reply('*❌ Error al revisar la bandeja.*')
    }
  }

  if (command === 'readmail') {
    let email = conn.tempmail[m.sender]
    if (!email || !text) return m.reply(`*⚠️ Uso:* ${usedPrefix + command} <ID del mensaje>`)
    
    try {
      const [login, domain] = email.split('@')
      const res = await axios.get(`https://www.1secmail.com/api/v1/action=readMessage&login=${login}&domain=${domain}&id=${text}`)
      
      let txt = `*📄 CONTENIDO DEL MENSAJE 📄*\n\n`
      txt += `> *De:* ${res.data.from}\n`
      txt += `> *Asunto:* ${res.data.subject}\n\n`
      txt += `*MENSAJE:*\n${res.data.textBody || res.data.body}`
      
      m.reply(txt)
    } catch (e) {
      m.reply('*❌ Error al leer el mensaje.*')
    }
  }
}

handler.help = ['tempmail']
handler.tags = ['owner']
handler.command = /^(tempmail|checkmail|readmail)$/i

export default handler