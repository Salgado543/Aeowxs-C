import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Aseguramos emojis globales
  const emojis = global.emojis || '🎵';
  
  // 1. VALIDACIÓN
  if (!text) return conn.reply(m.chat, `*${emojis} Ingresa el nombre de la canción.*\n> *Ejemplo:* ${usedPrefix + command} Minecraft`, m);

  // ==========================================
  // 🛡️ ZONA DE PROTECCIÓN ANTI-BAN 🛡️
  // ==========================================
  
  // 2. Simular "Escribiendo..." (Buscando la canción)
  await conn.sendPresenceUpdate('composing', m.chat);

  // 3. Calcular tiempo de espera (3 a 5 segundos)
  const min = 3000;
  const max = 5000;
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;

  // 4. Esperar el tiempo calculado
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // ==========================================
  // 🏁 FIN DE PROTECCIÓN
  // ==========================================

  try {
    // Reacción visual de "Encontrado"
    await m.react('🔎');

    // CONFIGURACIÓN DE TU API (RapidAPI)
    const options = {
      method: 'GET',
      url: 'https://youtube-mp3-audio-video-downloader.p.rapidapi.com/search_video',
      params: {
        query: text,           // Usamos el texto del usuario
        limit: '1',            // Solo necesitamos el primer resultado para .play
        sort_by: 'relevance',
        response_mode: 'default'
      },
      headers: {
        'x-rapidapi-key': 'ea91db15cbmshcef5befd3b35303p17c8c2jsnb3700b931d67', // Tu Key
        'x-rapidapi-host': 'youtube-mp3-audio-video-downloader.p.rapidapi.com'
      }
    };

    // Petición a la API
    const response = await axios.request(options);
    const data = response.data;

    // Verificar si hay resultados
    // La estructura de esta API suele devolver un array en 'result' o directamente en data
    // Adaptamos para leer el primer elemento.
    const results = data.result || data; 
    
    if (!results || results.length === 0) {
        return conn.reply(m.chat, '*⚠️ No se encontraron resultados con esa API.*', m);
    }

    const video = results[0]; // Tomamos el primer video

    // Construimos el mensaje con la info
    let caption = `*Youtube Play - RapidAPI* 🎧\n\n`;
    caption += `📌 *Título:* ${video.title || 'Desconocido'}\n`;
    caption += `⏱️ *Duración:* ${video.duration || 'N/A'}\n`;
    caption += `👤 *Canal:* ${video.channel?.name || video.author || 'Desconocido'}\n`;
    caption += `👀 *Vistas:* ${video.views || '0'}\n`;
    caption += `🔗 *Link:* https://www.youtube.com/watch?v=${video.id || video.videoId}\n\n`;
    caption += `> _Enviando audio, espera un momento..._`;

    // Enviamos la imagen con el texto
    // Nota: Usamos video.thumbnail si existe, si no, intentamos construirla con el ID
    const thumbUrl = video.thumbnail || `https://i.ytimg.com/vi/${video.id || video.videoId}/hqdefault.jpg`;

    await conn.sendMessage(m.chat, { 
        image: { url: thumbUrl }, 
        caption: caption 
    }, { quoted: m });

    // AQUÍ IRÍA LA LÓGICA DE DESCARGA
    // Como esta API es de búsqueda (/search_video), solo nos da la info.
    // Para descargar el audio real, necesitarías llamar a otro endpoint o usar una librería de descarga.
    // Por ahora, este comando funciona como un buscador de Play muy robusto.

  } catch (error) {
    console.error(error);
    m.reply('*⚠️ Error al conectar con la API de RapidAPI. Verifica tu Key o los límites.*');
  }
};

handler.help = ['play'];
handler.tags = ['dl'];
handler.command = ['play', 'play2'];

export default handler;