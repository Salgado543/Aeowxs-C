import axios from "axios";

let handler = async (m, { conn, usedPrefix, command }) => {
    
    // ==========================================
    // 🛡️ ZONA DE PROTECCIÓN ANTI-BAN 🛡️
    // ==========================================
    
    // 1. Simular que está escribiendo/cargando
    await conn.sendPresenceUpdate('composing', m.chat);

    // 2. Calcular tiempo de espera (2 a 4 segundos)
    // Esto es ideal para comandos de imágenes, simula la "búsqueda"
    const min = 2000;
    const max = 4000;
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;

    // 3. Esperar el tiempo calculado
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // ==========================================
    // 🏁 FIN DE PROTECCIÓN - INICIO DEL COMANDO
    // ==========================================

    try {
        let cristiano = (
            await axios.get(`https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/CristianoRonaldo.json`)
        ).data;

        let ronaldo = cristiano[Math.floor(Math.random() * cristiano.length)];

        // Nota: Verifica si tu versión de bot/whatsapp soporta botones nativos.
        // Si no se ven, cámbialo por texto simple.
        const buttons = [
            {
                buttonId: `${usedPrefix + command}`,
                buttonText: { displayText: "⚽ Ver más" },
                type: 1
            }
        ];

        await conn.sendMessage(
            m.chat,
            {
                image: { url: ronaldo },
                caption: "*CR7* 🐐",
                buttons: buttons,
                viewOnce: true
            },
            { quoted: m }
        );
        
    } catch (e) {
        console.error(e);
        m.reply("⚠️ Error al buscar la imagen de CR7.");
    }
};

handler.help = ["cr7"];
handler.tags = ["anime"];
handler.command = /^(cristiano|ronaldo|cr7)$/i;

export default handler;