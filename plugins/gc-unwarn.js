/*const handler = async (m, { conn, text, command, usedPrefix }) => {

  const warntext = `${emojis} Etiqueta a un usuario para quitarle una advertencia.\n📌 Ejemplo: *${usedPrefix + command} @usuario*`;
  let who;

  if (m.isGroup) {
    who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : false);
  } else {
    who = m.chat;
  }

  if (!who || typeof who !== 'string' || !who.includes('@s.whatsapp.net')) {
    return m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext) });
  }

  const groupData = global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {};
  groupData.warn = groupData.warn || {};

  const warns = groupData.warn[who] || 0;

  if (warns === 0) {
    return m.reply(`${emojis} El usuario no tiene advertencias en este grupo.`);
  }

  groupData.warn[who] -= 1;

  await m.reply(
    `♻️ *@${who.split`@`[0]}* se le quitó una advertencia.\n*Advertencias: ${groupData.warn[who]}/3*`,
    null,
    { mentions: [who] }
  );

  if (global.db.data.users[who]?.warn !== undefined) {
    delete global.db.data.users[who].warn;
  }
};

handler.help = ['unwarn'];
handler.tags = ['gc'];
handler.command = ['delwarn', 'unwarn'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;*/

const handler = async (m, { conn, text, command, usedPrefix }) => {

  const warntext = `*⚠️ Etiqueta a un usuario o responde a un mensaje para quitarle una advertencia.*`;
  
  let who;
  if (m.isGroup) {
    who = m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
      ? m.quoted.sender
      : null;
  } else {
    who = m.chat;
  }

  if (!who || typeof who !== 'string' || !who.includes('@s.whatsapp.net')) {
    return m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext) });
  }

  const chat = global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {};
  chat.warns = chat.warns || {};

  const currentWarns = chat.warns[who] || 0;

  if (currentWarns === 0) {
    return m.reply(`${emojis} El usuario no tiene advertencias en este grupo.`);
  }

  chat.warns[who] -= 1;

  await m.reply(
    `♻️ *@${who.split`@`[0]}* se le quitó una advertencia.\n*Advertencias: ${chat.warns[who]}/3*`,
    null,
    { mentions: [who] }
  );

  return !0;
};

handler.command = ['delwarn', 'unwarn'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;