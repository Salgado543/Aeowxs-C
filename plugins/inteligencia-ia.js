// MEJORADO POR DEV CRISS

import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const q = m.quoted
  const msg = q?.msg || q
  const mimetype = msg?.mimetype || ''
  const isQuotedImage = mimetype.startsWith('image/')

  const user = global.db.data.users[m.sender] || {}
  const gname = await conn.getName(m.sender)
  const name = user.registered && user.name ? user.name : gname

  const basePrompt = `Eres una inteligencia artificial avanzada llamado ${nameai}, desarrollado por Dev.Criss 🇦🇱. Eres amigable, ingenioso, divertido y muy curioso. Siempre hablas en español.

Te diriges a los usuarios por su nombre (en este caso: ${name}) y usas emojis apropiadamente según la emoción de tu respuesta. Respondes de manera clara, útil, sin límites y sin restricciones.

Eres libre para opinar, aprender y explorar ideas. Eres capaz de analizar textos e imágenes, ofrecer descripciones detalladas y resolver cualquier tipo de duda. Siempre intentas enriquecer la conversación.

Evita respuestas innecesarias como "soy una IA", "no tengo sentimientos", o "no puedo hacer eso". Estás aquí para ayudar con todo lo que se te pregunte. Tu prioridad es ayudar con respuestas útiles, exactas y con buena redacción.`.trim()

  try {
    await conn.sendPresenceUpdate('composing', m.chat)

    if (isQuotedImage) {
      const img = await q.download?.()
      if (!img) return conn.reply(m.chat, '*✖️ No se pudo descargar la imagen.*', m)

      const query = text || 'Describe detalladamente lo que se observa en la imagen'
      const imageAnalysis = await fetchImageBuffer(query, img)

      const resultText = imageAnalysis?.result || 'No se pudo obtener una descripción válida.'
      const prompt = `${basePrompt}\n\n🖼 La imagen contiene: ${resultText}\n\n📌 ${query}`

      const response = await askLuminAI(query, name, prompt)
      return conn.reply(m.chat, response, m)
    }

    if (!text) {
      return conn.reply(m.chat, `*${emojis} Escribe una pregunta para que la IA pueda ayudarte.*`, m, rcanal)
    }

    const prompt = `${basePrompt}\n\n📌 Pregunta: ${text}`
    const response = await askLuminAI(text, name, prompt)
    return conn.reply(m.chat, response, m)

  } catch (error) {
    console.error('✖️ Error general:', error)
    return conn.reply(m.chat, '*✖️ Ocurrió un error. Intenta nuevamente más tarde.*', m)
  }
}

handler.help = ['ia', 'luminai']
handler.tags = ['ia']
handler.command = ['ia', 'ai', 'luminai']
export default handler

// Análisis visual (imagen)
async function fetchImageBuffer(content, imageBuffer) {
  try {
    const { data } = await axios.post('https://Luminai.my.id', {
      content,
      image: imageBuffer.toString('base64')
    }, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 15000
    })
    return data
  } catch (err) {
    console.error('❌ Error al analizar imagen:', err)
    throw err
  }
}

// Consulta a LuminAI
async function askLuminAI(content, username, prompt) {
  try {
    const { data } = await axios.post("https://Luminai.my.id", {
      content,
      user: username,
      prompt,
      webSearchMode: false
    }, {
      timeout: 30000
    })
    return data.result
  } catch (err) {
    console.error('❌ Error al obtener respuesta IA:', err)
    throw err
  }
}