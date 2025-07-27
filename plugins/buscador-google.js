const handler = async (m, { conn, args }) => {
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

export default handler;