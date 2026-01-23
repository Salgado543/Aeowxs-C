
const handler = async (m, {conn, participants, groupMetadata, args}) => {
  // Aseguramos emojis por si no están definidos
  const emojis = global.emojis || '👮';

  // ==========================================
  // 🛡️ ZONA DE PROTECCIÓN ANTI-BAN 🛡️
  // ==========================================
  // 1. Simular "Escribiendo..."
  // Da la impresión de que el bot está redactando la lista
  await conn.sendPresenceUpdate('composing', m.chat);

  // 2. Calcular tiempo de espera (2 a 4 segundos)
  // No necesita ser tan largo como un 'tagall', pero sí lo suficiente para no parecer spam
  const min = 2000;
  const max = 4000;
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;

  // 3. Esperar el tiempo calculado
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // ==========================================
  // 🏁 FIN DE PROTECCIÓN
  // ==========================================

  const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || './media/catalogo.jpeg';
  const groupAdmins = participants.filter((p) => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';
  const pesan = args.join` `;
  const oi = `${pesan}`;
  const text = `*${emojis} Invocando Admins*
  
${listAdmin}

🍄 Mensaje: ${oi}

> ✿ Este comando solo puede ser ejecutado si hay algún problema en el grupo o con el bot.`.trim();

  // Usamos await en sendFile para asegurar el envío
  await conn.sendFile(m.chat, pp, 'error.jpg', text, m, false, {mentions: [...groupAdmins.map((v) => v.id), owner]});
};

handler.help = ['admins'];
handler.tags = ['gc'];
// Nota: customPrefix hace que el comando se active con 'a', '@' o '.'
// Ten cuidado con el '.' si tienes otros comandos que empiezan así.
handler.customPrefix = /a|@|./i;
handler.command = /^(admins|@admins|dmins)$/i;
handler.group = true;

export default handler;