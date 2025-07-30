let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `${emojis} Por favor, haz una pregunta.`, m, rcanal)

  const respuestas = [
    'Sí.',
    'Será mejor que no te lo diga ahora.',
    'Sí, definitivamente.',
    'Debes confiar en ello.',
    'Mis fuentes me dicen que no.',
    'No cuentes con ello.',
    'No puedo predecirlo ahora.',
    'Muy dudoso.',
    'Las perspectivas no son buenas.',
    'Concéntrate y vuelve a preguntar.',
    'En mi opinión, sí.',
    'Es cierto.',
    'Probablemente.',
    'Todo apunta a que sí.',
    'Mi respuesta es no.',
    'Definitivamente no.',
    'Pregunta en otro momento.',
    'No estoy seguro, intenta de nuevo.',
    'Claro que sí.',
    'Las señales apuntan a que sí.',
    'Tal vez.',
    'Lo dudo mucho.',
    'No lo veo posible.',
    'Podría ser, pero no te confíes.',
    'Cuenta con ello.',
    'No sabría decirte.',
    'Confía en tu intuición.',
    'Parece que sí, pero con precaución.',
    'Mis sensores dicen que sí.',
    'No puedo responder a eso.',
    'Por supuesto.',
    'Solo el tiempo lo dirá.',
    'No hay duda alguna.',
    'No es el momento adecuado para saberlo.',
    'Es altamente probable.',
    'No te hagas ilusiones.',
    'Definitivamente sí.',
    'No está claro en este momento.',
    'Depende de cómo lo veas.',
    'Prefiero no responder.',
  ]

  const imagenes = [
    'https://files.catbox.moe/7ai948.jpg',
    'https://files.catbox.moe/7ai948.jpg',
  ]

  const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)]
  const imagen = imagenes[Math.floor(Math.random() * imagenes.length)]

  conn.sendMessage(m.chat, { image: { url: imagen }, caption: `${emoji} *${respuesta}*` }, { quoted: m })
}

handler.tags = ['fun']
handler.help = ['genio']
handler.command = ['akinator', 'genio']

export default handler