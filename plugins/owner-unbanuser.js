const handler = async (m, { conn, args }) => {
  const db = global.db.data.users;

  let userJid;

  if (m.quoted) {
    userJid = m.quoted.sender;
  } else if (args.length >= 1) {
    const number = args[0].replace(/\D+/g, '');
    if (!number) {
      return conn.reply(m.chat, `⚠️ *Ingresa un número válido.*`, m);
    }
    userJid = number + '@s.whatsapp.net';
  } else {
    return conn.reply(m.chat, `${emojis} *Etiqueta o escribe el número del usuario que quieres desbanear del bot.*`, m, rcanal);
  }

  if (!db[userJid]) {
    return conn.reply(m.chat, `⚠️ *El usuario no está registrado en la base de datos.*`, m);
  }

  if (!db[userJid].banned) {
    const name = await conn.getName(userJid).catch(() => 'Usuario');
    return conn.reply(m.chat, `☁️ *El usuario ${name} no está baneado actualmente.*`, m, { mentionedJid: [userJid] });
  }

  db[userJid].banned = false;
  db[userJid].banRazon = '';

  const name = await conn.getName(userJid).catch(() => 'Usuario');
  return conn.reply(m.chat, `✅ *El usuario ${name} ha sido desbaneado correctamente.*`, m, { mentionedJid: [userJid] });
};

handler.help = ['unbanuser'];
handler.command = ['unbanuser'];
handler.tags = ['owner'];
handler.rowner = true;

export default handler;