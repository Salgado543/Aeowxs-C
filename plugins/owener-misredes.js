let handler = async (m, { conn, command }) => {
  try {
    // EJEMPLO 1: Usar los links en un mensaje normal
    // Simplemente usamos ${global.variable} dentro de las comillas invertidas ` `
    
    let texto = `*🧪 ENLACES*

👤 *Owner:* ${global.ownname}
📞 *Número:* ${global.owner[0][0]}

🔗 *Tus Redes Configuradas:*
▶️ *Canal:* ${global.channel}
📸 *Instagram:* ${global.ig}
👥 *Grupo:* https://chat.whatsapp.com/C4vXg9OadhNDVHFm1Q0fhv

> Aqui tienes los enlaces oficiales!`

    await conn.reply(m.chat, texto, m)

    // ---------------------------------------------------------
    
    // EJEMPLO 2: SIMULACIÓN DE ERROR (Lo que pediste)
    // Voy a forzar un error pequeño para que veas como saldría el mensaje
    
    // throw 'Error de prueba' // Descomenta esto si quieres probar el catch real

  } catch (e) {
    // ASÍ SE PONE EN UN ERROR:
    // Cuando un comando falla, mandas el link del canal para soporte
    
    let mensajeError = `*❌ OCURRIÓ UN ERROR*
    
El comando falló. Por favor reportalo en nuestro canal oficial para que Gio lo arregle:
👉 ${global.channel}

*Detalles del error:* ${e}`

    conn.reply(m.chat, mensajeError, m)
  }
}

handler.help = ['misredes']
handler.tags = ['owner']
handler.command = /^misredes|testlinks$/i
handler.owner = true

export default handler