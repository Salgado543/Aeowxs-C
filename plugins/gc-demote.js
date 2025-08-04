/* 
Created by Crxstian Escobar 🌙
*/
/*
const handler = async (m, {conn, usedPrefix, text}) => {
  if (isNaN(text) && !text.match(/@/g)) {
  } else if (isNaN(text)) {
    var number = text.split`@`[1];
  } else if (!isNaN(text)) {
    var number = text;
  }
  if (!text && !m.quoted) return conn.reply(m.chat, `*${emojis} Menciona a un usuario para quitar admin.*`, m);
  if (number.length > 13 || (number.length < 11 && number.length > 0)) return conn.reply(m.chat, `*⚠️ El usuario ingresado es incorrecto.*`, m);
  try {
    if (text) {
      var user = number + '@s.whatsapp.net';
    } else if (m.quoted.sender) {
      var user = m.quoted.sender;
    } else if (m.mentionedJid) {
      var user = number + '@s.whatsapp.net';
    }
  } catch (e) {
  } finally {
    const groupMetadata = await conn.groupMetadata(m.chat);
    if (user === groupMetadata.owner) {
      return conn.reply(m.chat, `*⚠️ No se puede degradar al creador del grupo.*`, m);
    }
    conn.groupParticipantsUpdate(m.chat, [user], 'demote');
    conn.reply(m.chat, `*✅ El usuario fue degradado de la administración.*`, m);
  }
};

handler.help = ['demote'];
handler.tags = ['gc'];
handler.command = /^(demote|quitarpoder|quitaradmin)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;
export default handler;*/

const handler = async (m, { conn, text }) => {
  if (!text && !m.quoted && !m.mentionedJid.length) {
    return conn.reply(m.chat, `*${emojis} Menciona o responde a un usuario para quitar admin.*`, m);
  }

  let user;
  if (m.mentionedJid[0]) {
    user = m.mentionedJid[0];
  } else if (m.quoted) {
    user = m.quoted.sender;
  } else if (text) {
    const number = text.replace(/\D/g, '');
    if (number.length < 11 || number.length > 13) {
      return conn.reply(m.chat, `*⚠️ El número ingresado es incorrecto.*`, m);
    }
    user = number + '@s.whatsapp.net';
  }

  const groupMetadata = await conn.groupMetadata(m.chat);
  const participant = groupMetadata.participants.find(p => p.id === user);

  if (user === groupMetadata.owner) {
    return conn.reply(m.chat, `*⚠️ No se puede degradar al creador del grupo.*`, m);
  }

  if (!participant?.admin) {
    return conn.reply(m.chat, `*⚠️ El usuario mencionado ya no es administrador.*`, m);
  }

  await conn.groupParticipantsUpdate(m.chat, [user], 'demote');
  return conn.reply(m.chat, `*✅ El usuario fue degradado de la administración.*`, m);
};

handler.help = ['demote'];
handler.tags = ['gc'];
handler.command = /^(demote|quitarpoder|quitaradmin)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;