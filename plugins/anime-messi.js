import axios from "axios";

let handler = async (m, { conn, usedPrefix, command }) => {
    
    // ==========================================
    // 🛡️ ZONA DE PROTECCIÓN ANTI-BAN 🛡️
    // ==========================================
    
    // 1. Simular que está escribiendo/cargando
    // Esto es crucial para que parezca comportamiento humano
    await conn.sendPresenceUpdate('composing', m.chat);

    // 2. Calcular tiempo de espera (2 a 4 segundos)
    const min = 2000;
    const max = 4000;
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;

    // 3. Esperar el tiempo calculado
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // ==========================================
    // 🏁 FIN DE PROTECCIÓN - INICIO DEL COMANDO
    // ==========================================

    try {
        let res = (
            await axios.get(`https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/Messi.json`)
        ).data;
        
        let url = res[Math.floor(Math.random() * res.length)];

        const buttons = [
            {
                buttonId: `${usedPrefix + command}`, // Lo hice dinámico para que sirva si cambian el prefijo
                buttonText: { displayText: "⚽ Ver más" },
                type: 1
            }
        ];

        await conn.sendMessage(
            m.chat,
            {
                image: { url: url },
                caption: "*Messi* 🐐",
                buttons: buttons,
                viewOnce: true
            },
            { quoted: m }
        );
        
    } catch (e) {
        console.error(e);
        m.reply("⚠️ Error al buscar la imagen de Messi.");
    }
};

handler.help = ['messi'];
handler.tags = ['anime'];
handler.command = /^(messi)$/i;

export default handler;