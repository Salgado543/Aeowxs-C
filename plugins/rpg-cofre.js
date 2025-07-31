const handler = async (m, {isPrems, conn}) => {
  const time = global.db.data.users[m.sender].lastcofre + 86400000; // 36000000 10 Horas //86400000 24 Horas
  if (new Date - global.db.data.users[m.sender].lastcofre < 86400000) {
return conn.reply(
m.chat, `*⏰ Ya reclamastes tu cofre, regresa en ${msToTime(time - new Date())} para volver a reclamar*`, m);
}
  const img = 'https://files.catbox.moe/qd5v12.jpg';
  const dia = Math.floor(Math.random() * 30);
  const expp = Math.floor(Math.random() * 5000);

  global.db.data.users[m.sender].coins += dia;
  global.db.data.users[m.sender].exp += expp;

  const texto = `
╭━〔 ${global.botname} 〕⬣
┃ 👋🏻 Hola, obtuviste
┃    un cofre.
┃
┃ - *${dia} ${moneda}*
┃ - *${expp} Exp* 💫
╰━━━━━━━━━━━━⬣`;

  await conn.sendFile(m.chat, img, 'yoshiko.jpg', texto, fkontak);
  // await conn.sendButton(m.chat, texto, wm, img, [['🔰 𝙼𝙴𝙽𝚄', '/menu'] ], fkontak, m)
  global.db.data.users[m.sender].lastcofre = new Date * 1;
};
handler.help = ['cofre'];
handler.tags = ['rpg'];
handler.command = ['coffer', 'cofre', 'abrircofre', 'cofreabrir'];
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return hours + ' Horas ' + minutes + ' Minutos';
}