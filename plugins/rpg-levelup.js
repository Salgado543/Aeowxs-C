import { canLevelUp, xpRange } from '../lib/levelling.js';
import { levelup } from '../lib/canvas.js';

const MAX_LEVEL = 300;
const handler = async (m, { conn }) => {
  const name = conn.getName(m.sender);
  const usertag = '@' + m.sender.split('@s.whatsapp.net')[0];
  const user = global.db.data.users[m.sender];
  if (!canLevelUp(user.level, user.exp, global.multiplier)) {
    const { min, xp, max } = xpRange(user.level, global.multiplier);
    const message = `
*👤 ¡Hola!* *${usertag}*

- *Nivel actual:* ${user.level}
- *Rango actual:* ${user.role}
- *Puntos de Exp:* ${user.exp - min}/${xp}

> Para ascender de nivel nesesitas obtener *${max - user.exp}* puntos de exp más.`.trim();
    return conn.sendMessage(m.chat, {text: message, mentions: [m.sender]}, {quoted: m});
  }

const before = user.level * 1;
let safetyCounter = 0;
while (canLevelUp(user.level, user.exp, global.multiplier) && safetyCounter < 100) {
  if (user.level >= MAX_LEVEL) break; // Evita que suba más allá del nivel máximo
  user.level++;
  safetyCounter++;
}


if (safetyCounter >= 100) console.warn("⚠️ Posible bucle infinito al subir de nivel.");

if (user.level >= MAX_LEVEL) {
  return conn.sendMessage(m.chat, {
    text: `🎖️ *¡Felicidades!* ${name} *Has alcanzado el nivel máximo.*\n> *No puedes subir más, pero sigue interactuando para disfrutar del bot.*`,
    mentions: [m.sender]
  }, { quoted: m });
}

  if (before !== user.level) {
    const levelUpMessage = `🎉 ¡Felicidades, ${name}! Has subido de nivel a ${user.level}`;
    const levelUpDetails = `*🚀 Nuevo Nivel Alcanzado*

- *Nivel anterior:* ${before}
- *Nuevo nivel:* ${user.level}
- *Rango actual:* ${user.role}

> Sigue interactuando con *${namebot}*`.trim();
    try {
      const levelUpImage = await levelup(levelUpMessage, user.level);
      conn.sendFile(m.chat, levelUpImage, 'Menu.jpg', levelUpDetails, m);
    } catch (e) {
      conn.sendMessage(m.chat, {text: levelUpDetails, mentions: [m.sender]}, {quoted: m});
    }
  }
};
handler.help = ['levelup'];
handler.tags = ['xp'];
handler.command = ['nivel', 'lvl', 'levelup', 'level'];
handler.register = true;
export default handler;