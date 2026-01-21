// Código original de Criss Escobar - Mejorado para Aeowxs Club
const handler = async (m, { conn, usedPrefix }) => {
    // Calculamos el total de comandos registrados en el sistema
    let totalf = Object.values(global.plugins).reduce((total, plugin) => {
        if (plugin.command) {
            if (Array.isArray(plugin.command)) {
                return total + plugin.command.length;
            } else {
                return total + 1;
            }
        }
        return total;
    }, 0);

    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    
    // Diseño estético siguiendo la línea de Aeowxs Club
    let txt = ` `
    txt += `*¡El poder está en tus manos!*\n\n`
    txt += `Actualmente cuento con una base de datos de \`${totalf}\` funciones optimizadas para ti. \n\n`
    txt += `> ¿Tienes una idea genial? 💡\n`
    txt += `*${global.wm || 'Aeowxs Club'}*`

    try {
        await m.react('📊')
        await conn.sendMessage(m.chat, {
            text: txt,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: `SISTEMA AEOWXS - v${global.vs || '1.0.0'}`,
                    body: `Comandos Totales: ${totalf}`,
                    thumbnail: global.catalogo,
                    sourceUrl: global.channel,
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: m });
    } catch (e) {
        console.error(e)
        // Fallback simple si falla el mensaje decorado
        m.reply(`*📊 Comandos Totales:* \`${totalf}\``)
    }
};

handler.help = ['totalf', 'totalcomandos'];
handler.tags = ['info'];
handler.command = /^(totalcomandos|comandostotales|totalf|totalfunciones)$/i;

export default handler;