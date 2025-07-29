import fetch from 'node-fetch'

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        throw m.reply(`*${emojis} Ingrese un link de TikTok*\n*💡 Ejemplo:* ${usedPrefix + command} https://vm.tiktok.com/ZMkcmTCa6/`);
    }

if (!args[0].match(/(https?:\/\/)?(www\.)?(vm\.|vt\.)?tiktok\.com\//)) {
    throw m.reply(`*⚠️ El enlace ingresado no es válido. Asegúrese de que sea un link de TikTok.*`);
}

    try {
        await conn.reply(m.chat, "*⏳ Aguarde un momento, estoy enviando su video...*", m);

        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData) {
            throw m.reply("*Error api!*");
        }

        const videoURL = tiktokData.data.play;
        const videoURLWatermark = tiktokData.data.wmplay;
        const infonya_gan = `*📖 Descripción:*\n> ${tiktokData.data.title}*`;

        if (videoURL || videoURLWatermark) {
            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", "*Download - Tiktok*" + `\n\n${infonya_gan}`, m);
            setTimeout(async () => {
            }, 1500);
        } else {
            throw m.reply("*❌ No se pudo descargar.*");
        }
    } catch (error1) {
        conn.reply(m.chat, `Error: ${error1}`, m);
    }
};

handler.help = ['tiktok']
handler.tags = ['dl']
handler.command = /^(tt|tiktok)$/i;

export default handler

async function tiktokdl(url) {
    let tikwm = `https://www.tikwm.com/api/?url=${url}?hd=1`
    let response = await (await fetch(tikwm)).json()
    return response
}