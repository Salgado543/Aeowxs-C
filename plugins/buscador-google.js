/*const handler = async (m, { conn, args }) => {
  const targetUser = m.sender;
  const creatorNumber = '51927238856'; // sin el '+'
  const creatorMention = '@' + creatorNumber;
  const userMention = '@' + targetUser.split('@')[0];

  const text = `Hola soy shadow ${args[0] || userMention}

Mi creador es ${creatorMention}

Mi número es +${creatorNumber} si lo necesitas`;

  await conn.sendMessage(m.chat, {
    text,
    mentions: [targetUser, `${creatorNumber}@s.whatsapp.net`]
  });
};

handler.command = /^hola$/i;

export default handler;*/

const handler = async (m, { conn, args }) => {
  const targetUser = m.sender;
  const creatorNumber = '51927238856';
  const creatorMention = '@' + creatorNumber;
  const userMention = '@' + targetUser.split('@')[0];

  const text = `Hola soy shadow ${args[0] || userMention}

Mi creador es ${creatorMention}

Mi número es +${creatorNumber} si lo necesitas`;

  await conn.sendMessage(m.chat, {
    text,
    footer: 'Shadow Bot',
    buttons: [
      { buttonId: '.hola', buttonText: { displayText: '👋 Hola' }, type: 1 },
      { buttonId: '.chao', buttonText: { displayText: '👋 Chao' }, type: 1 }
    ],
    headerType: 1,
    mentions: [targetUser, `${creatorNumber}@s.whatsapp.net`]
  }, { quoted: m });
};

handler.command = /^hola$/i;

export default handler;