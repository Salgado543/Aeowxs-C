import axios from 'axios';
import yts from 'yt-search';

let handler = async (m, { conn, text, usedPrefix, command, args }) => {
  const emojis = global.emojis || '';

  // ==========================================
  // 🧠 LÓGICA DE SELECCIÓN (AUDIO vs VIDEO)
  // ==========================================
  // Verificamos si el usuario ya eligió una opción (vía botón)
  // El botón envía: ".play audio <url>" o ".play video <url>"
  const actionType = args[0]?.toLowerCase();
  const selectedUrl = args[1];
  
  // Si args[0] es 'audio' o 'video' Y args[1] es un link, entramos en MODO DESCARGA
  if ((actionType === 'audio' || actionType === 'video') && selectedUrl && selectedUrl.startsWith('http')) {
      return downloadMedia(m, conn, actionType, selectedUrl);
  }

  // ==========================================
  // 🔎 MODO BÚSQUEDA (Por defecto)
  // ==========================================
  
  if (!text) return conn.reply(m.chat, `*${emojis} Ingresa el nombre del video.*\n> *Ejemplo:* ${usedPrefix + command} Minecraft`, m);

  // --- 🛡️ Antiban Búsqueda ---
  await conn.sendPresenceUpdate('composing', m.chat);
  await new Promise(resolve => setTimeout(resolve, 2000)); // Espera leve para buscar
  // ---------------------------

  try {
    await m.react('🔎');

    // 1️⃣ BÚSQUEDA EN YOUTUBE
    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return conn.reply(m.chat, '*⚠️ No se encontraron resultados.*', m);
    }
    
    const video = search.all[0];
    const videoUrl = video.url;

    // Mensaje de información
    let caption = `*Youtube Play - Aeowxs* ☁️\n\n`;
    caption += `📌 *Título:* ${video.title}\n`;
    caption += `⏱️ *Duración:* ${video.timestamp}\n`;
    caption += `👀 *Vistas:* ${video.views}\n`;
    caption += `🔗 *Link:* ${videoUrl}\n\n`;
    caption += `> _Selecciona una opción para descargar:_
`;

    // 2️⃣ BOTONES DE SELECCIÓN
    // Usamos el mismo formato que tus comandos anteriores (array buttons)
    const buttons = [
        { buttonId: `${usedPrefix + command} audio ${videoUrl}`, buttonText: { displayText: 'Audio' }, type: 1 },
        { buttonId: `${usedPrefix + command} video ${videoUrl}`, buttonText: { displayText: 'Video' }, type: 1 }
    ];

    // Enviamos mensaje con botones
    await conn.sendMessage(m.chat, { 
        image: { url: video.thumbnail }, 
        caption: caption,
        buttons: buttons,
        footer: global.wm || 'Select Format',
        viewOnce: true // Opcional
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply('*⚠️ Error al buscar.*');
  }
};

// ==========================================
// 📥 FUNCIÓN DE DESCARGA (Llamada por los botones)
// ==========================================
async function downloadMedia(m, conn, type, url) {
    try {
        // --- 🛡️ Antiban Descarga ---
        // Simulamos que graba audio o sube video
        await conn.sendPresenceUpdate(type === 'audio' ? 'recording' : 'composing', m.chat);
        const min = 3000;
        const max = 5000;
        const delay = Math.floor(Math.random() * (max - min + 1)) + min;
        await new Promise(resolve => setTimeout(resolve, delay));
        // ---------------------------

        const apiUrl = "https://api-sky.ultraplus.click/youtube/resolve";
        const apiKey = "sk_b7ab1153-b35e-496d-b245-290782abbe13";

        // Configuración API
        const headers = { 
            "apikey": apiKey,
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        };

        const body = { 
            url: url, 
            type: type, // 'audio' o 'video' según el botón
            quality: "720" // Para video intenta 720, para audio la API lo ignora o usa default
        };

        console.log(`[Sky API] Descargando ${type}: ${url}`);

        const { data } = await axios.post(apiUrl, body, { headers });
        
        if (!data.status || !data.result) {
            throw new Error(data.message || "La API respondió false");
        }

        const downloadUrl = data.result.media?.direct;
        
        if (!downloadUrl) throw new Error("No se encontró link directo");

        // Enviar el archivo correspondiente
        if (type === 'audio') {
            await conn.sendMessage(m.chat, { 
                audio: { url: downloadUrl }, 
                mimetype: 'audio/mpeg', 
                fileName: `audio.mp3`
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { 
                video: { url: downloadUrl }, 
                caption: `*Aquí tienes tu video* 🎥`,
                mimetype: 'video/mp4', 
                fileName: `video.mp4`
            }, { quoted: m });
        }

    } catch (error) {
        console.error("❌ ERROR DOWNLOAD:", error.message);
        m.reply(`*⚠️ Error al descargar el ${type}.*\n> ${error.message}`);
    }
}

handler.help = ['play'];
handler.tags = ['dl'];
handler.command = ['play'];

export default handler;