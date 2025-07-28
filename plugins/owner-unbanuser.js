/*const handler = async (m, { conn, args, text, usedPrefix, command }) => {
    let user;
    let db = global.db.data.users;
    if (m.quoted) {
        user = m.quoted.sender;
    } else if (args.length >= 1) {
        user = args[0].replace('@', '') + '@s.whatsapp.net';
    } else {
        await conn.reply(m.chat, `*${emojis} Etiqueta o coloca el número del usuario que quieres desbanear.*`, m, rcanal);
        return;
    }
    if (db[user]) {
        db[user].banned = false;
        db[user].banRazon = '';
        const nametag = await conn.getName(user);
        const nn = conn.getName(m.sender);
        await conn.reply(m.chat, `*${done} El usuario* *${nametag}* *ha sido desbaneado.*`, m, { mentionedJid: [user] });

    } else {
        await conn.reply(m.chat, `*⚠️ El usuario no está registrado.*`, m);
    }
};
handler.help = ['unbanuser'];
handler.command = ['unbanuser'];
handler.tags = ['owner'];
handler.rowner = true;

export default handler;*/

const handler = async (m, { conn }) => {
    let user;
    const db = global.db.data.users;

    // Obtener JID del usuario a desbanear
    if (m.quoted) {
        user = m.quoted.sender;
    } else if (m.mentionedJid && m.mentionedJid.length) {
        user = m.mentionedJid[0];
    } else {
        await conn.reply(m.chat, `*${emojis} Etiqueta o responde al usuario que deseas desbanear.*`, m, rcanal);
        return;
    }

    if (db[user]) {
        db[user].banned = false;
        db[user].banReason = '';
        db[user].bannedBy = null;

        const nametag = await conn.getName(user);
        await conn.reply(m.chat, `*${done} El usuario* *${nametag}* *ha sido desbaneado.*`, m, {
            mentions: [user]
        });

    } else {
        await conn.reply(m.chat, `*⚠️ El usuario no está registrado.*`, m);
    }
};

handler.help = ['unbanuser'];
handler.command = ['unbanuser'];
handler.tags = ['owner'];
handler.rowner = true;

export default handler;