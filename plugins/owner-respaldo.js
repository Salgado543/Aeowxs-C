import fs from 'fs'

let handler = async (m, { conn }) => {
    try {
        m.react('💾')
        let database = './database.json'
        if (!fs.existsSync(database)) return m.reply('*❌ El archivo de base de datos no existe.*')
        
        let data = fs.readFileSync(database)
        let fecha = new Date().toLocaleDateString('es-MX')
        
        await conn.sendMessage(m.sender, { 
            document: data, 
            mimetype: 'application/json', 
            fileName: `Aeowxs_DB_${fecha}.json`,
            caption: `*✅ RESPALDO DE SEGURIDAD - AEOWXS CLUB*\n\n> *Fecha:* ${fecha}\n\n*Guarda este archivo. Contiene todos los niveles, monedas y configuraciones.*`
        })
        
        m.reply('*✅ Respaldo enviado a tu chat privado.*')
    } catch (e) {
        console.error(e)
        m.reply('*❌ Error al generar el respaldo.*')
    }
}

handler.help = ['respaldo']
handler.tags = ['owner']
handler.command = /^(backup|respaldo|db)$/i
handler.owner = true // Solo tú puedes hacer backups

export default handler