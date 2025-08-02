import TicTacToe from '../lib/tictactoe.js';

const handler = async (m, {conn, usedPrefix, command, text}) => {
  conn.game = conn.game || {};

  if (Object.values(conn.game).find((room) => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) {
    throw '*⚠️ Todavía estás en un juego con un usuario.*';
  }

  if (!text) {
    return await conn.reply(m.chat, `*${emojis} Coloca el nombre de la sala del juego para continuar.*\n> *Ejemplo:* ${usedPrefix + command} new sala`, m, rcanal);
  }

  let room = Object.values(conn.game).find((room) => room.state === 'WAITING' && (text ? room.name === text : true));

  if (room) {
    await m.reply('*🕹️ Un usuario se unió a la partida, iniciando el juego...*');
    room.o = m.chat;
    room.game.playerO = m.sender;
    room.state = 'PLAYING';

    const arr = room.game.render().map((v) => {
      return {
        X: '❎',
        O: '⭕',
        1: '1️⃣',
        2: '2️⃣',
        3: '3️⃣',
        4: '4️⃣',
        5: '5️⃣',
        6: '6️⃣',
        7: '7️⃣',
        8: '8️⃣',
        9: '9️⃣',
      }[v];
    });

    const str = `
🎮 TRES EN RAYA 🎮

❎ = @${room.game.playerX.split('@')[0]}
⭕ = @${room.game.playerO.split('@')[0]}

        ${arr.slice(0, 3).join('')}
        ${arr.slice(3, 6).join('')}
        ${arr.slice(6).join('')}

Turno de @${room.game.currentTurn.split('@')[0]}
`.trim();

    if (room.x !== room.o) await conn.sendMessage(room.x, {text: str, mentions: conn.parseMention(str)}, {quoted: m});
    await conn.sendMessage(room.o, {text: str, mentions: conn.parseMention(str)}, {quoted: m});
  } else {
    room = {
      id: 'tictactoe-' + Date.now(),
      x: m.chat,
      o: '',
      game: new TicTacToe(m.sender, 'o'),
      state: 'WAITING',
      name: text
    };

    const imgplay = `https://cope-cdnmed.agilecontent.com/resources/jpg/8/9/1590140413198.jpg`;
    conn.reply(m.chat, `*🎮 TRES EN RAYA 🎮*\n\n🧋 Esperando al segundo jugador...\n\n
*Unirse a la sala:*\n> *Usa:* ${usedPrefix + command} ${text}\n*Salir o eliminar sala*\n> *Usa:* ${usedPrefix}delttt`, m);
    conn.game[room.id] = room;
  }
};

handler.command = ['ttt', 'tictactoe'];
handler.tags = ['game'];
handler.help = ['ttt'];
export default handler;