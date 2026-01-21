import moment from 'moment-timezone'

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply(`*⚠️ Ingresa una fecha válida (DD/MM/AAAA).*\n\n> *Ejemplo:* ${usedPrefix + command} 15/07/1998`)

    try {
        m.react('⏳')
        // Parseamos la fecha
        let birthDate = moment(text, "DD/MM/YYYY")
        if (!birthDate.isValid()) return m.reply('*❌ Formato de fecha inválido. Usa: DD/MM/AAAA*')

        let now = moment()
        if (birthDate.isAfter(now)) return m.reply('*⚠️ ¿Vienes del futuro? La fecha debe ser pasada.*')

        // Cálculos de diferencia
        let años = now.diff(birthDate, 'years')
        let meses = now.diff(birthDate, 'months')
        let semanas = now.diff(birthDate, 'weeks')
        let dias = now.diff(birthDate, 'days')
        let horas = now.diff(birthDate, 'hours')

        let txt = `*⏳ CÁLCULO DE TIEMPO TRANSCURRIDO ⏳*\n\n`
        txt += `> *Fecha ingresada:* ${text}\n\n`
        
        txt += `*HA PASADO EXACTAMENTE:*\n`
        txt += `> *Años:* ${años}\n`
        txt += `> *Meses:* ${meses}\n`
        txt += `> *Semanas:* ${semanas}\n`
        txt += `> *Días:* ${dias}\n`
        txt += `> *Horas:* ${horas.toLocaleString()}\n\n`
        
        txt += `*¡El tiempo vuela, gio!*`

        m.reply(txt)
    } catch (e) {
        m.reply('*❌ Error al calcular el tiempo.*')
    }
}

handler.help = ['tiempo']
handler.tags = ['tools']
handler.command = /^(edad|tiempo|vivido)$/i

export default handler