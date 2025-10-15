// Créditos Del Código A FzTeis

import axios from 'axios'
import baileys from '@whiskeysockets/baileys'
const { generateWAMessageFromContent } = baileys

const pins = async (judul) => {
  const link = `https://id.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(judul)}%26rs%3Dtyped&data=%7B%22options%22%3A%7B%22query%22%3A%22${encodeURIComponent(judul)}%22%2C%22scope%22%3A%22pins%22%7D%2C%22context%22%3A%7B%7D%7D`

  const headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'es-ES,es;q=0.9,en;q=0.8',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'x-requested-with': 'XMLHttpRequest'
  }

  try {
    const res = await axios.get(link, { headers })
    if (res.data?.resource_response?.data?.results) {
      return res.data.resource_response.data.results.map(item => {
        if (item.images) {
          return {
            image_large_url: item.images.orig?.url || null,
            image_medium_url: item.images['564x']?.url || null,
            image_small_url: item.images['236x']?.url || null
          }
        }
        return null
      }).filter(img => img !== null)
    }
    return []
  } catch (error) {
    console.error('Error Pinterest:', error)
    return []
  }
}

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`*${xsearch} Por favor, ingresa un texto para buscar en Pinterest.*\n> *\`Ejemplo:\`* .pinterest Gatos Hermosos`)

  try {
    await m.react(rwait)
    const results = await pins(text)
    if (!results || results.length === 0) return conn.reply(m.chat, `*⚠️ No se encontraron resultados para esa búsqueda.*`, m)

    const maxImages = Math.min(results.length, 10)

    // --- ENVÍO CARRUSEL SIN BOTONES ---
    const cards = results.slice(0, maxImages).map((img, i) => ({
      header: { title: `Resultado ${i + 1}` },
      body: { text: `🌿 Pinterest: ${text}` },
      thumbnailUrl: img.image_large_url || img.image_medium_url || img.image_small_url
    }))

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { text: `乂 *PINTEREST - SEARCH*\n\n≡ 🌳 𝖡𝗎́𝗌𝗊𝗎𝖾𝖽⍺: ${text}\n≡ 🌿 𝖱𝖾𝗌𝗎𝗅𝗍⍺𝖽𝗈𝗌 ${maxImages}` },
            carouselMessage: { cards }
          }
        }
      }
    }, { quoted: m })

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    await m.react(rdone)

  } catch (error) {
    console.error(error)
    conn.reply(m.chat, '*⚠️ Error al obtener imágenes de Pinterest.*', m)
  }
}

handler.help = ['pinterest']
handler.command = ['pinterest', 'pin']
handler.tags = ['search']

export default handler