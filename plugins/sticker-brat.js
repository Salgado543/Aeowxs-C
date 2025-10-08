const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    let input = text || (m.quoted && m.quoted.text);

    if (!input) {
 return m.reply(`*${emojis} Ingresa un texto para crear tu sticker.*\nEjemplo: ${usedPrefix + command} Hello world`);
 }

await m.react('☁️')
 const apiUrl = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(input)}`;

    await conn.sendMessage(m.chat, {
      sticker: { url: apiUrl }
    }, { quoted: fkontak });

  } catch (err) {
    console.error(err);
    await m.react('✖️')
    m.reply(`*✖️ Ocurrió un error al generar el sticker\n> Api caída*`);
  }
};

handler.command = /^brat$/i;
export default handler;