import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  await m.react(emojis);

  let list = [
    {
      displayName: "Florencia",
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Floree\nitem1.TEL;waid=own:own\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET:team.sunflare@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://www.instagram.com/shadowzclub\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Argentina 🇦🇷;;;;\nitem4.X-ABLabel:País\nEND:VCARD`
    },
    {
      displayName: "Cristian Escobar",
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Dev Criss 🇦🇱\nitem1.TEL;waid=51927238856:51927238856\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET:cristianescobar.vx@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://www.instagram.com/dev.criss_vx\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Perú 🇵🇪;;;;\nitem4.X-ABLabel:País\nEND:VCARD`
    }
  ];

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: `${list.length} Contactos`,
      contacts: list
    }
  }, { quoted: estilo });
};

handler.help = ['creador', 'dueño'];
handler.tags = ['info'];
handler.command = /^(owner|creador|creator|dueño|desarrollador)$/i;

export default handler;