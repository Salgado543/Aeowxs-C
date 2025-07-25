import fetch from 'node-fetch';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*🔍 Ingresa lo que deseas buscar en Spotify.*\n> *\`Ejemplo:\`* ${usedPrefix + command} Quevedo`;

  await m.react('🕐');

  try {
    const res = await fetch(`https://delirius-apiofc.vercel.app/search/spotify?q=${encodeURIComponent(text)}`);
    const json = await res.json();

    const tracks = json.data;
    if (!tracks.length) throw '❌ *No se encontraron resultados en Spotify.*';

    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];

    const media = await prepareWAMessageMedia(
      { image: { url: randomTrack.image } },
      { upload: conn.waUploadToServer }
    );

    const listMessage = {
      body: {
        text: `> *Resultados encontrados:* \`${tracks.length}\`\n\n🎧 *${randomTrack.title}*\n\n≡ 👤 *Artista:* ${randomTrack.artist}\n≡ 🕐 *Duración:* ${randomTrack.duration}\n≡ 📈 *Popularidad:* ${randomTrack.popularity}\n≡ 📅 *Fecha:* ${randomTrack.publish}\n≡ 🔗 *Enlace:* ${randomTrack.url}`
      },
      footer: { text: 'sʜᴀᴅᴏᴡ ᴜʟᴛʀᴀ ᴍᴅ' },
      header: {
        title: '```乂 SPOTIFY - SEARCH```',
        hasMediaAttachment: true,
        imageMessage: media.imageMessage
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
              title: 'Resultados de Spotify',
              sections: tracks.map(track => ({
                title: `${track.title}`,
                rows: [
                  {
                    header: track.title,
                    title: track.artist,
                    description: `Descargar audio | Popularidad: ${track.popularity}`,
                    id: `.spotify ${track.url}`
                  }
                ]
              }))
            })
          }
        ],
        messageParamsJson: ''
      }
    };

    const userJid = conn?.user?.jid || m.key.participant || m.chat;
    const msg = generateWAMessageFromContent(m.chat, { interactiveMessage: listMessage }, { userJid, quoted: m });

    await m.react('✅');
    conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

  } catch (e) {
    console.error(e);
    await m.reply('⚠️ Ocurrió un error al buscar en Spotify.');
  }
};

handler.help = ['spotifysearch'];
handler.tags = ['search'];
handler.command = /^(shadow)$/i;

export default handler;