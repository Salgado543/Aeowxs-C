const handler = async (m, { text, conn, args, usedPrefix, command }) => {

    if (args.length < 2) {  
        conn.reply(m.chat, `*${emojis} Proporciona una hora seguido el país y una modalidad.*
> *Ejemplo:* .${command} 20 mx clk`, m);
        return;
    }

    // Nueva validación para formato de 24 horas
    const horaRegex = /^([01]?[0-9]|2[0-3])(:[0-5][0-9])?$/;  
    if (!horaRegex.test(args[0])) {  
        conn.reply(m.chat, '*⏰ Formato de hora incorrecto.*', m);  
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
        conn.reply(m.chat, '*✖️ País no válido.*', m);  
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
    let players = [];
    let iconos = [];
    let iconos2 = [];

    switch (command) {
        case 'v4fem':
        case 'vsfem4':
            titulo = '4VS4 FEM';
            players = ['Jᥙgᥲძ᥆rᥲs:'];
            iconos = ['🦋', '🦋', '🦋', '🦋'];
            iconos2 = ['🦋', '🦋'];
            break;
        case 'v4masc':
        case 'vsmasc4':
            titulo = '4VS4 MASC';
            players = ['Jᥙgᥲძ᥆rᥱs'];
            iconos = ['🥷🏻', '🥷🏻', '🥷🏻', '🥷🏻'];
            iconos2 = ['🥷🏻', '🥷🏻'];
            break;
        case 'v4mixto':
        case 'vsmixto4':
            titulo = '4VS4 MIXTO';
            players = ['Jᥙgᥲძ᥆r᥊s'];
            iconos = ['🖤', '🖤', '🖤', '🩷'];
            iconos2 = ['🖤', '🩷'];
            break;
        case 'v6fem':
        case 'vsfem6':
            titulo = '6VS6 FEM';
            players = ['Jᥙgᥲძ᥆rᥲs'];
            iconos = ['🦋', '🦋', '🦋', '🦋', '🦋', '🦋'];
            iconos2 = ['🦋', '🦋'];
            break;
        case 'v6masc':
        case 'vsmasc6':
            titulo = '6VS6 MASC';
            players = ['Jᥙgᥲძ᥆rᥱs'];
            iconos = ['🥷🏻', '🥷🏻', '🥷🏻', '🥷🏻', '🥷🏻', '🥷🏻'];
            iconos2 = ['🥷🏻', '🥷🏻'];
            break;
        case 'v6mixto':
        case 'vsmixto6':
            titulo = '6VS6 MIXTO';
            players = ['Jᥙgᥲძ᥆r᥊s'];
            iconos = ['🖤', '🖤', '🖤', '🖤', '🩷', '🩷'];
            iconos2 = ['🖤', '🖤', '🩷'];
            break;
        default:
            conn.reply(m.chat, '*Comando no válido.*', m);
            return;
    }

    const message = `ㅤㅤㅤ *\`${titulo}\`*

🕹꒱ *ʀᴇɢʟᴀs:* ${modalidad}
⏰꒱ *ʜᴏʀᴀ:* ${horasEnPais.MX} 🇲🇽 ${horasEnPais.CO} 🇨🇴

ㅤ \`${players}\`

${iconos.map(icono => `${icono}˚ `).join('\n')}

ㅤ \`Sᥙ⍴ᥣᥱᥒ𝗍ᥱs:\`

${iconos2.map(icono => `${icono}˚ `).join('\n')}

> © ${dev}`.trim();

    conn.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.help = ['v4fem', 'v4masc', 'v4mixto', 'v6fem', 'v6masc', 'v6mixto'];
handler.tags = ['ff'];
handler.command = /^(v4fem|vsfem4|v4masc|vsmasc4|v4mixto|vsmixto4|v6fem|vsfem6|v6masc|vsmasc6|v6mixto|vsmixto6)$/i;

export default handler;