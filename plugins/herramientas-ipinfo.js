import axios from 'axios'

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply(`*⚠️ Ingresa una IP o un Dominio para analizar.*\n\n> *Ejemplo:* ${usedPrefix + command} 8.8.8.8\n> *Ejemplo:* ${usedPrefix + command} google.com`)

    try {
        m.react('📡')
        // Usamos un endpoint técnico que no requiere API KEY
        const res = await axios.get(`http://ip-api.com/json/${text}?fields=status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,isp,org,as,query`)
        const data = res.data

        if (data.status === 'fail') return m.reply(`*❌ Error:* ${data.message}`)

        let txt = `*📡 ANALIZADOR DE RED - AEOWXS 📡*\n\n`
        txt += `> *Consulta:* ${data.query}\n`
        txt += `> *País:* ${data.country} (${data.countryCode})\n`
        txt += `> *Ciudad:* ${data.city}, ${data.regionName}\n`
        txt += `> *ISP:* ${data.isp}\n`
        txt += `> *Organización:* ${data.org || 'N/A'}\n`
        txt += `> *Zona Horaria:* ${data.timezone}\n\n`
        
        txt += `*📍 GEOLOCALIZACIÓN:*\n`
        txt += `> *Lat:* ${data.lat}\n`
        txt += `> *Lon:* ${data.lon}\n`
        txt += `> *Maps:* https://www.google.com/maps?q=${data.lat},${data.lon}\n\n`
        
        txt += `*${global.wm}*`

        m.reply(txt)

    } catch (e) {
        console.error(e)
        m.reply('*❌ No se pudo obtener información de esa dirección.*')
    }
}

handler.help = ['ipinfo']
handler.tags = ['tools']
handler.command = /^(ipinfo|whois|lookup)$/i

export default handler