/*var handler = async (m, { conn, text, usedPrefix, command }) => {
    let user, number, bot, bant, ownerNumber, aa, users, usr

    try {
        function no(number) {
            return number.replace(/\s/g, '').replace(/([@+-])/g, '')
        }
        text = no(text)
        number = isNaN(text) ? text.split`@`[1] : text
        user = conn.user.jid.split`@`[0] + '@s.whatsapp.net'
        bot = conn.user.jid.split`@`[0]
        bant = `${emojis} *Etiqueta o escribe el número del usuario al que quieres banear.*`
        const nn = conn.getName(m.sender)
        if (!text && !m.quoted) return conn.reply(m.chat, bant, m, rcanal, { mentions: [user] })

        if (text) {
            user = number + '@s.whatsapp.net'
        } else if (m.quoted.sender) {
            user = m.quoted.sender
        } else if (m.mentionedJid) {
            user = number + '@s.whatsapp.net'
        }

        number = user.split('@')[0]
        if (user === conn.user.jid) return conn.reply(m.chat, `*⚠️ @${bot} No puede ser baneado con este comando.*`, m, { mentions: [user] })

        for (let i = 0; i < global.owner.length; i++) {
            ownerNumber = global.owner[i][0]
            if (user.replace(/@s\.whatsapp\.net$/, '') === ownerNumber) {
                aa = ownerNumber + '@s.whatsapp.net'
                await conn.reply(m.chat, `⚠️ *No puedo banear al propietario* *@${ownerNumber}*.`, m, { mentions: [aa] })
                return
            }
        }

        users = global.db.data.users
        if (!users[user]) {
            users[user] = { banned: false }
        }
        if (users[user].banned === true) return conn.reply(m.chat, `☁️ *El usuario @${number} ya está baneado.*`, m, { mentions: [user] })

        users[user].banned = true
        usr = m.sender.split('@')[0]
        await conn.reply(m.chat, `*✅ Usuario baneado con éxito.*`, m, { mentions: [user] })

    } catch (e) {
        await conn.reply(m.chat, `*✖️ Ocurrió un error.*`, m)
    }
}

handler.help = ['banuser']
handler.command = ['banuser']
handler.tags = ['owner']
handler.rowner = true

export default handler*/

const handler = async (m, { conn, text, args, command }) => {
    try {
        const cleanNumber = n => n.replace(/\s|@|[+]/g, '');
        const senderNumber = conn.user.jid.split('@')[0];
        const senderJid = `${senderNumber}@s.whatsapp.net`;
        const bantMsg = `${emojis} *Etiqueta o escribe el número del usuario al que quieres banear.*\n\n*Ejemplo:* \n${command} 51987654321 Spam o insultos`;

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

export default handler;