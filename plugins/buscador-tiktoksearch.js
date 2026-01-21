import axios from 'axios';
const { proto, generateWAMessageFromContent, generateWAMessageContent } = (await import("@whiskeysockets/baileys")).default;

let handler = async (message, { conn, text, usedPrefix, command }) => {
  // Aseguramos variables globales por si no están definidas
  const emojis = global.emojis || '🔎';
  const botname = global.botname || 'TikTok Search';
  const dev = global.dev || 'Powered by Bot';

  // 1. VALIDACIÓN RÁPIDA
  if (!text) return conn.reply(message.chat, `*${emojis} Ingrese el texto que desee buscar en TikTok*`, message);

  // ==========================================
  // 🛡️ ZONA DE PROTECCIÓN ANTI-BAN 🛡️
  // ==========================================
  
  // 2. Simular "Escribiendo..."
  // Mantiene el estado activo mientras "busca" los videos
  await conn.sendPresenceUpdate('composing', message.chat);

  // 3. Calcular tiempo de espera (4 a 7 segundos)
  // Este comando es complejo (carrusel de videos), así que una espera larga es natural y segura.
  const min = 4000;
  const max = 7000;
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;

  // 4. Esperar el tiempo calculado
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // ==========================================
  // 🏁 FIN DE PROTECCIÓN
  // ==========================================

  // Función interna para crear el mensaje de video
  async function createVideoMessage(url) {
    const { videoMessage } = await generateWAMessageContent({ video: { url } }, { upload: conn.waUploadToServer });
    return videoMessage;
  }

  try {
    // Reacción después de la espera ("Ya lo encontré")
    await message.react('🔎');

    // Realizar la búsqueda de TikTok
    let { data: response } = await axios.get('https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=' + text);
    let searchResults = response.data;

    // Limitar a los primeros 7 resultados
    let selectedResults = searchResults.slice(0, 7);

    // Crear el mensaje con los resultados
    let results = [];
    for (let result of selectedResults) {
      results.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: botname }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: result.title,
          hasMediaAttachment: true,
          videoMessage: await createVideoMessage(result.nowm)
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
      });
    }

    // Crear el mensaje con el carrusel de resultados
    const responseMessage = generateWAMessageFromContent(message.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({ text: '`Resultados:` ' + text }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: dev }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...results] })
          })
        }
      }
    }, { quoted: message });

    // Enviar el mensaje de respuesta
    await conn.relayMessage(message.chat, responseMessage.message, { messageId: responseMessage.key.id });

  } catch (error) {
    await conn.reply(message.chat, error.toString(), message);
  }
};

handler.help = ['tiktoksearch'];
handler.tags = ['search'];
handler.command = ['tiktoksearch', 'ttss', 'ttsearch'];

export default handler;