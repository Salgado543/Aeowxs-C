/*var handler = async (m, { conn, text, args, command }) => {
    try {
        const cleanNumber = n => n.replace(/\s|@|[+]/g, '');
        const senderNumber = conn.user.jid.split('@')[0];
        const senderJid = `${senderNumber}@s.whatsapp.net`;
        const bantMsg = `${emojis} *Etiqueta o escribe el número del usuario al que quieres banear.*`;

        if (!text && !m.quoted) {
            return conn.reply(m.chat, bantMsg, m, rcanal, { mentions: [senderJid] });
        }

        // Obtener número y motivo
        const number = m.quoted?.sender
            ? m.quoted.sender.split('@')[0]
            : cleanNumber(args[0] || text.split(' ')[0]);

        const reason = args.slice(1).join(' ') || 'Sin motivo especificado';
        const targetJid = `${number}@s.whatsapp.net`;

        // Validaciones
        if (targetJid === conn.user.jid)
            return conn.reply(m.chat, `*⚠️ No puedo banearme a mí mismo.*`, m);

        for (const [ownerNumber] of global.owner) {
            if (number === ownerNumber) {
                return conn.reply(m.chat, `⚠️ *No puedo banear al propietario* *@${ownerNumber}*.`, m, {
                    mentions: [`${ownerNumber}@s.whatsapp.net`]
                });
            }
        }

        const users = global.db.data.users;
        if (!users[targetJid]) users[targetJid] = {};
        if (users[targetJid].banned) {
            return conn.reply(m.chat, `☁️ *El usuario @${number} ya está baneado.*`, m, { mentions: [targetJid] });
        }

        users[targetJid].banned = true;
        users[targetJid].banReason = reason;
        users[targetJid].bannedBy = m.sender;

        await conn.reply(m.chat, `✅ *Usuario @${number} baneado con éxito.*\n📌 *Motivo:* ${reason}`, m, {
            mentions: [targetJid]
        });

    } catch (e) {
        console.error(e);
        await conn.reply(m.chat, `✖️ *Ocurrió un error.*`, m);
    }
};

handler.help = ['banuser <número> [motivo]'];
handler.command = ['banuser'];
handler.tags = ['owner'];
handler.rowner = true;

export default handler;*/

var handler = async (m, { conn, text, args, command }) => {
    try {
        const senderJid = conn.user.jid;
        const bantMsg = `${emojis} *Etiqueta o responde al usuario que deseas banear.*`;

        // Obtener JID del objetivo
        let user;
        if (m.quoted) {
            user = m.quoted.sender;
        } else if (m.mentionedJid && m.mentionedJid.length) {
            user = m.mentionedJid[0];
        } else {
            return conn.reply(m.chat, bantMsg, m, rcanal, { mentions: [senderJid] });
        }

        const number = user.split('@')[0];
        const reason = args.slice(1).join(' ') || 'Sin motivo especificado';

        // Validaciones
        if (user === conn.user.jid)
            return conn.reply(m.chat, `*⚠️ No puedo banearme a mí mismo.*`, m);

        for (const [ownerNumber] of global.owner) {
            if (number === ownerNumber) {
                return conn.reply(m.chat, `⚠️ *No puedo banear al propietario* *@${ownerNumber}*.`, m, {
                    mentions: [`${ownerNumber}@s.whatsapp.net`]
                });
            }
        }

        const users = global.db.data.users;
        if (!users[user]) users[user] = {};
        if (users[user].banned) {
            return conn.reply(m.chat, `☁️ *El usuario @${number} ya está baneado.*`, m, { mentions: [user] });
        }

        users[user].banned = true;
        users[user].banReason = reason;
        users[user].bannedBy = m.sender;

        await conn.reply(m.chat, `✅ *Usuario @${number} baneado con éxito.*\n📌 *Motivo:* ${reason}`, m, {
            mentions: [user]
        });

    } catch (e) {
        console.error(e);
        await conn.reply(m.chat, `✖️ *Ocurrió un error.*`, m);
    }
};

handler.help = ['banuser @usuario'];
handler.command = ['banuser'];
handler.tags = ['owner'];
handler.rowner = true;

export default handler;