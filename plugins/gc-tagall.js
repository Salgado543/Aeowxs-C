const handler = async (m, {isOwner, isAdmin, conn, text, participants, args, command, usedPrefix}) => {

  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }
  const pesan = args.join` `;
const oi = `${pesan}`;
  let teks = `${msgtagall}\n\n🔱@𝑲𝒂𝒊𝒔𝒆𝒓.𝒎𝒗𝒑7🔱\n${oi}\n\n🔖🏷️𝔼𝕋𝕀ℚ𝕌𝔼𝕋𝔸🔖🏷️\n`;
  for (const mem of participants) {
    teks += `${emotg} @${mem.id.split('@')[0]}\n`;
  }
  teks += `> ${dev}`;
  conn.sendMessage(m.chat, {text: teks, mentions: participants.map((a) => a.id)} );
};
handler.help = ['todos'];
handler.tags = ['gc'];
handler.command = /^(tagall|t|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;
export default handler;