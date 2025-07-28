import axios from 'axios';
const { proto, generateWAMessageContent, generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default;

const handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    return conn.reply(m.chat, `*${emojis} Ingresa una búsqueda de Pinterest.*\n> *Ejemplo:* ${usedPrefix + command} Gatitos`, m, rcanal);
  }

  await m.react('🔎');

  try {
    const { data } = await axios.get(`https://api.vreden.my.id/api/pinterest?query=${encodeURIComponent(text)}`);
    const resultados = Array.isArray(data?.result) ? data.result : [];

    if (!resultados.length) {
      return conn.reply(m.chat, '*❌ No se encontraron imágenes para esa búsqueda.*', m);
    }

    // si te la robas sos re gei
    const seleccionados = resultados.sort(() => Math.random() - 0.5).slice(0, 10);
    const tarjetas = [];

    for (const url of seleccionados) {
      const { imageMessage } = await generateWAMessageContent({ image: { url } }, {
        upload: conn.waUploadToServer
      });

      tarjetas.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: 'Pinterest - Search' }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          hasMediaAttachment: true,
          imageMessage
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "Ver en Pinterest",
                url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(text)}`
              })
            }
          ]
        })
      });
    }

    const carrusel = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({ text: `\`Resultados:\` ${text}` }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: dev }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: tarjetas })
          })
        }
      }
    }, { quoted: m });

    await conn.relayMessage(m.chat, carrusel.message, { messageId: carrusel.key.id });

  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, `*❌ Ocurrió un error al obtener los datos.*\n*Error:* ${e.message}`, m);
  }
};

handler.help = ['pinterest'];
handler.tags = ['search'];
handler.command = ['pin', 'pinterest', 'pintes'];

export default handler;