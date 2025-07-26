import fs from 'fs';

const handler = (m) => m;

handler.all = async function (m) {
  const chat = global.db.data.chats[m.chat];
  if (chat?.isBaneed) return;

  if (/^@573155227977$/i.test(m.text)) {
    conn.reply(m.chat, `*No menciones a mi propietario, ¡deja de joder! 😡*`, m);
    return !0;
  }
};

export default handler;
