//Code By Criss Mejorado al 100%, robate esta mrd

const handler = async (m, { conn, command, args }) => {

  let user = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.quoted?.sender;

  if (!user)
    return conn.reply(m.chat, `*${emojis} Menciona algún usuario.*`, m);

  const taguser = '@' + user.split('@')[0];
  const percentage = Math.floor(Math.random() * 501);

const emojis = {
gay: '🏳️‍🌈', lesbiana: '🏳️‍🌈',
pajero: '😏💦', pajera: '😏💦',
puto: '🔥🥵', puta: '🔥🥵',
manco: '🎮💀', manca: '🎮💀',
rata: '🐁🧀', perro: '🐕', perra: '🐩',
prostituto: '🫦💋', prostituta: '🫦💋',
sinpoto: '😂', sintetas: '😿',
chipi: '😹🫵🏻',
infiel: '🐶', fiel: '🙇🏻‍♂️',
kchudo: '🦌', kchuda: '🤘🏻',
migajero: '🙇🏻‍♂️', migajera: '🙇🏻‍♀️'
  };

  const descriptions = {
gay: [
"💙 Sabes.. mejor me alejo de ti no me vayas a contagiar.",
"🖤 Tú no eres amigo... ¡Tú eres amigue! 💀",
"💜 ¡Nivel DIOS! Ya ni necesitas salir del clóset, lo rompiste amige."
],
lesbiana: [
"👻 Tal vez un par de maratones de series lésbicas ayuden.",
"💗 No necesitas confirmación, ya lo sabíamos.",
"❣️ ¡Tu amor por las chicas es más fuerte que un ship de anime!"
],
pajero: [
"🧡 Relájate, el internet no se va a acabar.",
"💞 Bueno, al menos te ejercitas un brazo...",
"💕 ¡Tus manos ya deberían estar aseguradas como patrimonio nacional!"
],
pajera: [
"🧡 Relájate, el internet no se va a acabar.",
"💞 Bueno, al menos te ejercitas un brazo...",
"💕 ¡Tus manos ya deberían estar aseguradas como patrimonio nacional!"
],
puto: [
"😼 Tranqui, no todos nacen con el talento.",
"😺 Si sigues así, te harán monumento en Tinder.",
"😻 ¡Ya ni el Diablo puede competir contigo!"
],
puta: [
"😼 Tranqui, no todos nacen con el talento.",
"😺 Si sigues así, te dejarán más abierta que las puertas del cielo vv.",
"😻 ¡Más información a su privado, uff mi amor!"
],
manco: [
"🎮 ¿Seguro que no juegas con los pies?",
"🥷 ¡Cuidado! Hasta los bots juegan mejor que tú.",
"💀 Récord mundial en fallar tiros... ¡Sin balas!"
],
manca: [
"🎮 ¿Por qué eres así? Re mala.",
"🥷 Anda a la cocina mejor, no servís pa' jugar.",
"💀 Récord mundial en fallar tiros... ¡Sin balas!"
],
rata: [
"🐁 Te falta robar un poco más, sigue practicando.",
"😂 Roba peor que el Real Madrid el puto este.",
"💖 ¡Eres más rata que Remy de Ratatouille!"
],
perro: [
"🐶 Tan perro que ladras amor y muerdes confianza.",
"💀 Eres tan perro que hasta el veterinario te bloqueó.",
"🤣 Prometes amor eterno, pero te distrae cualquier hueso nuevo."
],
perra: [
"🐾 Tan perra que marcas territorio en cada chat.",
"💅 Amor no te falta, te sobran turnos.",
"🔥 Dices que eres fiel, pero el GPS de tus excusas cambia cada noche."
],
prostituto: [
"🗣️ Tranquilo, el mercado siempre necesita talento nuevo.",
"✨ ¡Tus servicios tienen 5 estrellas en Google!",
"💖 Eres tan solicitado que ya tienes tarjeta VIP."
],
prostituta: [
"🙈 Tranquila que te voy a dar tu pingasaurio.",
"🥵 ¿Lo haces por gusto, verdad?",
"💖 ¿Cuándo hacemos un trío? Nena"
],
sinpoto: [
"👀 ¿Seguro que no eres hombre con pelo largo?",
"😹 Ni con cirugía te levantas ese autoestima.",
"🙉 Hasta un mosquito hace más bulto que tú."
],
sintetas: [
"📭 Más vacía que el buzón de alguien sin amigos.",
"🌚 Da igual si estás de frente o de espalda, no hay diferencia.",
"🫨 Se supone que la pubertad ayuda, ¿qué pasó contigo?"
],
chipi: [
"🤡 Lo tuyo no es mini, es edición limitada.",
"😹 Lo bueno es que los golpes en la entrepierna no te hacen nada.",
"💀 Dicen que lo importante es cómo se usa, pero en tu caso ni así."
],
infiel: [
"💀 Hablas de amor, pero ni tu sombra confía en ti.",
"🤢 Te dicen WiFi público, porque cualquiera se conecta sin pedir clave.",
"🫣 Fuiste fiel… pero mientras dormías."
],
fiel: [
"😂 Tan fiel que ni cuando te engañan te das cuenta, santo ingenuo.",
"💀 Eres tan fiel que pareces contraseña olvidada: nadie te usa, pero ahí sigues.",
"🤡 Tan fiel que confías más que el WiFi sin clave."
],
kchudo: [
"💀 Te ponen los cachos y todavía das las gracias.",
"🤡 Tan kcudo que cuando te engañan terminas pidiendo disculpas.",
"🤣 Te engañan, te mienten, y tú todavía subes estados con corazones."
],
kchuda: [
"😂 Le descubres los mensajes, lloras y al día siguiente le cocinas.",
"💔 Eres tan kchuda que confundes amor con limosnas emocionales.",
"🤡 Dices que aprendiste la lección, pero repites materia con el mismo infiel."
],
migajero: [
"🤡 Te tratan como segunda opción y tu agradeces.",
"💀 La ruegas mientras a ella la hacen rogar en la cama.",
"🤣 Tan migajero que si te dice solo es un amigo tu le crees para que sigas con ella."
],
migajera: [
"💔 Te humillan, te engañan, y tú todavía preguntas si te ama.",
"😂 Tan migajera que confundes sobras con cariño.",
"🐦 Eres tan migajera que tu relación es 50 para aquí 50 para allá."
]
  };

  if (!descriptions[command])
    return conn.reply(m.chat, '*⚠️ Comando inválido.*', m);

  const emoji = emojis[command] || '';
  let description;

  if (percentage < 150)
    description = descriptions[command][0];
  else if (percentage > 400)
    description = descriptions[command][2];
  else
    description = descriptions[command][1];

  const responses = [
    "El destino lo ha decidido.",
    "Los datos no mienten.",
    "¡Aquí tienes tu certificado oficial!"
  ];

  const finalResponse = responses[Math.floor(Math.random() * responses.length)];

  const cal = `*☁️ PORCENTAJE CALCULADO ☁️*

🪻 *Los cálculos han arrojado que* *${taguser}* *es* *${percentage}%* *${command} ${emoji}*

*${description}*
> *${finalResponse}*`.trim();

  async function loading() {
    const bars = [
      "💥 𝐎𝐛𝐭𝐚𝐢𝐧𝐢𝐧𝐠 𝐝𝐚𝐭𝐚 . . .",
      "💥 𝐃𝐚𝐭𝐚 𝐎𝐛𝐭𝐚𝐢𝐧𝐞𝐝 . . ."
    ];

    let { key } = await conn.sendMessage(m.chat, {
      text: '💥 𝐍𝐨𝐰 𝐥𝐨𝐚𝐝𝐢𝐧𝐠 . . .',
      mentions: [user]
    });

    for (let i = 0; i < bars.length; i++) {
      await new Promise(res => setTimeout(res, 1000));
      await conn.sendMessage(m.chat, { text: bars[i], edit: key });
    }

    await conn.sendMessage(m.chat, {
      text: cal,
      edit: key,
      mentions: [user]
    });
  }

  loading();
};

handler.tags = ['fun'];
handler.group = true;
handler.command = ['gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'perro', 'perra', 'prostituto', 'prostituta', 'sinpoto', 'sintetas', 'chipi', 'infiel', 'fiel', 'kchudo', 'kchuda', 'migajero', 'migajera'];
handler.help = handler.command;

export default handler;