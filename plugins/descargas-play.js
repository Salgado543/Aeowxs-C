import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const emojis = global.emojis || '🎵';
  
  if (!text) return conn.reply(m.chat, `*${emojis} Ingresa el nombre de la canción.*\n> *Ejemplo:* ${usedPrefix + command} Minecraft`, m);

  // ==========================================
  // 🛡️ ZONA DE PROTECCIÓN ANTI-BAN 🛡️
  // ==========================================
  await conn.sendPresenceUpdate('composing', m.chat);
  const min = 3000;
  const max = 5000;
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  await new Promise(resolve => setTimeout(resolve, delay));
  // ==========================================

  try {
    await m.react('🔎');

    // 1️⃣ BÚSQUEDA (Usando la API anterior que busca bien)
    const searchOptions = {
      method: 'GET',
      url: 'https://youtube-mp3-audio-video-downloader.p.rapidapi.com/search_video',
      params: { query: text, limit: '1', sort_by: 'relevance' },
      headers: {
        'x-rapidapi-key': 'ea91db15cbmshcef5befd3b35303p17c8c2jsnb3700b931d67',
        'x-rapidapi-host': 'youtube-mp3-audio-video-downloader.p.rapidapi.com'
      }
    };

    const searchRes = await axios.request(searchOptions);
    const results = searchRes.data.result || searchRes.data;

    if (!results || results.length === 0) return conn.reply(m.chat, '*⚠️ No se encontraron resultados.*', m);

    const video = results[0];
    const videoUrl = `https://www.youtube.com/watch?v=${video.id || video.videoId}`;

    // Mensaje de información
    let caption = `*Youtube Play - Aeowxs* 🎧\n\n`;
    caption += `📌 *Título:* ${video.title}\n`;
    caption += `⏱️ *Duración:* ${video.duration}\n`;
    caption += `👤 *Canal:* ${video.channel?.name || video.author}\n`;
    caption += `🔗 *Link:* ${videoUrl}\n\n`;
    caption += `> _Descargando audio, esto puede tardar unos segundos..._`;

    const thumbUrl = video.thumbnail || `https://i.ytimg.com/vi/${video.id || video.videoId}/hqdefault.jpg`;
    await conn.sendMessage(m.chat, { image: { url: thumbUrl }, caption: caption }, { quoted: m });

    // 2️⃣ INICIO DE CONVERSIÓN (Host Nuevo: youtube-mp41)
    // Necesitamos pedirle que procese el video primero
    const initOptions = {
      method: 'GET',
      url: 'https://youtube-mp41.p.rapidapi.com/api/v1/url',
      params: { url: videoUrl }, // Enviamos el link de YT
      headers: {
        'x-rapidapi-key': 'ea91db15cbmshcef5befd3b35303p17c8c2jsnb3700b931d67',
        'x-rapidapi-host': 'youtube-mp41.p.rapidapi.com'
      }
    };

    const initRes = await axios.request(initOptions);
    
    // Obtenemos el ID de la tarea (Task ID)
    const taskId = initRes.data.id; 

    if (!taskId) throw new Error('No se pudo iniciar la conversión.');

    // 3️⃣ VERIFICAR PROGRESO (Usando TU snippet)
    // Hacemos un pequeño bucle para esperar a que termine
    let downloadUrl = null;
    let attempts = 0;

    while (attempts < 5 && !downloadUrl) {
        const progressOptions = {
            method: 'GET',
            url: 'https://youtube-mp41.p.rapidapi.com/api/v1/progress',
            params: { id: taskId }, // Usamos el ID que nos dio el paso anterior
            headers: {
                'x-rapidapi-key': 'ea91db15cbmshcef5befd3b35303p17c8c2jsnb3700b931d67',
                'x-rapidapi-host': 'youtube-mp41.p.rapidapi.com'
            }
        };

        const progRes = await axios.request(progressOptions);
        const data = progRes.data;

        if (data.status === 'completed' || data.state === 'completed' || data.url) {
            downloadUrl = data.url; // ¡Enlace conseguido!
        } else {
            // Si sigue procesando, esperamos 2 segundos
            await new Promise(r => setTimeout(r, 2000));
            attempts++;
        }
    }

    if (!downloadUrl) throw new Error('Tiempo de espera agotado para la conversión.');

    // 4️⃣ ENVIAR AUDIO
    await conn.sendMessage(m.chat, { 
        audio: { url: downloadUrl }, 
        mimetype: 'audio/mpeg', 
        fileName: `${video.title}.mp3`
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply('*⚠️ Error en la API de descarga. Intenta de nuevo más tarde.*');
  }
};

handler.help = ['play'];
handler.tags = ['dl'];
handler.command = ['play', 'play2'];

export default handler;