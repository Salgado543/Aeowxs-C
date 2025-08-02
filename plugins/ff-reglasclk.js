let handler = async (m, { conn }) => {

m.react('🕹️');

const message = "Reglas CLK";
if (m.isGroup) {

const imageUrl = 'https://files.catbox.moe/68whsy.jpg';

await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { mimetype: 'image/jpeg' });
}
}
handler.help = ['reglasclk'];
handler.tags = ['ff', 'reglas'];
handler.command = ['clk', 'reglasclk', 'clkreglas'];
handler.admin = true;
handler.botAdmin = false;
handler.group = true;

export default handler;