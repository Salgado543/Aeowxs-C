let handler = async (m, { conn }) => {

m.react('🕹️');

const reglasinf = "Reglas Infinito";
const message = reglasinf;
if (m.isGroup) {

const imageUrl = 'https://files.catbox.moe/46w8mr.jpg';

await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { mimetype: 'image/jpeg' });
}
}
handler.help = ['reglasinf'];
handler.tags = ['ff', 'reglas'];
handler.command = ['infinito', 'reglasinf', 'infreglas'];
handler.admin = true;
handler.botAdmin = false;
handler.group = true;

export default handler;