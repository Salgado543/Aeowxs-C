/*
const handler = async (m, { conn, text, command, usedPrefix }) => {
  const pp = './media/catalogo.jpg';
  let number, ownerNumber, aa, who;

  if (m.isGroup) {
    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  } else who = m.chat;

  const chat = global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {};
  chat.warns = chat.warns || {};
  const usuario = conn.user.jid.split`@`[0] + '@s.whatsapp.net';
  const bot = global.db.data.settings[conn.user.jid] || {};
  const dReason = 'Sin motivo';
  const msgtext = text || dReason;
  const sdms = msgtext.replace(/@\d+-?\d* /g, '');
  const warntext = `*⚠️ Etiquete a una persona o responda a un mensaje del grupo para advertir al usuario.*`;

  if (!who || typeof who !== 'string' || !who.includes('@')) {
    return m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext) });
  }

  for (let i = 0; i < global.owner.length; i++) {
    ownerNumber = global.owner[i][0];
    if (usuario.replace(/@s\.whatsapp\.net$/, '') === ownerNumber) {
      aa = ownerNumber + '@s.whatsapp.net';
      await conn.reply(m.chat, `*⚠️ No puedes advertir al propietario del bot.*`, m, { mentions: [aa] });
      return;
    }
  }

  // Inicializar advertencias si no existen
  if (!chat.warns[who]) chat.warns[who] = 0;

  chat.warns[who] += 1;

  await m.reply(
    `*@${who.split`@`[0]}* recibió una advertencia en este grupo.\nMotivo: ${sdms}\n*Advertencias: ${chat.warns[who]}/3*`,
    null,
    { mentions: [who] }
  );

  if (chat.warns[who] >= 3) {
    chat.warns[who] = 0;
    await m.reply(
      `⚠️ *Advertencia final*.\n*@${who.split`@`[0]}* superó las 3 advertencias y será eliminado.`,
      null,
      { mentions: [who] }
    );
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
  }

  return !1;
};

handler.command = ['advertir', 'advertencia', 'warn', 'warning'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;*/

const handler = async (m, { conn, text, command, usedPrefix }) => {
  const pp = './media/catalogo.jpg';
  let who;

  if (m.isGroup) {
    who = m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
      ? m.quoted.sender
      : text;
  } else who = m.chat;

  const chat = global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {};
  chat.warns = chat.warns || {};

  const dReason = 'Sin motivo';
  const msgtext = text || dReason;
  const sdms = msgtext.replace(/@\d+-?\d* /g, '');
  const warntext = `*⚠️ Etiquete a una persona o responda a un mensaje del grupo para advertir al usuario.*`;

  if (!who || typeof who !== 'string' || !who.includes('@')) {
    return m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext) });
  }

  // Validar si es owner del bot
  const isOwner = global.owner.some(([num]) => who === num + '@s.whatsapp.net');
  if (isOwner) {
    await conn.reply(m.chat, `*⚠️ No puedes advertir al propietario del bot.*`, m, { mentions: [who] });
    return;
  }

  // Validar si es el bot mismo
  if (who === conn.user.jid) {
    await conn.reply(m.chat, `*⚠️ No puedes advertir al bot mismo.*`, m, { mentions: [who] });
    return;
  }

  // Validar si es el creador del grupo
  let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {};
  if (groupMetadata.owner && who === groupMetadata.owner) {
    await conn.reply(m.chat, `*⚠️ No puedes advertir al creador del grupo.*`, m, { mentions: [who] });
    return;
  }

  // Inicializar advertencias si no existen
  if (!chat.warns[who]) chat.warns[who] = 0;
  chat.warns[who] += 1;

  await m.reply(
    `*@${who.split`@`[0]}* recibió una advertencia en este grupo.\nMotivo: ${sdms}\n*Advertencias: ${chat.warns[who]}/3*`,
    null,
    { mentions: [who] }
  );

  if (chat.warns[who] >= 3) {
    chat.warns[who] = 0;
    await m.reply(
      `⚠️ *Advertencia final*.\n*@${who.split`@`[0]}* superó las 3 advertencias y será eliminado.`,
      null,
      { mentions: [who] }
    );
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
  }

  return !1;
};

handler.command = ['advertir', 'advertencia', 'warn', 'warning'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;