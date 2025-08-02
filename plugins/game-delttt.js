import MessageType from '@whiskeysockets/baileys';
const handler = async (m, {conn, usedPrefix, command}) => {
  const room = Object.values(conn.game).find((room) => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender));
  if (room == undefined) return conn.sendButton(m.chat, '*⚠️ No estas en ninguna partida de tres en raya.*', dev, null, [['Iniciar sala', `${usedPrefix}ttt new sala`]], m);
  delete conn.game[room.id];
  await m.reply('*✅ Se eliminó la sala del juego de tres en raya.*');
};
handler.command = /^(delttt|deltt|delxo|deltictactoe)$/i;
handler.tags = ['game'];
handler.help = ['delttt'];
handler.fail = null;
export default handler;