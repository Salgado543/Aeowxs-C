import fetch from 'node-fetch'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`*${emojis} Ingresa un texto para buscar en Pinterest.*\n> Ejemplo: ${usedPrefix + command} Gatitos`)
    await m.react('🕓')

    try {
        const api = await fetch(`https://id.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(text)}%26rs%3Dtyped&data=%7B%22options%22%3A%7B%22query%22%3A%22${encodeURIComponent(text)}%22%2C%22scope%22%3A%22pins%22%7D%7D`)
        const json = await api.json()
        const results = json?.resource_response?.data?.results || []

        if (!results.length) {
            await m.react('⚠️')
            return m.reply('*⚠️ No se encontraron resultados en Pinterest.*')
        }

        const sliced = results.slice(0, 5)
        const push = []

        async function createImage(url) {
            const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer })
            return imageMessage
        }

        for (const item of sliced) {
            const imgUrl = item.images?.orig?.url || item.images?.["564x"]?.url || item.images?.["236x"]?.url
            if (!imgUrl) continue

            const image = await createImage(imgUrl)
            const title = item.rich_summary?.display_name || "Imagen de Pinterest"
            const desc = item.grid_description || "Sin descripción disponible"
            const source = item.link || `https://www.pinterest.com/pin/${item.id}`

            push.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `*${title}*\n${desc}`
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
                            "buttonParamsJson": `{"display_text":"🌐 Ver en Pinterest","url":"${source}"}`
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
        await m.react('⚠️')
        m.reply('*⚠️ Error al obtener imágenes desde Pinterest.*')
    }
}

handler.help = ['pinterest']
handler.tags = ['search']
handler.command = /^pinterest|pin$/i

export default handler