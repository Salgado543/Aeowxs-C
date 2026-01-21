let handler = async (m, { conn, text, usedPrefix, command }) => {
    // 1. Reacción inmediata para confirmar que el bot leyó el comando
    await m.react('🔎')

    // 2. Obtener el número (Mención > Respuesta > Texto > El que envía)
    let who
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.sender
    } else {
        who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
    }

    try {
        let rawNumber = who.split('@')[0].replace(/[^0-9]/g, '')
        
        // Diccionario local de prefijos (Ingeniería básica)
        const paises = [
            { pre: '52', nom: 'México', flag: '🇲🇽' },
            { pre: '34', nom: 'España', flag: '🇪🇸' },
            { pre: '54', nom: 'Argentina', flag: '🇦🇷' },
            { pre: '57', nom: 'Colombia', flag: '🇨🇴' },
            { pre: '51', nom: 'Perú', flag: '🇵🇪' },
            { pre: '56', nom: 'Chile', flag: '🇨🇱' },
            { pre: '58', nom: 'Venezuela', flag: '🇻🇪' },
            { pre: '1', nom: 'USA / Canadá', flag: '🇺🇸' },
            { pre: '593', nom: 'Ecuador', flag: '🇪🇨' },
            { pre: '502', nom: 'Guatemala', flag: '🇬🇹' },
            { pre: '504', nom: 'Honduras', flag: '🇭🇳' },
            { pre: '503', nom: 'El Salvador', flag: '🇸🇻' },
            { pre: '591', nom: 'Bolivia', flag: '🇧🇴' },
            { pre: '595', nom: 'Paraguay', flag: '🇵🇾' },
            { pre: '598', nom: 'Uruguay', flag: '🇺🇾' }
        ]

        let infoPais = paises.find(p => rawNumber.startsWith(p.pre)) || { nom: 'Desconocido', flag: '🌐' }

        let txt = `*🔎 INFORMACIÓN DE NÚMERO *\n\n`
        txt += `> *Número:* +${rawNumber}\n`
        txt += `> *País:* ${infoPais.nom} ${infoPais.flag}\n`
        txt += `> *JID:* ${who}\n\n`
        
        txt += `*🔗 ENLACE DIRECTO:*\n`
        txt += `> https://wa.me/${rawNumber}\n\n`
        
        txt += `*${global.wm || 'Aeowxs Club'}*`

        await m.reply(txt)
        await m.react('✅')

    } catch (e) {
        await m.react('❌')
        m.reply('*❌ Error al procesar el número.*')
    }
}

handler.help = ['numinfo']
handler.tags = ['tools']
handler.command = /^(numinfo|numero|infonum)$/i

export default handler