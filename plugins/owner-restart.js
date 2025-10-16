
const handler = async (m, { conn }) => {
  try {
    await m.reply(`☕ *Reiniciando el sistema...*\n> Espera un momento para finalizar.`);
    setTimeout(() => process.exit(0), 3000); // sale del proceso en 3 segundos
  } catch (err) {
    console.error(err);
    conn.reply(m.chat, `${err}`, m);
  }
};

handler.help = ['restart'];
handler.tags = ['owner'];
handler.command = ['restart', 'reiniciar'];
handler.rowner = true;

export default handler;