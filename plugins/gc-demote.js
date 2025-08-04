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


const handler = async (m, { conn }) => {
  if (!m.mentionedJid[0] && !m.quoted) {
    let texto = `*${emojis} Menciona o responde al mensaje del usuario que deseas quitarle el admin.*`
    return m.reply(texto, m.chat, { mentions: conn.parseMention(texto) })
  }

  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
  let groupMetadata = await conn.groupMetadata(m.chat)

  if (user === groupMetadata.owner) {
    return m.reply(`*⚠️ No puedes degradar al creador del grupo.*`)
  }

  await conn.groupParticipantsUpdate(m.chat, [user], 'demote')
  m.reply(`*✅ El usuario fue degradado de la administración.*`)
}

handler.help = ['demote']
handler.tags = ['gc']
handler.command = /^(demote|quitarpoder|quitaradmin)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler