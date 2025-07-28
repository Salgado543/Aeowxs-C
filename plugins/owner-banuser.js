var handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    const formatNumber = (number) => number.replace(/\s/g, '').replace(/([@+-])/g, '');
    const senderName = await conn.getName(m.sender);
    const botNumber = conn.user.jid.split('@')[0];
    const ownJid = `${botNumber}@s.whatsapp.net`;

    // Obtener número del texto, mención o cita
    let target;
    if (text) {
      const number = isNaN(text) ? formatNumber(text.split('@')[1]) : formatNumber(text);
      target = number + '@s.whatsapp.net';
    } else if (m.quoted?.sender) {
      target = m.quoted.sender;
    } else {
      return conn.reply(m.chat, `*${emojis} Etiqueta o escribe el número del usuario que deseas banear.*`, m, { mentions: [ownJid] });
    }

    const targetNumber = target.split('@')[0];

    // Prevenir autoban del bot
    if (target === ownJid)
      return conn.reply(m.chat, `*⚠️ @${botNumber} no puede ser baneado.*`, m, { mentions: [ownJid] });

    // Prevenir ban de propietarios
    for (const [ownerNumber] of global.owner) {
      if (targetNumber === ownerNumber)
        return conn.reply(m.chat, `*❌ No puedo banear al propietario @${ownerNumber}.*`, m, {
          mentions: [`${ownerNumber}@s.whatsapp.net`]
        });
    }

    // Banear al usuario
    const users = global.db.data.users;
    if (!users[target]) users[target] = {};
    if (users[target].banned) {
      return conn.reply(m.chat, `*☁️ El usuario ya está baneado.*`, m, { mentions: [target] });
    }

    users[target].banned = true;
    await conn.reply(m.chat, `*✅ Usuario baneado exitosamente.*`, m, { mentions: [target] });

  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, `*✖️ Ocurrió un error inesperado.*`, m);
  }
};

handler.help = ['banuser'];
handler.command = ['banuser'];
handler.tags = ['owner'];
handler.rowner = true;

export default handler;