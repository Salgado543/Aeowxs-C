const handler = async (m, { conn, args, text, usedPrefix, command }) => {
  const db = global.db.data.users;
  let user;

  if (m.quoted) {
    user = m.quoted.sender;
  } else if (args.length >= 1) {
    let number = args[0].replace(/\D+/g, ''); // solo dígitos
    if (!number) {
      await conn.reply(m.chat, '*⚠️ Ingresa un número válido.*', m);
      return;
    }
    user = number + '@s.whatsapp.net';
  } else {
    await conn.reply(m.chat, `${emojis} *Etiqueta o escribe el número del usuario que quieres desbanear del bot.*`, m, rcanal);
    return;
  }

  if (!db[user]) {
    await conn.reply(m.chat, '⚠️ *El usuario no está registrado en la base de datos.*', m);
    return;
  }

  if (!db[user].banned) {
    await conn.reply(m.chat, '✅ *El usuario ya está desbaneado.*', m);
    return;
  }

  db[user].banned = false;
  db[user].banRazon = '';

  const nametag = await conn.getName(user).catch(_ => 'Usuario');
  await conn.reply(m.chat, `✅ *El usuario ${nametag} ha sido desbaneado correctamente.*`, m, { mentionedJid: [user] });
};

handler.help = ['unbanuser'];
handler.command = ['unbanuser'];
handler.tags = ['owner'];
handler.rowner = true;

export default handler;