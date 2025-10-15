import axios from 'axios'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

const pins = async (judul) => {
  const link = `https://id.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(judul)}%26rs%3Dtyped&data=%7B%22options%22%3A%7B%22query%22%3A%22${encodeURIComponent(judul)}%22%2C%22scope%22%3A%22pins%22%7D%7D`

  const headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'referer': 'https://id.pinterest.com/',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
  }

  try {
    const res = await axios.get(link, { headers })
    if (res.data?.resource_response?.data?.results) {
      return res.data.resource_response.data.results
        .map(item => {
          if (item.images) {
            return {
              id: item.id,
              title: item.rich_summary?.display_name || 'Imagen de Pinterest',
              description: item.grid_description || 'Sin descripción disponible',
              link: item.link || `https://www.pinterest.com/pin/${item.id}`,
              image_large_url: item.images.orig?.url || item.images['564x']?.url || item.images['236x']?.url
            }
          }
          return null
        })
        .filter(img => img)
    }
    return []
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

let handler = async (m, { conn, usedPrefix, command,text }) => {
  if (!text) return m.reply(`*${emojis} Ingresa un texto para buscar en Pinterest.*\n> Ejemplo: ${usedPrefix + command}tatuajes hombres`)

  try {
    await m.react('🕓')
    const results = await pins(text)
    if (!results.length) return conn.reply(m.chat, `⚠️ No se encontraron resultados.`, m)

    const sliced = results.slice(0, 5)
    const push = []

    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer })
      return imageMessage
    }

    for (const item of sliced) {
      const image = await createImage(item.image_large_url)

      push.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `*${item.title}*\n${item.description}`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '' }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '',
          hasMediaAttachment: true,
          imageMessage: image
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              "name": "cta_url",
              "buttonParamsJson": `{"display_text":"🌐 Ver en Pinterest","url":"${item.link}"}`
            }
          ]
        })
      })
    }

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `*🖼️ Resultados de:* ${text}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '_Desliza para ver más resultados_'
            }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: [...push]
            })
          })
        }
      }
    }, { quoted: m })

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    await m.react('✅')

  } catch (error) {
    console.error(error)
    conn.reply(m.chat, '*⚠️ Error al obtener imágenes de Pinterest.*', m)
    await m.react('⚠️')
  }
}

handler.help = ['pinterest *<texto>*']
handler.tags = ['search']
handler.command = /^pinterest|pin$/i

export default handler