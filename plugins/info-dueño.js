let handler = async (m, { conn }) => {
  await m.react(emoji);

  // Crear contacto VCARD
  let list = [{
    displayName: "Jota",
    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Jota\nitem1.TEL;waid=573155227977:573155227977\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET:team.sunflare@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://www.instagram.com/nee\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Colombia 🇨🇴;;;;\nitem4.X-ABLabel:País\nEND:VCARD`
  }];

  // Enviar solo el contacto, sin adornos
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: `${list.length} Contacto`,
      contacts: list
    }
  }, { quoted: m });
};

handler.help = ['dueño'];
handler.tags = ['info'];
handler.command = /^(owner|dueño)$/i;

export default handler;