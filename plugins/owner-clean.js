import fs from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {
    m.react('🧹')
    const tmpDir = path.join(process.cwd(), 'tmp')
    
    if (!fs.existsSync(tmpDir)) return m.reply('*⚠️ La carpeta temporal no existe.*')

    try {
        const files = fs.readdirSync(tmpDir)
        let deletedFilesCount = 0

        if (files.length === 0) return m.reply('*✅ El servidor ya está limpio. No hay archivos basura.*')

        files.forEach(file => {
            const filePath = path.join(tmpDir, file)
            // No borramos el archivo .gitignore si existe
            if (file !== '.gitignore') {
                fs.unlinkSync(filePath)
                deletedFilesCount++
            }
        })

        let txt = `*🧹 LIMPIEZA COMPLETADA - AEOWXS 🧹*\n\n`
        txt += `> *Archivos eliminados:* ${deletedFilesCount}\n`
        txt += `> *Estado:* Servidor optimizado.\n\n`
        txt += `*${global.wm}*`
        
        m.reply(txt)
    } catch (e) {
        console.error(e)
        m.reply('*❌ Ocurrió un error al limpiar el servidor.*')
    }
}

handler.help = ['limpiar']
handler.tags = ['owner']
handler.command = /^(clean|limpiar|cleantmp)$/i
handler.owner = true

export default handler