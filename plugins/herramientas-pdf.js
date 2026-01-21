import PDFDocument from 'pdfkit'
import { Buffer } from 'buffer'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Si no hay texto, intentamos obtenerlo de un mensaje citado
    if (!text && m.quoted?.text) text = m.quoted.text
    if (!text) return m.reply(`*⚠️ Escribe el contenido o responde a un texto largo para convertirlo en PDF.*\n\n> *Ejemplo:* ${usedPrefix + command} Mi documento de prueba`)

    try {
        m.react('📄')
        const doc = new PDFDocument()
        let buffers = []
        
        doc.on('data', buffers.push.bind(buffers))
        doc.on('end', async () => {
            let pdfBuffer = Buffer.concat(buffers)
            
            await conn.sendMessage(m.chat, { 
                document: pdfBuffer, 
                mimetype: 'application/pdf', 
                fileName: `Aeowxs_Doc_${Date.now()}.pdf`,
                caption: `*✅ PDF GENERADO EXITOSAMENTE*\n\n> *Contenido:* ${text.slice(0, 50)}...`
            }, { quoted: m })
        })

        // Diseño del PDF
        doc.fontSize(20).text('DOCUMENTO AEOWXS CLUB', { align: 'center' })
        doc.moveDown()
        doc.fontSize(12).text(text, {
            align: 'justify',
            columns: 1,
            columnGap: 15
        })
        
        doc.moveDown()
        doc.fontSize(10).fillColor('gray').text(`Generado por: ${global.botname}`, { align: 'right' })
        
        doc.end()

    } catch (e) {
        console.error(e)
        m.reply('*❌ Error al generar el PDF.*')
    }
}

handler.help = ['topdf <texto>']
handler.tags = ['tools']
handler.command = /^(topdf|pdf|generarpdf)$/i

export default handler