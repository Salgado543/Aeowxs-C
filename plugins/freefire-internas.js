const handler = async (m, { text, conn, args, usedPrefix, command }) => {

    if (args.length < 2) {  
        conn.reply(m.chat, `*${emojis} Proporciona una hora seguido el país y una modalidad.*
*Usa MX para México y CO para Colombia.*
> *Ejemplo:* ${usedPrefix + command} 21:00 mx clk`, m, rcanal);
        return;
    }

    // Nueva validación para formato de 24 horas
    const horaRegex = /^([01]?[0-9]|2[0-3])(:[0-5][0-9])?$/;  
    if (!horaRegex.test(args[0])) {  
        conn.reply(m.chat, '*⏰ El formato horario es incorrecto.*\n*Usos horarios:*\n> 00 - 23 HRS', m);  
        return;  
    }  

    let [hora, minutos] = args[0].includes(':') ? args[0].split(':').map(Number) : [Number(args[0]), 0];

    const pais = args[1].toUpperCase();  

    const diferenciasHorarias = {  
        MX: 1,
        PE: 2,
        CO: 2,
        EC: 2,
        DO: 3,
        VE: 3,
        CL: 4,
        AR: 4,
    };  

    if (!(pais in diferenciasHorarias)) {  
        conn.reply(m.chat, '*✖️ El país ingresado no es válido.*\n*Lista de paises:*\n- MX\n- CO\n- EC\n- PE\n- VE\n- DO\n- CL\n- AR', m);  
        return;  
    }  

    const diferenciaHoraria = diferenciasHorarias[pais];  
    const formatTime = (date) => date.toLocaleTimeString('es', { hour12: false, hour: '2-digit', minute: '2-digit' });  

const horasEnPais = { MX: '', PE: '', CO: '', EC: '', DO: '', VE: '', CL: '', AR: '', };

    for (const key in diferenciasHorarias) {  
        const horaActual = new Date();  
        horaActual.setHours(hora, minutos, 0, 0);

        const horaEnPais = new Date(horaActual.getTime() + (3600000 * (diferenciasHorarias[key] - diferenciaHoraria)));  
        horasEnPais[key] = formatTime(horaEnPais);  
    }  

    const modalidad = args.slice(2).join(' ');  
    m.react('🎮');  

    // Configuración de la modalidad según el comando usado
    let titulo = '';
    let iconosA = [];
    let iconosB = [];

    switch (command) {
        case 'inmixto4':
        case 'internamixto4':
            titulo = 'INTERNA MIXTO';
            iconosA = ['🖤', '🖤', '🖤', '🖤'];
            iconosB = ['🤍', '🤍', '🤍', '🤍'];
            break;
        case 'inmasc4':
        case 'internamasc4':
            titulo = 'INTERNA MASC';
            iconosA = ['🥷🏻', '🥷🏻', '🥷🏻', '🥷🏻'];
            iconosB = ['🤺', '🤺', '🤺', '🤺'];
            break;
        case 'infem4':
        case 'internafem4':
            titulo = 'INTERNA FEM';
            iconosA = ['🩷', '🩷', '🩷', '🩷'];
            iconosB = ['🦋', '🦋', '🦋', '🦋'];
            break;
        case 'inmixto6':
        case 'internamixto6':
            titulo = 'INTERNA MIXTO';
            iconosA = ['❄️', '❄️', '❄️', '❄️', '❄️', '❄️'];
            iconosB = ['🔥', '🔥', '🔥', '🔥', '🔥', '🔥'];
            break;
        case 'inmasc6':
        case 'internamasc6':
            titulo = 'INTERNA MASC';
            iconosA = ['🪸', '🪸', '🪸', '🪸', '🪸', '🪸'];
            iconosB = ['🦪', '🦪', '🦪', '🦪', '🦪', '🦪'];
            break;
        case 'infem6':
        case 'internafem6':
            titulo = 'INTERNA FEM';
            iconosA = ['🍭', '🍭', '🍭', '🍭', '🍭', '🍭'];
            iconosB = ['🍬', '🍬', '🍬', '🍬', '🍬', '🍬'];
            break;
        default:
            conn.reply(m.chat, '*❌ Comando no válido.*', m);
            return;
    }

    const message = `ㅤㅤㅤ *\`${titulo}\`*
╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒*
» *☕꒱ Mᴏᴅᴀʟɪᴅᴀᴅ:* ${modalidad}
» *⏰꒱ Hᴏʀᴀʀɪᴏs:*
│•  ${horasEnPais.MX} 🇲🇽 
│•  ${horasEnPais.CO} 🇨🇴🇪🇨🇵🇪
│•  ${horasEnPais.VE} 🇻🇪🇩🇴
│•  ${horasEnPais.AR} 🇨🇱🇦🇷
╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒⭒*   ˚̩̥̩̥*̩̩͙✩
ㅤ _ʚ Equipo A:_ ᭡
${iconosA.map(icono => `${icono} • `).join('\n')}
ㅤ _ʚ Equipo B:_ ᭡
${iconosB.map(icono => `${icono} • `).join('\n')}

*ᡣ𐭩 Organiza:* ${conn.getName(m.sender)}
`.trim();

    conn.sendMessage(m.chat, { text: message }, { quoted: fkontak });
};

handler.help = ['inmixto4', 'inmixto6', 'inmasc4', 'inmasc6', 'infem4', 'infem6'];
handler.tags = ['ff', 'list'];
handler.command = /^(inmixto4|internamixto4|inmixto6|internamixto6|inmasc4|internamasc4|inmasc6|internamasc6|infem4|internafem4|infem6|internafem6)$/i;

export default handler;