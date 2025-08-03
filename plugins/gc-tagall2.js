import fetch from 'node-fetch';
import PhoneNumber from 'awesome-phonenumber';

const handler = async (m, { participants, args }) => {
  const pesan = args.join` `;
  const oi = `*\`INFO:\`*  ${pesan}`;
  let mensajes = `${msgtagall}\n*INTEGRANTES:* {participants.length}\n\n ${oi}\n\n╭┄ 𝅄  ۪꒰ \`⡞᪲=͟͟͞ TAGS ≼᳞ׄ\` ꒱  ۟  𝅄 ┄\n`;

  for (const mem of participants) {
    let numero = PhoneNumber('+' + mem.id.replace('@s.whatsapp.net', '')).getNumber('international');
    let api = `https://delirius-apiofc.vercel.app/tools/country?text=${numero}`;
    let response = await fetch(api);
    let json = await response.json();

    let paisdata = json.result ? json.result.emoji : emotg;
    mensajes += `${paisdata} @${mem.id.split('@')[0]}\n`;
  }

    mensajes += `╰⸼┄┄ ─ ꒰  ׅ୭ *${vs}* ୧ ׅ ꒱ ─ ┄┄⸼`;

  conn.sendMessage(m.chat, { text: mensajes, mentions: participants.map((a) => a.id) });
};

handler.help = ['todos *<mensaje opcional>*'];
handler.tags = ['grupo'];
handler.command = /^(tagall2|invocar2|marcar2|todos2|invocación2|t2)$/i;
handler.admin = true;
handler.group = true;

export default handler;