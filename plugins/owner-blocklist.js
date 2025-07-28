
/* Creado por https://github.com/ianalejandrook15x
Mejorado por Dev Criss */

const handler = async (m, { conn }) => {
  try {
    const blocked = await conn.fetchBlocklist();
    if (!blocked || !blocked.length) throw 'No hay números bloqueados.';

    let list = blocked.map((jid, index) => `▢ @${jid.split('@')[0]}`).join('\n');
    let txt = `*≡ Lista de bloqueados*\n\n*Total :* ${blocked.length}\n\n┌─⊷\n${list}\n└───────────`;

    await conn.reply(m.chat, txt, m, { mentions: blocked });
  } catch (err) {
    console.error(err);
    throw typeof err === 'string' ? err : 'Ocurrió un error al obtener la lista de bloqueados.';
  }
};

handler.help = ['blocklist'];
handler.tags = ['main'];
handler.command = ['blocklist', 'listblock'];
handler.rowner = true;

export default handler;