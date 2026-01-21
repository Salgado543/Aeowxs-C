const handler = async (m, {isOwner, isAdmin, conn, text, participants, args, command, usedPrefix}) => {

  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  // Verificación de permisos
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  // ==========================================
  // 🛡️ ZONA DE PROTECCIÓN ANTI-BAN (TAGALL) 🛡️
  // ==========================================
  
  // 1. Simular "Escribiendo..."
  // Es vital para tagall porque es un mensaje muy pesado (muchas menciones)
  await conn.sendPresenceUpdate('composing', m.chat);

  // 2. Calcular tiempo de espera (3 a 6 segundos)
  // Justificamos la demora como si el bot estuviera "leyendo" la lista de miembros
  const min = 3000;
  const max = 6000;
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;

  // 3. Esperar el tiempo calculado
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // ==========================================
  // 🏁 FIN DE PROTECCIÓN
  // ==========================================

  // Recuperamos variables globales si existen, si no usamos valores por defecto
  const msgtagall = global.msgtagall || '📣 Atención Grupo';
  const emotg = global.emotg || '👤';
  const dev = global.dev || '';

  const pesan = args.join` `;
  const oi = `*\`AVISO:\`* ${pesan}`;
  
  let teks = `${msgtagall}\n*INTEGRANTES:* ${participants.length}\n\n ${oi}\n\nෆ *ETIQUETAS*\n`;
  
  for (const mem of participants) {
    teks += `${emotg} @${mem.id.split('@')[0]}\n`;
  }
  
  teks += `> ${dev}`;
  
  // Enviamos el mensaje con las menciones
  await conn.sendMessage(m.chat, {text: teks, mentions: participants.map((a) => a.id)} );
};

handler.help = ['todos'];
handler.tags = ['gc'];
handler.command = /^(tagall|t|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;

export default handler;