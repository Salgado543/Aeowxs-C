const handler = async (m, { conn, args, participants, usedPrefix, command }) => {
  if (!args[0] || isNaN(args[0])) 
    return m.reply(`*${emojis} Ingrese algún prefijo de un país.*\n> *Ejemplo:* ${usedPrefix + command} 54`);

  const prefijo = args[0].replace(/[+]/g, '');
  const mensaje = args.slice(1).join(' ');
  const textoMensaje = `${emoji} *Mensaje:* ${mensaje}`;

  const usuariosConPrefijo = participants
    .map((u) => u.id)
    .filter((v) => v !== conn.user.jid && v.startsWith(prefijo));

  if (usuariosConPrefijo.length === 0) 
    return m.reply(`*${emojis} No hay ningún número con el prefijo \`+${prefijo}\` en este grupo.*`);

  const listaUsuarios = usuariosConPrefijo.map((v) => '${emotg} @' + v.replace(/@.+/, '')).join('\n');

  conn.reply(
    m.chat, 
    `*MENSAJE ESPECIAL PARA \`+${prefijo}\` QUE ESTÁN EN ESTE GRUPO:*\n\n${textoMensaje}\n\n${listaUsuarios}`, 
    m, 
    { mentions: usuariosConPrefijo }
  );
};

handler.help = ['tagnum'];
handler.command = /^(tagnum|hidetagnum)$/i;
handler.group = true;
handler.admin = true;
handler.fail = null;

export default handler;