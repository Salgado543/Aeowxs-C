
let handler = async (m, { conn, usedPrefix, command }) => {
    if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply(hotw);
    }

    await m.react('🍑');

    let txt = 'Pack 🔥';
    let img = 'https://delirius-apiofc.vercel.app/nsfw/girls';

    let buttons = [
        {
            buttonId: `.pack`,
            buttonText: { displayText: "Ver más" },
            type: 1
        }
    ];
    await conn.sendMessage(
        m.chat,
        {
            image: { url: img },
            caption: txt,
            buttons: buttons,
            viewOnce: true
        },
        { quoted: m }
    );
};

handler.command = ['pack'];
handler.help = ['pack'];
handler.tags = ['nsfw'];

export default handler;